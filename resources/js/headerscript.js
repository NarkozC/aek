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
            $.loadScript('https://www.google.com/recaptcha/api.js?onload=CaptchaCallback&render=explicit', function() {});
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
var isLocalhost = false;

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

if (pathComponents[2] == 'aek' || pathComponents[2] == 'localhost') {
    isLocalhost = true;
    console.log('en:' + en)
    console.log('portal:' + portal)
    console.log('page:' + page)
    console.log('cfunction:' + cfunction)
    console.log('cparam1:' + cparam1)
    console.log('cparam2:' + cparam2)
    console.log('kg:' + kg)
}

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
var pdfsDir = baseurl + 'resources/pdfs/';
var logoUrl = imagesDir + 'aek-logo.png';
var loaderGif = 'Genel/aek-loader.gif';
var loaderGifImg = '<img src="' + imagesDir + loaderGif + '" class="img-responsive img-center maxW100 wow ' + Animation + '" wow-delay="' + wowDelay + '" alt="Loader">'
var cacheLimit = 6000;


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
    IconDownload: 'fa fa-download',
    ButtonEdit: 'item-edit',
    ButtonDelete: 'item-delete',
    ButtonUp: 'item-up',
    ButtonDown: 'item-down',
    ButtonDownload: 'item-download',
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
        ShAdSoyad: "Your Name Surname",
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
        ShEmail: "Your E-mail",
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
        Bolum: "Section",
        BolumSec: "Select Section...",
        AnneAd: "Mother's Name and Surname",
        AnneTel: "Mother's Mobile Phone",
        AnneEmail: "Mother's E-mail",
        BabaAd: "Father's Name and Surname",
        BabaTel: "Father's Mobile Phone",
        BabaEmail: "Father's E-mail",
        Adres: "Address",
        Tc: "Identity",
        Basvur: "Apply",
        ReadMore: "Read More",
        ReadLess: "Read Less",
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
        ShTel: 'Your Phone',
        AltTel: 'Alternative Phone',
        Facebook: 'Facebook',
        Twitter: 'Twitter',
        Instagram: 'Instagram',
        Youtube: 'Youtube',
        Level: 'Level',
        LevelSec: "Select Level...",
        IsLink: 'Is Link?',
        IsLinkInBaseurl: 'Is Link From This Website?',
        UstBirim: 'Parent Unit',
        UstBirimSec: "Select Parent Unit...",
        Indir: "Download",
        Kod: "Code",
        IGIsim: 'Name Displayed When Downloading',
        Ilkokul: 'İlkokul',
        Ortaokul: 'Ortaokul',
        Lise: 'Anadolu Lisesi',
        IGIIlkokul: 'Name Displayed When Downloading - Primary School',
        IGIOrtaokul: 'Name Displayed When Downloading - Secondary School',
        IGILise: 'Name Displayed When Downloading - Anatolian High School',
        Pdf: 'Pdf',
        PdfSec: 'Select Pdf...',
        SmsMailKabul: 'I agree to be notified via SMS and E-mail',
        IsNamesSame: 'Is Names Same?',
        KimVKisBil: 'Identity and Personal Information',
        IlBil: 'Contact Information',
        MedeniHal: 'Marital Status',
        MedeniHalSec: 'Select Marital Status...',
        EngelDurumu: 'Disability Situation',
        Cv: 'Cv',
        ShCv: 'Resimli Cv',
        Pozisyon: 'Position',
        ShPozisyon: 'Your Position',
        PozisyonSec: 'Select Position...',
        Brans: 'Branch',
        ShBrans: 'Your Branch',
        ShMOO: 'Graduated School',
        Indir: 'Download',
        BasTarihi: 'Application Date',
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
        ShAdSoyad: "Adınız Soyadınız",
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
        ShEmail: "E-postanız",
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
        ShDogumTarihi: "Doğum Tarihiniz",
        DogumYeri: "Doğum Yeri",
        OOSinif: "Okumakta Olduğu Sınıf",
        OOOkul: "Okumakta Olduğu Okul",
        Bolum: "Bölüm",
        BolumSec: "Bölüm Seç...",
        AnneAd: "Anne Adı ve Soyadı",
        AnneTel: "Anne Cep Telefonu",
        AnneEmail: "Anne E-posta",
        BabaAd: "Baba Adı ve Soyadı",
        BabaTel: "Baba Cep Telefonu",
        BabaEmail: "Baba E-posta",
        Adres: "Adres",
        Tc: "TC Kimlik No",
        Basvur: "Başvur",
        ReadMore: "Devamını Oku",
        ReadLess: "Kısalt",
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
        ShTel: 'Telefonunuz',
        AltTel: 'Alternatif Telefon',
        ShAltTel: 'Alternatif Telefonunuz',
        Facebook: 'Facebook',
        Twitter: 'Twitter',
        Instagram: 'Instagram',
        Youtube: 'Youtube',
        Level: 'Level',
        LevelSec: "Level Seç...",
        IsLink: 'Link Mi?',
        IsLinkInBaseurl: 'Link Bu Siteden Mi?',
        UstBirim: 'Üst Birim',
        UstBirimSec: "Üst Birim Seç...",
        Indir: "İndir",
        Kod: "Kod",
        IGIsim: 'İndirilirken Gösterilecek İsim',
        Ilkokul: 'İlkokul',
        Ortaokul: 'Ortaokul',
        Lise: 'Anadolu Lisesi',
        IGIIlkokul: 'İndirilirken Gösterilecek İsim - İlkokul',
        IGIOrtaokul: 'İndirilirken Gösterilecek İsim - Ortaokul',
        IGILise: 'İndirilirken Gösterilecek İsim - Anadolu Lisesi',
        Pdf: 'Pdf',
        PdfSec: 'Pdf Seç...',
        SmsMailKabul: 'SMS ve E-posta yoluyla bilgilendirilmeyi kabul ediyorum.',
        IsNamesSame: 'İsimler Aynı Mı?',
        KimVKisBil: 'Kimlik ve Kişisel Bilgiler',
        IlBil: 'İletişim Bilgileri',
        MedeniHal: 'Medeni Hal',
        MedeniHalSec: 'Medeni Hal Seç...',
        EngelDurumu: 'Engel Durumu',
        EngelDurumuSec: 'Engel Durumu Seç...',
        Cv: 'Cv',
        ShCv: 'Resimli Cv',
        Pozisyon: 'Pozisyon',
        ShPozisyon: 'Başvurduğunuz Pozisyon',
        PozisyonSec: 'Pozisyon Seç...',
        Brans: 'Branş',
        ShBrans: 'Branşınız',
        MOO: 'Mezun Olduğu Okul',
        ShMOO: 'Mezun Olduğunuz Okul',
        OTS: 'Okul Tecrübe Süresi',
        ShOTS: 'Okul Tecrübe Süreniz',
        DTS: 'Dershane Tecrübe Süresi',
        ShDTS: 'Dershane Tecrübe Süreniz',
        YTS: 'Yönetici Tecrübe Süresi',
        ShYTS: 'Yönetici Tecrübe Süreniz',
        Indir: 'İndir',
        BasTarihi: 'Başvuru Tarihi',
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

