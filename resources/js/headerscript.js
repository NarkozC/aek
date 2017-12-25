/* for 2 captcha */
var CaptchaCallback = function() {
    setTimeout(function() {
        if ($('#ireCaptcha').length != 0) {
            grecaptcha.render('ireCaptcha', {
                'sitekey': '6LdEEy4UAAAAAB_XUm9TIeRzmtXOwl2DGwNishSF',
                'callback': 'verifyCallbackireCaptcha'
            });
        }
    }, 10)
};
var recaptchaResponses = new Array();
var verifyCallbackireCaptcha = function(response) {
    recaptchaResponses['ireCaptcha'] = response;
};

$(document).ready(function() {
    setTimeout(function() {
        if ($('#ireCaptcha').length != 0) {
            $.loadScript('https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit', function() {
                console.log('captcha loaded');
            });
        }
    }, 10)
});





/*
=====================================
  ------------ Render -----------
=====================================
*/
var renderTime = 5;
var renderCBTime = 1;
$(document).ready(function() {
    render();
});

function render() {
    $('#page').hide();
    var timeoutId = window.setTimeout(renderCB, renderTime);
}

function renderCB() {
    window.setTimeout(function() {
        var isMobile = window.matchMedia("only screen and (max-width: 766px)");
        var isTablet = window.matchMedia("only screen and (max-width: 992px)");

        if ($("#anasayfaP").length != 0) {
            $('body').css('padding-top', "0px");
        } else {
            if (!portal) {
                if (isMobile.matches || isTablet.matches) {
                    $('body').css('padding-top', "60px");
                } else {
                    $('body').css('padding-top', "170px");
                }
            } else {
                if (isMobile.matches || isTablet.matches) {
                    $('body').css('padding-top', "60px");
                } else {
                    $('body').css('padding-top', "100px");
                }
            }
        }
        $('#loader-container').fadeOut();
        $('#page').fadeIn();
    }, renderCBTime);
}





/*
=====================================
  ------------ WOW.JS -----------
=====================================
*/
var wowDelayS = ((renderTime + renderCBTime) / 1000) + 0.25;
var wowDelay = wowDelayS + 's';
var wowDelayTextS = (Number(wowDelayS) + 0.65);
var wowDelayText = wowDelayTextS + 's';
var Animation = 'fadeInUp';
var AnimationText = 'fadeIn';
var AnimationHeader = 'fadeInDown';





/*
=====================================
  ------------ Language -----------
=====================================
*/
var path = window.location.href;
var pathComponents = path.split('/');
var page;
var language;
var cfunction;
var cparam1;
var cparam2;
var isexistscfunction = false;
var isexistscparam1 = false;
var isexistscparam2 = false;
var portal = false;
var kg = "None";
var en = false;

if (pathComponents[2] == 'localhost') { //Localhost Web
    language = pathComponents[4];
    if (language == "en") {
        en = true;
        if (pathComponents[5] == 'Portal') {
            portal = true;
        }
    }
    if (language == 'Portal') {
        portal = true;
    }

    if (en == true && portal == true) {
        kg = pathComponents[6];
        page = pathComponents[7];
        cfunction = pathComponents[8];
        cparam1 = pathComponents[9];
        cparam2 = pathComponents[10];
    } else if (portal == true) {
        kg = pathComponents[5];
        page = pathComponents[6];
        cfunction = pathComponents[7];
        cparam1 = pathComponents[8];
        cparam2 = pathComponents[9];
    } else if (en == true) {
        page = pathComponents[5];
        cfunction = pathComponents[6];
        cparam1 = pathComponents[7];
        cparam2 = pathComponents[8];
    } else {
        page = pathComponents[4];
        cfunction = pathComponents[5];
        cparam1 = pathComponents[6];
        cparam2 = pathComponents[7];
    }

} else { //Normal Web
    language = pathComponents[3];
    if (language == "en") {
        en = true;
        if (pathComponents[4] == 'Portal') {
            portal = true;
        }
    }
    if (language == 'Portal') {
        portal = true;
    }

    if (en == true && portal == true) {
        kg = pathComponents[5];
        page = pathComponents[6];
        cfunction = pathComponents[7];
        cparam1 = pathComponents[8];
        cparam2 = pathComponents[9];
    } else if (portal == true) {
        kg = pathComponents[4];
        page = pathComponents[5];
        cfunction = pathComponents[6];
        cparam1 = pathComponents[7];
        cparam2 = pathComponents[8];
    } else if (en == true) {
        page = pathComponents[4];
        cfunction = pathComponents[5];
        cparam1 = pathComponents[6];
        cparam2 = pathComponents[7];
    } else {
        page = pathComponents[3];
        cfunction = pathComponents[4];
        cparam1 = pathComponents[5];
        cparam2 = pathComponents[6];
    }
}
if (cfunction != null && cfunction != "") {
    isexistscfunction = true;
}
if (cparam1 != null && cparam1 != "") {
    isexistscparam1 = true;
}
if (cparam2 != null && cparam2 != "") {
    isexistscparam2 = true;
}

