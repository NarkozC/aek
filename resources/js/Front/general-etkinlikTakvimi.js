var vars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Etkinlik Takvimi',
    sectionNameLower: 'etkinlikTakvimi',
    sectionNameUpper: 'EtkinlikTakvimi',
    sectionController: baseurl + 'Etkinlik-Takvimi/',
    sectionShowBase: '#showEtkinlikTakvimiData',
    sectionGetFunction: 'GetEtkinlikTakvimi',
    sectionIsFirst: true,
    sectionIsSubelerFirst: true,
    sectionIsAylarFirst: true,
    subelerData: new Array(),
    etkinlikTakvimiData: new Array(),
};

var sube_ID = 'Subeler';
var sube_section = 'Sube';
var okul_ID = 'Okullar';
var okul_section = 'Okul';
var ay_ID = 'Aylar';
var ay_section = 'Ay';

$(function() {

    //Refresh Page
    RefreshHtmls();
    RefreshData();

    $('#' + okul_ID).on('change', function(e) {
        var valueSelected = this.value;
        var valueSelectedAy = $('#' + ay_ID).selectpicker('val');
        if (valueSelectedAy != '') {
            RefreshHtmls()
            RefreshData(valueSelected, 0, valueSelectedAy);
        } else {
            RefreshHtmls()
            RefreshData(valueSelected);
        }
    });

    $('#' + ay_ID).on('change', function(e) {
        var valueSelected = this.value;
        GetAylar(valueSelected);
    });

    $('#show' + vars.sectionNameUpper).on('change', '#' + sube_ID, function(e) {
        var valueSelected = this.value;
        var valueSelectedAy = $('#' + ay_ID).selectpicker('val');
        if (valueSelectedAy != '') {
            RefreshData(0, valueSelected, valueSelectedAy);
        } else {
            RefreshData(0, valueSelected);
        }
    });

});

function GetSubeler(okulKodu = 0) {
    if (vars.sectionIsSubelerFirst) {
        var url = baseurl + 'Subeler/GetSubeler';
        $.ajax({
            type: 'ajax',
            method: 'post',
            url: url,
            async: false,
            dataType: 'json',
            success: function(data) {
                var okulsArrays = {
                    ilkokul: new Array(),
                    ortaokul: new Array(),
                    anadoluLisesi: new Array(),
                    tumokul: new Array(),
                };
                var okulsArraysC = {
                    ilkokul: 0,
                    ortaokul: 0,
                    anadoluLisesi: 0,
                    tumokul: 0,
                };

                var i;
                var okulNames = new Array();

                var sube_html = '<select class="form-control selectpicker" data-live-search="true" name="Sube" id="' + sube_ID + '" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true" disabled></select>';
                var okul_html = '<select class="form-control selectpicker" data-live-search="true" name="Okul" id="' + okul_ID + '" title="' + formLang.OkulSec + '" data-liveSearchNormalize="true">';

                for (var i = 0; i < data.length; i++) {
                    if (data[i].Okul_Kodu == "1") {
                        if (en) {
                            if (data[i].en_Okul == "") {
                                okulNames[0] = data[i].tr_Okul;
                            } else {
                                okulNames[0] = data[i].en_Okul;
                            }
                        } else {
                            okulNames[0] = data[i].tr_Okul;
                        }
                        okulsArrays['ilkokul'][okulsArraysC['ilkokul']] = data[i];
                        okulsArraysC['ilkokul']++;
                    }
                    if (data[i].Okul_Kodu == "2") {
                        if (en) {
                            if (data[i].en_Okul == "") {
                                okulNames[1] = data[i].tr_Okul;
                            } else {
                                okulNames[1] = data[i].en_Okul;
                            }
                        } else {
                            okulNames[1] = data[i].tr_Okul;
                        }
                        okulsArrays['ortaokul'][okulsArraysC['ortaokul']] = data[i];
                        okulsArraysC['ortaokul']++;
                    }
                    if (data[i].Okul_Kodu == "3") {
                        if (en) {
                            if (data[i].en_Okul == "") {
                                okulNames[2] = data[i].tr_Okul;
                            } else {
                                okulNames[2] = data[i].en_Okul;
                            }
                        } else {
                            okulNames[2] = data[i].tr_Okul;
                        }
                        okulsArrays['anadoluLisesi'][okulsArraysC['anadoluLisesi']] = data[i];
                        okulsArraysC['anadoluLisesi']++;
                    }
                    okulsArrays['tumokul'][okulsArraysC['tumokul']] = data[i];
                    okulsArraysC['tumokul']++;

                }
                for (var j = 0; j < okulNames.length; j++) {
                    okul_html += '<option data-tokens="' + okulNames[j] + '" value="' + (j + 1) + '">' + okulNames[j] + '</option>';
                }

                okul_html += '</select>';
                vars.subelerData = okulsArrays;
                $('#' + okul_section).html(okul_html);
                $('#' + sube_section).html(sube_html);

            },
            error: function() {
                iziError();
            }
        });
        vars.sectionIsSubelerFirst = false;
    } else {
        var data;
        var sube_html = '';
        if (okulKodu != 0) {
            sube_html = '<select class="form-control selectpicker" data-live-search="true" name="Sube" id="' + sube_ID + '" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true">' +
                '<option data-tokens="' + formLang.Sifirla + '" value="reset">' + formLang.Sifirla + '</option>';

            data = vars.subelerData['tumokul'];
            for (var i = 0; i < data.length; i++) {
                if (data[i].Okul_Kodu == okulKodu) {
                    sube_html += '<option data-tokens="' + data[i].Sube + '" value="' + data[i].Sube + '">' + data[i].Sube + '</option>';
                }
            }
            sube_html += '</select>';
            $('#' + sube_section).html(sube_html);
        }
    }
    RefreshSelectpicker();
}

