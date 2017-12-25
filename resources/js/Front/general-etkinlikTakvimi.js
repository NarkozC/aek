var vars = {
    sectionNames: {
        Normal: 'Etkinlik Takvimi',
        Upper: 'EtkinlikTakvimi',
        Lower: 'etkinlikTakvimi',
        Kod: 'GET',
    },
    sectionControllers: {
        Normal: baseurl + 'Etkinlik-Takvimi/',
    },
    sectionShowBases: {
        Sections: 'showEtkinlikTakvimi',
    },
    sectionFunctions: {
        Get: 'GetEtkinlikTakvimi',
    },

    sectionDatas: {
        EtkinlikTakvimi: {
            Data: new Array(),
            FData: new Array(),
            Num: 0,
        },

        Okullar: GetOkullarData(),
        Aylar: GetAylarData(),
        Subeler: GetSubelerData(),
    },
    sectionButtons: {
        ShowTable: 'showTable'
    },
    sectionSPs: {
        Okul: 'Okul',
        Sube: 'Sube',
        Ay: 'Ay',
    },
};

$(function() {

    //Refresh Page
    RefreshHtmls();
    RefreshData();

    $('#' + vars.sectionShowBases.Sections).on('click', '#' + vars.sectionButtons.ShowTable, function(e) {
        CreateSelectedTable();
    });

    $('#' + vars.sectionShowBases.Sections).on('change', '#' + vars.sectionSPs.Ay + 'Select', function(e) {
        var valueSelected = this.value;
        if (valueSelected == "reset") {
            $('#' + vars.sectionSPs.Ay + 'Select').selectpicker('val', '');
            RefreshSelectpicker();
        }
    });

    $('#' + vars.sectionShowBases.Sections).on('change', '#' + vars.sectionSPs.Sube + 'Select', function(e) {
        var valueSelected = this.value;
        if (valueSelected == "reset") {
            $('#' + vars.sectionSPs.Sube + 'Select').selectpicker('val', '');
            RefreshSelectpicker();
        }
    });

});

function GetOkullarSelect() {
    var i, data = vars.sectionDatas.Okullar,
        length = data.length,
        html = '';

    var tr_ID = vars.sectionSPs.Okul + 'Select';
    var tr_section = vars.sectionSPs.Okul;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '" id="' + tr_ID + '" title="' + formLang.OkulSec + '" data-liveSearchNormalize="true">';
    for (i = 1; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }
    html += '</select>'

    $('#' + tr_section).html(html);
    RefreshSelectpicker();

    $('#' + tr_ID).on('change', function(e) {
        var valueSelected = this.value;
        GetSubelerSelect(valueSelected);
        $('#' + vars.sectionSPs.Ay + 'Select').prop('disabled', false);
        RefreshSelectpicker();
        $('#' + vars.sectionButtons.ShowTable).prop('disabled', false);
    });
}

function GetSubelerSelect(okul = -1) {
    var i, length, data = vars.sectionDatas.Subeler.Data,
        html = '';

    var tr_ID = vars.sectionSPs.Sube + 'Select';
    var tr_section = vars.sectionSPs.Sube;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '" id="' + tr_ID + '" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true" disabled>';
    if (okul != -1) {
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '" id="' + tr_ID + '" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true">' +
            '<option data-tokens="Sifirla Bos" value="reset">' + formLang.Sifirla + '</option>';
        var curData = data.filter(function(sube) {
            return sube.Okul == okul;
        });
        length = curData.length;

        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + curData[i].Kod + '" value="' + curData[i].Kod + '">' + curData[i].Kod + '</option>';
        }
    }

    html += '</select>'

    $('#' + tr_section).html(html);
    RefreshSelectpicker();
}

function GetAylarSelect() {
    var i, length, data = vars.sectionDatas.Aylar,
        html = '';

    var tr_ID = vars.sectionSPs.Ay + 'Select';
    var tr_section = vars.sectionSPs.Ay;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '" id="' + tr_ID + '" title="' + formLang.AySec + '" data-liveSearchNormalize="true" disabled>' +
        '<option data-tokens="Sifirla Bos" value="reset">' + formLang.Sifirla + '</option>';
    length = data.length;

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }

    html += '</select>'

    $('#' + tr_section).html(html);
    RefreshSelectpicker();
}

