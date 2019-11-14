var express = require('express');
var router = express.Router();
var common = require('../lib/common');


router.get('/',common.ensureAuthenticated, function(req, res) {   
	var id = req.params.id;
	res.render('building_list',{	  
	  date:common.currDateTime(),
	  path:'/building_list',
	  id:id
	});	
});

router.get('/building_new',common.ensureAuthenticated, function(req, res) {   
	var id = req.params.id;
	res.render('building_new',{	  
	  date:common.currDateTime(),
	  path:'/building_list',
	  id:id
	});	
});
module.exports = router;