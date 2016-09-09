'use strict'

module.exports = (array) => {
	let prependString = 'https://i.giphy.com/'
	 ,	 appendString = '.gif'

	return array	
						.map(v => v.url)
						.map(v => v.slice(v.length - 18))
						.map(v => {
							if (v.charAt(0) === '-') {
								return v.slice(1, v.length)
							}
							return v
						})
						.map(v => `${prependString}${v}${appendString}`)

}