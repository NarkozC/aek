var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Etkinlik-Takvimi/',
        Portal: baseurl + 'Portal/Admin/Etkinlik-Takvimi/',
    },
    sectionNames: {
        Normal: 'Etkinlik Takvimi',
        Upper: 'EtkinlikTakvimi',
        Lower: 'etkinlikTakvimi',
        Kod: 'GET',
    },
    sectionShowBases: {
        Sections: 'showEtkinlikTakvimi',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetEtkinlikTakvimi',
        Add: 'AddEtkinlikTakvimi',
        Update: 'UpdateEtkinlikTakvimi',
        Edit: 'EditEtkinlikTakvimi',
        Delete: 'DeleteEtkinlikTakvimi',
    },
    sectionButtons: {
        OpenModal: 'EtkinlikTakvimiOpenModal',
        Submit: 'EtkinlikTakvimiSubmit',
    },
    sectionDatas: {
        EtkinlikTakvimi: {
            Data: new Array(),
            Num: 0,
        },

        Okullar: GetOkullarData(),
        Subeler: GetSubelerData(),
        Siniflar: GetSiniflarData(),
    },
    sectionSPs: {
        Ders: 'Ders',
        Sube: 'Sube',
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

            var dataTarget;
            var dataTargetSecond;

            dataTarget = "Sube[]";
            var okulA = new Array();
            var okulS = '';
            for (var i = 0; i < data.length; i++) {
                if (data[i].name == dataTarget) {
                    var splittedValue = data[i].value.split('-');
                    var compareSube = vars.sectionDatas.Siniflar.filter(function(sinif) {
                        return sinif.Kod == splittedValue[0];
                    });

                    okulA = new Array();
                    var okulSTemp = okulS.split(',');
                    var compareString = okulSTemp.filter(function(oS) {
                        return oS == compareSube[0].Okul;
                    });

                    var oSinArray = jQuery.inArray(compareSube[0].Okul, compareString)
                    if (oSinArray == -1) {
                        okulS += compareSube[0].Okul + ',';
                    }
                }
            }
            okulS = okulS.substring(0, okulS.length - 1);
            data.push({
                name: 'Okul',
                value: okulS
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

                            newSayfa = newSayfa.split(',');
                            var newSayfaTemp = new Array();
                            for (var i = 0, length = newSayfa.length; i < length; i++) {
                                newSayfaTemp[i] = GetOkullarData(0, newSayfa[i]);
                            }
                            var compareSayfa = newSayfaTemp.filter(function(sayfa) {
                                return sayfa[0].ShowID == oldSayfa;
                            });

                            if (compareSayfa.length > 0) {
                                var curData = GetCurData(response.data);
                                trArray = new Array('ozel-Tarih', 'Sube');
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
                            var SubeArray = result.data.Sube.split(',');
                            $('input[name=No]').val(result.data.No);
                            $('#tr_Aciklama').val(result.data.tr_Aciklama);
                            $('#en_Aciklama').val(result.data.en_Aciklama);
                            $('#' + vars.sectionSPs.Sube + 'Select').selectpicker('val', SubeArray);
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
        RefreshData, "1, 1, 1");
});

function GetSubelerSelect() {
    var i, data = vars.sectionDatas.Subeler.Data,
        odata = vars.sectionDatas.Okullar,
        length = data.length,
        html = '';

    var tr_ID = vars.sectionSPs.Sube + 'Select';
    var tr_section = vars.sectionSPs.Sube;

    html += '<button type="button" id="SelectTumOkul" class="btn btn-danger btn-sm marginR5 marginB5">' + formLang.Okul + '</button>';

    for (var j = 1, length2 = odata.length; j < length2; j++) {
        html += '<button type="button" id="SSube' + odata[j].ShowID + '" class="btn btn-danger btn-sm marginR5 marginB5">' + odata[j].Ad + '</button>';
    }

    html += '<button type="button" id="SelectSifirla" class="btn btn-danger btn-sm marginR5 marginB5">' + formLang.Sifirla + '</button>' +
        '<select class="form-control selectpicker" data-live-search="true" name="' + tr_section + '[]" id="' + tr_ID + '" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Kod + '" value="' + data[i].Kod + '">' + data[i].Kod + '</option>';
    }

    html += '</select>'
    $('#' + tr_section).html(html);
    RefreshSelectpicker();

    $('#' + tr_section).on('click', '#SelectTumOkul', function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var theArrayTemp = vars.sectionDatas.Subeler.Data;
            var theArray = new Array();
            for (var i = 0, length = theArrayTemp.length; i < length; i++) {
                theArray[i] = theArrayTemp[i].Kod;
            }
            var olds = $('#' + tr_ID).val();
            var newA = $.merge($.merge([], theArray), olds);
            $('#' + tr_ID).selectpicker('val', newA);
        }
        $link.data('lockedAt', +new Date());
    });

    $('#' + tr_section).on('click', '#SSube' + vars.sectionDatas.Okullar[1].ShowID, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var theArrayTemp = vars.sectionDatas.Subeler.Data.filter(function(sube) {
                return sube.Okul == "1";
            });
            var theArray = new Array();
            for (var i = 0, length = theArrayTemp.length; i < length; i++) {
                theArray[i] = theArrayTemp[i].Kod;
            }
            var olds = $('#' + tr_ID).val();
            var newA = $.merge($.merge([], theArray), olds);

            $('#' + tr_ID).selectpicker('val', newA);
        }
        $link.data('lockedAt', +new Date());
    });

    $('#' + tr_section).on('click', '#SSube' + vars.sectionDatas.Okullar[2].ShowID, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var theArrayTemp = vars.sectionDatas.Subeler.Data.filter(function(sube) {
                return sube.Okul == "2";
            });
            var theArray = new Array();
            for (var i = 0, length = theArrayTemp.length; i < length; i++) {
                theArray[i] = theArrayTemp[i].Kod;
            }
            var olds = $('#' + tr_ID).val();
            var newA = $.merge($.merge([], theArray), olds);

            $('#' + tr_ID).selectpicker('val', newA);
        }
        $link.data('lockedAt', +new Date());
    });

    $('#' + tr_section).on('click', '#SSube' + vars.sectionDatas.Okullar[3].ShowID, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var theArrayTemp = vars.sectionDatas.Subeler.Data.filter(function(sube) {
                return sube.Okul == "3";
            });
            var theArray = new Array();
            for (var i = 0, length = theArrayTemp.length; i < length; i++) {
                theArray[i] = theArrayTemp[i].Kod;
            }
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
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.EtkinlikTakvimi.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    for (i = 1, length = vars.sectionDatas.Okullar.length; i < length; i++) {
        $('#show' + vars.sectionNames.Upper + 'Data' + vars.sectionDatas.Okullar[i].ShowID).html(vars.sectionDatas.EtkinlikTakvimi.Data[i]);
    }

    ShortenContent();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.EtkinlikTakvimi = {
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
                var cache = result.cachedataEN.EtkinlikTakvimi;
                vars.sectionDatas.EtkinlikTakvimi = cache;
                vars.sectionDatas.EtkinlikTakvimi.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.EtkinlikTakvimi;
                vars.sectionDatas.EtkinlikTakvimi = cache;
                vars.sectionDatas.EtkinlikTakvimi.Data = JSON.parse(cache.Data);
            } else {
                var i, j, data = result.data,
                    length, length2, htmls = {};
                var curData, trInside, trArray;

                for (i = 1, length = vars.sectionDatas.Okullar.length; i < length; i++) {
                    htmls[vars.sectionDatas.Okullar[i].Kod] = '';
                }

                for (i = 0, length = data.length; i < length; i++) {
                    curData = GetCurData(data[i]);

                    okul = curData.Okul.split(',');

                    for (j = 0, length2 = okul.length; j < length2; j++) {
                        var okulTemp = vars.sectionDatas.Okullar.filter(function(curOkul) {
                            return curOkul.Kod == okul[j];
                        });

                        trArray = new Array('ozel-Tarih', 'Sube');
                        trInside = GetHtmlTr(curData, trArray);
                        htmls[okul[j]] += '<tr>' + trInside + '</tr>';
                    }
                }
                vars.sectionDatas.EtkinlikTakvimi.Data = htmls;
                vars.sectionDatas.EtkinlikTakvimi.Num = length;

                var myJSON = JSON.stringify(vars.sectionDatas.EtkinlikTakvimi.Data);
                vars.sectionDatas.EtkinlikTakvimi.Data = myJSON;
                var theCacheData = {
                    EtkinlikTakvimi: vars.sectionDatas.EtkinlikTakvimi,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                vars.sectionDatas.EtkinlikTakvimi.Data = JSON.parse(myJSON);
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

            newHtml += '<td class="shorten_content">' + tarih + '</td>';
        } else {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
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
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Sube + '</label>' +
        '<div id="' + vars.sectionSPs.Sube + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tarih + '</label>' +
        '<input name="Tarih" id="Tarih" class="form-control" type="date" placeholder="' + formLang.Tarih + '">' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade in active" id="' + formTabs.Turkce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label> <br>' +
        '<textarea name="tr_Aciklama" id="tr_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '" rows="3"></textarea>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label> <br>' +
        '<textarea name="en_Aciklama" id="en_Aciklama" class="form-control" placeholder="' + formLang.Aciklama + '" rows="3"></textarea>' +
        '</div>' +
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
        '<span data-baslik="B_' + vars.sectionNames.Upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + vars.sectionNames.Normal + '</span>' +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    thei = true;
    for (i = 1; i < length; i++) {
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
    for (i = 1; i < length; i++) {
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
            '<th class="text-center">' + formLang.Sube + '</th>' +
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
        GetSubelerSelect();
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}