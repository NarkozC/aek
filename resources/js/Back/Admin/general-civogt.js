var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Civogt/',
        Portal: baseurl + 'Portal/Admin/Civogt/',
    },
    sectionNames: {
        Normal: 'Çözümleriniz İçin Veli-Öğretmen Görüşme Takvimi',
        Upper: 'Civogt',
        Lower: 'popup',
    },
    sectionShowBases: {
        Sections: 'showCivogt',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetCivogt',
        Add: 'AddCivogt',
        Update: 'UpdateCivogt',
        Edit: 'EditCivogt',
        Delete: 'DeleteCivogt',
    },
    sectionButtons: {
        OpenModal: 'CivogtOpenModal',
        Submit: 'CivogtSubmit',
    },
    sectionDatas: {
        Civogt: {
            Data: new Array(),
            Num: 0,
        },
        Okullar: GetOkullarData(),
        Gunler: GetGunlerData(),
        Dersler: GetDerslerData(),
        Yillar: GetYillarData(),
        Siniflar: GetSiniflarData(),
        Subeler: GetSubelerData(),
        Resimler: GetResimlerData(),
        Settings: GetSettingsData(),
    },
    sectionSPs: {
        Okul: 'Okul',
        Gun: 'Gun',
        Sinif: 'Sinif',
        Sube: 'Sube',
        Ders: 'Ders',
        Yil: 'Yil',
        Donem: 'Donem',
        SResim: 'Deger4',
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

            var dataTarget = "Sube";

            for (var i = 0; i < data.length; i++) {
                var curData;
                if (data[i].name == dataTarget) {

                    curData = data[i];
                    if (curData.value != "") {
                        var subeTemp = curData.value.split('-');
                        curData = subeTemp[0];
                        data.push({
                            name: 'Sinif',
                            value: curData
                        });
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
                        var willRefresh = false;

                        if (response.type == 'add') {
                            willRefresh = true;
                        } else {
                            var no = response.data.No;
                            var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');
                            var curData = GetOrganizedData(response.data);

                            trArray = new Array('Yil', 'Donem', 'Okul', 'Ders', 'Sube', 'Gun', 'Saat');
                            var trInside = GetHtmlTr(curData, trArray);
                            editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                editBtn.parents('tr:first').html(trInside);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
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
                            $('input[name=No]').val(result.data.No);
                            $('#' + vars.sectionSPs.Yil + 'Select').selectpicker('val', result.data.Yil);
                            $('#' + vars.sectionSPs.Donem + 'Select').selectpicker('val', result.data.Donem);
                            $('#' + vars.sectionSPs.Okul + 'Select').selectpicker('val', result.data.Okul);
                            $('#' + vars.sectionSPs.Ders + 'Select').selectpicker('val', result.data.Ders);
                            $('#' + vars.sectionSPs.Sube + 'Select').selectpicker('val', result.data.Sube);
                            $('#' + vars.sectionSPs.Gun + 'Select').selectpicker('val', result.data.Gun);
                            $('#Saat').val(result.data.Saat);

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


    //Button for editing settings
    $('#' + vars.sectionShowBases.Sections).on('click', '.' + settingsOpts.Names.Kod, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            $(settingsOpts.Objects.Modal).attr('action', settingsOpts.Controllers.Portal + settingsOpts.Functions.Update);
            var curData = vars.sectionDatas.Settings.filter(function(setting) {
                return setting.ControllerName == vars.sectionNames.Upper;
            });
            curData = curData[0];
            ResetForm(settingsOpts.Objects.Form)
            $('[name=ControllerName]').val(curData.ControllerName);
            $('#Deger1').val(curData.Deger1);
            $('#Deger2').val(curData.Deger2);
            $('#Deger3').val('B_'+vars.sectionNames.Upper);
            $('#' + vars.sectionSPs.SResim + 'Select').selectpicker('val', curData.Deger4);

            $(settingsOpts.Objects.Modal).modal('show');
        }
        $link.data('lockedAt', +new Date());
    });

    //Button for posting data for add/update
    $('#' + vars.sectionShowBases.Sections).on('click', '#' + settingsOpts.Buttons.Submit, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var url = settingsOpts.Objects.Form.attr('action');
            var data = settingsOpts.Objects.Form.serializeArray();
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
                        $(settingsOpts.Objects.Modal).modal('hide');
                        iziSuccess();
                        vars.sectionDatas.Settings = GetSettingsData();
                    } else {
                        var ajaxGroup;
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            $(vars.sectionObjects.Modal).modal('hide');
                            iziError();
                            vars.sectionDatas.Settings = GetSettingsData();
                        }
                    }
                },
                error: function() {
                    $(vars.sectionObjects.Modal).modal('hide');
                    iziError();
                    vars.sectionDatas.Settings = GetSettingsData();
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });
});

