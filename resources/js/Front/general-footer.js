$(document).ready(function() {
    GetFooter();
});

function GetFooter() {
    var url = baseurl + 'Footer/GetFooter';

    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var html = '';
            var curData = GetCurData(data);
            var intYear = new Date();
            intYear = intYear.getFullYear();
            html += '<section id="footer" class="wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                '<div class="container-fluid dark-bg shadow wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header">' +
                '<ul class="social">' +
                '<li class="facebook"><a href="' + curData.Facebook + '"><i class="fa fa-facebook fa-2x"></i></a></li>' +
                '<li class="twitter"><a href="' + curData.Twitter + '"><i class="fa fa-twitter fa-2x"></i></a></li>' +
                '<li class="youtube"><a href="' + curData.Youtube + '"><i class="fa fa-youtube fa-2x"></i></a></li>' +
                '<li class="instagram"><a href="' + curData.Instagram + '"><i class="fa fa-instagram fa-2x"></i></a></li>' +
                '</ul>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
                '<p class="co">Copyright © ' + intYear + ' AEK. ' +
                '<i class="fa fa-lg fa-paint-brush" aria-hidden="true"></i> ' +
                '<i class="fa fa-lg fa-code" aria-hidden="true"></i> ' +
                'by <b class="hvr-wobble-skew">Doğucan Şaşıoğlu</b></p>' +
                '</div>' +
                '</div>' +
                '</section>';

            $('#showFooter').html(html);
        },
        error: function() {
            iziError();
        }
    });
}