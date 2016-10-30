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
        rootStatistic: generate(attr.aType, 'statistic-form'),
        dateType: generate(attr.aType, 'date-type'),
        fullMap: generate(attr.aId, 'full-map'),
        fullScreen: generate(attr.aId, 'full-screen')
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
            
            $(element.rootStatistic).length ? fn.processStatistic.call(this) : 1 === 1 ;            
            $(element.fullMap).length ? fn.fullMap.call(this) : 1 === 1;
        },        
        fullMap: function() {
            settings.action('click', element.fullScreen, function(selector){
                if($(element.fullMap).hasClass('full-map')) {
                    $(element.fullMap).removeClass('full-map');
                    selector.removeClass('btn-small-screen').addClass('btn-full-screen');                    
                    selector.text('Toàn màn hình');
                } else {
                    $(element.fullMap).addClass('full-map');
                    selector.removeClass('btn-full-screen').addClass('btn-small-screen');      
                    selector.text('Thu nhỏ màn hình');
                }                
            });
        },
        processStatistic: function() {
            $(element.dateType).datetimepicker({
                viewMode: 'years',
                format: 'YYYY-MM-DD HH:mm:ss',
                locale: 'vi'
            });
            
            settings.action('change', '#type-account', function(selector) {
                var type = selector.val();
                if(type == 'customer') {
                    $('#customer-area').removeClass('hidden');
                    $('#shipper-area').removeClass('hidden').addClass('hidden');
                    $('#filter-user-customer').attr('name', 'filter_user');
                    $('#filter-user-shipper').attr('name', 'filter_user_hide');
                } else {
                    $('#shipper-area').removeClass('hidden');
                    $('#customer-area').removeClass('hidden').addClass('hidden');
                    $('#filter-user-customer').attr('name', 'filter_user_hide');
                    $('#filter-user-shipper').attr('name', 'filter_user');
                }
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



