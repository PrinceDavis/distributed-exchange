const { DoublyLinkedList } = require('./linked-list')

class OrderQueue {
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
    this.volume = this.volume + order.quantity
    this.orders.push(order)
  }
}

module.exports = {
  OrderQueue
}