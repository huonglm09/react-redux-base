$(function () {
    if ($('[run="box"]').length) {
        var helper = {
            ajax: function (url, type, data, response) {
                $.ajax({
                    url: url,
                    type: type,
                    dataType: "json",
                    data: data,
                    async: false,
                    success: function (rs)
                    {
                        response(rs);
                    }
                });
            }
        };

        $('[run="box"]').each(function () {
            var self = this;
            var type = $(self).data('type');
            var message = $(self).data('message');
            var params = ($(self).data('params') != undefined && $(self).data('params') != null) ? $(self).data('params') : {};
            
            
            $(self).on('click', function () {
                switch (type) {
                    case 'confirm':
                        var process = $(self).data('process');
                        switch (process) {
                            case 'update':
                                bootbox.confirm(message, function (result) {
                                    if (result) {
                                        helper.ajax($(self).data('url'), 'post', params, function (rs) {
                                            if (rs.status) {
                                                location.reload();
                                            }
                                        });
                                    }
                                });
                                break;
                        }

                        break;
                }
            });
        });
    }
});
