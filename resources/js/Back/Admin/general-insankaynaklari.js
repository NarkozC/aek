var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Insan-Kaynaklari/',
        Portal: baseurl + 'Portal/Admin/Insan-Kaynaklari/',
    },
    sectionNames: {
        Normal: 'İnsan Kaynakları',
        Upper: 'InsanKaynaklari',
        Lower: 'insanKaynaklari',
        Kod: 'GIK',
    },
    sectionShowBases: {
        Sections: 'showInsanKaynaklari',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetInsanKaynaklari',
        Edit: 'EditInsanKaynaklari',
        Update: 'UpdateInsanKaynaklari',
        Delete: 'DeleteInsanKaynaklari',
        Download: 'DownloadInsanKaynaklari',
    },
    sectionButtons: {
        OpenModal: 'InsanKaynaklariOpenModal',
        Submit: 'InsanKaynaklariSubmit',
    },
    sectionDatas: {
        InsanKaynaklari: {
            Data: new Array(),
            BHtml: '',
            Num: 0,
        },
    },
    sectionIsFirst: true,
};

$(function() {

    //Refresh Page
    RefreshData(1, 1, 1);

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
                        var willRefresh = false;
                        var no = response.data.No;
                        var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');

                        var curData = GetCurData(response.data);
                        trArray = new Array('Pozisyon', 'AdSoyad', 'ozel-BasTarihi');
                        var trInside = GetHtmlTr(curData, trArray);
                        editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                            editBtn.parents('tr:first').html(trInside);
                            $(this).css('background-color', '#EDEDED').fadeIn();
                        });
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
                    ResetForm(vars.sectionObjects.Form);
                    if (result.success) {
                        $('input[name=No]').val(result.data.No);
                        $('#AdSoyad').val(result.data.AdSoyad);
                        $('#DogumTarihi').val(result.data.DogumTarihi);
                        $('#Email').val(result.data.Email);
                        $('#Tel').val(result.data.Tel);
                        $('#AltTel').val(result.data.AltTel);
                        $('#Pozisyon').val(result.data.Pozisyon);
                        $('#MOO').val(result.data.MOO);
                        $('#Brans').val(result.data.Brans);
                        $('#OTS').val(result.data.OTS);
                        $('#DTS').val(result.data.DTS);
                        $('#YTS').val(result.data.YTS);
                        $('#BasTarihi').val(result.data.BasTarihi);

                        $(vars.sectionObjects.Modal).modal('show');
                    } else {
                        RefreshData(1, 1, 1)
                        iziError();
                    }
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
        RefreshData, new Array(1, 1, 1), true, 'pdfs/Cv');

    //Button for downloading
    $('#' + vars.sectionShowBases.Sections).on('click', '.' + tableOpts.ButtonDownload, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var cv = $(this).attr('data');
            var url = vars.sectionControllers.Portal + vars.sectionFunctions.Download + '/' + cv;
            $('body').append('<iframe style="display:none" class="cvDownloader" src="' + url + '"></iframe>');
            setTimeout(function() {
                $('.cvDownloader').remove();
            }, 1000);
        }
        $link.data('lockedAt', +new Date());
    });
});

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.InsanKaynaklari.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('#' + vars.sectionShowBases.Sections).fadeOut();
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.InsanKaynaklari.BHtml);

    ShortenContent();

    CreateDataTables();
    $('#' + vars.sectionShowBases.Sections).fadeIn();
}

