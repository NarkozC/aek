var vars = {
    sectionNames: {
        Normal: 'Çözümleriniz İçin Veli Öğretmen Görüşme Takvimi',
        Upper: 'Civogt',
        Lower: 'civogt',
        Kod: 'GCivogt',
    },
    sectionControllers: {
        Normal: baseurl + 'Civogt/',
    },
    sectionShowBases: {
        Sections: 'showCivogt',
        Table: 'showTableData',
    },
    sectionDatas: {
        Civogt: {
            Data: new Array(),
            Num: 0,
        },
        Okullar: GetOkullarData(),
        Gunler: GetGunlerData(),
        Dersler: GetDerslerData(),
        Yillar: GetYillarData(),
        Siniflar: GetSiniflarData(),
        Subeler: GetSubelerData(),
        Settings: GetSettingsData(),
    },
    sectionFunctions: {
        Get: 'GetCivogt',
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

    for (var i = 0, data = vars.sectionDatas.Settings, length = data.length; i < length; i++) {
        if (data[i].ControllerName == vars.sectionNames.Upper) {
            vars.sectionDatas.Settings = data[i];
        }
    }


    //Refresh Page
    RefreshData(1, 1, 1);

    $('#' + vars.sectionButtons.ShowTable).on('click', function(e) {
        CreateTable();
    });
});

function GetYillar() {
    var i, html;
    var data = vars.sectionDatas.Yillar,
        length = data.length;


    html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Yil + '" id="' + vars.sectionSPs.Yil + 'Select" title="' + formLang.YilSec + '" data-liveSearchNormalize="true">';
    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i] + '" value="' + data[i] + '">' + data[i] + '</option>';
    }
    html += '</select>';

    $('#' + vars.sectionSPs.Yil).html(html);
    RefreshSelectpicker()

    $('#' + vars.sectionSPs.Yil + 'Select').on('change', function(e) {
        var valueSelected = this.value;
        vars.sectionSPsValues.Yil = valueSelected;
        $('#' + vars.sectionSPs.Donem + 'Select').prop('disabled', false);
        RefreshSelectpicker()
    });
}

function GetDonem() {
    var i, html;
    var data = new Array("1", "2"),
        length = data.length;


    html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Donem + '" id="' + vars.sectionSPs.Donem + 'Select" title="' + formLang.DonemSec + '" data-liveSearchNormalize="true" disabled>';
    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i] + '" value="' + data[i] + '">' + data[i] + '</option>';
    }
    html += '</select>';

    $('#' + vars.sectionSPs.Donem).html(html);
    RefreshSelectpicker()

    $('#' + vars.sectionSPs.Donem + 'Select').on('change', function(e) {
        var valueSelected = this.value;
        vars.sectionSPsValues.Donem = valueSelected;
        $('#' + vars.sectionSPs.Okul + 'Select').prop('disabled', false);
        RefreshSelectpicker()
    });
}

function GetOkul() {
    var i, html;
    var data = vars.sectionDatas.Okullar,
        length = data.length;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Okul + '" id="' + vars.sectionSPs.Okul + 'Select" title="' + formLang.OkulSec + '" data-liveSearchNormalize="true" disabled>';
    for (i = 1; i < length; i++) {
        html += '<option ad="' + data[i].Ad + '" data-tokens="' + data[i].Kod + ' ' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }
    html += '</select>';

    $('#' + vars.sectionSPs.Okul).html(html);
    RefreshSelectpicker()

    $('#' + vars.sectionSPs.Okul + 'Select').on('change', function(e) {
        var valueSelected = this.value;
        var ad = $(this).find('option[value=' + valueSelected + ']').attr('ad');
        vars.sectionSPsValues.Okul = ad;
        GetSinif(valueSelected);
        GetSube();
        RefreshSelectpicker()
    });
}

function GetSinif(okul = -1) {
    var i, html, length;
    var data = vars.sectionDatas.Siniflar;

    if (okul == -1) {
        length = data.length;
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Sinif + '" id="' + vars.sectionSPs.Sinif + 'Select" title="' + formLang.SinifSec + '" data-liveSearchNormalize="true" disabled></select>';
        $('#' + vars.sectionSPs.Sinif).html(html);
    } else {
        var curSiniflar = data.filter(function(sinif) {
            return sinif.Okul == okul;
        });

        length = curSiniflar.length;
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Sinif + '" id="' + vars.sectionSPs.Sinif + 'Select" title="' + formLang.SinifSec + '" data-liveSearchNormalize="true">';
        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + curSiniflar[i].Kod + ' ' + curSiniflar[i].Kod + '" value="' + curSiniflar[i].Kod + '">' + curSiniflar[i].Kod + '</option>';
        }
        html += '</select>';
        $('#' + vars.sectionSPs.Sinif).html(html);

        $('#' + vars.sectionSPs.Sinif + 'Select').on('change', function(e) {
            var valueSelected = this.value;
            vars.sectionSPsValues.Sinif = valueSelected;
            GetSube(valueSelected)
            RefreshSelectpicker()
        });
    }
    RefreshSelectpicker()
}

