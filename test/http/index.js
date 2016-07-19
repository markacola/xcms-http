
import request from 'supertest'
import Http from 'http'
import stream from 'stream'

import {RequestPacket, ResponsePacket} from '../../src/packets'
import HttpPlugin from '../../src'

describe('http', () => {

  describe('RequestPacket', () => {

    it('should emit', (done) => {
      const http = new HttpPlugin()

      http.on('packet', (packet) => {
        packet.req.should.be.instanceof(Http.IncomingMessage)
        packet.res.should.be.instanceof(Http.ServerResponse)
        packet.should.be.instanceof(RequestPacket)
        done()
      })

      request(http.listen())
      .get('/')
      .end((err, res) => {
        if (err) throw err
      })
    })

  })

  describe('ResponsePacket', () => {

    it('should consume', (done) => {
      const http = new HttpPlugin()

      http.on('packet', (packet) => {
        const {req, res} = packet
        let responsePacket = new ResponsePacket(req, res)
        responsePacket.status = 200
        responsePacket.headers.set('Content-Type', 'text')
        responsePacket.body = 'test'
        http.consumePacket(responsePacket)
      })

      request(http.listen())
      .get('/')
      .end((err, res) => {
        if (err) throw err
        res.status.should.equal(200)
        res.text.should.equal('test')
        done()
      })
    })

    it('should handle null body', (done) => {
      const http = new HttpPlugin()

      http.on('packet', (packet) => {
        const {req, res} = packet
        let responsePacket = new ResponsePacket(req, res)
        responsePacket.status = 200
        http.consumePacket(responsePacket)
      })

      request(http.listen())
      .get('/')
      .end((err, res) => {
        if (err) throw err
        res.status.should.equal(200)
        res.text.should.equal('200')
        done()
      })
    })

    it('should handle buffer body', (done) => {
      const http = new HttpPlugin()

      http.on('packet', (packet) => {
        const {req, res} = packet
        let responsePacket = new ResponsePacket(req, res)
        responsePacket.status = 200
        responsePacket.body = Buffer.from('success')
        http.consumePacket(responsePacket)
      })

      request(http.listen())
      .get('/')
      .end((err, res) => {
        if (err) throw err
        res.status.should.equal(200)
        res.text.should.equal('success')
        done()
      })
    })

    it('should handle stream body', (done) => {
      const http = new HttpPlugin()

      http.on('packet', (packet) => {
        const {req, res} = packet
        let responsePacket = new ResponsePacket(req, res)
        responsePacket.status = 200
        let body = responsePacket.body = new stream.PassThrough()
        body.push('success')
        body.end()
        http.consumePacket(responsePacket)
      })

      request(http.listen())
      .get('/')
      .end((err, res) => {
        if (err) throw err
        res.status.should.equal(200)
        res.text.should.equal('success')
        done()
      })
    })

    it('should handle json body', (done) => {
      const http = new HttpPlugin()

      http.on('packet', (packet) => {
        const {req, res} = packet
        let responsePacket = new ResponsePacket(req, res)
        responsePacket.status = 200
        responsePacket.body = {
          success: true
        }
        http.consumePacket(responsePacket)
      })

      request(http.listen())
      .get('/')
      .end((err, res) => {
        if (err) throw err
        res.status.should.equal(200)
        res.body.success.should.be.true()
        done()
      })
    })

    it('should handle json body after headers sent', (done) => {
      const http = new HttpPlugin()

      http.on('packet', (packet) => {
        const {req, res} = packet
        let responsePacket = new ResponsePacket(req, res)
        responsePacket.res.writeHead(200, {
          'Content-Type': 'application/json'
        })
        responsePacket.body = {
          success: true
        }
        http.consumePacket(responsePacket)
      })

      request(http.listen())
      .get('/')
      .end((err, res) => {
        if (err) throw err
        res.status.should.equal(200)
        res.body.success.should.be.true()
        done()
      })
    })

  })

})
