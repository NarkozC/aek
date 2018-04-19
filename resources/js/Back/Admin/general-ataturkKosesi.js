var vars = {
    sectionObjects: {
        Form: 'form',
        Modal: 'modal',
    },
    sectionControllers: {
        Normal: baseurl + 'Ataturk-Kosesi/',
        Portal: baseurl + 'Portal/Admin/Ataturk-Kosesi/',
    },
    sectionNames: {
        Normal: 'Atatürk Köşesi',
        Upper: 'AtaturkKosesi',
        Lower: 'ataturkKosesi',
        Kod: 'GAK',
    },
    sectionShowBases: {
        Sections: 'showAtaturkKosesi',
        Num: 'showNum',
        Modal: 'showSectionsModal',
    },
    sectionFunctions: {
        Get: 'GetAtaturkKosesi',
        Add: 'AddAtaturkKosesi',
        Update: 'UpdateAtaturkKosesi',
        Edit: 'EditAtaturkKosesi',
        Delete: 'DeleteAtaturkKosesi',
        Up: 'UpAtaturkKosesi',
        Down: 'DownAtaturkKosesi',
    },
    sectionButtons: {
        OpenModal: 'AtaturkKosesiOpenModal',
        Submit: 'AtaturkKosesiSubmit',
    },
    sectionDatas: {
        AtaturkKosesi: {
            Data: new Array(),
            FHtml: '',
            BHtml: '',
            Num: 0,
        },

        Resimler: GetResimlerData(),
    },
    sectionSPs: {
        Resim: 'Resim',
    },
    sectionIsFirst: true,
};

$(function() {

    //Refresh Page
    RefreshData(1, 1, 1);


    //Button that opens add/update modal
    FunOpenModal(vars.sectionShowBases.Sections, vars.sectionButtons.OpenModal,
        vars.sectionControllers.Portal + vars.sectionFunctions.Add,
        vars.sectionObjects.Form, vars.sectionObjects.Modal);


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

                            trArray = new Array('Resim');
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
                            var ResimArray = result.data.Resim.split(',');
                            $('input[name=No]').val(result.data.No); 
                            $('#' + vars.sectionSPs.Resim + 'Select').selectpicker('val', ResimArray);

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

    //Button for moving record up
    $('#' + vars.sectionShowBases.Sections).on('click', '.' + tableOpts.ButtonUp, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var No = $(this).attr('data');
            var ListOrder = $(this).attr('data2');
            var url = vars.sectionControllers.Portal + vars.sectionFunctions.Up;
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
                        var upbtn = $('tr .item-up[data2=' + ListOrder + ']')
                        var downbtn = $('tr .item-down[data2=' + ListOrder + ']')
                        var tr = upbtn.parents('tr:first');
                        if ($('tr .item-up[data2=' + TargetListOrder + ']').length) {
                            var targetupbtn = $('tr .item-up[data2=' + TargetListOrder + ']')
                            var targetdownbtn = $('tr .item-down[data2=' + TargetListOrder + ']')
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
                                RefreshData(1, 1, 1)
                            }, 10)
                        }
                    } else {
                        iziError();
                        setTimeout(function() {
                            RefreshData(1, 1, 1)
                        }, 10)
                    }

                },
                error: function() {
                    iziError();
                    setTimeout(function() {
                        RefreshData(1, 1, 1)
                    }, 10)
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });


    //Button for moving record down
    $('#' + vars.sectionShowBases.Sections).on('click', '.' + tableOpts.ButtonDown, function(e) {
        var $link = $(e.target);
        if (!$link.data('lockedAt') || +new Date() - $link.data('lockedAt') > 300) {
            var No = $(this).attr('data');
            var ListOrder = $(this).attr('data2');
            var url = vars.sectionControllers.Portal + vars.sectionFunctions.Down;
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
                        var upbtn = $('tr .item-up[data2=' + ListOrder + ']')
                        var downbtn = $('tr .item-down[data2=' + ListOrder + ']')
                        var tr = upbtn.parents('tr:first');
                        if ($('tr .item-up[data2=' + TargetListOrder + ']').length) {
                            var targetupbtn = $('tr .item-up[data2=' + TargetListOrder + ']')
                            var targetdownbtn = $('tr .item-down[data2=' + TargetListOrder + ']')
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
                                RefreshData(1, 1, 1)
                            }, 10)
                        }
                    } else {
                        iziError()
                        setTimeout(function() {
                            RefreshData(1, 1, 1)
                        }, 10)
                    }
                },
                error: function() {
                    iziError()
                    setTimeout(function() {
                        RefreshData(1, 1, 1)
                    }, 10)
                }
            });

        }
        $link.data('lockedAt', +new Date());
    });

});

