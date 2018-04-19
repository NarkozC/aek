var vars = {
    form: {
        Kadro: 'form',
        KadroGrup: 'form',
    },
    modal: {
        Kadro: 'modal',
        KadroGrup: 'modal',
    },
    sectionNameNormal: {
        Kadro: 'Kadro',
        KadroGrup: 'Kadro Grupları'
    },
    sectionNameLower: {
        Kadro: 'kadrolar',
        KadroGrup: 'kadroGrup',
    },
    sectionNameUpper: {
        Kadro: 'Kadro',
        KadroGrup: 'KadroGrup',
    },
    sectionPortalController: baseurl + 'Portal/Admin/Kadro/',
    sectionController: baseurl + 'Kadro/',
    sectionShowBases: {
        Kadro: '#showKadro',
        KadroGrup: '#showKadroGrup'
    },
    sectionBaslikIDs: {
        Kadro: "GK",
        YonetimKurulu: "GYK",
        OkulAileBirligi: "GOAB"
    },
    sectionDatas: {
        KadroData: {
            Grups: {},
            GrupsCounter: {},
            SectionID: "kadro",
            ShowID: "#showKadro",
        },

        KadroGrupData: {
            Mains: new Array(),
            MainsCounter: 0,
            Subs: {},
            SubsCounter: {},
            SubSubs: {},
            SubSubsCounter: {},
            SubSubsTemp: new Array(),
            SubSubsCounterTemp: 0,

            Tabs: new Array('gruplar', 'aciklamalar'),
        },

        Resimler: GetResimlerData(),
    },
    sectionFunctions: {
        KadroGrupGet: 'GetKadroGrup',
        KadroGrupAdd: 'AddKadroGrup',
        KadroGrupUpdate: 'UpdateKadroGrup',
        KadroGrupEdit: 'EditKadroGrup',
        KadroGrupDelete: 'DeleteKadroGrup',
        KadroGrupNum: 'GetKadroGrupNum',
        KadroGrupUp: 'UpKadroGrup',
        KadroGrupDown: 'DownKadroGrup',

        KadroGet: 'GetKadro',
        KadroAdd: 'AddKadro',
        KadroUpdate: 'UpdateKadro',
        KadroEdit: 'EditKadro',
        KadroDelete: 'DeleteKadro',
        KadroNum: 'GetKadroNum',
        KadroUp: 'UpKadro',
        KadroDown: 'DownKadro',
    },
    sectionNumShowIDs: {
        Kadro: 'KadroNum',
        KadroGrup: 'KadroGrupNum',
    },
    sectionNumDatas: {
        Kadro: 0,
        KadroGrup: 0,
    },
    sectionButtons: {
        KadroOpenModal: 'KadroOpenModal',
        KadroAddUpdateSubmit: 'KadroAddUpdateSubmit',

        KadroGrupOpenModal: 'KadroGrupOpenModal',
        KadroGrupAddUpdateSubmit: 'KadroGrupAddUpdateSubmit',

    },
    sectionIsFirst: {
        Kadro: true,
        KadroGrup: true,

        GetGrupSectionID: true,
        GetAciklama: true,
    },
};

window.alert = function() {};
$(function() {
    //Refresh Page
    RefreshData(1, 1);
});

function GetResimler(who = '') {
    var ID = 'ResimSelect';
    var Section = 'Resim';
    var html = '';
    if (vars.sectionIsFirst.GetResimler) {
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true" disabled></select>';
        vars.sectionIsFirst.GetResimler = false;
        $(vars.sectionShowBases.Kadro + ' #' + Section).parent('.ajax-group').hide()
    } else {
        var data = vars.sectionDatas.Resimler
                var i;
                var length = data.length;
                var lastParts = data.Html;

                if (who == 'okul-aile-birligi-galeri') {
                    html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '[]" id="' + ID + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">';
                } else {
                    html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true">';
                }

                for (i = 0; i < length; i++) {
                    html += '<option data-tokens="' + data[i].RKategori + '/' + data[i].RDosya + ' ' + data[i].RIsim + ' ' + data[i].RKategori + '" value="' + data[i].RKategori + '/' + data[i].RDosya + '">' + data[i].RIsim + ' (' + data[i].RKategori + ')</option>';
                }
                lastParts += '</select>';
                html += lastParts;
            
        $(vars.sectionShowBases.Kadro + ' #' + Section).parent('.ajax-group').show()
    }
    $(vars.sectionShowBases.Kadro + ' #' + Section).html(html);
    RefreshSelectpicker();

}

function GetSayfa() {
    var i;
    var data = vars.sectionDatas.KadroGrupData.Mains;
    var length = data.length;
    var ID = 'SayfaSelect';
    var Section = 'Sayfa';

    var html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID + '" title="' + formLang.SayfaSec + '" data-liveSearchNormalize="true">';

    for (i = 0; i < length; i++) {
        html += '<option data-tokens="' + data[i].KisaAd + ' ' + data[i].MainSectionID + '" value="' + data[i].MainSectionID + '">' + data[i].KisaAd + '</option>';
    }

    html += '</select>';
    $(vars.sectionShowBases.Kadro + ' #' + Section).html(html);

    $(vars.sectionShowBases.Kadro + ' #' + Section).on('change', '#' + ID, function(e) {
        var valueSelected = this.value;
        vars.sectionIsFirst.GetAciklama = true;
        GetResimler(valueSelected);
        GetGrupSectionID(valueSelected);
        GetAciklama();
        if (valueSelected == 'yonetim-kurulu' || valueSelected == 'okul-aile-birligi-galeri') {
            $(vars.modal.Kadro).find('.nav-tabs').show();
            $(vars.modal.Kadro).find('.tab-pane').show();
            $(vars.modal.Kadro).find('.nav-tabs').removeAttr("style")
            $(vars.modal.Kadro).find('.tab-pane').removeAttr("style")
            $(vars.modal.Kadro).find('.nav-tabs a[href="#' + formTabs.Turkce + '"]').tab('show');
        } else {
            $(vars.modal.Kadro).find('.nav-tabs').hide();
            $(vars.modal.Kadro).find('.tab-pane').hide();
        }
        if (valueSelected != 'okul-aile-birligi-galeri') {
            $(vars.modal.Kadro).find('#AdSoyad').parent('.ajax-group').show();
            $(vars.modal.Kadro).find('#AdSoyad').parent('.ajax-group').removeAttr("style")
        } else {
            $(vars.modal.Kadro).find('#AdSoyad').parent('.ajax-group').hide();
        }
    });

    RefreshSelectpicker();
}

function GetGrupSectionID(who = '') {
    var ID = 'GrupSectionIDSelect';
    var Section = 'GrupSectionID';
    var html = '';
    if (vars.sectionIsFirst.GetGrupSectionID) {
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID +
            '" title="' + formLang.GrupSectionIDSec + '" data-liveSearchNormalize="true" disabled></select>';
        vars.sectionIsFirst.GetGrupSectionID = false;
        $('#' + Section).parent('.ajax-group').hide()
    } else if (who != '') {
        var i;
        var data = vars.sectionDatas.KadroGrupData.Subs[who];
        var length = data.length;

        html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID + '" title="' + formLang.GrupSectionIDSec + '" data-liveSearchNormalize="true">';

        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + data[i].KisaAd + ' ' + data[i].SubSectionID + '" value="' + data[i].SubSectionID + '">' + data[i].KisaAd + '</option>';
        }

        html += '</select>';

        $(vars.sectionShowBases.Kadro + ' #' + Section).on('change', '#' + ID, function(e) {
            var valueSelected = this.value;
            GetAciklama(valueSelected);
        });
        $(vars.sectionShowBases.Kadro + ' #' + Section).parent('.ajax-group').show()
    }
    $('#' + Section).html(html);
    RefreshSelectpicker();

}


function GetAciklama(who = '') {
    var ID = 'AciklamaSelect';
    var Section = 'Aciklama';
    var html = '';
    if (vars.sectionIsFirst.GetAciklama) {
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID +
            '" title="' + formLang.AciklamaSec + '" data-liveSearchNormalize="true" disabled></select>';
        vars.sectionIsFirst.GetAciklama = false;
        $('#' + Section).parent('.ajax-group').hide()
    } else if (who != '') {
        var i;
        var data = vars.sectionDatas.KadroGrupData.SubSubs[who];
        var length = data.length;

        html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID + '" title="' + formLang.AciklamaSec + '" data-liveSearchNormalize="true">';
        for (i = 0; i < length; i++) {
            html += '<option data-tokens="' + data[i].KisaAd + ' ' + data[i].SubSectionID + '" value="' + data[i].SubSectionID + '">' + data[i].KisaAd + '</option>';
        }

        html += '</select>';
        $('#' + Section).parent('.ajax-group').show()
    }
    $(vars.sectionShowBases.Kadro + ' #' + Section).html(html);

    RefreshSelectpicker();

}