function GetAylar(ay = 0) {
    if (vars.sectionIsAylarFirst) {

        var ay_html = '<select class="form-control selectpicker" data-live-search="true" name="Ay" id="' + ay_ID + '" title="' + formLang.AySec + '" data-liveSearchNormalize="true" disabled>' +
            '<option data-tokens="' + formLang.Sifirla + '" value="reset">' + formLang.Sifirla + '</option>';

        for (var i = 0; i < aylarShowIDs.length; i++) {
            ay_html += '<option data-tokens="' + aylarLang[i] + '" value="' + aylarKods[i] + '">' + aylarLang[i] + '</option>';
        }

        ay_html += '</select>';
        $('#' + ay_section).html(ay_html);

        vars.sectionIsAylarFirst = false;
    } else {
        if (ay != 0) {
            var table = $('.datatable').DataTable();
            if (ay == 'reset') {
                table.search('').draw();
                $('#' + ay_ID).selectpicker('val', '');
            } else {
                table.search('.' + ay + '.').draw();
            }
        }
    }
    RefreshSelectpicker();
}

function GetEtkinlikTakvimi(okulKodu = 0, sube = 0) {
    if (vars.sectionIsFirst) {
        var url = vars.sectionController + vars.sectionGetFunction;
        $.ajax({
            type: 'ajax',
            method: 'post',
            url: url,
            async: false,
            dataType: 'json',
            success: function(data) {
                var i;
                var okulsArrays = {
                    ilkokul: new Array(),
                    ortaokul: new Array(),
                    anadoluLisesi: new Array(),
                    tumokul: new Array(),
                };
                var okulsArraysC = {
                    ilkokul: 0,
                    ortaokul: 0,
                    anadoluLisesi: 0,
                    tumokul: 0,
                };

                for (i = 0; i < data.length; i++) {

                    if (data[i].Okul_Kodu == 1) {
                        okulsArrays['ilkokul'][okulsArraysC['ilkokul']] = data[i];
                        okulsArraysC['ilkokul']++;
                    } else if (data[i].Okul_Kodu == 2) {
                        okulsArrays['ortaokul'][okulsArraysC['ortaokul']] = data[i];
                        okulsArraysC['ortaokul']++;
                    } else if (data[i].Okul_Kodu == 3) {
                        okulsArrays['anadoluLisesi'][okulsArraysC['anadoluLisesi']] = data[i];
                        okulsArraysC['anadoluLisesi']++;
                    }
                    okulsArrays['tumokul'][okulsArraysC['tumokul']] = data[i];
                    okulsArraysC['tumokul']++;

                }
                vars.etkinlikTakvimiData = okulsArrays;

            },
            error: function() {
                iziError();
            }
        });
        vars.sectionIsFirst = false;
    } else {
        var html = '';
        var data;
        if (okulKodu != 0) {
            if (okulKodu == 1) {
                data = vars.etkinlikTakvimiData['ilkokul'];
                for (var i = 0; i < data.length; i++) {
                    var trInside = GetHtmlTr(data[i]);
                    html += '<tr>' + trInside + '</tr>';
                }
            } else if (okulKodu == 2) {
                data = vars.etkinlikTakvimiData['ortaokul'];
                for (var i = 0; i < data.length; i++) {
                    var trInside = GetHtmlTr(data[i]);
                    html += '<tr>' + trInside + '</tr>';
                }
            } else if (okulKodu == 3) {
                data = vars.etkinlikTakvimiData['anadoluLisesi'];
                for (var i = 0; i < data.length; i++) {
                    var trInside = GetHtmlTr(data[i]);
                    html += '<tr>' + trInside + '</tr>';
                }
            }
            $('#' + ay_ID).prop('disabled', false);
        } else {
            if (sube != 0) {
                if (sube == 'reset') {
                    var valSelected = $('#' + okul_ID).val();
                    RefreshData(valSelected)
                    return false;
                } else {
                    data = vars.etkinlikTakvimiData['tumokul'];
                    for (var i = 0; i < data.length; i++) {
                        var dataSubeS = data[i].Sube.split(',');
                        for (var j = 0; j < dataSubeS.length; j++) {
                            if (dataSubeS[j] == sube) {
                                var trInside = GetHtmlTr(data[i]);
                                html += '<tr>' + trInside + '</tr>';
                            }
                        }
                    }
                }
            }

        }

        if ($.fn.DataTable.isDataTable('.datatable')) {
            $('.datatable').DataTable().destroy();
        }

        $('#show' + vars.sectionNameUpper + 'Data').html(html);

        CreateDataTables();

    }

}


