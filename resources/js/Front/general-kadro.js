var vars = {
    sectionIndexNames: new Array("Kadro", "YonetimKurulu", "OkulAileBirligi"),
    sectionControllerNames: {
        Kadro: "Kadro",
        YonetimKurulu: "Yonetim-Kurulu",
        OkulAileBirligi: "Okul-Aile-Birligi"
    },
    sectionShowNames: {
        Kadro: "Kadro",
        YonetimKurulu: "Yönetim Kurulu",
        OkulAileBirligi: "Okul Aile Birliği"
    },
    sectionShowNamesUpper: {
        Kadro: "Kadro",
        YonetimKurulu: "YonetimKurulu",
        OkulAileBirligi: "OkulAileBirligi"
    },
    sectionBaslikIDs: {
        Kadro: "GK",
        YonetimKurulu: "GYK",
        OkulAileBirligi: "GOAB"
    },
    sectionDatas: {
        CurPageData: {
            ControllerName: "",
            ShowName: "",
            BaslikID: "",
            UpperName: "",
        },
        KadroData: {
            Grups: {},
            GrupsName: new Array(),
            GrupsCounter: {},
            SectionID: "kadro",
            ShowID: "#showKadro",
            Html: "",
            Num: 0,
        },

        KadroGrupData: {
            Mains: new Array(),
            MainsCounter: 0,
            Subs: new Array(),
            SubsCounter: 0,
            Num: 0,
        },
        YonetimKuruluData: {
            SectionID: "yonetim-kurulu",
            ShowID: "#showYonetimKurulu",
            Html: "",
        },
        OkulAileBirligiData: {
            SectionID: "okul-aile-birligi",
            ShowID: "#showOkulAileBirligi",
            Html: "",

            GaleriSectionID: "okul-aile-birligi-galeri",
            GaleriShowID: "showOkulAileBirligiGaleri",
            GaleriDescriptionShowID: "showOkulAileBirligiGaleriDescription",
            GaleriHtml: "",
        },
    },
    sectionNumDatas: {
        Kadro: 0,
        KadroGrup: 0,
    },
    sectionFunctions: {
        KadroGrupGet: 'GetKadroGrup',
        KadroGet: 'GetKadro',
        KadroGetHtml: 'GetKadroHtml',
        YonetimKuruluGet: 'GetYonetimKurulu',
        OkulAileBirligiGet: 'GetOkulAileBirligi',
    },
    sectionController: baseurl + 'Kadro/',
    sectionIsFirst: true,
};

$(function() {
    var result;
    var length;
    setTimeout(function() {
        for (i = 0, length = vars.sectionIndexNames.length; i < length; i++) {
            if (page == vars.sectionControllerNames[vars.sectionIndexNames[i]]) {
                vars.sectionDatas['CurPageData']['ControllerName'] = vars.sectionControllerNames[vars.sectionIndexNames[i]];
                vars.sectionDatas['CurPageData']['ShowName'] = vars.sectionShowNames[vars.sectionIndexNames[i]];
                vars.sectionDatas['CurPageData']['BaslikID'] = vars.sectionBaslikIDs[vars.sectionIndexNames[i]];
                vars.sectionDatas['CurPageData']['UpperName'] = vars.sectionShowNamesUpper[vars.sectionIndexNames[i]];
            }
        }
    }, 1)
    setTimeout(function() {
        if (vars.sectionDatas.CurPageData['ControllerName'] == vars.sectionControllerNames[vars.sectionIndexNames[0]]) {
            var result = GetKadroHtml()
            if (result) {
                RefreshData()
                setTimeout(function() {
                    GetKadroHtml()
                }, 1);
            }
        } else if (vars.sectionDatas.CurPageData['ControllerName'] == vars.sectionControllerNames[vars.sectionIndexNames[1]]) {
            result = GetYonetimKurulu();
            if (result) {
                RefreshData()
                GetYonetimKurulu()
            }
        } else if (vars.sectionDatas.CurPageData['ControllerName'] == vars.sectionControllerNames[vars.sectionIndexNames[2]]) {
            result = GetOkulAileBirligi();
            if (result) {
                RefreshData()
                GetOkulAileBirligi()
            }
        }
        RefreshSideFunctions();
    }, 2);

});

