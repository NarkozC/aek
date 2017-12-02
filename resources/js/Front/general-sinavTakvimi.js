var vars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Sınav Takvimi',
    sectionNameLower: 'sinavTakvimi',
    sectionNameUpper: 'SinavTakvimi',
    sectionController: baseurl + 'Sinav-Takvimi/',
    sectionShowBase: '#showSinavTakvimiData',
    sectionGetFunction: 'GetSinavTakvimi',
    sectionBaslikCode: 'GST',
    sectionIsFirst: true,
    sectionIsSubelerFirst: true,
    sectionIsAylarFirst: true,
    sectionIsYillarFirst: true,
    subelerData: new Array(),
    sinavTakvimiData: new Array(),

    sectionDatas: {
        Okullar: GetOkullarData(),
        Yillar: GetYillarData(), 
        Aylar: GetAylarData(),
        Subeler: GetSubelerData()
    }
};

var sube_ID = 'SubeSelect';
var sube_section = 'Sube';
var okul_ID = 'OkulSelect';
var okul_section = 'Okul';
var ay_ID = 'AySelect';
var ay_section = 'Ay';
var yil_ID = 'YilSelect';
var yil_section = 'Yil';

$(function() {

    //Refresh Page
    RefreshHtmls();
    RefreshData();

    $('#' + okul_ID).on('change', function(e) {
        var valueSelected = this.value;
        RefreshHtmls()
        RefreshData(valueSelected);
if (!isFirst) {
            ShortenContent6();
        }
    });

    $('#' + ay_ID).on('change', function(e) {
        var valueSelected = this.value;
        GetAylar(valueSelected);
        if (!isFirst) {
            ShortenContent6();
        }
    });

    $('#' + yil_ID).on('change', function(e) {
        var valueSelected = this.value;
        GetYillar(valueSelected);
        if (!isFirst) {
            ShortenContent6();
        }
    });

    $('#show' + vars.sectionNameUpper).on('change', '#' + sube_ID, function(e) {
        var valueSelected = this.value;
        RefreshData(0, valueSelected);
        if (!isFirst) {
            ShortenContent6();
        }
    });

});

function GetSubeler(okulKodu = 0) {
    if (vars.sectionIsSubelerFirst) {

        var data = vars.sectionDatas.Subeler;
        var odata = vars.sectionDatas.Okullar
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
                    if (data[i].Okul == "1") {
                        okulNames[0] = odata[1].Ad
                        okulsArrays['ilkokul'][okulsArraysC['ilkokul']] = data[i];
                        okulsArraysC['ilkokul']++;
                    }
                    if (data[i].Okul == "2") {
                        okulNames[1] = odata[2].Ad
                        okulsArrays['ortaokul'][okulsArraysC['ortaokul']] = data[i];
                        okulsArraysC['ortaokul']++;
                    }
                    if (data[i].Okul == "3") {
                        okulNames[2] = odata[3].Ad
                        okulsArrays['anadoluLisesi'][okulsArraysC['anadoluLisesi']] = data[i];
                        okulsArraysC['anadoluLisesi']++;
                    }
                    okulsArrays['tumokul'][okulsArraysC['tumokul']] = data[i];
                    okulsArraysC['tumokul']++;

                }
                console.log(okulNames)
                for (var j = 0; j < okulNames.length; j++) {
                    okul_html += '<option data-tokens="' + okulNames[j] + '" value="' + (j + 1) + '">' + okulNames[j] + '</option>';
                }

                okul_html += '</select>';
                vars.subelerData = okulsArrays;
                $('#' + okul_section).html(okul_html);
                $('#' + sube_section).html(sube_html);


        vars.sectionIsSubelerFirst = false;
    } else {
        var data;
        var sube_html = '';
        if (okulKodu != 0) {
            sube_html = '<select class="form-control selectpicker" data-live-search="true" name="Sube" id="' + sube_ID + '" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true">' +
                '<option data-tokens="' + formLang.Sifirla + '" value="reset">' + formLang.Sifirla + '</option>';

            data = vars.subelerData['tumokul'];
            for (var i = 0; i < data.length; i++) {
                if (data[i].Okul == okulKodu) {
                    sube_html += '<option data-tokens="' + data[i].Kod + '" value="' + data[i].Kod + '">' + data[i].Kod + '</option>';
                }
            }
            sube_html += '</select>';
            $('#' + sube_section).html(sube_html);
        }
    }
    RefreshSelectpicker();
    if (!isFirst) {
        ShortenContent6();
    }
}

