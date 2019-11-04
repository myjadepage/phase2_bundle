var util = require('util');
require('date-utils');

exports.ensureAuthenticated = function ensureAuthenticated(req, res, next) {
    // 로그인이 되어 있으면, 다음 파이프라인으로 진행
    if (req.isAuthenticated()) { 
		return next();
	}
	// 로그인이 안되어 있으면, login 페이지로 진행
    res.redirect('/login');
}


exports.currDateTime = function() {	
	var d = new Date();	
	return d.toFormat('DD.MMM.YYYY HH24:MI');
};

exports.currDate = function() {
	var d = new Date();
	return d.toFormat('YYYYMMDD');
};


exports.timezone = function(){
	var d = new Date();	
	return d;
};
