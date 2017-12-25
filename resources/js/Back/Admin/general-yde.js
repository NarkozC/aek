var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Yde/',
        Portal: baseurl + 'Portal/Admin/Yde/',
    },
    sectionNames: {
        Normal: 'Yabancı Diller Etkinlikleri',
        Upper: 'Yde',
        Lower: 'yde',
        Kod: 'GYDE',
    },
    sectionShowBases: {
        Sections: 'showYde',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetYde',
        Add: 'AddYde',
        Update: 'UpdateYde',
        Edit: 'EditYde',
        Delete: 'DeleteYde',
        Up: 'UpYde',
        Down: 'DownYde',
    },
    sectionButtons: {
        OpenModal: 'YdeOpenModal',
        Submit: 'YdeSubmit',
    },
    sectionDatas: {
        Yde: {
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
                            var curData = response.data;

                            trArray = new Array('Resim');
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
                            $('#tr_Aciklama').val(result.data.tr_Aciklama);
                            $('#en_Aciklama').val(result.data.en_Aciklama);
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
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '[]" id="' + id + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">',
        lastParts = '';
    var i;

    lastParts = vars.sectionDatas.Resimler.Html;

    lastParts += '</select>';

    html += lastParts;
    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Yde.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Yde.BHtml);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.Yde = {
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
                var cache = result.cachedataEN.Yde;
                vars.sectionDatas.Yde = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Yde;
                vars.sectionDatas.Yde = cache;
            } else {
                var data = result.data,
                    length = data.length,
                    bHtml = '',
                    fHtml = '';
                var i, j, rLength, curData, tempCurData, trInside, trArray;

                fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>' +

                    '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                    '<div id="G' + vars.sectionNames.Kod + '" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);
                    vars.sectionDatas.Yde.Data[i] = curData;

                    trArray = new Array('Resim');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    tempCurData = curData.Resim.split(',');

                    for (j = 0, rLength = tempCurData.length; j < rLength; j++) {
                        fHtml += '<img ' +
                            ' src="' + imagesDir + tempCurData[j] + '" ' +
                            ' data-aciklama="' + curData.Aciklama + '">';
                    }
                }

                fHtml += '</div>' +
                    '<div id="' + vars.sectionShowBases.Aciklama + '" class="marginT15"></div>' +
                    '</div>' +
                    '</div>' +
                    '</section>';

                vars.sectionDatas.Yde.BHtml = bHtml;
                vars.sectionDatas.Yde.FHtml = fHtml;
                vars.sectionDatas.Yde.Num = length;


                $('#' + vars.sectionShowBases.Sections).html(fHtml);

                var theCacheData = {
                    Yde: vars.sectionDatas.Yde,
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
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="' + vars.sectionSPs.Resim + '"></div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade in active" id="' + formTabs.Turkce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea name="tr_Aciklama" id="tr_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '" rows="4"></textarea>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea name="en_Aciklama" id="en_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '" rows="4"></textarea>' +
        '</div>' +
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
        '<span data-baslik="B_' + vars.sectionNames.Upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + vars.sectionNames.Normal + '</span>' +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Resim + '</th>' +
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
            ShortenContent6();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}