console.log('en:' + en)
console.log('portal:' + portal)
console.log('page:' + page)
console.log('cfunction:' + cfunction)
console.log('cparam1:' + cparam1)
console.log('cparam2:' + cparam2)
console.log('kg:' + kg)


$(document).ready(function() {

    if ($('.navbar-rightt').length != 0) {
        var tHtml = $('.navbar-rightt').html();
        var linkcfunction = "";
        var linkcparam1 = "";
        var linkcparam2 = "";
        var linkportal = "";
        if (isexistscfunction) {
            linkcfunction = "/" + cfunction;
        }
        if (isexistscparam1) {
            linkcparam1 = "/" + cparam1;
        }
        if (isexistscparam2) {
            linkcparam2 = "/" + cparam2;
        }
        if (portal == true) {
            linkportal = 'Portal/' + kg + '/';
        }

        if (en) {
            var link = baseurl + linkportal + page + linkcfunction + linkcparam1 + linkcparam2;
            var t2html = '<li data-toggle="collapse" data-target="#MorfillNavbar">' +
                '<a class="ajax" href="' + link + '">' +
                //'<img src="'+baseurl+'resources/images/Flag/turkish_flag.png" width="35" class="img-responsive" alt="EN">'+
                'TR' +
                '</a>' +
                '</li>';

            tHtml += t2html;
            $('.navbar-rightt').html(tHtml);
        } else {
            var link = baseurl + 'en/' + linkportal + page + linkcfunction + linkcparam1 + linkcparam2;
            var t2html = '<li data-toggle="collapse" data-target="#MorfillNavbar">' +
                '<a class="ajax" href="' + link + '">' +
                //'<img src="'+baseurl+'resources/images/Flag/United-States-Flag.png" width="24" class="img-responsive" alt="EN">'+
                'ENG' +
                '</a>' +
                '</li>';

            tHtml += t2html;
            $('.navbar-rightt').html(tHtml);
        }
    }



});




/*
=====================================
  ------------ GLOBALS -----------
=====================================
*/


/*
--------------------------------
----------- Variables ----------
--------------------------------
*/



/*
------------ General -----------
*/
var imagesDir = baseurl + 'resources/images/';
var logoUrl = imagesDir + 'aek-logo.png';
var loaderGif = 'Genel/aek-loader.gif';
var loaderGifImg = '<img src="' + imagesDir + loaderGif + '" class="img-responsive img-center maxW100 wow ' + Animation + '" wow-delay="' + wowDelay + '" alt="Loader">'



/*
------------ Modal -----------
*/
var modalOpts = {
    ModalCloseButton: '<button type="button" class="close hvr-icon-spin" data-dismiss="modal" aria-label="Close"></button>',
}


/*
------------ Modal -----------
*/
var settingsOpts = {
    Objects: {
        Form: 'form',
        Modal: 'modal',
    },
    Names: {
        Upper: 'Settings',
        Lower: 'settings',
        Kod: 'settingsBtn',
    },
    Controllers: {
        Portal: baseurl + 'Portal/Admin/Genel-Settings/',
        Normal: baseurl + 'Genel-Settings/',
    },
    Functions: {
        Get: 'GetSettings',
        Update: 'UpdateSettings',
    },
    Buttons: {
        Submit: 'SubmitSettings',
    }

};


/*
------------ Table -----------
*/
var tableOpts = new Array();

tableOpts = {
    IconDelete: 'fa fa-trash',
    IconEdit: 'fa fa-pencil',
    IconAdd: 'fa fa-plus',
    IconAddImage: 'fa fa-picture-o',
    IconUp: 'fa fa-arrow-up',
    IconDown: 'fa fa-arrow-down',
    ButtonEdit: 'item-edit',
    ButtonDelete: 'item-delete',
    ButtonUp: 'item-up',
    ButtonDown: 'item-down',
}



/*
------------ Form -----------
*/

var formTabs = new Array();
formTabs = {
    Turkce: 'tab-turkce',
    Ingilizce: 'tab-ingilizce',
};

