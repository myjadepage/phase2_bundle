require('date-utils');

exports.currDateTime = function() {

	var d = new Date();
	return d.toFormat('DD.MMM.YYYY HH24:MI');
};

exports.currDate = function() {
	var d = new Date();
	// var dString = ''+d.getFullYear();
	// if(d.getMonth() < 10)
	// 	dString+='0'+(d.getMonth()+1);
	// else
	// 	dString+=(d.getMonth()+1);
	// dString+= d.getDate();

	// return dString;

	return d.toFormat('YYYYMMDD');
};
