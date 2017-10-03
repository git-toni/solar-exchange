import {NREPETITIONS} from './config'
import game from './game'
import {getRows, getHourLines} from '../tools/sampling'

const iterate = (params) =>{
  let ite = []
  let avg_psto=[], avg_wsto=[], total_sto=[], avg_sunpo=[], avg_hcon=[], avg_bhist, avg_ghist
  let wsto=[], psto=[], tsto=[], deads=[], sunpo=[], hcons=[], bhist=[],ghist=[]
  let result
  for(let ri=0;ri<NREPETITIONS;ri++){
    let {result, avg_wstorage, avg_pstorage, total_storage, sunpower, hconsume, battery_hist, generation_hist} =
      game.start(params).getLines()

    wsto[ri] = getHourLines(avg_wstorage, params.tinterval)
    psto[ri] = getHourLines(avg_pstorage, params.tinterval)
    tsto[ri] = getHourLines(total_storage, params.tinterval)
    sunpo[ri] = getHourLines(sunpower, params.tinterval)
    hcons[ri] = getHourLines(hconsume, params.tinterval)
    bhist[ri] = battery_hist
    ghist[ri] = generation_hist
    //console.log('gethourlines after')
  }
  let nsamples = wsto[0].length
  for(let d=0; d< nsamples;d++){
    avg_psto[d] = _.mean(getRows(psto, d)) 
    avg_wsto[d] = _.mean(getRows(wsto, d)) 
    total_sto[d] = _.mean(getRows(tsto, d)) 
    avg_sunpo[d] = _.mean(getRows(sunpo, d)) 
    avg_hcon[d] = _.mean(getRows(hcons, d)) 
  }
  //for(let it in bhist){
  //}
  avg_bhist = bhist[0]
  avg_ghist = ghist[0]
  return {avg_psto, avg_wsto, total_sto, avg_sunpo, avg_hcon, 
    avg_bhist, avg_ghist}
}


export {
  iterate
}

