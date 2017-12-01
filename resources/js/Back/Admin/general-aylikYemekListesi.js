var vars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Aylık Yemek Listesi',
    sectionNameLower: 'aylikYemekListesi',
    sectionNameUpper: 'AylikYemekListesi',
    sectionPortalController: baseurl + 'Portal/Admin/Aylik-Yemek-Listesi/',
    sectionController: baseurl + 'Aylik-Yemek-Listesi/',
    sectionShowBase: '.panel-body',
    sectionGetFunction: 'GetAylikYemekListesi',
    sectionAddFunction: 'AddAylikYemekListesi',
    sectionUpdateFunction: 'UpdateAylikYemekListesi',
    sectionEditFunction: 'EditAylikYemekListesi',
    sectionDeleteFunction: 'DeleteAylikYemekListesi',
    sectionNumFunction: 'GetAylikYemekListesiNum',
    sectionOpenModalButton: 'AylikYemekListesiOpenModal',
    sectionAddUpdateSubmitButton: 'AylikYemekListesiAddUpdateSubmit',
    sectionEditButton: 'item-edit',
    sectionDeleteButton: 'item-delete',
    sectionIsFirst: true,

    sectionDatas: {
        Okullar: GetOkullarData(),
        Resimler: GetResimlerData(),
    }
};

