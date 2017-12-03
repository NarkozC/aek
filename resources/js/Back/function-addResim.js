var rVars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Resimler',
    sectionNameLower: 'resimler',
    sectionNameUpper: 'Resimler',
    sectionPortalController: baseurl + 'Portal/Admin/Resimler/',
    sectionController: baseurl + 'Resimler/',
    sectionShowBase: 'ShowAddResimlerModal',
    sectionAddFunction: 'AddResimler',
    sectionUploadFunction: 'AddResimlerUpload',
    sectionOpenModalButton: 'ResimlerOpenModal',
    sectionAddUpdateSubmitButton: 'ResimlerAddUpdateSubmit',
    sectionIsFirst: true,

    sectionKategorilerPortalController: baseurl + 'Portal/Admin/General-Kategoriler/',
    sectionKategorilerController: baseurl + 'General-Kategoriler/',
    sectionKategorilerGetFunction: 'GetKategoriler',
};

$(function() {

    if ($('#'+rVars.sectionShowBase).length <= 0) {
        $("body").append('<div id="' + rVars.sectionShowBase + '"></div> ');
    }

    //Button that opens add/update modal
    $('#' + rVars.sectionOpenModalButton).click(function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            ResimlerRefreshData();
            $(rVars.modal).modal('show');
        }
        $link.data('lockedAt', +new Date());
    });

    //Button for posting data for add/update
    $('#' + rVars.sectionShowBase).on('click', '#' + rVars.sectionAddUpdateSubmitButton, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var url = $(rVars.form).attr('action');
            var data = $(rVars.form).serializeArray();
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
                        if (response.type == 'add') {

                            var uploadURI = rVars.sectionPortalController + rVars.sectionUploadFunction;
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
                                        $(rVars.modal).modal('hide');

                                        if (response2.success) {
                                            iziSuccess();
                                        } else {
                                            iziError();
                                        }


                                    },
                                    error: function() {
                                        $(rVars.modal).modal('hide');
                                        iziError();

                                    }
                                });
                            }
                        }
                        GetResimler();
                    } else {
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            $(rVars.modal).modal('hide');
                            iziError();
                        }

                    }
                },
                error: function() {
                    $(rVars.modal).modal('hide');
                    iziError();
                }
            });
        }
        $link.data('lockedAt', +new Date());
    });

});


function GetResimlerKategoriler() {
    var url = rVars.sectionKategorilerPortalController + rVars.sectionKategorilerGetFunction;

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



function GetAddResimlerModalHtml() {

    var html = '<div class="modal fade ajax-modal" id="' + rVars.sectionNameLower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header" align="center">' +
        '<img class="maxW150" src="' + logoUrl + '">' +
        modalOpts.ModalCloseButton +
        '</div>' +
        '<div id="div-forms">' +
        '<form role="form" method="post" id="' + rVars.sectionNameLower + '-form" class="form-horizontal" action="' + rVars.sectionPortalController + rVars.sectionAddFunction + '">' +
        '<div class="modal-body">' +
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
        '<button type="button" id="' + rVars.sectionAddUpdateSubmitButton + '" class="btn btn-info btn-lg btn-block">' + formLang.Kaydet + '</button>' +
        '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Iptal + '</button>' +
        '</div>' +
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    $('#' + rVars.sectionShowBase).html(html);
    rVars.form = $('#' + rVars.sectionNameLower + '-form');
    rVars.modal = $('#' + rVars.sectionNameLower + '-modal');
}

function ResimlerRefreshData() {
    GetAddResimlerModalHtml();
    GetResimlerKategoriler();
}