class Order {
  constructor({ cid, price, quantity,  symbol, type }) {
    this.cid = cid;
    this.price = price
    this.quantity = quantity
    this.symbol = symbol
    this.type = type
  }

  toJson() {
    return {
      cid: this.cid,
      price: this.price,
      quantity: this.quantity,
      symbo: this.symbol
    }
  }
}


const  OderType = {
MARKET_ODER: 'market_order',
LIMITE_ORDER: 'limit_order'
}