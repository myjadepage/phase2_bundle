var express = require('express');
var router = express.Router();
var common = require('../lib/common');

router.get('/:id/',common.ensureAuthenticated, function(req, res) {
	var id = req.params.id;
	res.render('doorlock_list',{		
		date:common.currDateTime(),
		path:'/doorlock_list',
		id: id
	});	
});
module.exports = router;