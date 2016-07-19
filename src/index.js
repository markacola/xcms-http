
import {Plugin} from 'xcms-core'
import http from 'http'
import Stream from 'stream'
import statuses from 'statuses'

import {RequestPacket} from './packets'

export default class HttpPlugin extends Plugin {
  constructor() {
    super({
      name: 'http',
      handles: 'http-response'
    })
  }

  listen(...args) {
    const server = http.createServer(this.callback())
    return server.listen(...args)
  }

  callback() {
    return (req, res) => {
      this.emit(new RequestPacket(req, res))
    }
  }

  consumePacket(packet) {
    let {body} = packet
    const {res, status, headers} = packet

    res.statusCode = status
    res.statusMessage = statuses[status]

    if (body === null) {
      body = String(status)
      headers.set('Content-Type', 'text')
      headers.set('Content-Length', Buffer.byteLength(body))
    }

    for(let [field, value] of headers) {
      res.setHeader(field, value)
    }

    if (Buffer.isBuffer(body)) return res.end(body);
    if (typeof body === 'string') return res.end(body);
    if (body instanceof Stream) return body.pipe(res);

    body = JSON.stringify(body)
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json')
      res.setHeader('Content-Length', Buffer.byteLength(body))
    }
    res.end(body)
  }

}
