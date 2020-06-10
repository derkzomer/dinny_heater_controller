var heater = require('../js/heaterHandler')
var db = require('../js/databaseHandler')
var schedule = require('node-schedule')

// interval timer
// var j = schedule.scheduleJob('0-59 9-20 * * *', function(){

var readTemperatureEveryFifteenMinutes = function(){

	schedule.scheduleJob('* 9-20 * * *', function(){

		db.readLatestTemperature(function(err, temp){
			
			if (temp) {

				db.readLatestHeaterStatus(function(err, status){
					if (status) {
						if (temp[0].value < 18){
							if (status[0].status == 'off'){
								heater.turnOn()
								db.logHeaterToggle('on',function(err, results){
									(results) ? console.log('logged: heater off') : console.log(err)
								})
							} else if (status[0].status == 'on'){
								console.log('Room is cold, but heater is already on. No action required.')
							}
						} else if (temp[0].value > 20){
							if (status[0].status == 'on'){
								console.log('Room is warm and heater is not needed. Turning heater off')
								heater.turnOff()
								db.logHeaterToggle('off',function(err, results){
									(results) ? console.log('logged: heater off') : console.log(err)
								})
							} else if (status[0].status == 'off'){
								console.log('Room is warm, and heater is off. No action required.')
							}
						} else{
							if (status[0].status == 'off'){
								console.log('Room is cooling down, but threshold temperature has not yet been hit to turn on the heater. No action required.')
							} else if (status[0].status == 'on'){
								console.log('The room is warming up, but the threshold temperature has not yet been hit to turn off the heater. No action required.')
							}
						} 
					}
				}

			)}

		})

	})

}

module.exports = {
	readTemperatureEveryFifteenMinutes: readTemperatureEveryFifteenMinutes
}