function GetSectionsData() {
    vars.sectionDatas.InsanKaynaklari = {
        Data: new Array(),
        BHtml: '',
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
                var cache = result.cachedataEN.InsanKaynaklari;
                vars.sectionDatas.InsanKaynaklari = cache;
                vars.sectionDatas.InsanKaynaklari.Data = JSON.parse(cache.Data);
                vars.sectionDatas.InsanKaynaklari.BHtml = cache.BHtml;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.InsanKaynaklari;
                vars.sectionDatas.InsanKaynaklari = cache;
                vars.sectionDatas.InsanKaynaklari.Data = JSON.parse(cache.Data);
                vars.sectionDatas.InsanKaynaklari.BHtml = cache.BHtml;
            } else {
                var i, length,
                    data = result.data;
                var curData, trInside, trArray;

                for (i = 0, length = data.length; i < length; i++) {
                    curData = GetCurData(data[i]);
                    var dateAr = curData.BasTarihi.split('-');
                    curData.BasTarihi = dateAr[2] + '.' + dateAr[1] + '.' + dateAr[0];
                    vars.sectionDatas.InsanKaynaklari.Data[i] = curData;

                    trArray = new Array('Pozisyon', 'AdSoyad', 'BasTarihi');
                    trInside = GetHtmlTr(curData, trArray);
                    vars.sectionDatas.InsanKaynaklari.BHtml += '<tr>' + trInside + '</tr>';
                }

                vars.sectionDatas.InsanKaynaklari.Num = length;
                if (length < cacheLimit) {
                    vars.sectionDatas.InsanKaynaklari.Data = JSON.stringify(vars.sectionDatas.InsanKaynaklari.Data);
                    var theCacheData = {
                        InsanKaynaklari: vars.sectionDatas.InsanKaynaklari,
                    }
                    setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                    vars.sectionDatas.InsanKaynaklari.Data = JSON.parse(vars.sectionDatas.InsanKaynaklari.Data);
                }

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
    var cv = data.Cv

    for (i = 0; i < length; i++) {
        var trArrayTemp = trArray[i].split('-');
        if (trArrayTemp[0] == "ozel" && trArrayTemp[1] == "BasTarihi") {
            var tarih = data.BasTarihi.split('-');
            tarih = tarih[2] + '.' + tarih[1] + '.' + tarih[0];

            newHtml += '<td class="shorten_content">' + tarih + '</td>';
        } else {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
        }
    }
    newHtml +=
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonDownload + '" data="' + cv + '"><i class="' + tableOpts.IconDownload + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '" data2="' + cv + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
        '</td>';

    return newHtml;
}

function GetSectionsModalHtml() {
    if (vars.sectionIsFirst) {
        var html,
            genelHtml = new Array(
                '<label>' + formLang.AdSoyad + '</label>' +
                '<input name="AdSoyad" id="AdSoyad" class="form-control" type="text" placeholder="' + formLang.AdSoyad + '">',

                '<label>' + formLang.DogumTarihi + '</label>' +
                '<input name="DogumTarihi" id="DogumTarihi" class="form-control" type="date" placeholder="' + formLang.DogumTarihi + '">',

                '<label>' + formLang.Email + '</label>' +
                '<input name="Email" id="Email" class="form-control" type="text" placeholder="' + formLang.Email + '">',

                '<label>' + formLang.Tel + '</label>' +
                '<input name="Tel" id="Tel" class="form-control" type="text" placeholder="' + formLang.Tel + '">',

                '<label>' + formLang.AltTel + '</label>' +
                '<input name="AltTel" id="AltTel" class="form-control" type="text" placeholder="' + formLang.AltTel + '">',

                '<label>' + formLang.Pozisyon + '</label>' +
                '<input name="Pozisyon" id="Pozisyon" class="form-control" type="text" placeholder="' + formLang.Pozisyon + '">',

                '<label>' + formLang.MOO + '</label>' +
                '<input name="MOO" id="MOO" class="form-control" type="text" placeholder="' + formLang.MOO + '">',

                '<label>' + formLang.Brans + '</label>' +
                '<input name="Brans" id="Brans" class="form-control" type="text" placeholder="' + formLang.Brans + '">',

                '<label>' + formLang.OTS + '</label>' +
                '<input name="OTS" id="OTS" class="form-control" type="text" placeholder="' + formLang.OTS + '">',

                '<label>' + formLang.DTS + '</label>' +
                '<input name="DTS" id="DTS" class="form-control" type="text" placeholder="' + formLang.DTS + '">',

                '<label>' + formLang.YTS + '</label>' +
                '<input name="YTS" id="YTS" class="form-control" type="text" placeholder="' + formLang.YTS + '">',

                '<label>' + formLang.BasTarihi + '</label>' +
                '<input name="BasTarihi" id="BasTarihi" class="form-control" type="date" placeholder="' + formLang.BasTarihi + '" disabled="true">',
            );

        html = FunCreateModalHtml(vars.sectionNames.Lower, false, genelHtml, new Array(), new Array(), vars.sectionButtons.Submit)
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
            new Array(),
            new Array(
                formLang.Pozisyon,
                formLang.AdSoyad,
                formLang.BasTarihi,
                formLang.Indir,
                formLang.Duzenle,
                formLang.Sil
            ),
            vars.sectionShowBases.Modal
        )
        $('#' + vars.sectionShowBases.Sections).html(html);
        $('#' + vars.sectionShowBases.Sections).css('transition', 'none');
    }
}

function RefreshData(main = 1, html = 0, side = 0) {
    if (main == 1) {
        GetSectionsData();
    }
    if (html != 0) {
        setTimeout(function() {
            GetSectionsHtml();
            GetSectionsModalHtml();
            CreateSectionsTable();
        }, 50);
    }
    if (side != 0) {
        setTimeout(function() {

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