'use strict'
const RbTree = require('red-black-tree-js')
const { PriceQueue } = require('./price-queue')
class OrderMap {
  constructor() {
    this.priceTree = new RbTree()
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
      this.priceTree.insert(prince, priceString)
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
      this.priceTree.remove(price)
      this.depth--
    }

    this.numberOfOrders--
    this.volume -= deletedEl.quantity
  }

  maxPriceQueue() {
    if(this.depth > 0) {
      const { key, value } = this.priceTree.maxNode()
      return this.prices.get(value)
    }
    return null
  }

  minPriceQueue() {
    if(this.depth > 0) {
      const { key, value } = this.priceTree.minNode()
      return this.prices.get(value)
    }
    return null
  }
}

module.exports = {
  OrderMap
}