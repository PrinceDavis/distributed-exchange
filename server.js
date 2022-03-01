'use strict'
require('dotenv').config()
const { PeerRPCServer } = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')


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

service.on('request', (rid, key, payload, handler) => {
  // send request to all clients
  handler.reply(error, payload)
})