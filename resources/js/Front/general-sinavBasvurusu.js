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
            Html: '',
            Num: 0,
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
            var SmsMailKabulElem = $('#SmsMailKabul');
            if ($(SmsMailKabulElem).is(":checked")) {
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
                        ResetFormErrors();
                        if (response.success) {
                            ResetForm(vars.sectionObjects.Form);
                            iziSuccess();
                            gtag('event', 'event', {
                                'send_to': 'UA-91678098-6',
                                'event_category': 'form',
                                'event_action': 'basvuru',
                                'event_label': 'onay'
                            });
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
            } else {
                ResetFormErrors()
                var ajaxGroup = $(SmsMailKabulElem).parents('.ajax-group:first');
                ajaxGroup.addClass('has-error');

                if (en) {
                    $(ajaxGroup).append('<p style="margin:10px 0px;" class="text-danger">This field is required.</p>');
                } else {
                    $(ajaxGroup).append('<p style="margin:10px 0px;" class="text-danger">Bu alan zorunludur.</p>');
                }
            }

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
                vars.sectionDatas.SinavTarihleri.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.SinavTarihleri;
                vars.sectionDatas.SinavTarihleri = cache;
                vars.sectionDatas.SinavTarihleri.Data = JSON.parse(cache.Data);
            } else {
                var html = '',
                    data = result.data,
                    length = data.length,
                    curI = 0;
                var i, j, sLength, tData, curData, trInside, trArray;

                vars.sectionDatas.SinavTarihleri.Data[0] = new Array();
                vars.sectionDatas.SinavTarihleri.Data[0][0] = {};
                for (i = 1; i <= length; i++) {
                    curData = data[curI];

                    curData.Tarih = curData.Tarih.split('-');
                    curData.Tarih = curData.Tarih[2] + '.' + curData.Tarih[1] + '.' + curData.Tarih[0];
                    tData = curData.Sinif.split(',');

                    for (j = 0, sLength = tData.length; j < sLength; j++) {
                        if (vars.sectionDatas.SinavTarihleri.Data[tData[j]] == undefined) {
                            vars.sectionDatas.SinavTarihleri.Data[tData[j]] = new Array();

                            clength = vars.sectionDatas.SinavTarihleri.Data[tData[j]].length;
                            vars.sectionDatas.SinavTarihleri.Data[tData[j]][clength] = curData;
                        } else {
                            clength = vars.sectionDatas.SinavTarihleri.Data[tData[j]].length;
                            vars.sectionDatas.SinavTarihleri.Data[tData[j]][clength] = curData;
                        }
                    }
                    curI++;
                }

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    trArray = new Array('ozel-Tarih', 'Sinif');
                    trInside = GetHtmlTr(curData, trArray);
                    html += '<tr>' + trInside + '</tr>';
                }
                vars.sectionDatas.SinavTarihleri.Html = html;
                vars.sectionDatas.SinavTarihleri.Num = length;

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(vars.sectionDatas.SinavTarihleri.Data);
                    vars.sectionDatas.SinavTarihleri.Data = myJSON;
                    var theCacheData = {
                        SinavTarihleri: vars.sectionDatas.SinavTarihleri,
                    }
                    setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                    vars.sectionDatas.SinavTarihleri.Data = JSON.parse(myJSON);
                }
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

    for (i = 0; i < length; i++) {
        var trArrayTemp = trArray[i].split('-');
        if (trArrayTemp[0] == "ozel" && trArrayTemp[1] == "Tarih") {
            var tarih = data.Tarih.split('-');
            tarih = tarih[2] + '.' + tarih[1] + '.' + tarih[0];

            newHtml += '<td class="shorten_content">' + tarih + '</td>';
        } else {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
        }
    }

    newHtml +=
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
        '</td>';

    return newHtml;
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
        var data = vars.sectionDatas.SinavTarihleri.Data[sinif],
            isEmpty = true;

        $('#OOSinif').parents('.ajax-group:first').find('.text-danger:first').remove();
        $('#SinavTarihi').parents('.ajax-group:first').removeClass('has-error').find('.text-danger:first').remove();
        if (data == undefined) {
            messages = {
                SinavTarihi: '<p style="margin:10px 0px;" class="text-danger">Bu sınıf için sınav tarihi bulunmamaktadır.</p>'
            }
            ShowFormErrors(messages);

            $('body').append('<a href="#SinavTarihi" id="smoothScrollTemp"></a>');
            $('#smoothScrollTemp').smoothScroll({
                speed: 600,
                offset: -125
            }).trigger("click").remove();
            GetSinavTarihleriSelect();
        } else {
            length = data.length;

            html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.SinavTarihiSec + '" data-liveSearchNormalize="true">';
            for (i = 0; i < length; i++) {
                html += '<option data-tokens="' + data[i].Tarih + '" value="' + data[i].Sinif + '-' + data[i].Tarih + '">' + data[i].Tarih + '</option>';
            }
            html += '</select>';
        }

    }

    $('#' + section).html(html);
    RefreshSelectpicker();
}


function GetSectionsHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '">' +
        '<div class="container">' +
        '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
        '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
        '</div>' +
        '</div>' +
        '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's">' +

        '<form role="form" method="post" id="' + vars.sectionNames.Lower + '-form" action="' + vars.sectionControllers.Sections + vars.sectionFunctions.Add + '">' +

        '<div class="row">' +

        '<div class="row paddingB10">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.Tc + '</label>' +
        '<input name="Tc" id="Tc" class="form-control" type="text" placeholder="' + formLang.Tc + '">' +
        '</div>' +
        '</div>' +


        '<div class="row marginB10">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4">' +
        '<label>' + formLang.AdSoyad + '</label>' +
        '<input name="AdSoyad" id="AdSoyad" class="form-control" type="text" placeholder="' + formLang.AdSoyad + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.DogumTarihi + '</label>' +
        '<input name="DogumTarihi" id="DogumTarihi" class="form-control" type="date" placeholder="' + formLang.DogumTarihi + '">' +
        '</div> ' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.Cinsiyet + '</label>' +
        '<div id="' + vars.secionSPs.Cinsiyet + '"></div>' +
        '</div> ' +
        '</div> ' +


        '<div class="row marginB10">' +
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


        '<div class="row marginB10">' +
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


        '<div class="row marginB10">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.OOOkul + '</label>' +
        '<input name="OOOkul" id="OOOkul" class="form-control" type="text" placeholder="' + formLang.OOOkul + '">' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.OOSinif + '</label>' +
        '<div id="' + vars.secionSPs.OOSinif + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.Bolum + '(TM/MF)</label>' +
        '<input name="Bolum" id="Bolum" class="form-control" type="text" placeholder="' + formLang.Bolum + '">' +
        '</div> ' +
        '</div> ' +

        '<div class="row marginB10">' +
        '<div class="ajax-group col-xs-12 col-sm-4 col-md-4 col-lg-4"> ' +
        '<label>' + formLang.SinavTarihi + '</label>' +
        '<div id="' + vars.secionSPs.SinavTarihi + '"></div>' +
        '</div> ' +

        '<div class="row marginB10">' +
        '<div class="ajax-group col-xs-12 col-sm-12 col-md-12 col-lg-12"> ' +
        '<input type="checkbox" id="SmsMailKabul" name="SmsMailKabul" value="true">' +
        ' <label>' + formLang.SmsMailKabul + '</label>' +
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
        '</section>' +
        '<div class="sectionArasiBosluk"></div>' +
        '<div id="showSinavYonergeleri"></div>';

    $('#' + vars.sectionShowBases.Sections).html(html);
    vars.sectionObjects.Form = $('#' + vars.sectionNames.Lower + '-form');
    $("#Bolum").prop("readonly", true);

    setTimeout(function() {
        GetSinavYonergeleri()
    }, 100);
}



