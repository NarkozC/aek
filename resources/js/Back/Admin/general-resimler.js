var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Portal/Admin/Genel-Resimler/',
        Portal: baseurl + 'Portal/Admin/Genel-Resimler/',
    },
    sectionNames: {
        Normal: 'Resimler',
        Upper: 'Resimler',
        Lower: 'resimler',
    },
    sectionShowBases: {
        Sections: 'showResimler',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetResimler',
        Add: 'AddResimler',
        Update: 'UpdateResimler',
        Edit: 'EditResimler',
        Delete: 'AddResimlerUpload',
        Upload: 'AddResimlerUpload',
    },
    sectionButtons: {
        OpenModal: 'ResimlerOpenModal',
        Submit: 'ResimlerSubmit',
    },
    sectionDatas: {
        Resimler: {
            Data: '',
            Num: 0,
        },

        Kategoriler: GetKategorilerData(),
    },
    sectionSPs: {
        Kategori: 'RKategoriler',
    },
    sectionIsFirst: true,
};

$(function() {

    //Refresh Page
    RefreshData(1, 1, 1);


    //Button that opens add/update modal
    FunOpenModal(vars.sectionShowBases.Sections, vars.sectionButtons.OpenModal,
        vars.sectionControllers.Portal + vars.sectionFunctions.Add,
        vars.sectionObjects.Form, vars.sectionObjects.Modal,
        function() {
            $('#RDosya').parents('.ajax-group:first').show();
        });



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
                    ResetFormErrors();
                    if (response.success) {
                        ResetSelectpicker();
                        var trArray;
                        var newSayfa = response.sayfa;
                        var willRefresh = false;

                        if (response.type == 'add') {
                            var uploadURI = vars.sectionControllers.Portal + vars.sectionFunctions.Upload;
                            var inputFile = $('#RDosya');
                            var fileToUpload = inputFile[0].files[0];
                            if (inputFile.get(0).files.length === 0) {
                                var ajaxGroup;
                                var element = inputFile;
                                ajaxGroup = element.parents('.ajax-group:first');

                                ajaxGroup.addClass('has-error');
                                if (en) {
                                    ajaxGroup.append('<p class="text-danger">The<strong> File </strong> field is required!</p>');
                                } else {
                                    ajaxGroup.append('<p class="text-danger"><strong>Dosya</strong> alanını doldurmanız gerekmektedir!</p>');
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
                                        if (response2.success) {
                                            iziSuccess();
                                        } else {
                                            iziError();
                                        }
                                    },
                                    error: function() {
                                        iziError();

                                    }
                                });
                                $(vars.sectionObjects.Modal).modal('hide');
                                willRefresh = true;
                            }
                        } else {
                            var no = response.data.No;
                            var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');

                            var curData = GetCurData(response.data);
                            trArray = new Array('RIsim', 'RKategoriler');
                            var trInside = GetHtmlTr(curData, trArray);
                            editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                editBtn.parents('tr:first').html(trInside);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                            iziSuccess();
                            $(vars.sectionObjects.Modal).modal('hide');
                        }

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
            var sayfa = $(this).parents('.tab-pane.fade.active.in').attr('id')
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
                            $('#RDosya').parents('.ajax-group:first').hide();

                            $('input[name=No]').val(result.data.No);
                            $('#RIsim').val(result.data.RIsim);
                            $('#' + vars.sectionSPs.Kategori + 'Select').selectpicker('val', result.data.RKategoriler);

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
    $('#' + vars.sectionShowBases.Sections).on('click', '.' + tableOpts.ButtonDelete, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var btn = $(this);
            var no = $(this).attr('data');
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

                        furl = vars.sectionControllers.Portal + vars.sectionFunctions.Delete
                        $.ajax({
                            type: 'ajax',
                            method: 'post',
                            async: false,
                            url: furl,
                            data: {
                                No: no,
                                file_to_remove: FileToRemove,
                            },
                            dataType: 'json',
                            success: function(result) {
                                if (result.success) {
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');

                                    $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() {
                                        $(this).remove();
                                    });

                                    iziSuccess();
                                } else {
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');
                                    iziError();
                                }
                            },
                            error: function() {
                                instance.hide(toast, {
                                    transitionOut: 'fadeOutDown'
                                }, 'button');
                                iziError();
                            },
                            complete: function() {
                                var sayfaID = $(btn).parents('tbody:first').attr('id');
                                var rowCount = $('#' + sayfaID + ' tr').length;
                                if (rowCount == 1) {
                                    RefreshData("1, 1, 1");
                                }
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

function GetKategorilerSelect() {
    var i, data = vars.sectionDatas.Kategoriler,
        length = data.length,
        html;

    var tr_ID = vars.sectionSPs.Kategori + 'Select';
    var tr_section = vars.sectionSPs.Kategori;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '" id="' + tr_ID + '" title="' + formLang.KategoriSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Isim + '" value="' + data[i].Isim + '">' + data[i].Isim + '</option>';
    }

    html += '</select>'
    $('#' + tr_section).html(html);
    RefreshSelectpicker();
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Resimler.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Resimler.Html);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.Resimler = {
        Data: '',
        Num: 0,
    }

    var url = vars.sectionControllers.Normal + vars.sectionFunctions.Get;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        data: {
            English: en,
            NeedData: true,
        },
        async: false,
        dataType: 'json',
        success: function(result) {
            var i, data = result.data,
                length, html = '';
            var curData, trInside, trArray;

            for (i = 0, length = data.length; i < length; i++) {
                curData = GetCurData(data[i]);

                trArray = new Array('RIsim', 'RKategoriler');
                trInside = GetHtmlTr(curData, trArray);
                html += '<tr>' + trInside + '</tr>';
            }
            vars.sectionDatas.Resimler.Html = html;
            vars.sectionDatas.Resimler.Num = length;
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
    var dosya = data.RDosya;
    var kategori = data.RKategoriler;

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';

    }
    newHtml +=
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '" data2="' + dosya + '" data3="' + kategori + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '" data2="' + dosya + '" data3="' + kategori + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
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
        '<label>' + formLang.Isim + '</label>' +
        '<input name="RIsim" id="RIsim" class="form-control" type="text" placeholder="' + formLang.Isim + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Kategori + '</label>' +
        '<div id="' + vars.sectionSPs.Kategori + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Dosya + '</label>' +
        '<input type="file" name="RDosya" class="form-control" id="RDosya" placeholder="' + formLang.Dosya + '" multiple>' +
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
        vars.sectionNames.Normal +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';

    html += '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Isim + '</th>' +
        '<th class="text-center">' + formLang.Kategori + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
        '<th class="text-center">' + formLang.Sil + '</th>' +
        '</thead>' +
        '<tbody id="show' + vars.sectionNames.Upper + 'Data">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';



    html += '</div>' +
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
        GetKategorilerSelect();
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}