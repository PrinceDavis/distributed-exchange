const { PriceQueue } = require('./price-queue')
class OrderMap {
  constructor() {
    this.prices = new Map()
    this.volume = 0
    this.numberOfOrders = 0
    this.depth = 0;
  }

  len() {
    return this.numberOfOrders
  }

  add(order) {
    const { price, quantity } = order
    const priceString = price.toString()
    const priceQueue = this.prices.get(priceString)

    if(!priceQueue) {
      const priceQueue = new PriceQueue({ price })
      this.prices.set(priceString, priceQueue)
      this.depth++
    }
    this.numberOfOrders++
    this.volume += quantity
    return priceQueue.add(order)
  }

  remove(order) {
    const { price } = order;
    const priceString = price.toString()

    const priceQueue = this.prices.get(priceString)
    const [deletedEl]  = priceQueue.remove(order)

    if(priceQueue.len() === 0) {
      this.prices.delete(priceString)
      this.depth--
    }

    this.numberOfOrders--
    this.volume -= deletedEl.quantity
  }
}

module.exports = {
  OrderMap
}