$(function () {
    if ($('[init="datepicker"]').length) {
        $('[init="datepicker"]').each(function () {
            $(this).datepicker({});
        });
    }

    if ($('[init="datetimepicker"]').length) {
        $('[init="datetimepicker"]').each(function () {
            $(this).datetimepicker({format: 'HH:mm D/M ', minDate: Date(), useCurrent: true});

        });
    }

    if ($('[init="dateorder"]').length) {
        $('[init="dateorder"]').each(function () {
            $(this).datetimepicker({format: 'HH:mm D/M ', minDate: Date(), useCurrent: false});
        });
        
        
        
        
    }

    $('[enableEnter="false"]').on('keyup keypress', function (e) {
        var keyCode = e.keyCode || e.which;

        if (keyCode === 13) {
            e.preventDefault();
            return false;
        }
    });


    if ($('[init="frm-error"]').length) {
        $('[init="frm-error"]').mouseenter(function () {
            $(this).css({right: 0});
        });

        $('[init="frm-error"]').mouseleave(function () {
            $(this).css({right: "-94%"});

        });
    }


});