var formLang = new Array();
if (en) {

    formLang = {
        Turkce: "Turkish",
        Ingilizce: "English",
        Kaydet: "Save",
        Iptal: "Cancel",
        Evet: "Yes",
        Hayir: "No",
        Baslik: "Header",
        Ad: "Name",
        Aciklama: "Description",
        AciklamaSec: "Select Description...",
        Resimler: "Pictures",
        ResimlerSec: "Select Picture...",
        ResimlerSecUse: "Use Turkish Pictures",
        ResimlerSecTokens: "Empty Delete Use Turkish Pictures",
        Resim: "Picture",
        ResimSec: "Select Picture...",
        ResimSecUse: "Use Turkish Picture",
        ResimSecTokens: "Empty Delete Use Turkish Picture",
        Yazi: "Text",
        Sinif: "Class",
        SinifSec: "Select Class...",
        Sube: "Branch",
        SubeSec: "Select Branch...",
        Ders: "Lesson",
        DersSec: "Select Lesson...",
        Sinav: "Sınav",
        Etkinlik: "Etkinlik",
        Tarih: "Date",
        Duzenle: "Edit",
        Sil: "Delete",
        Okul: "School",
        OkulSec: "Select School...",
        Yil: "Year",
        YilSec: "Select Year...",
        delTitle: "Hey",
        delMessage: "Are you sure about that?",
        delEvetBtn: "Yes",
        delHayirBtn: "No",
        Sifirla: "Reset",
        Ay: "Month",
        AySec: "Select Month...",
        AnaResim: "Main Picture",
        AnaResimSec: "Select Main Picture...",
        AnaResimSecUse: "Use Turkish Picture",
        AnaResimSecTokens: "Empty Delete Use Turkish Picture",
        DigerResimler: "Other Pictures",
        DigerResimlerSec: "Select Other Pictures...",
        DigerResimlerSecUse: "Use Turkish Pictures",
        DigerResimlerSecTokens: "Empty Delete Use Turkish Pictures",
        Okullar: "Schools",
        OkullarSec: "Select Schools...",
        Kategori: "Category",
        KategoriSec: "Select Category...",
        Isim: "Name",
        Dosya: "File",
        GrupName: "Group Name",
        AdSoyad: "Name Surname",
        Sayfa: "Page",
        SayfaSec: "Select Page...",
        GrupSectionID: "Group",
        GrupSectionIDSec: "Select Group...",
        UzunAciklama: "Long Description",
        Gruplar: "Groups",
        Aciklamalar: "Descriptions",
        Yukari: "Up",
        Asagi: "Down",
        KisaAd: "Short Name",
        Grup: "Group",
        GrupSec: "Select Group...",
        Tip: "Type",
        TipSec: "Select Type...",
        BizeUlasin: "Contact Us",
        Email: "E-mail",
        Mesaj: "Message",
        Gonder: "Send",
        Donem: "Period",
        DonemSec: "Select Period...",
        Gun: "Day",
        GunSec: "Select Day...",
        Saat: "Time",
        Goster: "Show",
        Yazdir: "Print",
        Cinsiyet: "Gender",
        CinsiyetSec: "Select Gender...",
        SinavTarihi: "Exam Date",
        SinavTarihiSec: "Select Exam Date...",
        DogumTarihi: "Date Of Birth",
        DogumYeri: "Place Of Birth",
        OOSinif: "Current Class",
        OOOkul: "Current School",
        Bolum: "Bölüm",
        AnneAd: "Mother's Name",
        AnneTel: "Mother's Mobile Phone",
        AnneEmail: "Mother's E-mail",
        BabaAd: "Father's Name",
        BabaTel: "Father's Mobile Phone",
        BabaEmail: "Father's E-mail",
        Adres: "Address",
        Tc: "Identity",
        Basvur: "Apply",
        ReadMore: "Read More",
        Bekle: 'Please Wait...',
        Tum: 'All',
        Kapat: 'Close',
        BasSaat: 'Start Time',
        BitSaat: 'End Time',
        EnBaslik: 'English Header',
        TrBaslik: 'Turkish Header',
        Link: 'Link',
        DetaylarIcin: 'For Details',
        GMaps: 'Google Maps',
        YolTarifi: 'Directions',
        Tel: 'Phone',
        Facebook: 'Facebook',
        Twitter: 'Twitter',
        Instagram: 'Instagram',
        Level: 'Level',
        LevelSec: "Select Level...",
        IsLink: 'Is Link?',
        IsLinkInBaseurl: 'Is Link From This Website?',
        UstBirim: 'Parent Unit',
        UstBirimSec: "Select Parent Unit...",
    };

} else {
    formLang = {
        Turkce: "Türkçe",
        Ingilizce: "İngilizce",
        Kaydet: "Kaydet",
        Iptal: "İptal",
        Evet: "Evet",
        Hayir: "Hayir",
        Baslik: "Başlık",
        Ad: "Ad",
        Aciklama: "Açıklama",
        AciklamaSec: "Açıklama Seç...",
        Resimler: "Resimler",
        ResimlerSec: "Resim Seç...",
        ResimlerSecUse: "Türkçe Resimleri Kullan",
        ResimlerSecTokens: "Boş Sil Türkçe Resimleri Kullan",
        Resim: "Resim",
        ResimSec: "Resim Seç...",
        ResimSecUse: "Türkçe Resmi Kullan",
        ResimSecTokens: "Boş Sil Türkçe Resmi Kullan",
        Yazi: "Yazı",
        Sinif: "Sınıf",
        SinifSec: "Sınıf Seç...",
        Sube: "Şube",
        SubeSec: "Şube Seç...",
        Ders: "Ders",
        DersSec: "Ders Seç...",
        Sinav: "Sınav",
        Etkinlik: "Etkinlik",
        Tarih: "Tarih",
        Duzenle: "Düzenle",
        Sil: "Sil",
        Okul: "Okul",
        OkulSec: "Okul Seç...",
        Yil: "Yıl",
        YilSec: "Yıl Seç...",
        delTitle: "Hey",
        delMessage: "Bundan emin misin?",
        delEvetBtn: "Evet",
        delHayirBtn: "Hayır",
        Sifirla: "Sıfırla",
        Ay: "Ay",
        AySec: "Ay Seç...",
        AnaResim: "Ana Resim",
        AnaResimSec: "Ana Resim Seç...",
        AnaResimSecUse: "Türkçe Resmi Kullan",
        AnaResimSecTokens: "Boş Sil Türkçe Resmi Kullan",
        DigerResimler: "Diğer Resimler",
        DigerResimlerSec: "Diğer Resimleri Seç...",
        DigerResimlerSecUse: "Türkçe Resimleri Kullan",
        DigerResimlerSecTokens: "Boş Sil Türkçe Resimleri Kullan",
        Okullar: "Okullar",
        OkullarSec: "Okulları Seç...",
        Kategori: "Kategori",
        KategoriSec: "Kategori Seç...",
        Isim: "İsim",
        Dosya: "Dosya",
        GrupName: "Grup İsmi",
        AdSoyad: "Ad Soyad",
        Sayfa: "Sayfa",
        SayfaSec: "Sayfa Seç...",
        GrupSectionID: "Grup",
        GrupSectionIDSec: "Grup Seç...",
        UzunAciklama: "Uzun Açıklama",
        Gruplar: "Gruplar",
        Aciklamalar: "Açıklamalar",
        Yukari: "Yukarı",
        Asagi: "Aşağı",
        KisaAd: "Kısa Ad",
        Grup: "Grup",
        GrupSec: "Grup Seç...",
        Tip: "Tip",
        TipSec: "Tip Seç...",
        BizeUlasin: "Bize Ulaşın",
        Email: "E-posta",
        Mesaj: "Mesaj",
        Gonder: "Gönder",
        Donem: "Dönem",
        DonemSec: "Dönem Seç...",
        Gun: "Gün",
        GunSec: "Gün Seç...",
        Saat: "Saat",
        Goster: "Göster",
        Yazdir: "Yazdır",
        Cinsiyet: "Cinsiyet",
        CinsiyetSec: "Cinsiyet Seç...",
        SinavTarihi: "Sınav Tarihi",
        SinavTarihiSec: "Sınav Tarihi Seç...",
        DogumTarihi: "Doğum Tarihi",
        DogumYeri: "Doğum Yeri",
        OOSinif: "Okumakta Olduğu Sınıf",
        OOOkul: "Okumakta Olduğu Okul",
        Bolum: "Bölüm",
        AnneAd: "Anne Adı",
        AnneTel: "Anne Cep Telefonu",
        AnneEmail: "Anne E-posta",
        BabaAd: "Baba Adı",
        BabaTel: "Baba Cep Telefonu",
        BabaEmail: "Baba E-posta",
        Adres: "Adres",
        Tc: "Tc Kimlik No",
        Basvur: "Başvur",
        ReadMore: "Devamını Oku",
        Bekle: 'Lütfen Bekleyin...',
        Tum: 'Tüm',
        Kapat: 'Kapat',
        BasSaat: 'Başlangıç Saati',
        BitSaat: 'Bitiş Saati',
        EnBaslik: 'İngilizce Başlık',
        TrBaslik: 'Türkçe Başlık',
        Link: 'Link',
        DetaylarIcin: 'Detaylar İçin',
        GMaps: 'Google Maps',
        YolTarifi: 'Yol Tarifi',
        Tel: 'Telefon',
        Facebook: 'Facebook',
        Twitter: 'Twitter',
        Instagram: 'Instagram',
        Level: 'Level',
        LevelSec: "Level Seç...",
        IsLink: 'Link Mi?',
        IsLinkInBaseurl: 'Link Bu Siteden Mi?',
        UstBirim: 'Üst Birim',
        UstBirimSec: "Üst Birim Seç...",
    };
}



