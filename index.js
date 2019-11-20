require('dotenv').config()
const http = require('http')
const crypto = require('crypto')
const { exec } = require('child_process')

const Discord = require('discord.js');
const client = new Discord.Client();

import { upload } from './src/Bluefang'



message(`Webhook server started. Listening on port ${process.env.HTTP_PORT}.`)

http.createServer((req, res) => {

  client.on('ready', () => {
    const message = (message) => {
      client.login(process.env.DISCORD_TOKEN);
      client.channels.get('646643147362926592').send(message)
    }

    let body = ''
    let valid = false

    req.on('data', chunk => {
      message("Incoming request. Checking secret.")
      let sig = "sha1=" + crypto.createHmac('sha1', process.env.GITHUB_SECRET).update(chunk.toString()).digest('hex')
      if (req.headers['x-hub-signature'] == sig) {
        message("Secret accepted.")
        valid = true
      } else {
        message("Stopping. Secret failed.")
      }
      body += chunk.toString()
    })

    req.on('end', () => {
      if (valid) {
        message("Grabbing commit info...")

        const github = JSON.parse(body)
        const logMessage = []
        logMessage.push(`Deploying ${github.commits.length} commits pushed by ${github.pusher.name}.`)

        for (let i = 0; i < github.commits.length; i++) {
          let message = `> ${github.commits[i].id.substring(0, 7)} ${github.commits[i].message}`
          logMessage.push(message)
        }

        message(logMessage.join('\n'))

        // Deploy App
        const deploy = exec(`cd ${process.env.LOCAL_REPO} && git pull`)

        deploy.on('exit', (code, signal) => {
          if (code === 0) {
            message("Successfully pulled changes from repo.")
            upload(body)
          } else {
            message("Stopping. There was a problem pulling changes from repo.")
          }
        })

        valid = false
      }
      res.end('ok')
    })
  })
}).listen(process.env.HTTP_PORT)



