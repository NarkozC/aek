var rVars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Portal: baseurl + 'Portal/Admin/Genel-Resimler/',
    },
    sectionNames: {
        Normal: 'Resimler',
        Upper: 'Resimler',
        Lower: 'resimler',
    },
    sectionShowBases: {
        Modal: 'showResimlerModal',
    },
    sectionFunctions: {
        Add: 'AddResimler',
        Upload: 'AddResimlerUpload',
    },
    sectionButtons: {
        OpenModal: 'ResimlerOpenModal',
        Submit: 'ResimlerSubmit',
    },
    sectionDatas: {
        Kategoriler: GetKategorilerData(),
    },
    sectionSPs: {
        Kategori: 'RKategori',
    },
    sectionIsFirst: true,
};

$(function() {
    GetAllAddResim();
});

function GetAllAddResim() {

    $(function() {

        if ($('#' + rVars.sectionShowBases.Modal).length <= 0) {
            $('#' + vars.sectionShowBases.Sections).append('<div id="' + rVars.sectionShowBases.Modal + '"></div> ');
        }

        RefreshResimlerData()


        //Button that opens add/update modal
        FunOpenModal(vars.sectionShowBases.Sections, rVars.sectionButtons.OpenModal,
            rVars.sectionControllers.Portal + rVars.sectionFunctions.Add,
            rVars.sectionObjects.Form, rVars.sectionObjects.Modal,
            function() {
                $('#RDosya').parents('.ajax-group:first').show();
            });



        //Button for posting data for add/update
        $('#' + vars.sectionShowBases.Sections).on('click', '#' + rVars.sectionButtons.Submit, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
                var url = rVars.sectionObjects.Form.attr('action');
                var data = rVars.sectionObjects.Form.serializeArray();
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
                            var newSayfa = response.sayfa;
                            var willRefresh = false;

                            if (response.type == 'add') {

                                var uploadURI = rVars.sectionControllers.Portal + rVars.sectionFunctions.Upload;
                                var rDosya = $('#RDosya')[0],
                                    files = $('#RDosya')[0].files,
                                    rIsim = $('#RIsim').val(),
                                    rKategori = $('#' + rVars.sectionSPs.Kategori + 'Select').selectpicker('val'),
                                    isNamesSame = $('#IsNamesSame').is(":checked");
                                var i,
                                    length = files.length;

                                if (length < 1) {
                                    var ajaxGroup;
                                    var element = rDosya;
                                    ajaxGroup = element.parents('.ajax-group:first');

                                    ajaxGroup.addClass('has-error');
                                    if (en) {
                                        ajaxGroup.append('<p class="text-danger">The <strong>File</strong> field is required!</p>');
                                    } else {
                                        ajaxGroup.append('<p class="text-danger"><strong>Dosya</strong> alanını doldurmanız gerekmektedir!</p>');
                                    }
                                } else {
                                    var formData = new FormData();

                                    for (i = 0; i < length; i++) {
                                        formData.append("files[]", files[i]);
                                    }
                                    if (isNamesSame) {
                                        formData.append("IsNamesSame", true);
                                    } else {
                                        formData.append("IsNamesSame", false);
                                    }
                                    formData.append("RIsim", rIsim);
                                    formData.append("RKategori", rKategori);
                                    $.ajax({
                                        url: uploadURI,
                                        type: 'post',
                                        data: formData,
                                        processData: false,
                                        contentType: false,
                                        cache: false,
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
                                    $(rVars.sectionObjects.Modal).modal('hide');
                                    willRefresh = true;
                                }
                            }

                            if (willRefresh) {
                                setTimeout(function() {
                                    if (typeof vars.sectionDatas.Resimler !== 'undefined') {
                                        vars.sectionDatas.Resimler = GetResimlerData();
                                    } else {
                                        GetResimlerData();
                                    }
                                    if (typeof GetResimlerSelect != 'undefined' && $.isFunction(GetResimlerSelect)) {
                                        GetResimlerSelect();
                                    }
                                }, 310);
                            }
                        } else {
                            var ajaxGroup;
                            if (response.messages.length != 0) {
                                ShowFormErrors(response.messages);
                            } else {
                                GetResimlerData()

                                $(rVars.sectionObjects.Modal).modal('hide');
                                iziError();
                            }
                        }
                    },
                    error: function() {
                        GetResimlerData()
                        $(rVars.sectionObjects.Modal).modal('hide');
                        iziError();
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });
    });

    function GetKategorilerSelect() {
        var i, data = rVars.sectionDatas.Kategoriler.Data,
            length = data.length,
            html;

        var tr_ID = rVars.sectionSPs.Kategori + 'Select';
        var tr_section = rVars.sectionSPs.Kategori;

        html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '" id="' + tr_ID + '" title="' + formLang.KategoriSec + '" data-liveSearchNormalize="true">';

        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + data[i].Isim + '" value="' + data[i].Isim + '">' + data[i].Isim + '</option>';
        }

        html += '</select>'
        $('#' + tr_section).html(html);
        RefreshSelectpicker();
    }

    function GetResimlerModalHtml() {

        var html = '<div class="modal fade ajax-modal" id="' + rVars.sectionNames.Lower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header" align="center">' +
            '<img class="maxW150" src="' + logoUrl + '">' +
            modalOpts.ModalCloseButton +
            '</div>' +
            '<form role="form" method="post" id="' + rVars.sectionNames.Lower + '-form" class="form-horizontal" action="' + rVars.sectionControllers.Portal + rVars.sectionFunctions.Add + '">' +
            '<div class="modal-body">' +
            '<div class="tab-content">' +
            '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
            '<div class="ajax-group col-sm-12 paddingLR0">' +
            '<label>' + formLang.IsNamesSame + '</label>' +
            '<input name="IsNamesSame" id="IsNamesSame" class="form-control" type="checkbox">' +
            '</div>' +
            '<div class="ajax-group col-sm-12 paddingLR0">' +
            '<label>' + formLang.Isim + '</label>' +
            '<input name="RIsim" id="RIsim" class="form-control" type="text" placeholder="' + formLang.Isim + '">' +
            '</div>' +
            '<div class="ajax-group col-sm-12 paddingLR0">' +
            '<label>' + formLang.Kategori + '</label>' +
            '<div id="' + rVars.sectionSPs.Kategori + '"></div>' +
            '</div>' +
            '<div class="ajax-group col-sm-12 paddingLR0">' +
            '<label>' + formLang.Dosya + '</label>' +
            '<input type="file" name="RDosya" class="form-control" id="RDosya" placeholder="' + formLang.Dosya + '" multiple accept="image/gif,image/jpeg,image/png">' +
            '</div>' +
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" id="' + rVars.sectionButtons.Submit + '" class="btn btn-info btn-lg btn-block">' + formLang.Kaydet + '</button>' +
            '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Iptal + '</button>' +
            '</div>' +
            '</form> ' +
            '</div>' +
            '</div>' +
            '</div>';
        $('#' + rVars.sectionShowBases.Modal).html(html);
        rVars.sectionObjects.Form = $('#' + rVars.sectionNames.Lower + '-form');
        rVars.sectionObjects.Modal = $('#' + rVars.sectionNames.Lower + '-modal');
    }

    function RefreshResimlerData() {
        GetResimlerModalHtml();
        GetKategorilerSelect();
    }
}