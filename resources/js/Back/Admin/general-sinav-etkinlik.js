var vars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Sınav - Etkinlik',
    sectionNameLower: 'sinavEtkinlik',
    sectionNameUpper: 'SinavEtkinlik',
    sectionPortalController: baseurl + 'Portal/Admin/Sinav-Etkinlik/',
    sectionController: baseurl + 'Sinav-Etkinlik/',
    sectionShowBase: '.panel-body',
    sectionGetFunction: 'GetSinavEtkinlik',
    sectionAddFunction: 'AddSinavEtkinlik',
    sectionUpdateFunction: 'UpdateSinavEtkinlik',
    sectionEditFunction: 'EditSinavEtkinlik',
    sectionDeleteFunction: 'DeleteSinavEtkinlik',
    sectionNumFunction: 'GetSinavEtkinlikNum',
    sectionOpenModalButton: 'SinavEtkinlikOpenModal',
    sectionAddUpdateSubmitButton: 'SinavEtkinlikAddUpdateSubmit',
    sectionEditButton: 'item-edit',
    sectionDeleteButton: 'item-delete',
    sectionIsFirst: true,
};

if (en) {
    var tabsLang = new Array('Sınav', 'Etkinlik');
} else {
    var tabsLang = new Array('Sınav', 'Etkinlik');
}
var tabsShowIDs = new Array('sinav', 'etkinlik');

