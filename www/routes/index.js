var path = require('path');
var express = require('express');
var router = express.Router();
var common = require('../lib/common');
var passport = require('../lib/passport');
var fs= require('fs');


var obj={
	property:[]
};
fs.exists('./data/property.json', function(exists){	
		fs.readFile('./data/property.json','utf-8', function readFileCallback(err, data){
			if (err){
				console.log(err);
			} else {												
				return obj = JSON.parse(data); 
			}
		})
})


router.post("/property", function(req, res) {	
	fs.exists('./data/property.json', function(exists){	
	var filePath = path.join(__dirname, '/../data/property.json');	
	fs.readFile(filePath, function readFileCallback(err,result){
			if(err) {	
				res.json({});
				return;
			}		
			res.json(result);
		});

	});
});

// 국가코드와 이름 전번 넣기3
router.get('/countries', function(req, res) {
    var filePath = path.join(__dirname, '/../data/countries.json');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})
router.get('/timezone', function(req, res) {
    var filePath = path.join(__dirname, '/../data/timezones.json');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})

router.get('/login', function(req, res) {	
	if(req.user) res.redirect('/');
	res.render('auth/login',{
		title: 'phase2'	
	});
});

router.post('/login', passport.authenticate('local',{
	successRedirect: '/',
	failureRedirect: '/login', 
	failureFlash: true
	})
);

 router.get('/logout', function(req, res){
	req.logout();	
	res.header('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');		 
	res.redirect('/login');		
});

 router.get('/',common.ensureAuthenticated, function(req, res, next) { 
	if(req.user){
		res.render('index', { 
			title: 'phase2', 	 
			nav_title:'단지선택',
			nav_stitle:'',
			date:common.currDateTime(),			
			path:'/',	  
			data:obj.property
		});	
	}else{
		res.redirect('/login');	
	}
	});


router.get('/property_new',common.ensureAuthenticated,function(req, res,next) {
	res.render('property_new',{
		title: 'phase2',
		nav_title:'단지생성',
		nav_stitle:'',
		date:common.currDateTime(),		
		path:'/'
	});
  });
  
  router.get('/propery_new_done',common.ensureAuthenticated, function(req, res,next) {
	res.render('propery_new_done',{
		title: 'phase2',
		nav_title:'단지 생성 완료',
		nav_stitle:'',
		date:common.currDateTime(),	
		path:'/',
        data:obj.property
	});
});

    router.get('/property_del/:proId',common.ensureAuthenticated, function(req, res,next) {	
	res.render('property_del',{
		title: 'phase2',
		nav_title:'단지삭제',
		nav_stitle:'',
		date:common.currDateTime(),	
		path:'/',
        data:obj.property
	});
  });
  router.get('/property_edit',common.ensureAuthenticated, function(req, res,next) {
	res.render('property_edit',{
		title: 'phase2',
		nav_title:'단지수정',
		nav_stitle:'',
		date:common.currDateTime(),	
		path:'/',
        data:obj.property
	});
  });



router.get('/issuekey',common.ensureAuthenticated, function(req, res,next) {
	res.render('issuekey',{
		title: 'phase2', 
		nav_title:'센트럴 아이파크2',
		nav_stitle:'(경기도 가평군 청평면 고성리 761-1)',
		date:common.currDateTime(),
		path:'/issuekey'
	});	
});
router.get('/staff_list',common.ensureAuthenticated, function(req, res,next) {
	res.render('staff_list',{
		title: 'phase2', 
		nav_title:'센트럴 아이파크2',
		nav_stitle:'(경기도 가평군 청평면 고성리 761-1)',
		date:common.currDateTime(),
		path:'/staff_list'
	});	
});
router.get('/report',common.ensureAuthenticated,function(req, res,next) {
	res.render('report',{
		title: 'phase2', 
		nav_title:'센트럴 아이파크2',
		nav_stitle:'(경기도 가평군 청평면 고성리 761-1)',
		date:common.currDateTime(),
		path:'/report'
	});	
});




module.exports = router;