function GetOkullarData() {
    var controller = baseurl + 'Genel-Okullar/';
    var getFunction = 'GetOkullar';
    var funData = new Array();

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
                funData = JSON.parse(cache);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Okullar;
                funData = JSON.parse(cache);
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    funData[i] = GetCurData(data[i]);
                }

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData);
                    funData = myJSON;
                    var theCacheData = {
                        Okullar: funData,
                    }
                    setTimeout(Cache('GetOkullarData', url, theCacheData), 1);
                    funData = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetGunlerData() {
    var controller = baseurl + 'Genel-Gunler/';
    var getFunction = 'GetGunler';
    var funData = new Array();

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
                funData = JSON.parse(cache);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Gunler;
                funData = JSON.parse(cache);
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    funData[i] = GetCurData(data[i]);
                }

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData);
                    funData = myJSON;
                    var theCacheData = {
                        Gunler: funData,
                    }
                    setTimeout(Cache('GetGunlerData', url, theCacheData), 1);
                    funData = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetDerslerData() {

    function GetHtmlTr(data, trArray) {
        var i;
        var newHtml = '';
        var length = trArray.length;
        var no = data.No;

        for (i = 0; i < length; i++) {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
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
    var funData = {
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
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Dersler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
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

                    funData.Data[i] = curData;
                }

                funData.BHtml = bHtml;
                funData.Num = length;

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData.Data);
                    funData.Data = myJSON;
                    var theCacheData = {
                        Dersler: funData,
                    }
                    setTimeout(Cache('GetDerslerData', url, theCacheData), 1);
                    funData.Data = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetSiniflarData() {
    var controller = baseurl + 'Genel-Siniflar/';
    var getFunction = 'GetSiniflar';
    var funData = new Array();

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
                funData = JSON.parse(cache);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Siniflar;
                funData = JSON.parse(cache);
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    funData[i] = GetCurData(data[i]);
                }

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData);
                    funData = myJSON;
                    var theCacheData = {
                        Siniflar: funData,
                    }
                    setTimeout(Cache('GetSiniflarData', url, theCacheData), 1);
                    funData = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetSubelerData() {

    function GetHtmlTr(data, trArray) {
        var i;
        var newHtml = '';
        var length = trArray.length;
        var no = data.No;

        for (i = 0; i < length; i++) {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';
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
    var funData = {
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
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Subeler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
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

                    funData.Data[i] = curData;
                }

                funData.BHtml = bHtml;
                funData.Num = length;

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData.Data);
                    funData.Data = myJSON;
                    var theCacheData = {
                        Subeler: funData,
                    }
                    setTimeout(Cache('GetSubelerData', url, theCacheData), 1);
                    funData.Data = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetResimlerData() {
    var controller = baseurl + 'Portal/Admin/Genel-Resimler/';
    var getFunction = 'GetResimler';
    var funData = {
        Data: new Array(),
        Html: '',
        BHtml: '',
        Num: 0,
    };

    function GetHtmlTr(data, trArray) {
        var i;
        var newHtml = '';
        var length = trArray.length;
        var no = data.No;
        var dosya = data.RDosya;
        var kategori = 'images/' + data.RKategori;

        for (i = 0; i < length; i++) {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';

        }
        newHtml +=
            '<td>' +
            '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '" data2="' + dosya + '" data3="' + kategori + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
            '</td>' +
            '<td>' +
            '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '" data2="' + dosya + '" data3="' + kategori + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
            '</td>';

        return newHtml;
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
                var cache = result.cachedataEN.Resimler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Resimler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else {
                var i, length;
                var data = result.data,
                    html = '',
                    bHtml = '';
                for (i = 0, length = data.length; i < length; i++) {
                    funData.Data[i] = data[i];

                    funData.Html += '<option data-tokens="' + data[i].RKategori + '/' + data[i].RDosya + ' ' + data[i].RIsim + ' ' + data[i].RKategori + '" value="' + data[i].RKategori + '/' + data[i].RDosya + '">' + data[i].RIsim + ' (' + data[i].RKategori + ')</option>';

                    trArray = new Array('RIsim', 'RKategori');
                    trInside = GetHtmlTr(funData.Data[i], trArray);
                    bHtml += '<tr>' + trInside + '</tr>';
                }
                funData.BHtml = bHtml;
                funData.Num = length;

                if (length < cacheLimit) {
                    funData.Data = JSON.stringify(funData.Data);
                    var theCacheData = {
                        Resimler: funData,
                    }
                    setTimeout(Cache('GetResimlerData', url, theCacheData), 1);
                    funData.Data = JSON.parse(funData.Data);
                }
            }

        },
        error: function() {
            iziError();
        }
    });
    return funData;
}

function GetCinsiyetlerData() {
    var controller = baseurl + 'Genel-Cinsiyetler/';
    var getFunction = 'GetCinsiyetler';
    var funData = new Array();

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
                funData = JSON.parse(cache);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Cinsiyetler;
                funData = JSON.parse(cache);
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    funData[i] = GetCurData(data[i]);
                }

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData);
                    funData = myJSON;
                    var theCacheData = {
                        Cinsiyetler: funData,
                    }
                    setTimeout(Cache('GetCinsiyetlerData', url, theCacheData), 1);
                    funData = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return cinsiyetlerD;
}