$(function() {

    //Refresh Page
    RefreshHtmls();
    RefreshData();
    var derslerA = GetDersler();

    //Button that opens add/update modal
    $('#' + vars.sectionOpenModalButton).click(function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            GetSubeler()
            GetSiniflar()
            GetDersler()
            if (en) {
                $('#TRDers').hide();
                $('#ENDers').show();
            } else {
                $('#ENDers').hide();
                $('#TRDers').show();
            }
            var formAction = vars.sectionPortalController + vars.sectionAddFunction;
            var showTab = 'turkce-tab';

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
            //ResetSelectpicker();
            var url = vars.form.attr('action');
            var data = vars.form.serializeArray();
            data.push({
                name: 'English',
                value: String(en)
            });

            var dataTarget;
            var dataTargetSecond;
            if (en) {
                dataTarget = "en_Ders";
                dataTargetSecond = "tr_Ders";
            } else {
                dataTarget = "tr_Ders";
                dataTargetSecond = "en_Ders";
            }
            var firstDers = "";
            var secondaryDers = "";

            for (var i = 0; i < data.length; i++) {
                if (data[i].name == dataTarget) {
                    firstDers = data[i];
                }
                if (data[i].name == dataTargetSecond) {
                    if (firstDers.value != "") {
                        for (var j = 0; j < derslerA.length; j++) {
                            if (en) {
                                if (derslerA[j][0] != undefined && firstDers.value == derslerA[j][1]) {
                                    data[i].value = derslerA[j][0];
                                }
                            } else {
                                if (derslerA[j][1] != undefined && firstDers.value == derslerA[j][0]) {
                                    data[i].value = derslerA[j][1];
                                }
                            }


                        }
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
            GetSubeler()
            GetSiniflar()
                //GetDersler();
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
                        var subelerA = result.data.Sube.split(',');
                        $('input[name=No]').val(result.data.No);
                        $('#tr_Ad').val(result.data.tr_Ad);
                        $('#en_Ad').val(result.data.en_Ad);
                        $('#tr_Aciklama').val(result.data.tr_Aciklama);
                        $('#en_Aciklama').val(result.data.en_Aciklama);

                        $('#TRDers').selectpicker('val', result.data.tr_Ders);
                        $('#ENDers').selectpicker('val', result.data.en_Ders);
                        if (en) {
                            $('#TRDers').hide();
                            $('#ENDers').show();
                        } else {
                            $('#ENDers').hide();
                            $('#TRDers').show();
                        }
                        $('#Sinif').selectpicker('val', result.data.Sinif);
                        $('#Sube').selectpicker('val', subelerA);
                        $('#Tarih').val(result.data.Tarih);
                        $("#" + result.data.SinavEtkinlik).prop("checked", true)

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

function GetSubeler() {
    var url = baseurl + 'Subeler/GetSubeler';
    var subeler = new Array();
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            /*
            var ilkokuls = new Array();
            var ortaokuls = new Array();
            var anadolus = new Array();
            */
            var tr_section = 'Subeler';
            var i;

            var tr_html = '<select class="form-control selectpicker" data-live-search="true" name="Sube[]" id="Sube" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';
            /*'<option data-content="<span id=\'SelectIlkokul\' class=\'btn btn-danger btn-xs\'>Tüm İlkokul</span>" data-tokens="İlkokul Tüm"></option>'+
            '<option data-content="<span id=\'SelectOrtaokul\' class=\'btn btn-danger btn-xs\'>Tüm Ortaokul</span>" data-tokens="Ortaokul Tüm"></option>';*/

            for (var i = 0; i < data.length; i++) {
                /*
                if (data[i].Okul_Kodu == "1") {
                	ilkokuls[i] = data[i].Sube;
                } else if (data[i].Okul_Kodu == "2") {
                	ortaokuls[i] = data[i].Sube;
                } else if (data[i].Okul_Kodu == "3") {
                	anadolus[i] = data[i].Sube;
                }
                */

                subeler[i] = data[i];
                tr_html += '<option data-tokens="' + data[i].Sube + '" value="' + data[i].Sube + '">' + data[i].Sube + '</option>';
            }
            tr_html += '</select>';
            $('#' + tr_section).html(tr_html);
            RefreshSelectpicker();
            /*
      var ilkokulButton = $('#SelectIlkokul').parent("a:first")
      $('#'+tr_section).on('click', ilkokulButton, function(e){
		  	$('#Sube').selectpicker('val', ilkokuls);
				console.log('selected:'+ilkokuls.length)
		  });
		  */
        },
        error: function() {
            iziError();
        }
    });
    return subeler;
}

function GetSiniflar() {
    var url = baseurl + 'Siniflar/GetSiniflar';
    var siniflar = new Array();
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var tr_section = 'Siniflar'
            var i;
            for (i = 0; i < data.length; i++) {
                var tr_Okul = data[i].tr_Okul;
                var en_Okul = data[i].en_Okul;
                var sinifN = data[i].Sinif;
                var sinif = [tr_Okul, en_Okul, sinifN];
                siniflar[i] = sinif;
            }

            var tr_html = '<select class="form-control selectpicker" data-live-search="true" name="Sinif" id="Sinif" title="' + formLang.SinifSec + '" data-liveSearchNormalize="true">';

            for (var i = 0; i < siniflar.length; i++) {
                var Ad;
                var Sinif = siniflar[i][2];
                if (en) {
                    if (siniflar[i][1] == "") {
                        Ad = siniflar[i][0];
                    } else {
                        Ad = siniflar[i][1];
                    }
                    tr_html += '<option data-tokens="' + Ad + '" value="' + Sinif + '">' + Sinif + ' (' + Ad + ')</option>';
                } else {
                    Ad = siniflar[i][0];
                    tr_html += '<option data-tokens="' + Ad + '" value="' + Sinif + '">' + Sinif + ' (' + Ad + ')</option>';
                }
            }
            tr_html += '</select>';
            $('#' + tr_section).html(tr_html);
            RefreshSelectpicker();
        },
        error: function() {
            iziError();
        }
    });
    return siniflar;
}

