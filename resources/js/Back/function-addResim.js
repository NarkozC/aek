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
    GetAllAddResim();
});

function GetAllAddResim() {

    $(function() {

        if ($('#' + rVars.sectionShowBases.Modal).length <= 0) {
            $('#' + vars.sectionShowBases.Sections).append('<div id="' + rVars.sectionShowBases.Modal + '"></div> ');
        }
        GetResimlerModalHtml();
        GetKategorilerSelect();


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
                                var uploadURI = rVars.sectionControllers.Portal + rVars.sectionFunctions.Upload;
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
                                    $(rVars.sectionObjects.Modal).modal('hide');
                                    willRefresh = true;
                                }
                            }

                            if (willRefresh) {
                                setTimeout(function() {
                                    GetResimlerData()
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
        var i, data = rVars.sectionDatas.Kategoriler,
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
            '<label>' + formLang.Isim + '</label>' +
            '<input name="RIsim" id="RIsim" class="form-control" type="text" placeholder="' + formLang.Isim + '">' +
            '</div>' +
            '<div class="ajax-group col-sm-12 paddingLR0">' +
            '<label>' + formLang.Kategori + '</label>' +
            '<div id="' + rVars.sectionSPs.Kategori + '"></div>' +
            '</div>' +
            '<div class="ajax-group col-sm-12 paddingLR0">' +
            '<label>' + formLang.Dosya + '</label>' +
            '<input type="file" name="RDosya" class="form-control" id="RDosya" placeholder="' + formLang.Dosya + '" multiple>' +
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
}