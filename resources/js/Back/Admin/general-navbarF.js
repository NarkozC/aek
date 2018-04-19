var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Genel-Navbar/',
        Portal: baseurl + 'Portal/Admin/Navbar_F/',
    },
    sectionNames: {
        Normal: 'Navbar',
        Upper: 'NavbarF',
        Lower: 'navbarF',
        Kod: 'GNF',
    },
    sectionShowBases: {
        Sections: 'showNavbarF',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetNavbarFront',
        Add: 'AddNavbarF',
        Update: 'UpdateNavbarF',
        Edit: 'EditNavbarF',
        Delete: 'DeleteNavbarF',
        Up: 'UpNavbarF',
        Down: 'DownNavbarF',
    },
    sectionButtons: {
        OpenModal: 'NavbarFOpenModal',
        Submit: 'NavbarFSubmit',
    },
    sectionDatas: {
        NavbarF: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },
    },
    sectionSPs: {
        Level: 'Level',
        MainSectionID: 'MainSectionID',
    },
    sectionIsFirst: true,
};

$(function() {

    //Refresh Page
    RefreshData(1, 1, 1);

    $('#' + vars.sectionShowBases.Sections).on('change', '#IsLink', function(e) {
        var ischecked = $(this).is(':checked');
        if (!ischecked) {
            $(this).prop('value', 'IsLink-0')
            $('#Link').parents('.ajax-group').hide()
            $('#IsLinkInBaseurl').parents('.ajax-group').hide()
        } else {
            $(this).prop('value', 'IsLink-1')
            $('#Link').parents('.ajax-group').show()
            $('#IsLinkInBaseurl').parents('.ajax-group').show()
        }
    });

    $('#' + vars.sectionShowBases.Sections).on('change', '#IsLinkInBaseurl', function(e) {
        var ischecked = $(this).is(':checked');
        if (!ischecked) {
            $(this).prop('value', 'IsLinkInBaseurl-0')
        } else {
            $(this).prop('value', 'IsLinkInBaseurl-1')
        }
    });

    $('#' + vars.sectionShowBases.Sections).on('change', '#' + vars.sectionSPs.Level, function(e) {
        var valueSelected = $('#' + vars.sectionSPs.Level + 'Select').selectpicker('val')

        if (valueSelected == 'Sub' || valueSelected == 'SubSub') {
            GetMainSectionIdsSelect(valueSelected);
        } else {
            GetMainSectionIdsSelect('Main');
        }
    });


    //Button that opens add/update modal
    FunOpenModal(vars.sectionShowBases.Sections, vars.sectionButtons.OpenModal,
        vars.sectionControllers.Portal + vars.sectionFunctions.Add,
        vars.sectionObjects.Form, vars.sectionObjects.Modal);



    //Button for posting data for add/update
    $('#' + vars.sectionShowBases.Sections).on('click', '#' + vars.sectionButtons.Submit, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var url = vars.sectionObjects.Form.attr('action');
            var data = vars.sectionObjects.Form.serializeArray();
            data.push({
                name: 'English',
                value: String(en)
            });
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: url,
                data: data,
                async: false,
                dataType: 'json',
                success: function(response) {
                    ResetFormErrors();
                    if (response.success) {
                        ResetSelectpicker();
                        var trArray;
                        var willRefresh = false;

                        if (response.type == 'add') {
                            willRefresh = true;
                        } else {
                            var no = response.data.No;
                            var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');
                            var curData = GetCurData(response.data);

                            trArray = new Array('Level', 'Ad');
                            var trInside = GetHtmlTr(curData, trArray);
                            editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                editBtn.parents('tr:first').html(trInside);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                        }
                        $(vars.sectionObjects.Modal).modal('hide');
                        iziSuccess();
                        if (willRefresh) {
                            setTimeout(function() {
                                RefreshData(1, 1, 1)
                            }, 310);
                        }
                    } else {
                        var ajaxGroup;
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            RefreshData(1, 1, 1)

                            $(vars.sectionObjects.Modal).modal('hide');
                            iziError();
                        }
                    }
                },
                error: function() {
                    RefreshData(1, 1, 1)
                    $(vars.sectionObjects.Modal).modal('hide');
                    iziError();
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

    //Button for editing
    $('#' + vars.sectionShowBases.Sections).on('click', '.' + tableOpts.ButtonEdit, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var no = $(this).attr('data');
            $(vars.sectionObjects.Form).attr('action', vars.sectionControllers.Portal + vars.sectionFunctions.Update);
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: vars.sectionControllers.Portal + vars.sectionFunctions.Edit,
                data: {
                    No: no
                },
                async: false,
                dataType: 'json',
                success: function(result) {
                    setTimeout(function() {
                        ResetForm(vars.sectionObjects.Form);
                        if (result.success) {
                            $('input[name=No]').val(result.data.No);
                            $('#tr_Ad').val(result.data.tr_Ad);
                            $('#en_Ad').val(result.data.en_Ad);
                            $('#' + vars.sectionSPs.Level + 'Select').selectpicker('val', result.data.Level);
                            if (result.data.IsLink == 1) {
                                $('#IsLink').prop('checked', true)
                                $('#Link').val(result.data.Link);

                                if (result.data.IsLinkInBaseurl == 1) {
                                    $('#IsLinkInBaseurl').prop('checked', true)
                                }
                            } else {
                                $('#IsLink').prop('checked', false)
                            }
                            $('#IsLink').trigger("change");
                            $('#IsLinkInBaseurl').trigger("change");
                            $('#' + vars.sectionSPs.Level + 'Select').trigger("change");
                            $('#' + vars.sectionSPs.MainSectionID + 'Select').selectpicker('val', result.data.MainSectionID);


                            $(vars.sectionObjects.Modal).modal('show');
                        } else {
                            RefreshData(1, 1, 1)
                            iziError();
                        }
                    }, 15);
                },
                error: function() {
                    RefreshData(1, 1, 1)
                    iziError();
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

    //Button for deleting
    FunDelete(vars.sectionShowBases.Sections, tableOpts.ButtonDelete,
        vars.sectionControllers.Portal + vars.sectionFunctions.Delete,
        RefreshData, "1, 1, 1");

    //Button for moving record up
    $('#' + vars.sectionShowBases.Sections).on('click', '.' + tableOpts.ButtonUp, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var No = $(this).attr('data');
            var ListOrder = $(this).attr('data2');
            var url = vars.sectionControllers.Portal + vars.sectionFunctions.Up;
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: url,
                data: {
                    No: No,
                    ListOrder: ListOrder
                },
                async: false,
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        iziSuccess();
                        TargetListOrder = Number(ListOrder) - 1;
                        var upbtn = $('tr .item-up[data2=' + ListOrder + ']')
                        var downbtn = $('tr .item-down[data2=' + ListOrder + ']')
                        var tr = upbtn.parents('tr:first');
                        if ($('tr .item-up[data2=' + TargetListOrder + ']').length) {
                            var targetupbtn = $('tr .item-up[data2=' + TargetListOrder + ']')
                            var targetdownbtn = $('tr .item-down[data2=' + TargetListOrder + ']')
                            var targettr = targetupbtn.parents('tr:first');
                            targettr.css('background-color', '#ccc').fadeOut('normal', function() {
                                targetupbtn.attr('data2', ListOrder);
                                targetdownbtn.attr('data2', ListOrder);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                            tr.css('background-color', '#ccc').fadeOut('normal', function() {
                                upbtn.attr('data2', TargetListOrder);
                                downbtn.attr('data2', TargetListOrder);
                                $(tr).after(targettr);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                        } else {
                            setTimeout(function() {
                                RefreshData(1, 1, 1)
                            }, 10)
                        }
                    } else {
                        iziError();
                        setTimeout(function() {
                            RefreshData(1, 1, 1)
                        }, 10)
                    }

                },
                error: function() {
                    iziError();
                    setTimeout(function() {
                        RefreshData(1, 1, 1)
                    }, 10)
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });


    //Button for moving record down
    $('#' + vars.sectionShowBases.Sections).on('click', '.' + tableOpts.ButtonDown, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var No = $(this).attr('data');
            var ListOrder = $(this).attr('data2');
            var url = vars.sectionControllers.Portal + vars.sectionFunctions.Down;
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: url,
                data: {
                    No: No,
                    ListOrder: ListOrder
                },
                async: false,
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        iziSuccess()
                        TargetListOrder = Number(ListOrder) + 1;
                        var upbtn = $('tr .item-up[data2=' + ListOrder + ']')
                        var downbtn = $('tr .item-down[data2=' + ListOrder + ']')
                        var tr = upbtn.parents('tr:first');
                        if ($('tr .item-up[data2=' + TargetListOrder + ']').length) {
                            var targetupbtn = $('tr .item-up[data2=' + TargetListOrder + ']')
                            var targetdownbtn = $('tr .item-down[data2=' + TargetListOrder + ']')
                            var targettr = targetupbtn.parents('tr:first');
                            targettr.css('background-color', '#ccc').fadeOut('normal', function() {
                                targetupbtn.attr('data2', ListOrder);
                                targetdownbtn.attr('data2', ListOrder);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                            tr.css('background-color', '#ccc').fadeOut('normal', function() {
                                upbtn.attr('data2', TargetListOrder);
                                downbtn.attr('data2', TargetListOrder);
                                $(targettr).after(tr);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                        } else {
                            setTimeout(function() {
                                RefreshData(1, 1, 1)
                            }, 10)
                        }
                    } else {
                        iziError()
                        setTimeout(function() {
                            RefreshData(1, 1, 1)
                        }, 10)
                    }
                },
                error: function() {
                    iziError()
                    setTimeout(function() {
                        RefreshData(1, 1, 1)
                    }, 10)
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

});

function GetLevelsSelect() {
    var data = new Array('Main', 'Sub', 'SubSub'),
        html = FunSelect(
            data,
            vars.sectionSPs.Level,
            formLang.LevelSec,
            "", "", "",
            false, false, true
        );
}

function GetMainSectionIdsSelect(level) {
    var id = vars.sectionSPs.MainSectionID + 'Select';
    var section = vars.sectionSPs.MainSectionID;
    if (level == "Main") {
        $('#' + section).html('');
        $('#' + section).parents('.ajax-group').hide();
    } else {
        var i, curData, searchLevel, searchID, curNavData, length;
        var html = '';
        if (level == "Sub") {
            searchLevel = "Main";
            searchID = "MainSectionID";
        } else {
            searchLevel = "Sub";
            searchID = "SubSectionID";
        }
        var curNavData = vars.sectionDatas.NavbarF.Data.filter(function(nav) {
            return nav.Level == searchLevel && nav.IsLink == 0;
        });
        length = curNavData.length;

        html = FunSelect(
            curNavData,
            vars.sectionSPs.MainSectionID,
            formLang.UstBirimSec,
            "Ad", searchID, "Ad",
            false, false, true
        );
        $('#' + section).parents('.ajax-group').show();
        RefreshSelectpicker();
    }
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.NavbarF.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.NavbarF.BHtml);

    ShortenContent();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.NavbarF = {
        Data: new Array(),
        FHtml: '',
        BHtml: '',
        Num: 0,
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
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.NavbarF;
                vars.sectionDatas.NavbarF = cache;
                vars.sectionDatas.NavbarF.Data = JSON.parse(cache.Data);
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
                $('body').append('<div id="frontHtml"></div>');
                $('#frontHtml').append(fhtml);

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

                vars.sectionDatas.NavbarF.FHtml = $('#frontHtml').html();
                $('#frontHtml').remove();

                var myJSON = JSON.stringify(vars.sectionDatas.NavbarF.Data);
                vars.sectionDatas.NavbarF.Data = myJSON;
                var theCacheData = {
                    NavbarF: vars.sectionDatas.NavbarF,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                vars.sectionDatas.NavbarF.Data = JSON.parse(myJSON);
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

function GetSectionsModalHtml() {
    if (vars.sectionIsFirst) {
        var html,
            turkceHtml = new Array(
                '<label>' + formLang.Ad + '</label>' +
                '<input type="text" name="tr_Ad" id="tr_Ad" class="form-control" placeholder="' + formLang.Ad + '"></input>'
            ),
            ingilizceHtml = new Array(
                '<label>' + formLang.Ad + '</label>' +
                '<input type="text" name="tr_Ad" id="tr_Ad" class="form-control" placeholder="' + formLang.Ad + '"></input>'
            ),
            genelHtml = new Array(
                '<label>' + formLang.IsLink + '</label>' +
                '<input type="checkbox" name="IsLink" id="IsLink" class="form-control" value="IsLink-1" checked></input>',

                '<label>' + formLang.IsLinkInBaseurl + '</label>' +
                '<input type="checkbox" name="IsLinkInBaseurl" id="IsLinkInBaseurl" class="form-control" value="IsLinkInBaseurl-1" checked></input>',

                '<label>' + formLang.Link + '</label>' +
                '<input type="text" name="Link" id="Link" class="form-control" placeholder="' + formLang.Link + '"></input>',

                '<label>' + formLang.Level + '</label>' +
                '<div id="' + vars.sectionSPs.Level + '"></div>',

                '<label>' + formLang.UstBirim + '</label>' +
                '<div id="' + vars.sectionSPs.MainSectionID + '"></div>'
            );

        html = FunCreateModalHtml(vars.sectionNames.Lower, false, genelHtml, new Array(), new Array(), vars.sectionButtons.Submit)
        $('#' + vars.sectionShowBases.Modal).html(html);
        $('#' + vars.sectionSPs.MainSectionID).parents('.ajax-group').hide();
        vars.sectionObjects.Form = $('#' + vars.sectionNames.Lower + '-form');
        vars.sectionObjects.Modal = $('#' + vars.sectionNames.Lower + '-modal');
    }
}

function GetSectionsHtml() {
    if (vars.sectionIsFirst) {
        var html = CreateSectionHtml(
            vars.sectionNames.Lower,
            vars.sectionNames.Upper,
            vars.sectionNames.Normal,
            new Array(
                '<button id="' + vars.sectionButtons.OpenModal + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>',
            ),
            new Array(
                formLang.Level,
                formLang.Ad,
                formLang.Ad,
                formLang.Yukari,
                formLang.Asagi,
                formLang.Duzenle,
                formLang.Sil
            ),
            vars.sectionShowBases.Modal
        )
        $('#' + vars.sectionShowBases.Sections).html(html);
        $('#' + vars.sectionShowBases.Sections).css('transition', 'none');
    }
}

var isFirst = true;

function RefreshData(main = 1, html = 0, side = 0) {
    if (main == 1) {
        GetSectionsData();
    }
    if (html != 0) {
        setTimeout(function() {
            GetSectionsHtml();
            GetSectionsModalHtml();
            CreateSectionsTable();
        }, 50);
    }
    if (side != 0) {
        setTimeout(function() {
            GetLevelsSelect()
            GetMainSectionIdsSelect('Main');
        }, 100);
    }
    setTimeout(function() {
        if (!vars.sectionIsFirst) {
            ShortenContent();
        }
        GetSectionsNum();
        vars.sectionIsFirst = false;
    }, 150);
}