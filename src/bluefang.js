require('dotenv').config()

import { tsLog } from './Timestamp'

const FTP = require('ftp')
const fs = require('fs')

const client = new FTP()

const connect = client.connect({
  "host": ftpHost,
  "port": ftpPort,
  "user": ftpLogin,
  "password": ftpPass
})

const disconnect = client.end()

//
