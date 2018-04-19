var linkLockedTime = 300;

function FunOpenModal(sBase, sButton, url, sForm, sModal, functions) {
    $('#' + sBase).on('click', '#' + sButton, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var formAction = url;
            $(sForm).attr('action', formAction);
            ResetForm(sForm);
            if (functions != null) {
                functions()
            }
            $('.nav-tabs a[href="#' + formTabs.Turkce + '"]').tab('show');
            $(sModal).modal('show');
        }
        $link.data('lockedAt', +new Date());
    });
}

function FunDelete(sBase, sButton, url, refreshFun, refreshPars, willDeleteFile = false, kategori = '') {
    $('#' + sBase).on('click', '.' + sButton, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > linkLockedTime) {
            var btn = $(this);
            var no = $(this).attr('data');
            var dosya;
            var fileToRemove;
            var data = {
                No: no
            }
            if (willDeleteFile) {
                dosya = $(this).attr('data2');
                if (kategori == '') {
                    kategori = $(this).attr('data3');
                }
                fileToRemove = 'resources/' + kategori + '/' + dosya;
                data.file_to_remove = fileToRemove;
            }

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

                        furl = url
                        $.ajax({
                            type: 'ajax',
                            method: 'post',
                            url: furl,
                            data: data,
                            dataType: 'json',
                            success: function(result) {
                                if (result.success) {
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');

                                    $(btn).parents('tr:first').css('background-color', '#ccc').fadeOut('slow', function() {
                                        $(this).remove();
                                    });

                                    iziSuccess();
                                } else {
                                    instance.hide(toast, {
                                        transitionOut: 'fadeOutDown'
                                    }, 'button');
                                    iziError();
                                }
                            },
                            error: function() {
                                instance.hide(toast, {
                                    transitionOut: 'fadeOutDown'
                                }, 'button');
                                iziError();
                            },
                            complete: function() {
                                var sayfaID = $(btn).parents('tbody:first').attr('id');
                                var rowCount = $('#' + sayfaID + ' tr').length;
                                if (rowCount == 1) {
                                    setTimeout(function() {
                                        refreshFun(refreshPars[0], refreshPars[1], refreshPars[2])
                                    }, 150);
                                }
                                $(vars.sectionObjects.Modal).modal('hide');
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

}


function FunSelect(data, sectionSP, formLSec, tokens, value, show, isMultiple = false, isResimler = false, isDataItself = false) {
    var i, html,
        showMultiple = "",
        showMultiple2 = "",
        curData = data,
        length = curData.length,
        id = sectionSP + 'Select',
        section = sectionSP;

    if (isMultiple) {
        showMultiple = "[]";
        showMultiple2 = 'multiple data-selected-text-format="count > 2"'
    }


    html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + showMultiple + '" id="' + id + '" title="' + formLSec + '" data-liveSearchNormalize="true" ' + showMultiple2 + '>';

    if (isResimler) {
        html += data.Html;
    } else {
        if (isDataItself) {
            for (i = 0; i < length; i++) {
                html += '<option data-tokens="' + data[i] + '" value="' + data[i] + '">' + data[i] + '</option>';
            }
        } else {
            for (i = 0; i < length; i++) {
                html += '<option data-tokens="' + data[i][tokens] + '" value="' + data[i][value] + '">' + data[i][show] + '</option>';
            }
        }
    }

    html += '</select>';
    if (isMultiple) {
        html += '<input name="' + section + 'V" id="' + section + 'V" type="text" style="display:none;">';
    }
    $('#' + section).html(html);
    RefreshSelectpicker();
    if (isMultiple) {
        $('#' + id).on('changed.bs.select', function() {
            if ($('#' + id).selectpicker('val') != "") {
                $('#' + section + 'V').val("1");
            } else {
                $('#' + section + 'V').val("");
            }
        })
    }
}

function FunCreateModalHtml(lower = "", isTrEn = false, genel = new Array(), turkce = new Array(), ingilizce = new Array(), submitButton = "", submitText = formLang.Kaydet, cancelText = formLang.Iptal) {
    var i, length,
        theHtml = "";

    if (isTrEn) {
        theHtml =
            '<div class="modal fade ajax-modal" id="' + lower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header" align="center">' +
            '<img class="maxW150" src="' + logoUrl + '">' +
            modalOpts.ModalCloseButton +
            '</div>' +
            '<form role="form" method="post" id="' + lower + '-form" class="form-horizontal" action="">' +
            '<div class="modal-body">' +
            '<ul class="nav nav-tabs" role="tablist">' +
            '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#' + formTabs.Turkce + '" aria-controls="' + formTabs.Turkce + '" role="tab" data-toggle="tab">' + formLang.Turkce + '</a></li>' +
            '<li role="presentation"><a class="hvr-wobble-top" href="#' + formTabs.Ingilizce + '" aria-controls="' + formTabs.Ingilizce + '" role="tab" data-toggle="tab">' + formLang.Ingilizce + '</a></li>' +
            '</ul>' +
            '<div class="tab-content">' +
            '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
            '<div role="tabpanel" class="tab-pane fade in active" id="' + formTabs.Turkce + '">';

        for (i = 0, length = turkce.length; i < length; i++) {
            theHtml +=
                '<div class="ajax-group col-sm-12 paddingLR0">' +
                turkce[i] +
                '</div>';
        }

        theHtml +=
            '</div>' +
            '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">';

        for (i = 0, length = ingilizce.length; i < length; i++) {
            theHtml +=
                '<div class="ajax-group col-sm-12 paddingLR0">' +
                ingilizce[i] +
                '</div>';
        }
        theHtml +=
            '</div>';

        for (i = 0, length = genel.length; i < length; i++) {
            theHtml +=
                '<div class="ajax-group col-sm-12 paddingLR0">' +
                genel[i] +
                '</div>';
        }
        theHtml +=
            '</div>' +
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" id="' + submitButton + '" class="btn btn-info btn-lg btn-block">' + submitText + '</button>' +
            '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + cancelText + '</button>' +
            '</div>' +
            '</form> ' +
            '</div>' +
            '</div>' +
            '</div>';
    } else {
        theHtml =
            '<div class="modal fade ajax-modal" id="' + lower + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
            '<div class="modal-dialog">' +
            '<div class="modal-content">' +
            '<div class="modal-header" align="center">' +
            '<img class="maxW150" src="' + logoUrl + '">' +
            modalOpts.ModalCloseButton +
            '</div>' +
            '<form role="form" method="post" id="' + lower + '-form" class="form-horizontal" action="">' +
            '<div class="modal-body">' +

            '<input type="hidden" name="No" id="No" class="form-control" value="0">';

        for (i = 0, length = genel.length; i < length; i++) {
            theHtml +=
                '<div class="ajax-group col-sm-12 paddingLR0">' +
                genel[i] +
                '</div>';
        }

        theHtml +=
            '</div>' +
            '<div class="modal-footer">' +
            '<button type="button" id="' + submitButton + '" class="btn btn-info btn-lg btn-block">' + submitText + '</button>' +
            '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + cancelText + '</button>' +
            '</div>' +
            '</form>' +
            '</div>' +
            '</div>' +
            '</div>';
    }

    return theHtml;
}

function CreateSectionHtml(lower, upper, normal, buttons = new Array(), tableTHs, modalID = "", hasTabs = false, tabData = new Array(), tabLength = 0, tabHref = "", tabShow = "") {
    var html = '',
        i = 0,
        j = 0,
        curLength = 0,
        buttonMarginL = 0;

    html += '<section id="' + lower + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center">' +
        '<h2>';

    for (i = 0, curLength = buttons.length; i < curLength; i++) {
        html += buttons[i];
    }
    html += '<span data-baslik="B_' + upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + normal + '</span>' +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';

    if (hasTabs) {
        html += '<div class="panel with-nav-tabs panel-default">' +
            '<div class="panel-heading">' +
            '<ul class="nav nav-tabs">';

        for (i = 0; i < tabLength; i++) {
            if (i == 0) {
                html += '<li class="active"><a href="#' + tabData[i][tabHref] + '" data-toggle="tab">' + tabData[i][tabShow] + '</a></li>';
            } else {
                html += '<li><a href="#' + tabData[i][tabHref] + '" data-toggle="tab">' + tabData[i][tabShow] + '</a></li>';
            }
        }

        html += '</ul>' +
            '</div>' +
            '<div class="panel-body">' +
            '<div class="tab-content">';

        for (i = 0; i < tabLength; i++) {
            if (i == 0) {
                html += '<div class="tab-pane fade in active" id="' + tabData[i][tabHref] + '">';
            } else {
                html += '<div class="tab-pane fade" id="' + tabData[i][tabHref] + '">';
            }
            html += '<div class="table-responsive">' +
                '<table class="table table-bordered table-hover datatable">' +
                '<thead class="text-center">';

            for (j = 0; j < tableTHs.length; j++) {
                html += '<th class="text-center">' + tableTHs[j] + '</th>';
            }

            html += '</thead>' +
                '<tbody id="show' + upper + 'Data' + tabData[i][tabHref] + '">' +
                '</tbody>' +
                '</table>' +
                '</div>' +
                '</div>';
        }

        html += '</div>' +
            '</div>' +
            '</div>';
    } else {
        html += '<div class="table-responsive">' +
            '<table class="table table-bordered table-hover datatable">' +
            '<thead class="text-center">';

        for (j = 0; j < tableTHs.length; j++) {
            html += '<th class="text-center">' + tableTHs[j] + '</th>';
        }

        html += '</thead>' +
            '<tbody id="show' + upper + 'Data">' +
            '</tbody>' +
            '</table>' +
            '</div>';
    }

    html += '</div>' +
        '<div id="' + modalID + '"></div>' +
        '</div>' +
        '</section>';

    return html;
}

function FunUp(sectionBase, url, refreshFun, refreshPars) {
    $('#' + sectionBase).on('click', '.' + tableOpts.ButtonUp, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var no = $(this).attr('data');
            var listOrder = $(this).attr('data2');
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: url,
                data: {
                    No: no,
                    ListOrder: listOrder
                },
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        iziSuccess();
                        targetListOrder = Number(listOrder) - 1;
                        var upBtn = $('#' + sectionBase + ' tr .item-up[data2=' + listOrder + ']')
                        var downBtn = $('#' + sectionBase + ' tr .item-down[data2=' + listOrder + ']')
                        var tr = upBtn.parents('tr:first');
                        if ($('#' + sectionBase + ' tr .item-up[data2=' + targetListOrder + ']').length) {
                            var targetUpBtn = $('#' + sectionBase + ' tr .item-up[data2=' + targetListOrder + ']')
                            var targetDownBtn = $('#' + sectionBase + ' tr .item-down[data2=' + targetListOrder + ']')
                            var targetTr = targetUpBtn.parents('tr:first');
                            targetTr.css('background-color', '#ccc').fadeOut('normal', function() {
                                targetUpBtn.attr('data2', listOrder);
                                targetDownBtn.attr('data2', listOrder);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                            tr.css('background-color', '#ccc').fadeOut('normal', function() {
                                upBtn.attr('data2', targetListOrder);
                                downBtn.attr('data2', targetListOrder);
                                $(tr).after(targetTr);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                        } else {
                            refreshFun(refreshPars)
                        }
                    } else {
                        iziError();
                        refreshFun(refreshPars)
                    }

                },
                error: function() {
                    iziError();
                    refreshFun(refreshPars)
                }
            });
        }
        $link.data('lockedAt', +new Date());
    });
}

function FunDown(sectionBase, url, refreshFun, refreshPars) {
    $('#' + sectionBase).on('click', '.' + tableOpts.ButtonDown, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var no = $(this).attr('data');
            var listOrder = $(this).attr('data2');
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: url,
                data: {
                    No: no,
                    ListOrder: listOrder
                },
                dataType: 'json',
                success: function(result) {
                    if (result.success) {
                        iziSuccess();
                        targetListOrder = Number(listOrder) + 1;
                        var upBtn = $('#' + sectionBase + ' tr .item-up[data2=' + listOrder + ']')
                        var downBtn = $('#' + sectionBase + ' tr .item-down[data2=' + listOrder + ']')
                        var tr = upBtn.parents('tr:first');
                        if ($('#' + sectionBase + ' tr .item-up[data2=' + targetListOrder + ']').length) {
                            var targetUpBtn = $('#' + sectionBase + ' tr .item-up[data2=' + targetListOrder + ']')
                            var targetDownBtn = $('#' + sectionBase + ' tr .item-down[data2=' + targetListOrder + ']')
                            var targetTr = targetUpBtn.parents('tr:first');
                            targetTr.css('background-color', '#ccc').fadeOut('normal', function() {
                                targetUpBtn.attr('data2', listOrder);
                                targetDownBtn.attr('data2', listOrder);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                            tr.css('background-color', '#ccc').fadeOut('normal', function() {
                                upBtn.attr('data2', targetListOrder);
                                downBtn.attr('data2', targetListOrder);
                                $(targetTr).after(tr);
                                $(this).css('background-color', '#EDEDED').fadeIn();
                            });
                        } else {
                            refreshFun(refreshPars)
                        }
                    } else {
                        iziError();
                        refreshFun(refreshPars)
                    }

                },
                error: function() {
                    iziError();
                    refreshFun(refreshPars)
                }
            });
        }
        $link.data('lockedAt', +new Date());
    });
}