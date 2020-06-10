var express = require('express')
var router = express.Router()
var db = require('../js/databaseHandler')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' })
});

router.post('/update', function(req, res, next) {

	temperature = req.body.data

	db.updateTemperature(temperature,function(err, results){
		(results) ? res.send({
			'status':true
		}) : res.send({'error':err}) 
	})

})

module.exports = router;
