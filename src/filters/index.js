const moment = require('moment')

/**
 * 将YYYY-MM-DDTHH:mm:ss.000Z格式的时间转换为YYYY-MM-DD HH:mm:ss
 * @param  {[type]} time [description]
 * @return {[type]}      [description]
 */
export function timeFilter(time) {
  return moment(time).format('YYYY-MM-DD HH:mm:ss')
}
