var vars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Çözümleriniz İçin Veli Öğretmen Görüşme Takvimi',
    sectionNameLower: 'civogt',
    sectionNameUpper: 'Civogt',
    sectionController: baseurl + 'CIVOGT/',
    sectionShowBase: '#showCivogt',
    sectionBaslikCode: 'CIVOGT',

    sectionDatas: {
        Civogt: {
            Data: {},
            DataCounter: 0,
        },
        Okullar: GetOkullarData(),
        Gunler: GetGunlerData(),
        Dersler: GetDerslerData(),
        Yillar: GetYillarData(),
        Siniflar: GetSiniflarData(),
        Subeler: GetSubelerData(),
    },

    sectionFunctions: {
        CivogtGet: 'GetCivogt',
    },

    sectionButtons: {
        ShowTable: 'showTable',
    },

    sectionIsFirst: {
        Civogt: true,
    },

    sectionSPs: {
        Yil: 'Yil',
        Donem: 'Donem',
        Okul: 'Okul',
        Sinif: 'Sinif',
        Sube: 'Sube',
    },
    sectionSPsValues: {
        Yil: '',
        Donem: '',
        Okul: '',
        Sinif: '',
        Sube: '',
    },
};

$(function() {

    //Refresh Page
    RefreshHtmls();
    RefreshData();

    $('#' + vars.sectionButtons.ShowTable).on('click', function(e) {
        CreateTable();
    });
});

function GetYillar() {
    var i, length, data;
    data = vars.sectionDatas.Yillar;
    length = data.length;

    var yil_html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Yil + '" id="' + vars.sectionSPs.Yil + 'Select" title="' + formLang.YilSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        yil_html += '<option data-tokens="' + data[i] + '" value="' + data[i] + '">' + data[i] + '</option>';
    }

    yil_html += '</select>';
    $('#' + vars.sectionSPs.Yil).html(yil_html);
    setTimeout(RefreshSelectpicker(), 1);

    $('#' + vars.sectionSPs.Yil + 'Select').on('change', function(e) {
        var valueSelected = this.value;
        vars.sectionSPsValues.Yil = valueSelected;
        $('#' + vars.sectionSPs.Donem + 'Select').prop('disabled', false);
        $('#' + vars.sectionSPs.Donem + 'Select').selectpicker('refresh');
    });
}

function GetDonem() {
    var i, length, data;
    data = new Array("1", "2");
    length = data.length;

    var html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Donem + '" id="' + vars.sectionSPs.Donem + 'Select" title="' + formLang.DonemSec + '" data-liveSearchNormalize="true" disabled>';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i] + '" value="' + data[i] + '">' + data[i] + '</option>';
    }

    html += '</select>';
    $('#' + vars.sectionSPs.Donem).html(html);
    setTimeout(RefreshSelectpicker(), 1);

    $('#' + vars.sectionSPs.Donem + 'Select').on('change', function(e) {
        var valueSelected = this.value;
        vars.sectionSPsValues.Donem = valueSelected;
        $('#' + vars.sectionSPs.Okul + 'Select').prop('disabled', false);
        $('#' + vars.sectionSPs.Okul + 'Select').selectpicker('refresh');
    });
}

function GetOkul() {
    var i, length, data;
    data = vars.sectionDatas.Okullar;
    length = data.length;

    var html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Okul + '" id="' + vars.sectionSPs.Okul + 'Select" title="' + formLang.OkulSec + '" data-liveSearchNormalize="true" disabled>';

    for (i = 1; i < length; i++) {
        html += '<option ad="' + data[i].Ad + '" data-tokens="' + data[i].Kod + ' ' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }

    html += '</select>';
    $('#' + vars.sectionSPs.Okul).html(html);
    setTimeout(RefreshSelectpicker(), 1);

    $('#' + vars.sectionSPs.Okul + 'Select').on('change', function(e) {
        var valueSelected = this.value;
        var ad = $(this).find('option[value=' + valueSelected + ']').attr('ad');
        vars.sectionSPsValues.Okul = ad;
        GetSinif(valueSelected);
        GetSube();
    });
}