/*
--------------------------------
----------- Functions ----------
--------------------------------
*/

function GetYillarData() {
    var yillar = new Array();
    var hMuchYear = 3;
    var cYear = (new Date).getFullYear();
    var nYear1 = cYear - 2;
    var nYear2;
    var fYear;
    for (var i = 0; i < hMuchYear; i++) {
        nYear1 = nYear1 + 1;
        nYear2 = nYear1 + 1;
        fYear = nYear1 + '-' + nYear2;
        yillar[i] = fYear;
    }
    return yillar;
}

function GetOkullarData(getO = 1, kod = "0") {
    var controller = baseurl + 'Genel-Okullar/';
    var getFunction = 'GetOkullar';
    var okullarD = new Array();

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Okullar;
                okullarD = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Okullar;
                okullarD = cache;
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    okullarD[i] = GetCurData(data[i]);
                }
                var theCacheData = {
                    Okullar: okullarD
                }
                setTimeout(Cache('GetOkullarData', url, theCacheData), 1)
            }
            if (getO != 1) {
                var okullarTemp = okullarD.filter(function(okul) {
                    return okul.Kod == kod;
                });
                okullarD = okullarTemp;
            }
        },
        error: function() {
            iziError();
        }
    });

    return okullarD;
}

function GetGunlerData(getG = 1, kod = "0") {
    var controller = baseurl + 'Genel-Gunler/';
    var getFunction = 'GetGunler';
    var gunlerD = new Array();

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Gunler;
                gunlerD = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Gunler;
                gunlerD = cache;
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    gunlerD[i] = GetCurData(data[i]);
                }
                var theCacheData = {
                    Gunler: gunlerD
                }
                setTimeout(Cache('GetGunlerData', url, theCacheData), 1)
            }
            if (getG != 1) {
                var gunlerTemp = gunlerD.filter(function(gun) {
                    return gun.Kod == kod;
                });
                gunlerD = gunlerTemp;
            }
        },
        error: function() {
            iziError();
        }
    });

    return gunlerD;
}

