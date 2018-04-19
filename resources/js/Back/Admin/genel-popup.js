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

    setTimeout(function() {

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
                    dataType: 'json',
                    success: function(response) {
                        ResetFormErrors();
                        if (response.success) {
                            ResetSelectpicker();
                            var trArray;
                            var willRefresh = false;

                            if (response.type == 'add') {
                                willRefresh = true;

                                iziSuccess();
                                $(vars.sectionObjects.Modal).modal('hide');
                            } else {
                                var no = response.data.No;
                                var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');

                                var curData = response.data;
                                trArray = new Array('BasSaat', 'BitSaat');
                                var trInside = GetHtmlTr(curData, trArray);
                                editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                    editBtn.parents('tr:first').html(trInside);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                    ShortenContent(50, false, true);
                                });
                                iziSuccess();
                                $(vars.sectionObjects.Modal).modal('hide');
                            }

                            if (willRefresh) {
                                RefreshData(1, 1, 1);
                            }
                        } else {
                            var ajaxGroup;
                            if (response.messages.length != 0) {
                                ShowFormErrors(response.messages);
                            } else {
                                RefreshData(1, 1, 1)

                                iziError();
                                $(vars.sectionObjects.Modal).modal('hide');
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
                                $('#Link').val(result.data.Link);
                                $('#' + vars.sectionSPs.Resim + 'Select').selectpicker('val', result.data.Resim);
                                $('#Link').val(result.data.Link);

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
            RefreshData, new Array(1, 1, 1), true);

    }, 200);
});

function GetResimlerSelect() {
    var html = FunSelect(
        vars.sectionDatas.Resimler,
        vars.sectionSPs.Resim,
        formLang.ResimSec,
        "", "", "",
        false,
        true
    );
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Popup.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('#' + vars.sectionShowBases.Sections).fadeOut();
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Popup.BHtml);

    ShortenContent();

    CreateDataTables();
    $('#' + vars.sectionShowBases.Sections).fadeIn();
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
                vars.sectionDatas.Popup.Data = JSON.parse(cache.Data);
                vars.sectionDatas.Popup.FHtml = JSON.parse(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Popup;
                vars.sectionDatas.Popup = cache;
                vars.sectionDatas.Popup.Data = JSON.parse(cache.Data);
                vars.sectionDatas.Popup.FHtml = JSON.parse(cache.FHtml);
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
                        '<a href="' + curData.Link + '"><img src="' + imagesDir + curData.Resim + '" id="' + vars.sectionNames.Lower + '-img" class="img-responsive img-center hvr-border-fade" style="position:relative; left:50%;transform:translate(-50%,0)"></a>' +
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

                if (length < cacheLimit) {
                    vars.sectionDatas.Popup.Data = JSON.stringify(vars.sectionDatas.Popup.Data);
                    vars.sectionDatas.Popup.FHtml = JSON.stringify(vars.sectionDatas.Popup.FHtml);
                    var theCacheData = {
                        Popup: vars.sectionDatas.Popup,
                    }
                    setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                    vars.sectionDatas.Popup.Data = JSON.parse(vars.sectionDatas.Popup.Data);
                    vars.sectionDatas.Popup.FHtml = JSON.parse(vars.sectionDatas.Popup.FHtml);
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

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
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
    if (vars.sectionIsFirst) {
        var html,
            genelHtml = new Array(
                '<label>' + formLang.BasSaat + '</label> <br>' +
                '<input type="time" name="BasSaat" id="BasSaat" class="form-control" placeholder="' + formLang.BasSaat + '"></input>',

                '<label>' + formLang.BitSaat + '</label> <br>' +
                '<input type="time" name="BitSaat" id="BitSaat" class="form-control" placeholder="' + formLang.BitSaat + '"></input>',

                '<label>' + formLang.Resim + '</label>' +
                '<div id="' + vars.sectionSPs.Resim + '"></div>',

                '<label>' + formLang.Link + '</label> <br>' +
                '<input type="text" name="Link" id="Link" class="form-control" placeholder="' + formLang.Link + '"></input>'
            );

        html = FunCreateModalHtml(vars.sectionNames.Lower, false, genelHtml, new Array(), new Array(), vars.sectionButtons.Submit)
        $('#' + vars.sectionShowBases.Modal).html(html);
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
                formLang.BasSaat,
                formLang.BitSaat,
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
            GetResimlerSelect()
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