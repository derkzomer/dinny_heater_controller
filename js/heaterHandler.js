const request = require('request')
var config = require('../js/config')

var turnOff = function(req, res, next){

	request.get('https://maker.ifttt.com/trigger/heater_off/with/key/'+config.ifttt_key)
		.on('response', function(response){
			console.log(response.statusCode)
			console.log(response.headers)
		})
		.on('error', function(err){
			console.log(err)
		})

}

var turnOn = function(req,res,next){

	request.get('https://maker.ifttt.com/trigger/heater_on/with/key/'+config.ifttt_key)
		.on('response', function(response){
			console.log(response.statusCode)
			console.log(response.headers)
		})
		.on('error', function(err){
			console.log(err)
		})

}

module.exports = {
	turnOn: turnOn,
	turnOff: turnOff
}