$(function() {
    GetAllFooter();
});

function GetAllFooter() {
    var vars = {
        sectionControllers: {
            Normal: baseurl + 'Footer/',
        },
        sectionNames: {
            Normal: 'Footer',
            Upper: 'Footer',
            Lower: 'footer',
            Kod: 'GF',
        },
        sectionShowBases: {
            Sections: 'showFooter',
        },
        sectionFunctions: {
            Get: 'GetFooter',
        },
        sectionDatas: {
            Footer: {
                Data: {},
                FHtml: '',
                BHtml: '',
            },
        },
    };

    $(function() {
        //Refresh Page
        GetFooterData();
    });

    function GetFooterData() {
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
                console.log(result)
                if (en && result.cachedataEN != "") {
                    var cache = result.cachedataEN.Footer;
                    vars.sectionDatas.Footer = cache;
                    $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
                } else if (!en && result.cachedataTR != "") {
                    var cache = result.cachedataTR.Footer;
                    vars.sectionDatas.Footer = cache;
                    $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
                } else {
                    var fhtml = '',
                        bHtml = '',
                        data = result.data,
                        intYear = new Date(),
                        intYear = intYear.getFullYear();
                    var i, curData, trInside, trArray;

                    curData = GetCurData(data);

                    trArray = new Array('Facebook', 'Twitter', 'Instagram');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    vars.sectionDatas.Footer.Data = curData;

                    fhtml += '<section id="' + vars.sectionNames.Lower + '" class="wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                        '<div class="container-fluid dark-bg shadow wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header">' +
                        '<ul class="social">' +
                        '<li class="facebook"><a href="' + curData.Facebook + '"><i class="fa fa-facebook fa-2x"></i></a></li>' +
                        '<li class="twitter"><a href="' + curData.Twitter + '"><i class="fa fa-twitter fa-2x"></i></a></li>' +
                        '<li class="youtube"><a href="' + curData.Youtube + '"><i class="fa fa-youtube fa-2x"></i></a></li>' +
                        '<li class="instagram"><a href="' + curData.Instagram + '"><i class="fa fa-instagram fa-2x"></i></a></li>' +
                        '</ul>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
                        '<p class="co">Copyright © ' + intYear + ' AEK. ' +
                        '<i class="fa fa-lg fa-paint-brush" aria-hidden="true"></i> ' +
                        '<i class="fa fa-lg fa-code" aria-hidden="true"></i> ' +
                        'by <b class="hvr-wobble-skew">Doğucan Şaşıoğlu</b></p>' +
                        '</div>' +
                        '</div>' +
                        '</section>';

                    vars.sectionDatas.Footer.FHtml = fhtml;
                    vars.sectionDatas.Footer.BHtml = bHtml;

                    $('#' + vars.sectionShowBases.Sections).html(fhtml);
                    var theCacheData = {
                        Footer: vars.sectionDatas.Footer,
                    }
                    setTimeout(Cache('GetFooterData', url, theCacheData), 1);
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

}