function GetResimlerSelect() {
    var data = vars.sectionDatas.Resimler,
        length = data.length,
        id = vars.sectionSPs.Resim + 'Select',
        section = vars.sectionSPs.Resim,
        html = '<select class="form-control selectpicker" data-live-search="true" name="' + section + '[]" id="' + id + '" title="' + formLang.ResimSec + '" data-liveSearchNormalize="true" multiple data-selected-text-format="count > 2">',
        lastParts = '';
    var i;

    lastParts = vars.sectionDatas.Resimler.Html;

    lastParts += '</select>';

    html += lastParts;
    $('#' + section).html(html);
    RefreshSelectpicker();
}

function GetSectionsNum() {
    $('#' + vars.sectionShowBases.Num).html(vars.sectionDatas.AtaturkKosesi.Num);
}

function CreateSectionsTable() {
    var i, length;
    if ($.fn.DataTable.isDataTable('.datatable')) {
        $('.datatable').DataTable().destroy();
    }

    $('#show' + vars.sectionNames.Upper + 'Data').html(vars.sectionDatas.AtaturkKosesi.BHtml);

    ShortenContent();

    if (!vars.sectionIsFirst) {
        CreateDataTables();
    }
    vars.sectionIsFirst = false;
}

function GetSectionsData() {
    vars.sectionDatas.AtaturkKosesi = {
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
                var cache = result.cachedataEN.AtaturkKosesi;
                vars.sectionDatas.AtaturkKosesi = cache;
                vars.sectionDatas.AtaturkKosesi.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.AtaturkKosesi;
                vars.sectionDatas.AtaturkKosesi = cache;
                vars.sectionDatas.AtaturkKosesi.Data = JSON.parse(cache.Data);
            } else {
                var bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    trArray = new Array('Resim');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    vars.sectionDatas.AtaturkKosesi.Data[i] = curData;
                }
                ConvertDataToFhtml()
                vars.sectionDatas.AtaturkKosesi.BHtml = bHtml;
                vars.sectionDatas.AtaturkKosesi.Num = length;

                var myJSON = JSON.stringify(vars.sectionDatas.AtaturkKosesi.Data);
                vars.sectionDatas.AtaturkKosesi.Data = myJSON;
                var theCacheData = {
                    AtaturkKosesi: vars.sectionDatas.AtaturkKosesi,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
                vars.sectionDatas.AtaturkKosesi.Data = JSON.parse(myJSON);
            }
        },
        error: function() {
            iziError();
        }
    });
}

