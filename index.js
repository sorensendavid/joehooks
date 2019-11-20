require('dotenv').config()
const http = require('http')
const crypto = require('crypto')
const { exec } = require('child_process')
import { localFiles } from './src/LocalFiles'
import { tsLog } from './src/Timestamp'

// Listen for request on process.env.HTTP_PORT
// Check incoming request for process.env.GITHUB_SECRET
// Grab commit info and output to discord channel
// Pull in repo changes
// Grab commits[].added and commits[].modified to be uploaded
// Grab commits[].removed to be deleted from remote
// Get local repo directory structure and mkdir on remote
// Put files on remote
// Delete files from remote

tsLog(`Webhook server started. Listening on port ${process.env.HTTP_PORT}.`)

http.createServer((req, res) => {

  let body = ''
  let valid = false

  req.on('data', chunk => {
    tsLog("Incoming request. Checking secret.")
    let sig = "sha1=" + crypto.createHmac('sha1', secret).update(chunk.toString()).digest('hex')
    if (req.headers['x-hub-signature'] == sig) {
      tsLog("Secret accepted.")
      valid = true
    } else {
      tsLog("Stopping. Secret failed.")
    }
    body += chunk.toString()
  })

  req.on('end', () => {
    if (valid) {
      tsLog("Grabbing commit info...")

      const github = JSON.parse(body)
      const logMessage = []
      logMessage.push(`Deploying ${github.commits.length} commits pushed by ${github.pusher.name}.`)

      for (i = 0; i < github.commits.length; i++) {
        let message = `> ${github.commits[i].id.substring(0, 7)} ${github.commits[i].message}`
        logMessage.push(message)
      }

      tsLog(logMessage.join('\n'))

      // Deploy App
      const deploy = exec(`cd ${repo} && git pull`)

      deploy.on('exit', (code, signal) => {
        if (code === 0) {
          tsLog("Successfully pulled changes from repo.")


        } else {
          tsLog("Stopping. There was a problem pulling changes from repo.")
        }
      })

      valid = false
    }
    res.end('ok')
  })

}).listen(process.env.HTTP_PORT)

// client.connect({
//   "host": ftpHost,
//   "port": ftpPort,
//   "user": ftpLogin,
//   "password": ftpPass
// })

// client.on('ready', () => {
//   dir.files(repo, function (err, files) {
//     tsLog('\nGetting local file info...\n')
//     if (err) throw err
//     files.forEach(file => {
//       let parsedPath = file.replace(repo + '\\', '')
//       if (!parsedPath.startsWith('.')) {
//         filePaths.push(parsedPath)
//       }
//     })

//     filePaths.forEach(filePath => {
//       let parsedPath = path.dirname(filePath)
//       if (paths.indexOf(parsedPath) === -1 && parsedPath != '.') {
//         paths.push(parsedPath)
//       }
//     })

//     tsLog(`\nCreating ${paths.length} directories on game server...\n`)
//     paths.forEach(pth => {
//       client.mkdir(pth, true, err => { if (err) throw err })
//       tsLog(pth, ' -- created.')
//     })

//     tsLog(`\nUploading ${filePaths.length} files...\n`)
//     filePaths.forEach(file => {
//       tsLog(file, ' -- uploaded.')
//       // client.lastMod(file, (err, lastModified) => {
//       //   // If last mod newer than file, upload file.
//       //   // client.put(`${repo}\\${file}`, file, err => { if (err) throw err })
//       // })
//     })
//   })
// })





// client.on('ready', () => {
//   dir.files(repo, function (err, files) {
//     tsLog('\nGetting local file info...\n')
//     if (err) throw err
//     files.forEach(file => {
//       let parsedPath = file.replace(repo + '\\', '')
//       if (!parsedPath.startsWith('.')) {
//         filePaths.push(parsedPath)
//       }
//     })

//     filePaths.forEach(filePath => {
//       let parsedPath = path.dirname(filePath)
//       if (paths.indexOf(parsedPath) === -1 && parsedPath != '.') {
//         paths.push(parsedPath)
//       }
//     })

//     tsLog(`\nCreating ${paths.length} directories on game server...\n`)
//     paths.forEach(pth => {
//       client.mkdir(pth, true, err => { if (err) throw err })
//       tsLog(pth, ' -- created.')
//     })

//     tsLog("Checking which files to upload...")
//     tsLog(`\nUploading files...\n`)
//     filePaths.forEach(file => {
//       let remoteLastMod
//       let localLastMod = new Date(fs.statSync(`${repo}\\${file}`).mtime)
//       client.lastMod(file, (err, lastModified) => {
//         remoteLastMod = new Date(lastModified)
//         if (localLastMod.getTime() > remoteLastMod.getTime()) {
//           tsLog(`Uploading ${file}`)
//           client.put(`${repo}\\${file}`, file, err => {
//             if (err) throw err
//             tsLog(file, ' -- uploaded.')
//           })
//         }
//       })
//     })
//   })
// })
