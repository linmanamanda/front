const moment = require('moment')

export function timeFilter(time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}