function GetSinif(okul = -1) {
    var i, length, data;
    data = vars.sectionDatas.Siniflar;
    if (okul == -1) {
        length = data.length;
        var html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Sinif + '" id="' + vars.sectionSPs.Sinif + 'Select" title="' + formLang.SinifSec + '" data-liveSearchNormalize="true" disabled></select>';
        $('#' + vars.sectionSPs.Sinif).html(html);
    } else {
        var curSiniflar = data.filter(function(sinif) {
            return sinif.Okul == okul;
        });

        length = curSiniflar.length;
        var html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Sinif + '" id="' + vars.sectionSPs.Sinif + 'Select" title="' + formLang.SinifSec + '" data-liveSearchNormalize="true">';
        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + curSiniflar[i].Kod + ' ' + curSiniflar[i].Kod + '" value="' + curSiniflar[i].Kod + '">' + curSiniflar[i].Kod + '</option>';
        }
        html += '</select>';
        $('#' + vars.sectionSPs.Sinif).html(html);

        $('#' + vars.sectionSPs.Sinif + 'Select').on('change', function(e) {
            var valueSelected = this.value;
            vars.sectionSPsValues.Sinif = valueSelected;
            GetSube(valueSelected)
        });
    }
    setTimeout(RefreshSelectpicker(), 1);
}

function GetSube(sinif = -1) {
    var i, length, data;
    data = vars.sectionDatas.Subeler;
    $('#' + vars.sectionButtons.ShowTable).prop('disabled', true);
    if (sinif == -1) {
        length = data.length;
        var html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Sube + '" id="' + vars.sectionSPs.Sube + 'Select" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true" disabled></select>';
        $('#' + vars.sectionSPs.Sube).html(html);
    } else {
        var curSubeler = data.filter(function(sube) {
            return sube.Sinif == sinif;
        });

        length = curSubeler.length;
        var html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Sube + '" id="' + vars.sectionSPs.Sube + 'Select" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true">';
        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + curSubeler[i].Kod + ' ' + curSubeler[i].Okul + '" value="' + curSubeler[i].Kod + '">' + curSubeler[i].Kod + '</option>';
        }
        html += '</select>';
        $('#' + vars.sectionSPs.Sube).html(html);

        $('#' + vars.sectionSPs.Sube + 'Select').on('change', function(e) {
            var valueSelected = this.value;
            vars.sectionSPsValues.Sube = valueSelected;
            $('#' + vars.sectionButtons.ShowTable).prop('disabled', false);
        });
    }
    setTimeout(RefreshSelectpicker(), 1);
}

function CreateTable() {
    var i, html, length, data, values, trArray, trInside;
    html = '';
    values = vars.sectionSPsValues;
    data = vars.sectionDatas.Civogt.Data;

    var yilF = data.filter(function(civogt) {
        return civogt.Yil == values.Yil;
    });
    var donemF = yilF.filter(function(civogtY) {
        return civogtY.Donem == values.Donem;
    });
    var okulF = donemF.filter(function(civogtYD) {
        return civogtYD.Okul == values.Okul;
    });
    var sinifF = okulF.filter(function(civogtYDO) {
        return civogtYDO.Sinif == values.Sinif;
    });
    var subeF = sinifF.filter(function(civogtYDOS) {
        return civogtYDOS.Sube == values.Sube;
    });

    data = subeF;
    length = data.length;
    trArray = new Array('Ders', 'Gun', 'Saat')
    for (i = 0; i < length; i++) {
        trInside = GetHtmlTr(data[i], trArray);
        html += '<tr class="shorten_content6">' + trInside + '</tr>';
    }

    GetCivogtHtml();
    $('#show' + vars.sectionNameUpper + 'Data').html(html);

    setTimeout(function() {
        if ($.fn.DataTable.isDataTable('.datatable')) {
            $('.datatable').DataTable().destroy();
        }
    }, 1)

    setTimeout(CreateDataTables(), 2)

}

