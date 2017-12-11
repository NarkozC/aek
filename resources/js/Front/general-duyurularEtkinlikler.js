$(function() {
    AllDuyurularEtkinlikler();
});
function AllDuyurularEtkinlikler() {
    var vars = {
        sectionControllers: {
            Normal: baseurl + 'Duyurular-Etkinlikler/',
        },
        sectionNames: {
            Normal: 'Duyurular Etkinlikler',
            Upper: 'Duyurular-Etkinlikler',
            Lower: 'duyurularEtkinlikler',
            Kod: 'GDE',
            UpperSingle: 'DuyuruEtkinlik',
            LowerSingle: 'haber',
            LowerA: 'duyurularEtkinliklerA',
        },
        sectionShowBases: {
            Sections: 'showDuyurularEtkinlikler',
            SectionsSingle: 'showDuyuruEtkinlik',
            SectionsData: 'load_data',
            SectionsDataMessage: 'load_data_message',
            Num: 'showNum',
            SectionsA: 'showDuyurularEtkinliklerA',
        },
        sectionFunctions: {
            Get: 'GetDuyurularEtkinlikler',
        },
        sectionDatas: {
            DuyurularEtkinlikler: {
                Data: new Array(),
                FData: new Array(),
                FHtml: new Array(),
                Num: 0,
            },

            ScrollLoader: {
                Active: true,
                Start: 0,
                Limit: 7,
                Check: false,
            },

            Okullar: GetOkullarData(),
        },
        sectionIsFirst: true,
    };


    $(function() {
        GetDuyurularEtkinliklerData()

        if (cfunction == "DuyuruEtkinlik") {
            if (cparam1 != undefined) {
                GetDuyuruEtkinlik();
            } else {
                window.location.replace(baseurl + page);
            }
        } else {
            if (page == "" || page == "Anasayfa") {
                GetDuyurularEtkinliklerA();
            } else {
                GetDuyurularEtkinliklerHtml();
            }
        }

    });

    //functions
    function GetDuyurularEtkinliklerData() {
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
                    var cache = result.cachedataEN.DuyurularEtkinlikler;
                    vars.sectionDatas.DuyurularEtkinlikler = cache;
                } else if (!en && result.cachedataTR != "") {
                    var cache = result.cachedataTR.DuyurularEtkinlikler;
                    vars.sectionDatas.DuyurularEtkinlikler = cache;
                } else {
                    var i, j, data = result.data,
                        length, length2, htmls = {},
                        fHtml = new Array(),
                        fData = new Array();
                    var curData, trInside, trArray;

                    for (i = 0, length = vars.sectionDatas.Okullar.length; i < length; i++) {
                        htmls[vars.sectionDatas.Okullar[i].Kod] = '';
                    }

                    for (i = 0, length = data.length; i < length; i++) {
                        curData = GetCurData(data[i]);

                        okul = curData.Okul.split(',');

                        for (j = 0, length2 = okul.length; j < length2; j++) {
                            var okulTemp = vars.sectionDatas.Okullar.filter(function(curOkul) {
                                return curOkul.Kod == okul[j];
                            });

                            trArray = new Array('ozel-Tarih', 'Baslik');
                            trInside = GetHtmlTr(curData, trArray);
                            htmls[okul[j]] += '<tr>' + trInside + '</tr>';
                        }

                        if (en) {
                            if (page != '') {
                                curData.Link = baseurl + 'en/' + page + '/' + vars.sectionNames.UpperSingle + '/' + curData.SectionID;
                            } else {
                                curData.Link = baseurl + 'en/' + vars.sectionNames.Upper + '/' + vars.sectionNames.UpperSingle + '/' + curData.SectionID;
                            }
                        } else {
                            if (page != '') {
                                curData.Link = baseurl + page + '/' + vars.sectionNames.UpperSingle + '/' + curData.SectionID;
                            } else {
                                curData.Link = baseurl + 'en/' + vars.sectionNames.Upper + '/' + vars.sectionNames.UpperSingle + '/' + curData.SectionID;
                            }
                        }
                        var dateAr = curData.Tarih.split('-');
                        curData.Tarih = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
                        fData[i] = curData;

                        fHtml[i] =
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow borderRad25 marginB35 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                            '<div class="row hidden-md hidden-sm hidden-xs marginTop20 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's"> <!-- hidden-xs-sm-md -->' +
                            '<div class="col-lg-4">' +
                            '<a href="' + curData.Link + '"><img alt="' + curData.Baslik + '" class="img-responsive img-center w400 hvr-bob" style="max-height:300px;" src="' + imagesDir + curData.AnaResim + '"></a>' +
                            '</div>' +
                            '<div class="col-lg-8">' +
                            '<h3><a href="' + curData.Link + '">' + curData.Baslik + ' <span class="fSize65per">(' + curData.Tarih + ')</span></a></h3>' +
                            '<p class="shorten_content8">' + curData.Yazi + '</p>' +
                            '<br>' +
                            '</div>' +
                            '<a href="' + curData.Link + '" class="btn btn-sm btn-danger borderRad10" style="position:absolute;bottom:20px;right:20px">' + formLang.ReadMore + '</a>' +
                            '</div>' +
                            '<div class="row visible-md visible-sm visible-xs marginTop20 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's"> <!-- visible-xs-sm-md -->' +
                            '<div class="col-xs-12 col-sm-12 col-md-12">' +
                            '<h3 class="text-center"><a href="' + curData.Link + '">' + curData.Baslik + ' <span class="fSize65per">(' + curData.Tarih + ')</span></a></h3>' +
                            '<a href="' + curData.Link + '"><img alt="' + curData.Baslik + '" class="img-responsive img-center w400 hvr-bob" style="max-height:300px;" src="' + imagesDir + curData.AnaResim + '"></a>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 marginTop10">' +
                            '<p class="shorten_content8">' + curData.Yazi + '</p>' +
                            '<br><a href="' + curData.Link + '" style="position:absolute;bottom:0;"><span class="btn btn-sm btn-danger pull-right marginR15 borderRad10">' + formLang.ReadMore + '</span></a>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    }

                    vars.sectionDatas.DuyurularEtkinlikler.FHtml = fHtml;
                    vars.sectionDatas.DuyurularEtkinlikler.FData = fData;
                    vars.sectionDatas.DuyurularEtkinlikler.Data = htmls;
                    vars.sectionDatas.DuyurularEtkinlikler.Num = length;

                    var theCacheData = {
                        DuyurularEtkinlikler: vars.sectionDatas.DuyurularEtkinlikler,
                    }
                    setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                }
            },
            error: function() {
                iziError();
            }
        });
    }

    function GetDuyurularEtkinliklerHtml() {
        var html = '',
            fHtml = '',
            isUndefined = false;
        var i, j, length;
        if (vars.sectionIsFirst) {
            vars.sectionIsFirst = false;

            html += '<section id="' + vars.sectionNames.Lower + '">' +
                '<div class="container">' +
                '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                '<h2 data-basliklar="' + vars.sectionNames.Kod + '">' + vars.sectionNames.Normal + '</h2>' +
                '</div>';

            html += '<div id="' + vars.sectionShowBases.SectionsData + '"></div>' +
                '<div id="' + vars.sectionShowBases.SectionsDataMessage + '"></div>';

            html += '</div><!-- End container --></section>';

            $('#' + vars.sectionShowBases.Sections).html(html);

            setTimeout(function() {
                length = vars.sectionDatas.ScrollLoader.Limit + vars.sectionDatas.ScrollLoader.Start;

                for (i = vars.sectionDatas.ScrollLoader.Start; i < length; i++) {
                    if (vars.sectionDatas.DuyurularEtkinlikler.FHtml[i] != undefined) {
                        fHtml += vars.sectionDatas.DuyurularEtkinlikler.FHtml[i];
                    } else {
                        isUndefined = true;
                        vars.sectionDatas.ScrollLoader.Active = false;
                        break;
                    }
                }
                vars.sectionDatas.ScrollLoader.Start += vars.sectionDatas.ScrollLoader.Limit;
                if (vars.sectionDatas.ScrollLoader.Start > vars.sectionDatas.DuyurularEtkinlikler.Num) {
                    vars.sectionDatas.ScrollLoader.Start = vars.sectionDatas.DuyurularEtkinlikler.Num;
                }

                $('#' + vars.sectionShowBases.SectionsData).append(fHtml);
                if (isUndefined) {
                    $('#' + vars.sectionShowBases.SectionsDataMessage).remove()
                } else {
                    $('#' + vars.sectionShowBases.SectionsDataMessage).html(loaderGifImg);
                }

                $(window).scroll(function() {
                    if (!vars.sectionDatas.ScrollLoader.Check) {
                        if ($(window).scrollTop() + $(window).height() > $('#' + vars.sectionShowBases.SectionsDataMessage).height()) {
                            vars.sectionDatas.ScrollLoader.Check = true;
                            setTimeout(function() {
                                GetDuyurularEtkinliklerHtml();
                            }, 100);
                        }
                    }
                });
            }, 10);
        } else if (vars.sectionDatas.ScrollLoader.Active) {
            length = vars.sectionDatas.ScrollLoader.Limit + vars.sectionDatas.ScrollLoader.Start;

            for (j = vars.sectionDatas.ScrollLoader.Start; j < length; j++) {
                if (vars.sectionDatas.DuyurularEtkinlikler.FHtml[j] != undefined) {
                    fHtml += vars.sectionDatas.DuyurularEtkinlikler.FHtml[j];
                } else {
                    isUndefined = true;
                    vars.sectionDatas.ScrollLoader.Active = false;
                    break;
                }
            }
            vars.sectionDatas.ScrollLoader.Start += vars.sectionDatas.ScrollLoader.Limit;
            if (vars.sectionDatas.ScrollLoader.Start > vars.sectionDatas.DuyurularEtkinlikler.Num) {
                vars.sectionDatas.ScrollLoader.Start = vars.sectionDatas.DuyurularEtkinlikler.Num;
            }

            setTimeout(function() {
                $('#' + vars.sectionShowBases.SectionsData).append(fHtml);
                if (isUndefined) {
                    $('#' + vars.sectionShowBases.SectionsDataMessage).html('');
                } else {
                    vars.sectionDatas.ScrollLoader.Active = true;
                    $('#' + vars.sectionShowBases.SectionsDataMessage).html(loaderGifImg);
                }
                vars.sectionDatas.ScrollLoader.Check = false;
            }, 10);
        }

    }

    function GetDuyuruEtkinlik() {
        var data = vars.sectionDatas.DuyurularEtkinlikler.FData,
            html = '',
            DigerResimlerHtml = '';
        var curData = data.filter(function(haber) {
            return haber.SectionID == cparam1;
        });
        curData = curData[0];

        document.title = curData.Baslik + " | AEK";

        var digerResimlerArray = curData.DigerResimler.split(',');

        DigerResimlerHtml += '<img src="' + imagesDir + curData.AnaResim + '">';
        for (var i = 0; i < digerResimlerArray.length; i++) {
            DigerResimlerHtml = DigerResimlerHtml + '<img src="' + imagesDir + digerResimlerArray[i] + '">';
        }


        html += '<section id="' + vars.sectionNames.LowerSingle + '">' +
            '<div class="container">' +
            '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
            '<h2>' + curData.Baslik + ' <span class="fSize65per">(' + curData.Tarih + ')</span></h2>' +
            '</div>' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
            '<div id="' + vars.sectionNames.Kod + '" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">' +
            DigerResimlerHtml +
            '</div>' +
            '</div>' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
            '<p>' + curData.Yazi + '</p>' +
            '</div>' +
            '</div>' +
            '</section>';

        $('#' + vars.sectionShowBases.SectionsSingle).html(html);

        setTimeout(function() {
            GetGH()
        }, 10);
    }

    function GetGH() {
        var UG = jQuery("#" + vars.sectionNames.Kod).unitegallery({
            thumb_fixed_size: false,
            thumb_image_overlay_effect: true,
            thumb_image_overlay_type: "blur",
            slider_scale_mode: "fit",
            gallery_autoplay: true,
            gallery_width: 1400,
            gallery_height: 650,
        });
    }

    function GetDuyurularEtkinliklerA() {
        var data = vars.sectionDatas.DuyurularEtkinlikler.FData,
            html = '';
        var i, curData;

        html += '<section id="' + vars.sectionNames.LowerA + '">' +
            '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 marginTop15 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow borderRad10 paddingLR5">' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<a href="' + vars.sectionControllers.Normal + '"><h3 data-basliklar="' + vars.sectionNames.Kod + '" class="page-header">' + vars.sectionNames.Normal + '</h3></a>' +
            '</div>';

        for (i = 0; i <= 2; i++) {
            curData = data[i];
            html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 paddingTB5 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                '<div class="col-lg-4 visible-lg padding0">' +
                '<a href="' + curData.Link + '"><img src="' + imagesDir + curData.AnaResim + '" style="max-height:70px;max-width:170px;" class="img-responsive" alt="' + curData.Baslik + '"></a>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-12 col-md-12 hidden-lg padding0">' +
                '<a href="' + curData.Link + '"><img src="' + imagesDir + curData.AnaResim + '" class="img-responsive img-center" style="max-height:80px;max-width:200px;" alt="' + curData.Baslik + '"></a>' +
                '</div>' +
                '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-8 text-center paddingR0">' +
                '<h4 class="fSize16"><a href="' + curData.Link + '"><span class="shorten_content9">' + curData.Baslik + '</span><br><span class="fSize85per">(' + curData.Tarih + ')</span></a></h4>' +
                '</div>' +
                '</div>';

        }
        html += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
            '<div class="page-header"></div>' +
            '<a href="' + vars.sectionControllers.Normal + '"><button type="button" class="btn btn-danger btn-md">' + formLang.Tum + ' <span data-basliklar="' + vars.sectionNames.Kod + '">' + vars.sectionNames.Normal + '</span></button></a>' +
            '</div>' +
            '</div>' +
            '</div>' +
            '</section>';

        $('#' + vars.sectionShowBases.SectionsA).html(html);
    }

    function GetHtmlTr(data, trArray) {
        var i;
        var newHtml = '';
        var length = trArray.length;
        var no = data.No;

        for (i = 0; i < length; i++) {
            var trArrayTemp = trArray[i].split('-');
            if (trArrayTemp[0] == "ozel" && trArrayTemp[1] == "Tarih") {
                var tarih = data.Tarih.split('-');
                tarih = tarih[2] + '.' + tarih[1] + '.' + tarih[0];

                newHtml += '<td class="shorten_content6">' + tarih + '</td>';
            } else {
                newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
            }
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
}