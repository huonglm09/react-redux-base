/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function($) {
    "use strict";
    //Atrribute
    var attr = {
        aType: 'data-type',
        aId: 'data-id',
        aGet: 'data-get',
        aBase: 'data-base',
        aPath: 'data-path'
    };
    //Generate attribute
    var generate = function(attr, val) {
        return '[' + attr + '="' + val + '"]';
    };
    //Element in DOM
    var element = {
        body: 'body',
        notifyMenu: generate(attr.aType, 'notifications'),
        notifyUrl: generate(attr.aType, 'notify-url'),
        notifyList: '.notify-list',
        notifyMenuA: '.notify-menu',
        notifyBell: '.fa-bell'
    };
    var baseUrl = $(element.body).attr(attr.aBase);
    var urls = {};    
    var settings = $.extend({
        //Convert to uppercase 
        convertCase : function(str) {
            var lower = str.toLowerCase();
            return lower.replace(/(^| )(\w)/g, function(x) {
              return x.toUpperCase();
            });
        },        
        //Management action
        action: function(event, obj, callback) {
            $(document).on(event, obj, function() {
                callback($(this));
            });
        },
        checkAll: function(checkAll, checkOne) {
            if (this.root.length) { 
                settings.action('click', checkAll, function(selector) {
                    var val = selector.val();
                    if (val === "off") {
                        selector.val('on');
                        $(checkOne).map(function() {
                            this.checked = true;
                        });
                    } else {
                        selector.val('off');
                        $(checkOne).map(function() {
                            this.checked = false;
                        });
                    }
                });
            }
        },
        popup: function(data) {
            var html = '<div class="modal fade" id="' + data.id + '" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">' +
                    '<div class="modal-dialog">' +
                    '<div class="modal-content">' +
                    '<div class="modal-header">' +
                    '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>' +
                    '<h4 class="modal-title" id="myModalLabel">' + data.title + '</h4>' +
                    '</div>' +
                    '<div class="modal-body">';
            if (data.content && data.content !== "") {
                html += data.content;    
            }                    
            html += '</div>' +
                    '<div class="modal-footer">';
            if (data.button && data.button !== "") {
                html += '<button type="button" class="btn btn-default" data-dismiss="modal">' + data.button + '</button>';
            }
            if (data.submit && data.submit !== "") {
                html += '<button type="button" class="btn btn-primary" data-type="query-actions" data-id="' + data.data_id + '">' + data.submit + '</button>';
            }
            html += '</div></div></div></div>';
            
            return html;
        },
        //Delay function
        delay: (function() {
            var timer = 0;
            return function(callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })()
    });   
    
    var fn = {
        init: function() {            
            this.self = $(this);
            
            $(element.notifyMenu).length ? fn.processNotification.call(this) : 1 === 1;            
        },        
        processNotification: function() {      
            //$(window).scroll(function() {
            //    if($(window).scrollTop() == $(document).height() - $(window).height()) {
                       // ajax call get data from server and append to the div
            //    }
            //});
            
            var notifyUrl = $(element.notifyUrl).attr(attr.aId);
            
            fn.ajax(notifyUrl, 'get', {}, 'json', function(response) {
                if(response.status === true) {                    
                    var bell = $(element.notifyMenu).find(element.notifyBell);
                    if(response.new > 0) {                                                
                        bell.attr('style', 'color: #ff0000;');
                        bell.append('<span style="position: absolute; top: -15px; font-weight: bold; left: 12px; font-family: arial;">' + response.new + '</span>');                                                
                    } else {
                        bell.empty();
                        bell.attr('style', '');
                    }
                }
            });
            
            settings.action('click', element.notifyMenuA, function(selector){
                var selector = $(element.notifyMenu);
                if(selector.hasClass('is-hide')) {
                    selector.removeClass('is-hide').addClass('is-show');
                    selector.find('.notify-list').slideDown(500);  
                    $(element.notifyList).empty();
                    
                    var process = '<div class="progress"><div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100" style="width: 20%"></div></div>';
                    $(element.notifyList).append(process);
                    $(element.notifyList).find('.progress').attr('style', 'height: 5px;');
                    $(element.notifyList).find('.progress-bar').attr('style', 'height: 5px; width: 10%;');
                    
                    var i = 1;
                    var interval = setInterval(function(){ 
                        $(element.notifyList).find('.progress-bar').attr('style', 'height: 5px; width: '+ i +'0%;');
                        
                        i === 10 ? i = 0 : 1 === 1;                        
                        i++;                        
                    }, 100);
                    
                    settings.delay(function() {
                        fn.ajax(notifyUrl, 'get', {}, 'json', function(response) {
                            if(response.status === true) {                                                            
                                var liHtml = function(removeLink, notification, orderLink, customerLink, shipperLink, status) {                                     
                                    var font = (status > 0) ? 'fw-bold' : 'fw-normal';    
                                    var disabledShipper = (shipperLink == '#') ? 'disabled' : '';
                                    var disabledCustomer = (customerLink == '#') ? 'disabled' : '';                                    
                                    var disabledRemove = (removeLink == '#') ? 'disabled' : '';
                                    var html = '<li class="col-sm-12">' +
                                        '<div class="col-sm-1">' +
                                            '<a href="'+ removeLink +'"><button type="button" class="btn btn-danger float-left-i '+ disabledRemove +'"><i class="fa fa-remove"></i></button></a>' +                                        
                                        '</div>' +   

                                        '<div class="col-sm-8">' +                                    
                                            '<label class="'+ font +'">'+ notification +'</label>' +
                                        '</div>' +   

                                        '<div class="col-sm-1">' +
                                            '<a href="'+ orderLink +'"><button type="button" class="btn btn-info float-left-i"><i class="fa fa-newspaper-o"></i></button></a>' +                                    
                                        '</div>' +   

                                        '<div class="col-sm-1">' +
                                            '<a href="'+ customerLink +'"><button type="button" class="btn btn-info float-left-i '+ disabledCustomer +'"><i class="fa fa-shopping-bag"></i></button></a>' +
                                        '</div>' +   

                                        '<div class="col-sm-1">' +
                                            '<a href="'+ shipperLink +'"><button type="button" class="btn btn-info float-left-i '+ disabledShipper +'"><i class="fa fa-truck"></i></button></a>' +
                                        '</div>' +   
                                    '</li>';

                                    return html;
                                };                            

                                if((response.data).length) {
                                    var html = '';
                                    $.each(response.data, function(key, value){                                       
                                        html += liHtml(value.removeLink, value.notification, value.orderLink, value.customerLink, value.shipperLink, value.status);
                                    });

                                    clearInterval(interval);
                                    
                                    $(element.notifyList).empty();
                                    
                                    if(html !== '') {                                    
                                        $(element.notifyList).append(html);
                                    } 
                                } else {
                                    clearInterval(interval);
                                    $(element.notifyList).empty().append('<div style="text-align: center;">Thông báo không có dữ liệu</div>');                                    
                                }                            
                            }
                        });   
                        
                        var notifyStatusUrl = $(element.notifyUrl).attr(attr.aGet);
                        fn.ajax(notifyStatusUrl, 'get', {}, 'json', function(response) {});
                        var bell = $(element.notifyMenu).find(element.notifyBell);
                        bell.empty();
                        bell.attr('style', '');                                                 
                    }, 100);                                      
                } else {                    
                    selector.removeClass('is-show').addClass('is-hide');
                    selector.find('.notify-list').slideUp(500);                                                            
                                        
                    var bell = $(element.notifyMenu).find(element.notifyBell);
                    bell.empty();
                    bell.attr('style', '');
                    
                    $(element.notifyList).empty();
                }
                
                $(element.notifyList).niceScroll({cursorcolor:"#5BC0DE", autohidemode: "leave"});
            });
        },
        //Management ajax
        ajax: function(url, type, data, dataType, response) {
            $.ajax({
                url: url,
                type: type,
                dataType: dataType,
                data: data,
                async: false,
                success: function(rs) {
                    response(rs);
                }
            });
        }
    };

    fn.init();
    
}(jQuery));