function GetAylarData() {
    var controller = baseurl + 'Genel-Aylar/';
    var getFunction = 'GetAylar';
    var funData = new Array();

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
                funData = JSON.parse(cache);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Aylar;
                funData = JSON.parse(cache);
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    funData[i] = GetCurData(data[i]);
                }

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData);
                    funData = myJSON;
                    var theCacheData = {
                        Aylar: funData,
                    }
                    setTimeout(Cache('GetAylarData', url, theCacheData), 1);
                    funData = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetKategorilerData() {

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


    var controller = baseurl + 'Portal/Admin/Genel-Kategoriler/';
    var getFunction = 'GetKategoriler';
    var funData = {
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
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Kategoriler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
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

                    funData.Data[i] = curData;
                }

                funData.BHtml = bHtml;
                funData.Num = length;

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData.Data);
                    funData.Data = myJSON;
                    var theCacheData = {
                        Kategoriler: funData,
                    }
                    setTimeout(Cache('GetKategorilerData', url, theCacheData), 1);
                    funData.Data = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetSettingsData() {
    var funData = new Array();

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
                funData = JSON.parse(cache);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Settings;
                funData = JSON.parse(cache);
            } else {
                var i, length;
                var data = result.data;
                for (i = 0, length = data.length; i < length; i++) {
                    funData[i] = data[i];
                }

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData);
                    funData = myJSON;
                    var theCacheData = {
                        Settings: funData,
                    }
                    setTimeout(Cache('GetSettingsData', url, theCacheData), 1);
                    funData = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetBolumlerData() {
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

    var funData = {
        Data: new Array(),
        BHtml: '',
        Num: 0,
    };

    var url = baseurl + 'Portal/Admin/Genel-Bolumler/GetBolumler';
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
                var cache = result.cachedataEN.Bolumler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Bolumler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else {
                var bHtml = '',
                    data = result.data,
                    length = data.length;
                var i, tempData, trInside, trArray;

                for (i = 0; i < length; i++) {
                    tempData = GetCurData(data[i]);

                    trArray = new Array('Kod');
                    trInside = GetHtmlTr(tempData, trArray);
                    bHtml += '<tr>' + trInside + '</tr>';

                    funData.Data[i] = tempData;
                }

                funData.BHtml = bHtml;
                funData.Num = length;

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData.Data);
                    funData.Data = myJSON;
                    var theCacheData = {
                        Bolumler: funData,
                    }
                    setTimeout(Cache('GetBolumlerData', url, theCacheData), 1);
                    funData.Data = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
}

