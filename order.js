class Order {
  constructor({ timestamp, price, quantity,  symbol, type }) {
    this.timestamp = timestamp;
    this.price = price
    this.quantity = quantity
    this.symbol = symbol
    this.type = type
  }

  toJson() {
    return {
      timestamp: this.timestamp,
      price: this.price,
      quantity: this.quantity,
      symbo: this.symbol
    }
  }
}


const  OderTypes = {
MARKET_ODER: 'market_order',
LIMITE_ORDER: 'limit_order'
}

module.exports = {
  Order,
  OderTypes
}