$(function() {

    //Refresh Page
    RefreshHtmls();
    RefreshData();

    //Button that opens add/update modal
    $('#' + vars.sectionOpenModalButton).click(function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var formAction = vars.sectionPortalController + vars.sectionAddFunction;
            var showTab = 'turkce-tab';
            GetOkullar();
            GetResimler();
            $(vars.form).attr('action', formAction);
            ResetForm(vars.form);
            $('.nav-tabs a[href="#' + showTab + '"]').tab('show');
            $(vars.modal).modal('show');
        }
        $link.data('lockedAt', +new Date());
    });

    //Button for posting data for add/update
    $('#' + vars.sectionAddUpdateSubmitButton).click(function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            ResetSelectpicker();
            var url = vars.form.attr('action');
            var data = vars.form.serializeArray();
            data.push({
                name: 'English',
                value: String(en)
            });
            var dataTarget = "Tarih";
            var dataTargetSecond;

            for (var i = 0; i < data.length; i++) {
                var tarih;
                if (data[i].name == dataTarget) {
                    tarih = data[i];
                    if (tarih.value != "") {
                        var dateAr = tarih.value.split('-');
                        dateAr[2] = "01";
                        tarih = dateAr[0] + '-' + dateAr[1] + '-' + dateAr[2];
                        data[i].value = tarih;
                    }
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
                    console.log(response.deneme)
                    ResetFormErrors();
                    if (response.success) {
                        if (response.type == 'add') {
                            RefreshData();
                            $(vars.modal).modal('hide');

                        } else if (response.type == 'update') {
                            var No = response.data.No;
                            var trInside = GetHtmlTr(response.data);
                            RefreshSideData()
                            $(vars.modal).modal('hide');
                            $('tr .item-edit[data=' + No + ']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                $('tr .item-edit[data=' + No + ']').parents('tr:first').html(trInside);
                                RefreshSideData();
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                        }
                        iziSuccess();
                    } else {
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            RefreshData()

                            $(vars.modal).modal('hide');
                            iziError();
                        }
                    }
                },
                error: function() {
                    RefreshData()
                    $(vars.modal).modal('hide');
                    iziError();
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

    //Button for editing
    $(vars.sectionShowBase).on('click', '.' + vars.sectionEditButton, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var No = $(this).attr('data');
            $(vars.form).attr('action', vars.sectionPortalController + vars.sectionUpdateFunction);
            GetOkullar();
            GetResimler();
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
                    ResetFormErrors();
                    if (result.success) {
                        ResetForm(vars.form);
                        var curOkullarArray = result.data.Okul.split(',');
                        $('input[name=No]').val(result.data.No);
                        $('#tr_Baslik').val(result.data.tr_Baslik);
                        $('#en_Baslik').val(result.data.en_Baslik);
                        $('#tr_Resim').selectpicker('val', result.data.tr_Resim);
                        $('#en_Resim').selectpicker('val', result.data.en_Resim);
                        $('#Okuls').selectpicker('val', curOkullarArray);
                        $('#Tarih').val(result.data.Tarih);

                        $('.nav-tabs a[href="#turkce-tab"]').tab('show');
                        $(vars.modal).modal('show');
                    } else {
                        RefreshData()
                        iziError();
                    }

                },
                error: function() {
                    RefreshData()
                    iziError();
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

    //Button for deleting
    $(vars.sectionShowBase).on('click', '.' + vars.sectionDeleteButton, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var btn = $(this);
            var No = $(this).attr('data');

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
                                No: No
                            },
                            dataType: 'json',
                            success: function(result) {
                                if (result.success) {
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');

                                    $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() {
                                        $(this).remove();
                                        RefreshData()
                                    });

                                    iziSuccess();
                                } else {
                                    RefreshData()
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');
                                    iziError();
                                }
                            },
                            error: function() {
                                RefreshData()
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

function GetOkullar() {
    var data = vars.sectionDatas.Okullar
    var section = 'Okul';
    var i;

    var html = '<select class="form-control selectpicker" data-live-search="true" name="Okul[]" id="Okuls" title="' + formLang.OkulSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';

    for (var i = 0; i < data.length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + i + '">' + data[i].Ad + '</option>';
    }
    html += '</select>';
    $('#' + section).html(html);
    RefreshSelectpicker();

}

function GetResimler() {
    var data = vars.sectionDatas.Resimler.Data;
    var i;
    var tr_section = 'TRResim';
    var en_section = 'ENResim';
    var tr_html = '<select class="form-control selectpicker" data-live-search="true" name="tr_Resim" id="tr_Resim" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true">';
    var en_html = '<select class="form-control selectpicker" data-live-search="true" name="en_Resim" id="en_Resim" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true">' + '<option data-tokens="' + formLang.ResimSecTokens + '" value="0">' + formLang.ResimSecUse + '</option>';

    var lastParts = '';
    for (i = 0; i < data.length; i++) {
        lastParts += '<option data-tokens="' + data[i].RKategoriler + '/' + data[i].RDosya + ' ' + data[i].RIsim + ' ' + data[i].RKategoriler + '" value="' + data[i].RKategoriler + '/' + data[i].RDosya + '">' + data[i].RIsim + ' (' + data[i].RKategoriler + ')</option>';
    }
    lastParts += '</select>';
    tr_html += lastParts
    en_html += lastParts
    $('#' + tr_section).html(tr_html);
    $('#' + en_section).html(en_html);

    RefreshSelectpicker();

}

function GetAylikYemekListesiNum() {
    var url = vars.sectionController + vars.sectionNumFunction;

    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var html = data;
            $('#num').html(html);
        },
        error: function() {
            iziError();
        }
    });
}

function GetAylikYemekListesi() {
    var url = vars.sectionController + vars.sectionGetFunction;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var okulKodu;
            var htmls = new Array();
            var odata = vars.sectionDatas.Okullar
            for (var i = 0; i < odata.length; i++) {
                htmls[odata[i].ShowID] = '';
            }
            var i;
            if ($.fn.DataTable.isDataTable('.datatable')) {
                $('.datatable').DataTable().destroy();
            }

            for (i = 0; i < data.length; i++) {
                okulKodu = data[i].Okul.split(',');

                for (var j = 0; j < okulKodu.length; j++) {
                    for (var k = 0; k < odata.length; k++) {
                        if (okulKodu[j] == k) {
                            var trInside = GetHtmlTr(data[i]);
                            htmls[odata[k].ShowID] += '<tr>' + trInside + '</tr>';
                        }
                    }
                }
            }
            for (var j = 0; j < odata.length; j++) {
                $('#show' + vars.sectionNameUpper + 'Data' + odata[j].ShowID).html(htmls[odata[j].ShowID]);
            }
            if (!vars.sectionIsFirst) {
                CreateDataTables();
            }
            vars.sectionIsFirst = false;
        },
        error: function() {
            iziError();
        }
    });
}

function GetHtmlTr(data) {
    var no = data.No;
    var tarih = data.Tarih;
    var dateAr = tarih.split('-');
    tarih = dateAr[0] + '.' + dateAr[1];

    var Baslik;
    var Resim;

    var TRBaslik = data.tr_Baslik;
    var TRResim = data.tr_Resim;

    var ENBaslik = data.en_Baslik;
    var ENResim = data.en_Resim;

    if (ENBaslik == "") {
        Baslik = TRBaslik;
    } else {
        Baslik = TRBaslik + ' | ' + ENBaslik;
    }
    if (ENResim == "") {
        Resim = TRResim;
    } else {
        Resim = TRResim + ' | ' + ENResim;
    }

    newHtml =
        '<td class="shorten_content6">' + Baslik + '</td>' +
        '<td class="shorten_content6">' + Resim + '</td>' +
        '<td class="shorten_content6">' + tarih + '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + vars.sectionEditButton + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + vars.sectionDeleteButton + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
        '</td>';
    return newHtml;
}

