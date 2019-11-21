require('dotenv').config()
const http = require('http')
const crypto = require('crypto')
const { exec } = require('child_process')
const path = require('path')
const Discord = require('discord.js');
const FTP = require('ftp')

const discord = new Discord.Client();
const ftp = new FTP()

discord.login(process.env.DISCORD_TOKEN);

discord.on('ready', () => {
  const message = (message) => {
    discord.channels.get('646643147362926592').send(message)
  }

  message(`Webhook server started. Listening on port ${process.env.HTTP_PORT}.`)

  http.createServer((req, res) => {

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
        message(`cd ${process.env.LOCAL_REPO} && git pull`)
        const deploy = exec(`cd ${process.env.LOCAL_REPO} && git pull`)

        deploy.on('exit', (code, signal) => {
          if (code === 0) {
            message("Successfully pulled changed from repo.")
            const github = JSON.parse(body)
            const changed = new Map()
            const added = []
            const modified = []
            const removed = []
            const paths = []

            github.commits.forEach((commit) => {
              added.push(...commit.added)
              modified.push(...commit.modified)
              removed.push(...commit.removed)
            })

            changed
              .set('added', added.filter((item, index) => added.indexOf(item) === index))
              .set('modified', modified.filter((item, index) => modified.indexOf(item) === index))
              .set('removed', removed.filter((item, index) => removed.indexOf(item) === index))

            changed.forEach(group => {
              group.forEach(change => {
                paths.push(path.dirname(change))
              })
            })

            changed.set('paths', paths.filter((item, index) => paths.indexOf(item) === index))

            ftp.connect({
              "host": process.env.FTP_HOST,
              "port": process.env.FTP_PORT,
              "user": process.env.FTP_USER,
              "password": process.env.FTP_PASS
            })

            ftp.on('ready', () => {
              const paths = changed.get('paths')

              paths.forEach(path => {
                ftp.mkdir(path, true, err => {
                  if (err) throw err
                })
              })

              const toUploadRaw = [...changed.get('added'), ...changed.get('modified')]
              const toUpload = toUploadRaw.filter((item, index) => toUploadRaw.indexOf(item) === index)

              if (toUpload.length > 0) {
                const uploadFiles = new Promise((resolve, reject) => {
                  message(`Uploading ${toUpload.length} change(s) or addition(s).`)
                  toUpload.forEach(relPath => {
                    ftp.put(path.resolve(process.env.LOCAL_REPO, relPath), relPath, err => {
                      if (err) {
                        reject(err)
                      } else {
                        resolve(true)
                      }
                    })
                  })
                })

                uploadFiles
                  .then(res => {
                    message('Upload(s) complete.')
                    ftp.end()
                  })
                  .catch(err => {
                    if (err) throw err
                    message('Upload(s) failed.')
                    ftp.end()
                  })
              } else {
                message("Stopping. Nothing to upload.")
              }

            })
          } else {
            message("Stopping. There was a problem pulling changed from repo.")
          }
        })
        valid = false
      }
      res.end('ok')
    })
  }).listen(process.env.HTTP_PORT)
})