function GetDersler() {
    var url = baseurl + 'Dersler/GetDersler';
    var dersler = new Array();
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var tr_section = 'TRDers'
            var en_section = 'ENDers'
            var i;
            for (i = 0; i < data.length; i++) {
                var tr_Ad = data[i].tr_Ad;
                var en_Ad = data[i].en_Ad;
                var ders = [tr_Ad, en_Ad];
                dersler[i] = ders;
            }

            var tr_html = '<select class="form-control selectpicker" data-live-search="true" name="tr_Ders" id="tr_Ders" title="' + formLang.DersSec + '" data-liveSearchNormalize="true">';
            var en_html = '<select class="form-control selectpicker" data-live-search="true" name="en_Ders" id="en_Ders" title="' + formLang.DersSec + '" data-liveSearchNormalize="true">';


            for (var i = 0; i < dersler.length; i++) {
                var Ad;
                if (en) {
                    if (dersler[i][1] == "") {
                        Ad = dersler[i][0];
                    } else {
                        Ad = dersler[i][1];
                    }
                    tr_html += '<option data-tokens="' + Ad + '" value="' + dersler[i][0] + '">' + Ad + '</option>';
                    en_html += '<option data-tokens="' + Ad + '" value="' + dersler[i][1] + '">' + Ad + '</option>';
                } else {
                    Ad = dersler[i][0];
                    tr_html += '<option data-tokens="' + Ad + '" value="' + dersler[i][0] + '">' + Ad + '</option>';
                    en_html += '<option data-tokens="' + Ad + '" value="' + dersler[i][1] + '">' + Ad + '</option>';
                }
            }
            tr_html += '</select>';
            en_html += '</select>';
            $('#' + tr_section).html(tr_html);
            $('#' + en_section).html(en_html);
            RefreshSelectpicker();
        },
        error: function() {
            iziError();
        }
    });
    return dersler;
}