function ConvertDataToFhtml() {
    var html = '',
        data = vars.sectionDatas.AtaturkKosesi.Data,
        length = data.length;
    var i, j, curData, rLength, tempCurData;

    if (vars.sectionDatas.AtaturkKosesi.FHtml != '') {
        html = vars.sectionDatas.AtaturkKosesi.FHtml;
    } else {
        html += '<section id="' + vars.sectionNames.Lower + '">' +
            '<div class="container">' +
            '<div class="col-lg-12 page-header wow ' + AnimationHeader + ' paddingL0" data-wow-delay="' + wowDelay + '">' +
            '<h2 data-baslik="B_' + vars.sectionNames.Upper + '">' + vars.sectionNames.Normal + '</h2>' +
            '</div>' +
            '</div>' +

            '<div class="container dark-bg shadow borderRad10 wow ' + Animation + '"  data-wow-delay="' + wowDelay + '">' +
            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '"  data-wow-delay="' + wowDelayText + '">' +
            '<p>' +
            '<img src="' + imagesDir + 'Genel/Ataturk-Kosesi-2.jpg" class="img-responsive maxW300 floatL marginR10 marginB10 hidden-xs">' +
            '<img src="' + imagesDir + 'Genel/Ataturk-Kosesi-2.jpg" class="img-responsive maxW300 marginB10 visible-xs img-center">' +
            '<h3><b><i>ATATÜRK’ün Hayatı:</i></b></h3>' +
            'Türkiye Cumhuriyeti’nin kurucusu Mustafa Kemal Atatürk 1881 yılında Selanik’e doğdu. Babası Ali Rıza Efendi, annesi Zübeyde Hanım’dır. Atatürk’ün beş kardeşinden dördü küçük yaşlarda öldü, sadece Makbule (Atadan) 1956 yılına değin yaşadı. Babası Ali Rıza Efendi, Mustafa henüz küçük bir çocukken vefat etti, Annesi Zübeyde Hanım Mustafa’yı ve kardeşini tek başına yetiştirdi.  Küçük Mustafa öğrenim çağına gelince Hafız Mehmet Efendi’nin mahalle mektebinde öğrenime başladı, sonra babasının isteğiyle Şemsi Efendi Mektebi’ne geçti. Babasını kaybettikten sonra bir süre Rapla Çiftliği’nde dayısının yanında kaldı. Daha sonra Selânik’e dönüp okulunu bitirdi ve Selânik Mülkiye Rüştiyesi’ne kaydoldu. Kısa bir süre sonra 1893 yılında Askeri Rüştiye’ye girdi. Bu okulda Matematik öğretmeni Mustafa Bey, adına “Kemal” i ilave etti, artık Mustafa Kemal olarak anılıyordu. 1896-1899 yıllarında Manastır Askeri İdâdi’sini bitirip, İstanbul’da Harp Okulunda öğrenime başladı. 1902 yılında teğmen rütbesiyle mezun oldu. Harp Akademisi’ne başladı ve Harp Akademisi’ni 1905 yılında yüzbaşı rütbesiyle tamamladı.' +
            '<br>' +
            '<br>' +
            '1905-1907 yılları arasında Şam’da 5. Ordu emrinde görev yaptı. 1907’de Kolağası oldu ve Manastır’a III. Ordu’ya atandı. 19 Nisan 1909’da İstanbul’a giren Hareket Ordusu’nda Kurmay Başkanı olarak görev aldı. 1910 yılında Fransa’ya gönderildi. Picardie Manevraları’na katıldı. 1911 yılında İstanbul’da Genel Kurmay Başkanlığı emrinde çalışmaya başladı. 1911 yılında İtalyanların Trablusgarp’a hücumu ile başlayan savaşta, Mustafa Kemal bir grup arkadaşıyla birlikte Tobruk ve Derne bölgesinde görev aldı. 22 Aralık 1911’de İtalyanlara karşı Tobruk Savaşını kazandı. 6 Mart 1912’de Derne Komutanlığına getirildi. ' +
            '<br>' +
            '<br>' +
            '1912’de Balkan Savaşı çıktığında Mustafa Kemal, Gelibolu ve Bolayır’daki birliklerle savaşa katıldı. Dimetoka ve Edirne’nin geri alınışında büyük katkı sağlamıştır. 1913 yılında Sofya Ateşemiliterliğine atandı. Bu görevde iken 1914 yılında yarbaylığa yükseldi. Ateşemiliterlik görevi Ocak 1915’te sona erdi. Bu sırada I. Dünya Savaşı başlamış, Osmanlı İmparatorluğu savaşa girmek zorunda kalmıştı. Mustafa Kemal 19. Tümeni kurmak üzere Tekirdağ’da görevlendirildi.' +
            '<br>' +
            '<br>' +
            '1914 yılında başlayan I. Dünya Savaşı’nda, Mustafa Kemal Çanakkale’de bir kahramanlık destanı yazıp İtilaf Devletlerine “Çanakkale geçilmez!” dedirtti. 18 Mart 1915’te Çanakkale Boğazını geçmeye kalkan İngiliz ve Fransız donanması ağır kayıplar verince Gelibolu Yarımadası’na asker çıkarmaya karar verdiler. 25 Nisan 1915’te Arıburnu’na çıkan düşman kuvvetlerini, Mustafa Kemal’in komuta ettiği 19. Tümen Conkbayırı’nda durdurdu. Mustafa Kemal, bu başarı üzerine albaylığa yükseldi. İngilizler 6-7 Ağustos 1915’te Arıburnu’nda tekrar taarruza geçti. Anafartalar Grubu Komutanı Mustafa Kemal 9-10 Ağustos’ta Anafartalar Zaferini kazandı. Bu zaferi 17 Ağustos’ta Kireçtepe, 21 Ağustos’ta II. Anafartalar zaferleri takip etti. Çanakkale Savaşlarında yaklaşık 253.000 şehit veren Türk ulusu onurunu İtilaf Devletlerine karşı korumasını bilmiştir. Mustafa Kemal’in askerlerine “Ben size taarruzu emretmiyorum, ölmeyi emrediyorum!” emri cephenin kaderini değiştirmiştir.' +
            '<br>' +
            '<br>' +
            'Mustafa Kemal Çanakkale Savaşları’ndan sonra 1916’da Edirne ve Diyarbakır’da görev aldı. 1 Nisan 1916’da tümgeneralliğe yükseldi. Rus kuvvetleriyle savaşarak Muş ve Bitlis’in geri alınmasını sağladı. Şam ve Halep’teki kısa süreli görevlerinden sonra 1917’de İstanbul’a geldi. Velihat Vahidettin Efendi’yle Almanya’ya giderek cephede incelemelerde bulundu. Bu seyahatten sonra hastalandı. Viyana ve Karisbad’a giderek tedavi oldu. 15 Ağustos 1918’de Halep’e 7. Ordu Komutanı olarak döndü. Bu cephede İngiliz kuvvetlerine karşı başarılı savunma savaşları yaptı. Mondros Mütarekesi’nin imzalanmasından bir gün sonra, 31 Ekim 1918’de Yıldırım Orduları Grubu Komutanlığına getirildi. Bu ordunun kaldırılması üzerine 13 Kasım 1918’de İstanbul’a gelip Harbiye Nezâreti’nde göreve başladı.' +
            '<br>' +
            '<br>' +
            'Mondros Mütarekesi’nden sonra İtilaf Devletleri’nin Osmanlı ordularını işgale başlamaları üzerine; Mustafa Kemal 9. Ordu Müfettişi olarak 19 Mayıs 1919’da Samsun’a çıktı. 22 Haziran 1919’da Amasya’da yayımladığı genelgeyle “Milletin istiklâlini yine milletin azim ve kararının kurtaracağını” ilan edip Sivas Kongresi’ni toplantıya çağırdı. 23 Temmuz - 7 Ağustos 1919 tarihleri arasında Erzurum, 4 - 11 Eylül 1919 tarihleri arasında da Sivas Kongresi’ni toplayarak vatanın kurtuluşu için izlenecek yolun belirlenmesini sağladı. 27 Aralık 1919’da Ankara’da heyecanla karşılandı. 23 Nisan 1920’de Türkiye Büyük Millet Meclisi’nin açılmasıyla Türkiye Cumhuriyeti’nin kurulması yolunda önemli bir adım atılmış oldu. Meclis ve Hükümet Başkanlığına Mustafa Kemal seçildi Türkiye Büyük Millet Meclisi, Kurtuluş Savaşı’nın başarıyla sonuçlanması için gerekli yasaları kabul edip uygulamaya başladı.' +
            '<br>' +
            '<br>' +
            'Türk Kurtuluş Savaşı 15 Mayıs 1919’da Yunanlıların İzmir’i işgali sırasında düşmana ilk kurşunun atılmasıyla başladı. 10 Ağustos 1920 tarihinde Sevr Antlaşması’nı imzalayarak aralarında Osmanlı İmparatorluğu’nu paylaşan I. Dünya Savaşı’nın galip devletlerine karşı önce Kuvâ-yi Milliye adı verilen milis kuvvetleriyle savaşıldı. Türkiye Büyük Millet Meclisi düzenli orduyu kurdu, Kuvâ-yi Milliye - ordu bütünleşmesini sağlayarak savaşı zaferle sonuçlandırdı.' +
            '<br>' +
            '<br>' +
            '<b>Mustafa Kemal yönetimindeki Türk Kurtuluş Savaşının önemli aşamaları şunlardır:</b>' +
            '<ul>' +
            '<li>Sarıkamış (20 Eylül 1920), Kars (30 Ekim 1920) ve Gümrü’nün (7 Kasım 1920) kurtarılışı.</li>' +
            '<li>Çukurova, Gazi Antep, Kahraman Maraş Şanlı Urfa savunmaları (1919- 1921),</li>' +
            '<li>I. İnönü Zaferi (6 -10 Ocak 1921),</li>' +
            '<li>II. İnönü Zaferi (23 Mart-1 Nisan 1921),</li>' +
            '<li>Sakarya Zaferi (23 Ağustos-13 Eylül 1921),</li>' +
            '<li>Büyük Taarruz, Başkomutan Meydan Muhaberesi ve Büyük Zafer (26 Ağustos 9 Eylül 1922),</li>' +
            '</ul>' +
            '<br>' +
            'Sakarya Zaferinden sonra 19 Eylül 1921’de Türkiye Büyük Millet Meclisi Mustafa Kemal’e Mareşal rütbesi ve Gazi unvanını verdi. Kurtuluş Savaşı, 24 Temmuz 1923’te imzalanan Lozan Antlaşması’yla sonuçlandı. Böylece Sevr Antlaşması’yla paramparça edilen, Türklere 5-6 il büyüklüğünde vatan bırakılan Türkiye toprakları üzerinde ulusal birliğe dayalı yeni Türk devletinin kurulması için hiçbir engel kalmadı.' +
            '<br>' +
            '<br>' +
            '23 Nisan 1920’de Ankara’da TBMM’nin açılmasıyla Türkiye Cumhuriyeti’nin kuruluşu müjdelenmiştir. Meclisin Türk Kurtuluş Savaşı’nı başarıyla yönetmesi, yeni Türk devletinin kuruluşunu hızlandırdı. 1 Kasım 1922’de hilâfet ve saltanat birbirinden ayrıldı, saltanat kaldırıldı. Böylece Osmanlı İmparatorluğu’yla yönetim bağları koparıldı. 13 Ekim 1923’te Cumhuriyet idaresi kabul edildi, Atatürk oybirliğiyle ilk cumhurbaşkanı seçildi. 30 Ekim 1923 günü İsmet İnönü tarafından Cumhuriyet’in ilk hükümeti kuruldu. Türkiye Cumhuriyeti, “Egemenlik kayıtsız şartsız milletindir” ve “Yurtta barış cihanda barış” temelleri üzerinde yükselmeye başladı.' +
            '<b>Atatürk Türkiye’yi</b> “Çağdaş uygarlık düzeyine çıkarmak” <b>amacıyla bir dizi devrim yaptı. Bu devrimleri beş başlık altında toplayabiliriz: </b>' +
            '<br>' +
            '<img src="' + imagesDir + 'Genel/Ataturk-Kosesi-3.jpg" class="img-responsive floatR maxW300 marginB10 marginT10 marginL10 hidden-xs">' +
            '<img src="' + imagesDir + 'Genel/Ataturk-Kosesi-3.jpg" class="img-responsive maxW300 marginB10 marginT10 visible-xs img-center">' +
            '<ol>' +
            '<li>' +
            '<b>Siyasal Devrimler:</b>' +
            '<ul>' +
            '<li>Saltanatın Kaldırılması (1 Kasım 1922),</li>' +
            '<li>Cumhuriyetin İlanı (29 Ekim 1923),</li>' +
            '<li>Halifeliğin Kaldırılması (3 Mart 1924).</li>' +
            '</ul>' +
            '</li>' +
            '<li>' +
            '<b>Toplumsal Devrimler:</b>' +
            '<ul>' +
            '<li>Kadınlara erkeklerle eşit haklar verilmesi (1926-1934),</li>' +
            '<li>Şapka ve kıyafet devrimi (25 Kasım 1925),</li>' +
            '<li>Tekke zâviye ve türbelerin kapatılması (30 Kasım 1925),</li>' +
            '<li>Soyadı kanunu ( 21 Haziran 1934),</li>' +
            '<li>Lâkap ve unvanların kaldırılması (26 Kasım 1934),</li>' +
            '<li>Uluslararası saat, takvim ve uzunluk ölçülerin kabulü (1925-1931.</li>' +
            '</ul>' +
            '</li>' +
            '<li>' +
            '<b>Hukuk Devrimi:</b>' +
            '<ul>' +
            '<li>Mecellenin kaldırılması (1924-1937),</li>' +
            '<li>Türk Medeni Kanunu ve diğer kanunların çıkarılarak laik hukuk düzenine geçilmesi (1924-1937).</li>' +
            '</ul>' +
            '</li>' +
            '<li>' +
            '<b>Eğitim ve Kültür Alanındaki Devrimler:</b>' +
            '<ul>' +
            '<li>Öğretimin birleştirilmesi (3 Mart 1924),</li>' +
            '<li>Yeni Türk harflerinin kabulü (1 Kasım 1928),</li>' +
            '<li>Türk Dil ve Tarih Kurumlarının kurulması (1931-1932),</li>' +
            '<li>Üniversite öğreniminin düzenlenmesi (31 Mayıs 1933),</li>' +
            '<li>Güzel sanatlarda yenilikler.</li>' +
            '</ul>' +
            '</li>' +
            '<li>' +
            '<b>Ekonomi Alanında Devrimler:</b>' +
            '<ul>' +
            '<li>Aşârın kaldırılması,</li>' +
            '<li>Çiftçinin özendirilmesi,</li>' +
            '<li>Örnek çiftliklerin kurulması,</li>' +
            '<li>Sanayiyi Teşvik Kanunu’nun çıkarılarak sanayi kuruluşlarının kurulması,</li>' +
            '<li>I. ve II. Kalkınma Planları’nın (1933-1937) uygulamaya konulması, yurdun yeni yollarla donatılması Soyadı Kanunu gereğince, 24 Kasım 1934’de TBMM’nce Mustafa Kemal’e “Atatürk” soyadı verildi.</li>' +
            '</ul>' +
            '</li>' +
            '</ol>' +
            '<br>' +
            'Atatürk, 24 Nisan 1920 ve 13 Ağustos 1923 tarihlerinde TBMM Başkanlığına seçildi. Bu başkanlık görevi, Devlet-Hükümet Başkanlığı düzeyindeydi. 29 Ekim 1923 yılında Cumhuriyet ilan edildi ve Atatürk ilk cumhurbaşkanı seçildi. Anayasa gereğince dört yılda bir cumhurbaşkanlığı seçimleri yenilendi. 1927,1931, 1935 yıllarında Türkiye Büyük Millet Meclisi tarafından Atatürk’ü yeniden cumhurbaşkanlığına seçti. ' +
            '<br><br>' +
            'Atatürk sık sık yurt gezilerine çıkarak devlet çalışmalarını yerinde denetledi. İlgililere aksayan yönlerle ilgili emirler verdi. Cumhurbaşkanı sıfatıyla Türkiye’yi ziyaret eden yabancı ülke devlet başkanlarını, başbakanlarını, bakanlarını komutanlarını ağırladı. 15-20 Ekim 1927 tarihinde Kurtuluş Savaşı’nı ve Cumhuriyet’in kuruluşunu anlatan büyük nutkunu, 29 Ekim 1933 tarihinde de 10. Yıl Nutku’nu okudu. Atatürk özel yaşamında sadelik içinde yaşadı. 29 Ocak 1923’de Latife Hanımla evlendi. Birçok yurt gezisine birlikte çıktılar. Bu evlilik 5 Ağustos 1925 tarihine dek sürdü. Çocukları çok seven Atatürk; Afet (İnan), Sabiha (Gökçen), Fikrîye, Ülkü, Nebile, Rukiye, Zehra adlı kızları ve Mustafa adlı çobanı manevi evlat edindi. Abdurrahim ve İhsan adlı çocukları himayesine aldı. Yaşayanlarına iyi bir gelecek hazırladı.' +
            '<br><br>' +
            '1937 yılında çiftliklerini hazineye, bir kısım taşınmazlarını da Ankara ve Bursa Belediyelerine bağışladı. Mirasından kız kardeşine, manevi evlatlarına, Türk Dil ve Tarih Kurumlarına pay ayırdı. Kitap okumayı, müzik dinlemeyi, dans etmeyi, ata binmeyi ve yüzmeyi çok severdi. Zeybek oyunlarına, güreşe, Rumeli türkülerine aşırı ilgisi vardı. Tavla ve bilardo oynamaktan büyük keyif alırdı. Sakarya adlı atıyla, köpeği Fox’a çok değer verirdi. Zengin bir kitaplık oluşturmuştu. Akşam yemeklerine devlet ve bilim adamlarını, sanatçıları davet eder, ülkenin sorunlarını tartışırdı. Temiz ve düzenli giyinmeye özen gösterirdi. Doğayı çok severdi. Sık sık Atatürk Orman Çiftliği’ne gider, çalışmalara bizzat katılırdı.  Fransızca ve Almanca biliyordu. 10 Kasım 1938 saat 9.05’te yakalandığı siroz hastalığından kurtulamayarak İstanbul’da Dolmabahçe Sarayı’nda hayata gözlerini yumdu. Cenazesi 21 Kasım 1938 günü törenle geçici istirahatgâhı olan Ankara Etnografya Müzesi’nde toprağa verildi. Anıtkabir yapıldıktan sonra nâşı görkemli bir törenle 10 Kasım 1953 günü ebedi istirahatgâhına gömüldü.' +
            '<br><br>' +
            'Kaynak: http://www.kultur.gov.tr/TR,96300/ataturkun-hayati.html' +
            '<h3>ATATÜRK’ÜN SÖZLERİ</h3>' +
            'Büyük hedefimiz, milletimizi en yüksek medeniyet seviyesine ve refaha ulaştırmaktır. ' +
            '<br><br>' +
            'Ne mutlu “Türküm” diyene. ' +
            '<br><br>' +
            'Öğretmenler: Yeni nesiller sizlerin eseri olacaktır. ' +
            '<br><br>' +
            'Yurtta sulh, cihanda sulh. ' +
            '<br><br>' +
            'Benim naciz vücudum elbet bir gün toprak olacaktır, ancak Türkiye Cumhuriyeti ilelebet payidar kalacaktır. ' +
            '<br><br>' +
            'Bu millete çok şey öğretebildim ama onlara uşak olmayı bir türlü öğretemedim.' +
            '<br><br>' +
            'Memleketin efendisi hakiki müstahsil olan köylüdür. ' +
            '<br><br>' +
            'Doğruyu söylemekten korkmayınız. ' +
            '<br><br>' +
            'Beni görmek demek mutlaka yüzümü görmek demek değildir. Benim fikirlerimi, benim duygularımı anlıyorsanız ve hissediyorsanız bu yeterlidir.' +
            '<br><br>' +
            'Türkiye Cumhuriyeti mutlu, zengin ve muzaffer olacaktır.' +
            '<br><br>' +
            'Sağlam kafa sağlam vücutta bulunur. ' +
            '<br><br>' +
            'Ordular, ilk hedefiniz Akdenizdir. İleri! ' +
            '<br><br>' +
            'Türkiye Cumhuriyetinin temeli kültürdür.' +
            '<br><br>' +
            'Süngülerle, silahlarla ve kanla kazandığımız askeri zaferlerden sonra, kültür, bilim, fen ve ekonomi alanlarında da zaferler kazanmaya devam edeceğiz. ' +
            '<br><br>' +
            'Zafer, “Zafer benimdir” diyebilenindir. Başarı ise, “Başaracağım” diye başlayarak sonunda “Başardım” diyebilenindir. ' +
            '<br><br>' +
            'Egemenlik verilmez, alınır.' +
            '<br><br>' +
            'Egemenlik, kayıtsız şartsız ulusundur.  ' +
            '<br><br>' +
            'Milleti kurtaranlar yalnız ve ancak öğretmenlerdir. ' +
            '<br><br>' +
            'Hayatta en hakiki mürşit ilimdir.' +
            '<br><br>' +
            'Türk Milleti bağımsız yaşamış ve bağımsızlığı varolmalarının yegane koşulu olarak kabul etmiş cesur insanların torunlarıdır. Bu millet hiçbir zaman hür olmadan yaşamamıştır, yaşayamaz ve yaşamayacaktır. ' +
            '<br><br>' +
            'Biz Türkler tarih boyunca hürriyet ve istiklale timsal olmuş bir milletiz. ' +
            '<br><br>' +
            'Milletimiz davranışlarında ve gayretlerinde sarsılmaz bir bütünlük gösterdiği için başarılı olmuştur. ' +
            'İki Mustafa Kemal vardır: Biri ben, et ve kemik, geçici Mustafa Kemal... İkinci Mustafa Kemal, onu “ben” kelimesiyle ifade edemem; o, ben değil, bizdir! O, memleketin her köşesinde yeni fikir, yeni hayat ve büyük ülkü için uğraşan aydın ve savaşçı bir topluluktur. Ben, onların rüyasını temsil ediyorum. Benim teşebbüslerim, onların özlemini çektikleri şeyleri tatmin içindir. O Mustafa Kemal sizsiniz, hepinizsiniz. Geçici olmayan, yaşaması ve başarılı olması gereken Mustafa Kemal odur! ' +
            '</p>' +
            '</div>' +

            '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 marginT10 wow ' + AnimationText + '"  data-wow-delay="' + wowDelayText + '">' +
            '<div id="' + vars.sectionNames.Kod + '" style="display:none;position: relative;left: 50%;transform: translate(-50%,0);">';


        for (i = 0; i < length; i++) {
            curData = data[i];
            tempCurData = curData.Resim.split(',');

            for (j = 0, rLength = tempCurData.length; j < rLength; j++) {
                html += '<img src="' + imagesDir + tempCurData[j] + '">';
            }
        }
        html += '</div>' +
            '</div>' +
            '</div><!-- End container --></section>';

        vars.sectionDatas.AtaturkKosesi.FHtml = html;
    }
}

