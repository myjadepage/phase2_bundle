var path = require('path');
var express = require('express');
var router = express.Router();
var common = require('../lib/common');
var passport = require('../lib/passport');

router.get('/:id/',common.ensureAuthenticated, function(req, res) {
    var id = req.params.id;
	res.render('staff_list',{		
		date:common.currDateTime(),
        path:'/staff_list',
        id :id
	});	
});

module.exports = router;