function GetSinavYonergeleri() {
    var syVars = {
        sectionControllers: {
            Normal: baseurl + 'Sinav-Basvurusu/',
            Portal: baseurl + 'Portal/Admin/Sinav-Yonergeleri/',
        },
        sectionNames: {
            Normal: 'Sınav Yönergeleri',
            Upper: 'SinavYonergeleri',
            Lower: 'sinavYonergeleri',
            Kod: 'GSY',
        },
        sectionShowBases: {
            Sections: 'showSinavYonergeleri',
            Num: 'showNum',
            Modal: 'showSectionsModal',
        },
        sectionFunctions: {
            Get: 'GetSinavYonergeleri',
        },
        sectionDatas: {
            SinavYonergeleri: {
                Data: new Array(),
                FHtml: '',
                BHtml: '',
                Num: 0,
            },

            Pdfler: GetPdflerData(),
        },
    };

    function GetHtmlTr(data, trArray) {
        var i;
        var newHtml = '';
        var length = trArray.length;
        var no = data.No;
        var listOrder = data.ListOrder

        for (i = 0; i < length; i++) {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
        }

        newHtml +=
            '<td>' +
            '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
            '</td>';

        return newHtml;
    }

    syVars.sectionDatas.SinavYonergeleri = {
        Data: new Array(),
        FHtml: '',
        BHtml: '',
        Num: 0,
    }
    var url = syVars.sectionControllers.Normal + syVars.sectionFunctions.Get;
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
                var cache = result.cachedataEN.SinavYonergeleri;
                syVars.sectionDatas.SinavYonergeleri = cache;
                syVars.sectionDatas.SinavYonergeleri.Data = JSON.parse(cache.Data);
                $('#' + syVars.sectionShowBases.Sections).html(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.SinavYonergeleri;
                syVars.sectionDatas.SinavYonergeleri = cache;
                syVars.sectionDatas.SinavYonergeleri.Data = JSON.parse(cache.Data);
                $('#' + syVars.sectionShowBases.Sections).html(cache.FHtml);
            } else {
                var fhtml = '',
                    bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                fhtml += '<section id="' + syVars.sectionNames.Lower + '">' +
                    '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                    '<div class="col-lg-12 page-header text-center wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + syVars.sectionNames.Upper + '">' + syVars.sectionNames.Normal + '</h2>' +
                    '</div>';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    fhtml +=
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">' +
                        '<a href="' + pdfsDir + curData.Ilkokul + '" class="btn btn-danger btn-block" download="' + curData.IGIIlkokul + '">' + formLang.Ilkokul + '</a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">' +
                        '<a href="' + pdfsDir + curData.Ortaokul + '" class="btn btn-danger btn-block" download="' + curData.IGIOrtaokul + '">' + formLang.Ortaokul + '</a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">' +
                        '<a href="' + pdfsDir + curData.Lise + '" class="btn btn-danger btn-block" download="' + curData.IGILise + '">' + formLang.Lise + '</a>' +
                        '</div>';

                    trArray = new Array('IGIIlkokul', 'IGIOrtaokul', 'IGILise');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    syVars.sectionDatas.SinavYonergeleri.Data[i] = curData;
                }
                fhtml += '</div></section>';

                syVars.sectionDatas.SinavYonergeleri.FHtml = fhtml;
                syVars.sectionDatas.SinavYonergeleri.BHtml = bHtml;
                syVars.sectionDatas.SinavYonergeleri.Num = length;

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(syVars.sectionDatas.SinavYonergeleri.Data);
                    syVars.sectionDatas.SinavYonergeleri.Data = myJSON;
                    var theCacheData = {
                        SinavYonergeleri: syVars.sectionDatas.SinavYonergeleri,
                    }
                    setTimeout(Cache('GetSinavYonergeleriData', url, theCacheData), 1);
                    syVars.sectionDatas.SinavYonergeleri.Data = JSON.parse(myJSON);
                }

                $('#' + syVars.sectionShowBases.Sections).html(syVars.sectionDatas.SinavYonergeleri.FHtml)
            }
        },
        error: function() {
            iziError();
        }
    });
}



function RefreshData(html = 1, side = 0) {
    if (html == 1) {
        GetSectionsHtml()
    }
    if (side != 0) {
        GetCinsiyetlerSelect()
        GetSiniflarSelect()
        GetSinavTarihleriData()
        GetSinavTarihleriSelect(0)
    }
}