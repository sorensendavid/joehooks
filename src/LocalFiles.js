require('dotenv').config()
import { tsLog } from './Timestamp'

const fs = require('fs')
const dir = require('node-dir')
// const path = require('path')
const localFilesMap = new Map()

const getFiles = new Promise((resolve, reject) => {
  dir.files(process.env.LOCAL_REPO, (err, files) => {
    resolve(files)
    reject(err)
  })
})

export const localFiles = new Promise((resolve, reject) => {
  getFiles
    .then(results => {
      results.forEach(file => {
        localFilesMap.set(file.replace(process.env.LOCAL_REPO + '\\', ''), '')
      })

      localFilesMap.forEach((val, key, map) => {
        localFilesMap.set(key, fs.statSync(`${process.env.LOCAL_REPO}\\${key}`).mtime)
      })
    })
    .catch(err => {
      tsLog(err)
    })
  resolve()
  reject()
})


// files.forEach(file => {
//   console.log(file.replace(process.env.LOCAL_REPO + '\\', ''))
// })

// dir.files(repo, function (err, files) {
//   if (err) throw err
//   files.forEach(file => {
//     let parsedPath = file.replace(repo + '\\', '')
//     if (!parsedPath.startsWith('.')) {
//       filePaths.push(parsedPath)
//     }
//   })

//   filePaths.forEach(filePath => {
//     let parsedPath = path.dirname(filePath)
//     if (paths.indexOf(parsedPath) === -1 && parsedPath != '.') {
//       paths.push(parsedPath)
//     }
//   })

//   tsLog(`\nCreating ${paths.length} directories on game server...\n`)
//   paths.forEach(pth => {
//     client.mkdir(pth, true, err => { if (err) throw err })
//     tsLog(pth, ' -- created.')
//   })

//   tsLog(`\nUploading ${filePaths.length} files...\n`)
//   filePaths.forEach(file => {
//     tsLog(file, ' -- uploaded.')
//     // client.lastMod(file, (err, lastModified) => {
//     //   // If last mod newer than file, upload file.
//     //   // client.put(`${repo}\\${file}`, file, err => { if (err) throw err })
//     // })
//   })
// })
