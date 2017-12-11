var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Duyurular-Etkinlikler/',
        Portal: baseurl + 'Portal/Admin/Duyurular-Etkinlikler/',
    },
    sectionNames: {
        Normal: 'Duyurular Etkinlikler',
        Upper: 'DuyurularEtkinlikler',
        Lower: 'duyurularEtkinlikler',
    },
    sectionShowBases: {
        Sections: 'showDuyurularEtkinlikler',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetDuyurularEtkinlikler',
        Add: 'AddDuyurularEtkinlikler',
        Update: 'UpdateDuyurularEtkinlikler',
        Edit: 'EditDuyurularEtkinlikler',
        Delete: 'DeleteDuyurularEtkinlikler',
    },
    sectionButtons: {
        OpenModal: 'DuyurularEtkinliklerOpenModal',
        Submit: 'DuyurularEtkinliklerSubmit',
    },
    sectionDatas: {
        DuyurularEtkinlikler: {
            Data: new Array(),
            Num: 0,
        },

        Okullar: GetOkullarData(),
        Resimler: GetResimlerData(),
    },
    sectionSPs: {
        Okul: 'Okul',
        AnaResim: 'AnaResim',
        DigerResimler: 'DigerResimler',
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
                            var tr_DigerResimlerArray = result.data.tr_DigerResimler.split(',');
                            var en_DigerResimlerArray = result.data.en_DigerResimler.split(',');
                            $('input[name=No]').val(result.data.No);
                            $('#tr_Baslik').val(result.data.tr_Baslik);
                            $('#en_Baslik').val(result.data.en_Baslik);
                            $('#tr_' + vars.sectionSPs.AnaResim + 'Select').selectpicker('val', result.data.tr_AnaResim);
                            $('#tr_' + vars.sectionSPs.DigerResimler + 'Select').selectpicker('val', tr_DigerResimlerArray);
                            $('#en_' + vars.sectionSPs.AnaResim + 'Select').selectpicker('val', result.data.en_AnaResim);
                            $('#en_' + vars.sectionSPs.DigerResimler + 'Select').selectpicker('val', en_DigerResimlerArray);
                            $('#tr_Yazi').val(result.data.tr_Yazi);
                            $('#en_Yazi').val(result.data.en_Yazi);
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

        var tr_AnaID = 'tr_' + vars.sectionSPs.AnaResim + 'Select';
        var tr_AnaSection = 'tr_' + vars.sectionSPs.AnaResim;
        var en_AnaID = 'en_' + vars.sectionSPs.AnaResim + 'Select';
        var en_AnaSection = 'en_' + vars.sectionSPs.AnaResim;

        var tr_DigerID = 'tr_' + vars.sectionSPs.DigerResimler + 'Select';
        var tr_DigerSection = 'tr_' + vars.sectionSPs.DigerResimler;
        var en_DigerID = 'en_' + vars.sectionSPs.DigerResimler + 'Select';
        var en_DigerSection = 'en_' + vars.sectionSPs.DigerResimler;

        var tr_Anahtml = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_AnaSection + '" id="' + tr_AnaID + '" title="' + formLang.AnaResimSec + '" data-liveSearchNormalize="true">';
        var tr_Digerhtml = '<select class="form-control selectpicker" data-live-search="true" name="' + tr_DigerSection + '[]" id="' + tr_DigerID + '" title="' + formLang.DigerResimlerSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';

        var en_Anahtml = '<select class="form-control selectpicker" data-live-search="true" name="' + en_AnaSection + '" id="' + en_AnaID + '" title="' + formLang.AnaResimSec + '" data-liveSearchNormalize="true">' + '<option data-tokens="' + formLang.AnaResimSecTokens + '" value="0">' + formLang.AnaResimSecUse + '</option>';
        var en_Digerhtml = '<select class="form-control selectpicker" data-live-search="true" name="' + en_DigerSection + '[]" id="' + en_DigerID + '" title="' + formLang.DigerResimlerSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">' + '<option data-tokens="' + formLang.DigerResimlerSecTokens + '" value="0">' + formLang.DigerResimlerSecUse + '</option>';
        var lastParts = '';

        lastParts = vars.sectionDatas.Resimler.Html;

        lastParts += '</select>';

        tr_Anahtml += lastParts;
        tr_Digerhtml += lastParts;

        en_Anahtml += lastParts;
        en_Digerhtml += lastParts;
        $('#' + tr_AnaSection).html(tr_Anahtml);
        $('#' + tr_DigerSection).html(tr_Digerhtml);

        $('#' + en_AnaSection).html(en_Anahtml);
        $('#' + en_DigerSection).html(en_Digerhtml);
        RefreshSelectpicker();
    }, 5);
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.DuyurularEtkinlikler.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    for (i = 0, length = vars.sectionDatas.Okullar.length; i < length; i++) {
        $('#show' + vars.sectionNames.Upper + 'Data' + vars.sectionDatas.Okullar[i].ShowID).html(vars.sectionDatas.DuyurularEtkinlikler.Data[i]);
    }

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.DuyurularEtkinlikler = {
        Data: new Array(),
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
                var cache = result.cachedataEN.DuyurularEtkinlikler;
                vars.sectionDatas.DuyurularEtkinlikler = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.DuyurularEtkinlikler;
                vars.sectionDatas.DuyurularEtkinlikler = cache;
            } else {
                var i, j, data = result.data,
                    length, length2, htmls = {};
                var curData, trInside, trArray;

                for (i = 0, length = vars.sectionDatas.Okullar.length; i < length; i++) {
                    htmls[vars.sectionDatas.Okullar[i].Kod] = '';
                }

                for (i = 0, length = data.length; i < length; i++) {
                    curData = GetCurData(data[i]);

                    okul = curData.Okul.split(',');

                    for (j = 0, length2 = okul.length; j < length2; j++) {
                        var okulTemp = vars.sectionDatas.Okullar.filter(function(curOkul) {
                            return curOkul.Kod == okul[j];
                        });

                        trArray = new Array('ozel-Tarih', 'Baslik');
                        trInside = GetHtmlTr(curData, trArray);
                        htmls[okul[j]] += '<tr>' + trInside + '</tr>';
                    }
                }
                vars.sectionDatas.DuyurularEtkinlikler.Data = htmls;
                vars.sectionDatas.DuyurularEtkinlikler.Num = length;

                var theCacheData = {
                    DuyurularEtkinlikler: vars.sectionDatas.DuyurularEtkinlikler,
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
        var trArrayTemp = trArray[i].split('-');
        if (trArrayTemp[0] == "ozel" && trArrayTemp[1] == "Tarih") {
            var tarih = data.Tarih.split('-');
            tarih = tarih[2] + '.' + tarih[1] + '.' + tarih[0];

            newHtml += '<td class="shorten_content6">' + tarih + '</td>';
        } else {
            newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
        }
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
        '<label>' + formLang.AnaResim + '</label>' +
        '<div id="tr_' + vars.sectionSPs.AnaResim + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.DigerResimler + '</label>' +
        '<div id="tr_' + vars.sectionSPs.DigerResimler + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Yazi + '</label> <br>' +
        '<textarea name="tr_Yazi" id="tr_Yazi" class="form-control" placeholder="' + formLang.Yazi + '" rows="4"></textarea>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Baslik + '</label>' +
        '<input name="en_Baslik" id="en_Baslik" class="form-control" type="text" placeholder="' + formLang.Baslik + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.AnaResim + '</label>' +
        '<div id="en_' + vars.sectionSPs.AnaResim + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.DigerResimler + '</label>' +
        '<div id="en_' + vars.sectionSPs.DigerResimler + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Yazi + '</label>' +
        '<textarea name="en_Yazi" id="en_Yazi" class="form-control" placeholder="' + formLang.Yazi + '" rows="4"></textarea>' +
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