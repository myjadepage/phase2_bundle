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


/**
 * 웹전체 이름 / 설명
 */
var title ='phase2';
var newDescription = '모바일도어락, 페이즈2,';
document.title = title;
$('.logo a.simple-text').val(title);
$('meta[name="description"]').attr("content", newDescription);


/**
 * api 주소
 */
var API_ENDPOINT ='https://development.api.allegion.imgate.co.kr/v1/'
var API_KEY = localStorage.getItem('api_key');

/* 
 *사이드바,상단네비 날짜시간설정
 */
var d =  new Date();
$('.timezone').text('[ '+ d + ' ]');


/**
 * 모든 페이지에 들어가는 함수
 * @param {상단타이틀 or 프라퍼티 이름} big 
 * @param {주소} small 
 */
function navTitle(big, small){
    $('.nav_title').text(big);
    $('.nav_stitle').text(small);
}


/* 
 *로그인 폰번호 체크 "-" 제외
 */
function phoneNumCheck(){
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
}

/**
 * 글자 입력수 제한
 */
function chkword(obj, maxlength) {     
    var str = obj.value; // 이벤트가 일어난 컨트롤의 value 값     
    var str_length = str.length; // 전체길이       
    
    // 변수초기화     
    var max_length = maxlength; // 제한할 글자수 크기     
    var i = 0; // for문에 사용     
    var ko_byte = 0; // 한글일경우는 2 그밗에는 1을 더함     
    var li_len = 0; // substring하기 위해서 사용     
    var one_char = ""; // 한글자씩 검사한다     
    var str2 = ""; // 글자수를 초과하면 제한할수 글자전까지만 보여준다.       
    for (i = 0; i < str_length; i++) {         
        // 한글자추출         
        one_char = str.charAt(i);             
        ko_byte++;         
    }           
    // 전체 크기가 max_length를 넘지않으면         
    if (ko_byte <= max_length) {             
        li_len = i + 1;        
     }            
     // 전체길이를 초과하면     
     if (ko_byte > max_length) {         
         alert(max_length + " 글자 이상 입력할 수 없습니다. \n 초과된 내용은 자동으로 삭제 됩니다. ");         
         str2 = str.substr(0, max_length);         
         obj.value = str2;    
        }     
        obj.focus();   
    }

    /**
     * 상세주소 특수기호(-(하이픈), .(마침표), ,(콤마), ()(괄호), [](중괄호), {}(대괄호) 제외), 이모티콘 입력 불가
     */

