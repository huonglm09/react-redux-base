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
        form: generate(attr.aId, 'form-ei-excel'),
        import: generate(attr.aId, 'import-excel'),
        export: generate(attr.aId, 'export-excel'),
        fileExcel: generate(attr.aId, 'file-excel')
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
            
            $(element.import).length ? fn.processImport.call(this) : 1 === 1 ;            
        },        
        processImport: function() {
            settings.action('click', element.import, function(selector) {                
                //$(element.fileExcel).trigger('click');     
                var config = {id: 'import-modal', title: 'Nhập khẩu đơn hàng', content: 'Chức năng đang phát triển sẽ được FSHIP sớm đưa vào sử dụng', button: 'Đóng', submit: ''};                    
                var html = settings.popup(config);

                ($('#import-modal').length) ? $('#import-modal').remove() : 1 === 1;
                $('body').append(html);
                $('#import-modal').modal('show');
            });
            
            var url = $(element.fileExcel).closest('form').attr('action');
            $(element.fileExcel).fileupload({
                url: url,
                dataType: 'json',
                done: function (e, data) {                          
                    ($('#loading').length) ? $('#loading').remove() : 1 === 1;
                    
                    var content = '';
                    
                    if(data.result.message) {
                      content += data.result.message + '<br />';
                    }
                    
                    if(data.result.errors) {
                      $.each(data.result.errors, function(key, value){ 
                        content += value + '<br />';
                      });                                
                    }
                    
                    var config = {id: 'import-modal', title: 'Nhập khẩu đơn hàng', content: content, button: 'Đóng & Tải lại trang', submit: ''};                    
                    var html = settings.popup(config);
                    
                    ($('#import-modal').length) ? $('#import-modal').remove() : 1 === 1;
                    $('body').append(html);
                    $('#import-modal').modal('show');
                },
                progressall: function (e, data) {
                    ($('#loading').length) ? $('#loading').remove() : 1 === 1;
                    $('body').append('<div id="loading"><img id="loading-img" src="/backend/images/loading.svg"/></div>');
                }
            }).prop('disabled', !$.support.fileInput).parent().addClass($.support.fileInput ? undefined : 'disabled');
            
            //settings.action('click', '#import-modal .btn.btn-default', function(selector) {                
            //    location.reload();
            //});
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



