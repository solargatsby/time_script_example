const TIME_INDEX_CELL_DATA_N = 12

class TimeIndexState {
  constructor(index, n = TIME_INDEX_CELL_DATA_N) {
    this.index = index,
    this.n = n
  }

  getTimeIndex() {
    return this.index
  }

  toString() {
    return `0x${Buffer.from([this.index, this.n]).toString('hex')}`
  }

  incrIndex() {
    this.index++
    if (this.index === this.n) {
      this.index = 0
    }
    return this
  }
}

//parse time index state cell data, and return TimeIndexState object
//param: data, for example: '0x000c'
const timeIndexStateFromData = data => {
  return new TimeIndexState(parseInt(data.substring(2, 4), 16), parseInt(data.substring(4, 6), 16))
}


class TimeInfo {
  constructor(timestamp, index, n = TIME_INDEX_CELL_DATA_N) {
    this.timestamp = timestamp
    this.n = n
    this.index = index
  }

  getTimeIndex() {
    return this.index
  }

  getTimestamp() {
    return this.timestamp
  }

  toString() {
    return `0x${int2Hex(this.index, 2)}${int2Hex(this.timestamp, 8)}`
  }
}

//parse time info cell data, and return TimeInfo object
//param: data, for example: '0x00603109e4'
const timeInfoFromData = data => {
  return new TimeInfo(parseInt(data.substring(4, 12), 16), parseInt(data.substring(2, 4), 16))
}

module.exports = {
  timeInfoFromData,
  timeIndexStateFromData,
}