function GetEtkinlikTakvimiHtml() {
    var html = '';
    var isFirstHtml = '';
    var Animation = 'bounceInUp';
    var EtkinlikTakvimiAnimation = 'fadeIn';
    var EtkinlikTakvimiAnimationDelay = (Number(wowDelayS) + 0.8);
    var isFirstJ = true;

    if (vars.sectionIsFirst) {
        isFirstHtml += '<section id="' + vars.sectionNameLower + '">' +
            '<div class="container">' +
            '<div class="col-lg-12 page-header wow bounceInDown paddingL0" data-wow-delay="' + wowDelay + '">' +
            '<h2 data-basliklar="GET">' + vars.sectionNameNormal + '</h2>' +
            '</div>' +
            '</div>' +
            '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + EtkinlikTakvimiAnimation + '" data-wow-delay="' + EtkinlikTakvimiAnimationDelay + 's">' +

            '<form role="form" method="post" id="' + vars.sectionNameLower + '-form" action="' + vars.sectionController + vars.sectionFilterFunction + '">' +
            '<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">' +
            '</div>' +
            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '<label>' + formLang.Okul + '</label>' +
            '<div id="Okul"></div>' +
            '</div>' +
            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '<label>' + formLang.Sube + '</label>' +
            '<div id="Sube"></div>' +
            '</div>' +
            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '<label>' + formLang.Ay + '</label>' +
            '<div id="Ay"></div>' +
            '</div>' +
            '<div class="col-xs-3 col-sm-3 col-md-3 col-lg-3">' +
            '</div>' +
            '</form>' +
            '</div>' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
            '<div id="show' + vars.sectionNameUpper + 'Table"></div>' +
            '</div>' +
            '</div><!-- End container -->' +
            '</section>';
        $('#show' + vars.sectionNameUpper).html(isFirstHtml);
    } else {
        html += '<div class="table-responsive">' +
            '<table class="table table-bordered table-hover datatable">' +
            '<thead class="text-center">' +
            '<th class="text-center">' + formLang.Tarih + '</th>' +
            '<th class="text-center">' + formLang.Sube + '</th>' +
            '<th class="text-center">' + formLang.Aciklama + '</th>' +
            '</thead>' +
            '<tbody id="show' + vars.sectionNameUpper + 'Data">' +
            '</tbody>' +
            '</table>' +
            '</div>';
        $('#show' + vars.sectionNameUpper + 'Table').html(html);
    }
}



function GetHtmlTr(data) {
    var No = data.No;
    var Sube = data.Sube;
    var Okul_Kodu = data.Okul_Kodu;
    var Tarih = data.Tarih;
    var dateAr = Tarih.split('-');
    Tarih = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];

    var Aciklama;

    var TRAciklama = data.tr_Aciklama;

    var ENAciklama = data.en_Aciklama;

    if (en) {
        if (ENAciklama == "") {
            Aciklama = TRAciklama;
        } else {
            Aciklama = ENAciklama;
        }
    } else {
        Aciklama = TRAciklama;
    }


    newHtml =
        '<td class="shorten_content6">' + Tarih + '</td>' +
        '<td class="shorten_content6">' + Sube + '</td>' +
        '<td class="shorten_content6">' + Aciklama + '</td>';
    return newHtml;
}

function RefreshData(okulKodu = 0, sube = 0, ay = 0) {
    GetSubeler(okulKodu);
    GetEtkinlikTakvimi(okulKodu, sube);
    GetAylar(ay);
    RefreshSideData()
}
var isFirst = true;

function RefreshSideData() {
    $(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    });
}

function RefreshHtmls() {
    GetEtkinlikTakvimiHtml()
}