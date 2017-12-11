var vars = {
    sectionNames: {
        Normal: 'Kurucu Mesajı',
        Upper: 'KurucuMesaji',
        Lower: 'kurucuMesaji',
        Kod: 'GKM',
    },
    sectionControllers: {
        Normal: baseurl + 'Kurucu-Mesaji/',
    },
    sectionShowBases: {
        Sections: 'showKurucuMesaji',
    },
    sectionFunctions: {
        Get: 'GetKurucuMesaji',
    },

    sectionDatas: {
        KurucuMesaji: {
            Data: new Array(),
            FData: new Array(),
            Num: 0,
        },
    },
};

$(function() {
    GetKurucuMesaji();
});

//functions
function GetKurucuMesaji() {
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
                var cache = result.cachedataEN.KurucuMesaji;
                vars.sectionDatas.KurucuMesaji = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FData);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.KurucuMesaji;
                vars.sectionDatas.KurucuMesaji = cache;
                $('#' + vars.sectionShowBases.Sections).html(cache.FData);
            } else {
                var html = '',
                    data = result.data,
                    length = data.length;
                var i, curData;

                html += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-basliklar="' + vars.sectionNames.Kod + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    if (i != 0) {
                        html += '<div class="sectionArasiBosluk"></div>';
                    }

                    html +=
                        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center page-header wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<h2>' + curData.Baslik + '</h2>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's">' +
                        '<p>' + curData.Yazi + '</p>' +
                        '</div>' +
                        '</div>';
                }
                html += '</section>';
                $('#' + vars.sectionShowBases.Sections).html(html);

                vars.sectionDatas.KurucuMesaji.Data = data;
                vars.sectionDatas.KurucuMesaji.FData = html;
                vars.sectionDatas.KurucuMesaji.Num = length;
                var theCacheData = {
                    KurucuMesaji: vars.sectionDatas.KurucuMesaji,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
            }
        },
        error: function() {
            iziError();
        }
    });
}