var vars = {
    sectionController: baseurl + 'Sinav-Basvurusu/',
    sectionShowBase: '#showSinavBasvurusu',
    sectionAddFunction: 'AddSinavBasvurusu',
    sectionBaslikKod: 'GSB',
    sectionIsFirst: true,

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
    },
    sectionDatas: {
        Cinsiyetler: GetCinsiyetlerData(),
    },

    secionSPs: {
        Cinsiyet: 'Cinsiyet',
    },
};

$(function() {

    //Refresh Page
    RefreshData(1, 1);

    //Button for posting data for add
    $(vars.sectionShowBase).on('click', '#' + vars.sectionButtons.Submit, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var url = vars.sectionController + vars.sectionAddFunction;
            var data = vars.sectionObjects.Form.serializeArray();
            data.push({
                name: 'English',
                value: String(en)
            });
            console.log(url)
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
                    ResetFormErrors();
                    if (response.success) {
                        // ResetForm(vars.sectionObjects.Form);
                        iziSuccess();
                    } else {
                        var ajaxGroup;
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            // RefreshData(1, 1);
                            iziError();
                        }
                    }
                },
                error: function() {
                    // RefreshData(1, 1);
                    iziError();
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

});

function GetCinsiyetler(ay = 0) {
    var i;
    var data = vars.sectionDatas.Cinsiyetler;
    var length = data.length;
    var id = vars.sectionDatas.Cinsiyet + 'Select';
    var section = vars.secionSPs.Cinsiyet;

    var html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.CinsiyetSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }

    html += '</select>';
    $('#' + section).html(html);
    RefreshSelectpicker();
}


function GetSectionsHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '">' +
        '<div class="container">' +
        '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
        '<h2 data-basliklar="' + vars.sectionBaslikKod + '">' + vars.sectionNames.Normal + '</h2>' +
        '</div>' +
        '</div>' +
        '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's">' +

        '<form role="form" method="post" id="' + vars.sectionNames.Lower + '-form" action="' + vars.sectionController + vars.sectionAddFunction + '">' +

        '<div class="row">' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6">' +
        '<label>' + formLang.AdSoyad + '</label>' +
        '<input name="AdSoyad" id="AdSoyad" class="form-control" type="text" placeholder="' + formLang.AdSoyad + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.Cinsiyet + '</label>' +
        '<div id="' + vars.secionSPs.Cinsiyet + '"></div>' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.SinavTarihi + '</label>' +
        '<input name="SinavTarihi" id="SinavTarihi" class="form-control" type="date" placeholder="' + formLang.SinavTarihi + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.DogumTarihi + '</label>' +
        '<input name="DogumTarihi" id="DogumTarihi" class="form-control" type="date" placeholder="' + formLang.DogumTarihi + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.DogumYeri + '</label>' +
        '<input name="DogumYeri" id="DogumYeri" class="form-control" type="text" placeholder="' + formLang.DogumYeri + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.OOSinif + '</label>' +
        '<input name="OOSinif" id="OOSinif" class="form-control" type="text" placeholder="' + formLang.OOSinif + '">' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.OOOkul + '</label>' +
        '<input name="OOOkul" id="OOOkul" class="form-control" type="text" placeholder="' + formLang.OOOkul + '">' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.Bolum + '</label>' +
        '<input name="Bolum" id="Bolum" class="form-control" type="text" placeholder="' + formLang.Bolum + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.AnneAd + '</label>' +
        '<input name="AnneAd" id="AnneAd" class="form-control" type="text" placeholder="' + formLang.AnneAd + '">' +
        '</div>  ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.AnneTel + '</label>' +
        '<input name="AnneTel" id="AnneTel" class="form-control" type="text" placeholder="' + formLang.AnneTel + '">' +
        '</div>  ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.BabaAd + '</label>' +
        '<input name="BabaAd" id="BabaAd" class="form-control" type="text" placeholder="' + formLang.BabaAd + '">' +
        '</div>  ' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.BabaTel + '</label>' +
        '<input name="BabaTel" id="BabaTel" class="form-control" type="text" placeholder="' + formLang.BabaTel + '">' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.Adres + '</label>' +
        '<input name="Adres" id="Adres" class="form-control" type="text" placeholder="' + formLang.Adres + '">' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.Tc + '</label>' +
        '<input name="Tc" id="Tc" class="form-control" type="text" placeholder="' + formLang.Tc + '">' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-6 col-lg-6"> ' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea name="Aciklama" id="Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '" rows="3"></textarea>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +
        '<div class="ajax-group col-xs-0 col-sm-3 col-md-4 col-lg-4 hidden-xs"> </div>' +
        '<div class="ajax-group col-xs-12 col-sm-6 col-md-4 col-lg-4">' +
        '<button type="button" id="' + vars.sectionButtons.Submit + '" class="btn btn-danger btn-lg btn-block">' + formLang.Kaydet + '</button>' +
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
    $('#show' + vars.sectionNames.Upper).html(html);
    vars.sectionObjects.Form = $('#' + vars.sectionNames.Lower + '-form');
}

var isFirst = true;

function RefreshData(html = 1, side = 0) {
    if (html == 1) {
        GetSectionsHtml()
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    }
    if (side != 0) {
        GetCinsiyetler()
    }
}