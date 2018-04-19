var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Genel-Subeler/',
        Portal: baseurl + 'Portal/Admin/Genel-Subeler/',
    },
    sectionNames: {
        Normal: 'Şubeler',
        Upper: 'Subeler',
        Lower: 'subeler',
        Kod: 'GS',
    },
    sectionShowBases: {
        Sections: 'showSubeler',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetSubeler',
        Add: 'AddSubeler',
        Update: 'UpdateSubeler',
        Edit: 'EditSubeler',
        Delete: 'DeleteSubeler',
        Up: 'UpSubeler',
        Down: 'DownSubeler',
    },
    sectionButtons: {
        OpenModal: 'SubelerOpenModal',
        Submit: 'SubelerSubmit',
    },
    sectionDatas: {
        Subeler: '',
        Siniflar: GetSiniflarData(),
        Bolumler: GetBolumlerData(),
    },
    sectionSPs: {
        Sinif: 'Sinif',
        Sube: 'Sube',
        Bolum: 'Bolum',
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
                if (data[1].value != '' && data[3].value != '') {
                    var okul = "0";
                    if (data[1].value >= 5 && data[1].value <= 8) {
                        okul = "1";
                    } else if(data[1].value >= 9) {
                        okul = "2";
                    }
                    data.push({
                        name: 'Okul',
                        value: okul,
                    });
                    if (data[2].value != '') {
                        data.push({
                            name: 'Kod',
                            value: data[1].value + '-' + data[2].value + '-' + data[3].value,
                        });
                    } else {
                        data.push({
                            name: 'Kod',
                            value: data[1].value + '-' + data[3].value,
                        });
                    }
                }
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
                                trArray = new Array('Kod');
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
                                var tempKod = result.data.Kod.split('-');
                                if (tempKod.length == 3) {
                                    console.log(result.data.Okul + '-' + tempKod[0])
                                    $('#' + vars.sectionSPs.Sinif + 'Select').selectpicker('val', tempKod[0]);
                                    $('#' + vars.sectionSPs.Bolum + 'Select').selectpicker('val', tempKod[1]);
                                    $('#' + vars.sectionSPs.Sube + 'Select').selectpicker('val', tempKod[2]);
                                } else {
                                    $('#' + vars.sectionSPs.Sinif + 'Select').selectpicker('val', tempKod[0]);
                                    $('#' + vars.sectionSPs.Sube + 'Select').selectpicker('val', tempKod[1]);
                                }

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

    }, 200);

});

function GetSiniflarSelect() {
    var html = FunSelect(
        vars.sectionDatas.Siniflar,
        vars.sectionSPs.Sinif,
        formLang.SinifSec,
        "Kod", "Kod", "Kod"
    );
}

function GetBolumlerSelect() {
    var html = FunSelect(
        vars.sectionDatas.Bolumler.Data,
        vars.sectionSPs.Bolum,
        formLang.BolumSec,
        "Kod", "Kod", "Kod"
    );
}

function GetSubelerSelect() {
    var html = FunSelect(
        new Array('A', 'B', 'C', 'D', 'E', 'F'),
        vars.sectionSPs.Sube,
        formLang.SubeSec,
        "", "", "",
        false, false, true
    );
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Subeler.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('#' + vars.sectionShowBases.Sections).fadeOut();
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Subeler.BHtml);

    ShortenContent();

    CreateDataTables();
    $('#' + vars.sectionShowBases.Sections).fadeIn();
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
                '<label>' + formLang.Sinif + '</label>' +
                '<div id="' + vars.sectionSPs.Sinif + '"></div>',

                '<label>' + formLang.Bolum + '</label>' +
                '<div id="' + vars.sectionSPs.Bolum + '"></div>',

                '<label>' + formLang.Sube + '</label>' +
                '<div id="' + vars.sectionSPs.Sube + '"></div>'
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
                formLang.Sube,
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
        vars.sectionDatas.Subeler = GetSubelerData();
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
            GetSiniflarSelect()
            GetBolumlerSelect()
            GetSubelerSelect()
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