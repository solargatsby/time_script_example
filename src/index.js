const {getCurrentTimeIndexStateCell, getTimeInfoCell} = require('./help')

const getCurrentTimeInfo = async () => {
  const {curTimeIndexStateCell, curTimeIndexState} = await getCurrentTimeIndexStateCell()
  if (!curTimeIndexStateCell) {
    console.error('Cannot found current time index cell')
    return
  }

  const {timeInfo: curTimeInfo} = await getTimeInfoCell(curTimeIndexState.getTimeIndex())
  console.info(`Current timeIndex:${curTimeInfo.getTimeIndex()} timestamp:${curTimeInfo.getTimestamp()}`)
}

getCurrentTimeInfo()