function GetPdflerData() {
    function GetHtmlTr(data, trArray) {
        var i;
        var newHtml = '';
        var length = trArray.length;
        var no = data.No;
        var dosya = data.Dosya;

        for (i = 0; i < length; i++) {
            newHtml += '<td class="shorten_content">' + data[trArray[i]] + '</td>';

        }
        newHtml +=
            '<td>' +
            '<a href="javascript:;" class="btn btn-info btn-block hvr-round-corners ' + tableOpts.ButtonEdit + '" data="' + no + '" data2="' + dosya + '"><i class="' + tableOpts.IconEdit + '" aria-hidden="true"></i></a> ' +
            '</td>' +
            '<td>' +
            '<a href="javascript:;" class="btn btn-danger btn-block hvr-round-corners ' + tableOpts.ButtonDelete + '" data="' + no + '" data2="' + dosya + '"><i class="' + tableOpts.IconDelete + '" aria-hidden="true"></i></a>' +
            '</td>';

        return newHtml;
    }

    var funData = {
        Data: new Array(),
        Html: '',
        Num: 0,
    };

    var url = baseurl + 'Portal/Admin/Genel-Pdfler/GetPdfler';
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
                var cache = result.cachedataEN.Pdfler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else if (!en && result.cachedataTR != "") {
                var cache = result.cachedataTR.Pdfler;
                funData = cache;
                funData.Data = JSON.parse(cache.Data);
            } else {
                var i, data = result.data,
                    length, html = '';
                var tCurData, trInside, trArray;

                for (i = 0, length = data.length; i < length; i++) {
                    tCurData = GetCurData(data[i]);
                    funData.Data[i] = tCurData;

                    trArray = new Array('Isim', 'IGIsim');
                    trInside = GetHtmlTr(tCurData, trArray);
                    html += '<tr>' + trInside + '</tr>';
                }
                funData.Html = html;
                funData.Num = length;

                if (length < cacheLimit) {
                    var myJSON = JSON.stringify(funData.Data);
                    funData.Data = myJSON;
                    var theCacheData = {
                        Pdfler: funData,
                    }
                    setTimeout(Cache('GetPdflerData', url, theCacheData), 1);
                    funData.Data = JSON.parse(myJSON);
                }
            }
        },
        error: function() {
            iziError();
        }
    });

    return funData;
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
            if (isLocalhost) {
                console.log('cache success on:' + who)
            }
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
    ResetFormErrors();
}