function GetYillarSelect() {
    var i, html;
    var data = vars.sectionDatas.Yillar,
        length = data.length;

    var id = vars.sectionSPs.Yil + 'Select';
    var section = vars.sectionSPs.Yil;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.YilSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i] + '" value="' + data[i] + '">' + data[i] + '</option>';
    }

    html += '</select>'
    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetDonemlerSelect() {
    var i, html;
    var data = new Array("1", "2"),
        length = data.length;


    html = '<select class="form-control selectpicker" data-live-search="true" name="' + vars.sectionSPs.Donem + '" id="' + vars.sectionSPs.Donem + 'Select" title="' + formLang.DonemSec + '" data-liveSearchNormalize="true">';
    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i] + '" value="' + data[i] + '">' + data[i] + '</option>';
    }
    html += '</select>';

    $('#' + vars.sectionSPs.Donem).html(html);
    RefreshSelectpicker();
}

function GetOkullarSelect() {
    var i, html;
    var data = vars.sectionDatas.Okullar,
        length = data.length;

    var id = vars.sectionSPs.Okul + 'Select';
    var section = vars.sectionSPs.Okul;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.OkulSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }

    html += '</select>'
    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetDerslerSelect() {
    var i, html;
    var data = vars.sectionDatas.Dersler.Data,
        length = data.length;

    var id = vars.sectionSPs.Ders + 'Select';
    var section = vars.sectionSPs.Ders;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.DersSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }

    html += '</select>'
    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSubelerSelect() {
    var i, html;
    var data = vars.sectionDatas.Subeler.Data,
        length = data.length;

    var id = vars.sectionSPs.Sube + 'Select';
    var section = vars.sectionSPs.Sube;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.SubeSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Kod + '" value="' + data[i].Kod + '">' + data[i].Kod + '</option>';
    }

    html += '</select>'
    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetGunlerSelect() {
    var i, html;
    var data = vars.sectionDatas.Gunler,
        length = data.length;

    var id = vars.sectionSPs.Gun + 'Select';
    var section = vars.sectionSPs.Gun;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.GunSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }

    html += '</select>'
    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSResimSelect() {
    var i, html;
    var data = vars.sectionDatas.Resimler,
        length = data.length;

    var id = vars.sectionSPs.SResim + 'Select';
    var section = vars.sectionSPs.SResim;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true">' +
        data.Html +
        '</select>';

    $('#' + section).html(html);
    RefreshSelectpicker();
}


function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Civogt.Num);
}

function CreateSectionsTable() {
    var i, curData;
    var data = vars.sectionDatas.Civogt.Data,
        length = data.length,
        html = '';
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    for (i = 0; i < length; i++) {
        curData = data[i];
        trArray = new Array('Yil', 'Donem', 'Okul', 'Ders', 'Sube', 'Gun', 'Saat');
        trInside = GetHtmlTr(curData, trArray);
        html += '<tr>' + trInside + '</tr>';
    }
    $('#show' + vars.sectionNames.Upper + 'Data').html(html);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.Civogt = {
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
                var cache = result.cachedataEN.Civogt;
                vars.sectionDatas.Civogt = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Civogt;
                vars.sectionDatas.Civogt = cache;
            } else {
                var data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                for (i = 0; i < length; i++) {
                    curData = GetOrganizedData(data[i]);
                    vars.sectionDatas.Civogt.Data[i] = curData;
                }

                vars.sectionDatas.Civogt.Num = length;
                var theCacheData = {
                    Civogt: vars.sectionDatas.Civogt,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
            }
        },
        error: function() {
            iziError();
        }
    });
}

