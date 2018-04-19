var vars = {
    sectionNames: {
        Normal: 'İnsan Kaynakları',
        Upper: 'InsanKaynaklari',
        Lower: 'insanKaynaklari',
        Kod: 'GIK',
    },
    sectionControllers: {
        Normal: baseurl + 'Insan-Kaynaklari/',
    },
    sectionShowBases: {
        Sections: 'showInsanKaynaklari',
    },
    sectionObjects: {
        Form: 'form',
    },
    sectionFunctions: {
        Add: 'AddInsanKaynaklari',
    },

    sectionDatas: {},

    sectionButtons: {
        Submit: 'btn_Basvur',
    },
};

$(function() {

    //Refresh Page
    RefreshHtmls();
    RefreshData();

    //Button for posting data for add
    $('#' + vars.sectionShowBases.Sections).on('click', '#' + vars.sectionButtons.Submit, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var url = vars.sectionControllers.Normal + vars.sectionFunctions.Add;
            var cv = $('#Cv')[0].files
            if (cv.length >= 1) {
                $('#CvV').val("1")
            }
            var formData = new FormData();
            var file = $('#Cv')[0].files[0];
            var data = vars.sectionObjects.Form.serializeArray();
            data.push({
                name: 'English',
                value: String(en)
            });
            formData.append("file", file);
            $.each(data, function(index, value) {
                formData.append(value.name, value.value);
            });
            $.ajax({
                type: 'ajax',
                method: 'post',
                url: url,
                data: formData,
                dataType: 'json',
                processData: false,
                contentType: false,
                cache: false,
                success: function(response) {
                    console.log(response)
                    ResetFormErrors();
                    if (response.success) {
                        ResetForm(vars.sectionObjects.Form);
                        iziSuccess();
                    } else {
                        var ajaxGroup;
                        if (response.messages.length != 0) {
                            ShowFormErrors(response.messages);
                        } else {
                            RefreshData(1, 1);
                            iziError();
                        }
                    }
                },
                error: function() {
                    RefreshData(1, 1);
                    iziError();
                }
            });
        }
        $link.data('lockedAt', +new Date());
    });

});

function GetInsanKaynaklariHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNames.Lower + '">' +
        '<div class="container">' +
        '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
        '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
        '</div>' +
        '</div>' +
        '<div class="container wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<form role="form" method="post" id="' + vars.sectionNames.Lower + '-form" action="' + vars.sectionControllers.Normal + vars.sectionFunctions.Add + '">' +
        '<div class="row">' +
        '<div class="col-xs-12 col-sm-12 col-md-10 col-lg-10 col-xs-offset-0 col-sm-offset-0 col-md-offset-1 col-lg-offset-1 dark-bg shadow borderRad10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShAdSoyad + '</label>' +
        '<input name="AdSoyad" id="AdSoyad" class="form-control" type="text" placeholder="' + formLang.ShAdSoyad + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShDogumTarihi + '</label>' +
        '<input name="DogumTarihi" id="DogumTarihi" class="form-control" type="date" placeholder="' + formLang.ShDogumTarihi + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShEmail + '</label>' +
        '<input name="Email" id="Email" class="form-control" type="text" placeholder="' + formLang.ShEmail + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShTel + '</label>' +
        '<input name="Tel" id="Tel" class="form-control" type="text" placeholder="' + formLang.ShTel + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShAltTel + '</label>' +
        '<input name="AltTel" id="AltTel" class="form-control" type="text" placeholder="' + formLang.ShAltTel + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShPozisyon + '</label>' +
        '<input name="Pozisyon" id="Pozisyon" class="form-control" type="text" placeholder="' + formLang.ShPozisyon + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShMOO + '</label>' +
        '<input name="MOO" id="MOO" class="form-control" type="text" placeholder="' + formLang.ShMOO + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShBrans + '</label>' +
        '<input name="Brans" id="Brans" class="form-control" type="text" placeholder="' + formLang.ShBrans + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShOTS + '</label>' +
        '<input name="OTS" id="OTS" class="form-control" type="text" placeholder="' + formLang.ShOTS + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShDTS + '</label>' +
        '<input name="DTS" id="DTS" class="form-control" type="text" placeholder="' + formLang.ShDTS + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShYTS + '</label>' +
        '<input name="YTS" id="YTS" class="form-control" type="text" placeholder="' + formLang.ShYTS + '">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 ajax-group">' +
        '<label>' + formLang.ShCv + '</label>' +
        '<input name="Cv" id="Cv" class="form-control" type="file" accept="application/pdf">' +
        '<input name="CvV" id="CvV" type="text" style="display:none;">' +
        '</div>' +

        '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 col-xs-offset-0 col-sm-offset-3 col-md-offset-3 col-lg-offset-3 ajax-group" style="margin-top:10px">' +
        '<button type="button" id="' + vars.sectionButtons.Submit + '" class="btn btn-danger btn-lg btn-block">' + formLang.Basvur + '</button>' +
        '</div>' +


        '</div>' +
        '</div>' +
        '</div>' +
        '</div><!-- End container -->' +
        '</section>';
    $('#' + vars.sectionShowBases.Sections).html(html);
    vars.sectionObjects.Form = $('#' + vars.sectionNames.Lower + '-form');
}

function RefreshData() {}

function RefreshHtmls() {
    GetInsanKaynaklariHtml()
}