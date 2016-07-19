
import {Packet} from 'xcms-core'

export class RequestPacket extends Packet {
  constructor(req, res) {
    super({
      type: 'http-request',
      req,
      res
    })
  }
}

export class ResponsePacket extends Packet {
  constructor(req, res) {
    super({
      type: 'http-response',
      req,
      res,
      status: 404,
      headers: new Map(),
      body: null
    })
  }
}
