const moment = require('moment')

export const tsLog = (message) => {
  console.log(`[${moment().format("HH:mm:ss")}] ${message}`)
}
