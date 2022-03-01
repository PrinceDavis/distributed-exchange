'use strict'
const { PeerRPCClient }  = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')
const link = new Link({
  grape: `http://${process.env.HOST}:${process.env.LINK_PORT}`,
  requestTimeout: 10000
})
link.start()
const peer = new PeerRPCClient(link, {})
peer.init()

const quantity = Math.floor(Math.random() * 100) + 1;
const price = Math.floor(Math.random() * 11) + 1
const payload = { quantity, price, symbol: 'tBTCUSD' }
peer.request('orderbook_worker', payload, { timeout: 100000 }, (err, result) => {
  if (err) throw err
  console.log( result)
})