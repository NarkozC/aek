var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Iletisim/',
        Portal: baseurl + 'Portal/Admin/Iletisim/',
    },
    sectionNames: {
        Normal: 'İletişim',
        Upper: 'Iletisim',
        Lower: 'iletisim',
        Kod: 'GI',
    },
    sectionShowBases: {
        Sections: 'showIletisim',
        Num: 'showNum',
        Modal: 'showSectionsModal',
        Contact: 'bize-ulasin',
    },
    sectionFunctions: {
        Get: 'GetIletisim',
        Update: 'UpdateIletisim',
        Edit: 'EditIletisim',
    },
    sectionButtons: {
        OpenModal: 'IletisimOpenModal',
        Submit: 'IletisimSubmit',
    },
    sectionDatas: {
        Iletisim: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },

        Contact: {
            DefaultMail: 'halklailiskiler@aek.k12.tr',
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
                            var curData = GetCurData(response.data);

                            trArray = new Array('Ad');
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
                            var tempAd = GetCurData(result.data);
                            var tempAd = tempAd.Ad;
                            $('input[name=No]').val(result.data.No);
                            if (result.data.Kod == "Maps") {
                                $('#Maps').parents('.ajax-group').show();
                                $('#Ad').val(tempAd);
                                $('#Maps').val(result.data.Maps);
                                $('#Tel1').parents('.ajax-group').hide();
                                $('#Tel2').parents('.ajax-group').hide();
                                $('#Tel3').parents('.ajax-group').hide();
                                $('#Email').parents('.ajax-group').hide();
                                $('#YolTarifi').parents('.ajax-group').hide();
                                $('#Adres').parents('.ajax-group').hide();
                            } else {
                                $('#Maps').parents('.ajax-group').hide();
                                $('#Tel1').parents('.ajax-group').show();
                                $('#Tel2').parents('.ajax-group').show();
                                $('#Tel3').parents('.ajax-group').show();
                                $('#Email').parents('.ajax-group').show();
                                $('#YolTarifi').parents('.ajax-group').show();
                                $('#Adres').parents('.ajax-group').show();
                                $('#Ad').val(tempAd);
                                $('#Tel1').val(result.data.Tel1);
                                $('#Tel2').val(result.data.Tel2);
                                $('#Tel3').val(result.data.Tel3);
                                $('#Email').val(result.data.Email);
                                $('#YolTarifi').val(result.data.YolTarifi);
                                $('#Adres').val(result.data.Adres);
                            }
                            

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

});

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.Iletisim.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Iletisim.BHtml);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.Iletisim = {
        Data: new Array(),
        FHtml: '',
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
                var cache = result.cachedataEN.Iletisim;
                vars.sectionDatas.Iletisim = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Iletisim;
                vars.sectionDatas.Iletisim = cache;
            } else {
                var fHtml = '',
                    bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trArray, trInside;

                fHtml += '<section id="' + vars.sectionNames.Lower + '">' +
                    '<div class="container">' +
                    '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
                    '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
                    '</div>' +
                    '</div>' +
                    '<div class="container">';

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);
                    data[i] = curData;

                    trArray = new Array('Ad');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    if (curData.Kod == "Kolej") {
                        fHtml += '<div class="col-xs-offset-0 col-sm-offset-0 col-md-offset-1 col-lg-offset-0 col-xs-12 col-sm-12 col-md-10 col-lg-3 marginT15 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow">' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header text-center" data-wow-delay="">' +
                            '<h4>' + curData.Ad + '</h4>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                            '<a href="tel:' + curData.Tel1D + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal">' +
                            '<div class="row disFlex">' +
                            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                            '<i class="fa fa-2x fa-phone posRelVerCen"></i>' +
                            '</div>' +
                            '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                            '<div class="posRelVerCen">' + curData.Tel1 + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                            '<a href="tel:' + curData.Tel2D + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal">' +
                            '<div class="row disFlex">' +
                            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                            '<i class="fa fa-2x fa-phone posRelVerCen"></i>' +
                            '</div>' +
                            '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                            '<div class="posRelVerCen">' + curData.Tel2 + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                            '<a href="tel:' + curData.Tel3D + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal">' +
                            '<div class="row disFlex">' +
                            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                            '<i class="fa fa-2x fa-phone posRelVerCen"></i>' +
                            '</div>' +
                            '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                            '<div class="posRelVerCen">' + curData.Tel3 + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                            '<a href="#' + vars.sectionContactShowID + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal mailL">' +
                            '<div class="row disFlex">' +
                            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                            '<i class="fa fa-2x fa-envelope posRelVerCen"></i>' +
                            '</div>' +
                            '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                            '<div class="posRelVerCen mailM">' + curData.Email + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                            '<a href="' + curData.YolTarifi + '" class="btn btn-danger btn-md btn-block whiteSpaceNormal">' +
                            '<div class="row disFlex">' +
                            '<div class="col-xs-2 col-sm-2 col-md-2 col-lg-2">' +
                            '<i class="fa fa-2x fa-map-marker posRelVerCen"></i>' +
                            '</div>' +
                            '<div class="col-xs-10 col-sm-10 col-md-10 col-lg-10 text-center">' +
                            '<div class="posRelVerCen">' + curData.Adres + '</div>' +
                            '</div>' +
                            '</div>' +
                            '</a>' +
                            '</div>' +
                            '</div>' +
                            '</div>';
                    } else if (curData.Kod == "Maps") {
                        fHtml += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                            '<iframe class="iltGM" frameborder="0" style="border:0" ' +
                            'src="' + curData.Maps + '" allowfullscreen></iframe>' +
                            '</div>' +
                            '</div>';
                    }

                }

                fHtml += '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT15 wow ' + Animation + '" data-wow-delay="' + wowDelay + '" id="' + vars.sectionShowBases.Contact + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 dark-bg shadow">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 padding0 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header text-center">' +
                    '<h3>' + formLang.BizeUlasin + '</h3>' +
                    '</div>' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 paddingLR0 marginT10">' +
                    '<form id="' + vars.sectionNames.Lower + '-form" class="text-center" role="form" method="post">' +
                    '<input name="MAdres" id="MAdres" type="hidden" value="' + vars.sectionDatas.Contact.DefaultMail + '">' +
                    '<div class="ajax-group input-group">' +
                    '<span class="input-group-addon"><i class="fa fa-lg fa-user" aria-hidden="true"></i></span>' +
                    '<input name="AdSoyad" id="AdSoyad" class="form-control" type="text" placeholder="' + formLang.AdSoyad + '">' +
                    '</div>' +
                    '<div class="ajax-group input-group">' +
                    '<span class="input-group-addon"><i class="fa fa-lg fa-envelope" aria-hidden="true"></i></span>' +
                    '<input name="Email" id="Email" class="form-control" type="text" placeholder="' + formLang.Email + '">' +
                    '</div>' +
                    '<div class="ajax-group input-group">' +
                    '<span class="input-group-addon"><i class="fa fa-lg fa-comment" aria-hidden="true"></i></span>' +
                    '<textarea rows="4" class="form-control" id="Mesaj" name="Mesaj" placeholder="' + formLang.Mesaj + '"></textarea>' +
                    '</div>' +
                    '<div class="ajax-group">' +
                    '<div id="ireCaptcha"></div>' +
                    '</div>' +
                    '<button type="button" id="' + vars.sectionButtons.Submit + '" class="btn-danger btn btn-lg btn-block">' + formLang.Gonder + '</button>' +
                    '</form>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</section>';

                vars.sectionObjects.Form = $('#' + vars.sectionNameLower + '-form');

                vars.sectionDatas.Iletisim.FHtml = fHtml;
                vars.sectionDatas.Iletisim.BHtml = bHtml;
                vars.sectionDatas.Iletisim.Data = data;
                vars.sectionDatas.Iletisim.Num = length;
                var theCacheData = {
                    Iletisim: vars.sectionDatas.Iletisim,
                }
                setTimeout(Cache('GetIletisim', url, theCacheData), 1);

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
    var listOrder = data.ListOrder

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content6">' + data[trArray[i]] + '</td>';
    }

    newHtml +=
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
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
        '<label>' + formLang.Ad + '</label>' +
        '<input type="text" name="Ad" id="Ad" class="form-control" placeholder="' + formLang.Ad + '" disabled></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tel + '1</label>' +
        '<input type="text" name="Tel1" id="Tel1" class="form-control" placeholder="' + formLang.Tel + '1"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tel + '2</label>' +
        '<input type="text" name="Tel2" id="Tel2" class="form-control" placeholder="' + formLang.Tel + '2"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tel + '3</label>' +
        '<input type="text" name="Tel3" id="Tel3" class="form-control" placeholder="' + formLang.Tel + '3"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Email + '</label>' +
        '<input type="text" name="Email" id="Email" class="form-control" placeholder="' + formLang.Email + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.YolTarifi + '</label>' +
        '<textarea name="YolTarifi" id="YolTarifi" class="form-control" placeholder="' + formLang.YolTarifi + '" rows="3"></textarea>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Adres + '</label>' +
        '<textarea name="Adres" id="Adres" class="form-control" placeholder="' + formLang.Adres + '" rows="4"></textarea>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.GMaps + '</label>' +
        '<textarea name="Maps" id="Maps" class="form-control" placeholder="' + formLang.GMaps + '" rows="4"></textarea>' +
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
        '<th class="text-center">' + formLang.Ad + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
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
    }
    if (side != 0) {
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}