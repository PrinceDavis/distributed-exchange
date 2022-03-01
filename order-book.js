'use strict'
const { Order } = require("./order");
const { OrderMap } = require("./order-map");
const {}

class OrderBook {
 constructor() {
  this.asks = new OrderMap()
  this.bids = new OrderMap()
 }

 cancelOrder(order) {
  if(order.price > 0) {
    this.bids.remove(order)
  }
  this.asks.remove(order)
 }

 processMarketOrder(order) {
   // to be continued
 }

 processLimitOrder(order) {
   const { price, quantity } = order
   let sideToAdd = null
   let sideToProcess = null
   let orderQueue = null
   if(price > 0) {
     sideToAdd = this.bids
     sideToProcess = this.asks
     orderQueue = this.asks.minPriceQueue
   }else {
     sideToAdd = this.asks
     sideToProcess = this.bids
     orderQueue = this.bids.maxPriceQueue
   }


   const bestPrice = orderQueue[0]
   if(quantity > 0 && sideToProcess.len > 0 &&  price > bestPrice.price) {
    this.processQueue(orderQueue, quantity)
   }

   // to be continued
 }

 processQueue(orderQueue, quantityToTrade) {
  let quantityLeft = quantityToTrade
  while(orderQueue.len() > 0 && quantityLeft > 0) {
    const headOrder = orderQueue.head()

    if(quantityLeft < headOrder.quantity) {
      const partialOrder = new Order({
        timestamp: Date.now(),
        price: headOrder.price,
        quantity: headOrder.quantity - quantityLeft
      })
      orderQueue.update(headOrder, partialOrder)
      quantityLeft = 0

    } else {
      quantityLeft = quantityLeft -+ headOrder.quantity
      this.cancelOrder(headOrder)
    }
  }
 }
}

module.exports = {
  OrderBook
}
