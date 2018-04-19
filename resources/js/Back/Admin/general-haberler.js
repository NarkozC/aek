var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Haberler/',
        Portal: baseurl + 'Portal/Admin/Haberler/',
    },
    sectionNames: {
        Normal: 'Haberler',
        Upper: 'Haberler',
        Lower: 'haberler',
        Kod: 'GH',
        UpperSingle: 'Haber',
        LowerSingle: 'haber',
        LowerA: 'haberlerA',
    },
    sectionShowBases: {
        Sections: 'showHaberler',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetHaberler',
        Add: 'AddHaberler',
        Update: 'UpdateHaberler',
        Edit: 'EditHaberler',
        Delete: 'DeleteHaberler',
    },
    sectionButtons: {
        OpenModal: 'HaberlerOpenModal',
        Submit: 'HaberlerSubmit',
    },
    sectionDatas: {
        Haberler: {
            Data: new Array(),
            FData: new Array(),
            FHtml: new Array(),
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
                        if (willRefresh) {
                            RefreshData(1, 1, 1)
                        }
                        $(vars.sectionObjects.Modal).modal('hide');
                        iziSuccess();
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
        RefreshData, "1, 1, 1");
});

function GetOkullarSelect() {
    if (!vars.sectionIsFirst) {
        vars.sectionDatas.Okullar = GetOkullarData();
    }
    FunSelect(vars.sectionDatas.Okullar, vars.sectionSPs.Okul, formLang.OkulSec, "Ad", "Kod", "Ad", true);
}

function GetResimlerSelect() {
    if (!vars.sectionIsFirst) {
        vars.sectionDatas.Resimler = GetResimlerData();
    }
    FunSelect(vars.sectionDatas.Resimler, 'tr_' + vars.sectionSPs.AnaResim, formLang.AnaResimSec, "", "", "", false, true);
    FunSelect(vars.sectionDatas.Resimler, 'en_' + vars.sectionSPs.AnaResim, formLang.AnaResimSec, "", "", "", false, true);
    FunSelect(vars.sectionDatas.Resimler, 'tr_' + vars.sectionSPs.DigerResimler, formLang.DigerResimlerSec, "", "", "", true, true);
    FunSelect(vars.sectionDatas.Resimler, 'en_' + vars.sectionSPs.DigerResimler, formLang.DigerResimlerSec, "", "", "", true, true);
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Haberler.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    for (i = 0, length = vars.sectionDatas.Okullar.length; i < length; i++) {
        $('#show' + vars.sectionNames.Upper + 'Data' + vars.sectionDatas.Okullar[i].ShowID).html(vars.sectionDatas.Haberler.Data[i]);
    }

    ShortenContent();

    CreateDataTables();
}

