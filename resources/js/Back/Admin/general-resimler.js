var vars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Resimler',
    sectionNameLower: 'duyurularEtkinlikler',
    sectionNameUpper: 'Resimler',
    sectionPortalController: baseurl + 'Portal/Admin/Genel-Resimler/',
    sectionController: baseurl + 'Portal/Admin/Genel-Resimler/',
    sectionShowBase: 'showResimlerData',
    sectionGetFunction: 'GetResimler',
    sectionAddFunction: 'AddResimler',
    sectionUpdateFunction: 'UpdateResimler',
    sectionEditFunction: 'EditResimler',
    sectionDeleteFunction: 'AddResimlerUpload',
    sectionUploadFunction: 'AddResimlerUpload',
    sectionNumFunction: 'GetResimlerNum',
    sectionOpenModalButton: 'ResimlerOpenModal',
    sectionAddUpdateSubmitButton: 'ResimlerAddUpdateSubmit',
    sectionEditButton: 'item-edit',
    sectionDeleteButton: 'item-delete',
    sectionIsFirst: true,

    sectionDatas: {
        Resimler: GetResimlerData(),
    },
};

$(function() {

    //Refresh Page
    RefreshHtmls();
    RefreshData(1);


    //Button that opens add/update modal
    $('#' + vars.sectionOpenModalButton).click(function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var formAction = vars.sectionPortalController + vars.sectionAddFunction;
            $(vars.form).attr('action', formAction);
            ResetForm(vars.form);
            $('#RDosya').parent('.ajax-group:first').show();
            $(vars.modal).modal('show');
        }
        $link.data('lockedAt', +new Date());
    });

    //Button for posting data for add/update
    $('#' + vars.sectionAddUpdateSubmitButton).click(function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var url = $(vars.form).attr('action');
            var data = $(vars.form).serializeArray();
            data.push({
                name: 'English',
                value: String(en)
            });

            var dataTarget = "RIsim";
            var dataTargetSecond = "RKategoriler";

            var RIsim;
            var RKategoriler;
            for (var i = 0; i < data.length; i++) {
                var rIsim;
                var rKategoriler;
                if (data[i].name == dataTarget) {
                    rIsim = data[i];
                    if (rIsim.value == "") {
                        data[i].value = "RDosya";
                    }
                    RIsim = data[i].value;
                }

                if (data[i].name == dataTargetSecond) {
                    rKategoriler = data[i];
                    if (rKategoriler.value == "") {
                        data[i].value = "Genel";
                    }
                    RKategoriler = data[i].value;
                }
            }
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: url,
                data: data,
                async: false,
                dataType: 'json',
                success: function(response) {
                    console.log(response)
                    ResetFormErrors();
                    if (response.success) {
                        if (response.type == 'add') {

                            var uploadURI = vars.sectionPortalController + vars.sectionUploadFunction;
                            var inputFile = $('#RDosya');

                            var fileToUpload = inputFile[0].files[0];
                            if (inputFile.get(0).files.length === 0) {
                                var ajaxGroup;
                                var element = inputFile;
                                ajaxGroup = element.parents('.ajax-group:first');

                                ajaxGroup.addClass('has-error');
                                if (en) {
                                    ajaxGroup.after('<p class="text-danger">The<strong> File </strong> field is required!</p>');
                                } else {
                                    ajaxGroup.after('<p class="text-danger"><strong>Dosya</strong> alanını doldurmanız gerekmektedir!</p>');
                                }
                            } else {
                                var formData = new FormData();
                                var rDosyaName = fileToUpload['name'].split('.');
                                rDosyaName = rDosyaName[0];
                                formData.append("RDosya", fileToUpload);
                                formData.append("RIsim", RIsim);
                                formData.append("RKategoriler", RKategoriler);
                                formData.append("RDosyaName", rDosyaName);
                                $.ajax({
                                    url: uploadURI,
                                    type: 'post',
                                    data: formData,
                                    processData: false,
                                    contentType: false,
                                    async: false,
                                    dataType: 'json',
                                    success: function(response2) {
                                        $(vars.modal).modal('hide');
                                        if (response2.success) {
                                            iziSuccess();
                                        } else {
                                            iziError();
                                        }

                                    },
                                    error: function() {
                                        $(vars.modal).modal('hide');
                                        iziError();

                                    }
                                });
                                RefreshData()
                            }
                        } else if (response.type == "update") {
                            var no = response.data.No;
                            var trInside = GetHtmlTr(response.data);
                            $(vars.modal).modal('hide');
                            $('tr .' + vars.sectionEditButton + '[data=' + no + ']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                $('tr .' + vars.sectionEditButton + '[data=' + no + ']').parents('tr:first').html(trInside);
                                RefreshSideData();
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });

                            iziSuccess();
                        }
                    } else {
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            $(vars.modal).modal('hide');
                            iziError();
                        }

                    }
                },
                error: function() {
                    $(vars.modal).modal('hide');
                    iziError();
                }
            });
        }
        $link.data('lockedAt', +new Date());
    });

    //Button for editing
    $('#' + vars.sectionShowBase).on('click', '.' + vars.sectionEditButton, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var No = $(this).attr('data');
            $(vars.form).attr('action', vars.sectionPortalController + vars.sectionUpdateFunction);
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: vars.sectionPortalController + vars.sectionEditFunction,
                data: {
                    No: No
                },
                async: false,
                dataType: 'json',
                success: function(result) {
                    ResetForm(vars.form);
                    if (result.success) {
                        $('input[name=No]').val(result.data.No);
                        $('#RIsim').val(result.data.RIsim);
                        $('#RKategorilerSelect').selectpicker('val', result.data.RKategoriler);
                        $('#RDosya').parent('.ajax-group:first').hide();

                        $(vars.modal).modal('show');
                    } else {
                        RefreshData(1)
                        iziError();
                    }

                },
                error: function() {
                    RefreshData(1)
                    iziError();
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

    //Button for deleting
    $('#' + vars.sectionShowBase).on('click', '.' + vars.sectionDeleteButton, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var btn = $(this);
            var No = $(this).attr('data');
            var Dosya = $(this).attr('data2');
            var Kategori = $(this).attr('data3');
            var FileToRemove = 'resources/images/' + Kategori + '/' + Dosya;

            iziToast.question({
                timeout: 15000,
                close: false,
                overlay: true,
                toastOnce: true,
                id: 'iziDelete',
                zindex: 999,
                title: formLang.delTitle,
                message: formLang.delMessage,
                position: 'center',
                buttons: [
                    ['<button><b>' + formLang.delEvetBtn + '</b></button>', function(instance, toast) {

                        url = vars.sectionPortalController + vars.sectionDeleteFunction;
                        $.ajax({
                            type: 'ajax',
                            method: 'post',
                            async: false,
                            url: url,
                            data: {
                                No: No,
                                file_to_remove: FileToRemove
                            },
                            dataType: 'json',
                            success: function(result) {
                                console.log(result)
                                if (result.success) {
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');

                                    $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() {
                                        $(this).remove();
                                        RefreshData();
                                    });

                                    iziSuccess();
                                } else {
                                    RefreshData(1)
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');
                                    iziError();
                                }

                            },
                            error: function() {
                                RefreshData(1)
                                instance.hide(toast, {
                                    transitionOut: 'fadeOutDown'
                                }, 'button');
                                iziError();
                            }
                        });
                    }, true],
                    ['<button>' + formLang.delHayirBtn + '</button>', function(instance, toast) {

                        instance.hide(toast, {
                            transitionOut: 'fadeOutDown'
                        }, 'button');

                    }]
                ],
            });

        }
        $link.data('lockedAt', +new Date());
    });

});

