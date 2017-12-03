var vars = {
    form: 'form',
    sectionNameNormal: 'İletişim',
    sectionNameLower: 'iletisim',
    sectionNameUpper: 'Iletisim',
    sectionController: baseurl + 'Iletisim/',
    sectionShowBase: '#showIletisim',
    sectionGetFunction: 'GetIletisim',
    sectionMesajFunction: 'Mesaj',
    sectionIsFirst: true,
    sectionHtml: '',

    sectionContactSubmitButton: 'IletisimSubmit',
    sectionContactShowID: 'bize-ulasin',
    sectionContactDefaultMail: 'halklailiskiler@aek.k12.tr'
};

$(function() {

    //Refresh Page
    RefreshData();

    $(vars.sectionShowBase).on('click', 'a.mailL', function(e) {
        var mailM = $(this).find('.mailM:first');
        var theMail = mailM.html();
        console.log(theMail);
        $('#MAdres').val(theMail);
    });

    $('#' + vars.sectionContactSubmitButton).click(function() {
        var url = vars.sectionController + vars.sectionMesajFunction;
        var data = vars.form.serializeArray();

        data.push({
            name: 'English',
            value: String(en)
        });
        data.push({
            name: 'ReCaptcha',
            value: recaptchaResponses['ireCaptcha']
        });
        console.log(data)
        $.ajax({
            type: 'ajax',
            method: 'post',
            url: url,
            data: data,
            async: false,
            dataType: 'json',
            success: function(response) {
                console.log(response);
                var captcha;
                var captchaErrors = new Array(
                    '<p class="text-danger marginBot10"><strong>Captcha</strong> needs to be verified!</p>',
                    '<p class="text-danger marginBot10"><strong>Captcha</strong> doğrulanması gerekmektedir!</p>',
                    );
                ResetFormErrors();
                if (response.success) {
                    // ResetForm(vars.form);
                    iziSuccess();
                } else {
                    if (response.captcha != undefined) {
                        if (response.captcha == true) {
                            captcha = true
                        } else {
                            captcha = false
                        }
                    }
                    if (response.messages) {
                        ShowFormErrors(response.messages);
                    } else if(captcha != false) {
                        iziError();
                    }
                    if (captcha == false) {
                        if (en) {
                            $('#ireCaptcha').after(captchaErrors[0]);
                        } else {
                            $('#ireCaptcha').after(captchaErrors[1]);
                        }
                    }
                }
            },
            error: function() {
                iziError();
            }
        });
    });

});

function GetIletisim() {
    var url = vars.sectionController + vars.sectionGetFunction;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var html = '';
            var i;
            var length
            var curData;

            html += '<section id="' + vars.sectionNameLower + '">' +
                '<div class="container">' +
                '<div class="col-lg-12 page-header wow bounceInDown paddingL0" data-wow-delay="' + wowDelay + '">' +
                '<h2 data-basliklar="GI">' + vars.sectionNameNormal + '</h2>' +
                '</div>' +
                '</div>' +
                '<div class="container">';

            for (i = 0, length = data.length; i < length; i++) {
                curData = GetCurData(data[i]);
                if (curData.Kod == "Kolej") {
                    html += '<div class="col-xs-offset-0 col-sm-offset-0 col-md-offset-1 col-lg-offset-0 col-xs-12 col-sm-12 col-md-10 col-lg-3 marginT15 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header text-center" data-wow-delay="">' +
                        '<h4>' + curData.Ad + '</h4>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                        '<a href="tel:' + curData.Tel1D + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal">' +
                        '<div class="row disFlex">' +
                        '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                        '<i class="fa fa-2x fa-phone posRelVerCen"></i>' +
                        '</div>' +
                        '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                        '<div class="posRelVerCen">' + curData.Tel1 + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                        '<a href="tel:' + curData.Tel2D + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal">' +
                        '<div class="row disFlex">' +
                        '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                        '<i class="fa fa-2x fa-phone posRelVerCen"></i>' +
                        '</div>' +
                        '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                        '<div class="posRelVerCen">' + curData.Tel2 + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                        '<a href="tel:' + curData.Tel3D + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal">' +
                        '<div class="row disFlex">' +
                        '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                        '<i class="fa fa-2x fa-phone posRelVerCen"></i>' +
                        '</div>' +
                        '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                        '<div class="posRelVerCen">' + curData.Tel3 + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                        '<a href="#' + vars.sectionContactShowID + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal mailL">' +
                        '<div class="row disFlex">' +
                        '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                        '<i class="fa fa-2x fa-envelope posRelVerCen"></i>' +
                        '</div>' +
                        '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                        '<div class="posRelVerCen mailM">' + curData.Email + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                        '<a href="' + curData.YolTarifi + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal">' +
                        '<div class="row disFlex">' +
                        '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                        '<i class="fa fa-2x fa-map-marker posRelVerCen"></i>' +
                        '</div>' +
                        '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                        '<div class="posRelVerCen">' + curData.Adres + '</div>' +
                        '</div>' +
                        '</div>' +
                        '</a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                } else if (curData.Kod == "Maps") {
                    html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<iframe class="iltGM" frameborder="0" style="border:0" ' +
                        'src="' + curData.Maps + '" allowfullscreen></iframe>' +
                        '</div>' +
                        '</div>';
                }

            }

            html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15 wow ' + Animation + '" data-wow-delay="' + wowDelay + '" id="' + vars.sectionContactShowID + '">' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow">' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header text-center">' +
                '<h3>' + formLang.BizeUlasin + '</h3>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                '<form id="' + vars.sectionNameLower + '-form" class="text-center" role="form" method="post">' +
                '<input name="MAdres" id="MAdres" type="hidden" value="' + vars.sectionContactDefaultMail + '">' +
                '<div class="ajax-group input-group">' +
                '<span class="input-group-addon"><i class="fa fa-lg fa-user" aria-hidden="true"></i></span>' +
                '<input name="AdSoyad" id="AdSoyad" class="form-control" type="text" placeholder="' + formLang.AdSoyad + '">' +
                '</div>' +
                '<div class="ajax-group input-group">' +
                '<span class="input-group-addon"><i class="fa fa-lg fa-envelope" aria-hidden="true"></i></span>' +
                '<input name="Email" id="Email" class="form-control" type="text" placeholder="' + formLang.Email + '">' +
                '</div>' +
                '<div class="ajax-group input-group">' +
                '<span class="input-group-addon"><i class="fa fa-lg fa-comment" aria-hidden="true"></i></span>' +
                '<textarea rows="4" class="form-control" id="Mesaj" name="Mesaj" placeholder="' + formLang.Mesaj + '"></textarea>' +
                '</div>' +
                '<div class="ajax-group">' +
                '<div id="ireCaptcha"></div>' +
                '</div>' +
                '<button type="button" id="' + vars.sectionContactSubmitButton + '" class="btn-danger btn btn-lg btn-block">' + formLang.Gonder + '</button>' +
                '</form>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</section>';

            $(vars.sectionShowBase).html(html);
            vars.sectionHtml = html;
            vars.form = $('#' + vars.sectionNameLower + '-form');
        },
        error: function() {
            iziError();
        }
    });

}


function RefreshData(refreshMain = 1) {
    if (refreshMain == 1) {
        GetIletisim();
    }
}