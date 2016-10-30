/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

if($(".header-normal").length){
    $(".header-normal").backstretch($('.header-normal').attr('bg'));
}

if($(".footer-wrapper").length){
    $(".footer-wrapper").backstretch($('.footer-wrapper').attr('bg'));
}

var nav = $('.header-mobile');
$(window).scroll(function () {                
    if ($(this).scrollTop() > 5) {
        nav.show();
    } else {
        nav.hide();
    }
});