var vars = {
    sectionNames: {
        Normal: 'Neden AEK',
        Upper: 'NedenAEK',
        Lower: 'NedenAEK',
        Kod: 'GNA',
    },
    sectionControllers: {
        Normal: baseurl + 'Neden-AEK/',
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
            Html: '',
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
                $('#' + vars.sectionShowBases.Sections).html(cache.Html);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.NedenAEK;
                vars.sectionDatas.NedenAEK = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.Html);
            } else {
                var html = '',
                    data = result.data,
                    length = data.length;
                var i, curData;

                html += '<div class="container wow ' + AnimationHeader + '" data-wow-delay="' + wowDelay + '">' +
                    '<div class="col-lg-12 page-header paddingL0">' +
                    '<h2 data-basliklar="' + vars.sectionNames.Kod + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>';
                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);
                    vars.sectionDatas.NedenAEK.Data[i] = curData;

                    if (i != 0) {
                        html += '<div class="sectionArasiBosluk"></div>';
                    }

                    html +=
                        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center page-header wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<h2>' + curData.Baslik + '</h2>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<p>' + curData.Yazi + '</p>' +
                        '</div>' +
                        '</div>';
                }
                $('#' + vars.sectionShowBases.Sections).html(html);
                vars.sectionDatas.NedenAEK.Html = html;
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