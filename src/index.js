import _ from 'lodash';
import {say} from './utils'
require('./styles/index.scss')
import game from './simulation/game'
import {initCharts, initHeader} from './charting'
import params from './simulation/params'
import {reloadLines} from './charting'
import {iterate} from './simulation/iterator'
//require('./layout.js')

let allCharts = {}
const chartParams = [
  {title: 'Equal installed battery distribution. Equal PV', id:'equal-battery-equal-pv'},
  {title: 'Equal installed battery distribution. Medium PV installation', id:'equal-battery-medium-pv'},
  {title: 'All 8kWh battery. Equal PV', id:'8kwh-battery-equal-pv'},
  {title: 'All 8kWh battery. Medium PV', id:'8kwh-battery-medium-pv'},
  //{title: 'Everyone 8kWh battery', id:'8kwh-battery'},
]

function makeCharts(){
  let set
  let gameParams = _.cloneDeep(params)
  // Equal battery - equal PV
  set = _.find(chartParams, ['id','equal-battery-equal-pv'])
  allCharts[set.id] = initCharts(set.title, set.id)
  allCharts[set.id].series = iterate(gameParams)
  allCharts[set.id].calculated = true
  
  // Equal battery - medium PV
  set = _.find(chartParams, ['id','equal-battery-medium-pv'])
  gameParams = _.cloneDeep(params)
  gameParams.PV = [1000,2000]
  allCharts[set.id] = initCharts(set.title, set.id)
  allCharts[set.id].series = iterate(gameParams)
  allCharts[set.id].calculated = true

  // 8kwh battery, Equal PV
  set = _.find(chartParams, ['id','8kwh-battery-equal-pv'])
  gameParams = _.cloneDeep(params)
  gameParams.batteries = [8000]
  allCharts[set.id] = initCharts(set.title, set.id)
  allCharts[set.id].series = iterate(gameParams)
  allCharts[set.id].calculated = true

  // 8kwh battery - medium PV
  set = _.find(chartParams, ['id','8kwh-battery-medium-pv'])
  gameParams = _.cloneDeep(params)
  gameParams.batteries = [8000]
  gameParams.PV = [1000,2000]
  allCharts[set.id] = initCharts(set.title, set.id)
  allCharts[set.id].series = iterate(gameParams)
  allCharts[set.id].calculated = true

  reloadLines(allCharts)
}

function run(){
  say('Aloha there!')
  initHeader()

  setTimeout(()=>{
    makeCharts()
  },0)

  //// Equal battery - equal PV
  //set = _.find(chartParams, ['id','equal-battery-equal-pv'])
  //allCharts[set.id] = initCharts(set.title, set.id)
  //allCharts[set.id].series = iterate(gameParams)
  //
  //// Equal battery - medium PV
  //set = _.find(chartParams, ['id','equal-battery-medium-pv'])
  //gameParams = _.cloneDeep(params)
  //gameParams.PV = [1000,2000]
  //allCharts[set.id] = initCharts(set.title, set.id)
  //allCharts[set.id].series = iterate(gameParams)

  //// 8kwh battery, Equal PV
  //set = _.find(chartParams, ['id','8kwh-battery-equal-pv'])
  //gameParams = _.cloneDeep(params)
  //gameParams.batteries = [8000]
  //allCharts[set.id] = initCharts(set.title, set.id)
  //allCharts[set.id].series = iterate(gameParams)

  //// 8kwh battery - medium PV
  //set = _.find(chartParams, ['id','8kwh-battery-medium-pv'])
  //gameParams = _.cloneDeep(params)
  //gameParams.batteries = [8000]
  //gameParams.PV = [1000,2000]
  //allCharts[set.id] = initCharts(set.title, set.id)
  //allCharts[set.id].series = iterate(gameParams)


  //reloadLines(allCharts)

}
run()



if(module.hot){
  module.hot.accept(run)
}
