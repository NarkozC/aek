var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Genel-Popup/',
        Portal: baseurl + 'Portal/Admin/Genel-Popup/',
    },
    sectionNames: {
        Normal: 'Popup',
        Upper: 'Popup',
        Lower: 'popup',
    },
    sectionShowBases: {
        Sections: 'showPopup',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetPopup',
        Add: 'AddPopup',
        Update: 'UpdatePopup',
        Edit: 'EditPopup',
        Delete: 'DeletePopup',
    },
    sectionButtons: {
        OpenModal: 'PopupOpenModal',
        Submit: 'PopupSubmit',
    },
    sectionDatas: {
        Popup: {
            Data: new Array(),
            FHtml: new Array(),
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

                            trArray = new Array('BasSaat', 'BitSaat');
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
                            $('#BasSaat').val(result.data.BasSaat);
                            $('#BitSaat').val(result.data.BitSaat);
                            $('#' + vars.sectionSPs.Resim + 'Select').selectpicker('val', result.data.Resim);

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
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Popup.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Popup.BHtml);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.Popup = {
        Data: new Array(),
        FHtml: new Array(),
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
                var cache = result.cachedataEN.Popup;
                vars.sectionDatas.Popup = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Popup;
                vars.sectionDatas.Popup = cache;
            } else {
                var data = result.data,
                    length = data.length,
                    html = '',
                    fHtml = '';
                var i, curData, trInside, trArray;

                for (i = 0; i < length; i++) {
                    curData = data[i];
                    curData.BasSaat = curData.BasSaat.split(':')
                    curData.BitSaat = curData.BitSaat.split(':')
                    curData.BasSaat = curData.BasSaat[0] + ':' + curData.BasSaat[1];
                    curData.BitSaat = curData.BitSaat[0] + ':' + curData.BitSaat[1];

                    trArray = new Array('BasSaat', 'BitSaat');
                    trInside = GetHtmlTr(curData, trArray);
                    html += '<tr>' + trInside + '</tr>';



                    curData = data[i]
                    curData.BasSaat = curData.BasSaat.split(':')
                    curData.BitSaat = curData.BitSaat.split(':')
                    curData.BasSaat = new Array(curData.BasSaat[0], curData.BasSaat[1]);
                    curData.BitSaat = new Array(curData.BitSaat[0], curData.BitSaat[1]);
                    curData.BasSaat[1] = (curData.BasSaat[0] * 10) + curData.BasSaat[1];
                    curData.BitSaat[1] = (curData.BitSaat[0] * 10) + curData.BitSaat[1];

                    fHtml = '<div class="modal fade ajax-modal" id="' + vars.sectionNames.Lower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
                        '<div class="modal-dialog">' +
                        '<div class="modal-content">' +
                        '<div class="modal-header" align="center">' +
                        '<img class="maxW150" src="' + logoUrl + '">' +
                        modalOpts.ModalCloseButton +
                        '</div>' +
                        '<div class="modal-body">' +
                        '<img src="' + imagesDir + curData.Resim + '" id="' + vars.sectionNames.Lower + '-img" class="img-responsive img-center hvr-border-fade" style="position:relative; left:50%;transform:translate(-50%,0)">' +
                        '</div>' +
                        '<div class="modal-footer">' +
                        '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Kapat + '</button>' +
                        '</div>' +
                        '</div>' +
                        '</div>' +
                        '</div>';

                    vars.sectionDatas.Popup.Data[i] = curData;
                    vars.sectionDatas.Popup.FHtml[i] = fHtml;
                }

                vars.sectionDatas.Popup.BHtml = html;
                vars.sectionDatas.Popup.Num = length;
                var theCacheData = {
                    Popup: vars.sectionDatas.Popup,
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

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
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

        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.BasSaat + '</label> <br>' +
        '<input type="time" name="BasSaat" id="BasSaat" class="form-control" placeholder="' + formLang.BasSaat + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.BitSaat + '</label> <br>' +
        '<input type="time" name="BitSaat" id="BitSaat" class="form-control" placeholder="' + formLang.BitSaat + '"></input>' +
        '</div>' +
        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="' + vars.sectionSPs.Resim + '"></div>' +
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
        '<th class="text-center">' + formLang.BasSaat + '</th>' +
        '<th class="text-center">' + formLang.BitSaat + '</th>' +
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