function GetOrganizedData(data) {
    var curData = data;

    curData.Okul = vars.sectionDatas.Okullar.filter(function(okul) {
        return okul.Kod == curData.Okul;
    });
    curData.Okul = curData.Okul[0].Ad;

    curData.Ders = vars.sectionDatas.Dersler.Data.filter(function(ders) {
        return ders.Kod == curData.Ders;
    });
    curData.Ders = curData.Ders[0].Ad;

    curData.Gun = vars.sectionDatas.Gunler.filter(function(gun) {
        return gun.Kod == curData.Gun;
    });
    curData.Gun = curData.Gun[0].Ad;

    return curData;
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

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Yil + '</label>' +
        '<div id="' + vars.sectionSPs.Yil + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Donem + '</label>' +
        '<div id="' + vars.sectionSPs.Donem + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Okul + '</label>' +
        '<div id="' + vars.sectionSPs.Okul + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ders + '</label>' +
        '<div id="' + vars.sectionSPs.Ders + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Sube + '</label>' +
        '<div id="' + vars.sectionSPs.Sube + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Gun + '</label>' +
        '<div id="' + vars.sectionSPs.Gun + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Saat + '</label> <br>' +
        '<input type="text" name="Saat" id="Saat" class="form-control" placeholder="' + formLang.Saat + '"></input>' +
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

function GetSettingsModalHtml() {

    var html = '<div class="modal fade ajax-modal" id="' + settingsOpts.Names.Lower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header" align="center">' +
        '<img class="maxW150" src="' + logoUrl + '">' +
        modalOpts.ModalCloseButton +
        '</div>' +
        '<form role="form" method="post" id="' + settingsOpts.Names.Lower + '-form" class="form-horizontal" action="' + settingsOpts.Controllers.Portal + settingsOpts.Functions.Update + '">' +
        '<div class="modal-body">' +

        '<input type="hidden" name="ControllerName" id="ControllerName" class="form-control" value="' + vars.sectionNames.Upper + '">' +
        '<input type="hidden" name="Deger3" id="Deger3" class="form-control" value="B_'+vars.sectionNames.Upper+'">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.TrBaslik + '</label> <br>' +
        '<input type="text" name="Deger1" id="Deger1" class="form-control" placeholder="' + formLang.TrBaslik + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.EnBaslik + '</label> <br>' +
        '<input type="text" name="Deger2" id="Deger2" class="form-control" placeholder="' + formLang.EnBaslik + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="' + vars.sectionSPs.SResim + '"></div>' +
        '</div>' +

        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" id="' + settingsOpts.Buttons.Submit + '" class="btn btn-info btn-lg btn-block">' + formLang.Kaydet + '</button>' +
        '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Iptal + '</button>' +
        '</div>' +
        '</form> ' +
        '</div>' +
        '</div>' +
        '</div>';

    $('#' + vars.sectionShowBases.Sections).append(html);
    settingsOpts.Objects.Form = $('#' + settingsOpts.Names.Lower + '-form');
    settingsOpts.Objects.Modal = $('#' + settingsOpts.Names.Lower + '-modal');
}

function GetSectionsHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center">' +
        '<h2>' +
        '<button id="' + vars.sectionButtons.OpenModal + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        '<span data-baslik="B_' + vars.sectionNames.Upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + vars.sectionNames.Normal + '</span>' +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Yil + '</th>' +
        '<th class="text-center">' + formLang.Donem + '</th>' +
        '<th class="text-center">' + formLang.Okul + '</th>' +
        '<th class="text-center">' + formLang.Ders + '</th>' +
        '<th class="text-center">' + formLang.Sube + '</th>' +
        '<th class="text-center">' + formLang.Gun + '</th>' +
        '<th class="text-center">' + formLang.Saat + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
        '<th class="text-center">' + formLang.Sil + '</th>' +
        '</thead>' +
        '<tbody id="show' + vars.sectionNames.Upper + 'Data">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>' +

        '</div>' +
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
        GetSettingsModalHtml()
    }
    if (side != 0) {
        GetYillarSelect();
        GetDonemlerSelect();
        GetOkullarSelect();
        GetDerslerSelect();
        GetSubelerSelect();
        GetGunlerSelect();
        GetSResimSelect()
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}