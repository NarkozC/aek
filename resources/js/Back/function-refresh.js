$(function() {


    setTimeout(function() {

        $('#num').hover(function(e) {
            $('#num').data('oldHTML', $('#num').html()); //setter
            var newHTML = '<i class="fa fa-refresh" aria-hidden="true"></i>';
            $('#num').html(newHTML).css('background-color', '#2e3154');
        }, function(e) {
            var oldHTML = $('#num').data('oldHTML'); //getter
            $('#num').html(oldHTML).css('background-color', '#f0ad4e');
        });

        $('#num').click(function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                RefreshData();
                $('#num').css('background-color', '#f0ad4e');
            }
            $link.data('lockedAt', +new Date());
        });

    }, 100)
});