function GetAylar(ay = 0) {
    if (vars.sectionIsAylarFirst) {

        var ay_html = '<select class="form-control selectpicker" data-live-search="true" name="Ay" id="' + ay_ID + '" title="' + formLang.AySec + '" data-liveSearchNormalize="true" disabled>' +
            '<option data-tokens="' + formLang.Sifirla + '" value="reset">' + formLang.Sifirla + '</option>';

        var data = vars.sectionDatas.Aylar;
        for (var i = 0; i < data.length; i++) {
            ay_html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
        }

        ay_html += '</select>';
        $('#' + ay_section).html(ay_html);

        vars.sectionIsAylarFirst = false;
    } else {
        if (ay != 0) {
            var table = $('.datatable').DataTable();
            var yilSearch = $('#' + yil_ID).selectpicker('val');

            if (ay == 'reset') {
                table.search(yilSearch).draw();
                $('#' + ay_ID).selectpicker('val', '');
            } else {
                if (yilSearch != '') {
                    table.search('.' + ay + '. ' + yilSearch).draw();
                } else {
                    table.search('.' + ay + '.').draw();
                }
            }

        }
    }
    RefreshSelectpicker();
    if (!isFirst) {
            ShortenContent6();
        }
}

function GetYillar(yil = 0) {
    if (vars.sectionIsYillarFirst) {

        var yil_html = '<select class="form-control selectpicker" data-live-search="true" name="' + yil_section + '" id="' + yil_ID + '" title="' + formLang.YilSec + '" data-liveSearchNormalize="true" disabled>' +
            '<option data-tokens="' + formLang.Sifirla + '" value="reset">' + formLang.Sifirla + '</option>';
        var data = vars.sectionDatas.Yillar;
        for (var i = 0; i < data.length; i++) {
            yil_html += '<option data-tokens="' + data[i] + '" value="' + data[i] + '">' + data[i] + '</option>';
        }

        yil_html += '</select>';
        $('#' + yil_section).html(yil_html);

        vars.sectionIsYillarFirst = false;
    } else {

        if (yil != 0) {
            var table = $('.datatable').DataTable();
            var aySearch = $('#' + ay_ID).selectpicker('val');

            if (yil == 'reset') {
                table.search(aySearch).draw();
                $('#' + yil_ID).selectpicker('val', '');
            } else {
                if (aySearch != '') {
                    table.search('.' + aySearch + '. ' + yil).draw();
                } else {
                    table.search(yil).draw();
                }

            }
        }
    }
    RefreshSelectpicker();
    if (!isFirst) {
            ShortenContent6();
        }
}

