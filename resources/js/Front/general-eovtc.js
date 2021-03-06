var vars = {
    sectionControllers: {
        Normal: baseurl + 'Eovtc/',
    },
    sectionNames: {
        Normal: 'Eko Okul Ve Tema Çalışmaları',
        Upper: 'Eovtc',
        Lower: 'eovtc',
        Kod: 'GEOVTC',
    },
    sectionShowBases: {
        Sections: 'showEovtc',
        Aciklama: 'showGAciklama',
    },
    sectionFunctions: {
        Get: 'GetEovtc',
    },
    sectionDatas: {
        Eovtc: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },
    },
    sectionIsFirst: true,
};


$(function() {
    RefreshData();
});

//functions
function GetEovtcData() {
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
                var cache = result.cachedataEN.Eovtc;
                vars.sectionDatas.Eovtc = cache;
                vars.sectionDatas.Eovtc.Data = JSON.parse(cache.Data);
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Eovtc;
                vars.sectionDatas.Eovtc = cache;
                vars.sectionDatas.Eovtc.Data = JSON.parse(cache.Data);
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else {
                var data = result.data,
                    length = data.length,
                    bHtml = '',
                    fHtml = '';
                var i, j, rLength, curData, tempCurData, trInside, trArray;

                fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>' +

                    '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                    '<div id="G' + vars.sectionNames.Kod + '" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);
                    vars.sectionDatas.Eovtc.Data[i] = curData;

                    trArray = new Array('Resim');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    tempCurData = curData.Resim.split(',');

                    for (j = 0, rLength = tempCurData.length; j < rLength; j++) {
                        fHtml += '<img ' +
                            ' src="' + imagesDir + tempCurData[j] + '" ' +
                            ' data-aciklama="' + curData.Aciklama + '">';
                    }
                }

                fHtml += '</div>' +
                    '<div id="' + vars.sectionShowBases.Aciklama + '" class="marginT15"></div>' +
                    '</div>' +
                    '</div>' +
                    '</section>';

                vars.sectionDatas.Eovtc.BHtml = bHtml;
                vars.sectionDatas.Eovtc.FHtml = fHtml;
                vars.sectionDatas.Eovtc.Num = length;


                $('#' + vars.sectionShowBases.Sections).html(fHtml);

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(vars.sectionDatas.Eovtc.Data);
                    vars.sectionDatas.Eovtc.Data = myJSON;
                    var theCacheData = {
                        Eovtc: vars.sectionDatas.Eovtc,
                    }
                    setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                    vars.sectionDatas.Eovtc.Data = JSON.parse(myJSON);
                }
            }

            GetGallery()

        },
        error: function() {
            iziError();
        }
    });
}

function GetGallery() {
    var html = '';

    UG = jQuery('#G' + vars.sectionNames.Kod).unitegallery({
        thumb_fixed_size: false,
        thumb_image_overlay_effect: true,
        thumb_image_overlay_type: "blur",
        slider_scale_mode: "fit",
        gallery_autoplay: true,
        gallery_width: 1400,
        gallery_height: 650,
    });

    html = UG.getItem(0)['aciklama'];
    $('#' + vars.sectionShowBases.Aciklama).html(html);

    UG.on("item_change", function(num, data) { //on item change, get item number and item data
        var htmlTemp = UG.getItem(num)['aciklama'];
        $('#' + vars.sectionShowBases.Aciklama).html(htmlTemp);
    });
}

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
        '<a href="javascript:;" class="btn btn-warning btn-block hvr-round-corners ' + tableOpts.ButtonUp + '" data="' + no + '" data2="' + listOrder + '"><i class="' + tableOpts.IconUp + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-warning btn-block hvr-round-corners ' + tableOpts.ButtonDown + '" data="' + no + '" data2="' + listOrder + '"><i class="' + tableOpts.IconDown + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
        '</td>';

    return newHtml;
}

function RefreshData() {
    GetEovtcData();
}