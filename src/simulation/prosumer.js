import _ from 'lodash'
import Market from './market'
import {iterHour} from '../tools/time'
import {hourConsume, hourSunPower} from '../tools/sunpower'

class Prosumer{
  constructor(params){
    this.installed_storage = _.sample(params.batteries)
    //this.installed_storage = 4000
    this.current_storage = this.installed_storage > 0 ? _.random(0,this.installed_storage) : 0

    //Starts battery at 100%
    this.current_storage = this.installed_storage > 0 ? this.installed_storage : 0

    //this.installed_generation = _.random(params.minPV, params.maxPV)
    this.installed_generation = _.sample(params.PV)
    this.current_generation = 0
    //this.consumption = _.random(500, 4400)
    this.consumption = 200
    this.leftovers = []
    this.purchases = []
    this.cycle = this.cycle.bind(this)
    this.percentage = this.percentage.bind(this)
  }
  cycle(params, iter){
    let {current_storage, installed_storage} = this
    let fhour = params.tinterval/3600
    let gen, avai, cursto, pur
    gen = this.current_generation * fhour
    avai = gen
    avai -= this.consumption * fhour
    if(avai < 0){
      pur = Market.purchase(this, Math.abs(avai))  
      if(!pur){
        return false
      }
    }
    else{
      if(this.current_storage < this.installed_storage){
        this.current_storage = avai < (this.installed_storage-this.current_storage)
                                ? this.current_storage + avai
                                : installed_storage
      }
    }
    //this.current_generation = _.random(this.installed_generation/3, this.installed_generation)    
    //this.consumption = _.random(500, 2400)
    this.current_generation = this.installed_generation * 
                              hourSunPower(iterHour(iter, params.tinterval))
    this.current_generation = this.installed_generation
    this.consumption = 3000 * hourConsume(iterHour(iter, params.tinterval))
    return true
  }
  percentage(){
    return this.current_storage > 0 ? Math.floor((this.current_storage/this.installed_storage)*100) : 0
    //return Math.floor((this.current_storage/this.installed_storage)*100)
  }
}

//let params = new Params()

export default Prosumer
