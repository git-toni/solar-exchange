function iterToDayHour(iter, tinterval){
  let allsec = (iter+1)*tinterval
  let decdays = allsec/(24*3600)
  let days = Math.trunc(decdays)
  let hours = 24 * (decdays - days).toFixed(2)
  return {
    days,
    hours
  }
}

function iterHour(iter, tinterval){
  let {days, hours} = iterToDayHour(iter, tinterval)
  return hours
}

export {
  iterHour,
  iterToDayHour,
}
