'use strict'

module.exports = (array) => {
	let prependString = 'https://i.giphy.com/'
	 ,	 appendString = '.gif'

  return array.map(v => v.url)
              .map(v => v.slice(v.lastIndexOf('-')))
              .map(v => v.slice(1, v.length))
              .map(v => `${prependString}${v}${appendString}`)
}