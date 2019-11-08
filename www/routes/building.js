var express = require('express');
var router = express.Router();
var common = require('../lib/common');


router.get('/',common.ensureAuthenticated, function(req, res) {   
	res.render('building_list',{	  
	  date:common.currDateTime(),
	  path:'/building_list'
	});	
});
module.exports = router;