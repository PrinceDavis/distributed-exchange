const { PriceQueue } = require('./price-queue')
class OrderSide {
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
}

module.exports = {
  OrderSide
}