function GetDerslerData(getD = 1, kod = "matematik") {

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
            '</td>' +
            '<td>' +
            '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
            '</td>';

        return newHtml;
    }


    var controller = baseurl + 'Genel-Dersler/';
    var getFunction = 'GetDersler';
    var derslerD = {
        Data: new Array(),
        BHtml: '',
        Num: 0,
    };

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Dersler;
                derslerD = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Dersler;
                derslerD = cache;
            } else {
                var bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    trArray = new Array('Ad');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    derslerD.Data[i] = curData;
                }

                derslerD.BHtml = bHtml;
                derslerD.Num = length;
                var theCacheData = {
                    Dersler: derslerD,
                }
                setTimeout(Cache('GetDerslerData', url, theCacheData), 1);
            }
            if (getD != 1) {
                var derslerTemp = derslerD.filter(function(ders) {
                    return ders.Kod == kod;
                });
                derslerD = derslerTemp;
            }
        },
        error: function() {
            iziError();
        }
    });

    return derslerD;
}

function GetSiniflarData(getS = 1, kod = "1") {
    var controller = baseurl + 'Genel-Siniflar/';
    var getFunction = 'GetSiniflar';
    var siniflarD = new Array();

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Siniflar;
                siniflarD = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Siniflar;
                siniflarD = cache;
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    siniflarD[i] = GetCurData(data[i]);
                }
                var theCacheData = {
                    Siniflar: siniflarD
                }
                setTimeout(Cache('GetSiniflarData', url, theCacheData), 1)
            }
            if (getS != 1) {
                var siniflarTemp = siniflarD.filter(function(sinif) {
                    return sinif.Kod == kod;
                });
                siniflarD = siniflarTemp;
            }
        },
        error: function() {
            iziError();
        }
    });

    return siniflarD;
}

function GetSubelerData(getS = 1, kod = "1") {

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
            '</td>' +
            '<td>' +
            '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
            '</td>';

        return newHtml;
    }

    var controller = baseurl + 'Genel-Subeler/';
    var getFunction = 'GetSubeler';
    var subelerD = {
        Data: new Array(),
        BHtml: '',
        Num: 0,
    };

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Subeler;
                subelerD = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Subeler;
                subelerD = cache;
            } else {
                var bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    trArray = new Array('Kod');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    subelerD.Data[i] = curData;
                }

                subelerD.BHtml = bHtml;
                subelerD.Num = length;
                var theCacheData = {
                    Subeler: subelerD,
                }
                setTimeout(Cache('GetSectionsData', url, theCacheData), 1);
            }
            if (getS != 1) {
                var subelerTemp = subelerD.filter(function(sube) {
                    return sube.Kod == kod;
                });
                subelerD = subelerTemp;
            }
        },
        error: function() {
            iziError();
        }
    });

    return subelerD;
}

