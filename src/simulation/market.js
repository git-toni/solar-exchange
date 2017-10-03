import game from './game'
import params from './params'

class Market{
  constructor(){
    this.findSeller = this.findSeller.bind(this)
    this.purchase = this.purchase.bind(this)
  }
  purchase(buyer, amount){
    let seller = this.findSeller()
    if(!!seller){
      //console.log('seller found',amount, seller.current_storage, buyer.current_storage)
      seller.current_storage -= amount
      //buyer.current_storage += amount
      return true
    }
    else{
      return false
    }
  }
  findSeller(){
    let seller
    const {prosumers} = game
    for(let s=0;s<prosumers.length;s++){
      if(prosumers[s].percentage() > params.sell_threshold){
        return prosumers[s]
      }
    }
    return undefined
  }
}
const market = new Market()

export default market
