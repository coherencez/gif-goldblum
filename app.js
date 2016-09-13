#!/usr/bin/env node
'use strict'

// THIRD PARTY MODULES
const     express = require('express')
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
app.use((req, res, cb) => {
  console.log(`[${Date()}]`, `${req.method}${req.url}`, req.headers['user-agent'])
  console.log(req)
  cb()
})


// LOGIC
// exit and display usage statement if no arguments are passed
if(!cliArgs[0]) {
  console.log('Usage:\n gif-goldblum [website]\n (e.g. gif-goldblum huffingtonpost.com)\n *Note*: Do not include the \'http://\' part of the the web address\n Enjoy!')
  process.exit(-1)
}

// ROUTE
app.get('/', (req,res) => {
  let       url = `http://${cliArgs[0]}`
   ,     gifUrl = 'http://api.giphy.com/v1/gifs/search?q=jeff+goldblum&api_key=dc6zaTOxFJmzC'

  fetch(gifUrl)
    .then(res  => res.json())
    .then(json => parseArr(json.data))
    .then(arr  => {
      request(url, (err, _, body) => {
        if (!err) {
          let         $ = cheerio.load(body)
           ,     imgArr = Array.from($('img'))

          imgArr.forEach(v => {$(v).attr('src', arr[rndNum(0,arr.length)])})
          res.send($.html())
        }
      })  
    })
})

app.get('/gif', (req,res) => {
  res.render('giphy')
})



app.listen(port, () => {
  console.log(`Open your favorite browser and cruise on over to port ${port}, be there or be square`)
})