function GetResimlerData() {
    var controller = baseurl + 'Portal/Admin/Genel-Resimler/';
    var getFunction = 'GetResimler';
    var resimlerD = {
        // Data: new Array(),
        Html: '',
    };

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Resimler;
                resimlerD = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Resimler;
                resimlerD = cache;
            } else {
                var i, length, html = '';;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    // resimlerD.Data[i] = data[i];
                    resimlerD.Html += '<option data-tokens="' + data[i].RKategoriler + '/' + data[i].RDosya + ' ' + data[i].RIsim + ' ' + data[i].RKategoriler + '" value="' + data[i].RKategoriler + '/' + data[i].RDosya + '">' + data[i].RIsim + ' (' + data[i].RKategoriler + ')</option>';
                }
                var theCacheData = {
                    Resimler: resimlerD
                }
                setTimeout(Cache('GetResimlerData', url, theCacheData), 1)
            }

        },
        error: function() {
            iziError();
        }
    });
    return resimlerD;
}

function GetCinsiyetlerData(getS = 1, kod = "E") {
    var controller = baseurl + 'Genel-Cinsiyetler/';
    var getFunction = 'GetCinsiyetler';
    var cinsiyetlerD = new Array();

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Cinsiyetler;
                cinsiyetlerD = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Cinsiyetler;
                cinsiyetlerD = cache;
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    cinsiyetlerD[i] = GetCurData(data[i]);
                }
                var theCacheData = {
                    Cinsiyetler: cinsiyetlerD
                }
                setTimeout(Cache('GetCinsiyetlerData', url, theCacheData), 1)
            }
            if (getS != 1) {
                var subelerTemp = cinsiyetlerD.filter(function(sube) {
                    return sube.Kod == kod;
                });
                cinsiyetlerD = subelerTemp;
            }
        },
        error: function() {
            iziError();
        }
    });

    return cinsiyetlerD;
}

function GetAylarData(getS = 1, kod = "E") {
    var controller = baseurl + 'Genel-Aylar/';
    var getFunction = 'GetAylar';
    var curData = new Array();

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Aylar;
                curData = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Aylar;
                curData = cache;
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    curData[i] = GetCurData(data[i]);
                }
                var theCacheData = {
                    Aylar: curData
                }
                setTimeout(Cache('GetAylarData', url, theCacheData), 1)
            }
            if (getS != 1) {
                var temp = curData.filter(function(ay) {
                    return ay.Kod == kod;
                });
                curData = temp;
            }
        },
        error: function() {
            iziError();
        }
    });

    return curData;
}

function GetKategorilerData(getS = 1, kod = "E") {

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


    var controller = baseurl + 'Portal/Admin/Genel-Kategoriler/';
    var getFunction = 'GetKategoriler';
    var curDataG = {
        Data: new Array(),
        BHtml: '',
        Num: 0,
    }

    var url = controller + getFunction;
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
                var cache = result.cachedataEN.Kategoriler;
                curDataG = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Kategoriler;
                curDataG = cache;
            } else {
                var bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, curData, trInside, trArray;

                for (i = 0; i < length; i++) {
                    curData = GetCurData(data[i]);

                    trArray = new Array('Isim');
                    trInside = GetHtmlTr(curData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    curDataG.Data[i] = curData;
                }

                curDataG.BHtml = bHtml;
                curDataG.Num = length;
                var theCacheData = {
                    Kategoriler: curDataG,
                }
                setTimeout(Cache('GetKategorilerData', url, theCacheData), 1);
            }
        },
        error: function() {
            iziError();
        }
    });

    return curDataG;
}

function GetSettingsData() {
    var curData = new Array();

    var url = settingsOpts.Controllers.Normal + settingsOpts.Functions.Get;
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
                var cache = result.cachedataEN.Settings;
                curData = cache;
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Settings;
                curData = cache;
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    curData[i] = data[i];
                }
                var theCacheData = {
                    Settings: curData
                }
                setTimeout(Cache('GetSettingsData', url, theCacheData), 1)
            }
        },
        error: function() {
            iziError();
        }
    });

    return curData;
}

function Cache(who, url, data) {
    var theCacheData;
    if (en) {
        theCacheData = {
            CacheEN: data
        }
    } else {
        theCacheData = {
            CacheTR: data
        }
    }
    theCacheData['English'] = en;
    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        data: theCacheData,
        async: false,
        dataType: 'json',
        success: function(response) {
            console.log('cache success on:' + who)
        },
        error: function() {
            iziError();
        }
    });
}

jQuery.loadScript = function(url, callback = '') {
    jQuery.ajax({
        url: url,
        dataType: 'script',
        success: callback,
        async: true
    });
}


