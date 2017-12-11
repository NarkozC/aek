var UG;
$(document).ready(function() {

    /*
    =====================================
      ------------- Wow.css -----------
    =====================================
    */
    wow = new WOW({
        offset: 50,
    });
    wow.init();





    /*
    =====================================
      ------------- Login -------------
    =====================================
    */
    CheckLogin();
});



if (language == 'en') {
    $('html').attr('lang', 'en');
}

function CheckLogin() {
    var url = baseurl + 'Portal/Check';

    $.ajax({
        type: 'ajax',
        method: 'post',
        url: url,
        async: false,
        dataType: 'json',
        success: function(data) {
            var html = '';
            var Link = '';
            var LogoutL = '';
            var portals = new Array();
            if (data.success) {
                if (en) {
                    Link = baseurl + 'en/Portal/';
                    LogoutL = baseurl + 'en/Portal/Logout';
                } else {
                    Link = baseurl + 'Portal/';
                    LogoutL = baseurl + 'Portal/Logout';
                }

                for (var i = 0; i < 8; i++) {
                    portals[i] = '';
                }

                if (data.Ogrenci) {
                    if (kg != "Ogrenci") {
                        portals[0] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="' + Link + 'Ogrenci/">Öğrenci Portalı</a></li>'
                    }
                }
                if (data.Ogretmen) {
                    if (kg != "Ogretmen") {
                        portals[1] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="' + Link + 'Ogretmen/">Öğretmen Portalı</a></li>'
                    }
                }
                if (data.Rehberlik) {
                    if (kg != "Rehberlik") {
                        portals[2] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="' + Link + 'Rehberlik/">Rehberlik Portalı</a></li>'
                    }
                }
                if (data.Teknik) {
                    if (kg != "Teknik") {
                        portals[3] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="' + Link + 'Teknik/">Teknik Portalı</a></li>'
                    }
                }
                if (data.Yonetici) {
                    if (kg != "Yonetici") {
                        portals[4] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="' + Link + 'Yonetici/">Yönetici Portalı</a></li>'
                    }
                }
                if (data.Admin) {
                    if (kg != "Admin") {
                        portals[5] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="' + Link + 'Admin/">Admin Portalı</a></li>'
                    }
                }
                if (portal) {
                    if (en) {
                        portals[6] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="' + baseurl + 'en/">Go Back To Home</a></li>';
                    } else {
                        portals[6] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="' + baseurl + '">Anasayfaya Dön</a></li>';
                    }
                }
                //portals[7] = '<li data-toggle="collapse" data-target="#AekNavbar"><a class="ajax" href="'+Link+'Hesap/">Hesap</a></li>';






                html += '<li class="dropdown">' +
                    '<a href="' + baseurl + '" class="dropdown-toggle" data-toggle="dropdown"><i class="fa fa-user" aria-hidden="true"></i><span class="caret"></span></a>' +
                    '<ul class="dropdown-menu" role="menu">';

                for (var i = 0; i < portals.length; i++) {
                    html += portals[i];
                }

                html += '<li>' +
                    '<form action="' + LogoutL + '" role="form" method="post" class="padding0 margin0"> <!-- Logout FORM--> ' +
                    '<button type="submit" class="btn btn-sm btn-danger btn-block"><i class="fa fa-lg fa-sign-out" aria-hidden="true"></i></button>' +
                    '</form>' +
                    '</li>' +
                    '</ul>' +
                    '</li>';
            }
            var tempHtml = $('.navbar-rightt').html();
            tempHtml += html;
            $('.navbar-rightt').html(tempHtml);
        },
        error: function() {
            if (en) {
                iziError();
            } else {
                iziError();
            }
        }
    });
}




/*
=====================================
  ----------- Unite Gallery -------
=====================================
*/
$(function() {
    DoubleClickFC()
});
var DoubleClickFC = function() {
    $('.ug-gallery-wrapper').off('dblclick');
    $('.ug-gallery-wrapper').on('dblclick', '.ug-item-wrapper img', function(e) {
        UG.toggleFullscreen();
    });
}






/*
=====================================
  ------------ Izi Toast -----------
=====================================
*/
function iziError() {
    if (en) {
        iziToast.error({
            title: 'Error!',
            message: 'An error has been occurred! Please refresh the page.',
            timeout: 3000,
        });
    } else {
        iziToast.error({
            title: 'Hata!',
            message: 'Bir hata oluştu! Lütfen sayfayı yenileyiniz.',
            timeout: 3000,
        });
    }
}

