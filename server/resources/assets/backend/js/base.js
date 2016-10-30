var nav = $('.header-wrapper');
$(window).scroll(function () {
    if ($(this).scrollTop() > 80) {
        nav.attr('style', 'position:fixed; z-index: 9; box-shadow: 0px 0px 4px; moz-box-shadow: 0px 0px 4px; webkit-box-shadow: 0px 0px 4px;');
    } else {
        nav.attr('style', '');
    }
});

$(document).ready(function () {
    $('[data-toggle="tooltip"]').tooltip();
    
    if ($('[init="ckeditor"]').length) {
        $('[init="ckeditor"]').each(function() {
            var self = this;

            $(self).ckeditor();
        });
    }
});

