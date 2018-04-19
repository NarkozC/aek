vars.sectionDatas.Settings = GetSettingsData();
$(function() {

    setTimeout(function() {
        GetSettingsModalHtml();
        UpdateBasliks();
    }, 300);

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
            setTimeout(function() {
               $(settingsOpts.Objects.Modal).modal('show'); 
            }, 10);
        }
        $link.data('lockedAt', +new Date());
    });

    //Button for updating settings
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

function UpdateBasliks() {
    var settings = GetSettingsData(),
        datas = $("[data-baslik]")
    var curObj, curBaslik, compareBaslik, baslikF;

    datas.each(function(index, value) {
        curObj = $(this)[0];
        curBaslik = $(curObj).data("baslik")
        compareBaslik = settings.filter(function(setting) {
            return setting.Deger3 == curBaslik;
        });
        if (compareBaslik.length > 0) {
            if (en) {
                if (compareBaslik[0].Deger2 != '') {
                    baslikF = compareBaslik[0].Deger2
                } else {
                    baslikF = compareBaslik[0].Deger1
                }
            } else {
                baslikF = compareBaslik[0].Deger1
            }
            $(curObj).html(baslikF)
            if (document.title == compareBaslik[0].Deger1 + ' | Admin AEK') {
                document.title = baslikF + ' | AEK';
            }
        }
    });
}