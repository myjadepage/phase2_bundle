var express = require('express');
var router = express.Router();
var common = require('../lib/common');

router.get('/',common.ensureAuthenticated, function(req, res) {
	res.render('doorlock_list',{
		title: 'phase2', 
		nav_title:'센트럴 아이파크2',
		nav_stitle:'(경기도 가평군 청평면 고성리 761-1)',
		date:common.currDateTime(),
		path:'/doorlock_list'
	});	
});
module.exports = router;