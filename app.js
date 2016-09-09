#!/usr/bin/env node
'use strict'

// THIRD PARTY MODULES
const     express = require('express')
	,		    request = require('request')
	,       cheerio = require('cheerio')
	,					fetch = require('node-fetch')
	,           app = express()

// PROJECT MODULES
	,        rndNum = require('./math')
	,          urls = require('./urls')
	,			 parseArr = require('./parseJSON')
	,    urlsLength = urlArr.length
	,[,,...cliArgs] = process.argv

// LOGIC
// exit and display usage statement if no arguments are passed
if(!cliArgs[0]) {
	console.log('Usage:\n gif-goldblum [website]\n (e.g. gif-goldblum huffingtonpost.com)\n *Note*: Do not include the \'http://\' part of the the web address\n Enjoy!')
	process.exit(-1)
}

// ROUTE
app.get('/', (req,res) => {
	let       url = `http://${cliArgs[0]}`
	 ,     gifUrl = 'http://api.giphy.com/v1/gifs/search?q=charlie+day&api_key=dc6zaTOxFJmzC'

	fetch(gifUrl)
		.then(res => res.json())
		.then(json => parseArr(json.data))
		.then(arr => {
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

app.listen(8080)
console.log("Open your favorite browser and cruise on over to port 8080, be there or be square")
