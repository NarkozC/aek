var vars = {
    sectionControllers: {
        Normal: baseurl + 'Neden-AEK/',
    },
    sectionNames: {
        Normal: 'Neden AEK',
        Upper: 'NedenAEK',
        Lower: 'nedenAEK',
        Kod: 'GNAEK',
    },
    sectionShowBases: {
        Sections: 'showNedenAEK',
    },
    sectionFunctions: {
        Get: 'GetNedenAEK',
    },
    sectionDatas: {
        NedenAEK: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },
    },
};

$(function() {
    GetNedenAEK();
});

//functions
function GetNedenAEK() {
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
                var cache = result.cachedataEN.NedenAEK;
                vars.sectionDatas.NedenAEK = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.NedenAEK;
                vars.sectionDatas.NedenAEK = cache;
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

                    vars.sectionDatas.NedenAEK.Data[i] = curData;
                }
                fhtml += '</section>';
                $('#' + vars.sectionShowBases.Sections).html(fhtml);

                vars.sectionDatas.NedenAEK.FHtml = fhtml;
                vars.sectionDatas.NedenAEK.BHtml = bHtml;
                vars.sectionDatas.NedenAEK.Num = length;
                var theCacheData = {
                    NedenAEK: vars.sectionDatas.NedenAEK,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
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
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
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