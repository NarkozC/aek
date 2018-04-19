var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Sinav-Basvurusu/',
        Portal: baseurl + 'Portal/Admin/Sinav-Basvurusu/',
        SinavTarihleri: baseurl + 'Sinav-Tarihleri/',
    },
    sectionNames: {
        Normal: 'Sınav Başvurusu',
        Upper: 'SinavBasvurusu',
        Lower: 'sinavBasvurusu',
        Kod: 'GSB',
    },
    sectionShowBases: {
        Sections: 'showSinavBasvurusu',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetSinavBasvurusu',
        Update: 'UpdateSinavBasvurusu',
        Edit: 'EditSinavBasvurusu',
        Delete: 'DeleteSinavBasvurusu',
        OutputExcel: 'OutputExcel',

        SinavTarihleriGet: 'GetSinavTarihleri',
    },
    sectionButtons: {
        OpenModal: 'SinavBasvurusuOpenModal',
        Submit: 'SinavBasvurusuSubmit',
    },
    sectionDatas: {
        SinavBasvurusu: {
            Data: new Array(),
            BHtml: '',
            Num: 0,
        },

        Cinsiyetler: GetCinsiyetlerData(),
        Siniflar: GetSiniflarData(),
        SinavTarihleri: {
            Data: new Array(),
        },
    },
    secionSPs: {
        Cinsiyet: 'Cinsiyet',
        OOSinif: 'OOSinif',
        SinavTarihi: 'SinavTarihi',
    },
    sectionIsFirst: true,
};