function GetKadro() {
    vars.sectionDatas.KadroData = {
        Grups: {},
        GrupsCounter: {},
        GrupsName: new Array(),
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
            English: en
        },
        async: false,
        dataType: 'json',
        success: function(result) {
            if (en && result.cachedataEN != "") {
                var cache = result.cachedataEN.KadroData;
                vars.sectionDatas.KadroData = cache;
                vars.sectionDatas.KadroData.Grups = JSON.parse(vars.sectionDatas.KadroData.Grups);
                vars.sectionDatas.KadroData.GrupsName = JSON.parse(vars.sectionDatas.KadroData.GrupsName);
                vars.sectionDatas.KadroData.GrupsCounter = JSON.parse(vars.sectionDatas.KadroData.GrupsCounter);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.KadroData;
                vars.sectionDatas.KadroData = cache;
                vars.sectionDatas.KadroData.Grups = JSON.parse(vars.sectionDatas.KadroData.Grups);
                vars.sectionDatas.KadroData.GrupsName = JSON.parse(vars.sectionDatas.KadroData.GrupsName);
                vars.sectionDatas.KadroData.GrupsCounter = JSON.parse(vars.sectionDatas.KadroData.GrupsCounter);
            } else {
                var data = result.data,
                    length = data.length,
                    curIndex = 0,
                    grupsCounter = 0;
                var i, j, k, len, klen, curContent, curNamedSub;
                vars.sectionDatas.KadroData.Num = length;

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

                if (length < cacheLimit) {
                    vars.sectionDatas.KadroData.Grups = JSON.stringify(vars.sectionDatas.KadroData.Grups);
                    vars.sectionDatas.KadroData.GrupsName = JSON.stringify(vars.sectionDatas.KadroData.GrupsName);
                    vars.sectionDatas.KadroData.GrupsCounter = JSON.stringify(vars.sectionDatas.KadroData.GrupsCounter);
                    var theCacheData = {
                        KadroData: vars.sectionDatas.KadroData,
                    }
                    setTimeout(Cache('GetKadroData', url, theCacheData), 1);
                    vars.sectionDatas.KadroData.Grups = JSON.parse(vars.sectionDatas.KadroData.Grups);
                    vars.sectionDatas.KadroData.GrupsName = JSON.parse(vars.sectionDatas.KadroData.GrupsName);
                    vars.sectionDatas.KadroData.GrupsCounter = JSON.parse(vars.sectionDatas.KadroData.GrupsCounter);
                }
            }

        },
        error: function() {
            iziError();
        }
    });
}

function GetKadroGrup() {
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
            English: en
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
                var data = result.data,
                    length = data.length,
                    namedSubsArray = new Array("kadro", "yonetim-kurulu", "okul-aile-birligi", "okul-aile-birligi-galeri");
                var i, m, k, data2, len, nsaLen, curContent, curContent2;
                vars.sectionDatas.KadroGrupData.Num = length

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

                if (vars.sectionDatas.KadroGrupData.Num < cacheLimit) {
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
            }
        },
        error: function() {
            iziError();
        }
    });
}



