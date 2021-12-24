const utils = {
  getQueryParam(name: string) {
    const query = window.location.search.substring(1)
    const vars = query.split('&')
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=')
      if (pair[0] === name) {
        return pair[1]
      }
    }
    return ''
  },
  getDateYMD() {
    const date = new Date()
    const y = date.getFullYear()
    const m = date.getMonth() + 1
    const n = date.getDate()
    // return y + '-' + m + '-' + n
    return {
      y,
      m,
      n
    }
  },
  // 生成从minNum到maxNum的随机数
  randomNum(minNum: number, maxNum: number): number {
    switch (arguments.length) {
      case 1:
        return parseInt(String(Math.random() * minNum + 1), 10)
        break
      case 2:
        return parseInt(
          String(Math.random() * (maxNum - minNum + 1) + minNum),
          10
        )
        break
      default:
        return 0
        break
    }
  },
  emotions() {
    const emotionArr = [
      '🍇',
      '🍉',
      '🍊',
      '🍎',
      '🍏',
      '🍓',
      '🍅',
      '🍗',
      '🍿',
      '🍟',
      '🍔',
      '🥖',
      '🧈',
      '🍢',
      '🍚',
      '🍩',
      '🍭',
      '🎂'
    ]
    return emotionArr
  }
}

export default utils
