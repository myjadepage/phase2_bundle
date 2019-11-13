var path = require('path');
var express = require('express');
var router = express.Router();
var common = require('../lib/common');
var passport = require('../lib/passport');


router.get('/:id/',common.ensureAuthenticated, function(req, res) {
    var id = req.params.id;
	res.render('issuekey',{		
		date:common.currDateTime(),
        path:'/issuekey',
        id :id
	});	
});

module.exports = router;