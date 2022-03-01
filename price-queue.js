'use strict'
class PriceQueue {
  constructor({price}) {
    this.price = price
    this.volume = 0
    this.orders = []
  }

  len() {
    return this.orders.length
  }

  head() {
    this.orders.shift()
  }

  tail() {
    this.orders.pop()
  }

  add(order) {
    this.volume += order.quantity
    this.orders.push(order)
  }

  update(orderToSub, orderToAdd) {
    this.volume -= orderToSub.quantity
    this.volume += orderToAdd.quantity
  }

  remove(order) {
    const indexToDelete = this.orders.findIndex(el => el.price === order.price)

    if(indexToUpdate !== -1) {
      this.volume -= order.quantity
      return this.orders.splice(indexToDelete, 1)
    }
  }
}

module.exports = {
  PriceQueue
}