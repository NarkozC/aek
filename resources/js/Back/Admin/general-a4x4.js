var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'A4x4/',
        Portal: baseurl + 'Portal/Admin/A4x4/',
    },
    sectionNames: {
        Normal: 'Anasayfa 4x4',
        Upper: 'A4x4',
        Lower: 'a4x4',
        Kod: 'GA4x4',
    },
    sectionShowBases: {
        Sections: 'showA4x4',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetA4x4',
        Add: 'AddA4x4',
        Update: 'UpdateA4x4',
        Edit: 'EditA4x4',
        Delete: 'DeleteA4x4',
        Up: 'UpA4x4',
        Down: 'DownA4x4',
    },
    sectionButtons: {
        OpenModal: 'A4x4OpenModal',
        Submit: 'A4x4Submit',
    },
    sectionDatas: {
        A4x4: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },

        Resimler: GetResimlerData(),
    },
    sectionSPs: {
        Resim: 'Resim',
    },
    sectionIsFirst: true,
};

$(function() {

    //Refresh Page
    RefreshData(1, 1, 1);


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

                            trArray = new Array('Baslik');
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
                            var ResimArray = result.data.Resim.split(',');
                            $('input[name=No]').val(result.data.No);
                            $('#tr_Baslik').val(result.data.tr_Baslik);
                            $('#en_Baslik').val(result.data.en_Baslik);
                            $('#Link').val(result.data.Link);
                            $('#' + vars.sectionSPs.Resim + 'Select').selectpicker('val', ResimArray);

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

function GetResimlerSelect() {
    var data = vars.sectionDatas.Resimler,
        length = data.length,
        id = vars.sectionSPs.Resim + 'Select',
        section = vars.sectionSPs.Resim,
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true">',
        lastParts = '';
    var i;

    lastParts = vars.sectionDatas.Resimler.Html;

    lastParts += '</select>';

    html += lastParts;
    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.A4x4.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.A4x4.BHtml);

    ShortenContent();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.A4x4 = {
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
                var cache = result.cachedataEN.A4x4;
                vars.sectionDatas.A4x4 = cache;
                vars.sectionDatas.A4x4.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.A4x4;
                vars.sectionDatas.A4x4 = cache;
                vars.sectionDatas.A4x4.Data = JSON.parse(cache.Data);
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
                        link = curData.Link;
                    } else {
                        link = baseurl + curData.Link;
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

                var myJSON = JSON.stringify(vars.sectionDatas.A4x4.Data);
                vars.sectionDatas.A4x4.Data = myJSON;
                var theCacheData = {
                    A4x4: vars.sectionDatas.A4x4,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                vars.sectionDatas.A4x4.Data = JSON.parse(myJSON);
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

    var html = '<div class="modal fade ajax-modal" id="' + vars.sectionNames.Lower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header" align="center">' +
        '<img class="maxW150" src="' + logoUrl + '">' +
        modalOpts.ModalCloseButton +
        '</div>' +
        '<form role="form" method="post" id="' + vars.sectionNames.Lower + '-form" class="form-horizontal" action="' + vars.sectionControllers.Portal + vars.sectionFunctions.Add + '">' +
        '<div class="modal-body">' +
        '<ul class="nav nav-tabs" role="tablist">' +
        '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#' + formTabs.Turkce + '" aria-controls="' + formTabs.Turkce + '" role="tab" data-toggle="tab">' + formLang.Turkce + '</a></li>' +
        '<li role="presentation"><a class="hvr-wobble-top" href="#' + formTabs.Ingilizce + '" aria-controls="' + formTabs.Ingilizce + '" role="tab" data-toggle="tab">' + formLang.Ingilizce + '</a></li>' +
        '</ul>' +
        '<div class="tab-content">' +

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +

        '<div role="tabpanel" class="tab-pane fade in active" id="' + formTabs.Turkce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input type="text" name="tr_Baslik" id="tr_Baslik" class="form-control" placeholder="' + formLang.Baslik + '"></input>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input type="text" name="en_Baslik" id="en_Baslik" class="form-control" placeholder="' + formLang.Baslik + '"></input>' +
        '</div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="' + vars.sectionSPs.Resim + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Link + '</label>' +
        '<input type="text" name="Link" id="Link" class="form-control" placeholder="' + formLang.Link + '"></input>' +
        '</div>' +

        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" id="' + vars.sectionButtons.Submit + '" class="btn btn-info btn-lg btn-block">' + formLang.Kaydet + '</button>' +
        '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Iptal + '</button>' +
        '</div>' +
        '</form> ' +
        '</div>' +
        '</div>' +
        '</div>';
    $('#' + vars.sectionShowBases.Modal).html(html);
    vars.sectionObjects.Form = $('#' + vars.sectionNames.Lower + '-form');
    vars.sectionObjects.Modal = $('#' + vars.sectionNames.Lower + '-modal');
}

function GetSectionsHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center">' +
        '<h2>' +
        '<button id="' + vars.sectionButtons.OpenModal + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        '<button id="' + rVars.sectionButtons.OpenModal + '" style="float: left; margin-left: 5px;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAddImage + '" aria-hidden="true"></i></button>' +
        vars.sectionNames.Normal +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Baslik + '</th>' +
        '<th class="text-center">' + formLang.Yukari + '</th>' +
        '<th class="text-center">' + formLang.Asagi + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
        '<th class="text-center">' + formLang.Sil + '</th>' +
        '</thead>' +
        '<tbody id="show' + vars.sectionNames.Upper + 'Data">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +

        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div id="' + vars.sectionShowBases.Modal + '"></div>' +
        '</div>' +
        '</section>';

    $('#' + vars.sectionShowBases.Sections).html(html);
}

var isFirst = true;

function RefreshData(main = 1, html = 0, side = 0) {
    if (main == 1) {
        GetSectionsData();
    }
    if (html != 0) {
        GetSectionsHtml()
        GetSectionsModalHtml()
        CreateSectionsTable()
    }
    if (side != 0) {
        GetResimlerSelect();
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}