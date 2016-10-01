#!/usr/bin/env node
'use strict'

// THIRD PARTY MODULES
const     express = require('express')
  ,    bodyParser = require('body-parser')
  ,       request = require('request')
  ,       cheerio = require('cheerio')
  ,         fetch = require('node-fetch')

// PROJECT MODULES
  ,           app = express()
  ,        rndNum = require('./math')
  ,      parseArr = require('./parseJSON')
  ,[,,...cliArgs] = process.argv
  ,          port = process.env.PORT || 8080

// PUG CONFIG
app.set('view engine', 'pug')
app.set('port', port)
// MIDDLEWARE
app.use(express.static('public'))
app.use(bodyParser.urlencoded({extended: false}))
app.use((req, res, cb) => {
  // console.log(`[${Date()}]`, `${req.method}${req.url}`, req.headers['user-agent'])
  // console.log(req)
  cb()
})


// ROUTE
app.get('/', (req,res) => {
  res.render('giphy')
})

app.get('/gif', (req,res) => {
  res.render('giphy')
})

app.listen(port, () => {
  console.log(`Open your favorite browser and cruise on over to port ${port}, be there or be square`)
})