function GetCurData(data) {
    var itemString = $.map(data, function(item, key) {
        var mKey = key;
        if (mKey.indexOf('tr_') > -1 || mKey.indexOf('en_') > -1) {
            mKey = mKey.substring(3);
        }
        return (mKey);
    }).join(",");

    var trEnNames = itemString.split(',');
    var curContent = {}

    for (var j = 0; j < trEnNames.length; j++) {
        var trData = 'tr_' + trEnNames[j];
        var enData = 'en_' + trEnNames[j];
        if (data[trData] == undefined) {
            curContent[trEnNames[j]] = data[trEnNames[j]];
        } else {
            if (en) {
                if (data[enData] == "") {
                    curContent[trEnNames[j]] = data[trData];
                } else {
                    curContent[trEnNames[j]] = data[enData];
                }
            } else {
                curContent[trEnNames[j]] = data[trData];
            }
        }

    }
    return curContent;
}




/*
------------ Show Form Errors -----------
*/
function ShowFormErrors(messages) {
    var i = 0;
    $.each(messages, function(key, value) {
        var ajaxGroup;
        var element
        var key = key.replace("[]", "");
        if (key == "No") {
            element = $('[name="' + key + '"]');
        } else {
            element = $('#' + key + '');
        }
        ajaxGroup = element.parents('.ajax-group:first');
        ajaxGroup.addClass(value.length > 0 ? 'has-error' : 'has-success')

        $(ajaxGroup).append(value);
    });
}



/*
------------ Reset Form Errors -----------
*/
function ResetFormErrors() {
    $('.text-danger').remove();
    $('.ajax-group').removeClass('has-error').removeClass('has-success');
}



/*
------------ Refresh Selectpicker -----------
*/
function RefreshSelectpicker() {
    $('.selectpicker').selectpicker('render');
    $('.selectpicker').selectpicker('refresh');
}



/*
------------ Reset Selectpicker -----------
*/
function ResetSelectpicker() {
    if ($('.selectpicker').selectpicker('val') == "0") {
        $('.selectpicker').selectpicker('val', '');
    }
}



/*
------------ Reset Form -----------
*/
function ResetForm(form) {
    $(form)[0].reset();
    $('.selectpicker').selectpicker('val', '');
    $('.text-danger').remove();
    $('.ajax-group').removeClass('has-error').removeClass('has-success');
}









