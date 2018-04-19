var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Sinav-Basvurusu/',
        Portal: baseurl + 'Portal/Admin/Sinav-Yonergeleri/',
    },
    sectionNames: {
        Normal: 'Sınav Yönergeleri',
        Upper: 'SinavYonergeleri',
        Lower: 'sinavYonergeleri',
        Kod: 'GSY',
    },
    sectionShowBases: {
        Sections: 'showSinavYonergeleri',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetSinavYonergeleri',
        Update: 'UpdateSinavYonergeleri',
        Edit: 'EditSinavYonergeleri',
    },
    sectionButtons: {
        OpenModal: 'SinavYonergeleriOpenModal',
        Submit: 'SinavYonergeleriSubmit',
    },
    sectionDatas: {
        SinavYonergeleri: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },

        Pdfler: GetPdflerData(),
    },
    sectionSPs: {
        Ilkokul: 'Ilkokul',
        Ortaokul: 'Ortaokul',
        Lise: 'Lise',
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
            console.log(data)
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

                            trArray = new Array('IGIIlkokul', 'IGIOrtaokul', 'IGILise');
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
                            $('#tr_' + vars.sectionSPs.Ilkokul + 'Select').selectpicker('val', result.data.tr_Ilkokul);
                            $('#tr_' + vars.sectionSPs.Ortaokul + 'Select').selectpicker('val', result.data.tr_Ortaokul);
                            $('#tr_' + vars.sectionSPs.Lise + 'Select').selectpicker('val', result.data.tr_Lise);
                            $('#en_' + vars.sectionSPs.Ilkokul + 'Select').selectpicker('val', result.data.en_Ilkokul);
                            $('#en_' + vars.sectionSPs.Ortaokul + 'Select').selectpicker('val', result.data.en_Ortaokul);
                            $('#en_' + vars.sectionSPs.Lise + 'Select').selectpicker('val', result.data.en_Lise);
                            $('#tr_IGI' + vars.sectionSPs.Ilkokul).val(result.data.tr_IGIIlkokul);
                            $('#tr_IGI' + vars.sectionSPs.Ortaokul).val(result.data.tr_IGIOrtaokul);
                            $('#tr_IGI' + vars.sectionSPs.Lise).val(result.data.tr_IGILise);
                            $('#en_IGI' + vars.sectionSPs.Ilkokul).val(result.data.en_IGIIlkokul);
                            $('#en_IGI' + vars.sectionSPs.Ortaokul).val(result.data.en_IGIOrtaokul);
                            $('#en_IGI' + vars.sectionSPs.Lise).val(result.data.en_IGILise);

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

function GetPdflerSelect() {
    var i, tLength;
    var html = '',
        dHtml = '',
        data = vars.sectionDatas.Pdfler.Data,
        length = data.length,
        okuls = new Array('Ilkokul', 'Ortaokul', 'Lise'),
        ids = new Array(),
        sections = new Array();

    for (i = 0; i < length; i++) {
        dHtml += '<option data-tokens="' + data[i].Isim + '" value="' + data[i].Dosya + '">' + data[i].Isim + '</option>';
    }

    for (i = 0, tLength = okuls.length; i < tLength; i++) {
        ids[i] = vars.sectionSPs[okuls[i]] + 'Select';
        sections[i] = vars.sectionSPs[okuls[i]];

        html = '';
        html = '<select class="form-control selectpicker" data-live-search="true" name="tr_' + sections[i] + '" id="tr_' + ids[i] + '" title="' + formLang.PdfSec + '" data-liveSearchNormalize="true">' +
            dHtml +
            '</select>';
        $('#tr_' + sections[i]).html(html);

        html = '';
        html = '<select class="form-control selectpicker" data-live-search="true" name="en_' + sections[i] + '" id="en_' + ids[i] + '" title="' + formLang.PdfSec + '" data-liveSearchNormalize="true">' +
            dHtml +
            '</select>';
        $('#en_' + sections[i]).html(html);
    }

    RefreshSelectpicker();
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.SinavYonergeleri.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.SinavYonergeleri.BHtml);

    ShortenContent();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.SinavYonergeleri = {
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
                var cache = result.cachedataEN.SinavYonergeleri;
                vars.sectionDatas.SinavYonergeleri = cache;
                vars.sectionDatas.SinavYonergeleri.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.SinavYonergeleri;
                vars.sectionDatas.SinavYonergeleri = cache;
                vars.sectionDatas.SinavYonergeleri.Data = JSON.parse(cache.Data);
            } else {
                var fhtml = '',
                    bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                fhtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">'+
                    '<div class="col-lg-12 page-header text-center wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    fhtml +=
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">'+
                            '<a href="'+ pdfsDir + curData.Ilkokul + '" class="btn btn-danger btn-block" download="' + curData.IGIIlkokul + '">' + formLang.Ilkokul + '</a>' +
                        '</div>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">'+
                            '<a href="'+ pdfsDir + curData.Ortaokul + '" class="btn btn-danger btn-block" download="' + curData.IGIOrtaokul + '">' + formLang.Ortaokul + '</a>' +
                        '</div>'+
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-4">'+
                            '<a href="'+ pdfsDir + curData.Lise + '" class="btn btn-danger btn-block" download="' + curData.IGILise + '">' + formLang.Lise + '</a>' +
                        '</div>';

                    trArray = new Array('IGIIlkokul', 'IGIOrtaokul', 'IGILise');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    vars.sectionDatas.SinavYonergeleri.Data[i] = curData;
                }
                fhtml += '</div></section>';

                vars.sectionDatas.SinavYonergeleri.FHtml = fhtml;
                vars.sectionDatas.SinavYonergeleri.BHtml = bHtml;
                vars.sectionDatas.SinavYonergeleri.Num = length;
                
                var myJSON = JSON.stringify(vars.sectionDatas.SinavYonergeleri.Data);
                vars.sectionDatas.SinavYonergeleri.Data = myJSON;
                var theCacheData = {
                    SinavYonergeleri: vars.sectionDatas.SinavYonergeleri,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                vars.sectionDatas.SinavYonergeleri.Data = JSON.parse(myJSON);
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
        '<ul class="nav nav-tabs" role="tablist">' +
        '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#' + formTabs.Turkce + '" aria-controls="' + formTabs.Turkce + '" role="tab" data-toggle="tab">' + formLang.Turkce + '</a></li>' +
        '<li role="presentation"><a class="hvr-wobble-top" href="#' + formTabs.Ingilizce + '" aria-controls="' + formTabs.Ingilizce + '" role="tab" data-toggle="tab">' + formLang.Ingilizce + '</a></li>' +
        '</ul>' +
        '<div class="tab-content">' +

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div role="tabpanel" class="tab-pane fade in active" id="' + formTabs.Turkce + '">' +

        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ilkokul + '</label>' +
        '<div id="tr_' + vars.sectionSPs.Ilkokul + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ortaokul + '</label>' +
        '<div id="tr_' + vars.sectionSPs.Ortaokul + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Lise + '</label>' +
        '<div id="tr_' + vars.sectionSPs.Lise + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.IGIIlkokul + '</label>' +
        '<input type="text" name="tr_IGI' + vars.sectionSPs.Ilkokul + '" id="tr_IGI' + vars.sectionSPs.Ilkokul + '" class="form-control" placeholder="' + formLang.IGIIlkokul + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.IGIOrtaokul + '</label>' +
        '<input type="text" name="tr_IGI' + vars.sectionSPs.Ortaokul + '" id="tr_IGI' + vars.sectionSPs.Ortaokul + '" class="form-control" placeholder="' + formLang.IGIOrtaokul + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.IGILise + '</label>' +
        '<input type="text" name="tr_IGI' + vars.sectionSPs.Lise + '" id="tr_IGI' + vars.sectionSPs.Lise + '" class="form-control" placeholder="' + formLang.IGILise + '"></input>' +
        '</div>' +

        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +

        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ilkokul + '</label>' +
        '<div id="en_' + vars.sectionSPs.Ilkokul + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ortaokul + '</label>' +
        '<div id="en_' + vars.sectionSPs.Ortaokul + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Lise + '</label>' +
        '<div id="en_' + vars.sectionSPs.Lise + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.IGIIlkokul + '</label>' +
        '<input type="text" name="en_IGI' + vars.sectionSPs.Ilkokul + '" id="en_IGI' + vars.sectionSPs.Ilkokul + '" class="form-control" placeholder="' + formLang.IGIIlkokul + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.IGIOrtaokul + '</label>' +
        '<input type="text" name="en_IGI' + vars.sectionSPs.Ortaokul + '" id="en_IGI' + vars.sectionSPs.Ortaokul + '" class="form-control" placeholder="' + formLang.IGIOrtaokul + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.IGILise + '</label>' +
        '<input type="text" name="en_IGI' + vars.sectionSPs.Lise + '" id="en_IGI' + vars.sectionSPs.Lise + '" class="form-control" placeholder="' + formLang.IGILise + '"></input>' +
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
        '<span data-baslik="B_' + vars.sectionNames.Upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + vars.sectionNames.Normal + '</span>' +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.IGIIlkokul + '</th>' +
        '<th class="text-center">' + formLang.IGIOrtaokul + '</th>' +
        '<th class="text-center">' + formLang.IGILise + '</th>' +
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
        GetPdflerSelect();
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}