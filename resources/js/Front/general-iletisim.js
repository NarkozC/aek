var vars = {
    sectionObjects: {
        Form: 'form',
    },
    sectionNames: {
        Normal: 'İletişim',
        Upper: 'Iletisim',
        Lower: 'iletisim',
        Kod: 'GI',
    },
    sectionControllers: {
        Normal: baseurl + 'Iletisim/',
    },
    sectionShowBases: {
        Sections: 'showIletisim',
        Contact: 'bize-ulasin',
    },
    sectionFunctions: {
        Get: 'GetIletisim',
        Mesaj: 'Mesaj',
    },
    sectionDatas: {
        Iletisim: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },

        Contact: {
            DefaultMail: 'halklailiskiler@aek.k12.tr',
        },
    },
    sectionButtons: {
        Submit: 'IletisimSubmit',
    },
};

$(function() {

    //Refresh Page
    GetIletisim();

    $(vars.sectionShowBases.Sections).on('click', 'a.mailL', function(e) {
        var mailM = $(this).find('.mailM:first');
        var theMail = mailM.html();
        $('#MAdres').val(theMail);
    });

    $('#' + vars.sectionButtons.Submit).click(function() {
        var url = vars.sectionControllers.Normal + vars.sectionFunctions.Mesaj;
        var data = vars.form.serializeArray();

        data.push({
            name: 'English',
            value: String(en)
        });
        data.push({
            name: 'ReCaptcha',
            value: recaptchaResponses['ireCaptcha']
        });
        $.ajax({
            type: 'ajax',
            method: 'post',
            url: url,
            data: data,
            async: false,
            dataType: 'json',
            success: function(response) {
                var captcha;
                var captchaErrors = new Array(
                    '<p class="text-danger marginBot10"><strong>Captcha</strong> needs to be verified!</p>',
                    '<p class="text-danger marginBot10"><strong>Captcha</strong> doğrulanması gerekmektedir!</p>',
                );
                ResetFormErrors();
                if (response.success) {
                    ResetForm(vars.form);
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
                    } else if (captcha != false) {
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
    var url = vars.sectionControllers.Normal + vars.sectionFunctions.Get;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        data: {
            English: en,
        },
        async: false,
        dataType: 'json',
        success: function(result) {
            if (en && result.cachedataEN != "") {
                var cache = result.cachedataEN.Iletisim;
                vars.sectionDatas.Iletisim = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Iletisim;
                vars.sectionDatas.Iletisim = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else {
                var fHtml = '',
                    bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trArray, trInside;

                fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>' +
                    '<div class="container">';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);
                    data[i] = curData;

                    trArray = new Array('Ad');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    if (curData.Kod == "Kolej") {
                        fHtml += '<div class="col-xs-offset-0 col-sm-offset-0 col-md-offset-1 col-lg-offset-0 col-xs-12 col-sm-12 col-md-10 col-lg-3 marginT15 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
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
                        fHtml += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                            '<iframe class="iltGM" frameborder="0" style="border:0" ' +
                            'src="' + curData.Maps + '" allowfullscreen></iframe>' +
                            '</div>' +
                            '</div>';
                    }

                }

                fHtml += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15 wow ' + Animation + '" data-wow-delay="' + wowDelay + '" id="' + vars.sectionShowBases.Contact + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header text-center">' +
                    '<h3>' + formLang.BizeUlasin + '</h3>' +
                    '</div>' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                    '<form id="' + vars.sectionNames.Lower + '-form" class="text-center" role="form" method="post">' +
                    '<input name="MAdres" id="MAdres" type="hidden" value="' + vars.sectionDatas.Contact.DefaultMail + '">' +
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
                    '<button type="button" id="' + vars.sectionButtons.Submit + '" class="btn-danger btn btn-lg btn-block">' + formLang.Gonder + '</button>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</section>';

                $('#' + vars.sectionShowBases.Sections).html(fHtml);
                vars.sectionObjects.Form = $('#' + vars.sectionNameLower + '-form');

                vars.sectionDatas.Iletisim.FHtml = fHtml;
                vars.sectionDatas.Iletisim.BHtml = bHtml;
                vars.sectionDatas.Iletisim.Data = data;
                vars.sectionDatas.Iletisim.Num = length;
                var theCacheData = {
                    Iletisim: vars.sectionDatas.Iletisim,
                }
                setTimeout(Cache('GetIletisim', url, theCacheData), 1);

            }
        },
        error: function() {
            iziError();
        }
    });

}

function GetHtmlTr(data, trArray) {
    var i;
    var newHtml = '';
    var length = trArray.length;
    var no = data.No;
    var listOrder = data.ListOrder

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
    }

    newHtml +=
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>';

    return newHtml;
}