function iziSuccess() {
    if (en) {
        iziToast.success({
            title: 'Successful!',
            message: 'Your transaction was successful!',
            timeout: 3000,
        });
    } else {
        iziToast.success({
            title: 'Başarılı!',
            message: 'İşleminiz başarıyla gerçekleştirildi!',
            timeout: 3000,
        });
    }

}

iziToast.settings({    
    transitionOut: 'fadeOut'
});







/*
    =====================================
      ----------- LightGallery --------
    =====================================
    */
function CreteLGM() {
    $('.LGMCA').lightGallery({
        selector: '.LGM',
        thumbnail: true,
        mode: 'lg-zoom-in-out'
    });

    $('.LGMCWOS').lightGallery({
        selector: '.LGM',
        thumbnail: true,
        share: false,
        mode: 'lg-zoom-in-out'
    });

    $('.LGMC').lightGallery({
        selector: '.LGM',
        thumbnail: false,
        share: false,
        mode: 'lg-zoom-in-out'
    });
}
$(document).ready(function() {
    CreteLGM();
});





/*
=====================================
  ---------- Ajax Loader ----------
=====================================
*/
// $(document).ready(function(){
//   $(document).bind("ajaxSend", function(){
//     if ($('#ajax-loader-container').css('display') == 'none') {
//       $('#ajax-loader-container').show();
//     }
//   }).bind("ajaxComplete", function(){
//     if ($('#ajax-loader-container').css('display') == 'block') {
//       $('#ajax-loader-container').hide();
//     }
//   });
// });




/*
=====================================
  --------- Modal Animations ------
=====================================
*/
function ModalAnim(x) {
    $('.modal .modal-dialog').attr('class', 'modal-dialog  ' + x + '  animated');
};
$('body').on('show.bs.modal', '.ajax-modal', function(e) {
    var anim = "bounceInRight"
    ModalAnim(anim);
})
$('body').on('hide.bs.modal', '.ajax-modal', function(e) {
    var anim = "bounceOutRight"
    ModalAnim(anim);
})





/*
=====================================
  ------------- Popup ------------
=====================================
*/
var maxHeight;
$(window).on('resize', function() {
    maxHeight = ($(window).height() - 200) + 'px';
    $('#popup-img').css('max-height', maxHeight);
});





/*
=====================================
  ----------- DataTable -----------
=====================================
*/
$(document).ready(function() {

    window.CreateDataTables = function() {
        if (en) {
            $('.datatable').DataTable({
                "language": {
                    "paginate": {
                        "first": '<i class="fa fa-lg fa-angle-double-left" aria-hidden="true"></i>',
                        "last": '<i class="fa fa-lg fa-angle-double-right" aria-hidden="true"></i>',
                        "next": '<i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>',
                        "previous": '<i class="fa fa-lg fa-angle-left" aria-hidden="true"></i>'
                    },
                },
                "aLengthMenu": [
                    [5, 10, 25, -1],
                    [5, 10, 25, "Hepsi"]
                ],
                "iDisplayLength": 5,
                ordering: false,
            });

            $('.datatableA').DataTable({
                "language": {
                    "paginate": {
                        "first": '<i class="fa fa-lg fa-angle-double-left" aria-hidden="true"></i>',
                        "last": '<i class="fa fa-lg fa-angle-double-right" aria-hidden="true"></i>',
                        "next": '<i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>',
                        "previous": '<i class="fa fa-lg fa-angle-left" aria-hidden="true"></i>'
                    },
                },
                "aLengthMenu": [
                    [5, 10, 25, -1],
                    [5, 10, 25, "Hepsi"]
                ],
                "iDisplayLength": 5,
                "ordering": false,
            });
        } else {
            $('.datatable').DataTable({
                "language": {
                    "emptyTable": "Tabloda kayıt bulunamadı",
                    "info": "Gösterilen kayıtlar: _START_ / _END_",
                    "infoEmpty": "Hiçbir kayıt bulunamadı",
                    "infoFiltered": "(Toplam _MAX_ kayıt arasından filtrelendi)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Sayfa başına _MENU_ kayıt göster",
                    "loadingRecords": "Yükleniyor...",
                    "processing": "İşleniyor...",
                    "search": "Ara:",
                    "zeroRecords": "Hiçbir şey bulunamadı - üzgünüm",
                    "paginate": {
                        "first": '<i class="fa fa-lg fa-angle-double-left" aria-hidden="true"></i>',
                        "last": '<i class="fa fa-lg fa-angle-double-right" aria-hidden="true"></i>',
                        "next": '<i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>',
                        "previous": '<i class="fa fa-lg fa-angle-left" aria-hidden="true"></i>'
                    },
                },
                "aLengthMenu": [
                    [5, 10, 25, -1],
                    [5, 10, 25, "Hepsi"]
                ],
                "iDisplayLength": 5,
                ordering: false,
            });

            $('.datatableA').DataTable({
                "language": {
                    "emptyTable": "Tabloda kayıt bulunamadı",
                    "info": "Gösterilen kayıtlar: _START_ / _END_",
                    "infoEmpty": "Hiçbir kayıt bulunamadı",
                    "infoFiltered": "(Toplam _MAX_ kayıt arasından filtrelendi)",
                    "infoPostFix": "",
                    "thousands": ",",
                    "lengthMenu": "Sayfa başına _MENU_ kayıt göster",
                    "loadingRecords": "Yükleniyor...",
                    "processing": "İşleniyor...",
                    "search": "Ara:",
                    "zeroRecords": "Hiçbir şey bulunamadı - üzgünüm",
                    "paginate": {
                        "first": '<i class="fa fa-lg fa-angle-double-left" aria-hidden="true"></i>',
                        "last": '<i class="fa fa-lg fa-angle-double-right" aria-hidden="true"></i>',
                        "next": '<i class="fa fa-lg fa-angle-right" aria-hidden="true"></i>',
                        "previous": '<i class="fa fa-lg fa-angle-left" aria-hidden="true"></i>'
                    },
                },
                "aLengthMenu": [
                    [5, 10, 25, -1],
                    [5, 10, 25, "Hepsi"]
                ],
                "iDisplayLength": 5,
                "ordering": false,
            });
        }



    }

    CreateDataTables();

});





