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
  console.log(`[${Date()}]`, `${req.method}${req.url}`, req.headers['user-agent'])
  cb()
})

// ERROR HANDLING
app.use((err,req,res,cb) => {
  res.status(500).send(`Internal Server Error ${err}`)
})
app.use((req, res, next) => {
  res.status(404).send('Sorry cant find that!')
})

// ROUTES
app.get('/', (req,res) => {
  res.render('index')
})

app.post('/', ({body: {url}},res) => {

  let    reqUrl = `http://${url}`
   ,     gifUrl = 'http://api.giphy.com/v1/gifs/search?q=jeff+goldblum&api_key=dc6zaTOxFJmzC'

  fetch(gifUrl)
    .then(res  => res.json())
    .then(json => parseArr(json.data))
    .then(arr  => {
      request(reqUrl, (err, _, body) => {
        if (!err) {
          let         $ = cheerio.load(body)
           ,     imgArr = Array.from($('img'))

          imgArr.forEach(v => {$(v).attr('src', arr[rndNum(0,arr.length)])})
          res.send($.html())
        }
      })  
    })
})

app.listen(port, () => {
  console.log(`Open your favorite browser and cruise on over to port ${port}, be there or be square`)
})
