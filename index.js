const http = require('http');
const crypto = require('crypto');
const { exec } = require('child_process');
const FTP = require('ftp');
const dir = require('node-dir');
const path = require('path');

const client = new FTP();
const paths = [];
const filePaths = [];


// ************************************************************
// Game server info:
const ftpHost = "deadlift.bluefangsolutions.com" // FTP Host
const ftpPort = "2121" // FTP Port
const ftpLogin = "tij.34381" // FTP Username
const ftpPass = "bpKzlLWO" // FTP Password

// Web server info:
const listenPort = process.env.PORT; // Web server listen port
const secret = "hbw56yaw345b"; // Github secret
const repo = 'c:\\workspace\\sandbox\\Pitter_Pats'; // Absolute path to mod repo on disk
// ************************************************************


console.log("\nStarting server. Listening...\n")

http.createServer((req, res) => {

  let body = '';
  let valid = false;

  req.on('data', chunk => {
    console.log("Incoming request. Checking secret.")
    let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex');
    if (req.headers['x-hub-signature'] == sig) {
      console.log("Secret accepted.")
      valid = true;
    } else {
      console.log("Secret failed.")
    }
    body += chunk.toString()
  });

  req.on('end', () => {
    if (valid) {
      console.log("Grabbing commit info...")

      const github = JSON.parse(body);
      const logMessage = [];
      logMessage.push(`Deploying ${github.commits.length} commits pushed by ${github.pusher.name}.`)

      for (i = 0; i < github.commits.length; i++) {
        let message = `> ${github.commits[i].id.substring(0, 7)} ${github.commits[i].message}`;
        logMessage.push(message);
      }

      console.log(logMessage.join('\n'));

      // Deploy App
      const deploy = exec(`cd ${dir} && git pull`);

      deploy.on('exit', (code, signal) => {
        if (code === 0) {
          console.log("Successfully pulled changes from repo.");

          client.connect({
            "host": ftpHost,
            "port": ftpPort,
            "user": ftpLogin,
            "password": ftpPass
          });

          client.on('ready', () => {
            dir.files(repo, function (err, files) {
              console.log('\nGetting local file info...\n')
              if (err) throw err;
              files.forEach(file => {
                let parsedPath = file.replace(repo + '\\', '');
                if (!parsedPath.startsWith('.')) {
                  filePaths.push(parsedPath)
                }
              })

              filePaths.forEach(filePath => {
                let parsedPath = path.dirname(filePath)
                if (paths.indexOf(parsedPath) === -1 && parsedPath != '.') {
                  paths.push(parsedPath);
                }
              })

              console.log(`\nCreating ${paths.length} directories on game server...\n`)
              paths.forEach(pth => {
                console.log(pth, ' -- created.')
                client.mkdir(pth, true, err => { if (err) throw err })
              })

              console.log(`\nUploading ${filePaths.length} files...\n`)
              filePaths.forEach(file => {
                console.log(file, ' -- uploaded.')
                client.put(`${repo}\\${file}`, file, err => { if (err) throw err })
              })
            });
          })
        } else {
          console.log("There was a problem pulling changes from repo.");
        }
      })

      valid = false;
    }
    res.end('ok');
  })

}).listen(listenPort);


