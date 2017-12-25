var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Aektv/',
        Portal: baseurl + 'Portal/Admin/Aektv/',
    },
    sectionNames: {
        Normal: 'Ankara Eğitim Kurumları Tanıtım Videosu',
        Upper: 'Aektv',
        Lower: 'aektv',
        Kod: 'GAEKTV',
    },
    sectionShowBases: {
        Sections: 'showAektv',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetAektv',
        Update: 'UpdateAektv',
        Edit: 'EditAektv',
    },
    sectionButtons: {
        Submit: 'AektvSubmit',
    },
    sectionDatas: {
        Aektv: {
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
                        var no = response.data.No;
                        var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');
                        var curData = response.data;

                        trArray = new Array('Link');
                        var trInside = GetHtmlTr(curData, trArray);
                        editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                            editBtn.parents('tr:first').html(trInside);
                            $(this).css('background-color', '#EDEDED').fadeIn();
                        });
                        $(vars.sectionObjects.Modal).modal('hide');
                        iziSuccess();
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

});

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Aektv.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Aektv.BHtml);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.Aektv = {
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
                var cache = result.cachedataEN.Aektv;
                vars.sectionDatas.Aektv = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Aektv;
                vars.sectionDatas.Aektv = cache;
            } else {
                var data = result.data,
                    length = data.length,
                    bHtml = '',
                    fHtml = '';
                var i, curData, trInside, trArray;

                fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>' +

                    '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);
                    vars.sectionDatas.Aektv.Data[i] = curData;

                    fHtml += '<div class="video-container"><iframe width="600" height="355" ' +
                        'src="' + curData.Link + '" frameborder="0" allowfullscreen></iframe></div>';

                    trArray = new Array('Link');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';
                }

                fHtml += '</div>' +
                    '</div>' +
                    '</section>';

                vars.sectionDatas.Aektv.BHtml = bHtml;
                vars.sectionDatas.Aektv.FHtml = fHtml;
                vars.sectionDatas.Aektv.Num = length;


                $('#' + vars.sectionShowBases.Sections).html(fHtml);

                var theCacheData = {
                    Aektv: vars.sectionDatas.Aektv,
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
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
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

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Link + '</label>' +
        '<textarea name="Link" id="Link" class="form-control" placeholder="' + formLang.Link + '" rows="2"></textarea>' +
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
        '<span data-baslik="B_' + vars.sectionNames.Upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + vars.sectionNames.Normal + '</span>' +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Link + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
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
    GetSectionsNum();
}