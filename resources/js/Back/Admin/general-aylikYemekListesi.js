var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Aylik-Yemek-Listesi/',
        Portal: baseurl + 'Portal/Admin/Aylik-Yemek-Listesi/',
    },
    sectionNames: {
        Normal: 'Aylık Yemek Listesi',
        Upper: 'AylikYemekListesi',
        Lower: 'aylikYemekListesi',
    },
    sectionShowBases: {
        Sections: 'showAylikYemekListesi',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetAylikYemekListesi',
        Add: 'AddAylikYemekListesi',
        Update: 'UpdateAylikYemekListesi',
        Edit: 'EditAylikYemekListesi',
        Delete: 'DeleteAylikYemekListesi',
    },
    sectionButtons: {
        OpenModal: 'AylikYemekListesiOpenModal',
        Submit: 'AylikYemekListesiSubmit',
    },
    sectionDatas: {
        AylikYemekListesi: {
            Data: new Array(),
            FData: new Array(),
            Num: 0,
        },

        Okullar: GetOkullarData(),
        Resimler: GetResimlerData(),
    },
    sectionSPs: {
        Okul: 'Okul',
        Resim: 'Resim',
    },
    sectionIsFirst: true,
};

$(function() {

    //Refresh Page
    RefreshData(1, 1, 1);


    //Button that opens add/update modal
    FunOpenModal(vars.sectionShowBases.Sections, vars.sectionButtons.OpenModal,
                vars.sectionControllers.Portal + vars.sectionFunctions.Add,
                vars.sectionObjects.Form, vars.sectionObjects.Modal);



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
            var dataTarget = "Tarih";

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
                    ResetFormErrors();
                    if (response.success) {
                        ResetSelectpicker();
                        var trArray;
                        var newSayfa = response.sayfa;
                        var willRefresh = false;

                        if (response.type == 'add') {
                            willRefresh = true;
                        } else {
                            var no = response.data.No;
                            var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');
                            var oldSayfa = editBtn.parents('.tab-pane.fade.active.in').attr('id');

                            var newSayfaTemp = new Array();
                            for (var i = 0, length = newSayfa.length; i < length; i++) {
                                newSayfaTemp[i] = GetOkullarData(0, newSayfa[i]);
                            }
                            var compareSayfa = newSayfaTemp.filter(function(sayfa) {
                                return sayfa[0].ShowID == oldSayfa;
                            });

                            if (compareSayfa.length > 0) {
                                var curData = GetCurData(response.data);
                                trArray = new Array('ozel-Tarih', 'Baslik');
                                var trInside = GetHtmlTr(curData, trArray);
                                editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                    editBtn.parents('tr:first').html(trInside);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                            } else {
                                willRefresh = true;
                            }

                        }
                        $(vars.sectionObjects.Modal).modal('hide');
                        iziSuccess();
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
                            var OkulArray = result.data.Okul.split(',');
                            $('input[name=No]').val(result.data.No);
                            $('#tr_Baslik').val(result.data.tr_Baslik);
                            $('#en_Baslik').val(result.data.en_Baslik);
                            $('#tr_' + vars.sectionSPs.Resim + 'Select').selectpicker('val', result.data.tr_Resim);
                            $('#en_' + vars.sectionSPs.Resim + 'Select').selectpicker('val', result.data.en_Resim);
                            $('#' + vars.sectionSPs.Okul + 'Select').selectpicker('val', OkulArray);
                            $('#Tarih').val(result.data.Tarih);

                            $('.nav-tabs a[href="#' + formTabs['Turkce'] + '"]').tab('show');
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
            RefreshData,"1, 1, 1");
});

function GetOkullarSelect() {
    var i, data = vars.sectionDatas.Okullar,
        length = data.length,
        html;

    var tr_ID = vars.sectionSPs.Okul + 'Select';
    var tr_section = vars.sectionSPs.Okul;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '[]" id="' + tr_ID + '" title="' + formLang.OkulSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }

    html += '</select>'
    $('#' + tr_section).html(html);
    RefreshSelectpicker();
}

