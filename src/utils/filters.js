// let demo = (value) => {
//   /*
//    * code
//    */
//   return value
// }

const formatDate = (time, type) => {
  if (Number.isInteger(time)) {
    var date = new Date(time)
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()
    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()
    if (type === 'noSeconds') {
      return (
        [year, month, day].map(formatNumber).join('-') +
        ' ' +
        [hour, minute].map(formatNumber).join(':')
      )
    }
    return (
      [year, month, day].map(formatNumber).join('-') +
      ' ' +
      [hour, minute, second].map(formatNumber).join(':')
    )
  } else {
    return '---'
  }
}

const secondToDate = (second) => {
  // 秒转时分秒
  if (Number.isInteger(second)) {
    var h =
      Math.floor(second / 3600) < 10
        ? '0' + Math.floor(second / 3600)
        : Math.floor(second / 3600)
    var m =
      Math.floor((second / 60) % 60) < 10
        ? '0' + Math.floor((second / 60) % 60)
        : Math.floor((second / 60) % 60)
    var s =
      Math.floor(second % 60) < 10
        ? '0' + Math.floor(second % 60)
        : Math.floor(second % 60)
    return h + ':' + m + ':' + s
  } else {
    return '---'
  }
}

const secondToMinute = (second) => {
  // 秒转分秒
  if (Number.isInteger(second)) {
    var m =
      Math.floor(second / 60) < 10
        ? '0' + Math.floor(second / 60)
        : Math.floor(second / 60)
    var s =
      Math.floor(second % 60) < 10
        ? '0' + Math.floor(second % 60)
        : Math.floor(second % 60)
    return m + ':' + s
  } else {
    return '---'
  }
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

export { formatDate, secondToDate, secondToMinute }
