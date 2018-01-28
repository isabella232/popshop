'use strict'

const express = require('express')
const cookieParser = require('cookie-parser')
const multer = require('multer')
const request = require('request-promise-native')

function getForterToken(req) {
  // TODO: impelement
  // see http://expressjs.com/en/api.html#req.cookies
  return ''
}

function createAuth() {
  // TODO: implement
  // see https://github.com/request/request#http-authentication
  return {}
}

function createHeaders() {
  // TODO: impelement
  // Use the headers from step 1
  return {}
}

function createOrder(id, forterToken, inputs) {
  // TODO: impelement
  // Use the request body from step 1
  return {}
}


async function sendToForter(forterToken, inputs) {
  const id = 'TEST'
  const auth = createAuth()
  const headers = createHeaders()
  const json = createOrder(id, forterToken, inputs)
  const {action} = await request.post(`https://api.forter-secure.com/v2/orders/${id}`, {auth, headers, json})
  return action
}

const app = express()
app.use(cookieParser())
app.use(express.static('static'))
app.post('/order', multer().none(), async (req, res) => {
  try {
    const forterToken = getForterToken(req)
    const decision = await sendToForter(forterToken, req.body)
    res.json({status: 'success', decision})
  } catch (err) {
    console.error('error: %s', err.message)
    res.json({status: 'error'})
  }
})

app.listen(8080, () => {
  console.log('listening on port 8080')
})
