require('dotenv').config()

const FTP = require('ftp')
const path = require('path')

import { getChanges } from './Github'
import { message } from './Discord'

const client = new FTP()

export const upload = body => {

  console.log('upload')
  const changes = getChanges(body)

  client.connect({
    "host": process.env.FTP_HOST,
    "port": process.env.FTP_PORT,
    "user": process.env.FTP_USER,
    "password": process.env.FTP_PASS
  })

  client.on('ready', () => {
    const paths = changes.get('paths')

    paths.forEach(path => {
      client.mkdir(path, true, err => {
        if (err) throw err
      })
    })

    const toUploadRaw = [...changes.get('added'), ...changes.get('modified')]
    const toUpload = toUploadRaw.filter((item, index) => toUploadRaw.indexOf(item) === index)
    console.log(toUpload)

    const uploadFiles = new Promise((resolve, reject) => {
      message(`Uploading ${toUpload.length} change(s) or addition(s).`)
      toUpload.forEach(relPath => {
        client.put(path.resolve(process.env.LOCAL_REPO, relPath), relPath, err => {
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
        client.end()
      })
      .catch(err => {
        if (err) throw err
        message('Upload(s) failed.')
        client.end()
      })
  })
}

//
