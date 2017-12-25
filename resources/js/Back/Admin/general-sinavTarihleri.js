var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Sinav-Tarihleri/',
        Portal: baseurl + 'Portal/Admin/Sinav-Tarihleri/',
    },
    sectionNames: {
        Normal: 'Sınav Tarihleri',
        Upper: 'SinavTarihleri',
        Lower: 'sinavTarihleri',
        Kod: 'GST',
    },
    sectionShowBases: {
        Sections: 'showSinavTarihleri',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetSinavTarihleri',
        Add: 'AddSinavTarihleri',
        Update: 'UpdateSinavTarihleri',
        Edit: 'EditSinavTarihleri',
        Delete: 'DeleteSinavTarihleri',
    },
    sectionButtons: {
        OpenModal: 'SinavTarihleriOpenModal',
        Submit: 'SinavTarihleriSubmit',
    },
    sectionDatas: {
        SinavTarihleri: {
            Data: new Array(),
            Html: '',
            Num: 0,
        },

        Siniflar: GetSiniflarData(),
    },
    sectionSPs: {
        Sinif: 'Sinif',
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

                            trArray = new Array('ozel-Tarih', 'Sinif');
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
                            $('#' + vars.sectionSPs.Sinif + 'Select').selectpicker('val', result.data.Sinif);
                            $('#Tarih').val(result.data.Tarih);

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

function GetSiniflarSelect() {
    setTimeout(function() {
        var i, data = vars.sectionDatas.Siniflar,
            length = data.length;

        var tr_ID = vars.sectionSPs.Sinif + 'Select';
        var tr_Section = vars.sectionSPs.Sinif;

        var html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_Section + '" id="' + tr_ID + '" title="' + formLang.SinifSec + '" data-liveSearchNormalize="true">';

        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + data[i].Kod + '" value="' + data[i].Kod + '">' + data[i].Kod + '</option>';
        }

        html += '</select>';

        $('#' + tr_Section).html(html);
        RefreshSelectpicker();
    }, 5);
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.SinavTarihleri.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.SinavTarihleri.Html);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.SinavTarihleri = {
        Data: new Array(),
        Html: '',
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
                var cache = result.cachedataEN.SinavTarihleri;
                vars.sectionDatas.SinavTarihleri = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.SinavTarihleri;
                vars.sectionDatas.SinavTarihleri = cache;
            } else {
                var html = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                vars.sectionDatas.SinavTarihleri.Data[0] = new Array();
                vars.sectionDatas.SinavTarihleri.Data[0][0] = {};
                for (i = 1; i < length; i++) {
                    if (vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif] == undefined) {
                        vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif] = new Array();

                        clength = vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif].length;
                        vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif][clength] = data[i];
                    } else {
                        clength = vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif].length;
                        vars.sectionDatas.SinavTarihleri.Data[data[i].Sinif][clength] = data[i];
                    }
                }

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    trArray = new Array('ozel-Tarih', 'Sinif');
                    trInside = GetHtmlTr(curData, trArray);
                    html += '<tr>' + trInside + '</tr>';
                }
                vars.sectionDatas.SinavTarihleri.Html = html;
                vars.sectionDatas.SinavTarihleri.Num = length;
                var theCacheData = {
                    SinavTarihleri: vars.sectionDatas.SinavTarihleri,
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
        var trArrayTemp = trArray[i].split('-');
        if (trArrayTemp[0] == "ozel" && trArrayTemp[1] == "Tarih") {
            var tarih = data.Tarih.split('-');
            tarih = tarih[2] + '.' + tarih[1] + '.' + tarih[0];

            newHtml += '<td class="shorten_content6">' + tarih + '</td>';
        } else {
            newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
        }
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
        '<div class="tab-content">' +

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Sinif + '</label>' +
        '<div id="' + vars.sectionSPs.Sinif + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tarih + '</label>' +
        '<input type="date" name="Tarih" id="Tarih" class="form-control" placeholder="' + formLang.Tarih + '"></input>' +
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
        '<th class="text-center">' + formLang.Tarih + '</th>' +
        '<th class="text-center">' + formLang.Sinif + '</th>' +
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
        GetSiniflarSelect();
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}