/*
------------ Make Rows -----------
*/
function MakeRows(data, insideHtml = '', bo4 = "", bo3 = "", bo2 = "") {
    var oneLeft = 'F',
        its13 = false,
        its10 = false,
        break_on = 4,
        counter = 0,
        length = data.length,
        html = '';
    var i, curData, curIHtml;

    if (bo4 == "") {
        bo4 = '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-3 text-center marginTop15 wow ' + AnimationText + '" data-wow-delay="' + wowDelay + '">';
    }
    if (bo3 == "") {
        bo3 = '<div class="col-xs-12 col-sm-12 col-md-4 col-lg-4 text-center marginTop15 wow ' + AnimationText + '" data-wow-delay="' + wowDelay + '">';
    }
    if (bo2 == "") {
        bo2 = '<div class="col-xs-12 col-sm-6 col-md-6 col-lg-6 text-center marginTop15 wow ' + AnimationText + '" data-wow-delay="' + wowDelay + '">';
    }

    if (length == 13) {
        break_on = 3;
        its13 = true;
    } else if (length == 10) {
        break_on = 4;
        its10 = true;
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
        curIHtml = insideHtml
        curIHtml = curIHtml.replace(/curData\[(.+?)\]/g, function(a, b) {
            return curData[b];
        });

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
            html += bo4;
        } else if (break_on == 3) {
            html += bo3;
        } else if (break_on == 2) {
            html += bo2;
        }

        html += curIHtml;

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
        } else if (break_on == 4 && counter == length - 2 && its10 == true) {
            break_on = 2;
        } else if (break_on == 3 && oneLeft == 'T4' && counter == length - 2) {
            break_on = 2;
        } else if (break_on == 3 && its13 == true && counter == length - 4) {
            break_on = 2;
        }
    }
    if (counter % break_on != 0) {
        html += '</div>';
    }
    return html;
}



/*
------------ ShortenContent -----------
*/
$(function() {

    window.ShortenContent = function(length = 50, justShorten = false, isUndo = false) {
        $('.shorten_content').each(function(event) {

            if ($(this).html().length > length) {

                if (isUndo && $(this).find('.less_text').length > 0) {
                    var less_text = $(this).find('.less_text').html();
                    var more_text = $(this).find('.more_text').html();
                    $(this).html(less_text + more_text)
                }

                var short_content = $(this).html().substr(0, length);
                var long_content = $(this).html().substr(length);

                if (justShorten) {
                    $(this).html(
                        '<span class="less_text">' + short_content + '...</span>' +
                        '<span class="more_text" style="display:none;">' + long_content + '</span>'
                    );
                } else {
                    $(this).html(
                        '<span class="less_text">' + short_content + '</span>' +
                        '<a href="javascript:;" class="btn btn-danger btn-sm read_more">' + formLang.ReadMore + '</a>' +
                        '<span class="more_text" style="display:none;">' + long_content + '</span>' +
                        '<a href="javascript:;" class="btn btn-danger btn-sm read_less" style="display:none">' + formLang.ReadLess + '</a>');

                    $(this).find('a.read_less').click(function(event) {
                        event.preventDefault();
                        $(this).hide();
                        $(this).parent().find('.more_text').hide();
                        $(this).parent().find('a.read_more').show();
                    });

                    $(this).find('a.read_more').click(function(event) {
                        event.preventDefault();
                        $(this).hide();
                        $(this).parent().find('.more_text').show();
                        $(this).parent().find('a.read_less').show();
                    });
                }

            }

        });
    }

    ShortenContent()
});