function GetSinavTakvimi(okulKodu = 0, sube = 0, yil = 0) {
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
                var odata = vars.sectionDatas.Okullar;
                var dataArrays = new Array();
                var dataArrayNames = new Array('Tumokul', 'Ilkokul', 'Ortaokul', 'AnadoluLisesi');
                var dataArrayCounters = new Array(0, 0, 0, 0);
                dataArrays = {
                    Tumokul: new Array(),
                    Ilkokul: new Array(),
                    Ortaokul: new Array(),
                    AnadoluLisesi: new Array(),
                }

                for (i = 0; i < data.length; i++) {

                    var okul_Kodu = data[i].Okul_Kodu;
                    for (var j = 1; j < odata.length; j++) {
                        if (okul_Kodu == String(j)) {
                            dataArrays[dataArrayNames[j]][dataArrayCounters[j]] = data[i];
                            dataArrayCounters[j]++;
                        }
                    }
                    dataArrays['Tumokul'][dataArrayCounters[0]] = data[i];
                    dataArrayCounters[0]++;

                }
                vars.sinavTakvimiData = dataArrays;

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
                data = vars.sinavTakvimiData['Ilkokul'];
                for (var i = 0; i < data.length; i++) {
                    var trInside = GetHtmlTr(data[i]);
                    html += '<tr>' + trInside + '</tr>';
                }
            } else if (okulKodu == 2) {
                data = vars.sinavTakvimiData['Ortaokul'];
                for (var i = 0; i < data.length; i++) {
                    var trInside = GetHtmlTr(data[i]);
                    html += '<tr>' + trInside + '</tr>';
                }
            } else if (okulKodu == 3) {
                data = vars.sinavTakvimiData['AnadoluLisesi'];
                for (var i = 0; i < data.length; i++) {
                    var trInside = GetHtmlTr(data[i]);
                    html += '<tr>' + trInside + '</tr>';
                }
            }
            $('#' + ay_ID).prop('disabled', false);
            $('#' + yil_ID).prop('disabled', false);
        } else {
            if (sube != 0) {
                if (sube == 'reset') {
                    var valSelected = $('#' + okul_ID).val();
                    RefreshData(valSelected)
                    return false;
                } else {
                    data = vars.sinavTakvimiData['Tumokul'];
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

        var table = $('.datatable').DataTable();
        var aySearch = $('#' + ay_ID).selectpicker('val');
        var yilSearch = $('#' + yil_ID).selectpicker('val');

        if (aySearch != '' && yilSearch != '') {
            table.search('.' + aySearch + '. ' + yilSearch).draw();
        } else if (aySearch != '') {
            table.search('.' + aySearch + '.').draw();
        } else if (yilSearch != '') {
            table.search(yilSearch).draw();
        }

    }


}


function GetSinavTakvimiHtml() {
    var html = '';
    var isFirstHtml = '';
    var isFirstJ = true;

    if (vars.sectionIsFirst) {
        isFirstHtml += '<section id="' + vars.sectionNameLower + '">' +
            '<div class="container">' +
            '<div class="col-lg-12 page-header wow '+AnimationHeader+' paddingL0" data-wow-delay="' + wowDelay + '">' +
            '<h2 data-basliklar="' + vars.sectionBaslikCode + '">' + vars.sectionNameNormal + '</h2>' +
            '</div>' +
            '</div>' +
            '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's">' +

            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '</div>' +
            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '<label>' + formLang.Okul + '</label>' +
            '<div id="Okul"></div>' +
            '</div>' +
            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '<label>' + formLang.Yil + '</label>' +
            '<div id="Yil"></div>' +
            '</div>' +
            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '<label>' + formLang.Sube + '</label>' +
            '<div id="Sube"></div>' +
            '</div>' +
            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '<label>' + formLang.Ay + '</label>' +
            '<div id="Ay"></div>' +
            '</div>' +
            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
            '</div>' +

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
            '<th class="text-center">' + formLang.Yil + '</th>' +
            '<th class="text-center">' + formLang.Tarih + '</th>' +
            '<th class="text-center">' + formLang.Sube + '</th>' +
            '<th class="text-center">' + formLang.Ders + '</th>' +
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
    var no = data.No;
    var yil = data.Yil;
    var sube = data.Sube;
    var tarih = data.Tarih.split('-');
    tarih = tarih[2] + '.' + tarih[1] + '.' + tarih[0];

    var trEnNames = new Array(
        'Aciklama',
        'Ders'
    );

    var trEnDatas = new Array();
    trEnDatas = {
        Aciklama: '',
        Ders: ''
    }

    for (var i = 0; i < trEnNames.length; i++) {
        var trData = 'tr_' + trEnNames[i];
        var enData = 'en_' + trEnNames[i];
        if (en) {
            if (data[enData] == "") {
                trEnDatas[trEnNames[i]] = data[trData];
            } else {
                trEnDatas[trEnNames[i]] = data[enData];
            }
        } else {
            trEnDatas[trEnNames[i]] = data[trData];
        }
    }


    newHtml =
        '<td class="shorten_content6">' + yil + '</td>' +
        '<td class="shorten_content6">' + tarih + '</td>' +
        '<td class="shorten_content6">' + sube + '</td>' +
        '<td class="shorten_content6">' + trEnDatas.Ders + '</td>' +
        '<td class="shorten_content6">' + trEnDatas.Aciklama + '</td>';
    return newHtml;
}

function RefreshData(okulKodu = 0, sube = 0, ay = 0, yil = 0) {
    GetSinavTakvimi(okulKodu, sube);
    GetYillar(yil);
    GetSubeler(okulKodu);
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
    GetSinavTakvimiHtml()
}