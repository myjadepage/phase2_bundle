var express = require('express');
var router = express.Router();
var common = require('../lib/common');

router.get('/',common.ensureAuthenticated, function(req, res) {
	res.render('doorlock_list',{		
		date:common.currDateTime(),
		path:'/doorlock_list'
	});	
});
module.exports = router;