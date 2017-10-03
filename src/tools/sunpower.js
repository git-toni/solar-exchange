function hourSunPower(h){
  let p = 0
  //Max power hours
  if(h>=12 && h<=15){
    p = 1
  }
  else if(h<12 && h > 6){
    p = (h-6)/(12-6)
  }
  else if(h<20 && h > 15){
    p = 1 - (h-15)/(20-15)
  }
  return p
}
function hourConsume(h){
  let c = 0.2
  if(h>=6 && h<=9){
    c = 1
  }
  else if(h>=17 && h<=23){
    c = 1
  }
  return c
}

export {
  hourSunPower,
  hourConsume
}