function CreateSelectedTable() {
    var data = vars.sectionDatas.EtkinlikTakvimi.FData,
        html = '',
        searchText = '',
        trArray = new Array('Tarih', 'Sube', 'Aciklama'),
        selOkul = $('#' + vars.sectionSPs.Okul + 'Select').selectpicker('val'),
        selSube = $('#' + vars.sectionSPs.Sube + 'Select').selectpicker('val'),
        selAy = $('#' + vars.sectionSPs.Ay + 'Select').selectpicker('val');

    var curData, curSube, i, length, trInside;

    if (selOkul != '') {
        curData = data.filter(function(etkinlik) {
            return etkinlik.Okul == selOkul;
        });
    }

    for (i = 0, length = curData.length; i < length; i++) {
        var trInside = GetHtmlTr(curData[i], trArray);
        html += '<tr>' + trInside + '</tr>';
    }

    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Table').find('tbody:first').html(html);
    $('#show' + vars.sectionNames.Upper + 'Table').show();

    ShortenContent6();

    CreateDataTables();


    var table = $('.datatable').DataTable();
    if (selSube != '') {
        searchText += selSube;
    }
    if (selAy != '') {
        searchText += ' .' + selAy + '.';
    }
    table.search(searchText).draw();
}

function GetEtkinlikTakvimiData() {
    var url = vars.sectionControllers.Normal + vars.sectionFunctions.Get;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        data: {
            English: en
        },
        async: false,
        dataType: 'json',
        success: function(result) {
            if (en && result.cachedataEN != "") {
                var cache = result.cachedataEN.EtkinlikTakvimi;
                vars.sectionDatas.EtkinlikTakvimi = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.EtkinlikTakvimi;
                vars.sectionDatas.EtkinlikTakvimi = cache;
            } else {
                var i, j, curData, trInside;
                var data = result.data,
                    length, length2, htmls = {},
                    trArray = new Array('Tarih', 'Sube');

                for (i = 1, length = vars.sectionDatas.Okullar.length; i < length; i++) {
                    htmls[vars.sectionDatas.Okullar[i].Kod] = '';
                }

                for (i = 0, length = data.length; i < length; i++) {
                    curData = GetCurData(data[i]);

                    curData.Tarih = curData.Tarih.split('-');
                    curData.Tarih = curData.Tarih[2] + '.' + curData.Tarih[1] + '.' + curData.Tarih[0];
                    vars.sectionDatas.EtkinlikTakvimi.FData[i] = curData;

                    okul = curData.Okul.split(',');

                    for (j = 0, length2 = okul.length; j < length2; j++) {
                        trInside = GetHtmlTr(curData, trArray);
                        htmls[okul[j]] += '<tr>' + trInside + '</tr>';
                    }
                }
                vars.sectionDatas.EtkinlikTakvimi.Data = htmls;
                vars.sectionDatas.EtkinlikTakvimi.Num = length;

                var theCacheData = {
                    EtkinlikTakvimi: vars.sectionDatas.EtkinlikTakvimi,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
            }
        },
        error: function() {
            iziError();
        }
    });
}


function GetEtkinlikTakvimiHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '">' +
        '<div class="container">' +
        '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
        '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
        '</div>' +
        '</div>' +
        '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="row">' +
        '<div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">' +
        '<label>' + formLang.Okul + '</label>' +
        '<div id="' + vars.sectionSPs.Okul + '"></div>' +
        '</div>' +
        '<div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">' +
        '<label>' + formLang.Sube + '</label>' +
        '<div id="' + vars.sectionSPs.Sube + '"></div>' +
        '</div>' +
        '<div class="col-xs-6 col-sm-6 col-md-4 col-lg-4">' +
        '<label>' + formLang.Ay + '</label>' +
        '<div id="' + vars.sectionSPs.Ay + '"></div>' +
        '</div>' +
        '</div>' +

        '<div class="row">' +

        '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">' +
        '</div>' +
        '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">' +
        '<label> </label>' +
        '<button type="button" id="' + vars.sectionButtons.ShowTable + '" class="btn btn-danger btn-md btn-block">' + formLang.Goster + '</button>' +
        '</div>' +
        '<div class="col-xs-4 col-sm-4 col-md-4 col-lg-4">' +
        '</div>' +

        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
        '<div id="show' + vars.sectionNames.Upper + 'Table">' +
        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Tarih + '</th>' +
        '<th class="text-center">' + formLang.Sube + '</th>' +
        '<th class="text-center">' + formLang.Aciklama + '</th>' +
        '</thead>' +
        '<tbody id="show' + vars.sectionNameUpper + 'Data">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div><!-- End container -->' +
        '</section>';
    $('#' + vars.sectionShowBases.Sections).html(html);
    $('#show' + vars.sectionNames.Upper + 'Table').hide();
    $('#' + vars.sectionButtons.ShowTable).prop('disabled', true);
}

function GetHtmlTr(data, trArray) {
    var i;
    var newHtml = '';
    var length = trArray.length;
    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
    }
    return newHtml;
}

function RefreshData() {
    GetEtkinlikTakvimiData()
    GetOkullarSelect()
    GetSubelerSelect()
    GetAylarSelect()
}

function RefreshHtmls() {
    GetEtkinlikTakvimiHtml()
}