/*
=====================================
  ---------- Shorten Content ------
=====================================
*/
$(function() { /* to make sure the script runs after page load */

    window.ShortenContent = function() {
        $('.shorten_content').each(function(event) { /* select all divs with the item class */

            var max_length = 115; /* set the max content length before a read more link will be added */

            if ($(this).html().length > max_length) { /* check for content length */

                var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
                var long_content = $(this).html().substr(max_length);

                $(this).html(short_content +
                    '<a href="javascript:;" class="btn btn-danger btn-sm read_more">Devamını Oku</a>' +
                    '<span class="more_text" style="display:none;">' + long_content + '</span>' +
                    '<a href="javascript:;" class="btn btn-danger btn-sm read_less" style="display:none">Kısalt</a>'); /* Alter the html to allow the read more functionality */




                $(this).find('a.read_less').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').hide(); /* show the .more_text span */
                    $(this).parent().find('a.read_more').show();

                });

                $(this).find('a.read_more').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').show(); /* show the .more_text span */
                    $(this).parent().find('a.read_less').show();

                });

                $('#yorumlar a.read_more').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */
                    $('#yorumlar-carousel').carousel('pause');
                });

                $('#yorumlar a.read_less').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */
                    $('#yorumlar-carousel').carousel('cycle');
                });



            }

        });
    }

    ShortenContent();

    window.ShortenContent2 = function() {
        $('.shorten_content2').each(function(event) { /* select all divs with the item class */

            var max_length = 50; /* set the max content length before a read more link will be added */

            if ($(this).html().length > max_length) { /* check for content length */

                var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
                var long_content = $(this).html().substr(max_length);

                $(this).html(short_content +
                    '<a href="javascript:;" class="btn btn-danger btn-sm read_more">Devamını Oku</a>' +
                    '<span class="more_text" style="display:none;">' + long_content + '</span>' +
                    '<a href="javascript:;" class="btn btn-danger btn-sm read_less" style="display:none">Kısalt</a>'); /* Alter the html to allow the read more functionality */

                $(this).find('a.read_more').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').show(); /* show the .more_text span */
                    $(this).parent().find('a.read_less').show();

                });

                $(this).find('a.read_less').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').hide(); /* show the .more_text span */
                    $(this).parent().find('a.read_more').show();

                });

            }

        });
    }

    ShortenContent2();

    window.ShortenContent3 = function() {
        $('.shorten_content3').each(function(event) { /* select all divs with the item class */

            var max_length = 200; /* set the max content length before a read more link will be added */

            if ($(this).html().length > max_length) { /* check for content length */

                var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
                var long_content = $(this).html().substr(max_length);

                $(this).html(short_content + '...'); /* Alter the html to allow the read more functionality */

            }

        });
    }

    ShortenContent3();

    window.ShortenContent4 = function() {
        $('.shorten_content4').each(function(event) { /* select all divs with the item class */

            var max_length = 40; /* set the max content length before a read more link will be added */

            if ($(this).html().length > max_length) { /* check for content length */

                var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
                var long_content = $(this).html().substr(max_length);

                $(this).html(short_content +
                    '<a href="javascript:;" class="btn btn-danger btn-xs read_more">Devamını Oku</a>' +
                    '<span class="more_text" style="display:none;">' + long_content + '</span>' +
                    '<a href="javascript:;" class="btn btn-danger btn-xs read_less" style="display:none">Kısalt</a>'); /* Alter the html to allow the read more functionality */

                $(this).find('a.read_more').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').show(); /* show the .more_text span */
                    $(this).parent().find('a.read_less').show();

                });

                $(this).find('a.read_less').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').hide(); /* show the .more_text span */
                    $(this).parent().find('a.read_more').show();

                });

            }

        });
    }

    ShortenContent4();

    window.ShortenContent6 = function() {
        $('.shorten_content6').each(function(event) { /* select all divs with the item class */

            var max_length = 50; /* set the max content length before a read more link will be added */

            if ($(this).html().length > max_length) { /* check for content length */

                var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
                var long_content = $(this).html().substr(max_length);

                $(this).html(short_content +
                    '<a href="javascript:;" class="btn btn-danger btn-sm read_more">Devamını Oku</a>' +
                    '<span class="more_text" style="display:none;">' + long_content + '</span>' +
                    '<a href="javascript:;" class="btn btn-danger btn-sm read_less" style="display:none">Kısalt</a>'); /* Alter the html to allow the read more functionality */


                $(this).find('a.read_less').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').hide(); /* show the .more_text span */
                    $(this).parent().find('a.read_more').show();

                });

                $(this).find('a.read_more').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').show(); /* show the .more_text span */
                    $(this).parent().find('a.read_less').show();

                });

            }

        });
    }

    ShortenContent6();

    window.ShortenContent7 = function() {
        $('.shorten_content7').each(function(event) { /* select all divs with the item class */

            var max_length = 22; /* set the max content length before a read more link will be added */

            if ($(this).html().length > max_length) { /* check for content length */

                var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
                var long_content = $(this).html().substr(max_length);

                $(this).html(short_content +
                    '<a href="javascript:;" class="btn btn-danger btn-xs read_more">Devamını Oku</a>' +
                    '<span class="more_text" style="display:none;">' + long_content + '</span>' +
                    '<a href="javascript:;" class="btn btn-danger btn-xs read_less" style="display:none">Kısalt</a>'); /* Alter the html to allow the read more functionality */

                $(this).find('a.read_more').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').show(); /* show the .more_text span */
                    $(this).parent().find('a.read_less').show();

                });

                $(this).find('a.read_less').click(function(event) { /* find the a.read_more element within the new html and bind the following code to it */

                    event.preventDefault(); /* prevent the a from changing the url */
                    $(this).hide(); /* hide the read more button */
                    $(this).parent().find('.more_text').hide(); /* show the .more_text span */
                    $(this).parent().find('a.read_more').show();

                });

            }

        });
    }

    ShortenContent7();

    window.ShortenContent8 = function() {
        $('.shorten_content8').each(function(event) { /* select all divs with the item class */

            var max_length = 200; /* set the max content length before a read more link will be added */

            if ($(this).html().length > max_length) { /* check for content length */

                var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
                var long_content = $(this).html().substr(max_length);

                $(this).html(short_content + '...'); /* Alter the html to allow the read more functionality */

            }

        });
    }

    ShortenContent8();

    window.ShortenContent9 = function() {
        $('.shorten_content9').each(function(event) { /* select all divs with the item class */

            var max_length = 35; /* set the max content length before a read more link will be added */

            if ($(this).html().length > max_length) { /* check for content length */

                var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
                var long_content = $(this).html().substr(max_length);

                $(this).html(short_content + '...'); /* Alter the html to allow the read more functionality */

            }

        });
    }

    ShortenContent9();



    $(document).ready(function() {
        $(document).ready(function() {
            if (en == true) {
                $('.read_more').html('Read More');
                $('.read_less').html('Read Less');
            }
        });
    });

});


window.ShortenContent5 = function() {
    $('.shorten_content5').each(function(event) { /* select all divs with the item class */

        var max_length = 50; /* set the max content length before a read more link will be added */

        if ($(this).html().length > max_length) { /* check for content length */

            var short_content = $(this).html().substr(0, max_length); /* split the content in two parts */
            var long_content = $(this).html().substr(max_length);

            $(this).html(short_content + '...'); /* Alter the html to allow the read more functionality */

        }

    });
}

ShortenContent5();