function GetKadroHtml() {
    var url = vars.sectionController + vars.sectionFunctions.KadroGetHtml;
    var gotCache = true;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(result) {
            var showID = vars.sectionDatas.KadroData.ShowID;
            if (en && result.cachedataEN != "") {
                var cache = result.cachedataEN.KadroDataHtml;
                vars.sectionDatas.KadroData.Html = cache;
                $(showID).html(cache);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.KadroDataHtml;
                vars.sectionDatas.KadroData.Html = cache;
                $(showID).html(cache);
            } else {
                if (vars.sectionIsFirst) {
                    gotCache = false;
                } else {
                    var sectionID = vars.sectionDatas.KadroData.SectionID,
                        data = vars.sectionDatas.KadroGrupData.Subs[sectionID],
                        sData = new Array(),
                        sSectionID = '',
                        break_on = 4,
                        oneLeft = 'F',
                        its13 = false,
                        its10 = false,
                        counter = 0,
                        length = data.length,
                        subHtml = '',
                        curSSIDData = new Array(),
                        curSSIDDataCounter = 0;
                    var i, j, k, sLength,
                        curContent,
                        curData,
                        curDataArray;
                    var html = '<div class="container wow ' + AnimationHeader + '" data-wow-delay="' + wowDelay + '">' +
                        '<div class="col-lg-12 page-header paddingL0">' +
                        '<h2 data-baslik="B_' + vars.sectionDatas['CurPageData']['UpperName'] + '">' + vars.sectionDatas['CurPageData']['ShowName'] + '</h2>' +
                        '</div>' +
                        '</div>';

                    for (i = 0; i < length; i++) {
                        curSSIDDataCounter = 0;
                        curSSIDData = new Array();
                        sLength = 0;

                        sSectionID = data[i].SubSectionID;

                        sData = vars.sectionDatas.KadroData.Grups[sectionID];
                        sLength = sData.length;
                        for (k = 0; k < sLength; k++) {
                            if (sData[k].GrupSectionID == sSectionID) {
                                curSSIDData[curSSIDDataCounter] = sData[k];
                                curSSIDDataCounter++;
                            }
                        }

                        if (curSSIDData == []) {
                            // console.log(sSectionID + ' doesnt have any members');
                        } else {
                            curContent = data[i];
                            oneLeft = 'F';
                            its13 = false;
                            its10 = false;
                            break_on = 4;
                            counter = 0;
                            if (curSSIDDataCounter == 13) {
                                break_on = 3;
                                its13 = true;
                            } else if (curSSIDDataCounter == 10) {
                                break_on = 4;
                                its10 = true;
                            } else if (curSSIDDataCounter % 4 == 0) {
                                break_on = 4;
                            } else if (curSSIDDataCounter % 3 == 0) {
                                break_on = 3;
                            } else if (curSSIDDataCounter % 4 == 1) {
                                break_on = 3;
                                oneLeft = 'T4';
                            } else if (curSSIDDataCounter % 2 == 0) {
                                break_on = 2;
                            } else if (curSSIDDataCounter % 3 == 1) {
                                break_on = 4;
                                oneLeft = 'T3';
                            }

                            if (i != 0) {
                                html += '<div class="sectionArasiBosluk"></div>'
                            }

                            html += '<section id="' + curContent.SubSectionID + '"' +
                                '<div class="container dark-bg shadow borderRad25 wow ' + Animation + '" data-wow-delay="' + wowDelay + '">' +
                                '<div class="col-lg-12 page-header text-center wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +
                                '<h3>' + curContent.Ad + '</h3>' +
                                '</div>' +
                                '<div class="LGMCWOS">';

                            for (j = 0; j < curSSIDDataCounter; j++) {
                                curDataArray = new Array('Resim', 'AdSoyad', 'ozel-GrupName', 'ozel-Aciklama')

                                curData = GetOrganizedHtml(curSSIDData[j], curDataArray)

                                if (counter % break_on == 1 && break_on == 2 && oneLeft == 'T4' && counter == curSSIDDataCounter - 2) {
                                    html += '<div class="row">';
                                } else if (counter % break_on == 0 && break_on == 2 && oneLeft == 'T4') {

                                } else if (counter % break_on == 1 && break_on == 3 && oneLeft == 'T3' && counter == curSSIDDataCounter - 3) {
                                    html += '<div class="row">';
                                } else if (counter % break_on == 0 && break_on == 3 && oneLeft == 'T3') {

                                } else if (counter == Number(curSSIDDataCounter - 4) && break_on == 2 && its13 == true) {
                                    html += '<div class="row">';
                                } else if (its13 == true && counter == Number(curSSIDDataCounter - 3)) {

                                } else if (counter == Number(curSSIDDataCounter - 2) && break_on == 2 && its13 == true) {
                                    html += '<div class="row">';
                                } else if (its13 == true && counter == curSSIDDataCounter - 1) {

                                } else if (counter % break_on == 0) {
                                    html += '<div class="row">';
                                }

                                if (break_on == 4) {
                                    html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                                } else if (break_on == 3) {
                                    html += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                                } else if (break_on == 2) {
                                    html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                                }
                                html += '<div class="hvr-float-shadow thumbnail">' +
                                    '<a class="LGM" href="' + imagesDir + curData[0] + '" data-sub-html="<strong>' + curData[1] + '<br><small>' + curData[2] + '<br>' + curData[3] + '</small></strong>">' +
                                    '<img class="img-responsive img-center w250" src="' + imagesDir + curData[0] + '">' +
                                    '<h4>' + curData[1] + '</h4>' +
                                    '<p>' + curData[3] + '</p>' +
                                    '</a>' +
                                    '</div>' +
                                    '</div>';

                                counter++;
                                if (counter % break_on == 0 && break_on == 2 && oneLeft == 'T4') {

                                } else if (counter % break_on == 0 && break_on == 3 && oneLeft == 'T3') {

                                } else if (its13 == true && counter == Number(curSSIDDataCounter - 3)) {

                                } else if (its13 == true && counter == Number(curSSIDDataCounter - 2)) {
                                    html += '</div>';
                                } else if (its13 == true && counter == Number(curSSIDDataCounter - 1)) {

                                } else if (counter % break_on == 0) {
                                    html += '</div>';
                                }
                                if (break_on == 4 && oneLeft == 'T3' && counter == curSSIDDataCounter - 3) {
                                    break_on = 3;
                                } else if (break_on == 4 && counter == curSSIDDataCounter - 2 && its10 == true) {
                                    break_on = 2;
                                } else if (break_on == 3 && oneLeft == 'T4' && counter == curSSIDDataCounter - 2) {
                                    break_on = 2;
                                } else if (break_on == 3 && its13 == true && counter == curSSIDDataCounter - 4) {
                                    break_on = 2;
                                }

                            }
                            if (counter % break_on != 0) {
                                html += '</div>';
                            }
                            html += '</div>' +
                                '</section>';
                        }
                    }
                    $(showID).html(html);
                    vars.sectionDatas.KadroData.Html = html;

                    var theCacheData = {
                        KadroDataHtml: vars.sectionDatas.KadroData.Html,
                    }
                    setTimeout(Cache("KadroHtml", url, theCacheData), 1)
                }

            }
        },
        error: function() {
            iziError();
        }
    });
    if (vars.sectionIsFirst && gotCache) {
        vars.sectionIsFirst = false;
        return false;
    } else {
        vars.sectionIsFirst = false;
        return true;
    }
}

