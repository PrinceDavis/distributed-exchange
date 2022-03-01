const { OrderMap } = require("./order-map");

class OrderBook {
 constructor() {
  this.asks = new OrderMap()
  this.bids = new OrderMap()
 }
}
