var util = require('util');
require('date-utils');

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) { 
		return next();
	}else{	
		res.redirect('/login');
	}
}

exports.currDateTime = function() {	
	var d = new Date();	
	return d.toFormat('DD.MMM.YYYY HH24:MI');
};

exports.currDate = function() {
	var d = new Date();
	return d.toFormat('YYYYMMDD');
};