function GetKategoriler() {
    var url = baseurl + 'Portal/Admin/General-Kategoriler/GetKategoriler';

    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var html = '';
            var i;
            var kategoriler_ID = 'RKategorilerSelect';
            var kategoriler_section = 'RKategoriler';

            html = '<select class="form-control selectpicker" data-live-search="true" name="' + kategoriler_section + '" id="' + kategoriler_ID + '" title="' + formLang.KategoriSec + '" data-liveSearchNormalize="true">';

            for (i = 0; i < data.length; i++) {
                html += '<option data-tokens="' + data[i].Isim + '" value="' + data[i].Isim + '">' + data[i].Isim + '</option>';
            }

            html += '</select>'
            $('#' + kategoriler_section).html(html);
            RefreshSelectpicker();
        },
        error: function() {
            iziError();
        }
    });
}

function GetResimlerNum() {
    var url = vars.sectionController + vars.sectionNumFunction;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var html = data.data;
            $('#num').html(html);
        },
        error: function() {
            iziError();
        }
    });
}

function GetResimler() {
    var data = vars.sectionDatas.Resimler.Data
    var i;
    var html = '';

    for (i = 0; i < data.length; i++) {
        var trInside = GetHtmlTr(data[i]);
        html += '<tr>' + trInside + '</tr>';
    }

    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }
    $('#show' + vars.sectionNameUpper + 'Data').html(html);

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetHtmlTr(data) {
    var no = data.No;
    var dosya = data.RDosya;

    var trEnNames = new Array(
        'RIsim',
        'RKategoriler'
    );

    var trEnDatas = new Array();
    trEnDatas = {
        RIsim: '',
        RKategoriler: ''
    }

    for (var i = 0; i < trEnNames.length; i++) {
        var trData = trEnNames[i];
        var enData = trEnNames[i];
        if (en) {
            if (data[enData] == "") {
                trEnDatas[trEnNames[i]] = data[trData];
            } else {
                trEnDatas[trEnNames[i]] = data[enData];
            }
        } else {
            trEnDatas[trEnNames[i]] = data[trData];
        }
    }

    var newHtml =
        '<td class="shorten_content6">' + trEnDatas.RIsim + '</td>' +
        '<td class="shorten_content6">' + trEnDatas.RKategoriler + '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + vars.sectionEditButton + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + vars.sectionDeleteButton + '" data="' + no + '" data2="' + dosya + '" data3="' + trEnDatas.RKategoriler + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
        '</td>';
    return newHtml;
}

