var mysql = require('mysql')
var config = require('../js/config')

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: config.db_password,
	database: 'dinny'
})

var updateTemperature = function(temperature, callback){

	var sql = "INSERT INTO temperature VALUES (NOW(),?)"

	connection.query(sql, temperature, function(err, rows, fields) {
		if (!err) {
			if (rows.length === 0) {
				callback(null, null)
			} else {
				callback(null, rows)
			}
		} else {
			console.log(err)
			callback(err, null)
		}
	})	

}

var readLatestTemperature = function(callback) {

	var sql = "SELECT ts,value FROM temperature ORDER BY ts DESC LIMIT 1"

	connection.query(sql, function(err, rows, fields) {
		if (!err) {
			if (rows.length === 0) {
				callback(null, null)
			} else {
				callback(null, rows)
			}
		} else {
			console.log(err)
			callback(err, null)
		}
	})
	
}

var logHeaterToggle = function(toggle, callback) {

	var sql = "INSERT INTO heater_status VALUES (NOW(),?)"

	connection.query(sql, toggle, function(err, rows, fields) {
		if (!err) {
			if (rows.length === 0) {
				callback(null, null)
			} else {
				callback(null, rows)
			}
		} else {
			console.log(err)
			callback(err, null)
		}
	})

}

var readLatestHeaterStatus = function(callback){

	var sql = "SELECT ts,status FROM heater_status ORDER BY ts DESC LIMIT 1"

	connection.query(sql, function(err, rows, fields) {
		if (!err) {
			if (rows.length === 0) {
				callback(null, null)
			} else {
				callback(null, rows)
			}
		} else {
			console.log(err)
			callback(err, null)
		}
	})

}

module.exports = {
	updateTemperature: updateTemperature,
	readLatestTemperature: readLatestTemperature,
	logHeaterToggle: logHeaterToggle,
	readLatestHeaterStatus: readLatestHeaterStatus
}
