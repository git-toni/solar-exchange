function getHourLines(line, tinterval){
  let li =[]
  let hi= 0
  for(let i=0;i<line.length;i+=3600/tinterval){
    li[hi] = line[i]
    hi++
  } 
  return li
}
function getRows(mat,col){
  let lis =[]
  for(let r=0;r<mat.length;r++){
    lis[r] = mat[r][col]
  }
  return lis
}

export {
  getHourLines,
  getRows,
}