function GetMainOrSub() {
    var ID = 'MainOrSubSelect';
    var Section = 'MainOrSub';
    var html = '';

    html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID + '" title="' + formLang.TipSec + '" data-liveSearchNormalize="true">' +
        '<option data-tokens="Sub ' + formLang.Grup + '" value="Sub">' + formLang.Grup + '</option>' +
        '<option data-tokens="SubSub ' + formLang.Aciklama + '" value="SubSub">' + formLang.Aciklama + '</option>' +
        '</select>';

    $(vars.sectionShowBases.KadroGrup + ' #' + Section).on('change', '#' + ID, function(e) {
        var valueSelected = this.value;
        GetMainSectionID(valueSelected);
    });
    $('#' + Section).html(html);
    RefreshSelectpicker();
}

function GetMainSectionID(who = '') {
    if (who != '') {
        var i;
        var data;
        var length;
        var ID = 'MainSectionIDSelect';
        var Section = 'MainSectionID';
        var html = '';
        if (who == 'Sub') {
            $(vars.modal.KadroGrup).find('#LMainSectionID').html(formLang.Sayfa)
            data = vars.sectionDatas.KadroGrupData.Mains;
            html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID + '" title="' + formLang.SayfaSec + '" data-liveSearchNormalize="true">';
            for (i = 0, length = data.length; i < length; i++) {
                if (data[i].MainSectionID == "kadro") {
                    html += '<option data-tokens="' + data[i].KisaAd + ' ' + data[i].MainSectionID + '" value="' + data[i].MainSectionID + '">' + data[i].KisaAd + '</option>';
                }
            }
        } else if (who == 'SubSub') {
            $(vars.modal.KadroGrup).find('#LMainSectionID').html(formLang.Grup)
            data = vars.sectionDatas.KadroGrupData.Subs;
            html = '<select class="form-control selectpicker" data-live-search="true" name="' + Section + '" id="' + ID + '" title="' + formLang.GrupSec + '" data-liveSearchNormalize="true">';
            $.each(data, function(key, element) {
                for (i = 0, length = element.length; i < length; i++) {
                    html += '<option data-tokens="' + element[i].KisaAd + ' ' + element[i].SubSectionID + '" value="' + element[i].SubSectionID + '">' + element[i].KisaAd + '</option>';
                }
            });
        }

        html += '</select>';
        $(vars.sectionShowBases.KadroGrup + ' #' + Section).html(html);
        $(vars.modal.KadroGrup).find('#MainSectionID').parent('.ajax-group').show();
        $(vars.modal.KadroGrup).find('#MainSectionID').parent('.ajax-group').removeAttr("style")
        $(vars.modal.KadroGrup).find('.nav-tabs').show();
        $(vars.modal.KadroGrup).find('.nav-tabs').removeAttr("style")
        $(vars.modal.KadroGrup).find('.tab-pane').show();
        $(vars.modal.KadroGrup).find('.tab-pane').removeAttr("style")
        RefreshSelectpicker();
    }
}

function GetKadroNum() {
    $('#' + vars.sectionNumShowIDs.Kadro).html(vars.sectionDatas.KadroData.Num);
}

function GetKadroGrupNum() {
    $('#' + vars.sectionNumShowIDs.KadroGrup).html(vars.sectionDatas.KadroData.Num);
}

//functions

function GetKadro() {

    var i, j;
    var sectionID;
    var data = vars.sectionDatas.KadroData.Grups;
    var length, len;
    var curContent;
    var curData;
    var trInside;
    var htmls = new Array();
    var trArray;
    var namedSubsArray = new Array("kadro", "yonetim-kurulu", "okul-aile-birligi", "okul-aile-birligi-galeri")

    for (i = 0, len = namedSubsArray.length; i < len; i++) {
        sectionID = namedSubsArray[i];
        curData = data[sectionID];
        for (j = 0, length = curData.length; j < length; j++) {
            curContent = curData[j];
            if (i == 0) {
                trArray = new Array('ozel-GrupName', 'AdSoyad', 'ozel-Aciklama');
            } else if (i == 1) {
                trArray = new Array('AdSoyad', 'ozel-Aciklama');
            } else if (i == 2) {
                trArray = new Array('AdSoyad', 'ozel-Aciklama');
            } else if (i == 3) {
                trArray = new Array('Resim');
            }
            trInside = GetHtmlTr(curContent, trArray);
            htmls[sectionID] += '<tr>' + trInside + '</tr>';
        }
        $('#show' + vars.sectionNameUpper.Kadro + 'Data' + sectionID).html(htmls[sectionID]);
    }

    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }
    if (!vars.sectionIsFirst.Kadro) {
        CreateDataTables();
    }
    vars.sectionIsFirst.Kadro = false;

}

function GetKadroGrup() {

    var i, j;
    var sectionID;
    var data;
    var length, len;
    var curContent;
    var curData;
    var trInside;
    var htmls = new Array();
    var trArray;
    var searchArray = new Array("Subs", "SubSubs")
    var searchArrayTr = new Array("Mains", "Subs")

    for (i = 0, len = searchArray.length; i < len; i++) {
        data = vars.sectionDatas.KadroGrupData[searchArray[i]];
        $.each(data, function(key, element) {
            for (j = 0, length = element.length; j < length; j++) {
                curContent = element[j];
                trArray = new Array('ozel-MainSectionID', 'KisaAd', 'Ad');
                trInside = GetHtmlTr(curContent, trArray, searchArrayTr[i]);
                htmls[searchArray[i]] += '<tr>' + trInside + '</tr>';
            }
            $('#show' + vars.sectionNameUpper.KadroGrup + 'Data' + vars.sectionDatas.KadroGrupData.Tabs[i]).html(htmls[searchArray[i]]);
        });
    }

    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }
    if (!vars.sectionIsFirst.KadroGrup) {
        CreateDataTables();
    }
    vars.sectionIsFirst.KadroGrup = false;

}

function GetKadroData() {
    vars.sectionDatas.KadroData = {
        Grups: {},
        GrupsCounter: {},
        SectionID: "kadro",
        ShowID: "#showKadro",
        Html: "",
        Num: 0,
    }
    var url = vars.sectionController + vars.sectionFunctions.KadroGet;

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
                var cache = result.cachedataEN.KadroData;
                vars.sectionDatas.KadroData = cache;
                vars.sectionDatas.KadroData.Grups = JSON.parse(cache.Grups);
                vars.sectionDatas.KadroData.GrupsCounter = JSON.parse(cache.GrupsCounter);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.KadroData;
                vars.sectionDatas.KadroData = cache;
                vars.sectionDatas.KadroData.Grups = JSON.parse(cache.Grups);
                vars.sectionDatas.KadroData.GrupsCounter = JSON.parse(cache.GrupsCounter);
            } else {
                var data = result.data;
                var i, j, k;
                var length, len, klen;
                var curIndex = 0;
                var grupsCounter = 0;
                var curContent;
                var curNamedSub;
                vars.sectionDatas.KadroData.Num = data.length;

                for (i = 0, length = data.length; i < length; i++) {
                    curContent = GetCurData(data[i]);
                    for (j = 0, len = vars.sectionDatas.KadroGrupData.Mains.length; j < len; j++) {
                        curNamedSub = '';
                        curNamedSub = vars.sectionDatas.KadroGrupData.Mains[j].MainSectionID;
                        if (curContent.GrupSectionID == curNamedSub) {
                            if (vars.sectionDatas.KadroData.Grups[curNamedSub] == undefined) {
                                vars.sectionDatas.KadroData.Grups[curNamedSub] = new Array();
                                vars.sectionDatas.KadroData.GrupsCounter[curNamedSub] = 0;
                            }
                            vars.sectionDatas.KadroData.Grups[curNamedSub][vars.sectionDatas.KadroData.GrupsCounter[curNamedSub]] = curContent;
                            vars.sectionDatas.KadroData.GrupsCounter[curNamedSub]++;
                        } else if (curNamedSub == vars.sectionDatas.KadroGrupData.Mains[0].MainSectionID) {
                            var cData = vars.sectionDatas.KadroGrupData.Subs[curNamedSub];
                            for (k = 0, klen = cData.length; k < klen; k++) {
                                if (curContent.GrupSectionID == cData[k].SubSectionID) {
                                    if (vars.sectionDatas.KadroData.Grups[curNamedSub] == undefined) {
                                        vars.sectionDatas.KadroData.Grups[curNamedSub] = new Array();
                                        vars.sectionDatas.KadroData.GrupsCounter[curNamedSub] = 0;
                                    }
                                    vars.sectionDatas.KadroData.Grups[curNamedSub][vars.sectionDatas.KadroData.GrupsCounter[curNamedSub]] = curContent;
                                    vars.sectionDatas.KadroData.GrupsCounter[curNamedSub]++;
                                }
                            }
                        }

                    }
                }

                vars.sectionDatas.KadroData.Grups = JSON.stringify(vars.sectionDatas.KadroData.Grups);
                vars.sectionDatas.KadroData.GrupsCounter = JSON.stringify(vars.sectionDatas.KadroData.GrupsCounter);
                var theCacheData = {
                    KadroData: vars.sectionDatas.KadroData,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                vars.sectionDatas.KadroData.Grups = JSON.parse(vars.sectionDatas.KadroData.Grups);
                vars.sectionDatas.KadroData.GrupsCounter = JSON.parse(vars.sectionDatas.KadroData.GrupsCounter);
            }

        },
        error: function() {
            iziError();
        }
    });
}

