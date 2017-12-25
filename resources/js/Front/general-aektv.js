var vars = {
    sectionControllers: {
        Normal: baseurl + 'Aektv/',
    },
    sectionNames: {
        Normal: 'Ankara Eğitim Kurumları Tanıtım Videosu',
        Upper: 'Aektv',
        Lower: 'aektv',
        Kod: 'GAEKTV',
    },
    sectionShowBases: {
        Sections: 'showAektv',
    },
    sectionFunctions: {
        Get: 'GetAektv',
    },
    sectionDatas: {
        Aektv: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },
    },
};


$(function() {
    RefreshData();
});

//functions
function GetAektvData() {
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
                var cache = result.cachedataEN.Aektv;
                vars.sectionDatas.Aektv = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Aektv;
                vars.sectionDatas.Aektv = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
            } else {
                var data = result.data,
                    length = data.length,
                    bHtml = '',
                    fHtml = '';
                var i, curData, trInside, trArray;

                fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>' +

                    '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);
                    vars.sectionDatas.Aektv.Data[i] = curData;

                    fHtml += '<div class="video-container"><iframe width="600" height="355" '+
                    'src="'+curData.Link+'" frameborder="0" allowfullscreen></iframe></div>';

                    trArray = new Array('Link');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';
                }

                fHtml += '</div>' +
                    '</div>' +
                    '</section>';

                vars.sectionDatas.Aektv.BHtml = bHtml;
                vars.sectionDatas.Aektv.FHtml = fHtml;
                vars.sectionDatas.Aektv.Num = length;


                $('#' + vars.sectionShowBases.Sections).html(fHtml);

                var theCacheData = {
                    Aektv: vars.sectionDatas.Aektv,
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

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
    }

    newHtml +=
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>';

    return newHtml;
}

function RefreshData() {
    GetAektvData();
}