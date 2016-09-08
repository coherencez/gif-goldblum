'use strict'

const randomInt = (min, max) => {
  // min = Math.ceil(min) || 1
  if(arguments.length !== 0) {
	  min = Math.ceil(min) || 0
	  max = Math.floor(max)
	  return Math.floor(Math.random() * (max - min + 1)) + min
	}
	return null
}

module.exports = randomInt
