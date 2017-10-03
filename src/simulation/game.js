//import params from './params'
import _ from 'lodash'
import Prosumer from './prosumer'
import {reloadLines} from '../charting'
import {hourSunPower, hourConsume} from '../tools/sunpower'
import {iterHour} from '../tools/time'

class Game{
  constructor(){
    this.reset = this.reset.bind(this)
    this.start = this.start.bind(this)
    //this.reset()
  }
  start(params){
    this.reset(params)
    let niter = params.days*24*3600/params.tinterval
    //let niter = 509
    let npro = this.prosumers.length
    let wsto=[], psto=[], tsto=[], mypro
    for(let i=0;i<niter;i++){
      wsto=[], psto=[], tsto=[]
      for(let p=0;p<npro;p++){
        mypro = this.prosumers[p]
        if(this.gameOn && mypro.cycle(params,i)){
          wsto[p] = mypro.current_storage
          psto[p] = mypro.percentage()
        }
        else{
          this.gameOn = false
          //console.log('game Failed')
          //return {result: false, }
          //reloadLines()
          //throw new Error(`No sellers Iteration:${i*100/niter} Pros:${p}`)
        }
      }  
      this.total_storage[i] = wsto.reduce((sum, val)=>{
        return sum+val
      },0)
      this.avg_wstorage[i] = Math.round(this.total_storage[i]/npro)
      this.avg_pstorage[i] = psto.reduce((sum, val)=>{
        return sum+val
      },0) / npro

      this.sunpower[i] = hourSunPower(iterHour(i, params.tinterval))
      this.hconsume[i] = hourConsume(iterHour(i, params.tinterval))
    }
    return this
  }
  reset(params){
    this.gameOn = true
    this.avg_wstorage = []
    this.avg_pstorage = []
    this.total_storage = []
    this.sunpower = []
    this.hconsume = []
    this.prosumers = initProsumers(params)
    this.battery_hist = _.countBy(this.prosumers, p=> p.installed_storage)
    this.generation_hist = _.countBy(this.prosumers, p=> p.installed_generation)
  }
  getLines(){
    //console.log('getlines',this.avg_wstorage.length)
    //debugger;
    return {
      result: this.gameOn,
      avg_wstorage: this.avg_wstorage, 
      avg_pstorage: this.avg_pstorage, 
      total_storage: this.total_storage, 
      sunpower: this.sunpower, 
      hconsume: this.hconsume, 
      battery_hist: this.battery_hist, 
      generation_hist: this.generation_hist, 
    }
  }
}

function initProsumers(p){
  let ps = []
  for(let i=0;i<p.n_prosumers;i++){
    ps[i] = new Prosumer(p)
  }
  return ps
}

let game = new Game()
export default game