function characterCheck(obj) {
    var RegExp = /[ \{\}\[\]\/?.,;:|\)*~`!^\-_+┼<>@\#$%&\'\"\\\(\=]/gi;//정규식 구문   
    if (RegExp.test(obj)) {
        alert("특수문자는 입력하실 수 없습니다.");
        obj = obj.substring(0, obj.length - 1);//특수문자를 지우는 구문
    }
}

/* 
 *    로그인  api
 */
$(function(){ 
    $('p.desc > span').hide();  
    phoneNumCheck();
        
    //국가코드 외부에서 가지고오고 국가 선택시 변경이벤트
    var countryCode; 
    var phone_number; 
    var code;
    var AuthTimer;        
     $('#CountryCode').empty();
     $('#CountryCode').append('<option selected="true" disabled>국가코드 선택</option>');        
     $('#CountryCode').prop('selectedIndex', 0);        
     $.ajax({        
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
    
    //인증번호 요청 api
    $('button#reqAuthen').click(function(){   
        var userNumber = $('input[name=phone]').val().replace(/(^0+)/, "");  //맨 앞 "0"제거
        phone_number = countryCode + userNumber;              
        if(countryCode && userNumber){         
           $.ajax({
            method: "POST",  
            url: API_ENDPOINT + "user/verification_code", 
            contentType: "application/json; charset=utf-8",
            data:JSON.stringify({
                "phone_number": phone_number,
                "need_signedup": true,                                     
                "is_test_mode": true                   
                })
            })                  
            .done(function(res) { 
                console.log(res)
                alert("인증번호가 발송되었습니다. 문자를 확인해 주세요");                        
                code = res.verification_code;  
                var endSeconds = Math.floor(new Date(res.expired_at) / 1000);
                var startSeconds = Math.floor(Date.now() / 1000);
                var expired_at = endSeconds - startSeconds;
                console.log(expired_at )

                // $('button#reqAuthen').addClass('active');
                $('button#reqAuthen').attr('disabled', true);
                $('#authTime').show();    
                
                AuthTimer = new $ComTimer()
                AuthTimer.comSecond = expired_at;//(180초 : 3 분)
                AuthTimer.timer =  setInterval(function(){                    
                    AuthTimer.fnTimer();                
                }, 1000);
                AuthTimer.domId = $("#authDo"); 
                // //인증번호 버튼 재 클릭시 가속도 붙는거땜에 넣어줘야함
                // $('button#reqAuthen.active').click(function(){
                //     AuthTimer.fnStop();                     
                //     $('button#reqAuthen').removeClass('active');
                // });
            })
            .fail(function (request, status, error){                          
                var msg = "ERROR<br><br>"
                msg += request.status + "<br>" + request.responseText + "<br>" + error;
                console.log(msg);    
                $('#phoneError').modal('show'); 
                $('#phone-number-check').val('');
            })   
        }else{
            $('p.desc > span').show(); 
        }              
        //2단계 : 인증 및 로그인 api   
        $('#authDo').click(function(){                                                                         
            var verification_code = $('#resAuthen').val();
            if(verification_code == code){                   
                AuthTimer.fnStop();//인증코드 입력하면 카운트다운 스탑
                $.ajax({
                    method: "POST",
                    url: API_ENDPOINT+"user/session",
                    contentType: "application/json; charset=utf-8",  
                    data:JSON.stringify({
                            "phone_number": phone_number,
                            "verification_code": verification_code
                    })
                })  
                .done(function(res) {  
                    console.log(res);                       
                    $('#sendPhone').val(res.phone_number); 
                    $('#sendName').val(res.name)
                    localStorage.setItem('api_key',res.api_key);
                    $('#loginForm').submit();    
                }) 
               .fail(function (request, status, error){  
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
 
    /*
 *인증용 카운트다운 함수및 객체
 */
 function $ComTimer(){}
 $ComTimer.prototype = {     
     comSecond : "",         
     timer : "",
     domId : "",
     fnTimer : function(){
         var m = Math.floor(this.comSecond / 60) + " : " + (this.comSecond % 60);	// 남은 시간 계산   
         console.log(m);
         this.domId.addClass('btn-info').html( m + " 인증번호 확인");
         if (this.comSecond < 0) {			// 시간이 종료 되었으면..             
             $('#authDo').removeClass('btn-info').html("인증하기");
             $('#resAuthen').val('');
             $('#authTime').html('인증요청시간이 지났습니다. 다시 인증번호를 요청해 주세요'); 
             $('#reqAuthen').html('인증번호 재요청'); 
             clearInterval(this.timer);		// 타이머 해제  
         }
         this.comSecond--;				// 1초씩 감소    
     },
     fnStop : function(){                               
        clearInterval(this.timer);        
     }
 }  


/*
 *로그아웃 api
 */    
$('#logout').click(function(){     
        $.ajax({
            method: "delete",
            url: API_ENDPOINT+ "user/session",
            headers : {
                "Authorization": "Bearer " + API_KEY
            }
        })                                                                               
        .done(function(res) {                         
            console.log(res); 
            localStorage.removeItem('api_key');                   
            location.replace('/logout');                                                                    
        })
        .fail(function (request, status, error){  
            msg = request.status + "<br>" + request.responseText + "<br>" + error;
            console.log(msg);                           
        })   
  });  
});


/**
 * property list api
 */



/**
 * 단지목록슬라이드 bx슬라이드 //인덱스
 * 
 */
function propertyList(){
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
}


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
    

                