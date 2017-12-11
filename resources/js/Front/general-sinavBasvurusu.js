var vars = {
    sectionControllers: {
        Sections: baseurl + 'Sinav-Basvurusu/',
        SinavTarihleri: baseurl + 'Sinav-Tarihleri/',
    },
    sectionShowBases: {
        Sections: 'showSinavBasvurusu',
    },
    sectionObjects: {
        Form: 'form',
    },
    sectionButtons: {
        Submit: 'SinavBasvurusuSubmit'
    },
    sectionNames: {
        Normal: 'Sınav Başvurusu',
        Lower: 'sinav-basvurusu',
        Upper: 'SinavBasvurusu',
        Kod: 'GSB',
    },
    sectionDatas: {
        Cinsiyetler: GetCinsiyetlerData(),
        Siniflar: GetSiniflarData(),
        SinavTarihleri: {
            Data: new Array(),
        },
    },
    sectionFunctions: {
        Add: 'AddSinavBasvurusu',

        SinavTarihleriGet: 'GetSinavTarihleri',
    },

    secionSPs: {
        Cinsiyet: 'Cinsiyet',
        OOSinif: 'OOSinif',
        SinavTarihi: 'SinavTarihi',
    },
    sectionIsFirst: true,
};

$(function() {

    //Refresh Page
    RefreshData(1, 1);

    $('#' + vars.secionSPs.OOSinif + 'Select').on('change', function(e) {
        var valueSelected = this.value;
        valueSelected = valueSelected.split('-');
        if (valueSelected[0] == 3) {
            $("#Bolum").prop("readonly", false);
        } else {
            $("#Bolum").prop("readonly", true);
            $("#Bolum").val('');
            $("#Bolum").attr("placeholder", formLang.Bolum);
        }
        GetSinavTarihleriSelect(valueSelected[1]);
    });

    //Button for posting data for add
    $('#' + vars.sectionShowBases.Sections).on('click', '#' + vars.sectionButtons.Submit, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var url = vars.sectionControllers.Sections + vars.sectionFunctions.Add;
            var data = vars.sectionObjects.Form.serializeArray();
            data.push({
                name: 'English',
                value: String(en)
            });
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: url,
                data: data,
                async: false,
                dataType: 'json',
                success: function(response) {
                    console.log(response);
                    ResetFormErrors();
                    if (response.success) {
                        ResetForm(vars.sectionObjects.Form);
                        iziSuccess();
                    } else {
                        var ajaxGroup;
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            RefreshData(1, 1);
                            iziError();
                        }
                    }
                },
                error: function() {
                    RefreshData(1, 1);
                    iziError();
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

});

function GetSinavTarihleriData() {
    var url = vars.sectionControllers.SinavTarihleri + vars.sectionFunctions.SinavTarihleriGet;
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
                var cache = result.cachedataEN.SinavTarihleri;
                vars.sectionDatas.SinavTarihleri = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.SinavTarihleri;
                vars.sectionDatas.SinavTarihleri = cache;
            } else {
                var i, clength;
                var data = result.data,
                    length = data.length;

                vars.sectionDatas.SinavTarihleri.Data[0] = new Array();
                vars.sectionDatas.SinavTarihleri.Data[0][0] = {};
                for (i = 1; i < length; i++) {
                    if (vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif] == undefined) {
                        vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif] = new Array();

                        clength = vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif].length;
                        vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif][clength] = data[i];
                    } else {
                        clength = vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif].length;
                        vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif][clength] = data[i];
                    }
                }
            }
        },
        error: function() {
            iziError();
        }
    });

}

function GetCinsiyetlerSelect() {
    var i, html;
    var data = vars.sectionDatas.Cinsiyetler,
        length = data.length,
        id = vars.secionSPs.Cinsiyet + 'Select',
        section = vars.secionSPs.Cinsiyet;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.CinsiyetSec + '" data-liveSearchNormalize="true">';
    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }
    html += '</select>';

    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSiniflarSelect() {
    var i, html;
    var data = vars.sectionDatas.Siniflar,
        length = data.length,
        id = vars.secionSPs.OOSinif + 'Select',
        section = vars.secionSPs.OOSinif;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.SinifSec + '" data-liveSearchNormalize="true">';
    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Kod + '" value="' + data[i].Okul + '-' + data[i].Kod + '">' + data[i].Kod + '</option>';
    }
    html += '</select>';

    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSinavTarihleriSelect(sinif = 0) {
    var html;
    var id = vars.secionSPs.SinavTarihi + 'Select',
        section = vars.secionSPs.SinavTarihi;
    if (sinif == 0) {
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.SinavTarihiSec + '" data-liveSearchNormalize="true" disabled></select>';
    } else {
        var i, length;
        var data = vars.sectionDatas.SinavTarihleri.Data[sinif];
        $('#OOSinif').parents('.ajax-group:first').find('.text-danger:first').remove();
        if (data == undefined) {
            messages = {
                SinavTarihi: '<p style="margin:10px 0px;" class="text-danger">Bu sınıf için sınav tarihi bulunmamaktadır.</p>'
            }
            $('#SinavTarihi').parents('.ajax-group:first').find('.text-danger:first').remove();
            ShowFormErrors(messages);

            $('body').append('<a href="#SinavTarihi" id="smoothScrollTemp"></a>');
            $('#smoothScrollTemp').smoothScroll({
                speed: 600,
                offset: -125
            }).trigger("click").remove();
        }
        length = data.length;

        html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.SinavTarihiSec + '" data-liveSearchNormalize="true">';
        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + data[i].Tarih + '" value="' + data[i].Sinif + '-' + data[i].Tarih + '">' + data[i].Tarih + '</option>';
        }
        html += '</select>';
    }

    $('#' + section).html(html);
    RefreshSelectpicker();
}


function GetSectionsHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '">' +
        '<div class="container">' +
        '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
        '<h2 data-basliklar="' + vars.sectionNames.Kod + '">' + vars.sectionNames.Normal + '</h2>' +
        '</div>' +
        '</div>' +
        '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's">' +

        '<form role="form" method="post" id="' + vars.sectionNames.Lower + '-form" action="' + vars.sectionControllers.Sections + vars.sectionFunctions.Add + '">' +

        '<div class="row">' +

        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.Tc + '</label>' +
        '<input name="Tc" id="Tc" class="form-control" type="text" placeholder="' + formLang.Tc + '">' +
        '</div>' +
        '</div>' +


        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4">' +
        '<label>' + formLang.AdSoyad + '</label>' +
        '<input name="AdSoyad" id="AdSoyad" class="form-control" type="text" placeholder="' + formLang.AdSoyad + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.Cinsiyet + '</label>' +
        '<div id="' + vars.secionSPs.Cinsiyet + '"></div>' +
        '</div> ' +
        '</div> ' +


        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.DogumTarihi + '</label>' +
        '<input name="DogumTarihi" id="DogumTarihi" class="form-control" type="date" placeholder="' + formLang.DogumTarihi + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.DogumYeri + '</label>' +
        '<input name="DogumYeri" id="DogumYeri" class="form-control" type="text" placeholder="' + formLang.DogumYeri + '">' +
        '</div> ' +
        '</div> ' +


        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.AnneAd + '</label>' +
        '<input name="AnneAd" id="AnneAd" class="form-control" type="text" placeholder="' + formLang.AnneAd + '">' +
        '</div>  ' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.AnneTel + '</label>' +
        '<input name="AnneTel" id="AnneTel" class="form-control" type="text" placeholder="' + formLang.AnneTel + '">' +
        '</div>  ' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.AnneEmail + '</label>' +
        '<input name="AnneEmail" id="AnneEmail" class="form-control" type="text" placeholder="' + formLang.AnneEmail + '">' +
        '</div>  ' +
        '</div>  ' +


        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.BabaAd + '</label>' +
        '<input name="BabaAd" id="BabaAd" class="form-control" type="text" placeholder="' + formLang.BabaAd + '">' +
        '</div>  ' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.BabaTel + '</label>' +
        '<input name="BabaTel" id="BabaTel" class="form-control" type="text" placeholder="' + formLang.BabaTel + '">' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.BabaEmail + '</label>' +
        '<input name="BabaEmail" id="BabaEmail" class="form-control" type="text" placeholder="' + formLang.BabaEmail + '">' +
        '</div>  ' +
        '</div>  ' +


        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-12 col-md-12 col-lg-12"> ' +
        '<label>' + formLang.Adres + '</label>' +
        '<input name="Adres" id="Adres" class="form-control" type="text" placeholder="' + formLang.Adres + '">' +
        '</div>' +
        '</div>' +


        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.OOOkul + '</label>' +
        '<input name="OOOkul" id="OOOkul" class="form-control" type="text" placeholder="' + formLang.OOOkul + '">' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.OOSinif + '</label>' +
        '<div id="' + vars.secionSPs.OOSinif + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.Bolum + '</label>' +
        '<input name="Bolum" id="Bolum" class="form-control" type="text" placeholder="' + formLang.Bolum + '">' +
        '</div> ' +
        '</div> ' +

        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-12 col-md-12 col-lg-12"> ' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea name="Aciklama" id="Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '" rows="3"></textarea>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.SinavTarihi + '</label>' +
        '<div id="' + vars.secionSPs.SinavTarihi + '"></div>' +
        '</div> ' +
        '</div> ' +
        '</div>' +

        '<div class="row">' +
        '<div class="ajax-group col-xs-0 col-sm-3 col-md-4 col-lg-4 hidden-xs"> </div>' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4">' +
        '<button type="button" id="' + vars.sectionButtons.Submit + '" class="btn btn-danger btn-lg btn-block">' + formLang.Basvur + '</button>' +
        '</div>' +
        '<div class="ajax-group col-xs-0 col-sm-3 col-md-4 col-lg-4 hidden-xs"> </div>' +
        '</div>' +


        '</form>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
        '<div id="show' + vars.sectionNames.Upper + 'Table"></div>' +
        '</div>' +
        '</div><!-- End container -->' +
        '</section>';

    $('#' + vars.sectionShowBases.Sections).html(html);
    vars.sectionObjects.Form = $('#' + vars.sectionNames.Lower + '-form');
    $("#Bolum").prop("readonly", true);
}

function RefreshData(html = 1, side = 0) {
    if (html == 1) {
        GetSectionsHtml()
    }
    if (side != 0) {
        GetCinsiyetlerSelect()
        GetSiniflarSelect()
        GetSinavTarihleriData()
        GetSinavTarihleriSelect()
    }
}