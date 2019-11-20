require('dotenv').config()
const http = require('http')
const crypto = require('crypto')
const { exec } = require('child_process')

import { message } from './src/Discord'
import { logCommits } from './src/Github'
import { upload } from './src/Bluefang'

message(`Webhook server started. Listening on port ${process.env.HTTP_PORT}.`)

http.createServer((req, res) => {

  let body = ''
  let valid = false

  req.on('data', chunk => {
    message("Incoming request. Checking secret.")
    let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex')
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
      logCommits(body)

      // Deploy App
      const deploy = exec(`cd ${repo} && git pull`)

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

}).listen(process.env.HTTP_PORT)
