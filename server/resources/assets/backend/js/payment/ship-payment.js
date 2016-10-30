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
        rootPayment: generate(attr.aType, 'payment')
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
            
            $(element.rootPayment).length ? fn.processPayment.call(this) : 1 === 1;            
        },        
        processPayment: function() {         
            settings.action('click', 'input[name="option_payment"]', function(selector){
                $('.list-content li').removeClass('active');
                $(selector).parent().parent('li').addClass('active'); 
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