function GetSectionsData() {
    vars.sectionDatas.Haberler = {
        Data: new Array(),
        FData: new Array(),
        FHtml: new Array(),
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
                var cache = result.cachedataEN.Haberler;
                vars.sectionDatas.Haberler = cache;
                vars.sectionDatas.Haberler.Data = JSON.parse(cache.Data);
                vars.sectionDatas.Haberler.FData = JSON.parse(cache.FData);
                vars.sectionDatas.Haberler.FHtml = JSON.parse(cache.FHtml);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Haberler;
                vars.sectionDatas.Haberler = cache;
                vars.sectionDatas.Haberler.Data = JSON.parse(cache.Data);
                vars.sectionDatas.Haberler.FData = JSON.parse(cache.FData);
                vars.sectionDatas.Haberler.FHtml = JSON.parse(cache.FHtml);
            } else {
                var i, j, data = result.data,
                    length, length2, htmls = {},
                    fHtml = new Array(),
                    fData = new Array();
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
                    if (en) {
                        if (page != '') {
                            curData.Link = baseurl + 'en/' + page + '/' + vars.sectionNames.UpperSingle + '/' + curData.SectionID;
                        } else {
                            curData.Link = baseurl + 'en/' + vars.sectionNames.Upper + '/' + vars.sectionNames.UpperSingle + '/' + curData.SectionID;
                        }
                    } else {
                        if (page != '') {
                            curData.Link = baseurl + page + '/' + vars.sectionNames.UpperSingle + '/' + curData.SectionID;
                        } else {
                            curData.Link = baseurl + vars.sectionNames.Upper + '/' + vars.sectionNames.UpperSingle + '/' + curData.SectionID;
                        }
                    }
                    var dateAr = curData.Tarih.split('-');
                    curData.Tarih = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
                    fData[i] = curData;

                    fHtml[i] =
                        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow borderRad25 marginB35 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                        '<div class="row hidden-md hidden-sm hidden-xs marginTop20 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's"> <!-- hidden-xs-sm-md -->' +
                        '<div class="col-lg-4">' +
                        '<a href="' + curData.Link + '"><img alt="' + curData.Baslik + '" class="img-responsive img-center w400 hvr-bob" style="max-height:300px;" src="' + imagesDir + curData.AnaResim + '"></a>' +
                        '</div>' +
                        '<div class="col-lg-8">' +
                        '<h3><a href="' + curData.Link + '">' + curData.Baslik + ' <span class="fSize65per">(' + curData.Tarih + ')</span></a></h3>' +
                        '<p class="shorten_content8">' + curData.Yazi + '</p>' +
                        '<br>' +
                        '</div>' +
                        '<a href="' + curData.Link + '" class="btn btn-sm btn-danger borderRad10" style="position:absolute;bottom:20px;right:20px">' + formLang.ReadMore + '</a>' +
                        '</div>' +
                        '<div class="row visible-md visible-sm visible-xs marginTop20 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + 's"> <!-- visible-xs-sm-md -->' +
                        '<div class="col-xs-12 col-sm-12 col-md-12">' +
                        '<h3 class="text-center"><a href="' + curData.Link + '">' + curData.Baslik + ' <span class="fSize65per">(' + curData.Tarih + ')</span></a></h3>' +
                        '<a href="' + curData.Link + '"><img alt="' + curData.Baslik + '" class="img-responsive img-center w400 hvr-bob" style="max-height:300px;" src="' + imagesDir + curData.AnaResim + '"></a>' +
                        '</div>' +
                        '<div class="col-xs-12 col-sm-12 col-md-12 marginTop10">' +
                        '<p class="shorten_content8">' + curData.Yazi + '</p>' +
                        '<br><a href="' + curData.Link + '" style="position:absolute;bottom:0;"><span class="btn btn-sm btn-danger pull-right marginR15 borderRad10">' + formLang.ReadMore + '</span></a>' +
                        '</div>' +
                        '</div>' +
                        '</div>';
                }

                vars.sectionDatas.Haberler.FHtml = fHtml;
                vars.sectionDatas.Haberler.FData = fData;
                vars.sectionDatas.Haberler.Data = htmls;
                vars.sectionDatas.Haberler.Num = length;

                vars.sectionDatas.Haberler.Data = JSON.stringify(vars.sectionDatas.Haberler.Data);
                vars.sectionDatas.Haberler.FData = JSON.stringify(vars.sectionDatas.Haberler.FData);
                vars.sectionDatas.Haberler.FHtml = JSON.stringify(vars.sectionDatas.Haberler.FHtml);
                var theCacheData = {
                    Haberler: vars.sectionDatas.Haberler,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                vars.sectionDatas.Haberler.Data = JSON.parse(vars.sectionDatas.Haberler.Data);
                vars.sectionDatas.Haberler.FData = JSON.parse(vars.sectionDatas.Haberler.FData);
                vars.sectionDatas.Haberler.FHtml = JSON.parse(vars.sectionDatas.Haberler.FHtml);
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
    if (vars.sectionIsFirst) {
        var html,
            genelHtml = new Array(
                '<label>' + formLang.Okul + '</label>' +
                '<div id="' + vars.sectionSPs.Okul + '"></div>',

                '<label>' + formLang.Tarih + '</label>' +
                '<input name="Tarih" id="Tarih" class="form-control" type="date" placeholder="' + formLang.Tarih + '">'
            ),
            turkceHtml = new Array(
                '<label>' + formLang.Baslik + '</label>' +
                '<input name="tr_Baslik" id="tr_Baslik" class="form-control" type="text" placeholder="' + formLang.Baslik + '">',

                '<label>' + formLang.AnaResim + '</label>' +
                '<div id="tr_' + vars.sectionSPs.AnaResim + '"></div>',

                '<label>' + formLang.DigerResimler + '</label>' +
                '<div id="tr_' + vars.sectionSPs.DigerResimler + '"></div>',

                '<label>' + formLang.Yazi + '</label> <br>' +
                '<textarea name="tr_Yazi" id="tr_Yazi" class="form-control" placeholder="' + formLang.Yazi + '" rows="4"></textarea>'
            ),
            ingilizceHtml = new Array(
                '<label>' + formLang.Baslik + '</label>' +
                '<input name="en_Baslik" id="en_Baslik" class="form-control" type="text" placeholder="' + formLang.Baslik + '">',

                '<label>' + formLang.AnaResim + '</label>' +
                '<div id="en_' + vars.sectionSPs.AnaResim + '"></div>',

                '<label>' + formLang.DigerResimler + '</label>' +
                '<div id="en_' + vars.sectionSPs.DigerResimler + '"></div>',

                '<label>' + formLang.Yazi + '</label>' +
                '<textarea name="en_Yazi" id="en_Yazi" class="form-control" placeholder="' + formLang.Yazi + '" rows="4"></textarea>'
            );

        html = FunCreateModalHtml(vars.sectionNames.Lower, true, genelHtml, turkceHtml, ingilizceHtml, vars.sectionButtons.Submit)
        $('#' + vars.sectionShowBases.Modal).html(html);
        vars.sectionObjects.Form = $('#' + vars.sectionNames.Lower + '-form');
        vars.sectionObjects.Modal = $('#' + vars.sectionNames.Lower + '-modal');
    }
}

function GetSectionsHtml() {
    if (vars.sectionIsFirst) {
        var html = CreateSectionHtml(
            vars.sectionNames.Lower,
            vars.sectionNames.Upper,
            vars.sectionNames.Normal,
            new Array(
                '<button id="' + vars.sectionButtons.OpenModal + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>',
                '<button id="' + rVars.sectionButtons.OpenModal + '" style="float: left; margin-left: 5px;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAddImage + '" aria-hidden="true"></i></button>'
            ),
            new Array(
                formLang.Tarih,
                formLang.Baslik,
                formLang.Duzenle,
                formLang.Sil
            ),
            vars.sectionShowBases.Modal,
            true,
            vars.sectionDatas.Okullar,
            vars.sectionDatas.Okullar.length,
            "ShowID",
            "Ad"
        )
        $('#' + vars.sectionShowBases.Sections).html(html);
    }
}

function RefreshData(main = 1, html = 0, side = 0) {
    if (main == 1) {
        GetSectionsData();
    }
    if (html != 0) {
        setTimeout(function() {
            GetSectionsHtml()
            GetSectionsModalHtml()
            CreateSectionsTable()
        }, 50);
    }
    if (side != 0) {
        setTimeout(function() {
            GetOkullarSelect();
            GetResimlerSelect();
        }, 100);
    }
    setTimeout(function() {
        if (!vars.sectionIsFirst) {
            ShortenContent();
        }
        GetSectionsNum();
        vars.sectionIsFirst = false;
    }, 150);
}