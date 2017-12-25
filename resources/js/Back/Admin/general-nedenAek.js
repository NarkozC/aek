var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Neden-AEK/',
        Portal: baseurl + 'Portal/Admin/Neden-AEK/',
    },
    sectionNames: {
        Normal: 'Neden AEK',
        Upper: 'NedenAEK',
        Lower: 'nedenAEK',
        Kod: 'GNAEK',
    },
    sectionShowBases: {
        Sections: 'showNedenAEK',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetNedenAEK',
        Add: 'AddNedenAEK',
        Update: 'UpdateNedenAEK',
        Edit: 'EditNedenAEK',
        Delete: 'DeleteNedenAEK',
        Up: 'UpNedenAEK',
        Down: 'DownNedenAEK',
    },
    sectionButtons: {
        OpenModal: 'NedenAEKOpenModal',
        Submit: 'NedenAEKSubmit',
    },
    sectionDatas: {
        NedenAEK: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },
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
                            var curData = GetCurData(response.data)

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
                            $('input[name=No]').val(result.data.No);
                            $('#tr_Baslik').val(result.data.tr_Baslik);
                            $('#en_Baslik').val(result.data.en_Baslik);
                            $('#tr_Aciklama').val(result.data.tr_Aciklama);
                            $('#en_Aciklama').val(result.data.en_Aciklama);

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

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.NedenAEK.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.NedenAEK.BHtml);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.NedenAEK = {
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
                var cache = result.cachedataEN.NedenAEK;
                vars.sectionDatas.NedenAEK = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.NedenAEK;
                vars.sectionDatas.NedenAEK = cache;
            } else {
                var fhtml = '',
                    bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                fhtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    if (i != 0) {
                        fhtml += '<div class="sectionArasiBosluk"></div>';
                    }

                    fhtml +=
                        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '" id="' + curData.SectionID + '">' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center page-header wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<h2>' + curData.Baslik + '</h2>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                        '<p>' + curData.Aciklama + '</p>' +
                        '</div>' +
                        '</div>';

                    trArray = new Array('Baslik');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    vars.sectionDatas.NedenAEK.Data[i] = curData;
                }
                fhtml += '</section>';
                $('#' + vars.sectionShowBases.Sections).html(fhtml);

                vars.sectionDatas.NedenAEK.FHtml = fhtml;
                vars.sectionDatas.NedenAEK.BHtml = bHtml;
                vars.sectionDatas.NedenAEK.Num = length;
                var theCacheData = {
                    NedenAEK: vars.sectionDatas.NedenAEK,
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
        '<div role="tabpanel" class="tab-pane fade in active" id="' + formTabs.Turkce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input type="text" name="tr_Baslik" id="tr_Baslik" class="form-control" placeholder="' + formLang.Baslik + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea name="tr_Aciklama" id="tr_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '" rows="4"></textarea>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input type="text" name="en_Baslik" id="en_Baslik" class="form-control" placeholder="' + formLang.Baslik + '"></input>' +
        '</div>' +
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
        '<span data-baslik="B_' + vars.sectionNames.Upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + vars.sectionNames.Normal + '</span>' +
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
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}