function GetSube(sinif = -1) {
    var i, length;
    var data = vars.sectionDatas.Subeler.Data;

    $('#' + vars.sectionButtons.ShowTable).prop('disabled', true);
    if (sinif == -1) {
        length = data.length;
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Sube + '" id="' + vars.sectionSPs.Sube + 'Select" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true" disabled></select>';
        $('#' + vars.sectionSPs.Sube).html(html);
    } else {
        var curSubeler = data.filter(function(sube) {
            return sube.Sinif == sinif;
        });

        length = curSubeler.length;
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Sube + '" id="' + vars.sectionSPs.Sube + 'Select" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true">';
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
    RefreshSelectpicker()
}

function CreateTable() {
    var i, html, length, data, values, trArray, trInside;
    var html = '',
        values = vars.sectionSPsValues,
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
        html += '<tr>' + trInside + '</tr>';
    }

    $('#' + vars.sectionShowBases.Table).show();
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#' + vars.sectionShowBases.Table).find('tbody:first').html(html);

    CreateDataTables()

    setTimeout(function() {
        ShortenContent();
    }, 1);


}

function GetCivogtData() {
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
                var cache = result.cachedataEN.Civogt;
                vars.sectionDatas.Civogt = cache;
                vars.sectionDatas.Civogt.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Civogt;
                vars.sectionDatas.Civogt = cache;
                vars.sectionDatas.Civogt.Data = JSON.parse(cache.Data);
            } else {
                var i;
                var length;
                var data = result.data;
                var curData;

                for (i = 0, length = data.length; i < length; i++) {
                    curData = data[i];

                    var curDers = vars.sectionDatas.Dersler.Data.filter(function(ders) {
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

                    vars.sectionDatas.Civogt.Data[vars.sectionDatas.Civogt.Num] = curData;
                    vars.sectionDatas.Civogt.Num++;
                }

                if (vars.sectionDatas.Civogt.Num < cacheLimit) {
                    var myJSON = JSON.stringify(vars.sectionDatas.Civogt.Data);
                    vars.sectionDatas.Civogt.Data = myJSON;
                    var theCacheData = {
                        Civogt: vars.sectionDatas.Civogt,
                    }
                    setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                    vars.sectionDatas.Civogt.Data = JSON.parse(myJSON);
                }

            }

        },
        error: function() {
            iziError();
        }
    });

}


function GetCivogtHtml() {
    var setData = vars.sectionDatas.Settings;
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '">' +
        '<div class="container">' +
        '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
        '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
        '</div>' +
        '</div>' +
        '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
        '<img src="' + imagesDir + setData.Deger4 + '" class="img-responsive img-center">' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 marginT15 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
        '<label>' + formLang.Yil + '</label>' +
        '<div id="' + vars.sectionSPs.Yil + '"></div>' +
        '</div>' +
        '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
        '<label>' + formLang.Donem + '</label>' +
        '<div id="' + vars.sectionSPs.Donem + '"></div>' +
        '</div>' +
        '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
        '<label>' + formLang.Okul + '</label>' +
        '<div id="' + vars.sectionSPs.Okul + '"></div>' +
        '</div>' +
        '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
        '<label>' + formLang.Sinif + '</label>' +
        '<div id="' + vars.sectionSPs.Sinif + '"></div>' +
        '</div>' +
        '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
        '<label>' + formLang.Sube + '</label>' +
        '<div id="' + vars.sectionSPs.Sube + '"></div>' +
        '</div>' +
        '<div class="col-xs-6 col-sm-6 col-md-2 col-lg-2">' +
        '<label> </label>' +
        '<button type="button" id="' + vars.sectionButtons.ShowTable + '" class="btn btn-danger btn-md btn-block">' + formLang.Goster + '</button>' +
        '</div>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15">' +
        '<div class="table-responsive" id="' + vars.sectionShowBases.Table + '">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Ders + '</th>' +
        '<th class="text-center">' + formLang.Gun + '</th>' +
        '<th class="text-center">' + formLang.Saat + '</th>' +
        '</thead>' +
        '<tbody>' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '</div><!-- End container -->' +
        '</section>';

    $('#' + vars.sectionShowBases.Sections).html(html);
    $('#' + vars.sectionShowBases.Table).hide();
}

function GetHtmlTr(data, trArray) {
    var newHtml = '',
        length = trArray.length;
    var i;

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
    }
    return newHtml;
}

function RefreshData(data = 1, html = 0, side = 0) {
    if (data == 1) {
        GetCivogtData();
    }
    if (html == 1) {
        GetCivogtHtml()
    }
    if (side == 1) {
        GetYillar()
        GetDonem();
        GetOkul();
        GetSinif();
        GetSube();
    }
}