function GetKadroGrupData() {
    vars.sectionDatas.KadroGrupData = {
        Mains: new Array(),
        MainsCounter: 0,
        Subs: {},
        SubsCounter: {},
        SubSubs: {},
        SubSubsCounter: {},
        SubSubsTemp: new Array(),
        SubSubsCounterTemp: 0,
        Num: 0,

        Tabs: new Array('gruplar', 'aciklamalar'),
    }
    var url = vars.sectionController + vars.sectionFunctions.KadroGrupGet;

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
                var cache = result.cachedataEN.KadroGrupData;
                vars.sectionDatas.KadroGrupData = cache;
                vars.sectionDatas.KadroGrupData.Mains = JSON.parse(vars.sectionDatas.KadroGrupData.Mains);
                vars.sectionDatas.KadroGrupData.SubSubs = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubs);
                vars.sectionDatas.KadroGrupData.SubSubsCounter = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubsCounter);
                vars.sectionDatas.KadroGrupData.SubSubsTemp = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubsTemp);
                vars.sectionDatas.KadroGrupData.Subs = JSON.parse(vars.sectionDatas.KadroGrupData.Subs);
                vars.sectionDatas.KadroGrupData.SubsCounter = JSON.parse(vars.sectionDatas.KadroGrupData.SubsCounter);
                vars.sectionDatas.KadroGrupData.Tabs = JSON.parse(vars.sectionDatas.KadroGrupData.Tabs);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.KadroGrupData;
                vars.sectionDatas.KadroGrupData = cache;
                vars.sectionDatas.KadroGrupData.Mains = JSON.parse(vars.sectionDatas.KadroGrupData.Mains);
                vars.sectionDatas.KadroGrupData.SubSubs = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubs);
                vars.sectionDatas.KadroGrupData.SubSubsCounter = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubsCounter);
                vars.sectionDatas.KadroGrupData.SubSubsTemp = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubsTemp);
                vars.sectionDatas.KadroGrupData.Subs = JSON.parse(vars.sectionDatas.KadroGrupData.Subs);
                vars.sectionDatas.KadroGrupData.SubsCounter = JSON.parse(vars.sectionDatas.KadroGrupData.SubsCounter);
                vars.sectionDatas.KadroGrupData.Tabs = JSON.parse(vars.sectionDatas.KadroGrupData.Tabs);
            } else {
                var data = result.data;
                var data2;
                var length, len, nsaLen;
                var i, m, k;
                var curContent;
                var curContent2;
                var namedSubsArray = new Array("kadro", "yonetim-kurulu", "okul-aile-birligi", "okul-aile-birligi-galeri")
                vars.sectionDatas.KadroGrupData.Num = data.length;

                for (i = 0, length = data.length; i < length; i++) {
                    curContent = GetCurData(data[i]);
                    if (curContent.MainOrSub == "Main") {
                        vars.sectionDatas.KadroGrupData.Mains[vars.sectionDatas.KadroGrupData.MainsCounter] = curContent;
                        vars.sectionDatas.KadroGrupData.MainsCounter++;
                    } else if (curContent.MainOrSub == "Sub") {
                        for (m = 0, nsaLen = namedSubsArray.length; m < nsaLen; m++) {
                            if (curContent.MainSectionID == namedSubsArray[m]) {
                                if (vars.sectionDatas.KadroGrupData.Subs[namedSubsArray[m]] == undefined) {
                                    vars.sectionDatas.KadroGrupData.Subs[namedSubsArray[m]] = new Array();
                                    vars.sectionDatas.KadroGrupData.SubsCounter[namedSubsArray[m]] = 0;
                                }
                                vars.sectionDatas.KadroGrupData.Subs[namedSubsArray[m]][vars.sectionDatas.KadroGrupData.SubsCounter[namedSubsArray[m]]] = curContent;
                                vars.sectionDatas.KadroGrupData.SubsCounter[namedSubsArray[m]]++;

                            }
                        }


                    } else if (curContent.MainOrSub == "SubSub") {
                        vars.sectionDatas.KadroGrupData.SubSubsTemp[vars.sectionDatas.KadroGrupData.SubSubsCounterTemp] = curContent;
                        vars.sectionDatas.KadroGrupData.SubSubsCounterTemp++;
                    }
                }

                data = vars.sectionDatas.KadroGrupData.SubSubsTemp;
                data2 = vars.sectionDatas.KadroGrupData.Subs;
                for (i = 0, length = data.length; i < length; i++) {
                    curContent = data[i];
                    for (m = 0, nsaLen = namedSubsArray.length; m < nsaLen; m++) {
                        for (k = 0, len = data2[namedSubsArray[m]].length; k < len; k++) {
                            curContent2 = data2[namedSubsArray[m]][k]
                            if (curContent.MainSectionID == curContent2.SubSectionID) {

                                if (vars.sectionDatas.KadroGrupData.SubSubs[curContent2.SubSectionID] == undefined) {
                                    vars.sectionDatas.KadroGrupData.SubSubs[curContent2.SubSectionID] = new Array();
                                    vars.sectionDatas.KadroGrupData.SubSubsCounter[curContent2.SubSectionID] = 0;
                                }
                                vars.sectionDatas.KadroGrupData.SubSubs[curContent2.SubSectionID][vars.sectionDatas.KadroGrupData.SubSubsCounter[curContent2.SubSectionID]] = curContent;
                                vars.sectionDatas.KadroGrupData.SubSubsCounter[curContent2.SubSectionID]++;

                            }
                        }
                    }
                }

                vars.sectionDatas.KadroGrupData.Mains = JSON.stringify(vars.sectionDatas.KadroGrupData.Mains);
                vars.sectionDatas.KadroGrupData.SubSubs = JSON.stringify(vars.sectionDatas.KadroGrupData.SubSubs);
                vars.sectionDatas.KadroGrupData.SubSubsCounter = JSON.stringify(vars.sectionDatas.KadroGrupData.SubSubsCounter);
                vars.sectionDatas.KadroGrupData.SubSubsTemp = JSON.stringify(vars.sectionDatas.KadroGrupData.SubSubsTemp);
                vars.sectionDatas.KadroGrupData.Subs = JSON.stringify(vars.sectionDatas.KadroGrupData.Subs);
                vars.sectionDatas.KadroGrupData.SubsCounter = JSON.stringify(vars.sectionDatas.KadroGrupData.SubsCounter);
                vars.sectionDatas.KadroGrupData.Tabs = JSON.stringify(vars.sectionDatas.KadroGrupData.Tabs);
                var theCacheData = {
                    KadroGrupData: vars.sectionDatas.KadroGrupData,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                vars.sectionDatas.KadroGrupData.Mains = JSON.parse(vars.sectionDatas.KadroGrupData.Mains);
                vars.sectionDatas.KadroGrupData.SubSubs = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubs);
                vars.sectionDatas.KadroGrupData.SubSubsCounter = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubsCounter);
                vars.sectionDatas.KadroGrupData.SubSubsTemp = JSON.parse(vars.sectionDatas.KadroGrupData.SubSubsTemp);
                vars.sectionDatas.KadroGrupData.Subs = JSON.parse(vars.sectionDatas.KadroGrupData.Subs);
                vars.sectionDatas.KadroGrupData.SubsCounter = JSON.parse(vars.sectionDatas.KadroGrupData.SubsCounter);
                vars.sectionDatas.KadroGrupData.Tabs = JSON.parse(vars.sectionDatas.KadroGrupData.Tabs);
            }

        },
        error: function() {
            iziError();
        }
    });

}

