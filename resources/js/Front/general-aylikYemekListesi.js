var vars = {
    sectionNameNormal: 'Aylık Yemek Listesi',
    sectionNameLower: 'aylikYemekListesi',
    sectionNameUpper: 'AylikYemekListesi',
    sectionGalleryCode: 'GAYL',
    sectionController: baseurl + 'Aylik-Yemek-Listesi/',
    sectionShowBase: 'showAylikYemekListesi',
    sectionGetFunction: 'GetAylikYemekListesi',
    sectionIsFirst: true,
    aylikYemekListesiData: new Array(),

    sectionDatas: {
        Okullar: GetOkullarData(),
    }
};

$(function() {
    var whereTo = vars.sectionShowBase;
    GetAylikYemekListesiHtml(whereTo)
    GetAylikYemekListesi();

    $('.panel-heading .nav-tabs').on('click', 'li', function(e) {
        $('.panel-body .tab-content .tab-pane.active').html('');

        whereTo = $(this).find('a').attr('href');
        GetAylikYemekListesi(whereTo);
    });

});
//functions
function GetAylikYemekListesi(where = '') {
    if (vars.sectionIsFirst) {
        var url = vars.sectionController + vars.sectionGetFunction;

        $.ajax({
            type: 'ajax',
            method: 'post',
            url: url,
            async: false,
            dataType: 'json',
            success: function(data) {
                var html = '';
                var i;
                var theData = {
                    Baslik: '',
                    Resim: '',
                    Okul: '',
                    Tarih: '',
                }
                var listArrays = {
                    anaokulu: new Array(),
                    ilkokul: new Array(),
                    ortaokul: new Array(),
                    anadoluLisesi: new Array(),
                    tumokul: new Array(),
                };
                var listArraysC = {
                    anaokulu: 0,
                    ilkokul: 0,
                    ortaokul: 0,
                    anadoluLisesi: 0,
                    tumokul: 0,
                };

                html += '<div id="' + vars.sectionGalleryCode + '" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">';

                for (i = 0; i < data.length; i++) {
                    if (en) {
                        if (data[i].en_Baslik == "") {
                            theData.Baslik = data[i].tr_Baslik;
                        } else {
                            theData.Baslik = data[i].en_Baslik;
                        }

                        if (data[i].en_Resim == "") {
                            theData.Resim = data[i].tr_Resim;
                        } else {
                            theData.Resim = data[i].en_Resim;
                        }

                    } else {
                        theData.Baslik = data[i].tr_Baslik;
                        theData.Resim = data[i].tr_Resim;
                    }
                    theData.Tarih = data[i].Tarih;
                    var dateAr = theData.Tarih.split('-');
                    theData.Tarih = dateAr[0] + '.' + dateAr[1];
                    theData.Okul = data[i].Okul.split(',');

                    var curData = {
                        Baslik: theData.Baslik,
                        Resim: theData.Resim,
                        Okul: theData.Okul,
                        Tarih: theData.Tarih,
                    }

                    for (var j = 0; j < curData.Okul.length; j++) {
                        if (curData.Okul[j] == '0') {
                            listArrays['anaokulu'][listArraysC['anaokulu']] = curData;
                            listArraysC['anaokulu']++;

                            html += '<img src="' + baseurl + 'resources/images/' + curData.Resim + '"' +
                                ' data-image="' + baseurl + 'resources/images/' + curData.Resim + '"' +
                                ' data-baslik="' + curData.Baslik + '">';
                        } else if (curData.Okul[j] == '1') {
                            listArrays['ilkokul'][listArraysC['ilkokul']] = curData;
                            listArraysC['ilkokul']++;
                        } else if (curData.Okul[j] == '2') {
                            listArrays['ortaokul'][listArraysC['ortaokul']] = curData;
                            listArraysC['ortaokul']++;
                        } else if (curData.Okul[j] == '3') {
                            listArrays['anadoluLisesi'][listArraysC['anadoluLisesi']] = curData;
                            listArraysC['anadoluLisesi']++;
                        }
                    }

                    listArrays['tumokul'][listArraysC['tumokul']] = curData;
                    listArraysC['tumokul']++;
                }

                vars.aylikYemekListesiData = listArrays;
                html += '</div>';
                $('#anaokulu').html(html);
                vars.sectionIsFirst = false;
            },
            error: function() {
                iziError();
            }

        });

    } else {
        var odata = vars.sectionDatas.Okullar
        for (var i = 0; i < odata.length; i++) {
            if (where == '#' + odata[i].ShowID) {
                var html = '';
                var theID = odata[i].ShowID;
                console.log(theID);
                var data = vars.aylikYemekListesiData[theID];

                html += '<div id="' + vars.sectionGalleryCode + '" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">';
                for (var j = 0; j < data.length; j++) {
                    html += '<img src="' + baseurl + 'resources/images/' + data[j].Resim + '"' +
                        ' data-image="' + baseurl + 'resources/images/' + data[j].Resim + '"' +
                        ' data-baslik="' + data[j].Baslik + '">';
                }

                html += '</div>';
                $('#' + theID).html(html);

            }
        }
    }
    GetGAYL()
}


function GetAylikYemekListesiHtml(sectionBase = '') {
    var html = '';
    var i;
    var isFirstJ = true;

    html += '<section id="' + vars.sectionNameLower + '">' +
        '<div class="container">' +
        '<div class="col-lg-12 page-header wow '+AnimationHeader+' paddingL0" data-wow-delay="' + wowDelay + '">' +
        '<h2 id="showBaslik" class="text-center" data-basliklar="' + vars.sectionGalleryCode + '">' + vars.sectionNameNormal + '</h2>' +
        '</div>' +
        '</div>' +
        '<div class="container wow bounceInUp dark-bg shadow borderRad10" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's">' +
        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    isFirstJ = true;
    var data = vars.sectionDatas.Okullar;
    for (var j = 0; j < data.length; j++) {
        if (isFirstJ) {
            html += '<li class="active"><a href="#' + data[j].ShowID + '" data-toggle="tab">' + data[j].Ad + '</a></li>';
            isFirstJ = false;
        } else {
            html += '<li><a href="#' + data[j].ShowID + '" data-toggle="tab">' + data[j].Ad + '</a></li>';
        }
    }

    html += '</ul>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="tab-content">';

    isFirstJ = true;
    for (var j = 0; j < data.length; j++) {
        if (isFirstJ) {
            html += '<div class="tab-pane fade in active" id="' + data[j].ShowID + '"></div>';
            isFirstJ = false;
        } else {
            html += '<div class="tab-pane fade" id="' + data[j].ShowID + '"></div>';
        }
    }

    html += '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div><!-- End container -->' +
        '</section>';

    $('#' + sectionBase).html(html);

}

function GetGAYL() {
    var Baslik;
    var To = '#showBaslik';
    UG = jQuery('#' + vars.sectionGalleryCode).unitegallery({
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