var path = require('path');
var express = require('express');
var router = express.Router();
var common = require('../lib/common');
var passport = require('../lib/passport');
var fs= require('fs');


//--------------------------------------- text api
router.get("/property", function(req, res) {	
	fs.exists('./data/property.json', function(exists){	
	var filePath = path.join(__dirname, '/../data/property.json');	
	fs.readFile(filePath,'utf-8', function readFileCallback(err,result){
			if(err) {	
				res.json({});
				return;
			}		
			res.json(result);
		});

	});
});
router.get("/property_view", function(req, res) {	
	fs.exists('./data/property_view.json', function(exists){	
	var filePath = path.join(__dirname, '/../data/property_view.json');	
	fs.readFile(filePath,'utf-8', function readFileCallback(err,result){
			if(err) {	
				res.json({});
				return;
			}		
			res.json(result);
		});

	});
});
// text api-----------------------------------------------------------------



// 국가코드와 이름 전번 넣기
router.get('/countries', function(req, res) {
    var filePath = path.join(__dirname, '/../data/countries.json');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})
router.get('/timezone', function(req, res) {
    var filePath = path.join(__dirname, '/../data/time_zone.json');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})

// 빌딩타입
router.get('/building_type', function(req, res) {
    var filePath = path.join(__dirname, '/../data/building_type.json');
    var file = fs.readFileSync(filePath, 'utf8');
    var result = JSON.parse(file);
    res.send(result);
})



router.get('/login', function(req, res) {	
	if(req.user) res.redirect('/');
	res.render('auth/login');
});

router.post('/login', passport.authenticate('local',{
	successRedirect: '/',
	failureRedirect: '/login', 
	failureFlash: true
	})
);

 router.get('/logout', function(req, res){
	req.logout();			 
	res.redirect('/login');		
});

 router.get('/',common.ensureAuthenticated, function(req, res) { 
	if(req.user){
		res.render('index', { 			
			date:common.currDateTime(),			
			path:'/'			
		});	
	}else{
		res.redirect('/login');	
	}
});

router.get('/property_new',common.ensureAuthenticated,function(req, res) {
	res.render('property_new',{
		date:common.currDateTime(),		
		path:'/'
	});
  });


router.get('/propery_new_done',common.ensureAuthenticated,function(req, res) {
	res.render('propery_new_done',{
		date:common.currDateTime(),		
		path:'/'
	});
  });
  

router.post('/properties',common.ensureAuthenticated, function(req, res) {
	res.render('propery_new_done',{	
		date:common.currDateTime(),	
		path:'/'
	});
});

router.get('/property_del/:id',common.ensureAuthenticated, function(req, res) {	
	var id = req.params.id;
	res.render('property_del',{	
		date:common.currDateTime(),	
		path:'/',
		id : id
	});
});

router.get('/property_read/:id',common.ensureAuthenticated, function(req, res) {
	var id = req.params.id;
	res.render('property_read',{
		date:common.currDateTime(),	
		path:'/',
		id : id 
	});
});
router.get('/property_edit/:id',common.ensureAuthenticated, function(req, res) {
	var id = req.params.id;
	res.render('property_edit',{
		date:common.currDateTime(),	
		path:'/',
		id : id     
	});
});


router.get('/property_category/:id',common.ensureAuthenticated, function(req, res) {
	var id = req.params.id;
	res.render('property_category',{
		date:common.currDateTime(),	
		path:'/property_category',
		id : id     
	});
});

router.get('/properties/:id/building',common.ensureAuthenticated, function(req, res) {   
	var id = req.params.id;
	res.render('building_list',{	  
	  date:common.currDateTime(),
	  path:'/building_list',
	  id:id
	});	
});

router.get('/properties/:id/building_new',common.ensureAuthenticated, function(req, res) {   
	var id = req.params.id;
	res.render('building_new',{	  
	  date:common.currDateTime(),
	  path:'/building_list',
	  id:id
	});	
});

router.get('/properties/:id/room/:bid',common.ensureAuthenticated, function(req, res) {
	var id = req.params.id;
	var bid = req.params.bid;
	res.render('room_list',{		
		date:common.currDateTime(),
		path:'/building_list',
		id: id,
		bid: bid
	});	
});

router.get('/properties/:id/room_new/:bid',common.ensureAuthenticated, function(req, res) {
	var id = req.params.id;
	var bid = req.params.bid;
	res.render('room_new',{		
		date:common.currDateTime(),
		path:'/building_list',
		id: id,
		bid: bid
	});	
});

router.get('/properties/:id/doorlock/',common.ensureAuthenticated, function(req, res) {
	var id = req.params.id;
	res.render('doorlock_list',{		
		date:common.currDateTime(),
		path:'/doorlock_list',
		id: id
	});	
});

router.get('/properties/:id/issuekey/',common.ensureAuthenticated, function(req, res) {
    var id = req.params.id;
	res.render('issuekey',{		
		date:common.currDateTime(),
        path:'/issuekey',
        id :id
	});	
});

router.get('/properties/:id/staff/',common.ensureAuthenticated, function(req, res) {
    var id = req.params.id;
	res.render('staff_list',{		
		date:common.currDateTime(),
        path:'/staff_list',
        id :id
	});	
});

router.get('/properties/:id/report/',common.ensureAuthenticated,function(req, res) {
    var id = req.params.id;
	res.render('report',{		
		date:common.currDateTime(),
        path:'/report',
        id:id
	});	
});

module.exports = router;