function GetHtmlTr(data, trArray, mainOrSub = '') {
    var i, j;
    var newHtml = '';
    var length = trArray.length,
        len;
    var no = data.No;
    var listOrder = data.ListOrder;
    var searchData;

    for (i = 0; i < length; i++) {
        var trArrayTemp = trArray[i].split('-');
        if (trArrayTemp[0] == "ozel" && trArrayTemp[1] == "GrupName") {
            var grupName = vars.sectionDatas.KadroGrupData.Subs['kadro'].filter(function(kadroGrup) {
                return kadroGrup.SubSectionID == data.GrupSectionID
            });
            newHtml += '<td class="shorten_content">' + grupName[0].KisaAd + '</td>';
        } else if (trArrayTemp[0] == "ozel" && trArrayTemp[1] == "Aciklama") {
            var aciklama = '';
            $.each(vars.sectionDatas.KadroGrupData.SubSubs, function(key, element) {
                var aciklamaTemp = element.filter(function(kadroGrup) {
                    return kadroGrup.SubSectionID == data.Aciklama
                });
                if (aciklamaTemp.length > 0) {
                    aciklama = aciklamaTemp;
                    return false;
                }
            });
            if (aciklama != '') {
                newHtml += '<td class="shorten_content">' + aciklama[0].KisaAd + '</td>';
            } else {
                newHtml += '<td class="shorten_content">' + aciklama + '</td>';
            }
        } else if (trArrayTemp[0] == "ozel" && trArrayTemp[1] == "MainSectionID") {
            var mainSectionID = '';
            if (mainOrSub == "Mains") {
                searchData = vars.sectionDatas.KadroGrupData[mainOrSub];
                mainSectionID = searchData.filter(function(kadroGrupMain) {
                    return kadroGrupMain.MainSectionID == data.MainSectionID;
                });
            } else if (mainOrSub == "Subs") {
                searchData = vars.sectionDatas.KadroGrupData[mainOrSub];
                $.each(searchData, function(key, element) {
                    var mainSectionIDTemp = element.filter(function(kadroGrupSub) {
                        return kadroGrupSub.SubSectionID == data.MainSectionID
                    });
                    if (mainSectionIDTemp.length > 0) {
                        mainSectionID = mainSectionIDTemp;
                        return false;
                    }
                });
            }

            if (mainSectionID != '') {
                newHtml += '<td class="shorten_content">' + mainSectionID[0].KisaAd + '</td>';
            } else {
                newHtml += '<td class="shorten_content">' + mainSectionID + '</td>';
            }
        } else {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
        }
    }
    newHtml +=
        '<td>' +
        '<a href="javascript:;" class="btn btn-warning btn-block hvr-round-corners ' + tableOpts.ButtonUp + '" data="' + no + '" data2="' + listOrder + '"><i class="' + tableOpts.IconUp + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-warning btn-block hvr-round-corners ' + tableOpts.ButtonDown + '" data="' + no + '" data2="' + listOrder + '"><i class="' + tableOpts.IconDown + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
        '</td>' +
        '<td>' +
        '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
        '</td>';



    return newHtml;
}

function GetAddUpdateModalHtmlKadro() {

    var html = '<div class="modal fade ajax-modal" id="' + vars.sectionNameLower.Kadro + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header" align="center">' +
        '<img class="maxW150" src="' + logoUrl + '">' +
        modalOpts.ModalCloseButton +
        '</div>' +
        '<form role="form" method="post" id="' + vars.sectionNameLower.Kadro + '-form" class="form-horizontal" action="' + vars.sectionPortalController + vars.sectionFunctions.KadroAdd + '">' +
        '<div class="modal-body">' +
        '<ul class="nav nav-tabs" role="tablist">' +
        '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#' + formTabs.Turkce + '" aria-controls="' + formTabs.Turkce + '" role="tab" data-toggle="tab">' + formLang.Turkce + '</a></li>' +
        '<li role="presentation"><a class="hvr-wobble-top" href="#' + formTabs.Ingilizce + '" aria-controls="' + formTabs.Ingilizce + '" role="tab" data-toggle="tab">' + formLang.Ingilizce + '</a></li>' +
        '</ul>' +
        '<div class="tab-content">' +

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Sayfa + '</label>' +
        '<div id="Sayfa"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.AdSoyad + '</label>' +
        '<input name="AdSoyad" id="AdSoyad" class="form-control" type="text" placeholder="' + formLang.AdSoyad + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.GrupSectionID + '</label>' +
        '<div id="GrupSectionID"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Aciklama + '</label>' +
        '<div id="Aciklama"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="Resim"></div>' +
        '</div>' +

        '<div role="tabpanel" class="tab-pane fade in active" id="' + formTabs.Turkce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.UzunAciklama + '</label> <br>' +
        '<textarea name="tr_UzunAciklama" id="tr_UzunAciklama" class="form-control" placeholder="' + formLang.UzunAciklama + '" rows="3"></textarea>' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.UzunAciklama + '</label> <br>' +
        '<textarea name="en_UzunAciklama" id="en_UzunAciklama" class="form-control" placeholder="' + formLang.UzunAciklama + '" rows="3"></textarea>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" id="' + vars.sectionButtons.KadroAddUpdateSubmit + '" class="btn btn-info btn-lg btn-block">' + formLang.Kaydet + '</button>' +
        '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Iptal + '</button>' +
        '</div>' +
        '</form> ' +
        '</div>' +
        '</div>' +
        '</div>';
    $('#showAddUpdateModalKadro').html('');
    $('#showAddUpdateModalKadro').html(html);
    vars.form.Kadro = $('#' + vars.sectionNameLower.Kadro + '-form');
    vars.modal.Kadro = $('#' + vars.sectionNameLower.Kadro + '-modal');
}

function GetAddUpdateModalHtmlKadroGrup() {

    var html = '<div class="modal fade ajax-modal" id="' + vars.sectionNameLower.KadroGrup + '-modal" tabindex="-1" role="dialog" aria-hidden="true">' +
        '<div class="modal-dialog">' +
        '<div class="modal-content">' +
        '<div class="modal-header" align="center">' +
        '<img class="maxW150" src="' + logoUrl + '">' +
        modalOpts.ModalCloseButton +
        '</div>' +
        '<form role="form" method="post" id="' + vars.sectionNameLower.KadroGrup + '-form" class="form-horizontal" action="' + vars.sectionPortalController + vars.sectionFunctions.KadroGrupAdd + '">' +
        '<div class="modal-body">' +
        '<ul class="nav nav-tabs" role="tablist">' +
        '<li role="presentation" class="active"><a class="hvr-wobble-top" href="#G' + formTabs.Turkce + '" aria-controls="' + formTabs.Turkce + '" role="tab" data-toggle="tab">' + formLang.Turkce + '</a></li>' +
        '<li role="presentation"><a class="hvr-wobble-top" href="#G' + formTabs.Ingilizce + '" aria-controls="' + formTabs.Ingilizce + '" role="tab" data-toggle="tab">' + formLang.Ingilizce + '</a></li>' +
        '</ul>' +
        '<div class="tab-content">' +

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Tip + '</label>' +
        '<div id="MainOrSub"></div>' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label id="LMainSectionID">' + formLang.Sayfa + '</label>' +
        '<div id="MainSectionID"></div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade in active" id="G' + formTabs.Turkce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.KisaAd + '</label>' +
        '<input name="tr_KisaAd" id="tr_KisaAd" class="form-control" type="text" placeholder="' + formLang.KisaAd + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ad + '</label>' +
        '<input name="tr_Ad" id="tr_Ad" class="form-control" type="text" placeholder="' + formLang.Ad + '">' +
        '</div>' +
        '</div>' +
        '<div role="tabpanel" class="tab-pane fade" id="G' + formTabs.Ingilizce + '">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.KisaAd + '</label>' +
        '<input name="en_KisaAd" id="en_KisaAd" class="form-control" type="text" placeholder="' + formLang.KisaAd + '">' +
        '</div>' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Ad + '</label>' +
        '<input name="en_Ad" id="en_Ad" class="form-control" type="text" placeholder="' + formLang.Ad + '">' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div class="modal-footer">' +
        '<button type="button" id="' + vars.sectionButtons.KadroGrupAddUpdateSubmit + '" class="btn btn-info btn-lg btn-block">' + formLang.Kaydet + '</button>' +
        '<button data-dismiss="modal" class="btn btn-danger hvr-buzz-out btn-lg btn-block">' + formLang.Iptal + '</button>' +
        '</div>' +
        '</form> ' +
        '</div>' +
        '</div>' +
        '</div>';
    $('#showAddUpdateModalKadroGrup').html('');
    $('#showAddUpdateModalKadroGrup').html(html);
    vars.form.KadroGrup = $('#' + vars.sectionNameLower.KadroGrup + '-form');
    vars.modal.KadroGrup = $('#' + vars.sectionNameLower.KadroGrup + '-modal');
}

