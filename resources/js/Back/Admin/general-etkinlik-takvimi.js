var vars = {
    form: 'form',
    modal: 'modal',
    sectionNameNormal: 'Etkinlik Takvimi',
    sectionNameLower: 'etkinlikTakvimi',
    sectionNameUpper: 'EtkinlikTakvimi',
    sectionPortalController: baseurl + 'Portal/Admin/Etkinlik-Takvimi/',
    sectionController: baseurl + 'Etkinlik-Takvimi/',
    sectionShowBase: '.panel-body',
    sectionGetFunction: 'GetEtkinlikTakvimi',
    sectionAddFunction: 'AddEtkinlikTakvimi',
    sectionUpdateFunction: 'UpdateEtkinlikTakvimi',
    sectionEditFunction: 'EditEtkinlikTakvimi',
    sectionDeleteFunction: 'DeleteEtkinlikTakvimi',
    sectionNumFunction: 'GetEtkinlikTakvimiNum',
    sectionOpenModalButton: 'EtkinlikTakvimiOpenModal',
    sectionAddUpdateSubmitButton: 'EtkinlikTakvimiAddUpdateSubmit',
    sectionEditButton: 'item-edit',
    sectionDeleteButton: 'item-delete',
    sectionIsFirst: true,

    sectionDatas: {
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

            var dataTarget;
            var dataTargetSecond;

            dataTarget = "Sube[]";
            var okul_KoduA = new Array;
            var okul_KoduS = '';
            var okul_KoduC = 0;
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == dataTarget) {
                    var splittedValue = data[i].value.split('-');
                    if (okul_KoduA.indexOf(splittedValue[0]) == -1) {
                        okul_KoduA[okul_KoduC] = splittedValue[0];
                        okul_KoduS += splittedValue[0] + ',';
                        okul_KoduC++;
                    }
                }
            }
            okul_KoduS = okul_KoduS.substring(0, okul_KoduS.length - 1);
            data.push({
                name: 'Okul',
                value: okul_KoduS
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
                        var subelerA = result.data.Sube.split(',');
                        $('input[name=No]').val(result.data.No);
                        $('#tr_Aciklama').val(result.data.tr_Aciklama);
                        $('#en_Aciklama').val(result.data.en_Aciklama);
                        $('#SubeSelect').selectpicker('val', subelerA);
                        $('#Tarih').val(result.data.Tarih);

                        $('.nav-tabs a[href="#turkce-tab"]').tab('show');
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

function GetSubeler() {
    var url = baseurl + 'Genel-Subeler/GetSubeler';
    var subeler = new Array();
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        data:{
            NeedData: "true",
        },
        async: false,
        dataType: 'json',
        success: function(result) {
            var data = result.data;
            var odata = vars.sectionDatas.Okullar;
            var tr_ID = 'SubeSelect';
            var tr_section = 'Sube';
            var dataArrays = new Array();
            var dataArrayNames = new Array('Tumokul', 'Ilkokul', 'Ortaokul', 'AnadoluLisesi');
            var dataArrayCounters = new Array(0, 0, 0, 0);
            dataArrays = {
                Tumokul: new Array(),
                Ilkokul: new Array(),
                Ortaokul: new Array(),
                AnadoluLisesi: new Array(),
            }

            var i;
            var tr_html = '<button type="button" id="SelectTumOkul" class="btn btn-danger btn-sm marginR5 marginB5">Okul</button>' +
                '<button type="button" id="SelectIlkokul" class="btn btn-danger btn-sm marginR5 marginB5">İlkokul</button>' +
                '<button type="button" id="SelectOrtaokul" class="btn btn-danger btn-sm marginR5 marginB5">Ortaokul</button>' +
                '<button type="button" id="SelectAnadolu" class="btn btn-danger btn-sm marginR5 marginB5">Anadolu Lisesi</button>' +
                '<button type="button" id="SelectSifirla" class="btn btn-danger btn-sm marginR5 marginB5">Sıfırla</button>' +
                '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '[]" id="' + tr_ID + '" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';

            for (var i = 0; i < data.length; i++) {
                var okul_Kodu = data[i].Okul;
                for (var j = 1; j < odata.length; j++) {
                    if (okul_Kodu == String(j)) {
                        dataArrays[dataArrayNames[j]][dataArrayCounters[j]] = data[i].Kod;
                        dataArrayCounters[j]++;
                    }
                }
                dataArrays['Tumokul'][dataArrayCounters[0]] = data[i].Kod;
                dataArrayCounters[0]++;

                tr_html += '<option data-tokens="' + data[i].Kod + '" value="' + data[i].Kod + '">' + data[i].Kod + '</option>';
            }
            subeler = [dataArrays['Tumokul'], dataArrays['Ilkokul'], dataArrays['Ortaokul'], dataArrays['AnadoluLisesi']];
            tr_html += '</select>';
            $('#' + tr_section).html(tr_html);
            RefreshSelectpicker();


            $('#' + tr_section).on('click', '#SelectTumOkul', function(e) {
                var $link = $(e.target);
                if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                    var theArray = subeler[0];
                    var olds = $('#' + tr_ID).val();
                    var newA = $.merge($.merge([], theArray), olds);
                    $('#' + tr_ID).selectpicker('val', newA);
                }
                $link.data('lockedAt', +new Date());
            });

            $('#' + tr_section).on('click', '#SelectIlkokul', function(e) {
                var $link = $(e.target);
                if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                    var theArray = subeler[1];
                    var olds = $('#' + tr_ID).val();
                    var newA = $.merge($.merge([], theArray), olds);
                    $('#' + tr_ID).selectpicker('val', newA);
                }
                $link.data('lockedAt', +new Date());
            });

            $('#' + tr_section).on('click', '#SelectOrtaokul', function(e) {
                var $link = $(e.target);
                if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                    var theArray = subeler[2];
                    var olds = $('#' + tr_ID).val();
                    var newA = $.merge($.merge([], theArray), olds);
                    $('#' + tr_ID).selectpicker('val', newA);
                }
                $link.data('lockedAt', +new Date());
            });

            $('#' + tr_section).on('click', '#SelectAnadolu', function(e) {
                var $link = $(e.target);
                if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                    var theArray = subeler[3];
                    var olds = $('#' + tr_ID).val();
                    var newA = $.merge($.merge([], theArray), olds);
                    $('#' + tr_ID).selectpicker('val', newA);
                }
                $link.data('lockedAt', +new Date());
            });

            $('#' + tr_section).on('click', '#SelectSifirla', function(e) {
                $('#' + tr_ID).selectpicker('deselectAll');
                $('#' + tr_ID).selectpicker('val', '');
            });

        },
        error: function() {
            iziError();
        }
    });
    return subeler;
}