function GetResimlerSelect() {
    setTimeout(function() {
        var i, data = vars.sectionDatas.Resimler,
            length = data.length;

        var tr_ID = 'tr_' + vars.sectionSPs.Resim + 'Select';
        var tr_Section = 'tr_' + vars.sectionSPs.Resim;
        var en_ID = 'en_' + vars.sectionSPs.Resim + 'Select';
        var en_Section = 'en_' + vars.sectionSPs.Resim;

        var tr_html = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_Section + '" id="' + tr_ID + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true">';
        var en_html = '<select class="form-control selectpicker" data-live-search="true" name="' + en_Section + '" id="' + en_ID + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true">' + '<option data-tokens="' + formLang.ResimSecTokens + '" value="0">' + formLang.ResimSecUse + '</option>';
        var lastParts = '';

        lastParts = vars.sectionDatas.Resimler.Html;

        lastParts += '</select>';

        tr_html += lastParts;
        en_html += lastParts;
        $('#' + tr_Section).html(tr_html);
        $('#' + en_Section).html(en_html);
        RefreshSelectpicker();
    }, 5);
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.AylikYemekListesi.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    for (i = 0, length = vars.sectionDatas.Okullar.length; i < length; i++) {
        $('#show' + vars.sectionNames.Upper + 'Data' + vars.sectionDatas.Okullar[i].ShowID).html(vars.sectionDatas.AylikYemekListesi.Data[i]);
    }

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.AylikYemekListesi = {
        Data: new Array(),
        FData: new Array(),
        Num: 0,
    }

    var url = vars.sectionControllers.Normal + vars.sectionFunctions.Get;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        data: {
            English: en,
        },
        async: false,
        dataType: 'json',
        success: function(result) {
            if (en && result.cachedataEN != "") {
                var cache = result.cachedataEN.AylikYemekListesi;
                vars.sectionDatas.AylikYemekListesi = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.AylikYemekListesi;
                vars.sectionDatas.AylikYemekListesi = cache;
            } else {
                var data = result.data,
                    html = new Array(),
                    htmls = {};
                var i, j, okul, length, length2, clength, curData, trInside, trArray;

                for (i = 0, length = vars.sectionDatas.Okullar.length; i < length; i++) {
                    htmls[vars.sectionDatas.Okullar[i].Kod] = '';
                    vars.sectionDatas.AylikYemekListesi.FData[vars.sectionDatas.Okullar[i].Kod] = new Array();
                }

                for (i = 0, length = data.length; i < length; i++) {
                    curData = GetCurData(data[i]);

                    curData.Tarih = curData.Tarih.split('-');
                    curData.Tarih = curData.Tarih[2] + '.' + curData.Tarih[1] + '.' + curData.Tarih[0];

                    okul = curData.Okul.split(',');

                    for (j = 0, length2 = okul.length; j < length2; j++) {
                        trArray = new Array('Tarih', 'Baslik');
                        trInside = GetHtmlTr(curData, trArray);
                        htmls[okul[j]] += '<tr>' + trInside + '</tr>';
                        clength = vars.sectionDatas.AylikYemekListesi.FData[okul[j]].length;
                        vars.sectionDatas.AylikYemekListesi.FData[okul[j]][clength] = curData;
                    }

                }
                vars.sectionDatas.AylikYemekListesi.Data = htmls;
                vars.sectionDatas.AylikYemekListesi.Num = length;

                var theCacheData = {
                    AylikYemekListesi: vars.sectionDatas.AylikYemekListesi,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
            }
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

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
    }
    newHtml +=
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
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
        '<label>' + formLang.Resim + '</label>' +
        '<div id="tr_' + vars.sectionSPs.Resim + '"></div>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input name="en_Baslik" id="en_Baslik" class="form-control" type="text" placeholder="' + formLang.Baslik + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="en_' + vars.sectionSPs.Resim + '"></div>' +
        '</div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Okul + '</label>' +
        '<div id="' + vars.sectionSPs.Okul + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tarih + '</label>' +
        '<input name="Tarih" id="Tarih" class="form-control" type="date" placeholder="' + formLang.Tarih + '">' +
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
    var thei = true;
    var i = 0,
        data = vars.sectionDatas.Okullar,
        length = data.length;

    html += '<section id="' + vars.sectionNames.Lower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center">' +
        '<h2>' +
        '<button id="' + vars.sectionButtons.OpenModal + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        '<button id="' + rVars.sectionButtons.OpenModal + '" style="float: left; margin-left: 5px;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAddImage + '" aria-hidden="true"></i></button>' +
        vars.sectionNames.Normal +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    thei = true;
    for (i = 0; i < length; i++) {
        if (thei) {
            html += '<li class="active"><a href="#' + data[i].ShowID + '" data-toggle="tab">' + data[i].Ad + '</a></li>';
            thei = false;
        } else {
            html += '<li><a href="#' + data[i].ShowID + '" data-toggle="tab">' + data[i].Ad + '</a></li>';
        }
    }

    html += '</ul>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="tab-content">';

    thei = true;
    for (i = 0; i < length; i++) {
        if (thei) {
            html += '<div class="tab-pane fade in active" id="' + data[i].ShowID + '">';
            thei = false;
        } else {
            html += '<div class="tab-pane fade" id="' + data[i].ShowID + '">';
        }
        html += '<div class="table-responsive">' +
            '<table class="table table-bordered table-hover datatable">' +
            '<thead class="text-center">' +
            '<th class="text-center">' + formLang.Tarih + '</th>' +
            '<th class="text-center">' + formLang.Baslik + '</th>' +
            '<th class="text-center">' + formLang.Duzenle + '</th>' +
            '<th class="text-center">' + formLang.Sil + '</th>' +
            '</thead>' +
            '<tbody id="show' + vars.sectionNames.Upper + 'Data' + data[i].ShowID + '">' +
            '</tbody>' +
            '</table>' +
            '</div>' +
            '</div>';
    }



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
        GetOkullarSelect();
        GetResimlerSelect();
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}