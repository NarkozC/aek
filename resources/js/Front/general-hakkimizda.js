var vars = {
    sectionControllers: {
        Normal: baseurl + 'Hakkimizda/',
    },
    sectionNames: {
        Normal: 'Hakkımızda',
        Upper: 'Hakkimizda',
        Lower: 'hakkimizda',
        Kod: 'GH',
    },
    sectionShowBases: {
        Sections: 'showHakkimizda',
    },
    sectionFunctions: {
        Get: 'GetHakkimizda',
    },
    sectionDatas: {
        Hakkimizda: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },
    },
};

$(function() {
    GetHakkimizda();
});

//functions
function GetHakkimizda() {
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
                var cache = result.cachedataEN.Hakkimizda;
                vars.sectionDatas.Hakkimizda = cache;
                vars.sectionDatas.Hakkimizda.Data = JSON.parse(cache.Data);
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Hakkimizda;
                vars.sectionDatas.Hakkimizda = cache;
                vars.sectionDatas.Hakkimizda.Data = JSON.parse(cache.Data);
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else {
                var fhtml = '',
                    bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                fhtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    if (i != 0) {
                        fhtml += '<div class="sectionArasiBosluk"></div>';
                    }

                    fhtml +=
                        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '" id="' + curData.SectionID + '">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center page-header wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<h2>' + curData.Baslik + '</h2>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<p>' + curData.Aciklama + '</p>' +
                        '</div>' +
                        '</div>';

                    trArray = new Array('Baslik');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    vars.sectionDatas.Hakkimizda.Data[i] = curData;
                }
                fhtml += '</section>';
                $('#' + vars.sectionShowBases.Sections).html(fhtml);

                vars.sectionDatas.Hakkimizda.FHtml = fhtml;
                vars.sectionDatas.Hakkimizda.BHtml = bHtml;
                vars.sectionDatas.Hakkimizda.Num = length;

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(vars.sectionDatas.Hakkimizda.Data);
                    vars.sectionDatas.Hakkimizda.Data = myJSON;
                    var theCacheData = {
                        Hakkimizda: vars.sectionDatas.Hakkimizda,
                    }
                    setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                    vars.sectionDatas.Hakkimizda.Data = JSON.parse(myJSON);
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