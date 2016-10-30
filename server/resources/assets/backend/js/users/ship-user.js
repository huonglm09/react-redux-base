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
        rootUser: generate(attr.aType, 'userForm'),
        roleActions: generate(attr.aType, 'roles'),
        
        shipAreas: generate(attr.aId, 'ship-areas')
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
        //Management ajax
//        ajax: function(url, type, data, dataType, response) {
//            $.ajax({
//                url: url,
//                type: type,
//                dataType: dataType,
//                data: data,
//                async: false,
//                success: function(rs) {
//                    response(rs);
//                }
//            });
//        },
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
            this.rootUser = $(element.rootUser);
            
            //this.rootUser.length ? fn.checkAreaWithShipper.call(this) : 1 === 1 ;            
        },
        checkAreaWithShipper: function() {   
            var current = $(element.roleActions + ":checked" ).val();
            current == 3 ? fn.showHide(3, 3, $(element.shipAreas)) : 1 === 1;
            settings.action('click', element.roleActions, function(selector) {                    
                var val = selector.val();
                fn.showHide(val, 3, $(element.shipAreas));                
            });
        },
        showHide : function(val, correctVal, elem) {
            if(val == correctVal) {
                elem.slideDown(500);
            } else {
                elem.slideUp(500);
            }
        },
        addMore: function(_this, root, row, clone, actionArea, classRun) {
            var item = _this.closest(root).find(row).last();      
            var copy = $(clone).clone().removeClass('hidden').attr(attr.aType, classRun);            
            $(actionArea).before(copy);
        },
        removeMore: function(_this, root, row) {
            var item = _this.closest(root).find(row).last();  
            item.length ? item.remove() : 1 === 1 ;            
        }        
    };

    fn.init();
    
}(jQuery));