function GetAddUpdateModalHtml() {

    var html = '<div class="modal fade ajax-modal" id="' + vars.sectionNameLower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header" align="center">' +
        '<img class="maxW150" src="' + logoUrl + '">' +
        modalOpts.ModalCloseButton +
        '</div>' +
        '<div id="div-forms">' +
        '<form role="form" method="post" id="' + vars.sectionNameLower + '-form" class="form-horizontal" action="' + vars.sectionPortalController + vars.sectionAddFunction + '">' +
        '<div class="modal-body">' +
        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Isim + '</label>' +
        '<input name="RIsim" id="RIsim" class="form-control" type="text" placeholder="' + formLang.Isim + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Kategori + '</label>' +
        '<div id="RKategoriler"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Dosya + '</label>' +
        '<input type="file" name="RDosya" class="form-control" id="RDosya" placeholder="' + formLang.Dosya + '" multiple>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" id="' + vars.sectionAddUpdateSubmitButton + '" class="btn btn-info btn-lg btn-block">' + formLang.Kaydet + '</button>' +
        '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Iptal + '</button>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    $('#showAddUpdateModal').html(html);
    vars.form = $('#' + vars.sectionNameLower + '-form');
    vars.modal = $('#' + vars.sectionNameLower + '-modal');
}

function GetResimlerHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNameLower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
        '<h2>' +
        '<button id="' + vars.sectionOpenModalButton + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        vars.sectionNameNormal +
        '<span id="num" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's">' +
        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Isim + '</th>' +
        '<th class="text-center">' + formLang.Kategori + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
        '<th class="text-center">' + formLang.Sil + '</th>' +
        '</thead>' +
        '<tbody id="show' + vars.sectionNameUpper + 'Data">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div id="showAddUpdateModal"></div>' +
        '</div>' +
        '</section>';

    $('#show' + vars.sectionNameUpper).html(html);
}

function RefreshData(refreshSide = 0) {
    vars.sectionDatas = {
        Resimler: GetResimlerData(),
    },
    GetResimler();
    RefreshSideData(refreshSide)
}

var isFirst = true;

function RefreshSideData(refresh = 0) {
    GetResimlerNum();
    $(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        if (refresh = 1) {
            GetKategoriler();
        }
        isFirst = false;

    });
}

function RefreshHtmls() {
    GetResimlerHtml()
    GetAddUpdateModalHtml()
}