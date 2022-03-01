'use strict'
require('dotenv').config()
const { PeerRPCServer } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')

const { OrderBook } = require('./order-book')
const { Order, OrderTypes } = require('./order')

const link = new Link({
  grape: `http://${process.env.HOST}:${process.env.LINK_PORT}`
})

const peer = new PeerRPCServer(link, {})
peer.init()

const service = peer.getTransportClass('server')
server.listen(process.env.SERVER_PORT)

setInterval(() => {
  link.announce('orderbook_worker', service.port, {})

}, 1000)

const orderBook = new OrderBook()
service.on('request', (rid, key, payload, handler) => {
  const { price, quantity, type, symbol } = payload
  const order = new Order({
    timestamp: Date().now(),
    quantity,
    symbol,
    price
  })
let result = null
let error = null

  if(type === OrderTypes.LIMITE_ORDER) {
    result = orderBook.processLimitOrder(order)
  }else if(type === OrderTypes.MARKET_ODER) {
    result = orderBook.processMarketOrder()
  }else {
    error = new Error('order type does not exist')
  }

  const result = fibonacci(payload.number)
  handler.reply(error, result)
})