function GetKadroHtml() {
    var html = '';
    var data;
    var j;
    var length;
    var isFirstJ = true;

    html += '<section id="' + vars.sectionNameLower.Kadro + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
        '<h2>' +
        '<button id="' + vars.sectionButtons.KadroOpenModal + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        '<button id="' + rVars.sectionButtons.OpenModal + '" style="float: left; margin-left: 5px;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAddImage + '" aria-hidden="true"></i></button>' +
        vars.sectionNameNormal.Kadro +
        '<span id="' + vars.sectionNumShowIDs.Kadro + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    isFirstJ = true;
    data = vars.sectionDatas.KadroGrupData['Mains'];
    for (j = 0, length = data.length; j < length; j++) {
        if (isFirstJ) {
            html += '<li class="active"><a href="#' + data[j].MainSectionID + '" data-toggle="tab">' + data[j].Ad + '</a></li>';
            isFirstJ = false;
        } else {
            html += '<li><a href="#' + data[j].MainSectionID + '" data-toggle="tab">' + data[j].Ad + '</a></li>';
        }
    }

    html += '</ul>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="tab-content">';

    isFirstJ = true;
    for (j = 0, length = data.length; j < length; j++) {
        if (isFirstJ) {
            html += '<div class="tab-pane fade in active" id="' + data[j].MainSectionID + '">';
            isFirstJ = false;
        } else {
            html += '<div class="tab-pane fade" id="' + data[j].MainSectionID + '">';
        }
        html += '<div class="table-responsive">' +
            '<table class="table table-bordered table-hover datatable">' +
            '<thead class="text-center">';

        if (data[j].MainSectionID == "kadro") {
            html += '<th class="text-center">' + formLang.GrupName + '</th>' +
                '<th class="text-center">' + formLang.AdSoyad + '</th>' +
                '<th class="text-center">' + formLang.Aciklama + '</th>' +
                '<th class="text-center">' + formLang.Yukari + '</th>' +
                '<th class="text-center">' + formLang.Asagi + '</th>' +
                '<th class="text-center">' + formLang.Duzenle + '</th>' +
                '<th class="text-center">' + formLang.Sil + '</th>';
        } else if (data[j].MainSectionID == "yonetim-kurulu") {
            html += '<th class="text-center">' + formLang.AdSoyad + '</th>' +
                '<th class="text-center">' + formLang.Aciklama + '</th>' +
                '<th class="text-center">' + formLang.Yukari + '</th>' +
                '<th class="text-center">' + formLang.Asagi + '</th>' +
                '<th class="text-center">' + formLang.Duzenle + '</th>' +
                '<th class="text-center">' + formLang.Sil + '</th>';
        } else if (data[j].MainSectionID == "okul-aile-birligi") {
            html += '<th class="text-center">' + formLang.AdSoyad + '</th>' +
                '<th class="text-center">' + formLang.Aciklama + '</th>' +
                '<th class="text-center">' + formLang.Yukari + '</th>' +
                '<th class="text-center">' + formLang.Asagi + '</th>' +
                '<th class="text-center">' + formLang.Duzenle + '</th>' +
                '<th class="text-center">' + formLang.Sil + '</th>';
        } else if (data[j].MainSectionID == "okul-aile-birligi-galeri") {
            html += '<th class="text-center">' + formLang.Resim + '</th>' +
                '<th class="text-center">' + formLang.Yukari + '</th>' +
                '<th class="text-center">' + formLang.Asagi + '</th>' +
                '<th class="text-center">' + formLang.Duzenle + '</th>' +
                '<th class="text-center">' + formLang.Sil + '</th>';
        }
        html += '</thead>' +
            '<tbody id="show' + vars.sectionNameUpper.Kadro + 'Data' + data[j].MainSectionID + '">' +
            '</tbody>' +
            '</table>' +
            '</div>' +
            '</div>';
    }



    html += '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div id="showAddUpdateModalKadro"></div>' +
        '</div>' +
        '</section>';

    $('#show' + vars.sectionNameUpper.Kadro).html(' ');
    $('#show' + vars.sectionNameUpper.Kadro).html(html);
}

function GetKadroGrupHtml() {
    var html = '';

    html += '<section id="' + vars.sectionNameLower.KadroGrup + '" class="marginTB25">' +
        '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
        '<div class="col-lg-12 page-header text-center wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
        '<h2>' +
        '<button id="' + vars.sectionButtons.KadroGrupOpenModal + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        vars.sectionNameNormal.KadroGrup +
        '<span id="' + vars.sectionNumShowIDs.KadroGrup + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="panel with-nav-tabs panel-default">' +
        '<div class="panel-heading">' +
        '<ul class="nav nav-tabs">';

    html += '<li class="active"><a href="#' + vars.sectionDatas.KadroGrupData.Tabs[0] + '" data-toggle="tab">' + formLang.Gruplar + '</a></li>' +
        '<li><a href="#' + vars.sectionDatas.KadroGrupData.Tabs[1] + '" data-toggle="tab">' + formLang.Aciklamalar + '</a></li>';

    html += '</ul>' +
        '</div>' +
        '<div class="panel-body">' +
        '<div class="tab-content">';

    html += '<div class="tab-pane fade in active" id="' + vars.sectionDatas.KadroGrupData.Tabs[0] + '">' +
        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Sayfa + '</th>' +
        '<th class="text-center">' + formLang.KisaAd + '</th>' +
        '<th class="text-center">' + formLang.Ad + '</th>' +
        '<th class="text-center">' + formLang.Yukari + '</th>' +
        '<th class="text-center">' + formLang.Asagi + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
        '<th class="text-center">' + formLang.Sil + '</th>' +
        '</thead>' +
        '<tbody id="show' + vars.sectionNameUpper.KadroGrup + 'Data' + vars.sectionDatas.KadroGrupData.Tabs[0] + '">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';

    html += '<div class="tab-pane fade" id="' + vars.sectionDatas.KadroGrupData.Tabs[1] + '">' +
        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Grup + '</th>' +
        '<th class="text-center">' + formLang.KisaAd + '</th>' +
        '<th class="text-center">' + formLang.Ad + '</th>' +
        '<th class="text-center">' + formLang.Yukari + '</th>' +
        '<th class="text-center">' + formLang.Asagi + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
        '<th class="text-center">' + formLang.Sil + '</th>' +
        '</thead>' +
        '<tbody id="show' + vars.sectionNameUpper.KadroGrup + 'Data' + vars.sectionDatas.KadroGrupData.Tabs[1] + '">' +
        '</tbody>' +
        '</table>' +
        '</div>' +
        '</div>';

    html += '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '<div id="showAddUpdateModalKadroGrup"></div>' +
        '</div>' +
        '</section>';

    $('#show' + vars.sectionNameUpper.KadroGrup).html(' ');
    $('#show' + vars.sectionNameUpper.KadroGrup).html(html);
}


var isFirst = true;
var isFirst2 = true;

function RefreshData(refreshKadro = 1, refreshKadroGrup = 1, refreshSideKadro = 0, refreshSideKadroGrup = 0) {
    RefreshKadroGrup(refreshKadroGrup, refreshKadroGrup, refreshSideKadroGrup)
    RefreshKadro(refreshKadro, refreshKadro, refreshSideKadro)
}

function RefreshKadro(refreshMain = 1, refreshHtmls = 0, refreshSide = 0) {
    if (refreshMain == 1) {
        setTimeout(GetKadroData(), 4)
        if (refreshHtmls == 1) {
            setTimeout(GetKadroHtml(), 6)
            setTimeout(GetAddUpdateModalHtmlKadro(), 8)
            setTimeout(RefreshFunctionsKadro(), 9)
            if (!isFirst2) {
                ShortenContent();
            }
            isFirst2 = false;
        }
        setTimeout(GetKadro(), 10)
    }
    if (refreshSide == 1) {
        setTimeout(RefreshSideDataKadro(), 12)
    }
    setTimeout(GetKadroNum(), 14)
}

function RefreshKadroGrup(refreshMain = 1, refreshHtmls = 0, refreshSide = 0) {
    if (refreshMain == 1) {
        setTimeout(GetKadroGrupData(), 4)
        if (refreshHtmls == 1) {
            setTimeout(GetKadroGrupHtml(), 6)
            setTimeout(GetAddUpdateModalHtmlKadroGrup(), 8)
            setTimeout(RefreshFunctionsKadroGrup(), 9)
            if (!isFirst) {
                ShortenContent();
            }
            isFirst = false;
        }
        setTimeout(GetKadroGrup(), 10)
    }
    if (refreshSide == 1) {
        setTimeout(RefreshSideDataKadroGrup(), 12)
    }
    setTimeout(GetKadroGrupNum(), 14)
}

