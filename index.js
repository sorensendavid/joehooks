const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');

const secret = "";
const repo = "";

console.log("Server started. Listening...")
http.createServer((req, res) => {

  let body = '';
  let valid = false;

  req.on('data', chunk => {

    let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
    if (req.headers['x-hub-signature'] == sig) {
      valid = true;
    }
    body += chunk.toString()
  });

  req.on('end', () => {
    if (valid) {

      const github = JSON.parse(body);
      const logMessage = [];
      logMessage.push(`Deploying ${github.commits.length} commits pushed by ${github.pusher.name}. <${github.compare}|Changes>`)

      for (i = 0; i < github.commits.length; i++) {
        let message = `> <${github.commits[i].url}|\`${github.commits[i].id.substring(0, 7)}\`> ${github.commits[i].message}`;
        logMessage.push(message);
      }

      console.log(logMessage);

      // Deploy App
      const deploy = exec(`cd ${repo} && git pull`);

      deploy.on('exit', (code, signal) => {
        if (code === 0) {
          console.log("Deployment finished successfully.");
        } else {
          console.log("Deployment failed.");
        }
      })

      valid = false;
    }
    res.end('ok');
  })

}).listen(9000);