function GetSinavEtkinlikNum() {
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

function GetSinavEtkinlik() {
    var url = vars.sectionController + vars.sectionGetFunction;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var htmls = {
                sinav: '',
                etkinlik: '',
            };
            var i;

            if ($.fn.DataTable.isDataTable('.datatable')) {
                $('.datatable').DataTable().destroy();
            }

            for (i = 0; i < data.length; i++) {
                if (data[i].SinavEtkinlik == "Sinav") {
                    var trInside = GetHtmlTr(data[i]);
                    htmls[tabsShowIDs[0]] += '<tr>' + trInside + '</tr>';
                } else if (data[i].SinavEtkinlik == "Etkinlik") {
                    var trInside = GetHtmlTr(data[i]);
                    htmls[tabsShowIDs[1]] += '<tr>' + trInside + '</tr>';
                }
            }

            for (var j = 0; j < tabsShowIDs.length; j++) {
                $('#show' + vars.sectionNameUpper + 'Data' + tabsShowIDs[j]).html(htmls[tabsShowIDs[j]]);
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
    var No = data.No;
    var Sinif = data.Sinif;
    var Sube = data.Sube;
    var Tarih = data.Tarih;
    var dateAr = Tarih.split('-');
    Tarih = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];

    var Ad;
    var Aciklama;
    var Ders;

    var TRAd = data.tr_Ad;
    var TRAciklama = data.tr_Aciklama;
    var TRDers = data.tr_Ders;

    var ENAd = data.en_Ad;
    var ENAciklama = data.en_Aciklama;
    var ENDers = data.en_Ders;

    if (ENAd == "") {
        Ad = TRAd;
    } else {
        Ad = TRAd + ' | ' + ENAd;
    }

    if (ENAciklama == "") {
        Aciklama = TRAciklama;
    } else {
        Aciklama = TRAciklama + ' | ' + ENAciklama;
    }

    if (ENDers == "") {
        Ders = TRDers;
    } else {
        Ders = TRDers + ' | ' + ENDers;
    }

    newHtml =
        '<td class="shorten_content6">' + Ad + '</td>' +
        '<td class="shorten_content6">' + Aciklama + '</td>' +
        '<td class="shorten_content6">' + Sinif + '</td>' +
        '<td class="shorten_content6">' + Sube + '</td>' +
        '<td class="shorten_content6">' + Ders + '</td>' +
        '<td class="shorten_content6">' + Tarih + '</td>' +
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
        '<label>' + formLang.Ad + '</label>' +
        '<input name="tr_Ad" id="tr_Ad" class="form-control" type="text" placeholder="' + formLang.Ad + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea rows="3" name="tr_Aciklama" id="tr_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '"></textarea>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="ingilizce-tab">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ad + '</label>' +
        '<input name="en_Ad" id="en_Ad" class="form-control" type="text" placeholder="' + formLang.Ad + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea rows="3" name="en_Aciklama" id="en_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '"></textarea>' +
        '</div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Sinif + '</label>' +
        '<div id="Siniflar"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Sube + '</label>' +
        '<div id="Subeler"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ders + '</label>' +
        '<div id="TRDers"></div>' +
        '<div id="ENDers"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tarih + '</label>' +
        '<input name="Tarih" id="Tarih" class="form-control" type="date">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Sinav + '</label> ' +
        '<input type="radio" name="SinavEtkinlik" id="Sinav" value="Sinav">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Etkinlik + '</label> ' +
        '<input type="radio" name="SinavEtkinlik" id="Etkinlik" value="Etkinlik">' +
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

function GetSinavEtkinlikHtml() {
    var html = '';
    var Animation = 'bounceInUp';
    var SinavEtkinlikAnimation = 'fadeIn';
    var SinavEtkinlikAnimationDelay = (Number(wowDelayS) + 0.8);
    var isFirstJ = true;

    html += '<section id="' + vars.sectionNameLower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center wow ' + SinavEtkinlikAnimation + '" data-wow-delay="' + SinavEtkinlikAnimationDelay + 's">' +
        '<h2>' +
        '<button id="' + vars.sectionOpenModalButton + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        '<button id="' + rVars.sectionButtons.OpenModal + '" style="float: left; margin-left: 5px;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAddImage + '" aria-hidden="true"></i></button>' +
        vars.sectionNameNormal +
        '<span id="num" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + SinavEtkinlikAnimation + '" data-wow-delay="' + SinavEtkinlikAnimationDelay + 's">' +

        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    isFirstJ = true;
    for (var j = 0; j < tabsShowIDs.length; j++) {
        if (isFirstJ) {
            html += '<li class="active"><a href="#' + tabsShowIDs[j] + '" data-toggle="tab">' + tabsLang[j] + '</a></li>';
            isFirstJ = false;
        } else {
            html += '<li><a href="#' + tabsShowIDs[j] + '" data-toggle="tab">' + tabsLang[j] + '</a></li>';
        }
    }

    html += '</ul>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="tab-content">';

    isFirstJ = true;
    for (var j = 0; j < tabsShowIDs.length; j++) {
        if (isFirstJ) {
            html += '<div class="tab-pane fade in active" id="' + tabsShowIDs[j] + '">';
            isFirstJ = false;
        } else {
            html += '<div class="tab-pane fade" id="' + tabsShowIDs[j] + '">';
        }
        html += '<div class="table-responsive">' +
            '<table class="table table-bordered table-hover datatable">' +
            '<thead class="text-center">' +
            '<th class="text-center">' + formLang.Ad + '</th>' +
            '<th class="text-center">' + formLang.Aciklama + '</th>' +
            '<th class="text-center">' + formLang.Sinif + '</th>' +
            '<th class="text-center">' + formLang.Sube + '</th>' +
            '<th class="text-center">' + formLang.Ders + '</th>' +
            '<th class="text-center">' + formLang.Tarih + '</th>' +
            '<th class="text-center">' + formLang.Duzenle + '</th>' +
            '<th class="text-center">' + formLang.Sil + '</th>' +
            '</thead>' +
            '<tbody id="show' + vars.sectionNameUpper + 'Data' + tabsShowIDs[j] + '">' +
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
    GetSinavEtkinlik();
    RefreshSideData()
}
var isFirst = true;

function RefreshSideData() {
    GetSinavEtkinlikNum();
    $(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    });
}

function RefreshHtmls() {
    GetSinavEtkinlikHtml()
    GetAddUpdateModalHtml()
}