const fs = require('fs')

var writeTemperatureToLog = function(temperate, callback){

	fs.writeFile('../log/temperature.log', function(err) {
		if (err) {
			return console.log(err)
		}
		console.log('Temperature was logged')
	})

}

module.exports = {
	writeTemperatureToLog: writeTemperatureToLog
}