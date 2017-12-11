    var nVars = {
        sectionControllers: {
            Normal: baseurl + 'Portal/Admin/Navbar/',
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
            Get: 'GetNavbarBack',
        },
        sectionDatas: {
            Navbar: {
                Data: new Array(),
                FData: new Array(),
                Num: 0,
            },
        },
    };

    $(function() {
        GetNavbar();
    });

    function GetNavbar() {
        var url = nVars.sectionControllers.Normal + nVars.sectionFunctions.Get;
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
                    var cache = result.cachedataEN.Navbar;
                    nVars.sectionDatas.Navbar = cache;
                    $('#' + nVars.sectionShowBases.Sections).html(cache.FData);
                } else if (!en && result.cachedataTR != "") {
                    var cache = result.cachedataTR.Navbar;
                    nVars.sectionDatas.Navbar = cache;
                    $('#' + nVars.sectionShowBases.Sections).html(cache.FData);
                } else {
                    var i, curData, oldHtml;
                    var data = result.data,
                        length = data.length,
                        html = '';

                    for (i = 0; i < length; i++) {
                        curData = GetCurData(data[i]);
                        if (curData.IsLink == 1 && en) {
                            curData.Link = 'en/' + curData.Link;
                        }
                        data[i] = curData;
                    }
                    nVars.sectionDatas.Navbar.Data = data;
                    nVars.sectionDatas.Navbar.Num = length;

                    var curSearchData = data.filter(function(dataTemp) {
                        return dataTemp.Level == "Main";
                    });
                    for (i = 0, length = curSearchData.length; i < length; i++) {
                        curData = curSearchData[i];
                        if (curData.IsLink == 1) {
                            if (curData.IsLinkInBaseurl == 1) {
                                html += '<li><a class="ajax" href="' + baseurl + curData.Link + '">' + curData.Ad + '</a></li>';
                            } else {
                                html += '<li><a class="ajax" href="' + curData.Link + '">' + curData.Ad + '</a></li>';
                            }
                        } else {
                            html += '<li class="dropdown">' +
                                '<a href="#" class="dropdown-toggle" data-toggle="dropdown">' + curData.Ad + '<span class="caret"></span></a>' +
                                '<ul id="show' + md5(curData.MainSectionID) + '" class="dropdown-menu" role="menu"></ul>' +
                                '</li>';
                        }
                    }
                    $('#' + nVars.sectionShowBases.Sections).html(html);


                    
                    var curSearchData = data.filter(function(dataTemp) {
                        return dataTemp.Level == "Sub";
                    });
                    for (i = 0, length = curSearchData.length; i < length; i++) {
                        html = '';
                        curData = curSearchData[i];
                        if (curData.IsLink == 1) {
                            if (curData.IsLinkInBaseurl == 1) {
                                html += '<li data-toggle="collapse" data-target="#' + nVars.sectionShowBases.TheNavbar + '"><a class="ajax" href="' + baseurl + curData.Link + '">' + curData.Ad + '</a></li>';
                            } else {
                                html += '<li data-toggle="collapse" data-target="#' + nVars.sectionShowBases.TheNavbar + '"><a class="ajax" href="' + curData.Link + '">' + curData.Ad + '</a></li>';
                            }
                        } else {
                            var theId = md5(curData.MainSectionID + curData.SubSectionID);
                            html += '<li class="dropdown-right-onclick">' +
                                '<a href="javascript:;" data-toggle="collapse" data-target="#' + theId + '" class="dropdown-toggle collapsed"><i class="fa fa-ellipsis-v "></i> ' + curData.Ad + '</a>' +
                                '<ul class="dropdown-menu collapse" id="' + theId + '">' +
                                '<li id="show' + md5(curData.SubSectionID) + '">' +
                                '</li>' +
                                '</ul>' +
                                '</li>';
                        }
                        oldHtml = $('#show' + md5(curData.MainSectionID)).html();
                        $('#show' + md5(curData.MainSectionID)).html(oldHtml+html);
                    }


                    html = '';
                    var curSearchData = data.filter(function(dataTemp) {
                        return dataTemp.Level == "SubSub";
                    });
                    for (i = 0, length = curSearchData.length; i < length; i++) {
                        html = '';
                        curData = curSearchData[i];
                        if (curData.IsLink == 1) {
                            if (curData.IsLinkInBaseurl == 1) {
                                html += '<a data-toggle="collapse" data-target="#' + nVars.sectionShowBases.TheNavbar + '" class="ajax" href="' + baseurl + curData.Link + '">' + curData.Ad + '</a>';
                            } else {
                                html += '<a data-toggle="collapse" data-target="#' + nVars.sectionShowBases.TheNavbar + '" class="ajax" href="' + curData.Link + '">' + curData.Ad + '</a>';
                            }
                        }
                        oldHtml = $('#show' + md5(curData.MainSectionID)).html();
                        $('#show' + md5(curData.MainSectionID)).html(oldHtml+html);
                    }

                    nVars.sectionDatas.Navbar.FData = $('#' + nVars.sectionShowBases.Sections).html();

                    var theCacheData = {
                        Navbar: nVars.sectionDatas.Navbar,
                    }
                    setTimeout(Cache('GetNavbar', url, theCacheData), 1);
                }
            },
            error: function() {
                iziError();
            }
        });
    }