function GetYonetimKurulu() {
    var url = vars.sectionController + vars.sectionFunctions.YonetimKuruluGet;
    var gotCache = true;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(result) {
            var showID = vars.sectionDatas.YonetimKuruluData.ShowID;
            if (en && result.cachedataEN != "") {
                var cache = result.cachedataEN.YonetimKuruluDataHtml;
                vars.sectionDatas.YonetimKuruluData.Html = cache;
                $(showID).html(cache);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.YonetimKuruluDataHtml;
                vars.sectionDatas.YonetimKuruluData.Html = cache;
                $(showID).html(cache);
            } else {
                if (vars.sectionIsFirst) {
                    gotCache = false;
                } else {
                    var sectionID = vars.sectionDatas.YonetimKuruluData.SectionID;
                    var data = vars.sectionDatas.KadroData.Grups[sectionID];
                    var break_on = 4;
                    var oneLeft = 'F';
                    var its13 = false;
                    var i;
                    var counter = 0;
                    var length = data.length;
                    var html = '<div class="container wow ' + AnimationHeader + '" data-wow-delay="' + wowDelay + '">' +
                        '<div class="col-lg-12 page-header paddingL0">' +
                        '<h2 data-baslik="B_' + vars.sectionDatas['CurPageData']['UpperName'] + '">' + vars.sectionDatas['CurPageData']['ShowName'] + '</h2>' +
                        '</div>' +
                        '</div>';
                    var curData, curDataArray;

                    html += '<div class="container dark-bg shadow borderRad25 wow ' + Animation + ' LGMCWOS" data-wow-delay="' + wowDelay + '">';
                    if (length == 13) {
                        break_on = 3;
                        its13 = true;
                    } else if (length % 4 == 0) {
                        break_on = 4;
                    } else if (length % 3 == 0) {
                        break_on = 3;
                    } else if (length % 4 == 1) {
                        break_on = 3;
                        oneLeft = 'T4';
                    } else if (length % 2 == 0) {
                        break_on = 2;
                    } else if (length % 3 == 1) {
                        break_on = 4;
                        oneLeft = 'T3';
                    }
                    for (i = 0; i < length; i++) {
                        curData = GetCurData(data[i]);
                        curDataArray = new Array('Resim', 'AdSoyad', 'UzunAciklama', 'ozel-Aciklama')
                        curData = GetOrganizedHtml(curData, curDataArray)


                        if (counter % break_on == 1 && break_on == 2 && oneLeft == 'T4' && counter == length - 2) {
                            html += '<div class="row">';
                        } else if (counter % break_on == 0 && break_on == 2 && oneLeft == 'T4') {

                        } else if (counter % break_on == 1 && break_on == 3 && oneLeft == 'T3' && counter == length - 3) {
                            html += '<div class="row">';
                        } else if (counter % break_on == 0 && break_on == 3 && oneLeft == 'T3') {

                        } else if (counter == Number(length - 4) && break_on == 2 && its13 == true) {
                            html += '<div class="row">';
                        } else if (its13 == true && counter == Number(length - 3)) {

                        } else if (counter == Number(length - 2) && break_on == 2 && its13 == true) {
                            html += '<div class="row">';
                        } else if (its13 == true && counter == length - 1) {

                        } else if (counter % break_on == 0) {
                            html += '<div class="row">';
                        }

                        if (break_on == 4) {
                            html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                        } else if (break_on == 3) {
                            html += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                        } else if (break_on == 2) {
                            html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                        }
                        html += '<div class="hvr-float-shadow thumbnail">' +
                            '<a class="LGM" href="' + imagesDir + curData[0] + '" data-sub-html="<strong>' + curData[1] + '<br><small>' + curData[2] + '</small></strong>">' +
                            '<img class="img-responsive img-center w250" src="' + imagesDir + curData[0] + '">' +
                            '<h4>' + curData[1] + '</h4>' +
                            '<p>' + curData[3] + '</p>' +
                            '</a>' +
                            '</div>' +
                            '</div>';


                        counter++;
                        if (counter % break_on == 0 && break_on == 2 && oneLeft == 'T4') {

                        } else if (counter % break_on == 0 && break_on == 3 && oneLeft == 'T3') {

                        } else if (its13 == true && counter == Number(length - 3)) {

                        } else if (its13 == true && counter == Number(length - 2)) {
                            html += '</div>';
                        } else if (its13 == true && counter == Number(length - 1)) {

                        } else if (counter % break_on == 0) {
                            html += '</div>';
                        }
                        if (break_on == 4 && oneLeft == 'T3' && counter == length - 3) {
                            break_on = 3;
                        } else if (break_on == 3 && oneLeft == 'T4' && counter == length - 2) {
                            break_on = 2;
                        } else if (break_on == 3 && its13 == true && counter == length - 4) {
                            break_on = 2;
                        }
                    }

                    if (counter % break_on != 0) {
                        html += '</div>';
                    }
                    vars.sectionDatas.YonetimKuruluData.Html = html;
                    $(showID).html(html);

                    var theCacheData = {
                        YonetimKuruluDataHtml: vars.sectionDatas.YonetimKuruluData.Html,
                    }
                    setTimeout(Cache("YonetimKurulu", url, theCacheData), 1)
                }
            }
        },
        error: function() {
            iziError();
        }
    });
    if (vars.sectionIsFirst && gotCache) {
        vars.sectionIsFirst = false;
        return false;
    } else {
        vars.sectionIsFirst = false;
        return true;
    }
}

