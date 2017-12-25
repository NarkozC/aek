var vars = {
    sectionControllers: {
        Normal: baseurl + 'Banner/',
    },
    sectionNames: {
        Normal: 'Banner',
        Upper: 'Banner',
        Lower: 'banner',
        Kod: 'GB',
    },
    sectionShowBases: {
        Sections: 'showBanner',
    },
    sectionFunctions: {
        Get: 'GetBanner',
    },
    sectionDatas: {
        Banner: {
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
function GetBannerData() {
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
                var cache = result.cachedataEN.Banner;
                vars.sectionDatas.Banner = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Banner;
                vars.sectionDatas.Banner = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else {
                var data = result.data,
                    length = data.length,
                    bHtml = '',
                    fHtml = '',
                    bDuration = 2000;
                var i, curData, trInside, trArray;

                fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container-fluid padding0 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                    '<div id="layerslider">';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);
                    vars.sectionDatas.Banner.Data[i] = curData;

                    trArray = new Array('Resim');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    fHtml += '<div class="ls-slide" data-ls="duration: ' + bDuration + '; transition3d: all;">' +
                        '<img src="' + imagesDir + curData.Resim + '" class="ls-bg" alt="I">' +
                        '</div>';
                }

                fHtml += '</div>' +
                    '</div>' +
                    '</div>' +
                    '</section>';

                vars.sectionDatas.Banner.BHtml = bHtml;
                vars.sectionDatas.Banner.FHtml = fHtml;
                vars.sectionDatas.Banner.Num = length;


                $('#' + vars.sectionShowBases.Sections).html(fHtml);

                var theCacheData = {
                    Banner: vars.sectionDatas.Banner,
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

function RefreshData() {
    GetBannerData();
}