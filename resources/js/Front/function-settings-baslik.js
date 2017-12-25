$(function() {
    setTimeout(function() {
        UpdateBasliks();
    }, 300);
});

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
            if (document.title == compareBaslik[0].Deger1 + ' | AEK') {
                document.title = baslikF + ' | AEK';
            }
        }
    });
}