



/*!

 =========================================================
 * Light Bootstrap Dashboard - v1.4.0
 =========================================================

 * Product Page: http://www.creative-tim.com/product/light-bootstrap-dashboard
 * Copyright 2017 Creative Tim (http://www.creative-tim.com)
 * Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard/blob/master/LICENSE.md)

 =========================================================

 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

 */

var searchVisible = 0;
var transparent = true;

var transparentDemo = true;
var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function(){
    window_width = $(window).width();
    // check if there is an image set for the sidebar's background
    lbd.checkSidebarImage();
    // Init navigation toggle for small screens
    lbd.initRightMenu();
    //  Activate the tooltips
    $('[rel="tooltip"]').tooltip();
    $('.form-control').on("focus", function(){
        $(this).parent('.input-group').addClass("input-group-focus");
    }).on("blur", function(){
        $(this).parent(".input-group").removeClass("input-group-focus");
    });


   // toggle small or large menu
 $('#menu_toggle').on('click', function() {
  $('body').toggleClass('nav-md nav-sm')
  });

    // Fixes sub-nav not working as expected on IOS
$('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });
});




$(document).on('click', '.navbar-toggle', function(){
    $toggle = $(this);
    if(lbd.misc.navbar_menu_visible == 1) {
        $('html').removeClass('nav-open');
       lbd.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function(){
           $toggle.removeClass('toggled');
       }, 550);
    } else {
       setTimeout(function(){
           $toggle.addClass('toggled');
       }, 580);
       div = '<div id="bodyClick"></div>';
       $(div).appendTo('body').click(function() {
           $('html').removeClass('nav-open');
           lbd.misc.navbar_menu_visible = 0;
            setTimeout(function(){
               $toggle.removeClass('toggled');
               $('#bodyClick').remove();
            }, 550);
       });

      $('html').addClass('nav-open');
       lbd.misc.navbar_menu_visible = 1;
    }
});

$(window).on('resize', function(){
    if(navbar_initialized){
        lbd.initRightMenu();
        navbar_initialized = true;
    }
});


lbd = {
    misc:{
        navbar_menu_visible: 0
    },
    checkSidebarImage: function(){
        $sidebar = $('.sidebar');
        image_src = $sidebar.data('image');

        if(image_src !== undefined){
            sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'
            $sidebar.append(sidebar_container);
        }
    },
    initRightMenu: debounce(function(){
        if(!navbar_initialized){
            $sidebar_wrapper = $('.sidebar-wrapper');
            $navbar = $('nav').find('.navbar-collapse').html();

            mobile_menu_content = '';

            nav_content = $navbar;

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

            // navbar_form = $('nav').find('.navbar-form').get(0).outerHTML;

            $sidebar_nav = $sidebar_wrapper.find(' > .nav');

            // insert the navbar form before the sidebar list
            $nav_content = $(nav_content);
            // $navbar_form = $(navbar_form);
            $nav_content.insertBefore($sidebar_nav);
            // $navbar_form.insertBefore($nav_content);

            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
                event.stopPropagation();

            });

            mobile_menu_initialized = true;
        } else {
            if($(window).width() > 991){
                // reset all the additions that we made for the sidebar wrapper only if the screen is bigger than 991px
                // $sidebar_wrapper.find('.navbar-form').remove();
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                mobile_menu_initialized = false;
            }
        }
    },200)
}


// Returns a function, that, as long as it continues to be invoked, will not
// be triggered. The function will be called after it stops being called for
// N milliseconds. If `immediate` is passed, trigger the function on the
// leading edge, instead of the trailing.

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};


//단지선택 슬라이드 bx슬라이드 및  
$('#property_list' ).bxSlider( {
    speed: 500, 
    moveSlides: 3,    
    slideWidth:1000,  
    minSlides: 3,     
    maxSlides:3,        
    infiniteLoop: false,
    pager:false,
    responsive:true,    
    nextSelector: '.bxNext',
    prevSelector: '.bxPrev',
    nextText: '<i class="pe-7s-angle-right"></i>',
    prevText: '<i class="pe-7s-angle-left"></i>',      
    touchEnabled: false, //모달 충돌용방지1
    onSliderLoad: function () {//모달 충돌용방지2
        $('.bx-viewport').on('click','a.collapse-toggle', function () {                
            $(this).parent().find('.collapse-box').collapse('toggle'); 
        });
    }
});