function RefreshSideDataKadro() {
    $(function() {
        vars.sectionIsFirst.GetResimler = true;
        vars.sectionIsFirst.GetGrupSectionID = true;
        vars.sectionIsFirst.GetAciklama = true;
        GetSayfa();
        GetResimler();
        GetGrupSectionID();
        GetAciklama();
    });
}

function RefreshSideDataKadroGrup() {
    $(function() {
        GetMainOrSub()
        GetMainSectionID();
    });
}


function RefreshFunctionsKadro() {
    $(function() {
        //Button that opens add/update modal
        $('#' + vars.sectionButtons.KadroOpenModal).click(function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                RefreshKadro(0, 0, 1)
                setTimeout(function() {
                    var formAction = vars.sectionPortalController + vars.sectionFunctions.KadroAdd;
                    $(vars.form.Kadro).attr('action', formAction);
                    ResetForm(vars.form.Kadro);
                    $(vars.modal.Kadro).find('.nav-tabs').hide();
                    $(vars.modal.Kadro).find('.tab-pane').hide();
                    $(vars.modal.Kadro).find('#AdSoyad').parent('.ajax-group').hide();
                    $(vars.modal.Kadro).modal('show');
                }, 2)

            }
            $link.data('lockedAt', +new Date());
        });

        //Button for posting data for add/update
        $('#' + vars.sectionButtons.KadroAddUpdateSubmit).click(function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                var url = vars.form.Kadro.attr('action');
                var data = vars.form.Kadro.serializeArray();
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
                            var trArray;
                            var newSayfa = response.sayfa;

                            if (response.type == 'add') {
                                if (response.data == -1) {
                                    setTimeout(function() {
                                        RefreshKadro(1, 1);
                                    }, 500);
                                } else {
                                    var tbodyKadroGrupS = '#show' + vars.sectionNameUpper.Kadro + 'Data' + response.sayfa;
                                    var tableKadro = $(tbodyKadroGrupS).parents('.datatable');
                                    var datatableKadro = tableKadro.DataTable();
                                    if (newSayfa == 'kadro') {
                                        trArray = new Array('ozel-GrupName', 'AdSoyad', 'ozel-Aciklama');
                                    } else if (newSayfa == 'yonetim-kurulu') {
                                        trArray = new Array('AdSoyad', 'ozel-Aciklama');
                                    } else if (newSayfa == 'okul-aile-birligi') {
                                        trArray = new Array('AdSoyad', 'ozel-Aciklama');
                                    } else if (newSayfa == 'okul-aile-birligi-galeri') {
                                        trArray = new Array('Resim');
                                    }
                                    var trInside = GetHtmlTr(response.data, trArray);
                                    $('<tr class="shorten_content">' + trInside + '</tr>')
                                        .hide()
                                        .prependTo('#' + vars.sectionNameLower.Kadro + ' ' + tbodyKadroGrupS)
                                        .fadeIn("slow")
                                        .addClass('normal');
                                }
                            } else {
                                var no = response.data.No;
                                var editBtn = $('tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');
                                var oldSayfa = editBtn.parents('.tab-pane.fade.active.in').attr('id');
                                if (oldSayfa == newSayfa) {
                                    if (oldSayfa == 'kadro') {
                                        trArray = new Array('ozel-GrupName', 'AdSoyad', 'ozel-Aciklama');
                                    } else if (oldSayfa == 'yonetim-kurulu') {
                                        trArray = new Array('AdSoyad', 'ozel-Aciklama');
                                    } else if (oldSayfa == 'okul-aile-birligi') {
                                        trArray = new Array('AdSoyad', 'ozel-Aciklama');
                                    } else if (oldSayfa == 'okul-aile-birligi-galeri') {
                                        trArray = new Array('Resim');
                                    }
                                    var trInside = GetHtmlTr(response.data, trArray);
                                    editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                        editBtn.parents('tr:first').html(trInside);
                                        $(this).css('background-color', '#EDEDED').fadeIn();
                                    });
                                } else {
                                    setTimeout(function() {
                                        RefreshKadro(1, 1);
                                    }, 500);
                                }

                            }
                            $(vars.modal.Kadro).modal('hide');
                            iziSuccess();

                        } else {
                            var ajaxGroup;
                            if (response.messages.length != 0) {
                                ShowFormErrors(response.messages);
                            } else {
                                RefreshKadro(1, 1)
                                $(vars.modal.Kadro).modal('hide');
                                iziError();
                            }
                        }
                    },
                    error: function() {
                        RefreshKadro(1, 1)
                        $(vars.modal.Kadro).modal('hide');
                        iziError();
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });

        //Button for editing
        $(vars.sectionShowBases.Kadro).on('click', '.' + tableOpts.ButtonEdit, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                var No = $(this).attr('data');
                var Sayfa = $(this).parents('.tab-pane.fade.active.in').attr('id')
                $(vars.form.Kadro).attr('action', vars.sectionPortalController + vars.sectionFunctions.KadroUpdate);
                // $(vars.form.Kadro).attr('action', vars.sectionPortalController + vars.sectionFunctions.KadroAdd);
                $.ajax({
                    type: 'ajax',
                    method: 'post',
                    url: vars.sectionPortalController + vars.sectionFunctions.KadroEdit,
                    data: {
                        No: No
                    },
                    async: false,
                    dataType: 'json',
                    success: function(result) {
                        ResetForm(vars.form.Kadro);
                        if (result.success) {
                            ResetForm(vars.form.Kadro);
                            $(vars.modal.Kadro).find('.nav-tabs').hide();
                            $(vars.modal.Kadro).find('.tab-pane').hide();
                            $(vars.modal.Kadro).find('#AdSoyad').parent('.ajax-group').hide();
                            RefreshKadro(0, 0, 1);
                            setTimeout(function() {
                                $(vars.sectionShowBases.Kadro + ' #SayfaSelect').selectpicker('val', Sayfa);
                                var valueSelected = Sayfa;
                                vars.sectionIsFirst.GetAciklama = false;
                                GetResimler(valueSelected);
                                GetGrupSectionID(valueSelected);
                                GetAciklama(result.data.GrupSectionID);
                                if (valueSelected == 'yonetim-kurulu' || valueSelected == 'okul-aile-birligi-galeri') {
                                    $(vars.modal.Kadro).find('.nav-tabs').show();
                                    $(vars.modal.Kadro).find('.tab-pane').show();
                                    $(vars.modal.Kadro).find('.nav-tabs').removeAttr("style")
                                    $(vars.modal.Kadro).find('.tab-pane').removeAttr("style")
                                    $(vars.modal.Kadro).find('.nav-tabs a[href="#' + formTabs.Turkce + '"]').tab('show');
                                } else {
                                    $(vars.modal).find('.nav-tabs').hide();
                                    $(vars.modal.Kadro).find('.tab-pane').hide();
                                }
                                if (valueSelected != 'okul-aile-birligi-galeri') {
                                    $(vars.modal.Kadro).find('#AdSoyad').parent('.ajax-group').show();
                                    $(vars.modal.Kadro).find('#AdSoyad').parent('.ajax-group').removeAttr("style")
                                } else {
                                    $(vars.modal.Kadro).find('#AdSoyad').parent('.ajax-group').hide();
                                }
                            }, 1)
                            setTimeout(function() {
                                $(vars.sectionShowBases.Kadro + ' #Aciklama').parent('.ajax-group').show()

                                $('input[name=No]').val(result.data.No);
                                if (Sayfa != "okul-aile-birligi-galeri") {
                                    $(vars.sectionShowBases.Kadro + ' #ResimSelect').selectpicker('val', result.data.Resim);
                                } else {
                                    $(vars.sectionShowBases.Kadro + ' #Aciklama').parent('.ajax-group').hide()
                                    var ResimArray = result.data.Resim.split(',');
                                    $(vars.sectionShowBases.Kadro + ' #ResimSelect').selectpicker('val', ResimArray);
                                }
                                $(vars.sectionShowBases.Kadro + ' #AdSoyad').val(result.data.AdSoyad);
                                $(vars.sectionShowBases.Kadro + ' #GrupSectionIDSelect').selectpicker('val', result.data.GrupSectionID);
                                $(vars.sectionShowBases.Kadro + ' #AciklamaSelect').selectpicker('val', result.data.Aciklama);
                                $(vars.sectionShowBases.Kadro + ' #tr_UzunAciklama').val(result.data.tr_UzunAciklama);
                                $(vars.sectionShowBases.Kadro + ' #en_UzunAciklama').val(result.data.en_UzunAciklama);
                                $(vars.sectionShowBases.Kadro + ' .nav-tabs a[href="#' + formTabs['Turkce'] + '"]').tab('show');
                                $(vars.modal.Kadro).modal('show');
                            }, 2);

                        } else {
                            RefreshKadro(1, 1)
                            iziError();
                        }

                    },
                    error: function() {
                        RefreshKadro(1, 1)
                        iziError();
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });

        //Button for deleting
        $(vars.sectionShowBases.Kadro).on('click', '.' + tableOpts.ButtonDelete, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                var btn = $(this);
                var No = $(this).attr('data');

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
                            url = vars.sectionPortalController + vars.sectionFunctions.KadroDelete;
                            $.ajax({
                                type: 'ajax',
                                method: 'post',
                                async: false,
                                url: url,
                                data: {
                                    No: No
                                },
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
                                    var rowCount = $('#showKadroDatakadro tr').length;
                                    if (rowCount == 1) {
                                        setTimeout(function() {
                                            RefreshKadro(1, 1);
                                        }, 550)
                                    }
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

        //Button for moving record up
        $(vars.sectionShowBases.Kadro).on('click', '.' + tableOpts.ButtonUp, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                var No = $(this).attr('data');
                var ListOrder = $(this).attr('data2');
                var url = vars.sectionPortalController + vars.sectionFunctions.KadroUp;
                $.ajax({
                    type: 'ajax',
                    method: 'post',
                    url: url,
                    data: {
                        No: No,
                        ListOrder: ListOrder
                    },
                    async: false,
                    dataType: 'json',
                    success: function(result) {
                        if (result.success) {
                            iziSuccess();
                            TargetListOrder = Number(ListOrder) - 1;
                            var upbtn = $(vars.sectionShowBases.Kadro + ' tr .item-up[data2=' + ListOrder + ']')
                            var downbtn = $(vars.sectionShowBases.Kadro + ' tr .item-down[data2=' + ListOrder + ']')
                            var tr = upbtn.parents('tr:first');
                            if ($('tr .item-up[data2=' + TargetListOrder + ']').length) {
                                var targetupbtn = $(vars.sectionShowBases.Kadro + ' tr .item-up[data2=' + TargetListOrder + ']')
                                var targetdownbtn = $(vars.sectionShowBases.Kadro + ' tr .item-down[data2=' + TargetListOrder + ']')
                                var targettr = targetupbtn.parents('tr:first');
                                targettr.css('background-color', '#ccc').fadeOut('normal', function() {
                                    targetupbtn.attr('data2', ListOrder);
                                    targetdownbtn.attr('data2', ListOrder);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                                tr.css('background-color', '#ccc').fadeOut('normal', function() {
                                    upbtn.attr('data2', TargetListOrder);
                                    downbtn.attr('data2', TargetListOrder);
                                    $(tr).after(targettr);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                            } else {
                                setTimeout(function() {
                                    RefreshData()
                                }, 10)
                            }
                        } else {
                            iziError();
                            setTimeout(function() {
                                RefreshData()
                            }, 10)
                        }

                    },
                    error: function() {
                        iziError();
                        setTimeout(function() {
                            RefreshData()
                        }, 10)
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });

        //Button for moving record down
        $(vars.sectionShowBases.Kadro).on('click', '.' + tableOpts.ButtonDown, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

                var No = $(this).attr('data');
                var ListOrder = $(this).attr('data2');
                var url = vars.sectionPortalController + vars.sectionFunctions.KadroDown;
                $.ajax({
                    type: 'ajax',
                    method: 'post',
                    url: url,
                    data: {
                        No: No,
                        ListOrder: ListOrder
                    },
                    async: false,
                    dataType: 'json',
                    success: function(result) {
                        if (result.success) {
                            iziSuccess()
                            TargetListOrder = Number(ListOrder) + 1;
                            var upbtn = $(vars.sectionShowBases.Kadro + ' tr .item-up[data2=' + ListOrder + ']')
                            var downbtn = $(vars.sectionShowBases.Kadro + ' tr .item-down[data2=' + ListOrder + ']')
                            var tr = upbtn.parents('tr:first');
                            if ($(vars.sectionShowBases.Kadro + ' tr .item-up[data2=' + TargetListOrder + ']').length) {
                                var targetupbtn = $(vars.sectionShowBases.Kadro + ' tr .item-up[data2=' + TargetListOrder + ']')
                                var targetdownbtn = $(vars.sectionShowBases.Kadro + ' tr .item-down[data2=' + TargetListOrder + ']')
                                var targettr = targetupbtn.parents('tr:first');
                                targettr.css('background-color', '#ccc').fadeOut('normal', function() {
                                    targetupbtn.attr('data2', ListOrder);
                                    targetdownbtn.attr('data2', ListOrder);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                                tr.css('background-color', '#ccc').fadeOut('normal', function() {
                                    upbtn.attr('data2', TargetListOrder);
                                    downbtn.attr('data2', TargetListOrder);
                                    $(targettr).after(tr);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                            } else {
                                setTimeout(function() {
                                    RefreshData()
                                }, 10)
                            }
                        } else {
                            iziError()
                            setTimeout(function() {
                                RefreshData()
                            }, 10)
                        }
                    },
                    error: function() {
                        iziError()
                        setTimeout(function() {
                            RefreshData()
                        }, 10)
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });

    });

}









function RefreshFunctionsKadroGrup() {
    $(function() {
        //Button that opens add/update modal
        $('#' + vars.sectionButtons.KadroGrupOpenModal).click(function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                RefreshKadroGrup(0, 0, 1)
                setTimeout(function() {
                    var formAction = vars.sectionPortalController + vars.sectionFunctions.KadroGrupAdd;
                    $(vars.form.KadroGrup).attr('action', formAction);
                    ResetForm(vars.form.KadroGrup);
                    $(vars.modal.KadroGrup).find('.nav-tabs').hide();
                    $(vars.modal.KadroGrup).find('.tab-pane').hide();
                    $(vars.modal.KadroGrup).find('#MainSectionID').parents('.ajax-group').hide();
                    $(vars.modal.KadroGrup).modal('show');
                }, 2)

            }
            $link.data('lockedAt', +new Date());
        });

        //Button for posting data for add/update
        $('#' + vars.sectionButtons.KadroGrupAddUpdateSubmit).click(function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                var url = vars.form.KadroGrup.attr('action');
                var data = vars.form.KadroGrup.serializeArray();
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
                            var trArray = new Array('ozel-MainSectionID', 'KisaAd', 'Ad');
                            var newSayfa = response.sayfa;
                            var oldSayfa;
                            var mainOrSub;
                            var curData = GetCurData(response.data);
                            var tableKadroGrup;
                            var tbodyKadroGrup;
                            var tbodyKadroGrupS;
                            if (newSayfa == "Sub") {
                                oldSayfa = vars.sectionDatas.KadroGrupData.Tabs[0];
                                mainOrSub = 'Mains';
                                tbodyKadroGrupS = '#show' + vars.sectionNameUpper.KadroGrup + 'Data' + vars.sectionDatas.KadroGrupData.Tabs[0];
                                tbodyKadroGrup = $(tbodyKadroGrupS);
                                tableKadroGrup = tbodyKadroGrup.parents('.datatable:first');
                            } else if (newSayfa == "SubSub") {
                                oldSayfa = vars.sectionDatas.KadroGrupData.Tabs[1];
                                mainOrSub = 'Subs';
                                tbodyKadroGrupS = '#show' + vars.sectionNameUpper.KadroGrup + 'Data' + vars.sectionDatas.KadroGrupData.Tabs[1];
                                tbodyKadroGrup = $(tbodyKadroGrupS);
                                tableKadroGrup = tbodyKadroGrup.parents('.datatable:first');
                            }
                            var datatableKadroGrup = tableKadroGrup.DataTable();
                            var trInside = GetHtmlTr(curData, trArray, mainOrSub);

                            if (response.type == 'add') {
                                if (response.data == -1) {
                                    setTimeout(function() {
                                        RefreshKadroGrup(1, 1);
                                    }, 500);
                                } else {
                                    $('<tr class="shorten_content">' + trInside + '</tr>')
                                        .hide()
                                        .prependTo('#' + vars.sectionNameLower.KadroGrup + ' ' + tbodyKadroGrupS)
                                        .fadeIn("slow")
                                        .addClass('normal');
                                }
                            } else {
                                var no = response.data.No;
                                var editBtn = $('#' + vars.sectionNameLower.KadroGrup + ' tr .' + tableOpts.ButtonEdit + '[data=' + no + ']');
                                oldSayfa = editBtn.parents('.tab-pane.fade.active.in').attr('id');
                                if (oldSayfa == vars.sectionDatas.KadroGrupData.Tabs[0]) {
                                    oldSayfa = "Sub"
                                } else if (oldSayfa == vars.sectionDatas.KadroGrupData.Tabs[1]) {
                                    oldSayfa = "SubSub"
                                }
                                if (oldSayfa == newSayfa) {
                                    editBtn.parents('tr:first').css('background-color', '#ccc').fadeOut('normal', function() {
                                        editBtn.parents('tr:first').html(trInside);
                                        $(this).css('background-color', '#EDEDED').fadeIn();
                                    });
                                } else {
                                    setTimeout(function() {
                                        RefreshKadroGrup(1, 1);
                                    }, 500);
                                }

                            }
                            $(vars.modal.KadroGrup).modal('hide');
                            iziSuccess();

                        } else {
                            var ajaxGroup;
                            if (response.messages.length != 0) {
                                ShowFormErrors(response.messages);
                            } else {
                                RefreshKadroGrup(1, 1)
                                $(vars.modal.KadroGrup).modal('hide');
                                iziError();
                            }
                        }
                    },
                    error: function() {
                        RefreshKadroGrup(1, 1)
                        $(vars.modal.KadroGrup).modal('hide');
                        iziError();
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });

        //Button for editing
        $(vars.sectionShowBases.KadroGrup).on('click', '.' + tableOpts.ButtonEdit, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                var No = $(this).attr('data');
                $(vars.form.KadroGrup).attr('action', vars.sectionPortalController + vars.sectionFunctions.KadroGrupUpdate);
                // $(vars.form.KadroGrup).attr('action', vars.sectionPortalController + vars.sectionFunctions.KadroGrupAdd);
                $.ajax({
                    type: 'ajax',
                    method: 'post',
                    url: vars.sectionPortalController + vars.sectionFunctions.KadroGrupEdit,
                    data: {
                        No: No
                    },
                    async: false,
                    dataType: 'json',
                    success: function(result) {
                        var curContent = result.data;
                        ResetForm(vars.form.KadroGrup);
                        if (result.success) {
                            ResetForm(vars.form.KadroGrup);
                            RefreshKadroGrup(0, 0, 1);
                            setTimeout(function() {
                                GetMainSectionID(curContent.MainOrSub)
                            }, 1)
                            setTimeout(function() {
                                $('input[name=No]').val(curContent.No);
                                $(vars.sectionShowBases.KadroGrup + ' #MainOrSubSelect').selectpicker('val', curContent.MainOrSub);
                                $(vars.sectionShowBases.KadroGrup + ' #MainSectionIDSelect').selectpicker('val', curContent.MainSectionID);
                                $(vars.sectionShowBases.KadroGrup + ' #tr_KisaAd').val(curContent.tr_KisaAd);
                                $(vars.sectionShowBases.KadroGrup + ' #en_KisaAd').val(curContent.en_KisaAd);
                                $(vars.sectionShowBases.KadroGrup + ' #tr_Ad').val(curContent.tr_Ad);
                                $(vars.sectionShowBases.KadroGrup + ' #en_Ad').val(curContent.en_Ad);
                                $(vars.sectionShowBases.KadroGrup + ' .nav-tabs a[href="#G' + formTabs['Turkce'] + '"]').tab('show');
                                $(vars.modal.KadroGrup).modal('show');
                            }, 2);

                        } else {
                            RefreshKadroGrup(1, 1)
                            iziError();
                        }

                    },
                    error: function() {
                        RefreshKadroGrup(1, 1)
                        iziError();
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });

        //Button for deleting
        $(vars.sectionShowBases.KadroGrup).on('click', '.' + tableOpts.ButtonDelete, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                var btn = $(this);
                var No = $(this).attr('data');

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
                            url = vars.sectionPortalController + vars.sectionFunctions.KadroGrupDelete;
                            $.ajax({
                                type: 'ajax',
                                method: 'post',
                                async: false,
                                url: url,
                                data: {
                                    No: No
                                },
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
                                    var rowCount = $('#showKadroGrupDatakadro tr').length;
                                    if (rowCount == 1) {
                                        setTimeout(function() {
                                            RefreshKadroGrup(1, 1);
                                        }, 550)
                                    }
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

        //Button for moving record up
        $(vars.sectionShowBases.KadroGrup).on('click', '.' + tableOpts.ButtonUp, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
                var No = $(this).attr('data');
                var ListOrder = $(this).attr('data2');
                var url = vars.sectionPortalController + vars.sectionFunctions.KadroGrupUp;
                $.ajax({
                    type: 'ajax',
                    method: 'post',
                    url: url,
                    data: {
                        No: No,
                        ListOrder: ListOrder
                    },
                    async: false,
                    dataType: 'json',
                    success: function(result) {
                        if (result.success) {
                            iziSuccess();
                            TargetListOrder = Number(ListOrder) - 1;
                            var upbtn = $(vars.sectionShowBases.KadroGrup + ' tr .item-up[data2=' + ListOrder + ']')
                            var downbtn = $(vars.sectionShowBases.KadroGrup + ' tr .item-down[data2=' + ListOrder + ']')
                            var tr = upbtn.parents('tr:first');
                            if ($('tr .item-up[data2=' + TargetListOrder + ']').length) {
                                var targetupbtn = $(vars.sectionShowBases.KadroGrup + ' tr .item-up[data2=' + TargetListOrder + ']')
                                var targetdownbtn = $(vars.sectionShowBases.KadroGrup + ' tr .item-down[data2=' + TargetListOrder + ']')
                                var targettr = targetupbtn.parents('tr:first');
                                targettr.css('background-color', '#ccc').fadeOut('normal', function() {
                                    targetupbtn.attr('data2', ListOrder);
                                    targetdownbtn.attr('data2', ListOrder);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                                tr.css('background-color', '#ccc').fadeOut('normal', function() {
                                    upbtn.attr('data2', TargetListOrder);
                                    downbtn.attr('data2', TargetListOrder);
                                    $(tr).after(targettr);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                            } else {
                                setTimeout(function() {
                                    RefreshData()
                                }, 10)
                            }
                        } else {
                            iziError();
                            setTimeout(function() {
                                RefreshData()
                            }, 10)
                        }

                    },
                    error: function() {
                        iziError();
                        setTimeout(function() {
                            RefreshData()
                        }, 10)
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });

        //Button for moving record down
        $(vars.sectionShowBases.KadroGrup).on('click', '.' + tableOpts.ButtonDown, function(e) {
            var $link = $(e.target);
            if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {

                var No = $(this).attr('data');
                var ListOrder = $(this).attr('data2');
                var url = vars.sectionPortalController + vars.sectionFunctions.KadroGrupDown;
                $.ajax({
                    type: 'ajax',
                    method: 'post',
                    url: url,
                    data: {
                        No: No,
                        ListOrder: ListOrder
                    },
                    async: false,
                    dataType: 'json',
                    success: function(result) {
                        if (result.success) {
                            iziSuccess()
                            TargetListOrder = Number(ListOrder) + 1;
                            var upbtn = $(vars.sectionShowBases.KadroGrup + ' tr .item-up[data2=' + ListOrder + ']')
                            var downbtn = $(vars.sectionShowBases.KadroGrup + ' tr .item-down[data2=' + ListOrder + ']')
                            var tr = upbtn.parents('tr:first');
                            if ($(vars.sectionShowBases.KadroGrup + ' tr .item-up[data2=' + TargetListOrder + ']').length) {
                                var targetupbtn = $(vars.sectionShowBases.KadroGrup + ' tr .item-up[data2=' + TargetListOrder + ']')
                                var targetdownbtn = $(vars.sectionShowBases.KadroGrup + ' tr .item-down[data2=' + TargetListOrder + ']')
                                var targettr = targetupbtn.parents('tr:first');
                                targettr.css('background-color', '#ccc').fadeOut('normal', function() {
                                    targetupbtn.attr('data2', ListOrder);
                                    targetdownbtn.attr('data2', ListOrder);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                                tr.css('background-color', '#ccc').fadeOut('normal', function() {
                                    upbtn.attr('data2', TargetListOrder);
                                    downbtn.attr('data2', TargetListOrder);
                                    $(targettr).after(tr);
                                    $(this).css('background-color', '#EDEDED').fadeIn();
                                });
                            } else {
                                setTimeout(function() {
                                    RefreshData()
                                }, 10)
                            }
                        } else {
                            iziError()
                            setTimeout(function() {
                                RefreshData()
                            }, 10)
                        }
                    },
                    error: function() {
                        iziError()
                        setTimeout(function() {
                            RefreshData()
                        }, 10)
                    }
                });

            }
            $link.data('lockedAt', +new Date());
        });

    });

}