function GetCivogtData() {
    vars.sectionDatas.Civogt = {
        Data: {},
        DataCounter: 0,
    }
    var url = vars.sectionController + vars.sectionFunctions.CivogtGet;
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
                var cache = result.cachedataEN.Civogt;
                vars.sectionDatas.Civogt = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Civogt;
                vars.sectionDatas.Civogt = cache;
            } else {
                var i;
                var length;
                var data = result.data;
                var curData;

                for (i = 0, length = data.length; i < length; i++) {
                    curData = data[i];

                    var curDers = vars.sectionDatas.Dersler.filter(function(ders) {
                        return ders.Kod == curData.Ders;
                    });

                    var curOkul = vars.sectionDatas.Okullar.filter(function(okul) {
                        return okul.Kod == curData.Okul;
                    });

                    var curGun = vars.sectionDatas.Gunler.filter(function(okul) {
                        return okul.Kod == curData.Gun;
                    });

                    curData.Ders = curDers[0].Ad;
                    curData.Okul = curOkul[0].Ad;
                    curData.Gun = curGun[0].Ad;

                    vars.sectionDatas.Civogt.Data[vars.sectionDatas.Civogt.DataCounter] = curData;
                    vars.sectionDatas.Civogt.DataCounter++;
                }
                var theCacheData = {
                    Civogt: vars.sectionDatas.Civogt,
                }
                setTimeout(Cache('GetCivogtData', url, theCacheData), 1)
            }

        },
        error: function() {
            iziError();
        }
    });

}


function GetCivogtHtml() {
    var html = '';
    var isFirstJ = true;

    if (vars.sectionIsFirst.Civogt) {
        html += '<section id="' + vars.sectionNameLower + '">' +
            '<div class="container">' +
            '<div class="col-lg-12 page-header wow bounceInDown paddingL0" data-wow-delay="' + wowDelay + '">' +
            '<h2 data-basliklar="' + vars.sectionBaslikCode + '">' + vars.sectionNameNormal + '</h2>' +
            '</div>' +
            '</div>' +
            '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + TextAnimation + '" data-wow-delay="' + wowDelayText + '">' +
            '<img src="' + imagesDir + 'Genel/CIVOGS-2.png" class="img-responsive img-center">' +
            '</div>' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 marginT15 wow ' + TextAnimation + '" data-wow-delay="' + wowDelayText + '">' +

            '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
            '<label>' + formLang.Yil + '</label>' +
            '<div id="Yil"></div>' +
            '</div>' +
            '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
            '<label>' + formLang.Donem + '</label>' +
            '<div id="Donem"></div>' +
            '</div>' +
            '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
            '<label>' + formLang.Okul + '</label>' +
            '<div id="Okul"></div>' +
            '</div>' +
            '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
            '<label>' + formLang.Sinif + '</label>' +
            '<div id="Sinif"></div>' +
            '</div>' +
            '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
            '<label>' + formLang.Sube + '</label>' +
            '<div id="Sube"></div>' +
            '</div>' +
            '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
            '<label> </label>' +
            '<button type="button" id="' + vars.sectionButtons.ShowTable + '" class="btn btn-danger btn-md btn-block">' + formLang.Goster + '</button>' +
            '</div>' +

            '</div>' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15">' +
            '<div id="show' + vars.sectionNameUpper + 'Table"></div>' +
            '</div>' +
            '</div><!-- End container -->' +
            '</section>';
        $('#show' + vars.sectionNameUpper).html(html);

        vars.sectionIsFirst.Civogt = false;
    } else {
        html += '<div class="table-responsive">' +
            '<table class="table table-bordered table-hover datatable">' +
            '<thead class="text-center">' +
            '<th class="text-center">' + formLang.Ders + '</th>' +
            '<th class="text-center">' + formLang.Gun + '</th>' +
            '<th class="text-center">' + formLang.Saat + '</th>' +
            '</thead>' +
            '<tbody id="show' + vars.sectionNameUpper + 'Data">' +
            '</tbody>' +
            '</table>' +
            '</div>';
        $('#show' + vars.sectionNameUpper + 'Table').html(html);
    }
}

function GetHtmlTr(data, trArray) {
    var i;
    var newHtml = '';
    var length = trArray.length;
    var no = data.No;
    var listOrder = data.ListOrder;

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
    }
    return newHtml;
}

function RefreshData() {
    GetCivogtData();
    RefreshSideData()
}

var isFirst = true;

function RefreshSideData() {
    $(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
        GetYillar()
        GetDonem();
        GetOkul();
        GetSinif();
        GetSube();
    });
}

function RefreshHtmls() {
    GetCivogtHtml()
}