function GetOkulAileBirligi() {
    var url = vars.sectionController + vars.sectionFunctions.OkulAileBirligiGet;
    var gotCache = true;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(result) {
            var showID = vars.sectionDatas.OkulAileBirligiData.ShowID;
            var gShowID = vars.sectionDatas.OkulAileBirligiData.GaleriShowID
            var gDShowID = vars.sectionDatas.OkulAileBirligiData.GaleriDescriptionShowID;
            var gDHtml = '';

            if (en && result.cachedataEN != "") {
                var cache = result.cachedataEN.OkulAileBirligiDataHtml;
                var cacheG = result.cachedataEN.OkulAileBirligiDataGaleriHtml;
                vars.sectionDatas.OkulAileBirligiData.Html = cache;
                vars.sectionDatas.OkulAileBirligiData.GaleriHtml = cacheG;
                $(showID).html(cache);
                $('#' + gShowID).html(cacheG);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.OkulAileBirligiDataHtml;
                var cacheG = result.cachedataTR.OkulAileBirligiDataGaleriHtml;
                vars.sectionDatas.OkulAileBirligiData.Html = cache;
                vars.sectionDatas.OkulAileBirligiData.GaleriHtml = cacheG;
                $(showID).html(cache);
                $('#' + gShowID).html(cacheG);
            } else {
                if (vars.sectionIsFirst) {
                    gotCache = false;
                } else {
                    var sectionID = vars.sectionDatas.OkulAileBirligiData.SectionID;
                    var data = vars.sectionDatas.KadroData.Grups[sectionID];
                    var gSectionID = vars.sectionDatas.OkulAileBirligiData.GaleriSectionID;
                    var gDShowID = vars.sectionDatas.OkulAileBirligiData.GaleriDescriptionShowID;
                    var gData = vars.sectionDatas.KadroData.Grups[gSectionID];
                    var gHtml = '<div id="G' + vars.sectionDatas.CurPageData['BaslikID'] + '" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">';
                    var break_on = 4;
                    var oneLeft = 'F';
                    var its13 = false;
                    var i;
                    var counter = 0;
                    var length = data.length;
                    var html = '<div class="container wow ' + AnimationHeader + '" data-wow-delay="' + wowDelay + '">' +
                        '<div class="col-lg-12 page-header paddingL0">' +
                        '<h2 data-baslik="B_' + vars.sectionDatas['CurPageData']['UpperName'] + '">' + vars.sectionDatas['CurPageData']['ShowName'] + '</h2>' +
                        '</div>' +
                        '</div>';
                    var curData, curDataArray;
                    html += '<div class="container dark-bg shadow borderRad25 wow ' + Animation + ' LGMCWOS" data-wow-delay="' + wowDelay + '">';
                    if (length == 13) {
                        break_on = 3;
                        its13 = true;
                    } else if (length % 4 == 0) {
                        break_on = 4;
                    } else if (length % 3 == 0) {
                        break_on = 3;
                    } else if (length % 4 == 1) {
                        break_on = 3;
                        oneLeft = 'T4';
                    } else if (length % 2 == 0) {
                        break_on = 2;
                    } else if (length % 3 == 1) {
                        break_on = 4;
                        oneLeft = 'T3';
                    }
                    for (i = 0; i < length; i++) {
                        curData = GetCurData(data[i]);
                        curDataArray = new Array('Resim', 'AdSoyad', 'ozel-Aciklama')
                        curData = GetOrganizedHtml(curData, curDataArray)

                        if (counter % break_on == 1 && break_on == 2 && oneLeft == 'T4' && counter == length - 2) {
                            html += '<div class="row">';
                        } else if (counter % break_on == 0 && break_on == 2 && oneLeft == 'T4') {

                        } else if (counter % break_on == 1 && break_on == 3 && oneLeft == 'T3' && counter == length - 3) {
                            html += '<div class="row">';
                        } else if (counter % break_on == 0 && break_on == 3 && oneLeft == 'T3') {

                        } else if (counter == Number(length - 4) && break_on == 2 && its13 == true) {
                            html += '<div class="row">';
                        } else if (its13 == true && counter == Number(length - 3)) {

                        } else if (counter == Number(length - 2) && break_on == 2 && its13 == true) {
                            html += '<div class="row">';
                        } else if (its13 == true && counter == length - 1) {

                        } else if (counter % break_on == 0) {
                            html += '<div class="row">';
                        }

                        if (break_on == 4) {
                            html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                        } else if (break_on == 3) {
                            html += '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                        } else if (break_on == 2) {
                            html += '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center marginT10 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">';
                        }
                        html += '<div class="hvr-float-shadow thumbnail">' +
                            '<a class="LGM" href="' + imagesDir + curData[0] + '" data-sub-html="<strong>' + curData[1] + '<br><small>' + curData[2] + '</small></strong>">' +
                            '<img class="img-responsive img-center w250" src="' + imagesDir + curData[0] + '">' +
                            '<h4>' + curData[1] + '</h4>' +
                            '<p>' + curData[2] + '</p>' +
                            '</a>' +
                            '</div>' +
                            '</div>';


                        counter++;
                        if (counter % break_on == 0 && break_on == 2 && oneLeft == 'T4') {

                        } else if (counter % break_on == 0 && break_on == 3 && oneLeft == 'T3') {

                        } else if (its13 == true && counter == Number(length - 3)) {

                        } else if (its13 == true && counter == Number(length - 2)) {
                            html += '</div>';
                        } else if (its13 == true && counter == Number(length - 1)) {

                        } else if (counter % break_on == 0) {
                            html += '</div>';
                        }
                        if (break_on == 4 && oneLeft == 'T3' && counter == length - 3) {
                            break_on = 3;
                        } else if (break_on == 3 && oneLeft == 'T4' && counter == length - 2) {
                            break_on = 2;
                        } else if (break_on == 3 && its13 == true && counter == length - 4) {
                            break_on = 2;
                        }
                    }

                    if (counter % break_on != 0) {
                        html += '</div>';
                    }


                    html += '<div id="' + gShowID + '"></div>';
                    $(showID).html(html);
                    vars.sectionDatas.OkulAileBirligiData.Html = html;
                    length = gData.length;

                    for (i = 0; i < length; i++) {
                        curData = gData[i];
                        gHtml += '<img' +
                            ' src="' + imagesDir + curData.Resim + '"' +
                            ' data-longdescription="' + curData.Aciklama + '">';
                    }

                    gHtml += '</div>' + '<div id="' + gDShowID + '" class="marginT10"></div>';
                    $('#' + gShowID).html(gHtml);
                    vars.sectionDatas.OkulAileBirligiData.GaleriHtml = gHtml;

                    var theCacheData = {
                        OkulAileBirligiDataHtml: vars.sectionDatas.OkulAileBirligiData.Html,
                        OkulAileBirligiDataGaleriHtml: vars.sectionDatas.OkulAileBirligiData.GaleriHtml,
                    }
                    setTimeout(Cache("OkulAileBirligi", url, theCacheData), 1)
                }
            }

            setTimeout(function() {
                UG = jQuery("#G" + vars.sectionDatas.CurPageData['BaslikID']).unitegallery({
                    thumb_fixed_size: false,
                    thumb_image_overlay_effect: true,
                    thumb_image_overlay_type: "blur",
                    slider_scale_mode: "fit",
                    gallery_autoplay: true,
                    gallery_width: 1300,
                    gallery_height: 650,
                });

                gDHtml = UG.getItem(0)['longdescription'];
                $('#' + gDShowID).html(gDHtml);

                UG.on("item_change", function(num, data) {
                    gDHtml = UG.getItem(num)['longdescription'];
                    $('#' + gDShowID).html(gDHtml);
                });
            }, 2)

        },
        error: function() {
            iziError();
        }
    });
    if (vars.sectionIsFirst && gotCache) {
        vars.sectionIsFirst = false;
        return false;
    } else {
        vars.sectionIsFirst = false;
        return true;
    }

}

function GetOrganizedHtml(data, trArray, mainOrSub = '') {
    var i, j;
    var newHtml = new Array();
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
            newHtml[i] = grupName[0].KisaAd;
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
                newHtml[i] = aciklama[0].KisaAd
            } else {
                newHtml[i] = aciklama
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
                newHtml[i] = mainSectionID[0].KisaAd
            } else {
                newHtml[i] = mainSectionID
            }
        } else {
            newHtml[i] = data[trArray[i]]
        }
    }
    return newHtml;
}

function RefreshData() {
    setTimeout(GetKadroGrup(), 1)
    setTimeout(GetKadro(), 2)
}

function RefreshSideFunctions() {
    setTimeout(function() {
        CreteLGM();
        DoubleClickFC()
    }, 5);

}