/*
=====================================
  --------- Scroll From URL -------
=====================================
*/
if (window.location.hash) scroll(0, 0);
setTimeout(function() {
    scroll(0, 0);
}, 1);

$(function() {
    setTimeout(function() {
        if (window.location.hash) {
            $('html, body').animate({
                scrollTop: $(window.location.hash).offset().top - 125
            }, 800, 'swing');
        }
    }, 700);
});





/*
=====================================
  ---------- Smooth Scroll --------
=====================================
*/
$(function() {
    $('a').smoothScroll({
        exclude: ['.dropdown-toggle', '.carousel-control', 'a[data-slide="prev"],a[data-slide="next"]', 'a[role="tab"]', '#dek-side-navbar-button', 'a[data-toggle="tab"]'],
        speed: 600,
        offset: -125
    });

    $('.windowDown').on('click', function() {
        $.smoothScroll('+=' + $(window).height());
    });
});






/*
=====================================
  -------- Bootstrap Carousel -----
=====================================
*/
$(document).ready(function() {
    $('#yorumlar-carousel').carousel({
        interval: 6000
    });
});





/*
=====================================
  ------------ Navbar -------------
=====================================
*/
$(window).bind("load", Navbar);
$(window).bind("resize", Navbar);
$(window).bind("orientationchange", Navbar);
$(window).scroll(Navbar);

$(document).ready(function() {
    Navbar();
});

