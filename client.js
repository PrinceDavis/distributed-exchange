'use strict'
const { PeerRPCClient }  = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')
const { v4: uuidV4 } = require('uuid')

const { OrderBook } = require('./order-book')
const { Order, OrderTypes } = require('./order')

const link = new Link({
  grape: `http://${process.env.HOST}:${process.env.LINK_PORT}`,
  requestTimeout: 10000
})
link.start()
const peer = new PeerRPCClient(link, {})
peer.init()

/** create own order */
const orderBook = new OrderBook()
const quantity = Math.floor(Math.random() * 100) + 1;
const price = Math.floor(Math.random() * 11) + 1
const myClientId = uuidV4()

const payload = { quantity, price, symbol: 'tBTCUSD', clientId: myClientId, type: OrderTypes.LIMITE_ORDER }

const { price, quantity, type, symbol } = payload
const order = new Order({
  timestamp: Date().now(),
  quantity,
  symbol,
  price
})

if(type === OrderTypes.LIMITE_ORDER) {
  orderBook.processLimitOrder(order)
}else if(type === OrderTypes.MARKET_ODER) {
  orderBook.processMarketOrder()
}


peer.request('orderbook_worker', payload, { timeout: 100000 }, (err, result) => {
  if (err) throw err

 const { price, quantity, type, symbol, clientId  } = result
 if(clientId !== myClientId) {
  const order = new Order({
    timestamp: Date().now(),
    quantity,
    symbol,
    price
  })
  if(type === OrderTypes.LIMITE_ORDER) {
    result = orderBook.processLimitOrder(order)
  }else if(type === OrderTypes.MARKET_ODER) {
    result = orderBook.processMarketOrder()
  }else {
    error = new Error('order type does not exist')
  }
 }
})