class Params{
  constructor(){
    this.n_prosumers = 200
    this.days = 3
    this.external_grid = false
    this.maxPV = 5e3
    this.minPV = 500
    this.batteries = [0, 4000, 8000, 16000]
    this.PV = [0, 1000,2000,4000,5000]
    this.tinterval = 10 // each iteration is 10 sec
    this.sell_threshold = 10 //%
    this.kwh_price = 18 // € cts
  }
}

let params = new Params()

export default params