function Navbar() {
    var isMobile = window.matchMedia("only screen and (max-width: 766px)");
    var isTablet = window.matchMedia("only screen and (max-width: 992px)");

    if (isMobile.matches || isTablet.matches) {
        $('.navbar.navbar-custom-dek').css("background", "#f4f4f4");
        $('.navbar.navbar-custom-dek').css("border-color", "#dfdfdf");
        $('.navbar.navbar-custom-dek').css("border-color", "#dfdfdf");
        $('.navbar.navbar-custom-dek .navbar-collapse').css("border-color", "#dfdfdf");
        $('.navbar.navbar-custom-dek .navbar-collapse').css("background-color", "#f4f4f4");
        $('.navbar.navbar-custom-dek .navbar-nav> li > a').css("background-color", "#f4f4f4");
        $('.showAfterScroll').show();
        $('#nav-banner').hide();
        $('.navbar-custom-dek').css("height", '60');
        $('.navbar-custom-dek .navbar-brand').css("padding", '0px');
        $('.navbar-custom-dek .navbar-brand').css("padding-left", '5px');
        $('.navbar-custom-dek .navbar-brand').css("height", '55px');
        $('.navbar-custom-dek .navbar-brand img').css("height", '55px');
    } else {
        if ($(this).scrollTop() > 35 || portal == true) {
            $('.navbar.navbar-custom-dek').css("background", "#f4f4f4");
            $('.navbar.navbar-custom-dek').css("border-color", "#dfdfdf");
            $('.navbar.navbar-custom-dek').css("border-color", "#dfdfdf");
            $('.navbar.navbar-custom-dek .navbar-collapse').css("border-color", "#dfdfdf");
            $('.navbar.navbar-custom-dek .navbar-collapse').css("background-color", "#f4f4f4");
            $('.navbar.navbar-custom-dek .navbar-nav> li > a').css("background-color", "#f4f4f4");
            $('.navbar.navbar-custom-dek .navbar-nav > li[class*="dropdown"].dropdown-onhover:hover > a').css("background-color", "dfdfdf");
            $('.navbar.navbar-custom-dek.dropdown-onhover .navbar-nav > li:hover > a[class*="dropdown"]').css("background-color", "dfdfdf");
            $('.navbar.navbar-custom-dek .navbar-nav>li[class*="dropdown"].dropdown-onhover:hover').css("background-color", "dfdfdf");
            $('.navbar.navbar-custom-dek.dropdown-onhover .navbar-nav>li[class*="dropdown"]:hover').css("background-color", "dfdfdf");
            $('.showAfterScroll').show();
            $('#nav-banner').hide();
            $('.navbar-custom-dek').css("height", '60');
            $('.navbar-custom-dek .navbar-brand').css("padding", '0px');
            $('.navbar-custom-dek .navbar-brand').css("height", '55px');
            $('.navbar-custom-dek .navbar-brand img').css("height", '55px');
        } else {
            $('.navbar.navbar-custom-dek').css('background', 'transparent');
            $('.navbar.navbar-custom-dek').css("border-color", "transparent");
            $('.navbar.navbar-custom-dek').css("border-color", "transparent");
            $('.navbar.navbar-custom-dek .navbar-collapse').css("border-color", "transparent");
            $('.navbar.navbar-custom-dek .navbar-collapse').css("background-color", "transparent");
            $('.navbar.navbar-custom-dek .navbar-nav> li > a').css("background-color", "transparent");
            $('.navbar.navbar-custom-dek .navbar-nav > li[class*="dropdown"].dropdown-onhover:hover > a').css("background-color", "transparent");
            $('.navbar.navbar-custom-dek.dropdown-onhover .navbar-nav > li:hover > a[class*="dropdown"]').css("background-color", "transparent");
            $('.navbar.navbar-custom-dek .navbar-nav>li[class*="dropdown"].dropdown-onhover:hover').css("background-color", "transparent");
            $('.navbar.navbar-custom-dek.dropdown-onhover .navbar-nav>li[class*="dropdown"]:hover').css("background-color", "transparent");
            $('.showAfterScroll').hide();
            $('#nav-banner').show();
            $('.navbar-custom-dek').css("height", '100');
            $('.navbar-custom-dek .navbar-brand').css("padding", '5px');
            $('.navbar-custom-dek .navbar-brand').css("padding-left", '20px');
            $('.navbar-custom-dek .navbar-brand').css("height", '110px');
            $('.navbar-custom-dek .navbar-brand img').css("height", '100px');
        }
    }
}

$(document).ready(function() {
    $(document).on('click touchstart', '.navbar .dropdown-menu', function(e) {
        e.stopPropagation();
    })
});





/*
=====================================
  ---------- Unite Gallery --------
=====================================
*/
jQuery(document).ready(function() {
    setTimeout(function() {
        if ($('#BannerA').length != 0) {
            UG = jQuery("#BannerA").unitegallery({
                gallery_theme: "slider",
                slider_control_zoom: false,
            });
            // var container = $('#BannerA').parents('div.container:first');
            // var margin = $(container).css('margin-left')
            // margin = margin.split('px');
            // margin = Number(margin[0]) / 2;

            // $(container).css('margin-left', margin);
            // $(container).css('margin-right', margin);
            // setTimeout(function() {
            //     bannerWidth = $('#BannerA').parents('div.container:first').width();
            //     console.log(bannerWidth);
            //     UG.resize(bannerWidth)
            // }, 10);
            bannerWidth = $('#BannerA').parents('div.container:first').width();
            UG.resize(bannerWidth)
        }
    }, 100);
    
});