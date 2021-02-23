# time_script_example

A example about how to get the current timestamp from time script([time_index_state_type_script](https://github.com/solargatsby/time_index_state_type_script) and [time_info_type_script](https://github.com/solargatsby/time_info_type_script))

# How to use?

First, get the current time index from time_index_state_type_script live cell

Then, get the corresponding time info cell of time index.

```
const getCurrentTimeInfo = async () => {
  const {curTimeIndexStateCell, curTimeIndexState} = await getCurrentTimeIndexStateCell()
  if (!curTimeIndexStateCell) {
    console.error('Cannot found current time index cell')
    return
  }

  const {timeInfo: curTimeInfo} = await getTimeInfoCell(curTimeIndexState.getTimeIndex())
  console.info(`Current timeIndex:${curTimeInfo.getTimeIndex()} timestamp:${curTimeInfo.getTimestamp()}`)
}
```
