import c3 from 'c3'
import game from './simulation/game'
import params from './simulation/params'
import _ from 'lodash'
import {NREPETITIONS} from './simulation/config'

var pjson = require('../package.json')
//import {getHourLines} from './tools/sampling'
//import 'bulma'

function newAppendTo(parent, tag, classe='', id='', html=''){
  let element = document.createElement(tag);
  !!classe && element.classList.add(classe)
  element.innerHTML = html
  //element.classList.add('columan')
  //element.classList.add('is-10')
  !!id && element.setAttribute('id',id)
  parent.appendChild(element)
  return element
}
function chartBlock(title, classe, id){
  let block = document.createElement('div')
  block.classList.add('chart-block')
  block.classList.add(classe)
  let titol = document.createElement('p')
  titol.classList.add('block-title')
  titol.innerHTML = title

  let chart = document.createElement('div')
  chart.classList.add('block-chart')
  chart.classList.add(classe)
  chart.setAttribute('id',id)

  block.appendChild(titol)
  block.appendChild(chart)
  return {
    block,
    chart
  }
}
function newStatsRow(title, parent, id){
  let row = document.createElement('div')
  row.classList.add('stats-row')
  row.setAttribute('id',id)

  let titol = document.createElement('h2')
  titol.innerHTML = title


  let chartBody = document.createElement('div')
  chartBody.classList.add('charts-body')
  let { block: lineBlock, chart: linechart } = chartBlock('','line-chart',id)
  let { block: pieBlock, chart: piechart } = chartBlock('Battery distribution','pie-chart',id)
  let { block: genpieBlock, chart: genpie } = chartBlock('PV distribution','genpie-chart',id)

  chartBody.appendChild(lineBlock)
  chartBody.appendChild(pieBlock)
  chartBody.appendChild(genpieBlock)


  row.appendChild(titol)
  row.appendChild(chartBody)
  parent.appendChild(row)
  return {
    row,
    linechart,
    piechart,
    genpie,
  }
}

document.body.innerHTML = ''
let element = document.createElement('div')
element.setAttribute('id','main')
document.body.appendChild(element)
const main = document.getElementById('main')


let lineChart, pieChart, powerChart
let l_wsto ='Mean Storage(W)',
    l_psto = 'Mean Storage(%)',
    l_sunpo = 'Mean Sunpower(%)',
    l_hcon = 'Mean E.Consumption(%)'

let initHeader = ()=>{
  let element = document.createElement('div')
  element.classList.add('header')

  let title = document.createElement('p')
  title.classList.add('header-title')
  title.innerHTML = `Study of grid resilience for Sonnen solar e- exchange v${pjson.version}`
  let subtitle = document.createElement('p')
  subtitle.classList.add('header-subtitle')
  subtitle.innerHTML = 'This small tool simulates a pool of prosumers with variable installed storage capacity and PV generation. The main goal is to find out which parameters will make the marketplace/grid more resilient without external grid energy purchase. Parameters used: '

  let list = document.createElement('div')
  list.classList.add('param-list')
  newAppendTo(list, 'div','param','',`N.Iterations: ${NREPETITIONS}`)
  newAppendTo(list, 'div','param','',`Prosumers: ${params.n_prosumers}`)
  newAppendTo(list, 'div','param','',`Hours: ${params.days*24}h`)
  newAppendTo(list, 'div','param','',`Time interval: ${params.tinterval}s`)
  newAppendTo(list, 'div','param','',`Battery threshold(%): ${params.sell_threshold}`)
  //let list = document.createElement('ul')
  //newAppendTo(list, 'li','','',`#Prosumers: ${params.n_prosumers}`)
  //newAppendTo(list, 'li','','',`#Hours: ${params.days*24}`)
  //newAppendTo(list, 'li','','',`#Time interval: ${params.tinterval}`)
  //newAppendTo(list, 'li','','',`#Battery(%) sell threshold: ${params.sell_threshold}`)

  element.appendChild(title)
  element.appendChild(subtitle)
  element.appendChild(list)

  newAppendTo(element, 'div','','loading-indicator','Calculating data...')
  main.appendChild(element)
}

let initCharts = (title, set)=>{
  let lchart, pchart, genpieChart
  let setChart = {}
  let {row, linechart, piechart, genpie} = newStatsRow(title, main, set)
  lchart = c3.generate({
    bindto: linechart,
    data: {
      columns: [
        [l_wsto].concat([]),
        [l_psto].concat([]),
      ],
      axes: {
        [l_wsto]: 'y',
        [l_psto]: 'y2'
      },
    },
    point: {
      show: false
    },
    axis: {
      y:{
        label: l_wsto,
        show: true,
        max: 16000,
        min: 100
      },
      y2: {
        label: l_psto,
        show: true,
        max: 100,
        min: 0
      }
    },
    legend: {
      position: 'inset',
      inset: {
        anchor: 'top-right',
        x: 30,
        y: 10,
        step: 2
      }
    },
    color: {
      pattern: ['#0BA58C', '#FD6F5B','#5D99C4', '#FFBF00', '#7F2D8D','#B6B2BD']
    }
  });
  pchart =c3.generate({
    bindto: piechart,
    data: {
      columns: [
      ],
      type : 'pie',
    },
    color: {
      pattern: ['#0BA58C', '#FD6F5B','#5D99C4', '#FFBF00', '#7F2D8D']
    }
  })
  genpieChart =c3.generate({
    bindto: genpie,
    data: {
      columns: [
      ],
      type : 'pie',
    },
    color: {
      pattern: ['#0BA58C', '#FD6F5B','#5D99C4', '#FFBF00', '#7F2D8D']
    }
  })
  setChart.lineChart = lchart
  setChart.lineChartEl = linechart
  setChart.pieChart = pchart
  setChart.pieChartEl = piechart
  setChart.genpieChart = genpieChart
  setChart.genpieChartEl = genpie
  setChart.series = {}
  return setChart
}

//let reloadLines = ({avg_psto, avg_wsto, total_sto,avg_sunpo, avg_hcon })=>{
let reloadLines = (allCharts)=>{
  document.getElementById('loading-indicator').innerHTML = ''
  for(let k in allCharts){
    let {lineChart, pieChart, genpieChart, series} = allCharts[k]
    let {avg_psto, avg_wsto, total_sto, avg_sunpo, avg_hcon, avg_bhist, avg_ghist} = series
    if(!!allCharts[k].calculated){
      lineChart.load({
        columns: [
          [l_wsto].concat(avg_wsto),
          [l_psto].concat(avg_psto),
        ]
      })  
      pieChart.load({
        columns: _.toPairs(_.mapKeys(avg_bhist, (v,k) => `${k}W`))
      })  
      genpieChart.load({
        columns: _.toPairs(_.mapKeys(avg_ghist, (v,k) => `${k}W`))
      })  
    }
  }
}

export {
  reloadLines,
  initCharts,
  initHeader,
  lineChart, 
  pieChart
}