function GetEtkinlikTakvimiNum() {
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

function GetEtkinlikTakvimi() {
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
            var odata = vars.sectionDatas.Okullar

            for (var i = 1; i < odata.length; i++) {
                htmls[odata[i].ShowID] = '';
            }

            for (i = 0; i < data.length; i++) {
                okulKodu = data[i].Okul.split(',');
                for (var j = 0; j < okulKodu.length; j++) {
                    for (var k = 1; k < odata.length; k++) {
                        if (okulKodu[j] == k) {
                            var trInside = GetHtmlTr(data[i]);
                            htmls[odata[k].ShowID] += '<tr>' + trInside + '</tr>';
                        }
                    }
                }
            }

            if ($.fn.DataTable.isDataTable('.datatable')) {
                $('.datatable').DataTable().destroy();
            }

            for (var j = 1; j < odata.length; j++) {
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
    var sube = data.Sube;
    var tarih = data.Tarih.split('-');
    tarih = tarih[2] + '.' + tarih[1] + '.' + tarih[0];

    var trEnNames = new Array(
        'Aciklama'
    );

    var trEnDatas = new Array();
    trEnDatas = {
        Aciklama: ''
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


    newHtml =
        '<td class="shorten_content6">' + tarih + '</td>' +
        '<td class="shorten_content6">' + sube + '</td>' +
        '<td class="shorten_content6">' + trEnDatas.Aciklama + '</td>' +
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
        '<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>' +
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
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea rows="3" name="tr_Aciklama" id="tr_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '"></textarea>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<textarea rows="3" name="en_Aciklama" id="en_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '"></textarea>' +
        '</div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Sube + '</label>' +
        '<div id="Sube"></div>' +
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
        '</form>' +
        '</div>' +
        '</div>' +
        '</div>';
    $('#showAddUpdateModal').html(html);
    vars.form = $('#' + vars.sectionNameLower + '-form');
    vars.modal = $('#' + vars.sectionNameLower + '-modal');
}

function GetEtkinlikTakvimiHtml() {
    var html = '';
    var data = vars.sectionDatas.Okullar
    var isFirstJ = true;

    html += '<section id="' + vars.sectionNameLower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
        '<h2>' +
        '<button id="' + vars.sectionOpenModalButton + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        vars.sectionNameNormal +
        '<span id="num" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText+ '">' +

        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    isFirstJ = true;
    for (var j = 1; j < data.length; j++) {
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
    for (var j = 1; j < data.length; j++) {
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
            '<th class="text-center">' + formLang.Sube + '</th>' +
            '<th class="text-center">' + formLang.Aciklama + '</th>' +
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

function RefreshData(refreshSide = 0) {
    GetEtkinlikTakvimi();
    RefreshSideData(refreshSide)
}

var isFirst = true;

function RefreshSideData(refresh = 0) {
    GetEtkinlikTakvimiNum();
    $(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        if (refresh = 1) {
            GetSubeler();
        }
        isFirst = false;

    });
}

function RefreshHtmls() {
    GetEtkinlikTakvimiHtml()
    GetAddUpdateModalHtml()
}