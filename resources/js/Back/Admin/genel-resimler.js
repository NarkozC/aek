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
        Delete: 'DeleteResimler',
    },
    sectionButtons: {
        OpenModal: 'ResimlerOpenModal',
        Submit: 'ResimlerSubmit',
    },
    sectionDatas: {
        Resimler: {},
        Kategoriler: GetKategorilerData(),
    },
    sectionSPs: {
        Kategori: 'RKategori',
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
            vars.sectionObjects.Form, vars.sectionObjects.Modal,
            function() {
                $('#RDosya').parents('.ajax-group:first').show();
            });



        //Button for posting data for add/update
        $('#' + vars.sectionShowBases.Sections).on('click', '#' + vars.sectionButtons.Submit, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
                var url = vars.sectionObjects.Form.attr('action'),
                    dosya = $('#RDosya')[0].files,
                    isNamesSame = $('#IsNamesSame').is(":checked"),
                    formData = new FormData(),
                    file = $('#RDosya')[0].files,
                    length = file.length;
                if (dosya.length >= 1) {
                    $('#RDosyaV').val("1")
                }
                var data = vars.sectionObjects.Form.serializeArray();
                data.push({
                    name: 'English',
                    value: String(en)
                });
                for (i = 0; i < length; i++) {
                    formData.append("files[]", file[i]);
                }
                formData.append("IsNamesSameV", isNamesSame);
                $.each(data, function(index, value) {
                    formData.append(value.name, value.value);
                });
                $.ajax({
                    type: 'ajax',
                    method: 'post',
                    url: url,
                    data: formData,
                    dataType: 'json',
                    processData: false,
                    contentType: false,
                    cache: false,
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
                                trArray = new Array('RIsim', 'RKategori');
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
                        iziError();
                        $(vars.sectionObjects.Modal).modal('hide');
                    },
                    xhr: function() {
                        var xhr = new XMLHttpRequest();
                        $('#ajax-loader-text').show();
                        xhr.upload.addEventListener("progress", function(event) {
                            if (event.lengthComputable) {
                                var percentComplete = Math.round((event.loaded / event.total) * 100);
                                $('#ajax-loader-text').html(percentComplete);
                            }
                        }, false);

                        return xhr;
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
                                $('#RDosya').parents('.ajax-group:first').hide();
                                $('#IsNamesSame').parents('.ajax-group:first').hide();

                                $('input[name=No]').val(result.data.No);
                                $('#RIsim').val(result.data.RIsim);
                                $('#' + vars.sectionSPs.Kategori + 'Select').selectpicker('val', result.data.RKategori);

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

function GetKategorilerSelect() {
    var html = FunSelect(
        vars.sectionDatas.Kategoriler.Data,
        vars.sectionSPs.Kategori,
        formLang.KategoriSec,
        "Isim", "Isim", "Isim"
    );
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Resimler.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('#' + vars.sectionShowBases.Sections).fadeOut();
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Resimler.BHtml);

    ShortenContent();

    CreateDataTables();
    $('#' + vars.sectionShowBases.Sections).fadeIn();
}

function GetHtmlTr(data, trArray) {
    var i;
    var newHtml = '';
    var length = trArray.length;
    var no = data.No;
    var dosya = data.RDosya;
    var kategori = 'images/' + data.RKategori;

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';

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
    if (vars.sectionIsFirst) {
        var html,
            genelHtml = new Array(
                '<label>' + formLang.IsNamesSame + '</label>' +
                '<input name="IsNamesSame" id="IsNamesSame" class="form-control" type="checkbox">',

                '<label>' + formLang.Isim + '</label>' +
                '<input name="RIsim" id="RIsim" class="form-control" type="text" placeholder="' + formLang.Isim + '">',

                '<label>' + formLang.Kategori + '</label>' +
                '<div id="' + vars.sectionSPs.Kategori + '"></div>',

                '<label>' + formLang.Dosya + '</label>' +
                '<input type="file" name="RDosya" class="form-control" id="RDosya" placeholder="' + formLang.Dosya + '" multiple accept="image/gif,image/jpeg,image/png">' +
                '<input name="RDosyaV" id="RDosyaV" type="text" style="display:none;">'
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
                formLang.Kategori,
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
        vars.sectionDatas.Resimler = GetResimlerData();
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
            GetKategorilerSelect()
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