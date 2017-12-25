var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Footer/',
        Portal: baseurl + 'Portal/Admin/Footer/',
    },
    sectionNames: {
        Normal: 'Footer',
        Upper: 'Footer',
        Lower: 'footer',
        Kod: 'GF',
    },
    sectionShowBases: {
        Sections: 'showFooterS',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetFooter',
        Update: 'UpdateFooter',
        Edit: 'EditFooter',
    },
    sectionButtons: {
        OpenModal: 'FooterOpenModal',
        Submit: 'FooterSubmit',
    },
    sectionDatas: {
        Footer: {
            Data: {},
            FHtml: '',
            BHtml: '',
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

                            trArray = new Array('Facebook', 'Twitter', 'Instagram');
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
                            $('#tr_Facebook').val(result.data.tr_Facebook);
                            $('#en_Facebook').val(result.data.en_Facebook);
                            $('#tr_Twitter').val(result.data.tr_Twitter);
                            $('#en_Twitter').val(result.data.en_Twitter);
                            $('#tr_Instagram').val(result.data.tr_Instagram);
                            $('#en_Instagram').val(result.data.en_Instagram);

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

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.Footer.BHtml);

    ShortenContent6();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.Footer = {
        Data: {},
        FHtml: '',
        BHtml: '',
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
                var cache = result.cachedataEN.Footer;
                vars.sectionDatas.Footer = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Footer;
                vars.sectionDatas.Footer = cache;
            } else {
                var fhtml = '',
                    bHtml = '',
                    data = result.data,
                    intYear = new Date(),
                    intYear = intYear.getFullYear();
                var i, curData, trInside, trArray;

                curData = GetCurData(data);

                trArray = new Array('Facebook', 'Twitter', 'Instagram');
                trInside = GetHtmlTr(curData, trArray);
                bHtml += '<tr>' + trInside + '</tr>';

                vars.sectionDatas.Footer.Data = curData;

                fhtml += '<section id="' + vars.sectionNames.Lower + '" class="wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                    '<div class="container-fluid dark-bg shadow wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 page-header">' +
                    '<ul class="social">' +
                    '<li class="facebook"><a href="' + curData.Facebook + '"><i class="fa fa-facebook fa-2x"></i></a></li>' +
                    '<li class="twitter"><a href="' + curData.Twitter + '"><i class="fa fa-twitter fa-2x"></i></a></li>' +
                    '<li class="youtube"><a href="' + curData.Youtube + '"><i class="fa fa-youtube fa-2x"></i></a></li>' +
                    '<li class="instagram"><a href="' + curData.Instagram + '"><i class="fa fa-instagram fa-2x"></i></a></li>' +
                    '</ul>' +
                    '</div>' +
                    '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 text-center">' +
                    '<p class="co">Copyright © ' + intYear + ' AEK. ' +
                    '<i class="fa fa-lg fa-paint-brush" aria-hidden="true"></i> ' +
                    '<i class="fa fa-lg fa-code" aria-hidden="true"></i> ' +
                    'by <b class="hvr-wobble-skew">Doğucan Şaşıoğlu</b></p>' +
                    '</div>' +
                    '</div>' +
                    '</section>';

                vars.sectionDatas.Footer.FHtml = fhtml;
                vars.sectionDatas.Footer.BHtml = bHtml;
                var theCacheData = {
                    Footer: vars.sectionDatas.Footer,
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
        '<label>' + formLang.Facebook + '</label>' +
        '<input type="text" name="tr_Facebook" id="tr_Facebook" class="form-control" placeholder="' + formLang.Facebook + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Twitter + '</label>' +
        '<input type="text" name="tr_Twitter" id="tr_Twitter" class="form-control" placeholder="' + formLang.Twitter + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Instagram + '</label>' +
        '<input type="text" name="tr_Instagram" id="tr_Instagram" class="form-control" placeholder="' + formLang.Instagram + '"></input>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Facebook + '</label>' +
        '<input type="text" name="en_Facebook" id="en_Facebook" class="form-control" placeholder="' + formLang.Facebook + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Twitter + '</label>' +
        '<input type="text" name="en_Twitter" id="en_Twitter" class="form-control" placeholder="' + formLang.Twitter + '"></input>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Instagram + '</label>' +
        '<input type="text" name="en_Instagram" id="en_Instagram" class="form-control" placeholder="' + formLang.Instagram + '"></input>' +
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

    html += '<section id="' + vars.sectionNames.Lower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center">' +
        '<h2>' +
        vars.sectionNames.Normal +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Facebook + '</th>' +
        '<th class="text-center">' + formLang.Twitter + '</th>' +
        '<th class="text-center">' + formLang.Instagram + '</th>' +
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
    if (side != 0) {}

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent6();
        }
        isFirst = false;
    }, 5);
}