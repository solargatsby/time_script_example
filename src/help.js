const fetch = require('node-fetch')
const {timeIndexStateFromData,timeInfoFromData} = require('./time_script')
const {
  TimeInfoTypeScript,
  TimeIndexStateTypeScript,
  CKB_NODE_INDEXER,
}  = require('./const')

const getCurrentTimeIndexStateCell = async () => {
  let curTimeIndexStateCells = await getCells(TimeIndexStateTypeScript, 'type')
  if (!curTimeIndexStateCells || curTimeIndexStateCells.length === 0) {
    return {curTimeIndexStateCell: null, curTimeIndexState: null}
  }
  if (curTimeIndexStateCells.length > 1) {
    console.warn('More one current time index state cell')
  }
  const curTimeIndexStateCell = curTimeIndexStateCells[0]
  const curTimeIndexState = timeIndexStateFromData(curTimeIndexStateCell.output_data)
  return {curTimeIndexStateCell, curTimeIndexState}
}

const getTimeInfoCell = async (timeIndex) => {
  let timeInfoCells = await getCells(TimeInfoTypeScript, 'type')
  if (timeInfoCells.length === 0) {
    return {timeInfoCell: null, timeInfo: null}
  }
  let timeInfoCell
  let timeInfo
  for (let idx in timeInfoCells) {
    const targetTimeInfoCell = timeInfoCells[idx]
    const targetTimeInfo = timeInfoFromData(targetTimeInfoCell.output_data)
    if (targetTimeInfo.getTimeIndex() === timeIndex) {
      timeInfoCell = targetTimeInfoCell
      timeInfo = targetTimeInfo
      break
    }
  }
  return {timeInfoCell, timeInfo}
}

//getCells from indexer, param script: lock or type, param type: 'lock' or 'type'
const getCells = async (script, type, filter) => {
  let payload = {
    id: 1,
    jsonrpc: '2.0',
    method: 'get_cells',
    params: [
      {
        script: {
          code_hash: script.codeHash,
          hash_type: script.hashType,
          args: script.args,
        },
        script_type: type,
        filter: filter,
      },
      'asc',
      '0x64',
    ],
  }
  const body = JSON.stringify(payload, null, '  ')
  try {
    let res = await fetch(CKB_NODE_INDEXER, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body,
    })
    res = await res.json()
    return res.result.objects
  } catch (error) {
    console.error('error', error)
  }
}

module.exports = {
  getCurrentTimeIndexStateCell,
  getTimeInfoCell,
}
