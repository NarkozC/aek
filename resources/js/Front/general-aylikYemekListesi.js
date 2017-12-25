var vars = {
    sectionNames: {
        Normal: 'Aylık Yemek Listesi',
        Upper: 'AylikYemekListesi',
        Lower: 'aylikYemekListesi',
        Kod: 'GAYL',
    },
    sectionControllers: {
        Normal: baseurl + 'Aylik-Yemek-Listesi/',
    },
    sectionShowBases: {
        Sections: 'showAylikYemekListesi',
        Baslik: 'showGalleryBaslik',
    },
    sectionFunctions: {
        Get: 'GetAylikYemekListesi',
    },
    sectionDatas: {
        AylikYemekListesi: {
            Data: new Array(),
            FData: new Array(),
            Num: 0,
        },

        Okullar: GetOkullarData(),
    },
    sectionIsFirst: true,
};

$(function() {
    RefreshData(1, 1);

    $('.panel-heading .nav-tabs').on('click', 'li', function(e) {
        $('.panel-body .tab-content .tab-pane.active').html('');

        okul = $(this).find('a').attr('href');
        RefreshData(0, 0, 1, okul)
    });
});

function GetAylikYemekListesiData() {
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
                var cache = result.cachedataEN.AylikYemekListesi;
                vars.sectionDatas.AylikYemekListesi = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.AylikYemekListesi;
                vars.sectionDatas.AylikYemekListesi = cache;
            } else {
                var data = result.data,
                    html = new Array(),
                    htmls = {};
                var i, j, okul, length, length2, clength, curData, trInside, trArray;

                for (i = 0, length = vars.sectionDatas.Okullar.length; i < length; i++) {
                    htmls[vars.sectionDatas.Okullar[i].Kod] = '';
                    vars.sectionDatas.AylikYemekListesi.FData[vars.sectionDatas.Okullar[i].Kod] = new Array();
                }

                for (i = 0, length = data.length; i < length; i++) {
                    curData = GetCurData(data[i]);

                    curData.Tarih = curData.Tarih.split('-');
                    curData.Tarih = curData.Tarih[2] + '.' + curData.Tarih[1] + '.' + curData.Tarih[0];

                    okul = curData.Okul.split(',');

                    for (j = 0, length2 = okul.length; j < length2; j++) {
                        trArray = new Array('Tarih', 'Baslik');
                        trInside = GetHtmlTr(curData, trArray);
                        htmls[okul[j]] += '<tr>' + trInside + '</tr>';
                        clength = vars.sectionDatas.AylikYemekListesi.FData[okul[j]].length;
                        vars.sectionDatas.AylikYemekListesi.FData[okul[j]][clength] = curData;
                    }

                }
                vars.sectionDatas.AylikYemekListesi.Data = htmls;
                vars.sectionDatas.AylikYemekListesi.Num = length;

                var theCacheData = {
                    AylikYemekListesi: vars.sectionDatas.AylikYemekListesi,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
            }
        },
        error: function() {
            iziError();
        }
    });
}

//functions
function GetAylikYemekListesiGallery(okul = '#anaokulu') {
    var data = vars.sectionDatas.Okullar,
        length = data.length,
        html = '';
    var i, j, length2;
    for (i = 0; i < length; i++) {
        if (okul == '#' + data[i].ShowID) {
            var okulID = data[i].Kod;
            var curData = vars.sectionDatas.AylikYemekListesi.FData[okulID];
            length2 = curData.length;

            html += '<div id="' + vars.sectionNames.Kod + '" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">';
            for (j = 0; j < length2; j++) {
                html += '<img src="' + imagesDir + curData[j].Resim + '"' +
                    ' data-image="' + imagesDir + curData[j].Resim + '"' +
                    ' data-baslik="B_' + curData[j].Baslik + '">';
            }
            html += '</div>';
            $('#' + data[i].ShowID).html(html);
        }
    }
    GetGAYL();

}


function GetAylikYemekListesiHtml() {
    var html = '',
        data = vars.sectionDatas.Okullar,
        length = data.length;
    var i;

    html += '<section id="' + vars.sectionNames.Lower + '">' +
        '<div class="container">' +
        '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
        '<h2 id="' + vars.sectionShowBases.Baslik + '" class="text-center" data-baslik="B_' + vars.sectionGalleryCode + '">' + vars.sectionNames.Normal + '</h2>' +
        '</div>' +
        '</div>' +
        '<div class="container wow ' + Animation + ' dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    for (i = 0; i < length; i++) {
        if (i == 0) {
            html += '<li class="active"><a href="#' + data[i].ShowID + '" data-toggle="tab">' + data[i].Ad + '</a></li>';
        } else {
            html += '<li><a href="#' + data[i].ShowID + '" data-toggle="tab">' + data[i].Ad + '</a></li>';
        }
    }

    html += '</ul>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="tab-content">';

    for (i = 0; i < length; i++) {
        if (i == 0) {
            html += '<div class="tab-pane fade in active" id="' + data[i].ShowID + '"></div>';
        } else {
            html += '<div class="tab-pane fade" id="' + data[i].ShowID + '"></div>';
        }
    }

    html += '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div><!-- End container -->' +
        '</section>';

    $('#' + vars.sectionShowBases.Sections).html(html);

}

function GetGAYL() {
    var To = '#' + vars.sectionShowBases.Baslik;
    var Baslik;

    UG = jQuery('#' + vars.sectionNames.Kod).unitegallery({
        thumb_fixed_size: false,
        thumb_image_overlay_effect: true,
        thumb_image_overlay_type: "blur",
        slider_scale_mode: "fit",
        gallery_autoplay: false,
        gallery_width: 1400,
        gallery_height: 650,
    });

    $(function() {
        Baslik = UG.getItem(0)['baslik'];
        $(To).html(Baslik);

        UG.on("item_change", function(num, data) { //on item change, get item number and item data
            Baslik = UG.getItem(num)['baslik'];
            $(To).html(Baslik);
        });
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
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
        '</td>';

    return newHtml;
}

function RefreshData(data = 1, html = 0, gallery = 1, okul = '#anaokulu') {
    if (html != 0) {
        GetAylikYemekListesiHtml()
    }
    if (data == 1) {
        GetAylikYemekListesiData()
    }
    if (gallery == 1) {
        GetAylikYemekListesiGallery(okul);
    }
}