    $(function() {
        GetNavbar();
    });

    function GetNavbar() {
        var vars = {
            sectionControllers: {
                Normal: baseurl + 'Genel-Navbar/',
            },
            sectionNames: {
                Normal: 'Navbar',
                Upper: 'Navbar',
                Lower: 'navbar',
            },
            sectionShowBases: {
                Sections: 'showNavbar',
                TheNavbar: 'AekNavbar',
            },
            sectionFunctions: {
                Get: 'GetNavbarFront',
            },
            sectionDatas: {
                NavbarF: {
                    Data: new Array(),
                    FHtml: '',
                    BHtml: '',
                    Num: 0,
                },
            },
        };

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
                    var cache = result.cachedataEN.NavbarF;
                    vars.sectionDatas.NavbarF = cache;
                    vars.sectionDatas.NavbarF.Data = JSON.parse(cache.Data);
                    $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
                } else if (!en && result.cachedataTR != "") {
                    var cache = result.cachedataTR.NavbarF;
                    vars.sectionDatas.NavbarF = cache;
                    vars.sectionDatas.NavbarF.Data = JSON.parse(cache.Data);
                    $('#' + vars.sectionShowBases.Sections).html(cache.FHtml);
                } else {
                    var fhtml = '',
                        bHtml = '',
                        data = result.data,
                        length = data.length;
                    var i, curData, trInside, trArray;


                    for (i = 0; i < length; i++) {
                        curData = GetCurData(data[i]);

                        trArray = new Array('Level', 'Ad');
                        trInside = GetHtmlTr(curData, trArray);
                        bHtml += '<tr>' + trInside + '</tr>';

                        if (curData.IsLink == 1 && curData.IsLinkInBaseurl == 1 && en) {
                            curData.Link = 'en/' + curData.Link;
                        }

                        vars.sectionDatas.NavbarF.Data[i] = curData;
                    }
                    vars.sectionDatas.NavbarF.BHtml = bHtml;
                    vars.sectionDatas.NavbarF.Num = length;
                    data = vars.sectionDatas.NavbarF.Data;

                    var curSearchData = data.filter(function(dataTemp) {
                        return dataTemp.Level == "Main";
                    });
                    for (i = 0, length = curSearchData.length; i < length; i++) {
                        curData = curSearchData[i];
                        if (curData.IsLink == 1) {
                            if (curData.IsLinkInBaseurl == 1) {
                                fhtml += '<li><a class="ajax" href="' + baseurl + curData.Link + '">' + curData.Ad + '</a></li>';
                            } else {
                                fhtml += '<li><a class="ajax" href="' + curData.Link + '">' + curData.Ad + '</a></li>';
                            }
                        } else {
                            fhtml += '<li class="dropdown">' +
                                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + curData.Ad + '<span class="caret"></span></a>' +
                                '<ul id="show' + md5(curData.MainSectionID) + '" class="dropdown-menu" role="menu"></ul>' +
                                '</li>';
                        }
                    }
                    $('#' + vars.sectionShowBases.Sections).html(fhtml);

                    var curSearchData = data.filter(function(dataTemp) {
                        return dataTemp.Level == "Sub";
                    });
                    for (i = 0, length = curSearchData.length; i < length; i++) {
                        fhtml = '';
                        curData = curSearchData[i];
                        if (curData.IsLink == 1) {
                            if (curData.IsLinkInBaseurl == 1) {
                                fhtml += '<li data-toggle="collapse" data-target="#' + vars.sectionShowBases.TheNavbar + '"><a class="ajax" href="' + baseurl + curData.Link + '">' + curData.Ad + '</a></li>';
                            } else {
                                fhtml += '<li data-toggle="collapse" data-target="#' + vars.sectionShowBases.TheNavbar + '"><a class="ajax" href="' + curData.Link + '">' + curData.Ad + '</a></li>';
                            }
                        } else {
                            var theId = md5(curData.MainSectionID + curData.SubSectionID);
                            fhtml += '<li class="dropdown-right-onclick">' +
                                '<a href="javascript:;" data-toggle="collapse" data-target="#' + theId + '" class="dropdown-toggle collapsed"><i class="fa fa-ellipsis-v "></i> ' + curData.Ad + '</a>' +
                                '<ul class="dropdown-menu collapse" id="' + theId + '">' +
                                '<li id="show' + md5(curData.SubSectionID) + '">' +
                                '</li>' +
                                '</ul>' +
                                '</li>';
                        }
                        oldHtml = $('#show' + md5(curData.MainSectionID)).html();
                        $('#show' + md5(curData.MainSectionID)).html(oldHtml + fhtml);
                    }


                    fhtml = '';
                    var curSearchData = data.filter(function(dataTemp) {
                        return dataTemp.Level == "SubSub";
                    });
                    for (i = 0, length = curSearchData.length; i < length; i++) {
                        fhtml = '';
                        curData = curSearchData[i];
                        if (curData.IsLink == 1) {
                            if (curData.IsLinkInBaseurl == 1) {
                                fhtml += '<a data-toggle="collapse" data-target="#' + vars.sectionShowBases.TheNavbar + '" class="ajax" href="' + baseurl + curData.Link + '">' + curData.Ad + '</a>';
                            } else {
                                fhtml += '<a data-toggle="collapse" data-target="#' + vars.sectionShowBases.TheNavbar + '" class="ajax" href="' + curData.Link + '">' + curData.Ad + '</a>';
                            }
                        }
                        oldHtml = $('#show' + md5(curData.MainSectionID)).html();
                        $('#show' + md5(curData.MainSectionID)).html(oldHtml + fhtml);
                    }

                    vars.sectionDatas.NavbarF.FHtml = $('#' + vars.sectionShowBases.Sections).html();

                    if (vars.sectionDatas.NavbarF.Num < cacheLimit) {
                        var myJSON = JSON.stringify(vars.sectionDatas.NavbarF.Data);
                        vars.sectionDatas.NavbarF.Data = myJSON;
                        var theCacheData = {
                            NavbarF: vars.sectionDatas.NavbarF,
                        }
                        setTimeout(Cache('GetNavbarData', url, theCacheData), 1);
                        vars.sectionDatas.NavbarF.Data = JSON.parse(myJSON);
                    }
                }
            },
            error: function() {
                iziError();
            }
        });
    }