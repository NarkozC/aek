$(function() {
    GetAllA4x4();
});

function GetAllA4x4() {
    var vars = {
        sectionControllers: {
            Normal: baseurl + 'A4x4/',
        },
        sectionNames: {
            Normal: 'Anasayfa 4x4',
            Upper: 'A4x4',
            Lower: 'a4x4',
            Kod: 'GA4X4',
        },
        sectionShowBases: {
            Sections: 'showA4x4',
        },
        sectionFunctions: {
            Get: 'GetA4x4',
        },
        sectionDatas: {
            A4x4: {
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
    function GetA4x4Data() {
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
                    var cache = result.cachedataEN.A4x4;
                    vars.sectionDatas.A4x4 = cache;
                    $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
                } else if (!en && result.cachedataTR != "") {
                    var cache = result.cachedataTR.A4x4;
                    vars.sectionDatas.A4x4 = cache;
                    $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
                } else {
                    var data = result.data,
                        length = data.length,
                        bHtml = '',
                        fHtml = '',
                        break_on = 4,
                        oneLeft = 'F',
                        its13 = false,
                        counter = 0;
                    var i, j, rLength, curData, tempCurData, link, trInside, trArray;

                    fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                        '<div class="container-fluid">';

                    if (length == 13) {
                        break_on = 3;
                        its13 = true;
                    } else if (length % 4 == 0) {
                        break_on = 4;
                    } else if (length % 3 == 0) {
                        break_on = 3;
                    } else if (length % 4 == 1) {
                        break_on = 3;
                        oneLeft = 'T4';
                    } else if (length % 2 == 0) {
                        break_on = 2;
                    } else if (length % 3 == 1) {
                        break_on = 4;
                        oneLeft = 'T3';
                    }
                    for (i = 0; i < length; i++) {
                        curData = GetCurData(data[i]);
                        tempCurData = curData.Link.split('/');
                        if (tempCurData.length > 1) {
                            if (en) {
                                link = 'en/' + curData.Link;
                            } else {
                                link = curData.Link;
                            }
                        } else {
                            if (en) {
                                link = baseurl + 'en/' + curData.Link;
                            } else {
                                link = baseurl + curData.Link;
                            }
                        }

                        if (counter % break_on == 1 && break_on == 2 && oneLeft == 'T4' && counter == length - 2) {
                            fHtml += '<div class="row">';
                        } else if (counter % break_on == 0 && break_on == 2 && oneLeft == 'T4') {

                        } else if (counter % break_on == 1 && break_on == 3 && oneLeft == 'T3' && counter == length - 3) {
                            fHtml += '<div class="row">';
                        } else if (counter % break_on == 0 && break_on == 3 && oneLeft == 'T3') {

                        } else if (counter == Number(length - 4) && break_on == 2 && its13 == true) {
                            fHtml += '<div class="row">';
                        } else if (its13 == true && counter == Number(length - 3)) {

                        } else if (counter == Number(length - 2) && break_on == 2 && its13 == true) {
                            fHtml += '<div class="row">';
                        } else if (its13 == true && counter == length - 1) {

                        } else if (counter % break_on == 0) {
                            fHtml += '<div class="row">';
                        }

                        if (break_on == 4) {
                            fHtml += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 text-center marginTop15 wow ' + AnimationText + '" data-wow-delay="' + wowDelay + '">';
                        } else if (break_on == 3) {
                            fHtml += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center marginTop15 wow ' + AnimationText + '" data-wow-delay="' + wowDelay + '">';
                        } else if (break_on == 2) {
                            fHtml += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center marginTop15 wow ' + AnimationText + '" data-wow-delay="' + wowDelay + '">';
                        }

                        fHtml += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow borderRad10 maxH300 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
                            '<a href="' + link + '"><img src="' + imagesDir + curData.Resim + '" class="img-responsive maxH200" style="position: relative;left: 50%;transform: translate(-50%,0);"></a>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                            '<a href="' + link + '"><h4>' + curData.Baslik + '</h4></a>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right">' +
                            '<a href="' + link + '"><button type="button" class="btn btn-danger">' + formLang.DetaylarIcin + '</button></a>' +
                            '</div>' +
                            '</div>' +
                            '</div>';

                        counter++;
                        if (counter % break_on == 0 && break_on == 2 && oneLeft == 'T4') {

                        } else if (counter % break_on == 0 && break_on == 3 && oneLeft == 'T3') {

                        } else if (its13 == true && counter == Number(length - 3)) {

                        } else if (its13 == true && counter == Number(length - 2)) {
                            fHtml += '</div>';
                        } else if (its13 == true && counter == Number(length - 1)) {

                        } else if (counter % break_on == 0) {
                            fHtml += '</div>';
                        }
                        if (break_on == 4 && oneLeft == 'T3' && counter == length - 3) {
                            break_on = 3;
                        } else if (break_on == 3 && oneLeft == 'T4' && counter == length - 2) {
                            break_on = 2;
                        } else if (break_on == 3 && its13 == true && counter == length - 4) {
                            break_on = 2;
                        }

                        vars.sectionDatas.A4x4.Data[i] = curData;

                        trArray = new Array('Baslik');
                        trInside = GetHtmlTr(curData, trArray);
                        bHtml += '<tr>' + trInside + '</tr>';
                    }
                    if (counter % break_on != 0) {
                        fHtml += '</div>';
                    }

                    fHtml += '</div>';

                    vars.sectionDatas.A4x4.BHtml = bHtml;
                    vars.sectionDatas.A4x4.FHtml = fHtml;
                    vars.sectionDatas.A4x4.Num = length;

                    $('#' + vars.sectionShowBases.Sections).html(fHtml);

                    var theCacheData = {
                        A4x4: vars.sectionDatas.A4x4,
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
        GetA4x4Data();
    }
}