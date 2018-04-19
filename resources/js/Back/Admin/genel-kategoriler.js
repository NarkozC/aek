var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Genel-Kategoriler/',
        Portal: baseurl + 'Portal/Admin/Genel-Kategoriler/',
    },
    sectionNames: {
        Normal: 'Kategoriler',
        Upper: 'Kategoriler',
        Lower: 'kategtoriler',
        Kod: 'GH',
    },
    sectionShowBases: {
        Sections: 'showKategoriler',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetKategoriler',
        Add: 'AddKategoriler',
        Update: 'UpdateKategoriler',
        Edit: 'EditKategoriler',
        Delete: 'DeleteKategoriler',
        Up: 'UpKategoriler',
        Down: 'DownKategoriler',
    },
    sectionButtons: {
        OpenModal: 'KategorilerOpenModal',
        Submit: 'KategorilerSubmit',
    },
    sectionDatas: {
        Kategoriler: GetKategorilerData(),
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
                                trArray = new Array('Isim');
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
                                $('#Isim').val(result.data.Isim);

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
            RefreshData, new Array(1, 1, 1));

        //Button for moving record up
        FunUp(vars.sectionShowBases.Sections,
            vars.sectionControllers.Portal + vars.sectionFunctions.Up,
            RefreshData, new Array(1, 1, 1));

        //Button for moving record down
        FunDown(vars.sectionShowBases.Sections,
            vars.sectionControllers.Portal + vars.sectionFunctions.Down,
            RefreshData, new Array(1, 1, 1));

    }, 200);
});

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Kategoriler.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('#' + vars.sectionShowBases.Sections).fadeOut();
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Kategoriler.BHtml);

    ShortenContent();

    CreateDataTables();
    $('#' + vars.sectionShowBases.Sections).fadeIn();
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
            genelHtml = new Array(
                '<label>' + formLang.Isim + '</label>' +
                '<input type="text" name="Isim" id="Isim" class="form-control" placeholder="' + formLang.Isim + '"></input>'
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
                formLang.Isim,
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
        vars.sectionDatas.Kategoriler = GetKategorilerData();
    }
    if (html != 0) {
        setTimeout(function() {
            GetSectionsHtml();
            GetSectionsModalHtml();
            CreateSectionsTable();
        }, 50);
    }
    if (side != 0) {
        setTimeout(function() {}, 100);
    }
    setTimeout(function() {
        if (!vars.sectionIsFirst) {
            ShortenContent();
        }
        GetSectionsNum();
        vars.sectionIsFirst = false;
    }, 150);
}