function GetHtmlTr(data, trArray) {
    var i;
    var newHtml = '';
    var length = trArray.length;
    var no = data.No;
    var listOrder = data.ListOrder

    for (i = 0; i < length; i++) {
        newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
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

        '<input type="hidden" name="No" id="No" class="form-control" value="0">' +
        '<div class="ajax-group col-sm-12 paddingLR0">' +
        '<label>' + formLang.Resim + '</label>' +
        '<div id="' + vars.sectionSPs.Resim + '"></div>' +
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
        '<button id="' + vars.sectionButtons.OpenModal + '" style="float: left;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAdd + '" aria-hidden="true"></i></button>' +
        '<button id="' + rVars.sectionButtons.OpenModal + '" style="float: left; margin-left: 5px;" class="btn btn-success hvr-float-shadow"><i class="' + tableOpts.IconAddImage + '" aria-hidden="true"></i></button>' +
        '<span data-baslik="B_' + vars.sectionNames.Upper + '" class="' + settingsOpts.Names.Kod + ' cursor-pointer">' + vars.sectionNames.Normal + '</span>' +
        '<span id="' + vars.sectionShowBases.Num + '" class="badge"></span>' +
        '</h2>' +
        '</div>' +
        '<div class="col-xs-12 col-sm-12 col-md-12 col-lg-12 wow ' + AnimationText + '" data-wow-delay="' + wowDelayText + '">' +

        '<div class="table-responsive">' +
        '<table class="table table-bordered table-hover datatable">' +
        '<thead class="text-center">' +
        '<th class="text-center">' + formLang.Resim + '</th>' +
        '<th class="text-center">' + formLang.Yukari + '</th>' +
        '<th class="text-center">' + formLang.Asagi + '</th>' +
        '<th class="text-center">' + formLang.Duzenle + '</th>' +
        '<th class="text-center">' + formLang.Sil + '</th>' +
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
        GetResimlerSelect();
    }

    setTimeout(function() {
        if (!isFirst) {
            ShortenContent();
        }
        isFirst = false;
    }, 5);
    GetSectionsNum();
}