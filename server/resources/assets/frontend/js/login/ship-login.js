/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

(function ($) {
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
    var generate = function (attr, val) {
        return '[' + attr + '="' + val + '"]';
    };
    //Element in DOM
    var element = {
        body: 'body',
        loginFace: '.btn-face'
    };
    var baseUrl = $(element.body).attr(attr.aBase);
    var urls = {};
    var settings = $.extend({
        //Convert to uppercase 
        convertCase: function (str) {
            var lower = str.toLowerCase();
            return lower.replace(/(^| )(\w)/g, function (x) {
                return x.toUpperCase();
            });
        },
        //Management action
        action: function (event, obj, callback) {
            $(document).on(event, obj, function () {
                callback($(this));
            });
        },
        checkAll: function (checkAll, checkOne) {
            if (this.root.length) {
                settings.action('click', checkAll, function (selector) {
                    var val = selector.val();
                    if (val === "off") {
                        selector.val('on');
                        $(checkOne).map(function () {
                            this.checked = true;
                        });
                    } else {
                        selector.val('off');
                        $(checkOne).map(function () {
                            this.checked = false;
                        });
                    }
                });
            }
        },
        popup: function (data) {
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
        delay: (function () {
            var timer = 0;
            return function (callback, ms) {
                clearTimeout(timer);
                timer = setTimeout(callback, ms);
            };
        })()
    });

    var fn = {
        init: function () {
            this.self = $(this);

            $(element.loginFace).length ? fn.loginFacebook.call(this) : 1 === 1;
        },
        loginFacebook: function () {
            window.fbAsyncInit = function () {
                FB.init({
                    appId      : '1040484509320554',
                    xfbml: true,
                    version: 'v2.7'
                });
            };

            (function (d, s, id) {
                var js, fjs = d.getElementsByTagName(s)[0];
                if (d.getElementById(id)) {
                    return;
                }
                js = d.createElement(s);
                js.id = id;
                js.src = "//connect.facebook.net/vi_VN/sdk.js";
                fjs.parentNode.insertBefore(js, fjs);
            }(document, 'script', 'facebook-jssdk'));

            settings.action('click', element.loginFace, function () {
                checkLoginState();
            });

            // This is called with the results from from FB.getLoginStatus().
            function statusChangeCallback(response) {
                if (response.status === 'connected') {
                    window.FB.api('/me', {fields: 'id,email,gender,name'}, function (response) {
                        var url = $(element.loginFace).attr(attr.aId);
                        fn.ajax(url, 'post', response, 'json', function(response) {
                            if(response.status !== true) {
                                var err = '';
                                if(response.messages.errors.common) {
                                    err += response.messages.errors.common + '<br/>';
                                }
                                if(response.messages.errors.username) {
                                    err += response.messages.errors.username + '<br/>';
                                }
                                if(response.messages.errors.password) {
                                    err += response.messages.errors.password + '<br/>';
                                }
                                
                                var html = '<div class="form-group face-result"><div class="row"><div class="alert alert-danger no-margin" role="alert">'+ err +'</div></div></div>'; 
                                if($('.face-result').length) {
                                    $('.face-result').remove();
                                }
                                
                                $(element.loginFace).closest('form').append(html);
                            } else {
                                var html = '<div class="form-group face-result"><div class="row"><div class="alert alert-success no-margin" role="alert">'+ response.messages.success +'</div></div></div>'; 
                                if($('.face-result').length) {
                                    $('.face-result').remove();
                                }
                                
                                $(element.loginFace).closest('form').append(html);
                                
                                if(response.finished) {
                                    location.reload();
                                }
                            }
                        });
                    });
                } else {
                    window.FB.login(function (response) {
                        statusChangeCallback(response);
                    }, {
                        scope: 'public_profile,email'
                    });
                }
            }

            // This function is called when someone finishes with the Login
            // Button.  See the onlogin handler attached to it in the sample
            // code below.
            function checkLoginState() {
                window.FB.getLoginStatus(function (response) {
                    statusChangeCallback(response);
                });
            }
        },
        //Management ajax
        ajax: function (url, type, data, dataType, response) {
            $.ajax({
                url: url,
                type: type,
                dataType: dataType,
                data: data,
                async: false,
                success: function (rs) {
                    response(rs);
                }
            });
        }
    };

    fn.init();

}(jQuery));