function GetAddUpdateModalHtml() {
    var html = '<div class="modal fade ajax-modal" id="' + vars.sectionNameLower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header" align="center">' +
        '<img class="maxW150" src="' + baseurl + 'resources/images/aek-logo.png">' +
        '<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>' +
        '</div>' +
        '<form role="form" method="post" id="' + vars.sectionNameLower + '-form" class="form-horizontal" action="' + vars.sectionPortalController + vars.sectionAddFunction + '">' +
        '<div class="modal-body">' +
        '<ul class="nav nav-tabs" role="tablist">' +
        '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#turkce-tab" aria-controls="turkce-tab" role="tab" data-toggle="tab">' + formLang.Turkce + '</a></li>' +
        '<li role="presentation"><a class="hvr-wobble-top" href="#ingilizce-tab" aria-controls="ingilizce-tab" role="tab" data-toggle="tab">' + formLang.Ingilizce + '</a></li>' +
        '</ul>' +
        '<div class="tab-content">' +
        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div role="tabpanel" class="tab-pane fade in active" id="turkce-tab">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input name="tr_Baslik" id="tr_Baslik" class="form-control" type="text" placeholder="' + formLang.Baslik + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="TRResim"></div>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="ingilizce-tab">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input name="en_Baslik" id="en_Baslik" class="form-control" type="text" placeholder="' + formLang.Baslik + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="ENResim"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Okul + '</label>' +
        '<div id="Okul"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tarih + '</label>' +
        '<input name="Tarih" id="Tarih" class="form-control" type="date">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" id="' + vars.sectionAddUpdateSubmitButton + '" class="btn btn-info btn-lg btn-block">' + formLang.Kaydet + '</button>' +
        '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Iptal + '</button>' +
        '</div>' +
        '</form> ' +
        '</div>' +
        '</div>' +
        '</div>';
    $('#showAddUpdateModal').html(html);
    vars.form = $('#' + vars.sectionNameLower + '-form');
    vars.modal = $('#' + vars.sectionNameLower + '-modal');
}

function GetAylikYemekListesiHtml() {
    var html = '';
    var isFirstJ = true;
    var data = vars.sectionDatas.Okullar;

    html += '<section id="' + vars.sectionNameLower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
        '<h2>' +
        '<button id="' + vars.sectionOpenModalButton + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        '<button id="' + rVars.sectionOpenModalButton + '" style="float: left; margin-left: 5px;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAddImage + '" aria-hidden="true"></i></button>' +
        vars.sectionNameNormal +
        '<span id="num" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    isFirstJ = true;
    for (var j = 0; j < data.length; j++) {
        if (isFirstJ) {
            html += '<li class="active"><a href="#' + data[j].ShowID + '" data-toggle="tab">' + data[j].Ad + '</a></li>';
            isFirstJ = false;
        } else {
            html += '<li><a href="#' + data[j].ShowID + '" data-toggle="tab">' + data[j].Ad + '</a></li>';
        }
    }

    html += '</ul>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="tab-content">';

    isFirstJ = true;
    for (var j = 0; j < data.length; j++) {
        if (isFirstJ) {
            html += '<div class="tab-pane fade in active" id="' + data[j].ShowID + '">';
            isFirstJ = false;
        } else {
            html += '<div class="tab-pane fade" id="' + data[j].ShowID + '">';
        }
        html += '<div class="table-responsive">' +
            '<table class="table table-bordered table-hover datatable">' +
            '<thead class="text-center">' +
            '<th class="text-center">' + formLang.Baslik + '</th>' +
            '<th class="text-center">' + formLang.Resim + '</th>' +
            '<th class="text-center">' + formLang.Tarih + '</th>' +
            '<th class="text-center">' + formLang.Duzenle + '</th>' +
            '<th class="text-center">' + formLang.Sil + '</th>' +
            '</thead>' +
            '<tbody id="show' + vars.sectionNameUpper + 'Data' + data[j].ShowID + '">' +
            '</tbody>' +
            '</table>' +
            '</div>' +
            '</div>';
    }



    html += '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div id="showAddUpdateModal"></div>' +
        '<div id="ShowAddResimModal"></div>' +
        '</div>' +
        '</section>';

    $('#show' + vars.sectionNameUpper).html(html);
}

function RefreshData() {
    GetAylikYemekListesi();
    RefreshSideData()
}
var isFirst = true;

function RefreshSideData() {
    GetAylikYemekListesiNum();
    $(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    });
}

function RefreshHtmls() {
    GetAylikYemekListesiHtml()
    GetAddUpdateModalHtml()
}