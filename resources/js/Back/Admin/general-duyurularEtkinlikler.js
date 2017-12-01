var vars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Duyurular - Etkinlikler',
    sectionNameLower: 'duyurularEtkinlikler',
    sectionNameUpper: 'DuyurularEtkinlikler',
    sectionPortalController: baseurl + 'Portal/Admin/Duyurular-Etkinlikler/',
    sectionController: baseurl + 'Duyurular-Etkinlikler/',
    sectionShowBase: '.panel-body',
    sectionGetFunction: 'GetDuyurularEtkinlikler',
    sectionAddFunction: 'AddDuyurularEtkinlikler',
    sectionUpdateFunction: 'UpdateDuyurularEtkinlikler',
    sectionEditFunction: 'EditDuyurularEtkinlikler',
    sectionDeleteFunction: 'DeleteDuyurularEtkinlikler',
    sectionNumFunction: 'GetDuyurularEtkinliklerNum',
    sectionOpenModalButton: 'DuyurularEtkinliklerOpenModal',
    sectionAddUpdateSubmitButton: 'DuyurularEtkinliklerAddUpdateSubmit',
    sectionEditButton: 'item-edit',
    sectionDeleteButton: 'item-delete',
    sectionIsFirst: true,

    sectionDatas: {
        Resimler: GetResimlerData(),
        Okullar: GetOkullarData(),
    }
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
            $('.nav-tabs a[href="#' + formTabs.Turkce + '"]').tab('show');
            $(vars.modal).modal('show');
        }
        $link.data('lockedAt', +new Date());
    });

    //Button for posting data for add/update
    $('#' + vars.sectionAddUpdateSubmitButton).click(function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var url = vars.form.attr('action');
            var data = vars.form.serializeArray();
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
                        if (response.type == 'add') {
                            $(vars.modal).modal('hide');
                            RefreshData();

                        } else if (response.type == 'update') {
                            var no = response.data.No;
                            var trInside = GetHtmlTr(response.data);
                            $(vars.modal).modal('hide');
                            $('tr .' + vars.sectionEditButton + '[data=' + no + ']').parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                $('tr .' + vars.sectionEditButton + '[data=' + no + ']').parents('tr:first').html(trInside);
                                RefreshData();
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                        }
                        iziSuccess();
                    } else {
                        var ajaxGroup;
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            RefreshData(1)

                            $(vars.modal).modal('hide');
                            iziError();
                        }
                    }
                },
                error: function() {
                    RefreshData(1)
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
                        var Okul_KoduArray = result.data.Okul_Kodu.split(',');
                        var tr_DigerResimlerArray = result.data.tr_DigerResimler.split(',');
                        var en_DigerResimlerArray = result.data.en_DigerResimler.split(',');
                        $('input[name=No]').val(result.data.No);
                        $('input[name=tr_Baslik]').val(result.data.tr_Baslik);
                        $('input[name=en_Baslik]').val(result.data.en_Baslik);
                        $('#tr_AnaResimSelect').selectpicker('val', result.data.tr_AnaResim);
                        $('#tr_DigerResimlerSelect').selectpicker('val', tr_DigerResimlerArray);
                        $('#en_AnaResimSelect').selectpicker('val', result.data.en_AnaResim);
                        $('#en_DigerResimlerSelect').selectpicker('val', en_DigerResimlerArray);
                        $('textarea[name=tr_Yazi]').val(result.data.tr_Yazi);
                        $('textarea[name=en_Yazi]').val(result.data.en_Yazi);
                        $('#Okul_KoduSelect').selectpicker('val', Okul_KoduArray);
                        $('input[name=Tarih]').val(result.data.Tarih);

                        $('.nav-tabs a[href="#' + formTabs['Turkce'] + '"]').tab('show');
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

function GetOkullar() {

    var i;
    var html = '';
    var tr_ID = 'Okul_KoduSelect';
    var tr_section = 'Okul_Kodu';

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '[]" id="' + tr_ID + '" title="' + formLang.OkulSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';

    for (var i = 0; i < vars.sectionDatas.Okullar.length; i++) {

        html += '<option data-tokens="' + vars.sectionDatas.Okullar[i].Ad + '" value="' + vars.sectionDatas.Okullar[i].Kod + '">' + vars.sectionDatas.Okullar[i].Ad + '</option>';

    }

    html += '</select>'
    $('#' + tr_section).html(html);
    RefreshSelectpicker();
}

function GetResimler() {
    
            var i;
            var tr_AnaID = 'tr_AnaResimSelect';
            var tr_AnaSection = 'tr_AnaResim';
            var en_AnaID = 'en_AnaResimSelect';
            var en_AnaSection = 'en_AnaResim';

            var tr_DigerID = 'tr_DigerResimlerSelect';
            var tr_DigerSection = 'tr_DigerResimler';
            var en_DigerID = 'en_DigerResimlerSelect';
            var en_DigerSection = 'en_DigerResimler';

            var tr_Anahtml = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_AnaSection + '" id="' + tr_AnaID + '" title="' + formLang.AnaResimSec + '" data-liveSearchNormalize="true">';
            var tr_Digerhtml = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_DigerSection + '[]" id="' + tr_DigerID + '" title="' + formLang.DigerResimlerSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';

            var en_Anahtml = '<select class="form-control selectpicker" data-live-search="true" name="' + en_AnaSection + '" id="' + en_AnaID + '" title="' + formLang.AnaResimSec + '" data-liveSearchNormalize="true">' + '<option data-tokens="' + formLang.AnaResimSecTokens + '" value="0">' + formLang.AnaResimSecUse + '</option>';
            var en_Digerhtml = '<select class="form-control selectpicker" data-live-search="true" name="' + en_DigerSection + '[]" id="' + en_DigerID + '" title="' + formLang.DigerResimlerSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">' + '<option data-tokens="' + formLang.DigerResimlerSecTokens + '" value="0">' + formLang.DigerResimlerSecUse + '</option>';


            var lastParts = '';
            var data = vars.sectionDatas.Resimler.Data;
            for (i = 0; i < data.length; i++) {
                lastParts += '<option data-tokens="' + data[i].Kategoriler + '/' + data[i].RDosya + ' ' + data[i].RIsim + ' ' + data[i].RKategoriler + '" value="' + data[i].RKategoriler + '/' + data[i].RDosya + '">' + data[i].RIsim + ' (' + data[i].RKategoriler + ')</option>';
            }

            lastParts += '</select>';
            tr_Anahtml += lastParts
            tr_Digerhtml += lastParts

            en_Anahtml += lastParts
            en_Digerhtml += lastParts
            $('#' + tr_AnaSection).html(tr_Anahtml);
            $('#' + tr_DigerSection).html(tr_Digerhtml);

            $('#' + en_AnaSection).html(en_Anahtml);
            $('#' + en_DigerSection).html(en_Digerhtml);

            RefreshSelectpicker();
        
}

function GetDuyurularEtkinliklerNum() {
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

//functions

function GetDuyurularEtkinlikler() {
    var url = vars.sectionController + vars.sectionGetFunction;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var i;
            var okulKodu;
            var htmls = new Array();

            for (var i = 0; i < vars.sectionDatas.Okullar.length; i++) {
                htmls[vars.sectionDatas.Okullar[i].ShowID] = '';
            }

            for (i = 0; i < data.length; i++) {
                okulKodu = data[i].Okul_Kodu.split(',');

                for (var j = 0; j < okulKodu.length; j++) {
                    for (var k = 0; k < vars.sectionDatas.Okullar.length; k++) {
                        if (okulKodu[j] == k) {
                            var trInside = GetHtmlTr(data[i]);
                            htmls[vars.sectionDatas.Okullar[k].ShowID] += '<tr>' + trInside + '</tr>';
                        }
                    }
                }
            }

            if ($.fn.DataTable.isDataTable('.datatable')) {
                $('.datatable').DataTable().destroy();
            }

            for (var j = 0; j < vars.sectionDatas.Okullar.length; j++) {
                $('#show' + vars.sectionNameUpper + 'Data' + vars.sectionDatas.Okullar[j].ShowID).html(htmls[vars.sectionDatas.Okullar[j].ShowID]);
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
    var tarih = data.Tarih.split('-');
    tarih = tarih[2] + '.' + tarih[1] + '.' + tarih[0];

    var trEnNames = new Array(
        'Baslik',
    );

    var trEnDatas = new Array();
    trEnDatas = {
        Baslik: '',
    }

    for (var i = 0; i < trEnNames.length; i++) {
        var trData = 'tr_' + trEnNames[i];
        var enData = 'en_' + trEnNames[i];
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
        '<td class="shorten_content6">' + tarih + '</td>' +
        '<td class="shorten_content6">' + trEnDatas.Baslik + '</td>' +
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
        '<img class="maxW150" src="' + logoUrl + '">' +
        modalOpts.ModalCloseButton +
        '</div>' +
        '<form role="form" method="post" id="' + vars.sectionNameLower + '-form" class="form-horizontal" action="' + vars.sectionPortalController + vars.sectionAddFunction + '">' +
        '<div class="modal-body">' +
        '<ul class="nav nav-tabs" role="tablist">' +
        '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#' + formTabs.Turkce + '" aria-controls="' + formTabs.Turkce + '" role="tab" data-toggle="tab">' + formLang.Turkce + '</a></li>' +
        '<li role="presentation"><a class="hvr-wobble-top" href="#' + formTabs.Ingilizce + '" aria-controls="' + formTabs.Ingilizce + '" role="tab" data-toggle="tab">' + formLang.Ingilizce + '</a></li>' +
        '</ul>' +
        '<div class="tab-content">' +
        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div role="tabpanel" class="tab-pane fade in active" id="' + formTabs.Turkce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input name="tr_Baslik" id="tr_Baslik" class="form-control" type="text" placeholder="' + formLang.Baslik + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.AnaResim + '</label>' +
        '<div id="tr_AnaResim"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.DigerResimler + '</label>' +
        '<div id="tr_DigerResimler"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Yazi + '</label> <br>' +
        '<textarea name="tr_Yazi" id="tr_Yazi" class="form-control" placeholder="' + formLang.Yazi + '" rows="5"></textarea>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input name="en_Baslik" id="en_Baslik" class="form-control" type="text" placeholder="' + formLang.Baslik + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.AnaResim + '</label>' +
        '<div id="en_AnaResim"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.DigerResimler + '</label>' +
        '<div id="en_DigerResimler"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Yazi + '</label>' +
        '<textarea name="en_Yazi" id="en_Yazi" class="form-control" placeholder="' + formLang.Yazi + '" rows="5"></textarea>' +
        '</div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Okullar + '</label>' +
        '<div id="Okul_Kodu"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tarih + '</label>' +
        '<input name="Tarih" id="Tarih" class="form-control" type="date" placeholder="' + formLang.Tarih + '">' +
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

function GetDuyurularEtkinliklerHtml() {
    var html = '';
    var isFirstJ = true;
    var data = vars.sectionDatas.Okullar;
    console.log(data);

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
            '<th class="text-center">' + formLang.Tarih + '</th>' +
            '<th class="text-center">' + formLang.Baslik + '</th>' +
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
        '</div>' +
        '</section>';

    $('#show' + vars.sectionNameUpper).html(html);
}

function RefreshData(refreshSide = 0) {
    GetDuyurularEtkinlikler();
    RefreshSideData(refreshSide)
}

var isFirst = true;

function RefreshSideData(refresh = 0) {
    GetDuyurularEtkinliklerNum();
    $(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        if (refresh = 1) {
            GetOkullar();
            GetResimler();
        }
        isFirst = false;

    });
}

function RefreshHtmls() {
    GetDuyurularEtkinliklerHtml()
    GetAddUpdateModalHtml()
}