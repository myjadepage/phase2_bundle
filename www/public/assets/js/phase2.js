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
 * 
 * 
 * 
 * 
 * custom common 시작
 * 
 * 
 * 
 * 
 * 
 */


/**
 *   웹전체 이름 / 설명
 */
$(document).ready(function() {
    var title ='phase2';
    var newDescription = '모바일도어락, 페이즈2,';
    document.title = title;
    $('.logo a.simple-text').text(title);
    $('meta[name="description"]').attr("content", newDescription);
})


/**
 * api 주소
 */
function endUrl(url){
    var API_ENDPOINT ='https://development.api.allegion.imgate.co.kr/v1/'
    return API_ENDPOINT + url;
}
var API_KEY = localStorage.getItem('api_key');

function headers(){
    var obj ={};    
    obj.Authorization = "Bearer " + API_KEY; 
    return obj;
}


/* 
 *  사이드바,상단네비 날짜시간설정
 */
var d =  new Date();
$('.timezone').text('[ '+ d + ' ]');


/**
 *   모든 페이지에 들어가는 상단네비 타이틀 함수
 */
function navTitle(big, small){
      $('span.nav_title').text(big),
      $('small.nav_stitle').text(small)    
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
 *   글자 입력수 제한
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
 *   상세주소 특수기호(-(하이픈), .(마침표), ,(콤마), ()(괄호), [](중괄호), {}(대괄호) )
 */
function characterCheck(obj) {
    var t;
    var RegExp = /[\/?;:|*~`!^\_+┼<>@\#$%&\'\"\\\=]/g;//정규식 구문   
    if (RegExp.test(obj)) {             
        t = obj.replace(RegExp, "");        
    }else{
        return obj;
    }
    alert("사용할 수 없는 특수기호는 삭제합니다."); 
    return t;
}

/**
 *      국가코드  json
 */

function countryCodejson(){  
    $.ajax({
        url : '/countries', //json 불러오기 router이용해서 불러옴
        dataType :'json',
        success : function (data) {
            $('select[name="country_code"]').empty();
            $('select[name="country_code"]').append('<option  value="0" selected="true" disabled>국가 코드 선택</option>');
            $('select[name="country_code"]').prop('selectedIndex', 0);         
            $.each(data, function (key, entry) {                
                $('select[name="country_code"]').append($('<option></option>').attr('value', entry.phone).text(entry.name +' ( + ' + entry.phone +' )'));                          
            })
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log('Error: ' + textStatus + ' - ' + errorThrown);   
          alert("국가코드의 내용을 불러 올 수 없습니다.");                   
        }    
    });      
}

/**
 *      타임존 
 */
function timeZone(){
    $('select[name="timezone"]').empty();
    $('select[name="timezone"]').append('<option  value="0" selected="true" disabled>타임존 선택</option>');
    $('select[name="timezone"]').prop('selectedIndex', 0);  
    $.ajax({
        url : '/timezone', //json 불러오기 router이용해서 불러옴
        dataType :'json',
        success : function (data) {
            console.log(data);
            $.each(data, function (key, entry) { 
                $('select[name="timezone"]').append($('<option></option>').attr('value', entry.code).text('['+entry.code+'] '+entry.ko)); 
            })
        },
        error: function(jqXHR, textStatus, errorThrown){
          console.log('Error: ' + textStatus + ' - ' + errorThrown);  
          alert("타임존의 내용을 불러 올 수 없습니다.");                    
        }    
    });
}

/**
 *      day-type-offset option
 */
function dayTimeset(){
    $('select[name="day_type_offset"]').empty();
    $('select[name="day_type_offset"]').append('<option selected="true" value="1200">12 : 00</option>')
    for(var i=0; i<10 ;i++){
        $('select[name="day_type_offset"]').append($('<option></option>').attr('value', "0"+ i +"00").text("0"+ i +" : 00"));         
    }   
    for(var i=10; i<24 ;i++){
        $('select[name="day_type_offset"]').append($('<option></option>').attr('value', i + "00").text( i + " : 00"));         
    }    
}

/**
 *      빌딩 타입
 */

// function buildingtype(){
//     $('select[name="buildingtype"]').empty();
//     $('select[name="buildingtype"]').append('<option  value="0" value="0" selected="true">빌딩 타입 선택</option>');
//     $('select[name="buildingtype"]').prop('selectedIndex', 0);  
//     $.ajax({
//         url : '/building_type', //json 불러오기 router이용해서 불러옴
//         dataType :'json',
//         success : function (data) {
//             console.log(data);
//             $.each(data, function (entry) { 
//                 $('select[name="buildingtype"]').append($('<option></option>').attr('value', entry.ko).text(entry.ko)); 
//             })
//         },
//         error: function(jqXHR, textStatus, errorThrown){
//           console.log('Error: ' + textStatus + ' - ' + errorThrown);
//           alert("빌딩타입의 내용을 불러 올 수 없습니다.");                     
//         }    
//     });
// }



/*
 *  로그아웃 api
 */    
$('#logout').click(function(){  
    var url ="user/session"   
        $.ajax({
            method: "delete",
            url : endUrl(url),
            headers : headers()
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

// 단지정보입력 여부 체크

