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
                    vars.sectionDatas.A4x4.Data = JSON.parse(cache.Data);
                    $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
                } else if (!en && result.cachedataTR != "") {
                    var cache = result.cachedataTR.A4x4;
                    vars.sectionDatas.A4x4 = cache;
                    vars.sectionDatas.A4x4.Data = JSON.parse(cache.Data);
                    $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
                } else {
                    var data = result.data,
                        length = data.length,
                        bHtml = '',
                        fHtml = '';
                    var i, j, rLength, curData, tempCurData, link, trInside, trArray;

                    for (i = 0; i < length; i++) {
                        curData = GetCurData(data[i]);
                        tempCurData = curData.Link.split('/');
                        if (tempCurData.length > 1) {
                            link = curData.Link;
                        } else {
                            if (en) {
                                link = baseurl + 'en/' + curData.Link;
                            } else {
                                link = baseurl + curData.Link;
                            }
                        }
                        curData.Link = link;

                        vars.sectionDatas.A4x4.Data[i] = curData;
                        trArray = new Array('Baslik');
                        trInside = GetHtmlTr(curData, trArray);
                        bHtml += '<tr>' + trInside + '</tr>';
                    }

                    fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                        '<div class="container-fluid">';

                    fHtml += MakeRows(data,
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow borderRad10 maxH300 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
                        '<a href="curData[Link]"><img src="' + imagesDir + 'curData[Resim]" class="img-responsive maxH200" style="position: relative;left: 50%;transform: translate(-50%,0);"></a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12">' +
                        '<a href="curData[Link]"><h4>curData[Baslik]</h4></a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-right">' +
                        '<a href="curData[Link]"><button type="button" class="btn btn-danger">' + formLang.DetaylarIcin + '</button></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );

                    fHtml += '</div>';

                    vars.sectionDatas.A4x4.BHtml = bHtml;
                    vars.sectionDatas.A4x4.FHtml = fHtml;
                    vars.sectionDatas.A4x4.Num = length;

                    $('#' + vars.sectionShowBases.Sections).html(fHtml);

                    if (length < cacheLimit) {
                        var myJSON = JSON.stringify(vars.sectionDatas.A4x4.Data);
                        vars.sectionDatas.A4x4.Data = myJSON;
                        var theCacheData = {
                            A4x4: vars.sectionDatas.A4x4,
                        }
                        setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                        vars.sectionDatas.A4x4.Data = JSON.parse(myJSON);
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

    function RefreshData() {
        GetA4x4Data();
    }
}