// 단지삭제
$('#del_property').on('click', function(e) {
    var $modalDiv = $(e.delegateTarget);
    var id = $(this).data('recordId');
    // $.ajax({url: '/api/record/' + id, type: 'DELETE'})
    // $.post('/api/record/' + id).then()
    $modalDiv.addClass('loading');
    setTimeout(function() {
        $modalDiv.modal('hide').removeClass('loading');
    }, 1000)
});
// $('#confirm-delete').on('show.bs.modal', function(e) {
//     var data = $(e.relatedTarget).data();
//     $('.title', this).text(data.recordTitle);
//     $('.btn-ok', this).data('recordId', data.recordId);
// });


/* 단지선택 슬라이드 */
// $('#myProperty').carousel({
//     interval: 0,
//     wrap: false
// })  
// $('#myProperty').on('slid.bs.carousel', '', function() {
//     var $this = $(this);      
//     $this.children('.carousel-control').show();  
//     if($('.carousel-inner .item:first').hasClass('active')) {
//       $this.children('.left.carousel-control').hide();
//     } else if($('.carousel-inner .item:last').hasClass('active')) {
//       $this.children('.right.carousel-control').hide();    
//     }  
// });      


    // 로그인하기
    $(function(){    
        //전화번호입력 올바른가?
        $('p.desc > span').hide();          
        $("#phone-number-check").on('keydown', function(e){              
            var trans_num = $(this).val().replace(/-/gi,'').replace(/\D/g,'');
            var k = e.keyCode;
            if(trans_num.length >= 11 && ((k >= 48 && k <=126) || (k >= 12592 && k <= 12687 || k==32 || k==229 || (k>=45032 && k<=55203)) )){
                e.preventDefault();
            }
        }).on('blur', function(){
            if($(this).val() == ''){
                $('p.desc > span').show(); 
                $(this).val('');
                $(this).focus();  
            }else{
                var trans_num = $(this).val().replace(/-/gi,'');
                if(trans_num != null && trans_num != ''){                              
                    if(trans_num.length==11 || trans_num.length==10) {   
                        var regExp_ctn = /^(01[016789]{1}|02|0[3-9]{1}[0-9]{1})([0-9]{3,4})([0-9]{4})$/;
                        if(regExp_ctn.test(trans_num)){                            
                           $(this).val(trans_num);                           
                        }else{                          
                            $(this).val("");
                            $(this).focus();
                        }
                    }else {                       
                        $(this).val('');
                        $(this).focus();
                    }
                }
            }
        }); 
        
        //국가코드 외부에서 가지고오고 국가 선택시 변경이벤트
        var countryCode; 
        var phone_number; 
        var code;//서버에서 온 인증번호   
        var AuthTimer;        
         $('#CountryCode').empty();
         $('#CountryCode').append('<option selected="true" disabled>국가코드 선택</option>');        
         $('#CountryCode').prop('selectedIndex', 0);        
         $.ajax({
            // crossOrigin: true,
            url : '/countries', //json 불러오기 router이용해서 불러옴
            dataType :'json',
            success : function (data) {
                $.each(data, function (key, entry) {
                    $('#CountryCode').append($('<option></option>').attr('value', entry.phone).text(entry.name +' ( + ' + entry.phone +' )'));                   
                })
            },
            error: function(jqXHR, textStatus, errorThrown){
              console.log('Error: ' + textStatus + ' - ' + errorThrown);                     
          }    
         });
        $("#CountryCode").on("change", function(){ 
            countryCode = $(this).val().replace(/\D/g,'');            
        });
    
        //1 단계 :  인증번호 요청
        $('button#reqAuthen').click(function(){   
            var userNumber = $('input[name=phone]').val().replace(/(^0+)/, "");            
            phone_number = countryCode + userNumber;                        
            if(countryCode && userNumber){    
               var expired_at = new Date();    
               expired_at.setMinutes(expired_at.getMinutes() + 3);              
               axios({
                method: "POST",  
                url: "https://development.api.allegion.imgate.co.kr/v1/user/verification_code",                    
                dataType:"json",                   
                data:{
                    "phone_number": phone_number,
                    "need_signedup": true,
                    "expired_at": expired_at,                       
                    "is_test_mode": true
                    }
                })                  
                .then(function(res) {   
                    console.log(res.data);
                    alert("인증번호가 발송되었습니다. 문자를 확인해 주세요");     
                    code = res.data.verification_code;                
                    $('#authTime').show();                         

                    //3분인증용 카운트다운
                    AuthTimer = new $ComTimer()
                    AuthTimer.comSecond = 179;//10초 카운트다운(180초로 변경할것)
                    AuthTimer.fnCallback = function(){alert("다시인증을 시도해주세요.")}
                    AuthTimer.timer =  setInterval(function(){AuthTimer.fnTimer()},1000);
                    AuthTimer.domId = $("#authDo");
                                           
                })
                .catch(function (request, status, error){                          
                    var msg = "ERROR<br><br>"
                    msg += request.status + "<br>" + request.responseText + "<br>" + error;
                    console.log(msg);    
                    $('#phoneError').modal('show'); 
                    $('#phone-number-check').val('');
                })   
            }else{
                $('p.desc > span').show(); 
            }
            //2단계 : 인증 및 로그인  
       
            $('#authDo').click(function(){                  
                var verification_code = $('#resAuthen').val();
                if(verification_code == code){                   
                    AuthTimer.fnStop();                       
                    axios({
                        method: "POST",
                        url: "https://development.api.allegion.imgate.co.kr/v1/user/session",
                        dataType:"json",     
                        data:{
                                "phone_number": phone_number,
                                "verification_code": verification_code
                            }
                        })                                               
                        .then(function(res) {                         
                                console.log(res);   
                                $('#loginForm').submit();                                                                                                                 
                        })
                        .catch(function (request, status, error){  
                                msg = request.status + "<br>" + request.responseText + "<br>" + error;
                                console.log(msg);                           
                        })               
                }else if(!verification_code){
                    $('#resAuthen').attr('placeholder', '전달 받은 인증번호를 입력해 주세요').val('');  
                }else {
                    $('#resAuthen').attr('placeholder', '인증번호가 틀렸습니다. 다시 입력해 주세요').val('');                       
                }                         
            });
      
        });
        
    
     //인증용 카운트다운 함수및 객체
     function $ComTimer(){}
                        $ComTimer.prototype = {
                            comSecond : "",
                            fnCallback : function(){},
                            timer : "",
                            domId : "",
                            fnTimer : function(){
                                var m = Math.floor(this.comSecond / 60) + " : " + (this.comSecond % 60);	// 남은 시간 계산
                                this.comSecond--;					// 1초씩 감소
                                console.log(m);
                                this.domId.addClass('btn-info').html( m + " 인증번호 확인");
                                if (this.comSecond < 0) {			// 시간이 종료 되었으면..
                                    $('#authDo').removeClass('btn-info').html("인증하기");
                                    $('#resAuthen').val('');
                                    $('#authTime').html('인증요청시간이 지났습니다. 다시 인증번호를 요청해 주세요'); 
                                    $('#reqAuthen').html('인증번호 재요청'); 
                                    clearInterval(this.timer);		// 타이머 해제
                                    // alert("인증시간이 초과하였습니다. 다시 인증해주시기 바랍니다.")
                                }
                            },
                            fnStop : function(){                               
                                   clearInterval(this.timer);
                            }
                        }  
    });
    


    $('#logout').click(function(){                                             
        axios({
            method: "delete",
            url: "https://development.api.allegion.imgate.co.kr/v1/user/session",
        })                                                                               
            .then(function(res) {                         
                    console.log(res); 
                    location.href="/login"                                                                                           
            })
            .catch(function (request, status, error){  
                    msg = request.status + "<br>" + request.responseText + "<br>" + error;
                    console.log(msg);                           
            })             
              
});                   