$(function() {

    //Refresh Page
    RefreshData(1, 1, 1);


    $('#' + vars.secionSPs.OOSinif + 'Select').on('change', function(e) {
        var valueSelected = this.value;
        valueSelected = valueSelected.split('-');
        GetSinavTarihleriSelect(valueSelected[1]);
    });

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
                        var willRefresh = false;

                        if (response.type == 'add') {
                            willRefresh = true;
                        } else {
                            var no = response.data.No;
                            var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');
                            var curData = response.data;

                            trArray = new Array('AdSoyad');
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
                            $('#Tc').val(result.data.Tc);
                            $('#AdSoyad').val(result.data.AdSoyad);
                            $('#' + vars.secionSPs.Cinsiyet + 'Select').selectpicker('val', result.data.Cinsiyet);
                            $('#DogumTarihi').val(result.data.DogumTarihi);
                            $('#DogumYeri').val(result.data.DogumYeri);
                            $('#AnneAd').val(result.data.AnneAd);
                            $('#AnneTel').val(result.data.AnneTel);
                            $('#AnneEmail').val(result.data.AnneEmail);
                            $('#BabaAd').val(result.data.BabaAd);
                            $('#BabaTel').val(result.data.BabaTel);
                            $('#BabaEmail').val(result.data.BabaEmail);
                            $('#Adres').val(result.data.Adres);
                            $('#OOOkul').val(result.data.OOOkul);
                            $('#' + vars.secionSPs.OOSinif + 'Select').selectpicker('val', result.data.OOSinif);
                            $('#Bolum').val(result.data.Bolum);
                            $('#Aciklama').val(result.data.Aciklama);
                            var tempData = $('#' + vars.secionSPs.OOSinif + 'Select').selectpicker('val');
                            tempData = tempData.split('-');
                            GetSinavTarihleriSelect(tempData[1]);
                            setTimeout(function() {
                                tempData = result.data.SinavTarihi
                                $('#' + vars.secionSPs.SinavTarihi + 'Select').selectpicker('val', tempData);
                            }, 5);


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

function GetCinsiyetlerSelect() {
    var i, html;
    var data = vars.sectionDatas.Cinsiyetler,
        length = data.length,
        id = vars.secionSPs.Cinsiyet + 'Select',
        section = vars.secionSPs.Cinsiyet;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.CinsiyetSec + '" data-liveSearchNormalize="true">';
    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Ad + '" value="' + data[i].Kod + '">' + data[i].Ad + '</option>';
    }
    html += '</select>';

    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSiniflarSelect() {
    var i, html;
    var data = vars.sectionDatas.Siniflar,
        length = data.length,
        id = vars.secionSPs.OOSinif + 'Select',
        section = vars.secionSPs.OOSinif;

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.SinifSec + '" data-liveSearchNormalize="true">';
    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].Kod + '" value="' + data[i].Okul + '-' + data[i].Kod + '">' + data[i].Kod + '</option>';
    }
    html += '</select>';

    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSinavTarihleriSelect(sinif = 0) {
    var html;
    var id = vars.secionSPs.SinavTarihi + 'Select',
        section = vars.secionSPs.SinavTarihi;
    if (sinif == 0) {
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.SinavTarihiSec + '" data-liveSearchNormalize="true" disabled></select>';
    } else {
        var i, length;
        var data = vars.sectionDatas.SinavTarihleri.Data[sinif];
        $('#OOSinif').parents('.ajax-group:first').find('.text-danger:first').remove();
        $('#SinavTarihi').parents('.ajax-group:first').removeClass('has-error').find('.text-danger:first').remove();
        if (data == undefined) {
            messages = {
                SinavTarihi: '<p style="margin:10px 0px;" class="text-danger">Bu sınıf için sınav tarihi bulunmamaktadır.</p>'
            }
            ShowFormErrors(messages);

            $('body').append('<a href="#SinavTarihi" id="smoothScrollTemp"></a>');
            $('#smoothScrollTemp').smoothScroll({
                speed: 600,
                offset: -125
            }).trigger("click").remove();
            GetSinavTarihleriSelect();
        } else {
            length = data.length;

            html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '" id="' + id + '" title="' + formLang.SinavTarihiSec + '" data-liveSearchNormalize="true">';
            for (i = 0; i < length; i++) {
                html += '<option data-tokens="' + data[i].Tarih + '" value="' + data[i].Sinif + '-' + data[i].Tarih + '">' + data[i].Tarih + '</option>';
            }
            html += '</select>';
        }

    }

    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSinavTarihleriData() {
    var url = vars.sectionControllers.SinavTarihleri + vars.sectionFunctions.SinavTarihleriGet;
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
                var cache = result.cachedataEN.SinavTarihleri;
                vars.sectionDatas.SinavTarihleri = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.SinavTarihleri;
                vars.sectionDatas.SinavTarihleri = cache;
            } else {
                var data = result.data,
                    length = data.length,
                    curI = 0;
                var i, j, sLength, tData, curData;

                vars.sectionDatas.SinavTarihleri.Data[0] = new Array();
                vars.sectionDatas.SinavTarihleri.Data[0][0] = {};
                for (i = 1; i <= length; i++) {
                    curData = data[curI];

                    curData.Tarih = curData.Tarih.split('-');
                    curData.Tarih = curData.Tarih[2] + '.' + curData.Tarih[1] + '.' + curData.Tarih[0];
                    tData = curData.Sinif.split(',');

                    for (j = 0, sLength = tData.length; j < sLength; j++) {
                        if (vars.sectionDatas.SinavTarihleri.Data[tData[j]] == undefined) {
                            vars.sectionDatas.SinavTarihleri.Data[tData[j]] = new Array();

                            clength = vars.sectionDatas.SinavTarihleri.Data[tData[j]].length;
                            vars.sectionDatas.SinavTarihleri.Data[tData[j]][clength] = curData;
                        } else {
                            clength = vars.sectionDatas.SinavTarihleri.Data[tData[j]].length;
                            vars.sectionDatas.SinavTarihleri.Data[tData[j]][clength] = curData;
                        }
                    }
                    curI++;
                }
            }
        },
        error: function() {
            iziError();
        }
    });

}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.SinavBasvurusu.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.SinavBasvurusu.BHtml);

    ShortenContent();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.SinavBasvurusu = {
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
                var cache = result.cachedataEN.SinavBasvurusu;
                vars.sectionDatas.SinavBasvurusu = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.SinavBasvurusu;
                vars.sectionDatas.SinavBasvurusu = cache;
            } else {
                var bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    trArray = new Array('AdSoyad');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    vars.sectionDatas.SinavBasvurusu.Data[i] = curData;
                }

                vars.sectionDatas.SinavBasvurusu.BHtml = bHtml;
                vars.sectionDatas.SinavBasvurusu.Num = length;
                var theCacheData = {
                    SinavBasvurusu: vars.sectionDatas.SinavBasvurusu,
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
        newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
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
        '<div class="tab-content">' +

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tc + '</label>' +
        '<input type="text" name="Tc" id="Tc" class="form-control" placeholder="' + formLang.Tc + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.AdSoyad + '</label>' +
        '<input type="text" name="AdSoyad" id="AdSoyad" class="form-control" placeholder="' + formLang.AdSoyad + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Cinsiyet + '</label>' +
        '<div id="' + vars.secionSPs.Cinsiyet + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.DogumTarihi + '</label>' +
        '<input name="DogumTarihi" id="DogumTarihi" class="form-control" type="date" placeholder="' + formLang.DogumTarihi + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.AnneAd + '</label>' +
        '<input name="AnneAd" id="AnneAd" class="form-control" type="text" placeholder="' + formLang.AnneAd + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.AnneTel + '</label>' +
        '<input name="AnneTel" id="AnneTel" class="form-control" type="text" placeholder="' + formLang.AnneTel + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.AnneEmail + '</label>' +
        '<input name="AnneEmail" id="AnneEmail" class="form-control" type="text" placeholder="' + formLang.AnneEmail + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.BabaAd + '</label>' +
        '<input name="BabaAd" id="BabaAd" class="form-control" type="text" placeholder="' + formLang.BabaAd + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.BabaTel + '</label>' +
        '<input name="BabaTel" id="BabaTel" class="form-control" type="text" placeholder="' + formLang.BabaTel + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.BabaEmail + '</label>' +
        '<input name="BabaEmail" id="BabaEmail" class="form-control" type="text" placeholder="' + formLang.BabaEmail + '">' +
        '</div>' + 
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.OOOkul + '</label>' +
        '<input name="OOOkul" id="OOOkul" class="form-control" type="text" placeholder="' + formLang.OOOkul + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.OOSinif + '</label>' +
        '<div id="' + vars.secionSPs.OOSinif + '"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Bolum + '</label>' +
        '<input name="Bolum" id="Bolum" class="form-control" type="text" placeholder="' + formLang.Bolum + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.SinavTarihi + '</label>' +
        '<div id="' + vars.secionSPs.SinavTarihi + '"></div>' +
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


function OutputExcel() {
    var myUrl = vars.sectionControllers.Portal + vars.sectionFunctions.OutputExcel;
    $('body').append('<iframe style="display:none" id="excelDownloader" src="' + myUrl + '"></iframe>');
    setTimeout(function() {
        $('#excelDownloader').remove();
    }, 500);
}

function GetSectionsHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center">' +
        '<h2>' +
        '<span data-baslik="B_' + vars.sectionNames.Upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + vars.sectionNames.Normal + '</span>' +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.AdSoyad + 'asdasd</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
        '<th class="text-center">' + formLang.Sil + '</th>' +
        '</thead>' +
        '<tbody id="show' + vars.sectionNames.Upper + 'Data">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '<div class="marginT15">' +
        '<button type="button" onclick="OutputExcel()" class="btn btn-info btn-md">' + formLang.Indir + '</button>' +
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
        GetSinavTarihleriData()
    }
    if (html != 0) {
        GetSectionsHtml()
        GetSectionsModalHtml()
        CreateSectionsTable()
    }
    if (side != 0) {
        GetCinsiyetlerSelect();
        GetSiniflarSelect();
        GetSinavTarihleriSelect();
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}