-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Anamakine: 127.0.0.1:3306
-- Üretim Zamanı: 11 Ara 2017, 14:51:19
-- Sunucu sürümü: 5.7.19
-- PHP Sürümü: 7.0.23

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Veritabanı: `aek_db`
--

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_aylar`
--

DROP TABLE IF EXISTS `genel_aylar`;
CREATE TABLE IF NOT EXISTS `genel_aylar` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Kod` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `genel_aylar`
--

INSERT INTO `genel_aylar` (`No`, `tr_Ad`, `en_Ad`, `Kod`, `ListOrder`) VALUES
(1, 'Ocak', 'January', '01', 1),
(2, 'Şubat', 'February', '02', 2),
(3, 'Mart', 'March', '03', 3),
(4, 'Nisan', 'April', '04', 4),
(5, 'Mayıs', 'May', '05', 5),
(6, 'Haziran', 'June', '06', 6),
(7, 'Temmuz', 'July', '07', 7),
(8, 'Ağustos', 'August', '08', 8),
(9, 'Eylül', 'September', '09', 9),
(10, 'Ekim', 'October', '10', 10),
(11, 'Kasım', 'November', '11', 11),
(12, 'Aralık', 'December', '12', 12);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_basliklar`
--

DROP TABLE IF EXISTS `genel_basliklar`;
CREATE TABLE IF NOT EXISTS `genel_basliklar` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `DataKey` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`),
  UNIQUE KEY `tr_Baslik` (`tr_Baslik`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `genel_basliklar`
--

INSERT INTO `genel_basliklar` (`No`, `tr_Baslik`, `en_Baslik`, `DataKey`) VALUES
(5, 'Hakkımızda', 'About Us', 'GH'),
(12, 'İletişim', '', 'GF'),
(15, 'Anasayfa', 'Home', 'A'),
(16, 'Eğitim Sistemimiz', '', 'GES'),
(17, 'Yönetim Kurulu', 'Administrative Staff', 'GYK'),
(18, 'Kurucu Mesajı', 'Founder’s Message', 'GKM');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_cinsiyetler`
--

DROP TABLE IF EXISTS `genel_cinsiyetler`;
CREATE TABLE IF NOT EXISTS `genel_cinsiyetler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Kod` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `genel_cinsiyetler`
--

INSERT INTO `genel_cinsiyetler` (`No`, `tr_Ad`, `en_Ad`, `Kod`) VALUES
(1, 'Erkek', 'Male', 'E'),
(2, 'Kadın', 'Female', 'K');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_dersler`
--

DROP TABLE IF EXISTS `genel_dersler`;
CREATE TABLE IF NOT EXISTS `genel_dersler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Kod` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `genel_dersler`
--

INSERT INTO `genel_dersler` (`No`, `tr_Ad`, `en_Ad`, `Kod`) VALUES
(1, 'Biyoloji', 'Biology', 'biyoloji'),
(2, 'Coğrafya', 'Geography', 'cografya'),
(3, 'Deneme', 'Assay', 'deneme'),
(4, 'Din Kültürü', 'Religion Culture', 'din-kulturu'),
(5, 'Din Kültürü Ve Ahlak Bilgisi', 'Religion Culture And Ethics', 'din-kulturu-ve-ahlak-bilgisi'),
(6, 'Fen Bilimleri', 'Science', 'fen-bilimleri'),
(7, 'Geometri', 'Geometry', 'geometri'),
(9, 'İngilizce', 'English', 'ingilizce'),
(10, 'İngilizce Uygulama', 'Practice In English', 'ingilizce-uygulama'),
(11, 'İnsan Hakları, Yurttaşlık Ve Demokrasi', 'Human Rights, Citizenship And Democracy', 'insan-haklari-yurttaslik-ve-demokrasi'),
(12, 'İspanyolca', 'Spanish', 'ispanyolca'),
(13, 'Kimya', 'Chemistry', 'kimya'),
(14, 'Matematik', 'Mathematics', 'matematik'),
(15, 'Matematik Uygulama', 'Mathematics Application', 'matematik-uygulama'),
(16, 'Sosyal Bilgiler', 'Social Studies', 'sosyal-bilgiler'),
(17, 'Tarih', 'History', 'tarih'),
(18, 'Trafik Güvenliği', 'Traffic Safety', 'trafik-guvenligi'),
(19, 'Türk Dili Ve Edebiyatı', 'Turkish Language And Literature', 'turk-dili-ve-edebiyati'),
(20, 'Türkçe', 'Turkish', 'turkce'),
(21, 'İnkılap Tarihi Ve Atatürkçülük', 'History of Revolution And Ataturkism', 'inkilap-tarihi-ve-ataturkculuk'),
(22, 'Fizik', 'Physical Science', 'fizik');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_gunler`
--

DROP TABLE IF EXISTS `genel_gunler`;
CREATE TABLE IF NOT EXISTS `genel_gunler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `ShowID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Kod` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `genel_gunler`
--

INSERT INTO `genel_gunler` (`No`, `tr_Ad`, `en_Ad`, `ShowID`, `Kod`) VALUES
(5, 'Pazartesi', 'Monday', 'pazartesi', 0),
(6, 'Salı', 'Tuesday', 'sali', 1),
(7, 'Çarşamba', 'Wednesday', 'carsamba', 2),
(8, 'Perşembe', 'Thursday', 'persembe', 3),
(9, 'Cuma', 'Friday', 'cuma', 4),
(10, 'Cumartesi', 'Saturday', 'cumartesi', 5),
(11, 'Pazar', 'Sunday', 'pazar', 6);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_okullar`
--

DROP TABLE IF EXISTS `genel_okullar`;
CREATE TABLE IF NOT EXISTS `genel_okullar` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `KapsadigiSiniflar` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `ShowID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Kod` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `genel_okullar`
--

INSERT INTO `genel_okullar` (`No`, `tr_Ad`, `en_Ad`, `KapsadigiSiniflar`, `ShowID`, `Kod`) VALUES
(1, 'Anaokulu', 'Kindergarten', '3Y,4Y,5Y,6Y', 'anaokulu', 0),
(2, 'İlkokul', 'Primary School', '1,2,3,4', 'ilkokul', 1),
(3, 'Ortaokul', 'Secondary School', '5,6,7,8', 'ortaokul', 2),
(4, 'Anadolu Lisesi', 'Anatolian High School', '9,10,11,12', 'anadoluLisesi', 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_resimler`
--

DROP TABLE IF EXISTS `genel_resimler`;
CREATE TABLE IF NOT EXISTS `genel_resimler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `RIsim` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `RKategoriler` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT 'Genel',
  `RDosya` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `RTarih` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=839 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `genel_resimler`
--

INSERT INTO `genel_resimler` (`No`, `RIsim`, `RKategoriler`, `RDosya`, `RTarih`) VALUES
(1, 'Duyuru1', 'Duyurular', 'Duyuru1.jpg', '2017-01-10'),
(2, 'Duyuru2', 'Duyurular', 'duyuru2.jpg', '2017-01-10'),
(3, 'Duyuru3', 'Duyurular', 'duyuru3.jpg', '2017-01-10'),
(5, '1A_OKUMA_BAYRAMI_haber _01', 'Haberler', '1A-OKUMA-BAYRAMI-haber-01.jpg', '03.10.17 23:27:31'),
(6, '20171004_Haberler_ilkokulaçılışı', 'Haberler', '20171004-Haberler-ilkokulacilisi.jpg', '04.10.17 14:02:44'),
(7, '20171004_Haberler_ilkokulaçılışı', 'Haberler', '20171004-Haberler-ilkokulacilisi1.jpg', '04.10.17 14:02:47'),
(8, '20170118_H_İNGİLİZCE_BİNGO', 'Haberler', '20170118-H-INGILIZCE-BINGO.jpg', '04.10.17 17:26:06'),
(9, '20170105_H_İNG.HABER_VE_MEVSİMLER', 'Haberler', '20170105-H-ING-HABER-VE-MEVSIMLER.jpg', '04.10.17 18:13:02'),
(10, '20170118_H_İNGİLİZCE_DOMİNO', 'Haberler', '20170118-H-INGILIZCE-DOMINO.jpg', '04.10.17 18:22:54'),
(11, '20170206_H_NOKTALAMA_İŞARETLERİ', 'Haberler', '20170206-H-NOKTALAMA-ISARETLERI.jpg', '04.10.17 18:29:49'),
(12, '20170306_H_DEĞERLER EĞİTİMİ', 'Haberler', '20170306-H-DEGERLER-EGITIMI.jpg', '04.10.17 18:31:27'),
(13, '20170306_H_DEĞERLER_EĞİTİMİ_ÖZDENETİM', 'Haberler', '20170306-H-DEGERLER-EGITIMI-OZDENETIM.jpg', '04.10.17 19:11:09'),
(14, '20170106_H_SATRANÇ', 'Haberler', '20170106-H-SATRANC.jpg', '04.10.17 19:14:11'),
(15, '20170106_H_SATRANÇ', 'Haberler', '20170106-H-SATRANC1.jpg', '04.10.17 19:14:25'),
(16, '20170106_H_SATRANÇ', 'Haberler', '20170106-H-SATRANC2.jpg', '04.10.17 19:15:59'),
(17, '20170308_H_TÜRKÇE_ZAMİRLER', 'Haberler', '20170308-H-TURKCE-ZAMIRLER.jpg', '04.10.17 19:17:45'),
(18, '20170215_H_TÜRKÇE', 'Haberler', '20170215-H-TURKCE.jpg', '04.10.17 19:21:03'),
(19, '20170525_H_OKUMA_BAYRAMI', 'Haberler', '20170525-H-OKUMA-BAYRAMI.jpg', '04.10.17 19:27:20'),
(20, '20170525_H_OKUMA_BAYRAMI', 'Haberler', '20170525-H-OKUMA-BAYRAMI1.jpg', '04.10.17 19:27:59'),
(21, '20170525_H_OKUMA_BAYRAMI', 'Haberler', '20170525-H-OKUMA-BAYRAMI2.jpg', '04.10.17 19:28:06'),
(22, '20170911_H_MEMORIAD', 'Haberler', '20170911-H-MEMORIAD.JPG', '05.10.17 10:05:58'),
(23, '20170919_H_ORYANTASYON', 'Haberler', '20170919-H-ORYANTASYON.jpg', '05.10.17 10:11:43'),
(24, '20170919_H_ORYANTASYON', 'Haberler', '20170919-H-ORYANTASYON1.jpg', '05.10.17 10:11:59'),
(25, '20170920_H_OKULDA İLK GÜN', 'Haberler', '20170920-H-OKULDA-ILK-GUN.jpg', '05.10.17 10:27:10'),
(26, '20171004_H_ANAOKUL_TİYATRO_1', 'Haberler', '20171004-H-ANAOKUL-TIYATRO-1.jpg', '05.10.17 15:36:38'),
(27, '20171004_H_15_TEMMUZ_ANMA', 'Haberler', '20171004-H-15-TEMMUZ-ANMA.jpg', '05.10.17 15:39:12'),
(28, '20170925_H_ÖÖP', 'Haberler', '20170925-H-OOP.JPG', '05.10.17 16:34:38'),
(29, '2017_H_SEREBRAL_PALSİ', 'Haberler', '2017-H-SEREBRAL-PALSI.jpg', '06.10.17 13:34:53'),
(30, 'Örnek 270x190', 'Genel', 'Ornek-270x190.png', '06.10.17 20:36:32'),
(31, 'Ataturk Kosesi 1', 'Genel', 'Ataturk-Kosesi-1.jpg', '07.10.17 11:43:20'),
(32, 'Ataturk Kosesi 2', 'Genel', 'Ataturk-Kosesi-2.jpg', '07.10.17 12:11:23'),
(33, 'Ataturk Kosesi 3', 'Genel', 'Ataturk-Kosesi-3.jpg', '07.10.17 12:11:37'),
(34, 'Arzu Ayhan', 'Kadro', 'Arzu-Ayhan.png', '07.10.17 12:24:11'),
(35, 'Asena Mine Atakul', 'Kadro', 'Asena-Mine-Atakul.png', '07.10.17 12:24:34'),
(36, 'Aykut Metin', 'Kadro', 'Aykut-Metin.png', '07.10.17 12:24:48'),
(38, 'Ayten Ozdemir', 'Kadro', 'Ayten-Ozdemir.png', '07.10.17 12:25:46'),
(39, 'Aytul Pala', 'Kadro', 'Aytul-Pala.png', '07.10.17 12:26:04'),
(40, 'Azak Ak', 'Kadro', 'Azak-Ak.png', '07.10.17 12:26:20'),
(41, 'Berrak Kantarcı', 'Kadro', 'Berrak-Kantarci.png', '07.10.17 12:27:14'),
(42, 'Birsen Kandir', 'Kadro', 'Birsen-Kandir.png', '07.10.17 12:27:31'),
(43, 'Derya Ates', 'Kadro', 'Derya-Ates.png', '07.10.17 12:30:26'),
(44, 'Dilara Topukcu', 'Kadro', 'Dilara-Topukcu.png', '07.10.17 12:32:58'),
(45, 'Duygu Cakan', 'Kadro', 'Duygu-Cakan.png', '07.10.17 12:33:13'),
(46, 'Ebru_Sayin', 'Kadro', 'Ebru-Sayin.png', '07.10.17 12:33:36'),
(47, 'Gulcin Diktas', 'Kadro', 'Gulcin-Diktas.png', '07.10.17 12:34:59'),
(48, 'Gulizar Ates', 'Kadro', 'Gulizar-Ates.png', '07.10.17 12:35:17'),
(49, 'Halime Özenç', 'Kadro', 'Halime-Ozenc.png', '07.10.17 12:35:43'),
(50, 'Hamdiye Askan', 'Kadro', 'Hamdiye-Askan.png', '07.10.17 12:36:07'),
(51, 'Hayrettin_Demir', 'Kadro', 'Hayrettin-Demir.png', '07.10.17 12:36:20'),
(52, 'Hüseyin Yılmaz', 'Kadro', 'Huseyin-Yilmaz.png', '07.10.17 12:36:43'),
(53, 'Ilkay Ozan', 'Kadro', 'Ilkay-Ozan.png', '07.10.17 12:37:05'),
(54, 'Serpil Koza', 'Kadro', 'Serpil-Koza.png', '07.10.17 12:37:29'),
(55, 'Kemal Çopur', 'Kadro', 'Kemal-Copur.png', '07.10.17 12:37:52'),
(56, 'Leman Zerrin Özdemir', 'Kadro', 'Leman-Zerrin-Ozdemir.png', '07.10.17 12:38:22'),
(57, 'Mehmet Ali Açıl', 'Kadro', 'Mehmet-Ali-Acil.png', '07.10.17 12:38:45'),
(58, 'Meryem Gökşen', 'Kadro', 'Meryem-Goksen.png', '07.10.17 12:39:09'),
(59, 'Murat Meriç', 'Kadro', 'Murat-Meric.png', '07.10.17 12:39:30'),
(60, 'Nebahat Özkan', 'Kadro', 'Nebahat-Ozkan.png', '07.10.17 12:39:54'),
(61, 'Nil Giritli', 'Kadro', 'Nil-Giritli.png', '07.10.17 12:40:12'),
(62, 'Nurten Onat', 'Kadro', 'Nurten-Onat.png', '07.10.17 12:40:30'),
(63, 'Zerrin Akgün', 'Kadro', 'Zerrin-Akgun.png', '07.10.17 12:40:55'),
(64, 'Ozan Bolat', 'Kadro', 'Ozan-Bolat.png', '07.10.17 12:41:09'),
(65, 'Özge Ortakçı', 'Kadro', 'Ozge-Ortakci.png', '07.10.17 12:41:26'),
(66, 'Pelin Akyürek', 'Kadro', 'Pelin-Akyurek.png', '07.10.17 12:41:41'),
(67, 'Pervin İlhan', 'Kadro', 'Pervin-Ilhan.png', '07.10.17 12:41:56'),
(68, 'Saadet Kahramanoğlu', 'Kadro', 'Saadet-Kahramanoglu.png', '07.10.17 12:42:27'),
(69, 'Seda Şık', 'Kadro', 'Seda-Sik.png', '07.10.17 12:42:47'),
(70, 'Selen Çakır', 'Kadro', 'Selen-Cakir.png', '07.10.17 12:43:07'),
(71, 'Sema Bursal', 'Kadro', 'Sema-Bursal.png', '07.10.17 12:43:28'),
(72, 'Semra Kaçmaz', 'Kadro', 'Semra-Kacmaz.png', '07.10.17 12:43:44'),
(73, 'Serpil Gezen', 'Kadro', 'Serpil-Gezen.png', '07.10.17 12:43:59'),
(74, 'Sevgi Ertonga', 'Kadro', 'Sevgi-Ertonga.png', '07.10.17 12:44:17'),
(75, 'Şeyma Unnu', 'Kadro', 'Seyma-Unnu.png', '07.10.17 12:44:42'),
(76, 'Ufuk Atak', 'Kadro', 'Ufuk-Atak.png', '07.10.17 12:46:08'),
(77, 'Ülkü Altıntaş Hayta', 'Kadro', 'Ulku-Altintas-Hayta.png', '07.10.17 12:46:32'),
(78, 'Yeliz Söylemez', 'Kadro', 'Yeliz-Soylemez.png', '07.10.17 12:46:53'),
(79, 'Zekiye Yılmaz', 'Kadro', 'Zekiye-Yilmaz.png', '07.10.17 12:47:09'),
(80, 'Zübeyde Aktaş', 'Kadro', 'Zubeyde-Aktas.png', '07.10.17 12:47:27'),
(81, '20171006_H_DEYİMLER_ATASÖZLERİ', 'Haberler', '20171006-H-DEYIMLER-ATASOZLERI.jpg', '07.10.17 14:47:32'),
(82, 'International Premier College 1', 'Genel', 'International-Premier-College-1.jpg', '07.10.17 16:49:42'),
(83, 'International Premier College 2', 'Genel', 'International-Premier-College-2.jpg', '07.10.17 16:49:52'),
(84, 'IFY 1', 'Genel', 'IFY-1.png', '07.10.17 16:59:39'),
(85, 'IFY 2', 'Genel', 'IFY-2.png', '07.10.17 16:59:49'),
(86, 'IFY 3 TR', 'Genel', 'IFY-3-TR.png', '07.10.17 17:00:10'),
(88, 'IFY 3 EN', 'Genel', 'IFY-3-EN.png', '07.10.17 17:12:10'),
(89, 'AEKTV 1', 'Genel', 'AEKTV-1.png', '07.10.17 17:21:00'),
(90, 'OAB 1', 'Genel', 'OAB-1.png', '07.10.17 17:48:40'),
(91, 'OAB 2', 'Genel', 'OAB-2.png', '07.10.17 17:48:49'),
(92, 'OAB 3', 'Genel', 'OAB-3.png', '07.10.17 17:48:57'),
(93, 'OAB 4', 'Genel', 'OAB-4.png', '07.10.17 17:49:06'),
(94, 'OAB 6', 'Genel', 'OAB-6.png', '07.10.17 17:49:20'),
(95, 'OAB 5', 'Genel', 'OAB-5.png', '07.10.17 17:49:37'),
(96, 'OAB 7', 'Genel', 'OAB-7.png', '07.10.17 17:49:46'),
(97, 'OAB 8', 'Genel', 'OAB-8.png', '07.10.17 17:49:55'),
(98, 'OAB 9', 'Genel', 'OAB-9.png', '07.10.17 17:50:09'),
(99, 'OAB 10', 'Genel', 'OAB-10.png', '07.10.17 17:50:17'),
(100, 'OAB 11', 'Genel', 'OAB-11.png', '07.10.17 17:50:24'),
(101, 'OAB 12', 'Genel', 'OAB-12.png', '07.10.17 18:00:11'),
(102, 'OAB 13', 'Genel', 'OAB-13.png', '07.10.17 18:00:19'),
(103, 'OAB 14', 'Genel', 'OAB-14.png', '07.10.17 18:00:28'),
(104, 'OAB 15', 'Genel', 'OAB-15.png', '07.10.17 18:00:37'),
(105, 'YDE 1', 'Genel', 'YDE-1.png', '07.10.17 18:56:22'),
(106, 'YDE 2', 'Genel', 'YDE-2.png', '07.10.17 18:56:28'),
(107, 'YDE 3', 'Genel', 'YDE-3.png', '07.10.17 18:56:36'),
(108, 'YDE 4', 'Genel', 'YDE-4.png', '07.10.17 18:56:43'),
(109, 'YDE 5', 'Genel', 'YDE-5.png', '07.10.17 18:57:59'),
(110, 'YDE 6', 'Genel', 'YDE-6.png', '07.10.17 18:58:06'),
(111, 'YDE 7', 'Genel', 'YDE-7.png', '07.10.17 18:58:14'),
(112, 'YDE 8', 'Genel', 'YDE-8.png', '07.10.17 18:58:23'),
(113, 'YDE 9', 'Genel', 'YDE-9.png', '07.10.17 18:58:30'),
(114, 'YDE 10', 'Genel', 'YDE-10.png', '07.10.17 18:58:38'),
(115, 'YDE 11', 'Genel', 'YDE-11.png', '07.10.17 18:58:44'),
(116, 'YDE 12', 'Genel', 'YDE-12.png', '07.10.17 18:58:52'),
(117, 'YDE 13', 'Genel', 'YDE-13.png', '07.10.17 18:59:00'),
(118, 'YDE 14', 'Genel', 'YDE-14.png', '07.10.17 18:59:07'),
(119, 'YDE 15', 'Genel', 'YDE-15.png', '07.10.17 18:59:15'),
(120, 'YDE 16', 'Genel', 'YDE-16.png', '07.10.17 18:59:24'),
(121, 'YDE 17', 'Genel', 'YDE-17.png', '07.10.17 18:59:35'),
(122, 'YDE 18', 'Genel', 'YDE-18.png', '07.10.17 18:59:44'),
(125, 'YDE 19', 'Genel', 'YDE-19.png', '07.10.17 19:02:08'),
(126, 'YDE 20', 'Genel', 'YDE-20.png', '07.10.17 19:02:34'),
(127, 'YDE 21', 'Genel', 'YDE-21.png', '07.10.17 19:02:44'),
(128, 'YDE 22', 'Genel', 'YDE-22.png', '07.10.17 19:03:08'),
(129, 'YDE 23', 'Genel', 'YDE-23.png', '07.10.17 19:03:18'),
(130, 'YDE 24', 'Genel', 'YDE-24.png', '07.10.17 19:03:29'),
(131, 'YDE 25', 'Genel', 'YDE-25.png', '07.10.17 19:03:38'),
(132, 'YDE 26', 'Genel', 'YDE-26.png', '07.10.17 19:03:50'),
(133, 'YDE 27', 'Genel', 'YDE-27.png', '07.10.17 19:03:59'),
(134, 'YDE 28', 'Genel', 'YDE-28.png', '07.10.17 19:04:07'),
(135, 'YDE 29', 'Genel', 'YDE-29.png', '07.10.17 19:04:18'),
(136, 'YDE 30', 'Genel', 'YDE-30.png', '07.10.17 19:04:28'),
(137, 'YDE 31', 'Genel', 'YDE-31.png', '07.10.17 19:04:38'),
(138, 'YDE 32', 'Genel', 'YDE-32.png', '07.10.17 19:04:45'),
(139, 'YDE 33', 'Genel', 'YDE-33.png', '07.10.17 19:04:59'),
(140, 'YDE 34', 'Genel', 'YDE-34.png', '07.10.17 19:05:17'),
(141, 'YDE 35', 'Genel', 'YDE-35.png', '07.10.17 19:05:29'),
(142, 'YDE 36', 'Genel', 'YDE-36.png', '07.10.17 19:06:54'),
(143, 'YDE 37', 'Genel', 'YDE-37.png', '07.10.17 19:07:05'),
(145, 'YDE 38', 'Genel', 'YDE-38.png', '07.10.17 19:07:39'),
(146, 'YDE 39', 'Genel', 'YDE-39.png', '07.10.17 19:07:47'),
(147, 'YDE 40', 'Genel', 'YDE-40.png', '07.10.17 19:07:56'),
(148, 'SSK 1', 'Genel', 'SSK-1.png', '07.10.17 19:26:33'),
(149, 'SSK 2', 'Genel', 'SSK-2.png', '07.10.17 19:26:45'),
(151, 'SSK 3', 'Genel', 'SSK-3.png', '07.10.17 19:27:37'),
(152, 'SSK 4', 'Genel', 'SSK-4.png', '07.10.17 19:28:00'),
(153, 'SSK 5', 'Genel', 'SSK-5.png', '07.10.17 19:28:24'),
(154, 'SSK 6', 'Genel', 'SSK-6.png', '07.10.17 19:28:35'),
(155, 'SSK 7', 'Genel', 'SSK-7.png', '07.10.17 19:28:41'),
(156, 'SSK 8', 'Genel', 'SSK-8.png', '07.10.17 19:28:49'),
(157, 'SSK 9', 'Genel', 'SSK-9.png', '07.10.17 19:28:57'),
(158, 'SSK 10', 'Genel', 'SSK-10.png', '07.10.17 19:29:06'),
(159, 'SSK 11', 'Genel', 'SSK-11.png', '07.10.17 19:29:14'),
(160, 'SSK 12', 'Genel', 'SSK-12.png', '07.10.17 19:29:28'),
(161, 'SSK 13', 'Genel', 'SSK-13.png', '07.10.17 19:29:39'),
(162, 'SSK 14', 'Genel', 'SSK-14.png', '07.10.17 19:29:47'),
(163, 'SSK 15', 'Genel', 'SSK-15.png', '07.10.17 19:29:58'),
(164, 'SSK 16', 'Genel', 'SSK-16.png', '07.10.17 19:30:08'),
(165, 'SSK 17', 'Genel', 'SSK-17.png', '07.10.17 19:30:18'),
(166, 'SSK 18', 'Genel', 'SSK-18.png', '07.10.17 19:30:28'),
(167, 'SSK 19', 'Genel', 'SSK-19.png', '07.10.17 19:30:36'),
(168, 'SSK 20', 'Genel', 'SSK-20.png', '07.10.17 19:30:44'),
(169, 'SSP 1', 'Genel', 'SSP-1.png', '07.10.17 23:08:02'),
(170, 'SSP 2', 'Genel', 'SSP-2.png', '07.10.17 23:08:08'),
(171, 'SSP 3', 'Genel', 'SSP-3.png', '07.10.17 23:08:16'),
(172, 'SSP 4', 'Genel', 'SSP-4.png', '07.10.17 23:08:23'),
(173, 'SSP 5', 'Genel', 'SSP-5.png', '07.10.17 23:08:31'),
(174, 'SSP 6', 'Genel', 'SSP-6.png', '07.10.17 23:08:40'),
(175, 'SSP 7', 'Genel', 'SSP-7.png', '07.10.17 23:08:47'),
(176, 'SSP 8', 'Genel', 'SSP-8.png', '07.10.17 23:09:31'),
(177, 'SSP 9', 'Genel', 'SSP-9.png', '07.10.17 23:09:39'),
(178, 'SSP 10', 'Genel', 'SSP-10.png', '07.10.17 23:09:46'),
(179, 'SSP 11', 'Genel', 'SSP-11.png', '07.10.17 23:09:54'),
(180, 'SSP 12', 'Genel', 'SSP-12.png', '07.10.17 23:10:14'),
(181, 'SSP 13', 'Genel', 'SSP-13.png', '07.10.17 23:10:21'),
(182, 'SSP 14', 'Genel', 'SSP-14.png', '07.10.17 23:10:29'),
(183, 'SSP 15', 'Genel', 'SSP-15.png', '07.10.17 23:10:34'),
(184, 'SSP 16', 'Genel', 'SSP-16.png', '07.10.17 23:10:41'),
(185, 'SSP 17', 'Genel', 'SSP-17.png', '07.10.17 23:10:48'),
(186, 'EKO 1', 'Genel', 'EKO-1.png', '07.10.17 23:24:44'),
(187, 'EKO 2', 'Genel', 'EKO-2.png', '07.10.17 23:24:50'),
(188, 'EKO 3', 'Genel', 'EKO-3.png', '07.10.17 23:24:57'),
(189, 'EKO 4', 'Genel', 'EKO-4.png', '07.10.17 23:25:02'),
(190, 'EKO 5', 'Genel', 'EKO-5.png', '07.10.17 23:25:09'),
(191, 'EKO 6', 'Genel', 'EKO-6.png', '07.10.17 23:25:15'),
(192, 'EKO 7', 'Genel', 'EKO-7.png', '07.10.17 23:25:20'),
(193, 'UAP 1', 'Genel', 'UAP-1.png', '08.10.17 11:28:43'),
(194, 'UAP 2', 'Genel', 'UAP-2.png', '08.10.17 11:28:50'),
(195, 'UAP 3', 'Genel', 'UAP-3.png', '08.10.17 11:28:57'),
(196, 'UAP 4', 'Genel', 'UAP-4.png', '08.10.17 11:29:06'),
(197, 'UAP 5', 'Genel', 'UAP-5.png', '08.10.17 11:29:15'),
(198, 'UAP 6', 'Genel', 'UAP-6.png', '08.10.17 11:29:22'),
(199, 'UAP 7', 'Genel', 'UAP-7.png', '08.10.17 11:29:31'),
(200, 'UAP 8', 'Genel', 'UAP-8.png', '08.10.17 11:29:38'),
(201, 'UAP 9', 'Genel', 'UAP-9.png', '08.10.17 11:29:46'),
(202, 'UAP 10', 'Genel', 'UAP-10.png', '08.10.17 11:29:54'),
(203, 'UAP 11', 'Genel', 'UAP-11.png', '08.10.17 11:30:01'),
(204, 'UAP 12', 'Genel', 'UAP-12.png', '08.10.17 11:30:07'),
(205, 'UAP 13', 'Genel', 'UAP-13.png', '08.10.17 11:30:14'),
(206, 'UAP 14', 'Genel', 'UAP-14.png', '08.10.17 11:30:21'),
(207, 'UAP 15', 'Genel', 'UAP-15.png', '08.10.17 11:30:30'),
(208, 'UAP 16', 'Genel', 'UAP-16.png', '08.10.17 11:30:39'),
(209, 'Bas 1', 'Genel', 'Bas-1.png', '08.10.17 11:38:01'),
(210, 'Bas 2', 'Genel', 'Bas-2.png', '08.10.17 11:38:08'),
(211, 'Bas 3', 'Genel', 'Bas-3.png', '08.10.17 11:38:15'),
(212, 'Bas 5', 'Genel', 'Bas-5.png', '08.10.17 11:38:24'),
(213, 'Bas 6', 'Genel', 'Bas-6.png', '08.10.17 11:38:31'),
(214, 'Bas 7', 'Genel', 'Bas-7.png', '08.10.17 11:38:38'),
(215, 'Bas 8', 'Genel', 'Bas-8.png', '08.10.17 11:38:44'),
(216, 'Bas 9', 'Genel', 'Bas-9.png', '08.10.17 11:38:50'),
(217, 'Bas 10', 'Genel', 'Bas-10.png', '08.10.17 11:39:01'),
(218, 'Bas 11', 'Genel', 'Bas-11.png', '08.10.17 11:39:10'),
(219, 'Bas 12', 'Genel', 'Bas-12.png', '08.10.17 11:39:17'),
(220, 'Bas 13', 'Genel', 'Bas-13.png', '08.10.17 11:39:24'),
(221, 'Bas 14', 'Genel', 'Bas-14.png', '08.10.17 11:39:30'),
(222, 'Bas 15', 'Genel', 'Bas-15.png', '08.10.17 11:39:40'),
(223, 'Bas 16', 'Genel', 'Bas-16.png', '08.10.17 11:39:52'),
(224, 'Bas 17', 'Genel', 'Bas-17.png', '08.10.17 11:39:58'),
(225, 'Bas 18', 'Genel', 'Bas-18.png', '08.10.17 11:40:05'),
(226, 'Bas 19', 'Genel', 'Bas-19.png', '08.10.17 11:40:12'),
(227, 'Bas 20', 'Genel', 'Bas-20.png', '08.10.17 11:40:22'),
(228, 'Bas 21', 'Genel', 'Bas-21.png', '08.10.17 11:40:29'),
(229, 'Bas 22', 'Genel', 'Bas-22.png', '08.10.17 11:40:36'),
(230, 'Bas 23', 'Genel', 'Bas-23.png', '08.10.17 11:40:42'),
(231, 'Bas 24', 'Genel', 'Bas-24.png', '08.10.17 11:40:49'),
(232, 'Bas 25', 'Genel', 'Bas-25.png', '08.10.17 11:40:57'),
(233, 'Bas 26', 'Genel', 'Bas-26.png', '08.10.17 11:41:04'),
(234, 'Bas 27', 'Genel', 'Bas-27.png', '08.10.17 11:41:11'),
(235, 'Bas 28', 'Genel', 'Bas-28.png', '08.10.17 11:41:18'),
(236, 'Bas 29', 'Genel', 'Bas-29.png', '08.10.17 11:41:30'),
(237, 'Bas 30', 'Genel', 'Bas-30.png', '08.10.17 11:42:07'),
(238, 'Bas 31', 'Genel', 'Bas-31.png', '08.10.17 11:42:13'),
(239, 'Bas 32', 'Genel', 'Bas-32.png', '08.10.17 11:42:19'),
(240, 'Bas 33', 'Genel', 'Bas-33.png', '08.10.17 11:42:25'),
(241, 'Bas 34', 'Genel', 'Bas-34.png', '08.10.17 11:43:18'),
(242, 'Bas 35', 'Genel', 'Bas-35.png', '08.10.17 11:43:29'),
(243, 'Bas 36', 'Genel', 'Bas-36.png', '08.10.17 11:43:35'),
(244, 'Bas 37', 'Genel', 'Bas-37.png', '08.10.17 11:43:43'),
(245, 'Bas 38', 'Genel', 'Bas-38.png', '08.10.17 11:43:50'),
(246, 'Bas 39', 'Genel', 'Bas-39.png', '08.10.17 11:43:57'),
(247, 'Bas 40', 'Genel', 'Bas-40.png', '08.10.17 11:44:14'),
(248, 'Bas 41', 'Genel', 'Bas-41.png', '08.10.17 11:44:21'),
(249, 'Bas 42', 'Genel', 'Bas-42.png', '08.10.17 11:44:28'),
(250, 'Bas 43', 'Genel', 'Bas-43.png', '08.10.17 11:44:47'),
(251, 'Bas 44', 'Genel', 'Bas-44.png', '08.10.17 11:44:54'),
(252, 'Bas 45', 'Genel', 'Bas-45.png', '08.10.17 11:45:02'),
(253, 'Bas 46', 'Genel', 'Bas-46.png', '08.10.17 11:45:09'),
(254, 'Bas 47', 'Genel', 'Bas-47.png', '08.10.17 11:45:15'),
(255, 'Bas 48', 'Genel', 'Bas-48.png', '08.10.17 11:46:10'),
(259, 'Bas 52', 'Genel', 'Bas-52.png', '08.10.17 11:46:41'),
(260, 'Bas 53', 'Genel', 'Bas-53.png', '08.10.17 11:46:48'),
(261, 'Bas 4', 'Genel', 'Bas-4.png', '08.10.17 11:53:14'),
(263, 'CIVOGS 1', 'Genel', 'CIVOGS-1.png', '08.10.17 12:02:14'),
(264, 'CIVOGS 2', 'Genel', 'CIVOGS-2.png', '08.10.17 12:02:21'),
(265, 'CIVOGS 3', 'Genel', 'CIVOGS-3.png', '08.10.17 12:02:28'),
(266, 'CIVOGS 4', 'Genel', 'CIVOGS-4.png', '08.10.17 12:02:35'),
(267, '20171006_H_KAFKA_DÖNÜŞÜM', 'Haberler', '20171006-H-KAFKA-DONUSUM.jpg', '09.10.17 10:10:10'),
(268, '20171007_H_EL_YAPIMI_OYUNCAK', 'Haberler', '20171007-H-EL-YAPIMI-OYUNCAK.jpg', '09.10.17 13:20:15'),
(269, '20171002_H_CAN_BAYOĞLU_MASA_TENİSİ', 'Haberler', '20171002-H-CAN-BAYOGLU-MASA-TENISI.jpg', '09.10.17 13:33:53'),
(270, '20171004_H_HAYVANLARI_KORUMA_GÜNÜ', 'Haberler', '20171004-H-HAYVANLARI-KORUMA-GUNU.jpg', '09.10.17 14:26:56'),
(271, 'Demet Bozkurt Aydın', 'Kadro', 'Demet-Bozkurt-Aydin.png', '09.10.17 22:08:41'),
(272, 'Yıldırım Kemal Çopur', 'Kadro', 'Yildirim-Kemal-Copur.png', '09.10.17 22:10:22'),
(277, 'BB 1', 'Basinda Biz', 'BB-1.png', '10.10.17 14:12:48'),
(278, 'BB 2', 'Basinda Biz', 'BB-2.png', '10.10.17 14:13:06'),
(279, 'BB 3', 'Basinda Biz', 'BB-3.png', '10.10.17 14:13:26'),
(280, 'BB 4', 'Basinda Biz', 'BB-4.png', '10.10.17 14:13:39'),
(281, 'BB 6', 'Basinda Biz', 'BB-6.png', '10.10.17 14:13:53'),
(282, 'BB 7', 'Basinda Biz', 'BB-7.png', '10.10.17 14:14:00'),
(283, 'BB 5', 'Basinda Biz', 'BB-5.png', '10.10.17 14:14:16'),
(293, '20171011_H_BİLKENT_MUN', 'Haberler', '20171011-H-BILKENT-MUN.jpg', '12.10.17 11:11:00'),
(294, '20161228_H_BENSU_YETİK_ŞAMPİYON', 'Haberler', '20161228-H-BENSU-YETIK-SAMPIYON.jpg', '12.10.17 13:46:14'),
(295, '20171012_H_FEN_KEMİĞİN_YAPISI', 'Haberler', '20171012-H-FEN-KEMIGIN-YAPISI.jpg', '12.10.17 14:53:40'),
(296, '20170605_H_BASKETBOL_İKİNCİLİK', 'Haberler', '20170605-H-BASKETBOL-IKINCILIK.jpg', '12.10.17 14:55:43'),
(297, '20170117_H_SPOR_DANIŞMANIMIZ', 'Haberler', '20170117-H-SPOR-DANISMANIMIZ.jpg', '12.10.17 18:16:54'),
(298, '20171010_H_CAMBRIDGE', 'Haberler', '20171010-H-CAMBRIDGE.png', '12.10.17 18:24:43'),
(299, '20161010_H_CAMBRIDGE_PENFRIENDS', 'Haberler', '20161010-H-CAMBRIDGE-PENFRIENDS.png', '12.10.17 18:29:37'),
(300, '20170306_H_BURSLULUK_SINAVI', 'Haberler', '20170306-H-BURSLULUK-SINAVI.jpg', '12.10.17 18:40:28'),
(301, '20170305_H_BURSLULUK_SINAVI', 'Haberler', '20170305-H-BURSLULUK-SINAVI.jpg', '12.10.17 18:41:58'),
(302, '20161202_H_ÇARKIFELEK', 'Haberler', '20161202-H-CARKIFELEK.jpg', '12.10.17 18:48:37'),
(303, '20170325_H_ÇOCUK_GÖZÜYLE_DOKTOR', 'Haberler', '20170325-H-COCUK-GOZUYLE-DOKTOR.jpg', '12.10.17 18:51:28'),
(304, '20171013_H_5.SINIFLAR_TÜRKÇE_DERSİNDE', 'Haberler', '20171013-H-5-SINIFLAR-TURKCE-DERSINDE.jpg', '13.10.17 13:27:25'),
(305, '20161201_H_CSO_EĞİTİM_KONSERİ', 'Haberler', '20161201-H-CSO-EGITIM-KONSERI.jpg', '13.10.17 13:56:00'),
(306, '20170306_H_FEN_LABORATUAR', 'Haberler', '20170306-H-FEN-LABORATUAR.jpg', '13.10.17 15:14:39'),
(307, '20171013_H_ANKARA\'NIN_BAŞKENT_OLUŞU', 'Haberler', '20171013-H-ANKARA-NIN-BASKENT-OLUSU.jpg', '14.10.17 11:11:40'),
(308, '20171013_H_ETKİNLİK_GÜNLERİ', 'Haberler', '20171013-H-ETKINLIK-GUNLERI.jpg', '14.10.17 11:42:11'),
(309, '20171013_H_ÖÖP_PARTİ', 'Haberler', '20171013-H-OOP-PARTI.jpg', '14.10.17 11:44:31'),
(310, '20170308_H_EMPATİ', 'Haberler', '20170308-H-EMPATI.jpg', '14.10.17 14:15:54'),
(311, '20170412_H_ÇEVRE_KİRLİLİĞİ_AFİŞ', 'Haberler', '20170412-H-CEVRE-KIRLILIGI-AFIS.jpg', '14.10.17 14:21:49'),
(312, '20171013_H_TÜRKÇE_ETKİNLİK_GÜNLERİ', 'Haberler', '20171013-H-TURKCE-ETKINLIK-GUNLERI.jpg', '14.10.17 14:29:32'),
(313, '20171013_H_ÖÖP_PARTİ', 'Haberler', '20171013-H-OOP-PARTI1.jpg', '14.10.17 14:32:45'),
(314, 'Deneme1233123', 'Genel', 'Deneme1233123.jpg', '14.10.17 16:11:52'),
(315, '20171016_H_ACTIVE_LEARN', 'Haberler', '20171016-H-ACTIVE-LEARN.jpg', '16.10.17 16:16:21'),
(316, '20171014_ETKİNLİK_GÜNLERİ', 'Haberler', '20171014-ETKINLIK-GUNLERI.jpg', '16.10.17 16:29:14'),
(321, 'Sınav Takvimi', 'Genel', 'Sinav-Takvimi.jpg', '18.10.17 00:05:09'),
(322, 'Etkinlik Takvimi', 'Genel', 'Etkinlik-Takvimi.jpg', '18.10.17 00:05:40'),
(323, 'Aylık Yemek Listesi', 'Genel', 'Aylik-Yemek-Listesi.jpg', '18.10.17 00:05:54'),
(324, '20171001_YEMEK_LİSTE', 'Yemek-Listesi', '20171001-YEMEK-LISTE.jpg', '23.10.17 12:40:41'),
(325, '20170918_SINAV_TAKVİMİ', 'Genel', '20170918-SINAV-TAKVIMI.jpg', '23.10.17 12:49:19'),
(326, 'deneme yemek', 'Yemek-Listesi', 'deneme-yemek.jpg', '23.10.17 16:35:38'),
(366, 'Galeri_001', 'Galeri', 'Galeri-001.jpg', '25.10.17 01:26:20'),
(367, 'Galeri_002', 'Galeri', 'Galeri-002.jpg', '25.10.17 01:26:42'),
(368, 'Galeri_003', 'Galeri', 'Galeri-003.jpg', '25.10.17 01:27:06'),
(369, 'Galeri_004', 'Galeri', 'Galeri-004.jpg', '25.10.17 01:27:26'),
(370, 'Galeri_005', 'Galeri', 'Galeri-005.jpg', '25.10.17 01:27:45'),
(371, 'Galeri_006', 'Galeri', 'Galeri-006.jpg', '25.10.17 01:28:03'),
(372, 'Galeri_007', 'Galeri', 'Galeri-007.jpg', '25.10.17 01:28:21'),
(373, 'Galeri_008', 'Galeri', 'Galeri-008.jpg', '25.10.17 01:28:42'),
(374, 'Galeri_009', 'Galeri', 'Galeri-009.jpg', '25.10.17 01:29:01'),
(375, 'Galeri_010', 'Galeri', 'Galeri-010.jpg', '25.10.17 01:29:21'),
(376, 'Galeri_011', 'Galeri', 'Galeri-011.jpg', '25.10.17 01:29:41'),
(377, 'Galeri_012', 'Galeri', 'Galeri-012.jpg', '25.10.17 01:30:01'),
(378, 'Galeri_013', 'Galeri', 'Galeri-013.jpg', '25.10.17 01:30:20'),
(379, 'Galeri_014', 'Galeri', 'Galeri-014.jpg', '25.10.17 01:30:39'),
(380, 'Galeri_015', 'Galeri', 'Galeri-015.jpg', '25.10.17 01:31:03'),
(381, 'Galeri_016', 'Galeri', 'Galeri-016.jpg', '25.10.17 01:31:23'),
(382, 'Galeri_017', 'Galeri', 'Galeri-017.jpg', '25.10.17 01:31:41'),
(383, 'Galeri_018', 'Galeri', 'Galeri-018.jpg', '25.10.17 01:32:01'),
(384, 'Galeri_019', 'Galeri', 'Galeri-019.jpg', '25.10.17 01:32:21'),
(385, 'Galeri_020', 'Galeri', 'Galeri-020.jpg', '25.10.17 01:32:39'),
(386, 'Galeri_021', 'Galeri', 'Galeri-021.jpg', '25.10.17 01:32:58'),
(387, 'Galeri_022', 'Galeri', 'Galeri-022.jpg', '25.10.17 01:33:17'),
(388, 'Galeri_023', 'Galeri', 'Galeri-023.jpg', '25.10.17 01:33:35'),
(389, 'Galeri_024', 'Galeri', 'Galeri-024.jpg', '25.10.17 01:33:59'),
(390, 'Galeri_025', 'Galeri', 'Galeri-025.jpg', '25.10.17 01:34:24'),
(391, 'Galeri_026', 'Galeri', 'Galeri-026.jpg', '25.10.17 01:34:42'),
(392, 'Galeri_027', 'Galeri', 'Galeri-027.jpg', '25.10.17 01:35:02'),
(393, 'Galeri_028', 'Galeri', 'Galeri-028.jpg', '25.10.17 01:35:22'),
(394, 'Galeri_029', 'Galeri', 'Galeri-029.jpg', '25.10.17 01:35:43'),
(395, 'Galeri_030', 'Galeri', 'Galeri-030.jpg', '25.10.17 01:36:04'),
(396, 'Galeri_031', 'Galeri', 'Galeri-031.jpg', '25.10.17 01:36:25'),
(397, 'Galeri_032', 'Galeri', 'Galeri-032.jpg', '25.10.17 01:36:46'),
(398, 'Galeri_033', 'Galeri', 'Galeri-033.jpg', '25.10.17 01:37:07'),
(399, 'Galeri_034', 'Galeri', 'Galeri-034.jpg', '25.10.17 01:37:27'),
(400, 'Galeri_035', 'Galeri', 'Galeri-035.jpg', '25.10.17 01:37:48'),
(401, 'Galeri_036', 'Galeri', 'Galeri-036.jpg', '25.10.17 01:38:18'),
(402, 'Galeri_037', 'Galeri', 'Galeri-037.jpg', '25.10.17 01:38:40'),
(403, 'Galeri_038', 'Galeri', 'Galeri-038.jpg', '25.10.17 01:39:03'),
(404, 'Galeri_039', 'Galeri', 'Galeri-039.jpg', '25.10.17 01:39:22'),
(405, 'Galeri_040', 'Galeri', 'Galeri-040.jpg', '25.10.17 01:39:42'),
(406, 'Galeri_041', 'Galeri', 'Galeri-041.jpg', '25.10.17 01:40:04'),
(407, 'Galeri_042', 'Galeri', 'Galeri-042.jpg', '25.10.17 01:40:23'),
(408, 'Galeri_043', 'Galeri', 'Galeri-043.jpg', '25.10.17 01:40:51'),
(409, 'Galeri_044', 'Galeri', 'Galeri-044.jpg', '25.10.17 01:41:11'),
(410, 'Galeri_045', 'Galeri', 'Galeri-045.jpg', '25.10.17 01:41:30'),
(411, 'Galeri_046', 'Galeri', 'Galeri-046.jpg', '25.10.17 01:41:51'),
(412, 'Galeri_047', 'Galeri', 'Galeri-047.jpg', '25.10.17 01:42:12'),
(413, 'Galeri_048', 'Galeri', 'Galeri-048.jpg', '25.10.17 01:42:38'),
(414, 'Galeri_049', 'Galeri', 'Galeri-049.jpg', '25.10.17 01:43:04'),
(415, 'Galeri_050', 'Galeri', 'Galeri-050.jpg', '25.10.17 01:43:29'),
(416, 'Galeri_051', 'Galeri', 'Galeri-051.jpg', '25.10.17 01:44:03'),
(417, 'Galeri_052', 'Galeri', 'Galeri-052.jpg', '25.10.17 01:44:27'),
(418, 'Galeri_053', 'Galeri', 'Galeri-053.jpg', '25.10.17 01:44:50'),
(419, 'Galeri_054', 'Galeri', 'Galeri-054.jpg', '25.10.17 01:45:11'),
(420, 'Galeri_055', 'Galeri', 'Galeri-055.jpg', '25.10.17 01:45:36'),
(421, 'Galeri_056', 'Galeri', 'Galeri-056.jpg', '25.10.17 01:45:58'),
(422, 'Galeri_057', 'Galeri', 'Galeri-057.jpg', '25.10.17 01:46:18'),
(423, 'Galeri_058', 'Galeri', 'Galeri-058.jpg', '25.10.17 01:46:42'),
(424, 'Galeri_059', 'Galeri', 'Galeri-059.jpg', '25.10.17 01:47:03'),
(425, 'Galeri_060', 'Galeri', 'Galeri-060.jpg', '25.10.17 01:47:29'),
(426, 'Galeri_061', 'Galeri', 'Galeri-061.jpg', '25.10.17 01:47:52'),
(427, 'Galeri_062', 'Galeri', 'Galeri-062.jpg', '25.10.17 01:48:14'),
(428, 'Galeri_063', 'Galeri', 'Galeri-063.jpg', '25.10.17 01:48:33'),
(429, 'Galeri_064', 'Galeri', 'Galeri-064.jpg', '25.10.17 01:48:55'),
(430, 'Galeri_065', 'Galeri', 'Galeri-065.jpg', '25.10.17 01:49:15'),
(431, 'Galeri_066', 'Galeri', 'Galeri-066.jpg', '25.10.17 01:49:34'),
(432, 'Galeri_067', 'Galeri', 'Galeri-067.jpg', '25.10.17 01:49:57'),
(433, 'Galeri_068', 'Galeri', 'Galeri-068.jpg', '25.10.17 01:50:21'),
(434, 'Galeri_069', 'Galeri', 'Galeri-069.jpg', '25.10.17 01:50:45'),
(435, 'Galeri_070', 'Galeri', 'Galeri-070.jpg', '25.10.17 01:51:06'),
(436, 'Galeri_071', 'Galeri', 'Galeri-071.jpg', '25.10.17 01:51:36'),
(437, 'Galeri_072', 'Galeri', 'Galeri-072.jpg', '25.10.17 01:51:57'),
(438, 'Galeri_073', 'Galeri', 'Galeri-073.jpg', '25.10.17 01:52:17'),
(439, 'Galeri_074', 'Galeri', 'Galeri-074.jpg', '25.10.17 01:52:40'),
(440, 'Galeri_075', 'Galeri', 'Galeri-075.jpg', '25.10.17 01:53:01'),
(441, 'Galeri_076', 'Galeri', 'Galeri-076.jpg', '25.10.17 01:53:21'),
(442, 'Galeri_077', 'Galeri', 'Galeri-077.jpg', '25.10.17 01:53:53'),
(443, 'Galeri_078', 'Galeri', 'Galeri-078.jpg', '25.10.17 01:54:16'),
(444, 'Galeri_079', 'Galeri', 'Galeri-079.jpg', '25.10.17 01:54:46'),
(445, 'Galeri_080', 'Galeri', 'Galeri-080.jpg', '25.10.17 01:55:17'),
(446, 'Galeri_081', 'Galeri', 'Galeri-081.jpg', '25.10.17 01:55:40'),
(447, 'Galeri_082', 'Galeri', 'Galeri-082.jpg', '25.10.17 01:55:59'),
(448, 'Galeri_083', 'Galeri', 'Galeri-083.jpg', '25.10.17 01:56:22'),
(449, 'Galeri_084', 'Galeri', 'Galeri-084.jpg', '25.10.17 01:56:47'),
(450, 'Galeri_085', 'Galeri', 'Galeri-085.jpg', '25.10.17 01:57:08'),
(451, 'Galeri_086', 'Galeri', 'Galeri-086.jpg', '25.10.17 01:57:29'),
(452, 'Galeri_087', 'Galeri', 'Galeri-087.jpg', '25.10.17 01:58:16'),
(453, 'Galeri_088', 'Galeri', 'Galeri-088.jpg', '25.10.17 01:58:44'),
(454, 'Galeri_089', 'Galeri', 'Galeri-089.jpg', '25.10.17 01:59:08'),
(455, 'Galeri_090', 'Galeri', 'Galeri-090.jpg', '25.10.17 01:59:28'),
(456, 'Galeri_091', 'Galeri', 'Galeri-091.jpg', '25.10.17 01:59:53'),
(457, 'Galeri_092', 'Galeri', 'Galeri-092.jpg', '25.10.17 02:00:13'),
(458, 'Galeri_093', 'Galeri', 'Galeri-093.jpg', '25.10.17 02:00:33'),
(459, 'Galeri_094', 'Galeri', 'Galeri-094.jpg', '25.10.17 02:00:53'),
(460, 'Galeri_095', 'Galeri', 'Galeri-095.jpg', '25.10.17 02:01:14'),
(461, 'Galeri_096', 'Galeri', 'Galeri-096.jpg', '25.10.17 02:01:36'),
(462, 'Galeri_097', 'Galeri', 'Galeri-097.jpg', '25.10.17 02:01:56'),
(463, 'Galeri_098', 'Galeri', 'Galeri-098.jpg', '25.10.17 02:02:23'),
(464, 'Galeri_099', 'Galeri', 'Galeri-099.jpg', '25.10.17 02:02:44'),
(465, 'Galeri_100', 'Galeri', 'Galeri-100.jpg', '25.10.17 02:03:04'),
(466, 'Galeri_101', 'Galeri', 'Galeri-101.jpg', '25.10.17 02:03:24'),
(467, 'Galeri_102', 'Galeri', 'Galeri-102.jpg', '25.10.17 02:03:44'),
(468, 'Galeri_103', 'Galeri', 'Galeri-103.jpg', '25.10.17 02:04:05'),
(469, 'Galeri_104', 'Galeri', 'Galeri-104.jpg', '25.10.17 02:04:25'),
(470, 'Galeri_105', 'Galeri', 'Galeri-105.jpg', '25.10.17 02:04:44'),
(471, 'Galeri_106', 'Galeri', 'Galeri-106.jpg', '25.10.17 02:05:03'),
(472, 'Galeri_107', 'Galeri', 'Galeri-107.jpg', '25.10.17 02:05:25'),
(473, 'Galeri_108', 'Galeri', 'Galeri-108.jpg', '25.10.17 02:05:43'),
(474, 'Galeri_109', 'Galeri', 'Galeri-109.jpg', '25.10.17 02:06:03'),
(475, 'Galeri_110', 'Galeri', 'Galeri-110.jpg', '25.10.17 02:06:25'),
(476, 'Galeri_111', 'Galeri', 'Galeri-111.jpg', '25.10.17 02:06:45'),
(477, 'Galeri_112', 'Galeri', 'Galeri-112.jpg', '25.10.17 02:07:02'),
(478, 'Galeri_113', 'Galeri', 'Galeri-113.jpg', '25.10.17 02:07:20'),
(479, 'Galeri_114', 'Galeri', 'Galeri-114.jpg', '25.10.17 02:07:38'),
(480, 'Galeri_115', 'Galeri', 'Galeri-115.jpg', '25.10.17 02:07:55'),
(481, 'Galeri_116', 'Galeri', 'Galeri-116.jpg', '25.10.17 02:08:13'),
(482, 'Galeri_117', 'Galeri', 'Galeri-117.jpg', '25.10.17 02:08:30'),
(483, 'Galeri_118', 'Galeri', 'Galeri-118.jpg', '25.10.17 02:08:50'),
(484, 'Galeri_119', 'Galeri', 'Galeri-119.jpg', '25.10.17 02:09:11'),
(485, 'Galeri_120', 'Galeri', 'Galeri-120.jpg', '25.10.17 02:09:31'),
(486, 'Galeri_121', 'Galeri', 'Galeri-121.jpg', '25.10.17 02:09:51'),
(487, 'Galeri_122', 'Galeri', 'Galeri-122.jpg', '25.10.17 02:10:08'),
(488, 'Galeri_123', 'Galeri', 'Galeri-123.jpg', '25.10.17 02:10:25'),
(489, 'Galeri_124', 'Galeri', 'Galeri-124.jpg', '25.10.17 02:10:49'),
(490, 'Galeri_125', 'Galeri', 'Galeri-125.jpg', '25.10.17 02:11:07'),
(491, 'Galeri_126', 'Galeri', 'Galeri-126.jpg', '25.10.17 02:11:27'),
(492, 'Galeri_127', 'Galeri', 'Galeri-127.jpg', '25.10.17 02:11:52'),
(493, '20171029_D_29_EKİM', 'Duyurular', '20171029-D-29-EKIM.jpg', '26.10.17 09:57:18'),
(494, '20171029_D_29_EKİM', 'Duyurular', '20171029-D-29-EKIM1.jpg', '26.10.17 10:01:57'),
(495, 'Atabayrak', 'Duyurular', 'Atabayrak.jpg', '28.10.17 23:03:34'),
(496, 'Anasayfa Banner 1', 'Banner', 'Anasayfa-Banner-1.jpg', '29.10.17 23:30:30'),
(497, 'Anasayfa Banner 2', 'Banner', 'Anasayfa-Banner-2.jpg', '29.10.17 23:31:14'),
(498, 'Anasayfa Banner 3', 'Banner', 'Anasayfa-Banner-3.jpg', '29.10.17 23:31:21'),
(499, 'Anasayfa Banner 4', 'Banner', 'Anasayfa-Banner-4.jpg', '29.10.17 23:31:28'),
(501, '20171103_D_ERGENLİK', 'Duyurular', '20171103-D-ERGENLIK.jpg', '31.10.17 12:19:06'),
(502, '20171103_D_ERGENLİK1', 'Duyurular', '20171103-D-ERGENLIK1.jpg', '31.10.17 12:20:46'),
(503, 'Yemek_Listesi_Kolej_201710', 'Yemek-Listesi', 'Yemek_Listesi_Kolej_201710.jpg', '31.10.17 21:24:53'),
(504, 'Yemek_Listesi_Kolej_2017_11', 'Yemek-Listesi', 'Yemek-Listesi-Kolej-2017-11.jpg', '01.11.17 22:31:58'),
(505, 'Ankara Eğitim Kurumları Kreş Kasım - 2017 Yemek Listesi', 'Yemek-Listesi', 'Ankara-Egitim-Kurumlari-Kres-Kasim-2017-Yemek-Listesi.jpg', '01.11.17 23:39:10'),
(506, '20171102_D_ERGENLİK_KIZ', 'Duyurular', '20171102-D-ERGENLIK-KIZ.jpg', '02.11.17 13:37:17'),
(507, '20171102_D_ERGENLİK_KIZ01', 'Duyurular', '20171102-D-ERGENLIK-KIZ01.jpg', '02.11.17 13:38:50'),
(508, '20171102_YANGIN_TATBİKATI', 'Duyurular', '20171102-YANGIN-TATBIKATI.jpg', '02.11.17 13:41:44'),
(509, '20171102_YANGIN_TATBİKATI01', 'Duyurular', '20171102-YANGIN-TATBIKATI01.jpg', '02.11.17 13:42:02'),
(510, '20171102_D_ANITKABİR', 'Duyurular', '20171102-D-ANITKABIR.jpg', '02.11.17 13:43:31'),
(511, '20171102_D_ANITKABİR01', 'Duyurular', '20171102-D-ANITKABIR01.jpg', '02.11.17 13:43:48'),
(512, '20171102_D_ERGENLİK_ERKEK', 'Duyurular', '20171102-D-ERGENLIK-ERKEK.jpg', '02.11.17 13:45:19'),
(513, '20171102_D_ERGENLİK_ERKEK01', 'Duyurular', '20171102-D-ERGENLIK-ERKEK01.jpg', '02.11.17 13:45:35'),
(514, '20171102_D_ERGENLİK_ERK.', 'Duyurular', '20171102-D-ERGENLIK-ERK-.jpg', '02.11.17 13:49:06'),
(515, '20171102_D_ERGENLİK_ERKEK03', 'Duyurular', '20171102-D-ERGENLIK-ERKEK03.jpg', '02.11.17 13:53:50'),
(516, '20171101_D_ERKEK_ERGEN01', 'Duyurular', '20171101-D-ERKEK-ERGEN01.jpg', '02.11.17 14:00:58'),
(517, '20171101_D_ERKEK_ERGEN02', 'Duyurular', '20171101-D-ERKEK-ERGEN02.jpg', '02.11.17 14:01:17'),
(518, '20171102_D_OYUNCAK_MÜZESİ01', 'Duyurular', '20171102-D-OYUNCAK-MUZESI01.jpg', '02.11.17 14:08:12'),
(519, '20171102_OYUNCAK_MÜZESİ02', 'Duyurular', '20171102-OYUNCAK-MUZESI02.jpg', '02.11.17 14:08:41'),
(520, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI.jpg', '02.11.17 14:37:27'),
(521, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ01', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI01.jpg', '02.11.17 14:38:29'),
(522, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ02', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI02.jpg', '02.11.17 14:39:23'),
(523, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ03', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI03.jpg', '02.11.17 14:40:13'),
(524, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ04', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI04.jpg', '02.11.17 14:40:59'),
(525, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ05', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI05.jpg', '02.11.17 14:42:20'),
(526, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ06', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI06.jpg', '02.11.17 14:43:22'),
(527, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ07', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI07.jpg', '02.11.17 14:44:42'),
(528, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ08', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI08.jpg', '02.11.17 14:45:51'),
(529, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ09', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI09.jpg', '02.11.17 14:47:14'),
(530, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ10', 'Duyurular', '20171102-H-ISPANYA-BUYUKELCILIGI10.jpg', '02.11.17 14:51:12'),
(531, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ11', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI11.jpg', '02.11.17 14:53:00'),
(532, '20171102_H_İSPANYA_BÜYÜKELÇİLİĞİ12', 'Haberler', '20171102-H-ISPANYA-BUYUKELCILIGI12.jpg', '02.11.17 14:54:07'),
(533, '20171102_LİSE_BAHÇE', 'Haberler', '20171102-LISE-BAHCE.jpg', '02.11.17 14:56:58'),
(534, '20171102_LİSE_BAHÇE01', 'Haberler', '20171102-LISE-BAHCE01.jpg', '02.11.17 14:57:25'),
(535, '20171102_LİSE_BAHÇE02', 'Haberler', '20171102-LISE-BAHCE02.jpg', '02.11.17 14:57:44'),
(536, '20171102_LİSE_BAHÇE03', 'Haberler', '20171102-LISE-BAHCE03.jpg', '02.11.17 14:58:01'),
(537, '20171024_H_İLKOKUL_BAŞKANLIK', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK.jpg', '02.11.17 15:05:42'),
(538, '20171024_H_İLKOKUL_BAŞKANLIK01', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK01.jpg', '02.11.17 15:06:01'),
(539, '20171024_H_İLKOKUL_BAŞKANLIK02', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK02.jpg', '02.11.17 15:06:20'),
(540, '20171024_H_İLKOKUL_BAŞKANLIK03', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK03.jpg', '02.11.17 15:06:37'),
(541, '20171024_H_İLKOKUL_BAŞKANLIK04', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK04.jpg', '02.11.17 15:06:56'),
(542, '20171024_H_İLKOKUL_BAŞKANLIK05', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK05.jpg', '02.11.17 15:07:11'),
(543, '20171024_H_İLKOKUL_BAŞKANLIK06', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK06.jpg', '02.11.17 15:07:33'),
(544, '20171024_H_İLKOKUL_BAŞKANLIK07', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK07.jpg', '02.11.17 15:08:02'),
(545, '20171024_H_İLKOKUL_BAŞKANLIK08', 'Haberler', '20171024-H-ILKOKUL-BASKANLIK08.jpg', '02.11.17 15:08:20'),
(546, '20171025_H_BAŞKANLIK_ORTAOKUL', 'Haberler', '20171025-H-BASKANLIK-ORTAOKUL.jpg', '02.11.17 15:14:39'),
(547, '20171025_H_BAŞKANLIK_ORTAOKUL01', 'Haberler', '20171025-H-BASKANLIK-ORTAOKUL01.jpg', '02.11.17 15:14:52'),
(548, '20171025_H_BAŞKANLIK_ORTAOKUL02', 'Haberler', '20171025-H-BASKANLIK-ORTAOKUL02.jpg', '02.11.17 15:15:11'),
(549, '20171025_H_BAŞKANLIK_ORTAOKUL03', 'Haberler', '20171025-H-BASKANLIK-ORTAOKUL03.jpg', '02.11.17 15:15:26'),
(550, '20171025_H_BAŞKANLIK_ORTAOKUL04', 'Haberler', '20171025-H-BASKANLIK-ORTAOKUL04.jpg', '02.11.17 15:15:50'),
(551, '20171025_H_BAŞKANLIK_ORTAOKUL05', 'Haberler', '20171025-H-BASKANLIK-ORTAOKUL05.jpg', '02.11.17 15:16:13'),
(552, '20171025_H_BAŞKANLIK_ORTAOKUL06', 'Haberler', '20171025-H-BASKANLIK-ORTAOKUL06.jpg', '02.11.17 15:16:30'),
(553, '20171025_H_BAŞKANLIK_ORTAOKUL07', 'Haberler', '20171025-H-BASKANLIK-ORTAOKUL07.jpg', '02.11.17 15:17:01'),
(554, '20171025_H_YAREN_DÜNYA_İKİNCİLİĞİ', 'Haberler', '20171025-H-YAREN-DUNYA-IKINCILIGI.jpg', '02.11.17 15:19:25'),
(555, '20171025_H_YAREN_DÜNYA_İKİNCİLİĞİ01', 'Haberler', '20171025-H-YAREN-DUNYA-IKINCILIGI01.jpg', '02.11.17 15:19:41'),
(556, '20171025_H_YAREN_DÜNYA_İKİNCİLİĞİ02', 'Haberler', '20171025-H-YAREN-DUNYA-IKINCILIGI02.jpg', '02.11.17 15:20:10'),
(557, '20171025_H_YAREN_DÜNYA_İKİNCİLİĞİ03', 'Haberler', '20171025-H-YAREN-DUNYA-IKINCILIGI03.jpg', '02.11.17 15:20:31'),
(558, '20171025_H_YAREN_DÜNYA_İKİNCİLİĞİ04', 'Haberler', '20171025-H-YAREN-DUNYA-IKINCILIGI04.jpg', '02.11.17 15:20:45'),
(559, '20171025_H_AY_PROJESİ', 'Haberler', '20171025-H-AY-PROJESI.jpg', '02.11.17 15:24:09'),
(560, '20171025_H_AY_PROJESİ01', 'Haberler', '20171025-H-AY-PROJESI01.jpg', '02.11.17 15:24:24'),
(561, '20171025_H_AY_PROJESİ02', 'Haberler', '20171025-H-AY-PROJESI02.jpg', '02.11.17 15:24:41'),
(562, '20171025_H_AY_PROJESİ03', 'Haberler', '20171025-H-AY-PROJESI03.jpg', '02.11.17 15:25:01'),
(563, '20171025_H_AY_PROJESİ04', 'Haberler', '20171025-H-AY-PROJESI04.jpg', '02.11.17 15:25:23'),
(564, '20171025_H_AY_PROJESİ05', 'Haberler', '20171025-H-AY-PROJESI05.jpg', '02.11.17 15:25:41'),
(565, '20171025_H_GADGET_SHOW', 'Haberler', '20171025-H-GADGET-SHOW.jpg', '02.11.17 15:30:10'),
(566, '20171025_H_GADGET_SHOW01', 'Haberler', '20171025-H-GADGET-SHOW01.jpg', '02.11.17 15:30:50'),
(567, '20171025_H_GADGET_SHOW02', 'Haberler', '20171025-H-GADGET-SHOW02.jpg', '02.11.17 15:31:28'),
(568, '20171025_H_GADGET_SHOW03', 'Haberler', '20171025-H-GADGET-SHOW03.jpg', '02.11.17 15:32:11'),
(569, '20171025_H_GADGET_SHOW04', 'Haberler', '20171025-H-GADGET-SHOW04.jpg', '02.11.17 15:33:38'),
(570, '20171025_H_GADGET_SHOW05', 'Haberler', '20171025-H-GADGET-SHOW05.jpg', '02.11.17 15:34:16'),
(571, '20171025_H_GADGET_SHOW06', 'Haberler', '20171025-H-GADGET-SHOW06.jpg', '02.11.17 15:35:05'),
(572, '20171025_H_BELİZ_DEMİRHAN', 'Haberler', '20171025-H-BELIZ-DEMIRHAN.jpg', '02.11.17 15:38:31'),
(573, '20171025_H_BELİZ_DEMİRHAN01', 'Haberler', '20171025-H-BELIZ-DEMIRHAN01.jpg', '02.11.17 15:38:54'),
(574, '20171025_H_BELİZ_DEMİRHAN02', 'Haberler', '20171025-H-BELIZ-DEMIRHAN02.jpg', '02.11.17 15:40:22'),
(575, '20171026_H_KURTULUŞ_MÜZESİ', 'Haberler', '20171026-H-KURTULUS-MUZESI.jpg', '02.11.17 15:46:28'),
(576, '20171026_H_KURTULUŞ_MÜZESİ01', 'Haberler', '20171026-H-KURTULUS-MUZESI01.jpg', '02.11.17 15:46:44'),
(577, '20171026_H_KURTULUŞ_MÜZESİ02', 'Haberler', '20171026-H-KURTULUS-MUZESI02.jpg', '02.11.17 15:46:59'),
(578, '20171026_H_KURTULUŞ_MÜZESİ03', 'Haberler', '20171026-H-KURTULUS-MUZESI03.jpg', '02.11.17 15:47:18'),
(579, '20171026_H_KURTULUŞ_MÜZESİ04', 'Haberler', '20171026-H-KURTULUS-MUZESI04.jpg', '02.11.17 15:47:35'),
(580, '20171026_H_KURTULUŞ_MÜZESİ05', 'Haberler', '20171026-H-KURTULUS-MUZESI05.jpg', '02.11.17 15:47:50'),
(581, '20171026_H_KURTULUŞ_MÜZESİ06', 'Haberler', '20171026-H-KURTULUS-MUZESI06.jpg', '02.11.17 15:48:11'),
(582, '20171026_H_KURTULUŞ_MÜZESİ07', 'Haberler', '20171026-H-KURTULUS-MUZESI07.jpg', '02.11.17 15:48:29'),
(583, '20171026_H_KURTULUŞ_MÜZESİ08', 'Haberler', '20171026-H-KURTULUS-MUZESI08.jpg', '02.11.17 15:48:49'),
(584, '20171026_H_KURTULUŞ_MÜZESİ09', 'Haberler', '20171026-H-KURTULUS-MUZESI09.jpg', '02.11.17 15:49:10'),
(585, '20171026_H-KALP_AKCİĞER', 'Haberler', '20171026-H-KALP-AKCIGER.jpg', '02.11.17 16:06:12'),
(586, '20171026_KALP_AKCİĞER01', 'Haberler', '20171026-KALP-AKCIGER01.jpg', '02.11.17 16:06:58'),
(587, '20171026_KALP_AKCİĞER02', 'Haberler', '20171026-KALP-AKCIGER02.jpg', '02.11.17 16:07:21'),
(588, '20171026_KALP_AKCİĞER03', 'Haberler', '20171026-KALP-AKCIGER03.jpg', '02.11.17 16:07:50'),
(589, '20171026_KALP_AKCİĞER04', 'Haberler', '20171026-KALP-AKCIGER04.jpg', '02.11.17 16:08:06'),
(590, '20171026_KALP_AKCİĞER05', 'Haberler', '20171026-KALP-AKCIGER05.jpg', '02.11.17 16:08:24'),
(591, '20171027_H_SERHAN_ÖZKAN_EMDR', 'Haberler', '20171027-H-SERHAN-OZKAN-EMDR.jpg', '02.11.17 16:12:29'),
(592, '20171027_H_SERHAN_ÖZKAN_EMDR01', 'Haberler', '20171027-H-SERHAN-OZKAN-EMDR01.jpg', '02.11.17 16:13:28'),
(593, '20171027_H_SERHAN_ÖZKAN_EMDR02', 'Haberler', '20171027-H-SERHAN-OZKAN-EMDR02.jpg', '02.11.17 16:14:14'),
(594, '20171027_H_SERHAN_ÖZKAN_EMDR03', 'Haberler', '20171027-H-SERHAN-OZKAN-EMDR03.jpg', '02.11.17 16:15:04'),
(595, '20171027_H_SERHAN_ÖZKAN_EMDR04', 'Haberler', '20171027-H-SERHAN-OZKAN-EMDR04.jpg', '02.11.17 16:16:20'),
(596, '20171027_H-PENFRIENDS', 'Haberler', '20171027-H-PENFRIENDS.jpg', '02.11.17 17:44:23'),
(597, '20171027_H-PENFRIENDS01', 'Haberler', '20171027-H-PENFRIENDS01.jpg', '02.11.17 17:44:38'),
(598, '20171027_H-PENFRIENDS03', 'Haberler', '20171027-H-PENFRIENDS03.jpg', '02.11.17 17:44:54'),
(599, '20171027_H-PENFRIENDS04', 'Haberler', '20171027-H-PENFRIENDS04.jpg', '02.11.17 17:45:08'),
(600, '20171027_H-PENFRIENDS05', 'Haberler', '20171027-H-PENFRIENDS05.jpg', '02.11.17 17:45:22'),
(601, '20171027_H-PENFRIENDS06', 'Haberler', '20171027-H-PENFRIENDS06.jpg', '02.11.17 17:45:40'),
(602, '20171027_H-PENFRIENDS07', 'Haberler', '20171027-H-PENFRIENDS07.jpg', '02.11.17 17:46:02'),
(603, '20171027_H-PENFRIENDS08', 'Haberler', '20171027-H-PENFRIENDS08.jpg', '02.11.17 17:46:16'),
(604, '20171027_H-PENFRIENDS09', 'Haberler', '20171027-H-PENFRIENDS09.jpg', '02.11.17 17:46:29'),
(605, 'Cumhuriyet Bayrami_20171029_01', 'Galeri', 'Cumhuriyet-Bayrami-20171029-01.jpg', '02.11.17 17:47:41'),
(606, '20171030_H_CUMHURİYET_BAYRAMI', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI.jpg', '02.11.17 18:13:27'),
(607, '20171030_H_CUMHURİYET_BAYRAMI01', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI01.jpg', '02.11.17 18:13:42'),
(608, '20171030_H_CUMHURİYET_BAYRAMI02', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI02.jpg', '02.11.17 18:14:01'),
(609, '20171030_H_CUMHURİYET_BAYRAMI03', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI03.jpg', '02.11.17 18:14:16'),
(610, '20171030_H_CUMHURİYET_BAYRAMI04', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI04.jpg', '02.11.17 18:14:31'),
(611, '20171030_H_CUMHURİYET_BAYRAMI05', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI05.jpg', '02.11.17 18:14:46'),
(612, '20171030_H_CUMHURİYET_BAYRAMI06', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI06.jpg', '02.11.17 18:15:03'),
(613, '20171030_H_CUMHURİYET_BAYRAMI07', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI07.jpg', '02.11.17 18:15:22'),
(614, '20171030_H_CUMHURİYET_BAYRAMI08', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI08.jpg', '02.11.17 18:15:35'),
(615, '20171030_H_CUMHURİYET_BAYRAMI09', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI09.jpg', '02.11.17 18:15:52'),
(616, '20171030_H_CUMHURİYET_BAYRAMI10', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI10.jpg', '02.11.17 18:16:11'),
(617, '20171030_H_CUMHURİYET_BAYRAMI11', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI11.jpg', '02.11.17 18:16:30'),
(618, '20171030_H_CUMHURİYET_BAYRAMI12', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI12.jpg', '02.11.17 18:16:46'),
(619, '20171030_H_CUMHURİYET_BAYRAMI13', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI13.jpg', '02.11.17 18:17:04'),
(620, '20171030_H_CUMHURİYET_BAYRAMI14', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI14.jpg', '02.11.17 18:17:27'),
(621, '20171030_H_CUMHURİYET_BAYRAMI15', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI15.jpg', '02.11.17 18:17:45'),
(622, '20171030_H_CUMHURİYET_BAYRAMI16', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI16.jpg', '02.11.17 18:18:30'),
(623, '20171030_H_CUMHURİYET_BAYRAMI17', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI17.jpg', '02.11.17 18:18:51'),
(624, '20171030_H_CUMHURİYET_BAYRAMI19', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI19.jpg', '02.11.17 18:19:35'),
(625, '20171030_H_CUMHURİYET_BAYRAMI20', 'Haberler', '20171030-H-CUMHURIYET-BAYRAMI20.jpg', '02.11.17 18:20:07'),
(626, '20171018_H_HAFIZA_TEKNİKLERİ', 'Haberler', '20171018-H-HAFIZA-TEKNIKLERI.jpg', '03.11.17 11:06:00'),
(627, '20171018_H_HAFIZA_TEKNİKLERİ01', 'Haberler', '20171018-H-HAFIZA-TEKNIKLERI01.jpg', '03.11.17 11:06:21'),
(628, '20171018_H_HAFIZA_TEKNİKLERİ02', 'Haberler', '20171018-H-HAFIZA-TEKNIKLERI02.jpg', '03.11.17 11:06:38'),
(629, '20171018_H_HAFIZA_TEKNİKLERİ03', 'Haberler', '20171018-H-HAFIZA-TEKNIKLERI03.jpg', '03.11.17 11:07:04'),
(630, '20171018_H_HAFIZA_TEKNİKLERİ04', 'Haberler', '20171018-H-HAFIZA-TEKNIKLERI04.jpg', '03.11.17 11:08:46'),
(631, '20171018_H_HAFIZA_TEKNİKLERİ05', 'Haberler', '20171018-H-HAFIZA-TEKNIKLERI05.jpg', '03.11.17 11:09:04'),
(632, '20171005_H_HAYRETTİN_KARACA_PARKI', 'Haberler', '20171005-H-HAYRETTIN-KARACA-PARKI.jpg', '06.11.17 10:19:06'),
(633, '20171005_H_HAYRETTİN_KARACA_PARKI01', 'Haberler', '20171005-H-HAYRETTIN-KARACA-PARKI01.jpg', '06.11.17 10:19:22'),
(634, '20171005_H_HAYRETTİN_KARACA_PARKI02', 'Haberler', '20171005-H-HAYRETTIN-KARACA-PARKI02.jpg', '06.11.17 10:19:42'),
(635, '20171005_H_HAYRETTİN_KARACA_PARKI03', 'Haberler', '20171005-H-HAYRETTIN-KARACA-PARKI03.jpg', '06.11.17 10:20:03'),
(636, '20171005_H_HAYRETTİN_KARACA_PARKI04', 'Haberler', '20171005-H-HAYRETTIN-KARACA-PARKI04.jpg', '06.11.17 10:20:22'),
(637, '20171005_H_HAYRETTİN_KARACA_PARKI05', 'Haberler', '20171005-H-HAYRETTIN-KARACA-PARKI05.jpg', '06.11.17 10:20:48'),
(638, '201071106_H_YANGIN_TATBİKATI', 'Haberler', '201071106-H-YANGIN-TATBIKATI.jpg', '06.11.17 18:01:58'),
(639, '201071106_H_YANGIN_TATBİKATI01', 'Haberler', '201071106-H-YANGIN-TATBIKATI01.jpg', '06.11.17 18:02:49'),
(640, '201071106_H_YANGIN_TATBİKATI02', 'Haberler', '201071106-H-YANGIN-TATBIKATI02.jpg', '06.11.17 18:03:53'),
(641, '201071106_H_YANGIN_TATBİKATI04', 'Haberler', '201071106-H-YANGIN-TATBIKATI04.jpg', '06.11.17 18:04:37'),
(642, '201071106_H_YANGIN_TATBİKATI06', 'Haberler', '201071106-H-YANGIN-TATBIKATI06.jpg', '06.11.17 18:06:14'),
(643, '201071106_H_YANGIN_TATBİKATI07', 'Haberler', '201071106-H-YANGIN-TATBIKATI07.jpg', '06.11.17 18:08:17'),
(644, '20171101_H_SÜRPRİZ_BALIK_TİYATRO', 'Haberler', '20171101-H-SURPRIZ-BALIK-TIYATRO.jpg', '07.11.17 11:23:17'),
(645, '20171101_H_SÜRPRİZ_BALIK_TİYATRO01', 'Haberler', '20171101-H-SURPRIZ-BALIK-TIYATRO01.jpg', '07.11.17 11:23:33'),
(646, '20171101_H_SÜRPRİZ_BALIK_TİYATRO02', 'Haberler', '20171101-H-SURPRIZ-BALIK-TIYATRO02.jpg', '07.11.17 11:24:04'),
(647, '20171101_H_SÜRPRİZ_BALIK_TİYATRO03', 'Haberler', '20171101-H-SURPRIZ-BALIK-TIYATRO03.jpg', '07.11.17 11:24:58'),
(648, '20171102_H_GÖREVİMİZ_UZAY', 'Haberler', '20171102-H-GOREVIMIZ-UZAY.jpg', '07.11.17 11:29:13'),
(651, '20171102_H_GÖREVİMİZ_UZAY02', 'Haberler', '20171102-H-GOREVIMIZ-UZAY02.jpg', '07.11.17 12:22:54'),
(652, 'Arda Senyayla', 'Kadro', 'Arda-Senyayla.jpg', '19.11.17 22:45:41'),
(653, 'Ayse Akgun', 'Kadro', 'Ayse-Akgun.jpg', '19.11.17 22:45:53'),
(654, 'Ayse Zisan Gurler', 'Kadro', 'Ayse-Zisan-Gurler.jpg', '19.11.17 22:46:07'),
(655, 'Dilek Deniz', 'Kadro', 'Dilek-Deniz.jpg', '19.11.17 22:46:20'),
(656, 'Ebru Ozeker', 'Kadro', 'Ebru-Ozeker.jpg', '19.11.17 22:46:35'),
(657, 'Gonca Turkem', 'Kadro', 'Gonca-Turkem.jpg', '19.11.17 22:46:49'),
(658, 'Gulistan Ozbilgin', 'Kadro', 'Gulistan-Ozbilgin.jpg', '19.11.17 22:47:00'),
(659, 'Gulnur Ilhan', 'Kadro', 'Gulnur-Ilhan.jpg', '19.11.17 22:47:19'),
(660, 'Gulseren Kamisli', 'Kadro', 'Gulseren-Kamisli.jpg', '19.11.17 22:47:32'),
(661, 'Hale Mengukaan', 'Kadro', 'Hale-Mengukaan.jpg', '19.11.17 22:47:44'),
(662, 'Halime Hande Polatkal', 'Kadro', 'Halime-Hande-Polatkal.jpg', '19.11.17 22:48:07'),
(663, 'Husne Kilci', 'Kadro', 'Husne-Kilci.jpg', '19.11.17 22:48:46'),
(664, 'Meryem Caylak', 'Kadro', 'Meryem-Caylak.jpg', '19.11.17 22:49:03'),
(665, 'Oya Badat', 'Kadro', 'Oya-Badat.jpg', '19.11.17 22:49:57'),
(666, 'Seda Ayca Arslan', 'Kadro', 'Seda-Ayca-Arslan.jpg', '19.11.17 22:50:12'),
(667, 'Zeliha Tekin Kose', 'Kadro', 'Zeliha-Tekin-Kose.jpg', '19.11.17 22:50:34'),
(668, 'Ayşegül Pehlivanlı', 'Kadro', 'Aysegul-Pehlivanli.jpg', '19.11.17 22:53:11'),
(669, 'Burcu Yıldız Aydın', 'Kadro', 'Burcu-Yildiz-Aydin.jpg', '19.11.17 22:55:16'),
(670, 'Derya Meral', 'Kadro', 'Derya-Meral.jpg', '19.11.17 22:56:40'),
(671, 'Döne Yasan', 'Kadro', 'Done-Yasan.jpg', '19.11.17 22:57:35'),
(672, '10 Kasım Mesaj', 'Banner', '10-Kasim-Mesaj.jpeg', '21.11.17 19:36:07'),
(673, 'Burcu Baykal', 'Kadro', 'Burcu-Baykal.jpg', '21.11.17 19:52:34'),
(674, 'Can Özdemir', 'Kadro', 'Can-Ozdemir.jpg', '21.11.17 19:52:57'),
(675, 'Elif Bilen', 'Kadro', 'Elif-Bilen.jpg', '21.11.17 19:53:52'),
(676, 'Figen Korhan', 'Kadro', 'Figen-Korhan.jpg', '21.11.17 19:55:08'),
(677, 'Hakan Gülle', 'Kadro', 'Hakan-Gulle.jpg', '21.11.17 19:55:59'),
(678, 'İlkay Şahin', 'Kadro', 'Ilkay-Sahin.jpg', '21.11.17 19:57:06'),
(679, 'Mehmet Demirbaş', 'Kadro', 'Mehmet-Demirbas.jpg', '21.11.17 19:58:05'),
(680, 'Mehtap Nur Bitmez', 'Kadro', 'Mehtap-Nur-Bitmez.jpg', '21.11.17 19:58:38'),
(681, 'Merve Özcan Kurt', 'Kadro', 'Merve-Ozcan-Kurt.jpg', '21.11.17 19:59:00'),
(682, 'Muhittin Özgün', 'Kadro', 'Muhittin-Ozgun.jpg', '21.11.17 19:59:30'),
(683, 'Mutlu Dereli', 'Kadro', 'Mutlu-Dereli.jpg', '21.11.17 19:59:55'),
(684, 'Nejla Ocal', 'Kadro', 'Nejla-Ocal.jpg', '21.11.17 20:00:36'),
(685, 'Nuray Altıner', 'Kadro', 'Nuray-Altiner.jpg', '21.11.17 20:01:11'),
(686, 'Olcay Cengiz', 'Kadro', 'Olcay-Cengiz.jpg', '21.11.17 20:01:43'),
(687, 'Senem Mırçık', 'Kadro', 'Senem-Mircik.jpg', '21.11.17 20:04:14'),
(688, 'Yasemin Yeşilkaya', 'Kadro', 'Yasemin-Yesilkaya.jpg', '21.11.17 20:05:03'),
(689, 'Zülal Tarakçıoğlu', 'Kadro', 'Zulal-Tarakcioglu.jpg', '21.11.17 20:05:50'),
(690, 'Gonca Duman', 'Kadro', 'Gonca-Duman.jpg', '21.11.17 20:35:43'),
(691, 'Mavi Dumankaya', 'Kadro', 'Mavi-Dumankaya.jpg', '21.11.17 20:35:59'),
(692, 'Zeynep Erkan', 'Kadro', 'Zeynep-Erkan.jpg', '21.11.17 20:36:17'),
(693, 'Ayla Aydoğdu', 'Kadro', 'Ayla-Aydogdu.jpg', '21.11.17 20:36:28'),
(694, 'Nur Okçu', 'Kadro', 'Nur-Okcu.jpg', '21.11.17 20:36:51'),
(695, 'Çiğdem Mayda', 'Kadro', 'Cigdem-Mayda.jpg', '21.11.17 20:37:08'),
(696, 'Yasemin Doğan', 'Kadro', 'Yasemin-Dogan.jpg', '21.11.17 20:37:27'),
(697, 'Yeşim Çağlar', 'Kadro', 'Yesim-Caglar.jpg', '21.11.17 20:37:37'),
(698, 'Serap İlikli', 'Kadro', 'Serap-Ilikli.jpg', '21.11.17 20:37:51'),
(699, 'Fatma Tekin', 'Kadro', 'Fatma-Tekin.jpg', '21.11.17 21:34:39'),
(700, 'Gülseren Saylam', 'Kadro', 'Gulseren-Saylam.jpg', '21.11.17 21:35:17'),
(701, 'Dilşad İncedal', 'Kadro', 'Dilsad-Incedal.jpg', '21.11.17 21:36:40'),
(702, 'Güzin Namlı', 'Kadro', 'Guzin-Namli.jpg', '21.11.17 21:37:59'),
(703, 'Akreditasyon Belgeleri 1', 'Genel', 'Akreditasyon-Belgeleri-1.jpeg', '21.11.17 22:21:53'),
(704, 'Akreditasyon Belgeleri 2', 'Genel', 'Akreditasyon-Belgeleri-2.jpeg', '21.11.17 22:22:06'),
(705, 'Akreditasyon Belgeleri 3', 'Genel', 'Akreditasyon-Belgeleri-3.jpeg', '21.11.17 22:22:16');
INSERT INTO `genel_resimler` (`No`, `RIsim`, `RKategoriler`, `RDosya`, `RTarih`) VALUES
(706, '20171104_H_MEŞE_PALAMUDU', 'Haberler', '20171104-H-MESE-PALAMUDU.jpg', '22.11.17 13:48:18'),
(707, '20171106_H_YANGIN _TATBİKATI', 'Haberler', '20171106-H-YANGIN-TATBIKATI.jpg', '22.11.17 14:19:28'),
(708, '20171106_H_YANGIN _TATBİKATI1', 'Haberler', '20171106-H-YANGIN-TATBIKATI1.jpg', '22.11.17 14:19:44'),
(709, '20171106_H_YANGIN _TATBİKATI2', 'Haberler', '20171106-H-YANGIN-TATBIKATI2.jpg', '22.11.17 14:20:26'),
(710, '20171106_H_YANGIN _TATBİKATI3', 'Haberler', '20171106-H-YANGIN-TATBIKATI3.jpg', '22.11.17 14:21:29'),
(711, '20171106_H_YANGIN _TATBİKATI4', 'Haberler', '20171106-H-YANGIN-TATBIKATI4.jpg', '22.11.17 14:22:35'),
(712, '20171106_H_YANGIN _TATBİKATI5', 'Haberler', '20171106-H-YANGIN-TATBIKATI5.jpg', '22.11.17 14:22:58'),
(713, 'YANGIN', 'Haberler', 'YANGIN.jpg', '22.11.17 14:42:27'),
(715, 'Ayşegül Azman', 'Kadro', 'Aysegul-Azman.jpg', '22.11.17 19:27:02'),
(716, 'Füsun Akıntı', 'Kadro', 'Fusun-Akinti.jpg', '22.11.17 19:27:37'),
(717, 'Yasemin Dekli', 'Kadro', 'Yasemin-Dekli.jpg', '22.11.17 19:28:10'),
(718, '20171104_H_MEŞE_PALAMUDU2', 'Haberler', '20171104-H-MESE-PALAMUDU2.jpg', '23.11.17 11:02:08'),
(719, '20171104_H_MEŞE_PALAMUDU2', 'Haberler', '20171104-H-MESE-PALAMUDU2.jpg', '23.11.17 12:51:25'),
(720, '20171104_H_MEŞE_PALAMUDU', 'Haberler', '20171104-H-MESE-PALAMUDU.jpg', '23.11.17 12:53:02'),
(721, '20171104_H_MEŞE_PALAMUDU3', 'Haberler', '20171104-H-MESE-PALAMUDU3.jpg', '23.11.17 12:54:44'),
(722, '20171104_H_MEŞE_PALAMUDU4', 'Haberler', '20171104-H-MESE-PALAMUDU4.jpg', '23.11.17 12:55:02'),
(723, '20171104_H_MEŞE_PALAMUDU5', 'Haberler', '20171104-H-MESE-PALAMUDU5.jpg', '23.11.17 12:55:18'),
(724, '20171104_H_MEŞE_PALAMUDU6', 'Haberler', '20171104-H-MESE-PALAMUDU6.jpg', '23.11.17 12:55:33'),
(725, '20171104_H_MEŞE_PALAMUDU7', 'Haberler', '20171104-H-MESE-PALAMUDU7.jpg', '23.11.17 12:55:55'),
(726, '20171104_H_MEŞE_PALAMUDU8', 'Haberler', '20171104-H-MESE-PALAMUDU8.jpg', '23.11.17 12:56:10'),
(727, '20171121_H_AYIN KİTABI', 'Haberler', '20171121-H-AYIN-KITABI.jpg', '23.11.17 13:00:04'),
(728, '20171121_H_AYIN KİTABI1', 'Haberler', '20171121-H-AYIN-KITABI1.jpg', '23.11.17 13:00:19'),
(729, '20171121_H_AYIN KİTABI2', 'Haberler', '20171121-H-AYIN-KITABI2.jpg', '23.11.17 13:00:35'),
(730, '20171121_H_AYIN KİTABI3', 'Haberler', '20171121-H-AYIN-KITABI3.jpg', '23.11.17 13:00:51'),
(731, '20171121_H_AYIN KİTABI4', 'Haberler', '20171121-H-AYIN-KITABI4.jpg', '23.11.17 13:01:43'),
(732, '20171121_H_AYIN KİTABI5', 'Haberler', '20171121-H-AYIN-KITABI5.jpg', '23.11.17 13:02:01'),
(733, '20171117_H_ERKEKLERDE_ERGENLİK', 'Haberler', '20171117-H-ERKEKLERDE-ERGENLIK.jpg', '23.11.17 13:07:25'),
(734, '20171117_H_ERKEKLERDE_ERGENLİK1', 'Haberler', '20171117-H-ERKEKLERDE-ERGENLIK1.jpg', '23.11.17 13:07:48'),
(735, '20171117_H_ERKEKLERDE_ERGENLİK2', 'Haberler', '20171117-H-ERKEKLERDE-ERGENLIK2.jpg', '23.11.17 13:09:07'),
(736, '20171117_H_ERKEKLERDE_ERGENLİK3', 'Haberler', '20171117-H-ERKEKLERDE-ERGENLIK3.jpg', '23.11.17 13:09:25'),
(737, '20171117_H_ERKEKLERDE_ERGENLİK4', 'Haberler', '20171117-H-ERKEKLERDE-ERGENLIK4.jpg', '23.11.17 13:10:02'),
(738, '20171120_H_ÇOCUK_HAKLARI_GÜNÜ', 'Haberler', '20171120-H-COCUK-HAKLARI-GUNU.jpg', '23.11.17 13:17:49'),
(739, '20171120_H_ÇOCUK_HAKLARI_GÜNÜ1', 'Haberler', '20171120-H-COCUK-HAKLARI-GUNU1.jpg', '23.11.17 13:18:08'),
(740, '20171104_H_KIZ_ÖĞRENCİLER_ERGENLİK', 'Haberler', '20171104-H-KIZ-OGRENCILER-ERGENLIK.jpg', '23.11.17 14:32:13'),
(741, '20171104_H_KIZ_ÖĞRENCİLER_ERGENLİK1', 'Haberler', '20171104-H-KIZ-OGRENCILER-ERGENLIK1.jpg', '23.11.17 14:35:15'),
(742, '20171104_H_KIZ_ÖĞRENCİLER_ERGENLİK2', 'Haberler', '20171104-H-KIZ-OGRENCILER-ERGENLIK2.jpg', '23.11.17 14:35:47'),
(743, '20171104_H_KIZ_ÖĞRENCİLER_ERGENLİK3', 'Haberler', '20171104-H-KIZ-OGRENCILER-ERGENLIK3.jpg', '23.11.17 14:37:40'),
(744, '20171104_H_KIZ_ÖĞRENCİLER_ERGENLİK4', 'Haberler', '20171104-H-KIZ-OGRENCILER-ERGENLIK4.jpg', '23.11.17 14:39:19'),
(745, '20171104_H_KIZ_ÖĞRENCİLER_ERGENLİK5', 'Haberler', '20171104-H-KIZ-OGRENCILER-ERGENLIK5.jpg', '23.11.17 14:41:44'),
(746, '20171115_H_ANITKABİR', 'Haberler', '20171115-H-ANITKABIR.jpg', '23.11.17 14:46:58'),
(747, '20171115_H_ANITKABİR1', 'Haberler', '20171115-H-ANITKABIR1.jpg', '23.11.17 14:47:37'),
(748, '20171115_H_ANITKABİR2', 'Haberler', '20171115-H-ANITKABIR2.jpg', '23.11.17 14:48:13'),
(749, '20171115_H_ANITKABİR3', 'Haberler', '20171115-H-ANITKABIR3.jpg', '23.11.17 14:48:43'),
(750, '20171115_H_ANITKABİR4', 'Haberler', '20171115-H-ANITKABIR4.jpg', '23.11.17 14:50:32'),
(751, '20171115_H_ANITKABİR5', 'Haberler', '20171115-H-ANITKABIR5.jpg', '23.11.17 14:52:15'),
(752, '20171115_H_ANITKABİR6', 'Haberler', '20171115-H-ANITKABIR6.jpg', '23.11.17 15:13:18'),
(753, 'Aek_Logo', 'Duyurular', 'Aek-Logo.png', '24.11.17 19:35:39'),
(754, '20171114_İNGİLİZCE_3.SINIF', 'Haberler', '20171114-INGILIZCE-3-SINIF.jpg', '27.11.17 17:44:36'),
(755, '20171114_İNGİLİZCE_3.SINIF', 'Haberler', '20171114-INGILIZCE-3-SINIF1.jpg', '27.11.17 17:44:50'),
(756, '20171114_İNGİLİZCE_3.SINIF1', 'Haberler', '20171114-INGILIZCE-3-SINIF11.jpg', '27.11.17 17:45:09'),
(757, '20171114_İNGİLİZCE_3.SINIF2', 'Haberler', '20171114-INGILIZCE-3-SINIF2.jpg', '27.11.17 17:45:48'),
(758, '20171114_İNGİLİZCE_3.SINIF3', 'Haberler', '20171114-INGILIZCE-3-SINIF3.jpg', '27.11.17 17:46:25'),
(759, '20171114_İNGİLİZCE_3.SINIF4', 'Haberler', '20171114-INGILIZCE-3-SINIF4.jpg', '27.11.17 17:47:14'),
(760, '20171114_İNGİLİZCE_3.SINIF5', 'Haberler', '20171114-INGILIZCE-3-SINIF5.jpg', '27.11.17 17:47:52'),
(761, '20171110_ATAMIZI_ANMA', 'Haberler', '20171110-ATAMIZI-ANMA.jpg', '27.11.17 17:52:32'),
(762, '20171110_ATAMIZI_ANMA1', 'Haberler', '20171110-ATAMIZI-ANMA1.jpg', '27.11.17 17:53:11'),
(763, '20171110_ATAMIZI_ANMA2', 'Haberler', '20171110-ATAMIZI-ANMA2.jpg', '27.11.17 18:18:48'),
(765, '20171110_ATAMIZI_ANMA3', 'Haberler', '20171110-ATAMIZI-ANMA3.jpg', '28.11.17 14:00:53'),
(766, '20171110_ATAMIZI_ANMA4', 'Haberler', '20171110-ATAMIZI-ANMA4.jpg', '28.11.17 14:02:03'),
(767, '20171110_ATAMIZI_ANMA4', 'Haberler', '20171110-ATAMIZI-ANMA4.jpg', '28.11.17 14:03:05'),
(768, '20171110_ATAMIZI_ANMA5', 'Haberler', '20171110-ATAMIZI-ANMA5.jpg', '28.11.17 14:03:31'),
(769, '20171110_ATAMIZI_ANMA6', 'Haberler', '20171110-ATAMIZI-ANMA6.jpg', '28.11.17 14:03:57'),
(770, '20171127_KERMES_ORTAOKUL', 'Haberler', '20171127-KERMES-ORTAOKUL.jpg', '28.11.17 14:08:17'),
(771, '20171127_KERMES_ORTAOKUL1', 'Haberler', '20171127-KERMES-ORTAOKUL1.jpg', '28.11.17 14:08:35'),
(772, '20171127_KERMES_ORTAOKUL2', 'Haberler', '20171127-KERMES-ORTAOKUL2.jpg', '28.11.17 14:08:54'),
(773, '20171127_KERMES_ORTAOKUL3', 'Haberler', '20171127-KERMES-ORTAOKUL3.jpg', '28.11.17 14:09:33'),
(774, '20171127_KERMES_ORTAOKUL4', 'Haberler', '20171127-KERMES-ORTAOKUL4.jpg', '28.11.17 14:10:05'),
(775, '20171127_KERMES_ORTAOKUL5', 'Haberler', '20171127-KERMES-ORTAOKUL5.jpg', '28.11.17 14:10:25'),
(776, '20171127_KERMES_ORTAOKUL6', 'Haberler', '20171127-KERMES-ORTAOKUL6.jpg', '28.11.17 14:11:00'),
(777, '20171127_KERMES_ORTAOKUL7', 'Haberler', '20171127-KERMES-ORTAOKUL7.jpg', '28.11.17 14:11:46'),
(778, '20171127_KERMES_ORTAOKUL8', 'Haberler', '20171127-KERMES-ORTAOKUL8.jpg', '28.11.17 14:12:33'),
(779, '20171127_KERMES_ORTAOKUL9', 'Haberler', '20171127-KERMES-ORTAOKUL9.jpg', '28.11.17 14:13:26'),
(780, '20171124_H_OYUNCAK_MÜZESİ', 'Haberler', '20171124-H-OYUNCAK-MUZESI.jpg', '28.11.17 14:19:18'),
(781, '20171124_H_OYUNCAK_MÜZESİ1', 'Haberler', '20171124-H-OYUNCAK-MUZESI1.jpg', '28.11.17 14:21:54'),
(782, '20171124_H_OYUNCAK_MÜZESİ2', 'Haberler', '20171124-H-OYUNCAK-MUZESI2.jpg', '28.11.17 14:23:11'),
(783, '20171124_H_OYUNCAK_MÜZESİ3', 'Haberler', '20171124-H-OYUNCAK-MUZESI3.jpg', '28.11.17 14:25:20'),
(784, '20171124_H_OYUNCAK_MÜZESİ4', 'Haberler', '20171124-H-OYUNCAK-MUZESI4.jpg', '28.11.17 14:25:49'),
(785, '20171124_H_OYUNCAK_MÜZESİ5', 'Haberler', '20171124-H-OYUNCAK-MUZESI5.jpg', '28.11.17 14:26:27'),
(786, '20171124_H_OYUNCAK_MÜZESİ6', 'Haberler', '20171124-H-OYUNCAK-MUZESI6.jpg', '28.11.17 14:26:54'),
(787, '20171124_H_İNG.ÖĞRETMENLER_GÜNÜ', 'Haberler', '20171124-H-ING-OGRETMENLER-GUNU.jpg', '28.11.17 15:16:42'),
(788, '20171122_H-CERN_KONFERANSI', 'Haberler', '20171122-H-CERN-KONFERANSI.jpg', '28.11.17 16:03:35'),
(789, '20171122_H-CERN_KONFERANSI1', 'Haberler', '20171122-H-CERN-KONFERANSI1.jpg', '28.11.17 16:04:16'),
(790, '20171122_H-CERN_KONFERANSI2', 'Haberler', '20171122-H-CERN-KONFERANSI2.jpg', '28.11.17 16:04:54'),
(791, '20171122_H-CERN_KONFERANSI3', 'Haberler', '20171122-H-CERN-KONFERANSI3.jpg', '28.11.17 16:05:18'),
(792, '20171122_H-CERN_KONFERANSI4', 'Haberler', '20171122-H-CERN-KONFERANSI4.jpg', '28.11.17 16:05:41'),
(793, '20171124_H_ESKİ_TBMM_ANAOKULU', 'Haberler', '20171124-H-ESKI-TBMM-ANAOKULU.jpg', '28.11.17 17:33:01'),
(794, '20171124_H_ESKİ_TBMM_ANAOKULU1', 'Haberler', '20171124-H-ESKI-TBMM-ANAOKULU1.jpg', '28.11.17 17:33:22'),
(795, '20171124_H_ESKİ_TBMM_ANAOKULU2', 'Haberler', '20171124-H-ESKI-TBMM-ANAOKULU2.jpg', '28.11.17 17:33:46'),
(796, '20171124_H_ESKİ_TBMM_ANAOKULU3', 'Haberler', '20171124-H-ESKI-TBMM-ANAOKULU3.jpg', '28.11.17 17:34:02'),
(797, '20171124_H_ESKİ_TBMM_ANAOKULU4', 'Haberler', '20171124-H-ESKI-TBMM-ANAOKULU4.jpg', '28.11.17 17:34:23'),
(798, '20171124_H_ESKİ_TBMM_ANAOKULU5', 'Haberler', '20171124-H-ESKI-TBMM-ANAOKULU5.jpg', '28.11.17 17:34:38'),
(799, '20171124_H_ÖĞRETMENLER_GÜNÜ', 'Haberler', '20171124-H-OGRETMENLER-GUNU.jpg', '28.11.17 17:38:32'),
(800, '20171124_H_ÖĞRETMENLER_GÜNÜ', 'Haberler', '20171124-H-OGRETMENLER-GUNU.jpg', '28.11.17 17:45:15'),
(801, '20171124_H_ÖĞRETMENLER_GÜNÜ1', 'Haberler', '20171124-H-OGRETMENLER-GUNU1.jpg', '28.11.17 17:45:52'),
(802, '20171124_H_ÖĞRETMENLER_GÜNÜ2', 'Haberler', '20171124-H-OGRETMENLER-GUNU2.jpg', '28.11.17 17:46:33'),
(803, '20171124_H_ÖĞRETMENLER_GÜNÜ3', 'Haberler', '20171124-H-OGRETMENLER-GUNU3.jpg', '28.11.17 17:47:12'),
(804, '20171124_H_ÖĞRETMENLER_GÜNÜ1', 'Haberler', '20171124-H-OGRETMENLER-GUNU11.jpg', '29.11.17 10:03:30'),
(805, '20171124_H_ÖĞRETMENLER_GÜNÜ', 'Haberler', '20171124-H-OGRETMENLER-GUNU4.jpg', '29.11.17 11:50:34'),
(806, '20171124_H_ÖĞRETMENLER_GÜNÜ4', 'Haberler', '20171124-H-OGRETMENLER-GUNU41.jpg', '29.11.17 12:26:33'),
(807, '20171124_H_ÖĞRETMENLER_GÜNÜ5', 'Haberler', '20171124-H-OGRETMENLER-GUNU5.jpg', '29.11.17 13:59:49'),
(808, '20171124_H_ÖĞRETMENLER_GÜNÜ6', 'Haberler', '20171124-H-OGRETMENLER-GUNU6.jpg', '29.11.17 14:00:38'),
(809, '20171124_H_ÖĞRETMENLER_GÜNÜ7', 'Haberler', '20171124-H-OGRETMENLER-GUNU7.jpg', '29.11.17 14:01:25'),
(810, '20171124_H_ÖĞRETMENLER_GÜNÜ8', 'Haberler', '20171124-H-OGRETMENLER-GUNU8.jpg', '29.11.17 14:02:13'),
(811, '20171122_H_İLÇE_OKUL_MECLİS_BAŞKANLIĞI', 'Haberler', '20171122-H-ILCE-OKUL-MECLIS-BASKANLIGI.jpg', '29.11.17 14:15:01'),
(812, '20171122_H_İLÇE_OKUL_MECLİS_BAŞKANLIĞI1', 'Haberler', '20171122-H-ILCE-OKUL-MECLIS-BASKANLIGI1.jpg', '29.11.17 14:15:15'),
(813, '20171122_H_İLÇE_OKUL_MECLİS_BAŞKANLIĞI2', 'Haberler', '20171122-H-ILCE-OKUL-MECLIS-BASKANLIGI2.jpg', '29.11.17 14:15:30'),
(814, '20171122_H_İLÇE_OKUL_MECLİS_BAŞKANLIĞI3', 'Haberler', '20171122-H-ILCE-OKUL-MECLIS-BASKANLIGI3.jpg', '29.11.17 14:15:45'),
(815, '20171122_H_İLÇE_OKUL_MECLİS_BAŞKANLIĞI4', 'Haberler', '20171122-H-ILCE-OKUL-MECLIS-BASKANLIGI4.jpg', '29.11.17 14:16:07'),
(816, 'deneme_1', 'Haberler', 'deneme-1.jpg', '29.11.17 14:53:58'),
(817, '20171114_H_TÜRK_TELEKOM_MÜZESİ', 'Haberler', '20171114-H-TURK-TELEKOM-MUZESI.jpg', '29.11.17 18:05:05'),
(818, '20171114_H_TÜRK_TELEKOM_MÜZESİ1', 'Haberler', '20171114-H-TURK-TELEKOM-MUZESI1.jpg', '29.11.17 18:05:25'),
(819, '20171114_H_TÜRK_TELEKOM_MÜZESİ2', 'Haberler', '20171114-H-TURK-TELEKOM-MUZESI2.jpg', '29.11.17 18:05:41'),
(820, '20171114_H_TÜRK_TELEKOM_MÜZESİ4', 'Haberler', '20171114-H-TURK-TELEKOM-MUZESI4.jpg', '29.11.17 18:05:59'),
(821, '20171114_H_TÜRK_TELEKOM_MÜZESİ5', 'Haberler', '20171114-H-TURK-TELEKOM-MUZESI5.jpg', '29.11.17 18:06:15'),
(822, '20171114_H_TÜRK_TELEKOM_MÜZESİ6', 'Haberler', '20171114-H-TURK-TELEKOM-MUZESI6.jpg', '29.11.17 18:06:38'),
(823, '20171113_H_KİTAP_ANLATIMI', 'Haberler', '20171113-H-KITAP-ANLATIMI.jpg', '29.11.17 18:10:37'),
(824, '20171113_H_KİTAP_ANLATIMI1', 'Haberler', '20171113-H-KITAP-ANLATIMI1.jpg', '29.11.17 18:10:53'),
(825, '20171113_H_KİTAP_ANLATIMI2', 'Haberler', '20171113-H-KITAP-ANLATIMI2.jpg', '29.11.17 18:11:09'),
(826, '20171113_H_KİTAP_ANLATIMI3', 'Haberler', '20171113-H-KITAP-ANLATIMI3.jpg', '29.11.17 18:11:23'),
(827, '20171113_H_KİTAP_ANLATIMI4', 'Haberler', '20171113-H-KITAP-ANLATIMI4.jpg', '29.11.17 18:11:45'),
(828, '20171113_H_KİTAP_ANLATIMI5', 'Haberler', '20171113-H-KITAP-ANLATIMI5.jpg', '29.11.17 18:12:03'),
(829, '20171113_H_ÇEVRE_KİRLİLİĞİ_AFİŞ', 'Haberler', '20171113-H-CEVRE-KIRLILIGI-AFIS.jpg', '29.11.17 18:20:19'),
(830, '20171113_H_ÇEVRE_KİRLİLİĞİ_AFİŞ1', 'Haberler', '20171113-H-CEVRE-KIRLILIGI-AFIS1.jpg', '29.11.17 18:20:36'),
(831, '20171113_H_ÇEVRE_KİRLİLİĞİ_AFİŞ2', 'Haberler', '20171113-H-CEVRE-KIRLILIGI-AFIS2.jpg', '29.11.17 18:20:56'),
(832, '20171113_H_ÇEVRE_KİRLİLİĞİ_AFİŞ3', 'Haberler', '20171113-H-CEVRE-KIRLILIGI-AFIS3.jpg', '29.11.17 18:21:17'),
(833, '20171113_H_ÇEVRE_KİRLİLİĞİ_AFİŞ4', 'Haberler', '20171113-H-CEVRE-KIRLILIGI-AFIS4.jpg', '29.11.17 18:21:37'),
(834, '20171113_H_ÇEVRE_KİRLİLİĞİ_AFİŞ5', 'Haberler', '20171113-H-CEVRE-KIRLILIGI-AFIS5.jpg', '29.11.17 18:22:04'),
(835, '20171103_H_KIZILAY_HAFTASI', 'Haberler', '20171103-H-KIZILAY-HAFTASI.jpg', '29.11.17 18:34:57'),
(836, '20171103_H_KIZILAY_HAFTASI1', 'Haberler', '20171103-H-KIZILAY-HAFTASI1.jpg', '29.11.17 18:35:19'),
(837, '20171103_H_KIZILAY_HAFTASI2', 'Haberler', '20171103-H-KIZILAY-HAFTASI2.jpg', '29.11.17 18:36:12');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_siniflar`
--

DROP TABLE IF EXISTS `genel_siniflar`;
CREATE TABLE IF NOT EXISTS `genel_siniflar` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `Kod` int(2) NOT NULL,
  `Okul` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `genel_siniflar`
--

INSERT INTO `genel_siniflar` (`No`, `Kod`, `Okul`) VALUES
(1, 1, 1),
(6, 2, 1),
(7, 3, 1),
(8, 4, 1),
(9, 5, 2),
(10, 6, 2),
(11, 7, 2),
(12, 8, 2),
(13, 9, 3),
(14, 10, 3),
(15, 11, 3),
(16, 12, 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `genel_subeler`
--

DROP TABLE IF EXISTS `genel_subeler`;
CREATE TABLE IF NOT EXISTS `genel_subeler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `Kod` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Okul` int(11) NOT NULL,
  `Sinif` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `genel_subeler`
--

INSERT INTO `genel_subeler` (`No`, `Kod`, `Okul`, `Sinif`) VALUES
(1, '1-A', 1, 1),
(2, '1-B', 1, 1),
(3, '1-C', 1, 1),
(5, '2-A', 1, 2),
(6, '2-B', 1, 2),
(7, '2-C', 1, 2),
(8, '2-D', 1, 2),
(9, '3-A', 1, 3),
(10, '3-B', 1, 3),
(11, '3-C', 1, 3),
(12, '4-A', 1, 4),
(13, '4-B', 1, 4),
(14, '5-A', 2, 5),
(15, '5-B', 2, 5),
(16, '5-C', 2, 5),
(17, '6-A', 2, 6),
(18, '6-B', 2, 6),
(19, '6-C', 2, 6),
(20, '6-D', 2, 6),
(21, '7-A', 2, 7),
(22, '7-B', 2, 7),
(23, '8-A', 2, 8),
(24, '8-B', 2, 8),
(25, '8-C', 2, 8),
(26, '8-D', 2, 8),
(27, '9-FL-A', 3, 9),
(28, '9-FL-B', 3, 9),
(29, '9-AL-A', 3, 9),
(30, '9-AL-B', 3, 9),
(31, '10-FL-A', 3, 10),
(32, '10-FL-B', 3, 10),
(33, '10-AL-A', 3, 10),
(34, '10-AL-B', 3, 10),
(35, '11-MF-A', 3, 11),
(36, '11-MF-B', 3, 11),
(37, '11-TM-A', 3, 11),
(38, '11-TM-B', 3, 11),
(39, '12-MF-A', 3, 12),
(40, '12-MF-B', 3, 12),
(41, '12-TM-A', 3, 12),
(42, '12-TM-B', 3, 12);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_aylikyemeklistesi`
--

DROP TABLE IF EXISTS `general_aylikyemeklistesi`;
CREATE TABLE IF NOT EXISTS `general_aylikyemeklistesi` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Resim` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Resim` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Okul` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tarih` date NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_aylikyemeklistesi`
--

INSERT INTO `general_aylikyemeklistesi` (`No`, `tr_Baslik`, `en_Baslik`, `tr_Resim`, `en_Resim`, `Okul`, `Tarih`) VALUES
(53, 'Ankara Eğitim Kurumları Ekim - 2017 Ayı Yemek Listesi', '', 'Yemek-Listesi/Yemek-Listesi-Kolej-201710.jpg', '', '3', '2017-10-01'),
(54, 'Ankara Eğitim Kurumları Ekim - 2017 Ayı Yemek Listesi', '', 'Yemek-Listesi/Yemek-Listesi-Kolej-201710.jpg', '', '2', '2017-10-01'),
(55, 'Ankara Eğitim Kurumları Ekim - 2017 Ayı Yemek Listesi', '', 'Yemek-Listesi/Yemek-Listesi-Kolej-201710.jpg', '', '1', '2017-10-01'),
(56, 'Ankara Eğitim Kurumları Ekim 2017 Ayı Yemek Listesi', '', 'Haberler/20171102-H-GOREVIMIZ-UZAY02.jpg', '', '0', '2017-01-01'),
(57, 'Ankara Eğitim Kurumları Kasım - 2017 Ayı Yemek Listesi', '', 'Yemek-Listesi/Yemek-Listesi-Kolej-2017-11.jpg', '', '1', '2017-11-01'),
(58, 'Ankara Eğitim Kurumları Kasım - 2017 Ayı Yemek Listesi', '', 'Yemek-Listesi/Yemek-Listesi-Kolej-2017-11.jpg', '', '2', '2017-11-01'),
(59, 'Ankara Eğitim Kurumları Kasım - 2017 Ayı Yemek Listesi', '', 'Yemek-Listesi/Yemek-Listesi-Kolej-2017-11.jpg', '', '3', '2017-11-01'),
(60, 'Ankara Eğitim Kurumları Kasım - 2017 Anaokulu Yemek Listesi', '', 'Yemek-Listesi/Ankara-Egitim-Kurumlari-Kres-Kasim-2017-Yemek-Listesi.jpg', '', '0', '2017-11-01');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_birimler_idari`
--

DROP TABLE IF EXISTS `general_birimler_idari`;
CREATE TABLE IF NOT EXISTS `general_birimler_idari` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(65) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(65) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Aciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Aciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_birimler_idari`
--

INSERT INTO `general_birimler_idari` (`No`, `tr_Baslik`, `en_Baslik`, `tr_Aciklama`, `en_Aciklama`, `ListOrder`) VALUES
(1, 'Kurumsal İletişim ve Tanıtım', '', 'Kolejimizi öğrenci ve velilere tanıtmaya yönelik etkinlik ve çalışma programları yaparak veli ve öğrencilerle iletişime geçer.', '', 1),
(2, 'İnsan Kaynakları', '', 'Çalışanlarımızın istihdamı ve gereksinimiyle ilgili politika oluşturma, planlama, örgütleme, yönlendirme, denetleme gibi faatliyetleri yürütür.', '', 2),
(3, 'Bilgi Teknolojileri', '', 'Yazılım, internet, grafik, dizgi, baskı, bilgi işlem, akıllı tahta gibi kurumun teknolojik ihtiyaçlarını karşılayan birimdir.', '', 3),
(4, 'Satın Alma', '', 'Kolejimizle ilgili her türlü ihtiyacı teklif usulüyle karşılayan birimdir.', '', 4),
(5, 'Mali İşler', '', 'Kolejin her türlü mali işleyişini yönetir ve çalışanların (öğretmen, araştırmacı, idari personel vb.) ekonomik, finansal, muhasebe gibi işlerini yürütür.', '', 5),
(6, 'Hukuk Birimi', '', 'Eğitim kurumunun her türlü çalışmasının yasa ve mevzuatlara uygunluğunu sağlar ve hukuksal takiplerini yapar.', '', 6),
(7, 'Marka Denetimi', '', 'AEK Ankara Eğitim Kurumları marka tescillidir. Markanın korunması ve geliştirilmesi için çalışmalar yürütür.', '', 7);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_birimler_lojistik_hizmetler`
--

DROP TABLE IF EXISTS `general_birimler_lojistik_hizmetler`;
CREATE TABLE IF NOT EXISTS `general_birimler_lojistik_hizmetler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(65) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(65) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Aciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Aciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_birimler_lojistik_hizmetler`
--

INSERT INTO `general_birimler_lojistik_hizmetler` (`No`, `tr_Baslik`, `en_Baslik`, `tr_Aciklama`, `en_Aciklama`, `ListOrder`) VALUES
(8, 'Okul Servisi', '', 'Profesyonel ve deneyimli kadrosu ile çocuklarımızın en rahat ve güvenilir şekilde ulaşımını sağlamaktadır.', '', 1),
(9, 'Okul Kıyafeti', '', 'Kolejimizin logosunu taşıyan kıyafetlerimiz, öğrencilerimiz için sağlıklı ve rahat ürünlerden tercih edilmiştir. Öğrencilerimiz bu şık kıyafetleri, sadece okulda değil her alanda kullanabililirler.', '', 2),
(10, 'Yemekhane', '', 'Öğrencilerimize sabah kahvaltısı, öğle yemeği ve ikindi kahvaltısı olmak üzere 3 öğünlü beslenme programı uygulamaktayız.\r\n								<br><br>\r\n								<b>Yemeklerimiz ISO 22000 Gıda Güvenliği, ISO 9001 Kalite, ISO 14001 Çevre Yönetim Sistem ve TSE Hizmet Yeterlilik belgelerine sahip üretim merkezinde pişirilir.</b>\r\n								<br><br>\r\n								Okulda yenen yemeklerin eğitimdeki önemini biliyoruz, dengeli ve sağlıklı beslenen çocuklar; dikkatini bir konu üzerinde daha fazla yoğunlaştırabiliyor, anlatılanı daha kolay kavrıyor ve unutmuyorlar. Böylelikle daha kolay öğreniyorlar.\r\n								<br><br>\r\n								Bu sorumluluk ve bilinçle tüm yaş gruplarının severek yiyebileceği kaliteli, sağlıklı yemekler pişiriyoruz.\r\n								<br><br>\r\n								“Yemeğinizin, ham maddeden tabağınıza giden yolcuğuna, lezzet, keyif ve güven katıyoruz. Kalite ve gıda güvenliği yaklaşımımız paralel tedarikçiler ile çalışıyoruz”', '', 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_civogt`
--

DROP TABLE IF EXISTS `general_civogt`;
CREATE TABLE IF NOT EXISTS `general_civogt` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `Okul` int(11) NOT NULL,
  `Sinif` int(11) NOT NULL,
  `Sube` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Ders` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Gun` int(11) NOT NULL,
  `Saat` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Yil` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Donem` int(11) NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_civogt`
--

INSERT INTO `general_civogt` (`No`, `Okul`, `Sinif`, `Sube`, `Ders`, `Gun`, `Saat`, `Yil`, `Donem`, `ListOrder`) VALUES
(23, 1, 1, '1-A', 'biyoloji', 0, '09.25-10.05', '2017-2018', 1, 1),
(24, 1, 1, '2-A', 'cografya', 2, '09.25-10.05', '2017-2018', 1, 2),
(25, 2, 6, '6-A', 'fen-bilimleri', 0, '09.25-10.05', '2017-2018', 1, 3),
(26, 3, 11, '11-A', 'matematik', 5, '09.25-10.05', '2017-2018', 1, 4);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_duyurularetkinlikler`
--

DROP TABLE IF EXISTS `general_duyurularetkinlikler`;
CREATE TABLE IF NOT EXISTS `general_duyurularetkinlikler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_AnaResim` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT '',
  `tr_DigerResimler` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_AnaResim` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT '',
  `en_DigerResimler` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `tr_SectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_SectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Okul` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tarih` date NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=95 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_duyurularetkinlikler`
--

INSERT INTO `general_duyurularetkinlikler` (`No`, `tr_Baslik`, `en_Baslik`, `tr_AnaResim`, `tr_DigerResimler`, `en_AnaResim`, `en_DigerResimler`, `tr_Yazi`, `en_Yazi`, `tr_SectionID`, `en_SectionID`, `Okul`, `Tarih`) VALUES
(70, 'CUMHURİYET BAYRAMI', '', 'Duyurular/Atabayrak.jpg', 'Duyurular/Atabayrak.jpg', '', '', '29 Ekim Cumhuriyet Bayramınız Kutlu Olsun', '', 'CUMHURIYET-BAYRAMI', '', '0,1,2,3', '2017-10-28'),
(74, 'ERGENLİKTE BEDENSEL VE RUHSAL GELİŞİM', '', 'Duyurular/20171103-D-ERGENLIK.jpg', 'Duyurular/20171102-D-ERGENLIK-KIZ01.jpg', '', '', '3 Kasım Cuma saat 15.00’te Jinekolog Doç.Dr.Özlem Uzunlar ve Klinik Psikolog Suphi Tunç 7,8,9,10,11 ve 12. sınıf kız öğrencilerimize “Ergenlikte Bedensel ve Ruhsal Gelişim” konulu seminer verecektir.', '', 'ERGENLIKTE-BEDENSEL-VE-RUHSAL-GELISIM', '', '2,3', '2017-11-02'),
(75, 'YANGIN TATBİKATI', '', 'Duyurular/20171102-YANGIN-TATBIKATI.jpg', 'Duyurular/20171102-YANGIN-TATBIKATI01.jpg', '', '', '6 Kasım 2017 Pazartesi saat 10.30’da yangın tatbikatımız gerçekleşecektir.', '', 'YANGIN-TATBIKATI', '', '1,2,3', '2017-11-02'),
(76, 'ANITKABİR ZİYARETİ', '', 'Duyurular/20171102-D-ANITKABIR.jpg', 'Duyurular/20171102-D-ANITKABIR01.jpg', '', '', '15 Kasım Çarşamba günü tüm öğrencilerimizle Atamızı ziyarete gidiyoruz.', '', 'ANITKABIR-ZIYARETI', '', '0,1,2,3', '2017-11-02'),
(80, 'OYUNCAK MÜZESİ GEZİSİ', '', 'Duyurular/20171102-D-OYUNCAK-MUZESI01.jpg', 'Duyurular/20171102-OYUNCAK-MUZESI02.jpg', '', '', '23 ve 24 Kasım’da 2. sınıf öğrencilerimizle Ankara Üniversitesi Oyuncak Müzesine gideceğiz.', '', 'OYUNCAK-MUZESI-GEZISI', '', '1', '2017-11-02'),
(81, 'ERGENLİKTE RUHSAL VE BEDENSEL GELİŞİM', '', 'Duyurular/20171101-D-ERKEK-ERGEN01.jpg', 'Duyurular/20171101-D-ERKEK-ERGEN02.jpg', '', '', '17 Kasım Cuma saat 15.00’te Ürolog Yrd.Doç.Dr. Semih TANGAL ve Psikiyatrist Ahmet GÜL 7,8,9,10,11 ve 12. sınıf erkek öğrencilerimize “Ergenlikte Bedensel ve Ruhsal Gelişim” konulu seminer verecektir.', '', 'ERGENLIKTE-RUHSAL-VE-BEDENSEL-GELISIM', '', '2,3', '2017-11-02'),
(82, 'HEDİYE', '', 'Duyurular/Aek-Logo.png', '', '', '', '2017-2018 Eğitim ve Öğretim yılında da tüm okullarımız çalışanlarına özel günler de dahil olmak üzere hediye kabul edilmeyecektir. ( Çalışanlarımıza verilebilecek en güzel hediye çocuklarımızın yaptığı bir resim ya da tek bir çiçek olabilir.) Bu kararı anlayışla karşılayacağınızı ve destekleyeceğinizi düşünerek uymanız önemle rica olunur.', '', 'HEDIYE', '', '0', '2017-11-01'),
(83, 'OKULA ZAMANINDA KATILMA', '', 'Duyurular/Aek-Logo.png', '', '', '', 'Anaokulumuzda GÜNLÜK PROGRAMLAR, saat 09.30’dan itibaren başlamaktadır. Geç gelen çocuklarımız eğitim sürecini grupla beraber yaşayamamaktadır. Bu nedenle çocuğumuzun okulumuza zamanında gelmesinin sağlanmasını önemle rica ediyoruz.', '', 'OKULA-ZAMANINDA-KATILMA', '', '0', '2017-11-01'),
(84, 'VELİ - ÖĞRETMEN GÖRÜŞMELERİ', '', 'Duyurular/Aek-Logo.png', '', '', '', 'Anaokulumuzda, eğitim saatlerinde öğretmenlerimizi gruplarından çıkarıp eğitimi engellememek adına, çocuklarımızla ilgili görüşmek ve bilgi vermek için uygun olan saatlerimiz 13.00-15.00 arasıdır. Bu konuda hassasiyet göstermenizi önemle rica ediyoruz.', '', 'VELI-OGRETMEN-GORUSMELERI', '', '0', '2017-11-01'),
(85, 'ANAOKULUMUZDA HİJYEN', '', 'Duyurular/Aek-Logo.png', '', '', '', 'Hijyen çocuklarımızın ve bizlerin sağlığı açısından çok önemlidir. Anaokulumuzun daha temiz olması ve çocuklarımızın çeşitli hastalıklara maruz kalmaması açısından okulumuza girerken temiz galoş kutumuzdaki galoşları kullanmanızı önemle rica ediyoruz.', '', 'ANAOKULUMUZDA-HIJYEN', '', '0', '2017-11-01'),
(86, 'ATATÜRK ALBÜMÜ', '', 'Duyurular/Aek-Logo.png', '', '', '', '30 Ekim-03 Kasım Haftası yapacağımız   sanat çalışmamızda 5-6 yaş grubumuzda ATATÜRK ile ilgili “RESİM TAMAMLAMA  3-4 yaş grubumuzda “ATATÜRK ALBÜMÜ” yapacağız. Resim tamamlama çalışması için küçük boy, albüm için orta boy ATATÜRK resimleri kullanılacaktır. Sanat çalışmasının  yapılacağı gün gelirken bu  resimleri getirmenizi rica ediyoruz.', '', 'ATATURK-ALBUMU', '', '0', '2017-10-29'),
(87, 'ANAOKULUMUZDA TİYATRO GÖSTERİSİ', '', 'Duyurular/Aek-Logo.png', '', '', '', '1 Kasım Çarşamba günü GÖKKUŞAĞI TİYATROSU’nun sergileyeceği SÜRPRİZ BALIK isimli oyunu AEK KOLEJİMİZ’de keyifle izleyeceğiz.', '', 'ANAOKULUMUZDA-TIYATRO-GOSTERISI', '', '0', '2017-10-23'),
(88, 'ANAOKULUMUZDA ATATÜRK\'Ü ANMA', '', 'Duyurular/Aek-Logo.png', '', '', '', '10 Kasım Cuma  günü  Ulu Önder Mustafa Kemal  Atatürk’ü , aramızdan ayrılışının 78. yıl dönümünde  saygı ile anacağız. O gün gelirken Kasımpatı getirmenizi  rica ediyoruz.', '', 'ANAOKULUMUZDA-ATATURK-U-ANMA', '', '0', '2017-10-31'),
(89, 'ANAOKULUMUZDA PİJAMA PARTİSİ', '', 'Duyurular/Aek-Logo.png', '', '', '', '17 Kasım Cuma günü  5 ve 6  yaş gruplarımızda  “ PİJAMA PARTİSİ” yapılacaktır. 6 yaş gruplarımızdaki öğrencilerimiz parti için pijamalarını getirmeyi unutmasınlar.', '', 'ANAOKULUMUZDA-PIJAMA-PARTISI', '', '0', '2017-11-01'),
(90, 'ANAOKULUMUZDA SUNUM ÇALIŞMASI', '', 'Duyurular/Aek-Logo.png', '', '', '', '20-24 Kasım Haftasında 6 yaş gruplarımızda  “SONBAHAR MEVSİMİNDE NELER GİYERİZ” konulu “SUNUM ÇALIŞMASI” yapılacaktır. Çocuklar Sonbahar mevsimi ile ilgili bir giysi getirerek, şekil, renk, kumaş v.b özellikleri açısından grup içerisinde arkadaşlarına tanıtım yapacaklardır', '', 'ANAOKULUMUZDA-SUNUM-CALISMASI', '', '0', '2017-11-01'),
(91, 'ANAOKULUMUZDA PROJE ÇALIŞMASI', '', 'Duyurular/Aek-Logo.png', '', '', '', '27 Kasım-1 Aralık Haftasında  3,4,5 ve 6 yaş gruplarımızda ayın materyali “İP”ve “KUMAŞ” ile proje çalışması yapılacaktır. Sanat çalışmasının yapılacağı gün gelirken renkli ipler ve kumaş  getirmenizi rica ediyoruz.', '', 'ANAOKULUMUZDA-PROJE-CALISMASI', '', '0', '2017-11-01'),
(92, 'ANAOKULUMUZDA MAVİ PARTİSİ', '', 'Duyurular/Aek-Logo.png', '', '', '', '1 Aralık Cuma günü 3 ve 4 yaş gruplarımızda “MAVİ’NİN DÜNYASI” ve “MAVİ PARTİSİ” yapılacaktır. O gün çocuklarımız MAVİ renkli giysiler giyinerek okula gelecekler ve mavi nesnelerin resimlerini keserek pano oluşturacaklardır.', '', 'ANAOKULUMUZDA-MAVI-PARTISI', '', '0', '2017-11-15'),
(93, 'ANAOKULUMUZDA İSTANBUL İLİMİZ İLE JAPONYA\'NIN TANITIMI', '', 'Duyurular/Aek-Logo.png', '', '', '', '5 yaş grubumuzda bir ilimizi tanıyalım çalışmamızda  “İSTANBUL ”ilimiz, 6 yaş grubumuzda İSTANBUL ili  ve Dünyayı tanıyalım etkinliğinde “JAPONYA” tanıtılacaktır. Bu konuda 5 yaş grubu çocuklarımızın  İSTANBUL, 6 yaş grubu çocuklarımızın JAPONYA ile ilgili bir materyali (resim, nesne , tanıtım cd’si v.b) okulumuza getirerek bilgi vermelerini istiyoruz. Çocuklarımızda sorumluluk duygusu ve özgüven becerilerini geliştiren bu çalışmalar ve bu çalışmalara velinin katılımı ve desteği çocuk açısından çok  önemlidir.', '', 'ANAOKULUMUZDA-ISTANBUL-ILIMIZ-ILE-JAPONYA-NIN-TANITIMI', '', '0', '2017-11-01'),
(94, 'ANAOKULUMUZDA İLKOKULA HAZIRLIK ÇALIŞMALARI', '', 'Duyurular/Aek-Logo.png', '', '', '', '6 yaş grubumuzda  başladığımız ilkokula hazırlık çalışmalarımız  (Türkçe - Hayat bilgisi – Matematik )  ve diğer temel becerileri içeren çalışmalar,  yıl boyunca devam edecek ve eğitim uzmanımız Hale Mengükaan  tarafından hazırlanıp, belirli aralıklarla uygulanacak olan test formatında çalışmalar ile  pekiştirilecektir. Bu çalışmaları  aldığınız zaman çocuklarınızı tebrik ederek, sözel ödüllerle onurlandırmak onların motivasyonunu ve güven duygusunu artıracaktır.', '', 'ANAOKULUMUZDA-ILKOKULA-HAZIRLIK-CALISMALARI', '', '0', '2017-11-01');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_egitim_sistemi`
--

DROP TABLE IF EXISTS `general_egitim_sistemi`;
CREATE TABLE IF NOT EXISTS `general_egitim_sistemi` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_egitim_sistemi`
--

INSERT INTO `general_egitim_sistemi` (`No`, `tr_Baslik`, `en_Baslik`, `tr_Yazi`, `en_Yazi`, `ListOrder`) VALUES
(1, 'Beyin Temelli Eğitim Modeli', 'Brain-Based Learning Model', 'Beyin temelli öğrenme, beynin yapısına ve işlevine dayalı olarak beynin nasıl çalıştığını anlayarak öğrenme ve öğretmeyi en üst düzeye çıkarma anlayışıdır. Beyin temelli öğrenme öğrencilerin bireysel farklılıklarına önem veren ve onları belirli bir kalıba koymayan bir modeldir.\n<br>\n<br>\n<strong>Beyin Temelli Öğrenmenin Avantajları</strong>\n<br>\n<br>\n\nÖğrenci ders esnasında birçok konuyla karşı karşıya gelir ve böylelikle öğrencinin günlük hayatta karşılaştığı problemleri çözmesi kolaylaşır.\n<ul>\n	<li>Ögrenci bilgiyi ezberlemediği için ve belirli aralıklarla tekrar ettiği için ömür boyu hafızasında tutabilir.</li>\n	<li>Öğrenci ders esnasında birçok konuyla karşı karşıya gelir ve böylelikle öğrencinin günlük hayatta karşılaştığı problemleri çözmesi kolaylaşır.</li>\n	<li>Ders esnasında öğrenci sürekli düşünmeye sevk edileceği için öğrencinin başarı düzeyi kat kat artar.</li>\n	<li>Tehdit ve stresten uzak bir öğrenme yaklaşımı olduğu için öğrenci dersi sever.</li>\n	<li>Konular diğer derslerin konularıyla ilişkilendirildiği için öğrenci aynı anda birkaç dersi öğrenmiş ve hatırlamış olur.</li>\n	<li>Öğrencinin motivasyonu arttığı için öğrenmesi kolaylaşır ve öğrenme zevkli hale gelir, öğrenci çok yorulmaz.</li>\n	<li>Beyni sağlıklı çalışan öğrencinin bedeni de sağlıklı olur.</li>\n	<li>Öğrenme sınıfta sınırlı kalmayacağı için öğrenci konuyu yaşamının içinde sürekli tekrar eder ve farkında olmadan tam ve kalıcı öğrenme gerçekleşir.</li>\n</ul>', 'Brain-based learning is an approach, in which learning and teaching is conducted at the highest level through understanding how the brain works based on the brain’s structure and function. Brain-based learning pays attention to individual differences of students, yet does not stereotype students. <br> <br> <strong>The Advantages Of Brain-Based Learning</strong> <br> <br> <ul> 	<li>The students can keep what they learn in their mind for the rest of their lives, since they review what they learn on a regular basis rather than memorizing information.</li> 	<li>Students come across with many different subjects during a lesson, thus it becomes easier for them to solve their everyday-life problems.</li> 	<li>Since students are encouraged to continuously think during a lesson, their level of success increases to a great extent.</li> 	<li>Tehdit ve stresten uzak bir öğrenme yaklaşımı olduğu için öğrenci dersi sever.</li> 	<li>Students can easily love the lesson since this type of learning is far from threats and stress.</li> 	<li>The subjects are associated with the subjects of other courses, which enables students to learn multiple lessons at once and remember what has been taught  they learn in the long term.</li> 	<li>In this model, the motivation of students increases, thus their learning becomes easier and more enjoyable, which does not exhaust students.</li> 	<li>The student with a healthy brain also possesses a healthy body.</li> 	<li>In this model, since learning is not limited within the classroom; students repeats the subjects they learn throughout their lives and obtains full and permanent learning without even realizing it.</li> </ul>', 1),
(2, 'Akademik Başarıyı Destek Programlarımız', 'Our Academic Achievement Support Program', '<ul>\n	<li>Öğrenmeyi Öğrenme Programı</li>\n	<li>Öğrenme Stilleri Programı (İlkokul, Ortaokul, Anadolu Lisesi)</li>\n	<li>Okuma Saati Programı (İlkokul, Ortaokul, Anadolu Lisesi)</li>\n	<li>Akademik Başarı Takip Programı (İlkokul, Ortaokul, Anadolu Lisesi)</li>\n	<li>Matematikle Parışıyorum Programı (Ortaokul, Anadolu Lisesi)</li>\n	<li>Türkçeyle Barışıyorum Programı (Ortaokul, Anadolu Lisesi)</li>\n	<li>Akşam Etüd Programı (İlkokul, Ortaokul)</li>\n	<li>Hazır Bulunuşluk Tekrar Programı (İlkokul, Ortaokul, Anadolu Lisesi)</li>\n	<li>Hızlı Okuma Programı (Ortaokul, Anadolu Lisesi)</li>\n	<li>Hafta Sonu Dershane Konseptli Ders Destek Programı (Ortaokul, Anadolu Lisesi)</li>\n	<li>Bireysel Ve Küçük Grup Ders Destek Drogramı (İlkokul, Ortaokul, Anadolu Lisesi)</li>\n	<li>Danışman Öğretmenlerimiz Bizi Yönlendiriyor Programı (Ortaokul, Anadolu Lisesi)</li>\n</ul>', '<ul> 	<li>Learning How to Learn Program</li> 	<li>Learning Styles Program (Elementary School, Middle School, Anatolian High School)</li> 	<li>Reading Hours Program (Elementary School, Middle School, Anatolian High School)</li> 	<li>Trace Program for Academic Success (Elementary School, Middle School, Anatolian High School)</li> 	<li>I Make Peace with Mathematics Program (Middle School, Anatolian High School)</li> 	<li>I Make Peace with Turkish Program (Middle School, Anatolian High School)</li> 	<li>Evening Study Group Program (Elementary School, Middle School)</li> 	<li>Program for Repeating Readiness (Elementary School, Middle School, Anatolian High School)</li> 	<li>Speed Reading Program (Middle School, Anatolian High School)</li> 	<li>HLesson Support Program with a Training Center Concept on Weekends (Middle School, Anatolian High School)</li> 	<li>Lesson Support program for Small Groups and Individuals (Elementary School, Middle School, Anatolian High School)</li> 	<li>Our Advisor Teachers Guide Us Program (Middle School, Anatolian High School)</li> </ul>', 2),
(3, 'İngilizce Edinim Programlarımız', 'English Acquisition Programs', '<ul>\n	<li>İlkokul 1-2-3-4. Sınıflarda (14 ders saati/hafta)</li>\n	<li>Ortaokul 5-6-7. Sınıflarda (14 ders saati/hafta)</li>\n	<li>Ortaokul 8. Sınıflarda (12 ders saati/hafta)</li>\n	<li>Lise 9. Sınıflarda (12 ders saati/hafta)</li>\n	<li>Lise 10-11. Sınıflarda (8+10 ders saati/hafta)</li>\n	<li>Lise 12. Sınıflarda (4+8 ders saati/hafta)</li>\n</ul>	  \n<strong>İngilizce Seviye Programı</strong>\n<ul>\n	<li>Yeni Öğrenci İngilizce Takviye Programı</li>\n	<li>Akşam İngilizce Takviye Programı (Lise)</li>\n	<li>İngilizce Projeler Programı (İlkokul, Ortaokul, Lise)</li>\n	<li>İngilizce Açık Sınıf Etkinlikleri Programları</li>\n	<li>İngilizce Münazara Programı</li>\n	<li>İngilizce Kur Atlama Programı</li>\n	<li>ISLPR Sertifika Sınavları Programı</li>\n	<li>Yabancı Konuklarla Sohbet Ediyoruz Programı</li>\n	<li>Uluslararası Projeler</li>\n	<li>Uluslararası Yarışmalar</li>\n</ul>', '<ul> 	<li>14 hours per week for 1st, 2nd, 3rd, 4th grades of Elementary School</li> 	<li>14 hours per week for 5th, 6th, 7th grades of Middle School</li> 	<li>12 hours per week for 8th grade of Middle School</li> 	<li>12 hours per week for 9th grade of Anatolian High School</li> 	<li>8+10 hours per week for 10th, 11th grades of Anatolian High School</li> 	<li>4+8 hours per week for 12th grade of Anatolian High School</li> </ul>	   <strong>English Level Program</strong> <ul> 	<li>Trace Program for English Level of New Students</li> 	<li>Anatolian High School (Anatolian High School)</li> 	<li>English Projects Program (Elementary School, Middle School, Anatolian High School)</li> 	<li>Programs for Open Classroom Activities for English</li> 	<li>English Debate Program</li> 	<li>Program for Leveling up in English</li> 	<li>Exam Program for English ISLPR Certificate</li> 	<li>Program for Chatting Foreign Guests</li> 	<li>International Projects</li> 	<li>International Competitions</li> </ul>', 3),
(4, 'Psiko-Sosyal Gelişimi Destek Programlarımız', 'Psycho-Social Development Support Program', '<strong>Psiko-Sosyal Gelişimlerini Destekleme Programlarımız</strong>\n<ul>\n	<li>Değerler Eğitimi programı</li>\n	<li>Nezaket Kuralları Programı</li>\n	<li>Yaratıcı Ve Eleştirel Düşünme Programı</li>\n	<li>Özel Becerilerimizi Arkadaşlarımıza Öğretiyoruz Programı</li>\n	<li>Kış Ayları Etkinlik Programı</li>\n	<li>Sosyal Faliyetlerde Hepimiz Görevliyiz Programı</li>\n	<li>Her Öğrenci Bir Müzik Aleti Çalar Programı</li>\n	<li>Psikolojik Danışmanlık Ve Rehberlik Programı</li>\n	<li>Sosyal Sorumluluk Projeleri Programı</li>\n	<li>Bilimsel Ve Kültürel Gezi Ve Gözlem Programı</li>\n</ul>\n<strong>Sanat Ve Spor Faaliyetlerimiz</strong>\n<ul>\n	<li>Futbol</li>\n	<li>Basketbol</li>\n	<li>Voleybol</li>\n	<li>Tenis</li>\n	<li>Futsal</li>\n	<li>Yüzme</li>\n	<li>Pentatlon</li>\n	<li>Masa Tenisi</li>\n	<li>Modern Dans</li>\n	<li>Halk Oyunları</li>\n	<li>Zumba</li>\n	<li>Drama</li>\n	<li>Satranç</li>\n	<li>Tiyatro</li>\n	<li>Şiir Okuma</li>\n	<li>Resim</li>\n	<li>Seramik</li>\n	<li>Bateri</li>\n	<li>Keman</li>\n	<li>Gitar</li>\n	<li>Piyano</li>\n	<li>Solfej</li>\n	<li>Koro</li>\n	<li>Orkestra</li>\n	<li>Bando</li>\n</ul>', '<strong>Psiko-Sosyal Gelişimlerini Destekleme Programlarımız</strong> <ul> 	<li>Values Education Program,</li> 	<li>Program for Learning Manners</li> 	<li>Creative and Critical Thinking Program</li> 	<li>Let’s Teach Our Friends Our Special Skills Program</li> 	<li>Winter Activities Program</li> 	<li>Responsibilities for Social Activities Program</li> 	<li>Every Student Plays a Musical Instrument Program</li> 	<li>Psychological Counseling and Guidance Program</li> 	<li>Social Responsibility Projects Program</li> 	<li>Program for Scientific and Cultural Trips and Observations</li> </ul> <strong>Our Sportive And Artistic Activities</strong> <ul> 	<li>Football</li> 	<li>Basketball</li> 	<li>Volleyball</li> 	<li>Tennis</li> 	<li>Futsal</li> 	<li>Swimming</li> 	<li>Pentathlon</li> 	<li>Table Tennis</li> 	<li>Modern Dance</li> 	<li>Folk Dance</li> 	<li>Zumba</li> 	<li>Drama</li> 	<li>Chess</li> 	<li>Theatre</li> 	<li>Poem Reading</li> 	<li>Art</li> 	<li>Ceramics</li> 	<li>Drums</li> 	<li>Violin</li> 	<li>Guitar</li> 	<li>Piano</li> 	<li>Solfege</li> 	<li>Choir</li> 	<li>Orchestra</li> 	<li>Band</li> </ul>', 4);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_email_listesi`
--

DROP TABLE IF EXISTS `general_email_listesi`;
CREATE TABLE IF NOT EXISTS `general_email_listesi` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `Email` text COLLATE utf8_turkish_ci NOT NULL,
  `AdSoyad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=97 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_email_listesi`
--

INSERT INTO `general_email_listesi` (`No`, `Email`, `AdSoyad`) VALUES
(64, 'cuttingnarkoz@gmail.com', 'Doğucan Şaşıoğlu'),
(94, 'deneme@outlook.com', 'deneme ad soyad'),
(95, 'deneme@mail.com', 'deneme adsoyad'),
(96, 'emrullah_kel@hotmail.com', 'Emrullah KEL');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_etkinlik_takvimi`
--

DROP TABLE IF EXISTS `general_etkinlik_takvimi`;
CREATE TABLE IF NOT EXISTS `general_etkinlik_takvimi` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Aciklama` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Aciklama` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Sube` text COLLATE utf8_turkish_ci NOT NULL,
  `Okul` text COLLATE utf8_turkish_ci NOT NULL,
  `Tarih` date NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=7621 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_etkinlik_takvimi`
--

INSERT INTO `general_etkinlik_takvimi` (`No`, `tr_Aciklama`, `en_Aciklama`, `Sube`, `Okul`, `Tarih`) VALUES
(1, '1-A-Okuma Bayramı', '1-A Class Reading Day', '1-A', '1', '2018-04-30'),
(2, '1-B-Okuma Bayramı', '1-B Class Reading Day', '1-B', '1', '2018-05-02'),
(3, '1-C-Okuma Bayramı', '1-C Class Reading Day', '1-C', '1', '2018-05-04'),
(80, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A', '3', '2017-09-05'),
(81, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-B', '3', '2017-09-05'),
(82, '12. sınıf YGS Programı', '12th grade YGS Program', '12-TM-A', '3', '2017-09-05'),
(83, '12. sınıf YGS Programı', '12th grade YGS Program', '12-TM-B', '3', '2017-09-05'),
(84, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A', '3', '2017-09-06'),
(85, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-B', '3', '2017-09-06'),
(86, '12. sınıf YGS Programı', '12th grade YGS Program', '12-TM-A', '3', '2017-09-06'),
(87, '12. sınıf YGS Programı', '12th grade YGS Program', '12-TM-B', '3', '2017-09-06'),
(88, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A', '3', '2017-09-07'),
(89, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-B', '3', '2017-09-07'),
(90, '12. sınıf YGS Programı', '12th grade YGS Program', '12-TM-A', '3', '2017-09-07'),
(91, '12. sınıf YGS Programı', '12th grade YGS Program', '12-TM-B', '3', '2017-09-07'),
(306, '5-A, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '5-A', '2', '2017-12-05'),
(307, '5-A, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '5-A', '2', '2018-03-06'),
(308, '5-B, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '5-B', '2', '2017-12-06'),
(309, '5-B, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '5-B', '2', '2018-03-07'),
(310, '5-C, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '5-C', '2', '2017-12-12'),
(311, '5-C, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '5-C', '2', '2018-03-13'),
(321, '6-A, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '6-A', '2', '2017-12-05'),
(322, '6-A, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '6-A', '2', '2018-03-06'),
(323, '6-B, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '6-B', '2', '2017-12-06'),
(324, '6-B, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '6-B', '2', '2018-03-07'),
(325, '6-C, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '6-C', '2', '2017-12-12'),
(326, '6-C, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '6-C', '2', '2018-03-13'),
(327, '6-D, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '6-D', '2', '2017-12-13'),
(328, '6-D, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '6-D', '2', '2018-03-14'),
(337, '7-A, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '7-A', '2', '2017-12-05'),
(338, '7-A 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '7-A', '2', '2017-12-13'),
(339, '7-B 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '7-B', '2', '2017-12-13'),
(340, '7-A, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '7-A', '2', '2018-03-14'),
(341, '7-B, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '7-B', '2', '2018-03-14'),
(346, '8-A, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '8-A', '2', '2017-12-05'),
(347, '8-A, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '8-A', '2', '2018-03-06'),
(348, '8-B, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '8-B', '2', '2017-12-06'),
(349, '8-B, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '8-B', '2', '2018-03-07'),
(350, '8-C, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '8-C', '2', '2017-12-12'),
(351, '8-C, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '8-C', '2', '2018-03-13'),
(352, '8-D, 1. Dönem Veli Toplantısı', 'Term 1 Parent Meeting', '8-D', '2', '2017-12-13'),
(353, '8-D, 2. Dönem Veli Toplantısı', 'Term 2 Parent Meeting', '8-D', '2', '2018-03-14'),
(3408, 'TEOG Kampı', 'TEOG Camp', '8-A', '2', '2017-09-05'),
(3409, 'TEOG Kampı', 'TEOG Camp', '8-B', '2', '2017-09-05'),
(3410, 'TEOG Kampı', 'TEOG Camp', '8-C', '2', '2017-09-05'),
(3411, 'TEOG Kampı', 'TEOG Camp', '8-D', '2', '2017-09-05'),
(3412, 'TEOG Kampı', 'TEOG Camp', '8-A', '2', '2017-09-06'),
(3413, 'TEOG Kampı', 'TEOG Camp', '8-B', '2', '2017-09-06'),
(3414, 'TEOG Kampı', 'TEOG Camp', '8-C', '2', '2017-09-06'),
(3415, 'TEOG Kampı', 'TEOG Camp', '8-D', '2', '2017-09-06'),
(3416, 'TEOG Kampı', 'TEOG Camp', '8-A', '2', '2017-09-07'),
(3417, 'TEOG Kampı', 'TEOG Camp', '8-B', '2', '2017-09-07'),
(3418, 'TEOG Kampı', 'TEOG Camp', '8-C', '2', '2017-09-07'),
(3419, 'TEOG Kampı', 'TEOG Camp', '8-D', '2', '2017-09-07'),
(3668, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '6-D', '2', '2017-09-06'),
(3669, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A', '2', '2017-09-06'),
(3672, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '2-B', '1', '2017-09-07'),
(3673, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '2-C', '1', '2017-09-07'),
(3674, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '2-D', '1', '2017-09-07'),
(3770, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-B,7-A,8-A,8-B,8-C,8-D', '2', '2017-09-15'),
(4114, 'Seminer-Serçin ŞENER', 'Seminar-Serçin ŞENER', '12-TM-A,12-TM-B', '3', '2017-09-05'),
(4162, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A,7-B', '2', '2017-09-08'),
(4205, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A,7-B', '2', '2017-09-11'),
(4232, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A,7-B', '2', '2017-09-12'),
(4854, 'Halk Ekmek Fabrikası Gezisi', 'Bread Factory Trip', '4-A,4-B', '1', '2017-10-23'),
(5424, 'Açık Sınıf Günü', 'Open Class Day', '4-A,4-B', '1', '2018-03-09'),
(5471, 'ODTÜ Bilim ve Teknoloji', 'METU Science and Technology', '4-A,4-B', '1', '2018-03-29'),
(5480, 'Anadolu Medeniyetleri Müzesi Gezisi', 'Tour of the Museum of Anatolian Civilizations', '4-A,4-B', '1', '2018-04-10'),
(5537, 'Polatlı Kurtuluş Savaşı Müzesi Gezisi', 'Polatlı Independence War Museum Trip', '4-A,4-B', '1', '2018-05-11'),
(5538, '7. Sınıflar Sanat Günleri (İngilizce Şarkı)', 'Art Days of 7th Grades (English Songs)', '7-A,7-B', '2', '2018-05-15'),
(5539, '7. Sınıflar Sanat Günleri (Resital + Sergi)', 'Art Days of 7th Grades (Recital + Exhibition)', '7-A,7-B', '2', '2018-05-15'),
(5540, 'Makarna Fabrikası Gezisi', 'Pasta Factory Trip', '4-A,4-B', '1', '2018-05-17'),
(5597, '4. Sınıflar Sanat Günleri (Drama)', 'Art Days of 4th Grades (Drama)', '4-A,4-B', '1', '2018-05-30'),
(5598, '4. Sınıflar Sanat Günleri (Resital + Sergi)', 'Art Days of 4th Grades (Recital + Exhibition)', '4-A,4-B', '1', '2018-05-30'),
(5605, 'Rasathane Gezisi', 'Observatory Trip', '4-A,4-B', '1', '2018-06-05'),
(5656, 'YGS-LYS Çalışma Başlangıcı', 'Start date of YGS-LYS studying', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-14'),
(5657, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-15'),
(5658, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-16'),
(5659, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-17'),
(5660, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-18'),
(5661, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-21'),
(5662, '8. Sınıf TEOG Kampı', 'TEOG Camp of 8th Grade', '8-A,8-B,8-C,8-D', '2', '2017-08-21'),
(5667, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-22'),
(5668, '8. Sınıf TEOG Kampı', 'TEOG Camp of 8th Grade', '8-A,8-B,8-C,8-D', '2', '2017-08-22'),
(5677, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-23'),
(5678, '8. Sınıf TEOG Kampı', 'TEOG Camp of 8th Grade', '8-A,8-B,8-C,8-D', '2', '2017-08-23'),
(5684, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-24'),
(5685, '8. Sınıf TEOG Kampı', 'TEOG Camp of 8th Grade', '8-A,8-B,8-C,8-D', '2', '2017-08-24'),
(5690, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-08-25'),
(5691, '8. Sınıf TEOG Kampı', 'TEOG Camp of 8th Grade', '8-A,8-B,8-C,8-D', '2', '2017-08-25'),
(5712, 'Seminer-Serçin ŞENER', 'Seminar-Serçin ŞENER', '2-A,2-B,2-C,2-D', '1', '2017-09-05'),
(5713, 'Seminer-Serçin ŞENER', 'Seminar-Serçin ŞENER', '3-A,3-B,3-C,4-A', '1', '2017-09-05'),
(5721, '11. sınıf YGS Programı', '11th grade YGS Program', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-09-05'),
(5728, '11. sınıf YGS Programı', '11th grade YGS Program', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-09-06'),
(5737, 'Seminer-Akran Zorbalığı-Merve Özcan KURT', 'Seminar-Peer Bulletin-Merve Özcan KURT', '1-A,1-B,1-C,2-A', '1', '2017-09-06'),
(5738, '11. sınıf YGS Programı', '11th grade YGS Program', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-09-07'),
(5744, '11. sınıf YGS Programı', '11th grade YGS Program', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-09-08'),
(5755, 'TEOG Kampı', 'TEOG Camp', '8-A,8-B,8-C,8-D', '2', '2017-09-09'),
(5756, '11. sınıf YGS Programı', '11th grade YGS Program', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-09-11'),
(5765, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-09-11'),
(5766, 'TEOG Kampı', 'TEOG Camp', '8-A,8-B,8-C,8-D', '2', '2017-09-11'),
(5775, '11. sınıf YGS Programı', '11th grade YGS Program', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-09-12'),
(5778, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-09-12'),
(5779, 'TEOG Kampı', 'TEOG Camp', '8-A,8-B,8-C,8-D', '2', '2017-09-12'),
(5793, '11. sınıf YGS Programı', '11th grade YGS Program', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-09-13'),
(5796, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-09-13'),
(5797, 'TEOG Kampı', 'TEOG Camp', '8-A,8-B,8-C,8-D', '2', '2017-09-13'),
(5802, '11. sınıf YGS Programı', '11th grade YGS Program', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-09-14'),
(5806, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-09-14'),
(5807, 'TEOG Kampı', 'TEOG Camp', '8-A,8-B,8-C,8-D', '2', '2017-09-14'),
(5840, '12. Sınıfların Haftasonu Kurs Başlangıcı', 'Start of Weekend Courses-12th grade', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-09-23'),
(5965, '9. Sınıflar Eymir Gölü Gezisi', 'Grade 9th Eymir Lake Trip', '9-FL-A,9-FL-B,9-AL-A,9-AL-B', '3', '2017-10-04'),
(6011, '10. Sınıflar Teknokent Gezisi', '10th Grade Technopolis Tour', '10-FL-A,10-FL-B,10-AL-A,10-AL-B', '3', '2017-10-10'),
(6032, '5. Sınıflar Türkçe Etkinlik Günleri', 'Turkish Event Days of 5th Grades', '5-C,5-A,5-B', '2', '2017-10-12'),
(6084, 'Oyuncak Müzesi Gezisi', 'Toy Museum Trip', '3-C,3-A,3-B', '1', '2017-10-20'),
(6103, 'Eski Meclis Gezisi', 'Old Parliament Trip', '3-A,3-B,3-C', '1', '2017-10-26'),
(6124, '11. Sınıflar Konya Kelebek Müzesi Gezisi', '11th grade Konya Butterfly Museum Trip', '11-MF-A,11-MF-B,11-TM-A,11-TM-B', '3', '2017-11-04'),
(6155, '2. Sınıf 1. Grup', '2nd Class 1st Group', '2-A,2-B,2-C,2-D', '1', '2017-11-23'),
(6156, '2. Sınıf 2. Grup', '2nd Class 2nd Group', '2-A,2-B,2-C,2-D', '1', '2017-11-24'),
(6367, 'YGS Kampı', 'YGS Camp', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2018-03-01'),
(6368, 'YGS Kampı', 'YGS Camp', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2018-03-02'),
(6369, 'YGS Kampı', 'YGS Camp', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2018-03-03'),
(6370, 'YGS Kampı', 'YGS Camp', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2018-03-04'),
(6371, 'Açık Sınıf Günü', 'Open Class Day', '2-A,2-B,2-C,2-D', '1', '2018-03-05'),
(6403, 'Halk Ekmek Fabrikası Gezisi', 'Bread Factory Trip', '2-A,2-B,2-C,2-D', '1', '2018-04-12'),
(6404, 'Trafik Eğitim Parkı Gezisi', 'Traffic Training Park Tour', '2-A,2-B,2-C,2-D', '1', '2018-04-17'),
(6428, '6. Sınıflar Sanat Günleri (Resital + Sergi)', 'Art Days of 6th Grades (Recital + Exhibition)', '6-A,6-B,6-C,6-D', '2', '2018-05-09'),
(6429, '6. Sınıflar Sanat Günleri (İngilizce Şarkı)', 'Art Days of 6th Grades (English Songs)', '6-A,6-B,6-C,6-D', '2', '2018-05-10'),
(6455, '2. Sınıflar Sanat Günleri (Drama)', 'Art Days of 2nd Grades (Drama)', '2-A,2-B,2-C,2-D', '1', '2018-05-28'),
(6456, '2. Sınıflar Sanat Günleri (Resital + Sergi)', 'Art Days of 2nd Grades (Recital + Exhibition)', '2-A,2-B,2-C,2-D', '1', '2018-05-28'),
(6458, '8. Sınıflar Mezuniyet Töreni-Kokteyl', 'Graduation Ceremony & Cocktail of 8th Grade', '8-A,8-B,8-C,8-D', '2', '2018-06-01'),
(6459, '8. Sınıflar Mezuniyet Balosu', 'Graduation Ball of 8th Grade', '8-A,8-B,8-C,8-D', '2', '2018-06-04'),
(6507, 'Temel Matematik, Türkçe ve Yabancı Diller Takviye Programı', 'Basic Mathematics, Turkish and Foreign Language Reinforcement Program', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B', '3', '2017-09-05'),
(6511, 'Temel Matematik, Türkçe ve Yabancı Diller Takviye Programı', 'Basic Mathematics, Turkish and Foreign Language Reinforcement Program', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B', '3', '2017-09-06'),
(6513, 'Seminer-Mental Aritmetik', 'Seminar-Mental Arithmetic', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A', '2', '2017-09-06'),
(6530, 'Temel Matematik, Türkçe ve Yabancı Diller Takviye Programı', 'Basic Mathematics, Turkish and Foreign Language Reinforcement Program', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B', '3', '2017-09-12'),
(6537, 'Temel Matematik, Türkçe ve Yabancı Diller Takviye Programı', 'Basic Mathematics, Turkish and Foreign Language Reinforcement Program', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B', '3', '2017-09-13'),
(6676, 'Oyuncak Müzesi Gezisi', 'Toy Museum Trip', '2-A,2-B,2-C,2-D,4-A,4-B', '1', '2017-10-18'),
(6685, 'Kurtuluş Savaşı ve Cumhuriyet Müzesi Gezisi', 'Independence War and Republic Museum Trip', '3-C,2-A,2-B,2-C,2-D,3-A,3-B', '1', '2017-10-24'),
(6852, 'MTA Gezisi', 'MTA Tour', '4-B,3-A,3-B,3-C,4-A', '1', '2018-05-24'),
(6861, 'Feza GÜRSEY Müzesi Gezisi', 'Feza GÜRSEY Museum Trip', '4-B,3-A,3-B,3-C,4-A', '1', '2018-05-31'),
(6888, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,2-A', '1,1,1,1,1,2,2,2,2,2,2,2,2,2,1', '2017-09-07'),
(6889, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-09-08'),
(6893, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-09-11'),
(6894, 'Anadolu Lisesi-Kurul Toplantısı', 'Anatolian High School-Board Meeting', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-09-11'),
(6895, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-09-12'),
(6937, 'Veli Tanışma Toplantısı', 'Parent Meeting', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-09-30'),
(6953, 'Haftasonu Kurslarının Başlangıcı', 'Beginning of the Weekend Courses', '11-MF-A,11-MF-B,11-TM-A,11-TM-B,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B', '3', '2017-10-07'),
(6989, 'Anadolu Lisesi-Şube Öğretmen Kurul Toplantısı', 'Anatolian High School-Class Teacher Board Meeting', '9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,9-FL-A,9-FL-B,9-AL-A', '3', '2017-11-08'),
(6993, 'Ortaokul Şube Öğretmen Kurul Toplantısı', 'Middle School Class Teacher Board Meeting', '8-D,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C', '2', '2017-11-29'),
(6994, 'Veli-Öğretmen Görüşmesi', 'Parent-Teacher Interview', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-12-02'),
(6998, 'Kermes', 'kermess', '3-B,3-C,4-A,4-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A', '1', '2017-12-19'),
(7056, 'Anadolu Lisesi-Şube Öğretmen Kurul Toplantısı', 'Anatolian High School-Class Teacher Board Meeting', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2018-03-09'),
(7062, 'Veli-Öğretmen Görüşmesi', 'Parent-Teacher Interview', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2018-03-17'),
(7063, 'Anadolu Lisesi-Şiir Dinletisi', 'Anatolian High School-Poetry Recital', '10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,9-FL-A,9-FL-B,9-AL-A,9-AL-B', '3', '2018-04-06'),
(7067, 'Ortaokul Şube Öğretmen Kurul Toplantısı', 'Middle School Class Teacher Board Meeting', '8-D,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C', '2', '2018-04-26'),
(7083, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A,7-B,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-08-21'),
(7084, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A,7-B,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-08-22'),
(7085, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,2-A,2-B,2-C,7-B,2-D,3-A,3-B,3-C,4-A,4-B', '1,2', '2017-08-23'),
(7086, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A,7-B,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-08-24'),
(7087, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A,7-B,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-08-25'),
(7090, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B', '1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2', '2017-09-05'),
(7092, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-A,7-B,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-09-13'),
(7100, 'Veli Tanışma Toplantısı', 'Parent Meeting', '5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,8-B,8-C,8-D', '1,2', '2017-09-23'),
(7114, 'İlkokul Kulüp Çalışmaları Başlangıcı', 'Beginning of primary school clubs', '3-B,3-C,4-A,4-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A', '1', '2017-10-05'),
(7115, 'Ortaokul Kulüp Çalışmaları Başlangıcı', 'Beginning of middle school clubs', '6-A,7-A,7-B,8-A,8-D,5-A,5-B,5-C,6-B,6-C,6-D,8-B,8-C', '2', '2017-10-06'),
(7157, 'Gezi (Uçakla)', 'Travel (by plane)', '12-TM-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A', '2,3', '2018-05-26'),
(7158, 'Gezi (Uçakla)', 'Travel (by plane)', '12-TM-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A', '2,3', '2018-05-27'),
(7162, 'ZAFER BAYRAMI', 'VICTORY DAY', '12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A', '1,2,3', '2017-08-30'),
(7163, 'Arefe Günü', 'the day before a religious holiday.', '12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A', '1,2,3', '2017-08-31'),
(7166, '2017-2018 Eğitim Öğretim Yılı Başlangıcı', '2017-2018 Education Yearbook Start', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2017-09-18'),
(7169, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C', '2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,21,2,3', '2017-09-26'),
(7173, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A', '1,2,3', '2017-10-03'),
(7174, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,1-A,1-B,12-TM-B,12-MF-B,12-TM-A,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A', '2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,3,3,3,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,21,2,3', '2017-10-05'),
(7175, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,12-TM-B,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A', '1,2,3', '2017-10-06'),
(7176, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '8-D,9-FL-A,9-FL-B,9-AL-A,12-TM-B,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C', '1,2,3', '2017-10-09'),
(7177, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C', '1,2,3', '2017-10-11'),
(7180, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C', '1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1', '2017-10-13'),
(7181, 'Öğrenci Meclisi Tanıtım Toplantısı', 'Student Assembly Promotion Meeting', '10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A', '1,2,3', '2017-10-16'),
(7182, 'Okul Aile Birliği Genel Kurul Toplantısı', 'School Parent Association General Assembly Meeting', '10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,12-TM-B', '1,2,3', '2017-10-19'),
(7184, 'Öğrenci Meclisi Temsilcisi Seçimi', 'Student Council Representative Selection', '1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B', '1,2,3', '2017-10-25'),
(7185, 'Yangın Tatbikatı', 'Fire drill', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2017-10-27'),
(7186, 'Cumhuriyet Bayramı Töreni', 'Republic Day Ceremony', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,12-TM-B,11-TM-B,12-MF-A,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2017-10-29'),
(7187, 'Yangın Tatbikatı', 'Fire drill', '4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A', '1,2,3', '2017-11-06'),
(7188, 'Anıtkabir Ziyareti', 'Tour of Anıtkabir (Atatürk\'s Mausoleum)', '12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A', '3,3,3,1,1,1,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,31,2,3', '2017-11-15'),
(7189, 'İngilizce Tiyatro', 'English Theater', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2017-12-07'),
(7190, 'Yılbaşı Partisi (Serbest Kıyafet)', 'New Year\'s Eve Party (Free Clothing)', '10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A', '1,2,3', '2017-12-29'),
(7191, 'Şubat Tatili Başlangıcı', 'Start date of 1st Semester Vacation', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2018-01-22'),
(7192, '1. Yarıyıl Tatili', '1st Semester Vacation', '12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B', '1,2,3', '2018-01-23'),
(7193, '1. Yarıyıl Tatili', '1st Semester Vacation', '10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A', '1,2,3', '2018-01-24'),
(7194, '1. Yarıyıl Tatili', '1st Semester Vacation', '7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A', '1,2,3', '2018-01-25'),
(7195, '1. Yarıyıl Tatili', '1st Semester Vacation', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2018-01-26'),
(7196, '1. Yarıyıl Tatili', '1st Semester Vacation', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2018-01-27'),
(7197, '1. Yarıyıl Tatili', '1st Semester Vacation', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2018-01-28'),
(7198, '1. Yarıyıl Tatili', '1st Semester Vacation', '2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C', '1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1', '2018-01-29'),
(7199, '1. Yarıyıl Tatili', '1st Semester Vacation', '9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A', '1,2,3', '2018-01-30'),
(7200, '1. Yarıyıl Tatili', '1st Semester Vacation', '9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,12-TM-B,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A', '1,2,3', '2018-01-31'),
(7201, '1. Yarıyıl Tatili', '1st Semester Vacation', '9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,12-TM-B,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A', '1,2,3', '2018-02-01'),
(7202, '1. Yarıyıl Tatili', '1st Semester Vacation', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2018-02-02'),
(7203, '2. Dönem Başlangıcı', '2. Term Begins', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2018-02-05'),
(7204, 'İspanya Kültür Haftası', 'Spain Culture Week', '9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B', '1,2,3', '2018-02-12'),
(7205, 'İspanya Kültür Haftası', 'Spain Culture Week', '10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A', '1,2,3', '2018-02-13'),
(7206, 'İspanya Kültür Haftası', 'Spain Culture Week', '10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A', '1,2,3', '2018-02-14'),
(7207, 'İspanya Kültür Haftası', 'Spain Culture Week', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1,2,3', '2018-02-15'),
(7208, 'İspanya Kültür Haftası', 'Spain Culture Week', '9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A', '1,2,3', '2018-02-16'),
(7210, '18 Mart Töreni', 'March 18 Ceremony-Çanakkale', '9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A', '1,2,3', '2018-03-16'),
(7211, '23 Nisan-Ulusal Egemenlik ve Çocuk Bayramı', 'April 23-National Sovereignty and Children\'s Day', '11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B', '1,2,3', '2018-04-23'),
(7212, 'Tatil', 'Holiday', '6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A', '1,2,3', '2018-05-01'),
(7213, 'Atatürk\'ü Anma Gençlik ve Spor Bayramı Töreni', 'Celebration of Atatürk Youth and Sports Day Ceremony', '8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A', '1,2,3', '2018-05-19'),
(7214, 'Okul Kapanış', 'School Closing Day', '7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2,3', '2018-06-09'),
(7217, 'Seminer-Öğrenmeyi Öğrenme Programı-Dr. Sultan BATUR', 'Seminar-Learning How to Learn Program-Dr. Sultan BATUR', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,12-TM-B', '1,2,3', '2017-09-25'),
(7218, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,10-AL-B,11-MF-A,11-MF-B,11-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2017-09-25'),
(7220, 'Çocuk Gözüyle Doktor Resim Yarışması Töreni', 'Contest Ceremony \"Child Eye Doctor Painting\"', '4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,12-TM-B,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,6-D,7-A', '1,1,2,2,2,2,2,2,3,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,1,2,2', '2018-03-14'),
(7222, 'Seminer-Merve ÖZCAN', 'Seminar-Merve ÖZCAN', '11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B', '3,3,3,3,3,3,1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,31,2,3', '2017-09-28'),
(7223, 'Seminer-Mental Aritmetik', 'Seminar-Mental Arithmetic', '8-D,7-B,8-A,8-B,8-C', '2', '2017-09-06'),
(7224, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '6-A,6-B,6-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A', '1,2', '2017-09-06'),
(7254, 'Seminer-Akran Zorbalığı-Merve Özcan KURT', 'Seminar-Peer Bulletin-Merve Özcan KURT', '7-B,8-A,8-B,8-C,8-D,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A', '1,2', '2017-09-08'),
(7276, 'İlkokul Zümre Toplantısı-Dr. Sultan BATUR', 'Primary School Branch Meeting-Sultan BATUR MD.', '3-B,3-C,1-A,1-B,1-C,2-A,4-A,2-B,2-C,2-D,3-A,4-B', '1', '2017-09-14'),
(7277, 'İlkokul 1. Sınıflar Oryantasyon', 'Primary School 1st Class Orientation', '1-C,1-A,1-B', '1', '2017-09-15'),
(7287, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,12-MF-B,12-TM-A', '1,2,3', '2017-09-28'),
(7292, 'Değerler Eğitimi-Başlangıç', 'Values Education-Beginner', '8-C,8-D,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,7-A,7-B,8-A,8-B,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D', '1,2', '2017-10-02'),
(7293, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A', '1,2,3', '2017-10-02'),
(7294, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '6-B,6-C,12-TM-B,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A', '1,2,3', '2017-10-04'),
(7295, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C', '1,2,3', '2017-10-10'),
(7296, 'Okul Aile Birliği Genel Kurul Toplantısı', 'School Parent Association General Assembly Meeting', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A', '1,2,3', '2017-10-12'),
(7297, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,12-TM-B', '1,2,3', '2017-10-12'),
(7298, 'Haftasonu Kurslarının Başlangıcı', 'Beginning of the Weekend Courses', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,8-D,7-B,8-A,8-B,8-C', '2', '2017-10-21'),
(7299, 'Üniversite Gezisi', 'University Trip', '12-TM-B,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,9-FL-A', '3', '2017-10-21'),
(7300, 'Veli Toplantısı', 'Parent Meeting', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-11-04'),
(7301, 'İlkokul Şube Öğretmen Kurul Toplantısı', 'Primary School Class Teacher Board Meeting', '3-B,3-C,4-A,4-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A', '1', '2017-11-23'),
(7302, '5. Sınıflar Sanat Günleri (İngilizce Şarkı)', 'Art Days of 5th Grades (English Songs)', '5-C,5-A,5-B', '2', '2018-05-08'),
(7303, '5. Sınıflar Sanat Günleri (Resital + Sergi)', 'Art Days of 5th Grades (Recital + Exhibition)', '5-C,5-A,5-B', '2', '2018-05-08'),
(7304, '3. Sınıflar Sanat Günleri (Drama)', 'Art Days of 3rd Grades (Drama)', '3-C,3-A,3-B', '1', '2018-05-29'),
(7305, '3. Sınıflar Sanat Günleri (Resital + Sergi)', 'Art Days of 3rd Grades (Recital + Exhibition)', '3-C,3-A,3-B', '1', '2018-05-29'),
(7368, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B', '1,2', '2017-09-14'),
(7370, 'AEK Kurum Kültürü-Dr. Sultan BATUR', 'AEK Corporate Culture-Dr. Sultan BATUR', '6-A,6-B,6-C,6-D,4-A,7-A,7-B,8-A,8-B,4-B,8-C,8-D,9-FL-A,9-FL-B,5-A,9-AL-A,9-AL-B,10-FL-A,10-FL-B,5-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,5-C,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-C,2-A,3-B,3-C,1-A,1-B,1-B,2-B,2-C,2-D,3-A', '1,2,3', '2017-09-16'),
(7372, 'Seminer-Merve ÖZCAN', 'Seminar-Merve ÖZCAN', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B', '1,1,1,1,1,1,1,1,1,2,2,2,2,2,2,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,2,2,2,2,2,2,3,3', '2017-09-27'),
(7373, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '12-MF-B,12-TM-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A', '1,2,3', '2017-09-27'),
(7374, 'Seminer-Tam ve Kalıcı Öğrenme-Dr. Sultan BATUR', 'Seminar-Full and Permanent Learning-Dr. Sultan BATUR', '12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A', '1,2,3', '2017-09-29'),
(7375, 'Öğrenmeyi Öğrenme Programı', 'Learning to Learn Program', '12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A', '1,2,3', '2017-09-29'),
(7418, '12. sınıf YGS Programı', '12th grade YGS Program', '12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-B,12-TM-A,12-TM-A,12-TM-B', '3', '2017-09-08'),
(7419, 'TEOG Kampı', 'TEOG Camp', '8-A,8-B,8-B,8-C,8-B,8-C,8-C,8-D', '2', '2017-09-08'),
(7431, 'Beyin Temelli Eğitim-Dr. Sultan BATUR', 'Brain Based Training-Sultan BATUR MD.', '10-AL-B,5-C,6-A,6-B,6-C,11-MF-A,6-D,7-A,7-B,8-A,12-MF-A,12-MF-B,11-MF-B,8-B,8-C,8-D,9-FL-A,9-AL-A,12-TM-A,9-FL-B,9-FL-B,9-AL-B,12-TM-B,1-A,1-B,10-FL-A,1-C,2-A,2-B,2-C,10-FL-B,2-D,3-A,3-B,3-C,10-AL-A,4-A,4-B,5-A,5-B,9-FL-B,9-AL-B,12-TM-B,1-A,1-B,10-FL-A,1-C,2-A,2-B,2-C,10-FL-B,2-D,3-A,3-B,3-C,10-AL-A,4-A,4-B,5-A,5-B,9-AL-B,12-TM-B,1-A,1-B,10-FL-A,1-C,2-A,2-B,2-C,10-FL-B,2-D,3-A,3-B,3-C,10-AL-A,4-A,4-B,5-A,5-B,11-TM-A,11-TM-B', '1,2,3', '2017-09-16'),
(7496, 'Temel Matematik, Türkçe ve Yabancı Diller Takviye Programı', 'Basic Mathematics, Turkish and Foreign Language Reinforcement Program', '9-FL-A,9-FL-B,9-FL-B,9-AL-A,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-A,9-AL-B,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B', '3', '2017-09-07'),
(7526, 'Ortaokul Kurul', 'Middle School Board', '6-D,7-A,7-A,7-B,7-A,7-B,7-B,8-A,7-A,7-B,7-B,8-A,7-B,8-A,8-A,8-B,7-A,7-B,7-B,8-A,7-B,8-A,8-A,8-B,7-B,8-A,8-A,8-B,8-A,8-B,8-B,8-C,7-A,7-B,7-B,8-A,7-B,8-A,8-A,8-B,7-B,8-A,8-A,8-B,8-A,8-B,8-B,8-C,7-B,8-A,8-A,8-B,8-A,8-B,8-B,8-C,8-A,8-B,8-B,8-C,5-A,5-B,5-C,6-A,8-D,6-B,6-C', '2', '2017-09-07'),
(7532, 'Seminer-Ergenlik Başlangıcı ve Ergenlerle İletişim', 'Seminar-Beginning and Communication with Adolescents', '1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A', '1', '2017-09-11'),
(7533, 'Temel Matematik, Türkçe ve Yabancı Diller Takviye Programı', 'Basic Mathematics, Turkish and Foreign Language Reinforcement Program', '9-FL-A,9-FL-B,9-FL-B,9-AL-A,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,9-AL-B,10-FL-A,10-FL-A,10-FL-B,10-FL-A,10-FL-B,10-FL-B,10-AL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,10-FL-A,10-FL-B,10-FL-B,10-AL-A,10-FL-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B', '3', '2017-09-11'),
(7552, 'Temel Matematik, Türkçe ve Yabancı Diller Takviye Programı', 'Basic Mathematics, Turkish and Foreign Language Reinforcement Program', '9-FL-A,9-FL-B,9-FL-B,9-AL-A,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,9-AL-B,10-FL-A,10-FL-A,10-FL-B,10-FL-A,10-FL-B,10-FL-B,10-AL-A,9-FL-B,9-AL-A,9-AL-A,9-AL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,9-AL-B,10-FL-A,10-FL-A,10-FL-B,10-FL-A,10-FL-B,10-FL-B,10-AL-A,9-AL-A,9-AL-B,9-AL-B,10-FL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,9-AL-B,10-FL-A,10-FL-A,10-FL-B,10-FL-A,10-FL-B,10-FL-B,10-AL-A,9-AL-B,10-FL-A,10-FL-A,10-FL-B,10-FL-A,10-FL-B,10-FL-B,10-AL-A,10-FL-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B', '3', '2017-09-08'),
(7568, 'Ortaokul Kurul', 'Middle School Board', '5-A,5-B,8-A,8-B,5-C,6-A,6-A,6-B,5-C,6-A,6-A,6-B,6-A,6-B,6-B,6-C,5-C,6-A,6-A,6-B,6-A,6-B,6-B,6-C,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,5-C,6-A,6-A,6-B,6-A,6-B,6-B,6-C,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,5-C,6-A,6-A,6-B,6-A,6-B,6-B,6-C,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-C,6-D,6-D,7-A,6-D,7-A,7-A,7-B,5-C,6-A,6-A,6-B,6-A,6-B,6-B,6-C,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-C,6-D,6-D,7-A,6-D,7-A,7-A,7-B,6-A,6-B,6-B,6-C,6-B,6-C,6-C,6-D,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-C,6-D,6-D,7-A,6-D,7-A,7-A,7-B,6-B,6-C,6-C,6-D,6-C,6-D,6-D,7-A,6-C,6-D,6-D,7-A,6-D,7-A,7-A,7-B,6-C,6-D,6-D,7-A,6-D,7-A,7-A,7-B,6-D,7-A,7-A,7-B,7-A,7-B,7-B,8-C,8-D', '2', '2017-09-08');
INSERT INTO `general_etkinlik_takvimi` (`No`, `tr_Aciklama`, `en_Aciklama`, `Sube`, `Okul`, `Tarih`) VALUES
(7609, 'AEK Döner Günü', 'AEK Döner Day', '8-D,9-FL-A,9-FL-B,9-AL-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-B,12-TM-A,12-TM-A,12-TM-B,1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,10-FL-B,10-FL-B,10-AL-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-B,12-TM-A,12-TM-A,12-TM-B,10-FL-B,10-AL-A,10-AL-A,10-AL-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-B,12-TM-A,12-TM-A,12-TM-B,10-AL-A,10-AL-B,10-AL-B,11-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-B,12-TM-A,12-TM-A,12-TM-B,10-AL-B,11-MF-A,11-MF-A,11-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-B,12-TM-A,12-TM-A,12-TM-B,11-MF-A,11-MF-B,11-MF-B,11-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-A,12-MF-B,12-MF-B,12-TM-A,12-MF-B,12-TM-A,12-TM-A,12-TM-B,11-MF-B,11-TM-A,11-TM-A,11-TM-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-A,11-TM-B,11-TM-B,12-MF-A,11-TM-B,12-MF-A,12-MF-A,12-MF-B,11-TM-B,12-MF-A,12-MF-A,12-MF-B,12-MF-A,12-MF-B,12-MF-B,12-TM-A,11-TM-A,11-TM-B,11-TM-', '1,2,3', '2018-06-08');
INSERT INTO `general_etkinlik_takvimi` (`No`, `tr_Aciklama`, `en_Aciklama`, `Sube`, `Okul`, `Tarih`) VALUES
(7610, 'Karne', 'school report', '9-FL-B,9-AL-A,9-AL-B,10-FL-A,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,1-A,1-A,1-B,1-A,1-B,1-B,1-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-A,1-B,1-B,1-C,1-B,1-C,1-C,2-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-B,1-C,1-C,2-A,1-C,2-A,2-A,2-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,2-C,2-D,2-D,3-A,2-D,3-A,3-A,3-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,2-D,3-A,3-A,3-B,3-A,3-B,3-B,3-C,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,3-A,3-B,3-B,3-C,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,3-B,3-C,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,3-C,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,10-FL-B,10-AL-A', '1,2,3', '2018-06-08'),
(7611, 'Seminer-Takım Ruhu-Serçin ŞENER', 'Seminar-Team Spirit-Serçin ŞENER', '8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A', '1,2,3', '2017-09-12'),
(7613, 'Ortaokul Zümre Toplantısı-Dr. Sultan BATUR', 'Middle School Branch Meeting-Sultan BATUR MD.', '5-A,5-B,8-B,8-C,8-D,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A', '2', '2017-09-14'),
(7614, 'Temel Matematik, Türkçe ve Yabancı Diller Takviye Programı', 'Basic Mathematics, Turkish and Foreign Language Reinforcement Program', '10-FL-A,10-FL-B,10-AL-A,10-AL-B,10-AL-B,9-FL-A,9-FL-B,9-AL-A,9-AL-B', '3', '2017-09-14'),
(7616, 'Yabancı Diller Takviye Programı', 'Foreign Language Reinforcement Program', '7-B,4-B,5-A,5-B,5-C', '1,2', '2017-09-06'),
(7617, 'Seminer-Ergenlik Başlangıcı ve Ergenlerle İletişim', 'Seminar-Beginning and Communication with Adolescents', '1-C,2-A,2-A,2-B,2-A,2-B,2-B,2-C,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-A,2-B,2-B,2-C,2-B,2-C,2-C,2-D,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-B,2-C,2-C,2-D,2-C,2-D,2-D,3-A,2-C,2-D,2-D,3-A,2-D,3-A,3-A,12-MF-B,12-TM-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,12-TM-B,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A', '1,2,3', '2017-09-11'),
(7618, 'Açık Sınıf Günü', 'Open Class Day', '3-A,3-B,3-C', '1', '2018-03-07'),
(7619, 'Seminer-Serçin ŞENER', 'Seminar-Serçin ŞENER', '4-B,5-A,5-B,5-C,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B', '1,2,3', '2017-09-05'),
(7620, 'vgyuvgvuy', '', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2020-10-14');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_footer`
--

DROP TABLE IF EXISTS `general_footer`;
CREATE TABLE IF NOT EXISTS `general_footer` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Facebook` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Facebook` text COLLATE utf8_turkish_ci NOT NULL,
  `tr_Twitter` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Twitter` text COLLATE utf8_turkish_ci NOT NULL,
  `tr_Youtube` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Youtube` text COLLATE utf8_turkish_ci NOT NULL,
  `tr_Instagram` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Instagram` text COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_footer`
--

INSERT INTO `general_footer` (`No`, `tr_Facebook`, `en_Facebook`, `tr_Twitter`, `en_Twitter`, `tr_Youtube`, `en_Youtube`, `tr_Instagram`, `en_Instagram`) VALUES
(1, '#', '', '#', '', '#', '', '#', '');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_galeriler`
--

DROP TABLE IF EXISTS `general_galeriler`;
CREATE TABLE IF NOT EXISTS `general_galeriler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_AnaResim` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT '',
  `tr_DigerResimler` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_AnaResim` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT '',
  `en_DigerResimler` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `tr_SectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_SectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Okul` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tarih` date NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=79 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_galeriler`
--

INSERT INTO `general_galeriler` (`No`, `tr_Baslik`, `en_Baslik`, `tr_AnaResim`, `tr_DigerResimler`, `en_AnaResim`, `en_DigerResimler`, `tr_Yazi`, `en_Yazi`, `tr_SectionID`, `en_SectionID`, `Okul`, `Tarih`) VALUES
(76, 'Okulumuzdan Kareler', '', 'Galeri/Galeri-001.jpg', 'Galeri/Galeri-050.jpg,Galeri/Galeri-049.jpg,Galeri/Galeri-048.jpg,Galeri/Galeri-047.jpg,Galeri/Galeri-046.jpg,Galeri/Galeri-045.jpg,Galeri/Galeri-044.jpg,Galeri/Galeri-043.jpg,Galeri/Galeri-042.jpg,Galeri/Galeri-041.jpg,Galeri/Galeri-040.jpg', '', '', 'Okulumuzdan Kareler', '', 'Okulumuzdan-Kareler', '', '0,1,2,3', '2015-06-01'),
(77, 'Okulumuzdan Kareler', '', 'Galeri/Galeri-097.jpg', 'Galeri/Galeri-100.jpg,Galeri/Galeri-099.jpg,Galeri/Galeri-098.jpg,Galeri/Galeri-097.jpg,Galeri/Galeri-096.jpg,Galeri/Galeri-095.jpg,Galeri/Galeri-094.jpg,Galeri/Galeri-093.jpg,Galeri/Galeri-092.jpg,Galeri/Galeri-091.jpg,Galeri/Galeri-090.jpg,Galeri/Galeri', '', '', 'Okulumuzdan kareler', '', 'Okulumuzdan-Kareler', '', '0,1,2,3', '2015-06-01'),
(78, 'Okulumuzdan Kareler', '', 'Galeri/Galeri-111.jpg', 'Galeri/Galeri-127.jpg,Galeri/Galeri-126.jpg,Galeri/Galeri-125.jpg,Galeri/Galeri-124.jpg,Galeri/Galeri-123.jpg,Galeri/Galeri-122.jpg,Galeri/Galeri-121.jpg,Galeri/Galeri-120.jpg,Galeri/Galeri-119.jpg,Galeri/Galeri-118.jpg,Galeri/Galeri-117.jpg', '', '', 'Okulumuzdan Kareler', '', 'Okulumuzdan-Kareler', '', '0,1,2,3', '2015-06-01');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_haberler`
--

DROP TABLE IF EXISTS `general_haberler`;
CREATE TABLE IF NOT EXISTS `general_haberler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_AnaResim` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT '',
  `tr_DigerResimler` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_AnaResim` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT '',
  `en_DigerResimler` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `tr_SectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_SectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Okul` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tarih` date NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=118 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_haberler`
--

INSERT INTO `general_haberler` (`No`, `tr_Baslik`, `en_Baslik`, `tr_AnaResim`, `tr_DigerResimler`, `en_AnaResim`, `en_DigerResimler`, `tr_Yazi`, `en_Yazi`, `tr_SectionID`, `en_SectionID`, `Okul`, `Tarih`) VALUES
(18, 'KONUMUZ HAVA DURUMU VE MEVSİMLER', '', 'Haberler/20170105-H-ING-HABER-VE-MEVSIMLER.jpg', '', '', '', 'Okulumuz  3. sınıf öğrencileri hava durumu ve mevsimler konusunu işlediler. İngilizce dersinde de bu konuyla ilgili görseller hazırlayıp panolarına astılar. Ellerinize , emeğinize sağlık çocuklar…', '', 'KONUMUZ-HAVA-DURUMU-VE-MEVSIMLER', '', '0,1,2,3', '2017-01-05'),
(19, 'İNGİLİZCE DERSİNDE DOMİNO OYNADIK', '', 'Haberler/20170118-H-INGILIZCE-DOMINO.jpg', '', '', '', '3. sınıf öğrencilerimiz İngilizce dersinde bugün Domino oynadılar. Hem eğlendiler, hem öğrendiler...', '', 'INGILIZCE-DERSINDE-DOMINO-OYNADIK', '', '0,1,2,3', '2017-01-18'),
(20, 'NOKTALAMA İŞARETLERİNİ ÖĞRENİYORUZ', '', 'Haberler/20170206-H-NOKTALAMA-ISARETLERI.jpg', '', '', '', '3. sınıf öğrencilerimiz İngilizce dersinde bugün Domino oynadılar. Hem eğlendiler, hem öğrendiler...', '', 'NOKTALAMA-ISARETLERINI-OGRENIYORUZ', '', '0,1,2,3', '2017-02-06'),
(22, 'DEĞERLER EĞİTİMİNDE KONUMUZ ÖZDENETİM', '', 'Haberler/20170306-H-DEGERLER-EGITIMI-OZDENETIM.jpg', '', '', '', 'Okulumuz 5.sınıf öğrencileri  “Değerler Eğitimi” kapsamında  hazırladıkları “Özdenetim” konulu programlarını sergiledi.  Kendilerini izleyen velilerine , öğretmenlerine ve arkadaşlarına  güzel anlar yaşatan öğrencilerimizi kutluyoruz.', '', 'DEGERLER-EGITIMINDE-KONUMUZ-OZDENETIM', '', '0,1,2,3', '2017-03-06'),
(23, 'SATRANÇ OYNUYORUZ', '', 'Haberler/20170106-H-SATRANC2.jpg', '', '', '', 'Araştıran, düşünen bireyler yetiştirmek en büyük hedefimiz…Bu nedenle satranç dersimiz bizim için hayli önemli. Satranç  sayesinde konsantrasyonumuzu arttırıyor, hafızamızı geliştiriyor, hayal gücümüzü zenginleştiriyor, en önemlisi de verdiğimiz kararların sorumluluğunu almayı öğreniyoruz.', '', 'SATRANC-OYNUYORUZ', '', '0,1,2,3', '2017-01-06'),
(24, 'TÜRKÇE DERSİNDE KONUMUZ ZAMİRLER', '', 'Haberler/20170308-H-TURKCE-ZAMIRLER.jpg', '', '', '', '6. sınıf öğrencilerimiz zamirler konusunu işlerken kendileri zamirlerle ilgili oyun ürettiler. Hem eğlendiler, hem öğrendiler.', '', 'TURKCE-DERSINDE-KONUMUZ-ZAMIRLER', '', '0,1,2,3', '2017-03-08'),
(25, 'TÜRKÇE DERSİNDEYİZ', '', 'Haberler/20170215-H-TURKCE.jpg', '', '', '', '7. sınıf öğrencilerimiz Türkçe dersinde yazma çalışması yaptı. Verilen kelimeleri kullanarak şiir ya da hikaye yazan öğrencilerimiz sonrasında dilimize giren yabancı sözcükleri ve bu sözcüklerin Türkçe karşılıkları konusunu işleyerek panolarını hazırladı.', '', 'TURKCE-DERSINDEYIZ', '', '0,1,2,3', '2017-02-15'),
(26, '1-A SINIFI OKUMA BAYRAMI', '', 'Haberler/20170525-H-OKUMA-BAYRAMI2.jpg', '', '', '', 'Okulumuz  1-A sınıfı öğrencileri okuma bayramlarını gerçekleştirdi. O minicik kalpler bütün yıl boyunca çalıştı, öğrendi ve verdiği emeklerin karşılığını kocaman alkışlarla aldı. Sizleri çok seviyoruz, yolunuz hep aydınlık olsun sevgili çocuklar…', '', '1-A-SINIFI-OKUMA-BAYRAMI', '', '0,1,2,3', '2017-05-25'),
(27, 'MEMORIAD 2017 KOLEJİMİZDE GERÇEKLEŞTİ', '', 'Haberler/20170911-H-MEMORIAD.JPG', '', '', '', 'Tüm dünyadan ve Türkiye’den seçilmiş en iyi çocukların yarıştığı “Memoriad 2017 Türkiye Open Mental Aritmetik Şampiyonası  10 Eylül Pazar günü kolejimizde gerçekleşti. Memoriad Dünya Yönetim Kurulu Üyesi ve Memoriad Türkiye Başkanı Melik Duyar , 5 ile 12 yaş arasındaki en iyi 154 çocuğun yarıştığı bu etkinlikteki  amacın, ailelerin ve çocukların dikkatlerinin beyin performansına çekilmesi ve toplumun beyni etkin kullanma farkındalığının arttırılması olarak ifade etti.', '', 'MEMORIAD-2017-KOLEJIMIZDE-GERCEKLESTI', '', '0,1,2,3', '2017-09-11'),
(28, 'MİNİ MİNİ BİRLERİMİZ ORYANTASYON PROGRAMINDA', '', 'Haberler/20170919-H-ORYANTASYON1.jpg', '', '', '', 'Mini mini 1’lerimizin okul heyecanı başladı. Oryantasyon programımızda öğretmenleriyle ve arkadaşlarıyla tanışan miniklerimiz animasyon gösterisi ve balon şov ile çok ama çok eğlendi. Müzik zümremizin velilerimize hazırladığı program ise hepimize güzel anlar yaşattı. Yeni başlayan miniklerimize hoş geldiniz diyor, başarılarının ve mutluluklarının bir ömür sürmesini diliyoruz.', '', 'MINI-MINI-BIRLERIMIZ-ORYANTASYON-PROGRAMINDA', '', '0,1,2,3', '2017-09-19'),
(29, 'İLK DERS ZİLİMİZ ÇALDI', '', 'Haberler/20170920-H-OKULDA-ILK-GUN.jpg', '', '', '', 'Öğrencilerimiz, öğretmenlerimiz ve velilerimizle birlikte bu eğitim öğretim yılına törenle başladık. Okulumuzda çalan ilk ders zilinin heyecanını bizimle paylaşan tüm velilerimize teşekkür eder, öğrencilerimize ve öğretmenlerimize başarılı bir yıl dileriz.', '', 'ILK-DERS-ZILIMIZ-CALDI', '', '0,1,2,3', '2017-09-20'),
(30, 'TİYATRO OYUNUMUZU KONUKLARIMIZLA İZLEDİK', '', 'Haberler/20171004-H-ANAOKUL-TIYATRO-1.jpg', '', '', '', 'Anaokulumuzun minikleri  tiyatro oyunu izlemek için kolejimize geldi. Misafir öğrencilerimizle birlikte oyunu keyifle izleyen minikler kolejimizden mutlu ayrıldı.', '', 'TIYATRO-OYUNUMUZU-KONUKLARIMIZLA-IZLEDIK', '', '0,1,2,3', '2017-10-04'),
(31, '15 TEMMUZ ANMA TÖRENİMİZ GERÇEKLEŞTİ', '', 'Haberler/20171004-H-15-TEMMUZ-ANMA.jpg', '', '', '', '15 Temmuz gecesi Türk halkının umutlarına, hayallerine ve geleceğine deyim yerindeyse darbe vurulmak istenmiştir. Aynen Atatürk’ün biz gençlere söylediği gibi cebren ve hile ile aziz vatanımızın bütün kaleleri zaptedilmiştir, bütün tersanelerine girilmiş, bütün orduları dağıtılmış ve memleketin her köşesi bilfiil işgal edilmiştir. Ancak biz aziz Türk milletinin evlatları olarak yine Ata’mızın bize öğütlediği gibi ona yaraşır, milletine yaraşır, vatanına yaraşır bireyler olarak istikbalimizin evlatları olarak o gece doğduk. Ve bize verilen vazifeyi yerine layıkıyla yerine getirdik. Türk İstiklalini ve Türk Cumhuriyetini kurtardık. Ve tüm dünya bir kez daha anladı ki “Muhtaç olduğumuz kudret damarlarımızdaki asil kanda mevcuttur”.', '', '15-TEMMUZ-ANMA-TORENIMIZ-GERCEKLESTI', '', '0,1,2,3', '2017-10-04'),
(32, 'ÖĞRENMEYİ ÖĞRENME PROGRAMIMIZ BAŞLADI', '', 'Haberler/20170925-H-OOP.JPG', '', '', '', 'Beynimiz nasıl çalışır? Bizler kalıcı öğrenmeyi nasıl sağlarız? Tam öğrenmek nasıl gerçekleşir? Bu soruların cevaplarını bulduğumuz “Öğrenmeyi Öğrenme Programımız” kurucumuz Dr.Sultan Batur’un öğrencilerimize ve velilerimize verdiği seminerle başladı.', '', 'OGRENMEYI-OGRENME-PROGRAMIMIZ-BASLADI', '', '0,1,2,3', '2017-09-25'),
(34, 'SEREBRAL PALSİYE DİKKAT ÇEKİYORUZ', '', 'Haberler/2017-H-SEREBRAL-PALSI.jpg', '', '', '', 'Serebral palsi; doğum öncesinde, doğum sırasında ve doğum sonrası erken dönemdeki, beyin hasarı sonucu ortaya çıkan, ilerleyici olmayan ancak yaşla birlikte değişebilen, hareketi kısıtlayıcı, kalıcı motor fonksiyon kaybı, postür ve hareket bozukluğu olarak tanımlanmaktadır.  Oluşacak ek sorunları engellemek ve çocukların yaşam kalitelerini artırmak için, mümkün olan en erken yaşta tedaviye başlamak gerekir. 1.sınıf öğrencilerimiz bu konuya dikkat çekmek için yakalarına yeşil kurdelelerini takıp, öğretmenleriyle birlikte duyarlılıklarını ortaya koydu. Öğrencilerimizi yürekten kutluyoruz.', '', 'SEREBRAL-PALSIYE-DIKKAT-CEKIYORUZ', '', '1', '2017-10-05'),
(36, 'DEYİMLER VE ATASÖZLERİNİ SOMUTLAŞTIRDIK', '', 'Haberler/20171006-H-DEYIMLER-ATASOZLERI.jpg', '', '', '', 'Deyimler ve Atasözleri ile ilgili çalışmalar yapan ortaokul öğrencilerimiz sergi alanında arkadaşlarına görsellerini anlattı. Öğrencilerimizi tebrik ediyoruz.', '', 'DEYIMLER-VE-ATASOZLERINI-SOMUTLASTIRDIK', '', '2', '2017-10-06'),
(37, 'KONUMUZ KAFKA\'NIN DÖNÜŞÜM ROMANI', '', 'Haberler/20171006-H-KAFKA-DONUSUM.jpg', '', '', '', 'Türkçe dersimizde 5. sınıflarla, Kafka’nın Dönüşüm romanının ilk cümlesini tahtaya yazdık. Ve devamını onların hayal güçlerine bıraktık. Bunu yaparken de Chopin dinleyerek klasik müzik kültürüyle de minicik yürekleri tanıştırdık. Yazmak, hayal güçlerini kullanıp düşüncelerini kâğıda dökmek onlar için çok heyecan verici oldu.', '', 'KONUMUZ-KAFKA-NIN-DONUSUM-ROMANI', '', '2', '2017-10-06'),
(38, 'EL YAPIMI OYUNCAK SERGİMİZ AÇILDI', '', 'Haberler/20171007-H-EL-YAPIMI-OYUNCAK.jpg', '', '', '', 'Ortaokul öğrencilerimiz kendi elleriyle yaptıkları oyuncakları sergi alanımızda arkadaşlarıyla buluşturdu. Öğrencilerimizi tebrik ediyoruz.', '', 'EL-YAPIMI-OYUNCAK-SERGIMIZ-ACILDI', '', '2', '2017-10-07'),
(39, 'ÖĞRENCİMİZ CAN BAYOĞLU İLE GURUR DUYUYORUZ', '', 'Haberler/20171002-H-CAN-BAYOGLU-MASA-TENISI.jpg', '', '', '', 'Öğrencilerimizden Can Bayoğlu, 29 Eylül-1Ekim tarihlerinde Rize’de yapılan Masa Tenisi Yıldızlar Ferdi Türkiye Şampiyonasında Çift Erkeklerde Bronz Madalya almıştır. Öğrencimizi kutluyor, başarılarının devamını diliyoruz.', '', 'OGRENCIMIZ-CAN-BAYOGLU-ILE-GURUR-DUYUYORUZ', '', '2', '2017-10-02'),
(40, '4 EKİM HAYVANLARI KORUMA GÜNÜ', '', 'Haberler/20171004-H-HAYVANLARI-KORUMA-GUNU.jpg', '', '', '', '1931 yılında, Hollanda’nın Lahey kentinde bir araya gelen çeşitli ülke temsilcileri, “Dünya Hayvanları Koruma Federasyonu” kurulmasını kararlaştırmış, her yılın 4 Ekim gününü de “Hayvanları Koruma Günü” olarak kabul etmiştir. Hayvanları Koruma Günü’nün asıl amacı. insanlarda hayvan sevgisini geliştirmek ve bu sevginin devamlılığını sağlamaktır.Öğrencilerimiz bu anlamlı günde yaptıkları sunumla bize büyük faydalar sağlayan hayvanlara bakmak, korumak ve sevmenin  başta gelen görevlerimizden olduğunu bir kez daha hatırlattı. Öğrencilerimizi kutluyoruz.', '', '4-EKIM-HAYVANLARI-KORUMA-GUNU', '', '1', '2017-10-04'),
(41, 'MUN\'DA ŞEREF ÖDÜLÜ', '', 'Haberler/20171011-H-BILKENT-MUN.jpg', '', '', '', 'Bilkent Historical Model United Nations uluslararası sorunları önemseyen, açık görüşlü ve çok yönlü bir eğitim sağlamak amacıyla bir araya gelmiş olan öğrencilerin katılımıyla 6-9 Ekim 2017 tarihleri arasında gerçekleştirilmiştir. Bu organizasyona katılan Özel Ankara Eğitim Kurumları Anadolu Lisesi öğrencileri okulumuzu başarıyla temsil etmiş ve 9.sınıf öğrencilerimizden Selim Tuğrul Çandar Kriz Komitesinde “Honorable Mention  Şeref Ödülü” almıştır. Öğrencilerimizi yürekten tebrik ediyoruz.', '', 'MUN-DA-SEREF-ODULU', '', '3', '2017-10-11'),
(42, 'ÖĞRENCİMİZLE GURUR DUYUYORUZ', '', 'Haberler/20161228-H-BENSU-YETIK-SAMPIYON.jpg', '', '', '', '10.Sınıf öğrencilerimizden Bensu Yetik Ankara Okullar Arası Okçuluk Şampiyonasında Yıldız Kızlar Olimpik Yay şampiyonu olmuştur. Büyük başarısından dolayı öğrencimizi kutluyoruz.', '', 'OGRENCIMIZLE-GURUR-DUYUYORUZ', '', '3', '2016-12-28'),
(43, 'KEMİĞİN YAPISINI İNCELİYORUZ', '', 'Haberler/20171012-H-FEN-KEMIGIN-YAPISI.jpg', '', '', '', '6.sınıflarımızla Fen Bilgisi dersinde kemiğin yapısını inceledik. Öğrencilerimiz laboratuvarda gözlemlerini  kaydedip , araştırma yaptı.', '', 'KEMIGIN-YAPISINI-INCELIYORUZ', '', '2', '2017-10-12'),
(44, 'BASKETBOL TAKIMIMIZI KUTLUYORUZ', '', 'Haberler/20170605-H-BASKETBOL-IKINCILIK.jpg', '', '', '', 'Çankaya GHSİM 2016-2017 Okul Sporları Basketbol Genç Erkeklerde 2. olan  Anadolu Lisesi Basketbol Takımımızın tüm oyuncularını kutluyor, başarılarıyla gurur duyuyoruz.', '', 'BASKETBOL-TAKIMIMIZI-KUTLUYORUZ', '', '3', '2017-06-05'),
(45, 'SPOR DANIŞMANIMIZ MİLLİ TAKIM TARAMALARINDA', '', 'Haberler/20170117-H-SPOR-DANISMANIMIZ.jpg', '', '', '', '2019 yılında oynanacak olan Yıldız Erkek Avrupa Şampiyonası için  2003-2004 doğumlu sporculardan oluşacak milli takım taramaları Ankara’da yapılmıştır. Kolejimizin spor danışmanı Celal ZORALOĞLU  yardımcı antrenör olarak görev almıştır.  Spor danışmanımızı tebrik eder, başarılarının devamını dileriz.', '', 'SPOR-DANISMANIMIZ-MILLI-TAKIM-TARAMALARINDA', '', '0,1,2,3', '2017-01-17'),
(46, 'CAMBRIDGE PENFRIENDS PROJEMİZ BAŞLIYOR', '', 'Haberler/20161010-H-CAMBRIDGE-PENFRIENDS.png', '', '', '', 'İlkokulumuz Uluslararası Cambridge Penfriends Projesi kapsamında ikinci okulu ile eşleşti.\r\nYunanistan’daki ARSAKIO PRIMARY SCHOOL OF PATRAS okulundaki mektup arkadaşlarımızla yarıyıl tatilimiz biter bitmez yazışmaya başlayacağız.\r\nhttp://www.arsakeio.gr/…/schools…/arsakeia-schools-in-patras\r\nAynı zamanda Cambridge Penfriends projesince okulumuz ilk rozetlerini aldı.\r\nPenfriends- First Connection ile Penfriends- Friends in Europe rozetlerimizi almamızda 4-A ve 4-B sınıflarındaki öğrencilerimizi projemize katkılarından dolayı tebrik ediyoruz.', '', 'CAMBRIDGE-PENFRIENDS-PROJEMIZ-BASLIYOR', '', '0,1,2,3', '2016-10-10'),
(47, 'BURSLULUK SINAVIMIZ YOĞUN İLGİ GÖRDÜ', '', 'Haberler/20170305-H-BURSLULUK-SINAVI.jpg', '', '', '', '4 ve 5 Mart tarihinde kolejimizde yapılan ” Kayıt Kabul ve Bursluluk Sınavımız”  çok büyük bir katılımla gerçekleşti. Öğrencilerimiz sınavda iken , velilerimiz konferans salonunda kurucumuz  Dr.Sultan Batur’un okulumuzun eğitim sistemi ile ilgili bilgilendirme toplantısına katıldı. Sınavımıza katılan tüm öğrenci ve velilerimize gösterdikleri  yoğun ilgiden dolayı çok teşekkür ederiz.', '', 'BURSLULUK-SINAVIMIZ-YOGUN-ILGI-GORDU', '', '0,1,2,3', '2017-03-05'),
(48, 'TÜRKÇE DERSİNDE ÇARKIFELEK OYNADIK', '', 'Haberler/20161202-H-CARKIFELEK.jpg', '', '', '', '7.sınıflar, Türkçe dersinde \"Çarkıfelek\" oynayarak pekiştirme yaptılar. Oyunlar ve aktivitelerle zenginleştirdiğimiz programlarımızla öğrenmeyi çok daha zevkli kıldık.', '', 'TURKCE-DERSINDE-CARKIFELEK-OYNADIK', '', '2', '2016-12-02'),
(49, 'ÇOCUK GÖZÜYLE DOKTOR RESİM YARIŞMAMIZ SONUÇLANDI', '', 'Haberler/20170325-H-COCUK-GOZUYLE-DOKTOR.jpg', '', '', '', 'Her yıl geleneksel olarak düzenlediğimiz “Çocuk Gözüyle Doktor “ resim yarışmamıza Ankara’daki okullardan katılım yoğundu. Yarışmaya katılan öğrencilerin eserlerinin de sergilendiği bu etkinliğimizde ödül alan öğrencilerin mutluluğu görülmeye değerdi.  Yarışmamıza katılan okullara, idarecilerine, öğretmenlerine ve kalplerini tuvale yansıtan minik ressamlara teşekkür ediyoruz.', '', 'COCUK-GOZUYLE-DOKTOR-RESIM-YARISMAMIZ-SONUCLANDI', '', '0,1,2,3', '2017-03-25'),
(50, '5.SINIFLAR TÜRKÇE DERSİNDE', '', 'Haberler/20171013-H-5-SINIFLAR-TURKCE-DERSINDE.jpg', '', '', '', 'Bugün Türkçe dersimizde 5. sınıflarımızla öğrenmiş olduğumuz konuları kuklalarla tekrar ettik. Keyifli saatler geçiren öğrencilerimiz, daha etkin öğrenme gerçekleştirdiler.', '', '5-SINIFLAR-TURKCE-DERSINDE', '', '2', '2017-10-13'),
(51, 'CSO\'DA EĞİTİM KONSERİNDEYDİK', '', 'Haberler/20161201-H-CSO-EGITIM-KONSERI.jpg', '', '', '', '2.  sınıf  öğrencilerimiz   Cumhurbaşkanlığı   Senfoni Orkestrasının eğitim konserini izledi. Bu müzik ziyafeti için CSO’nun çok değerli sanatçılarına teşekkür ediyor, sanatın her dalının gelişerek büyümesini diliyoruz.', '', 'CSO-DA-EGITIM-KONSERINDEYDIK', '', '1', '2016-12-01'),
(52, 'ANADOLU LİSESİ ÖĞRENCİLERİMİZ LABORATUAR ÇALIŞMALARINDA', '', 'Haberler/20170306-H-FEN-LABORATUAR.jpg', '', '', '', 'Anadolu Lisesi öğrencilerimizin  laboratuar çalışmalarından kareler…', '', 'ANADOLU-LISESI-OGRENCILERIMIZ-LABORATUAR-CALISMALARINDA', '', '3', '2017-03-06'),
(53, 'ANKARA\'NIN BAŞKENT OLUŞUNUN 94.YILDÖNÜMÜ', '', 'Haberler/20171013-H-ANKARA-NIN-BASKENT-OLUSU.jpg', '', '', '', '27 Aralık 1919’da Temsil Heyeti’nin Ankara’ya gelmesi ile, Ankara halkı büyük bir sevinç ile Atatürk ve beraberindeki heyeti karşılamış; böylece bu şehir Millî Mücadele’nin karargâhı olmuştu. 23 Nisan 1920’de Türkiye Büyük Millet Meclisi’nin Ankara’da açılmasıyla yeni Türk devletinin temelleri atıldı. Kurtuluş Savaşı buradan yönetildi. Böylece Ankara, fiilen başkent durumuna geldi. Milli Mücadele’nin, hürriyet ve bağımsızlığa kavuşma savaşının merkezi haline geldi. Ankara, Birinci Büyük Millet Meclisi’nin toplanmasından Cumhuriyet’in ilanına kadar geçen süre içinde sayısız olaylara sahne oldu, 13 Ekim 1923’te başkent olarak kabul edildi. İlkokul öğrencilerimiz Ankara’nın başkent oluşunun 94.yıldönümünde güzel bir sunum yaparak bu anlamlı günü kutladı. Öğrencilerimizi tebrik ediyoruz.', '', 'ANKARA-NIN-BASKENT-OLUSUNUN-94-YILDONUMU', '', '1', '2017-10-13'),
(56, 'DEĞERLER EĞİTİMİNDE KONUMUZ EMPATİ', '', 'Haberler/20170308-H-EMPATI.jpg', '', '', '', 'Empati bir kişinin kendisini duygu ve düşüncelerinden soyutlayarak bir başkasının inançlarını, arzularını ve özellikle duygularını farkına varabilme ve anlayabilme yeteneğidir. Okulumuz 6-B sınıfı öğrencileri Değerler Eğitimi kapsamında “Empati” konusunu işlediler. Yaptıkları sunumlar ve tiyatro oyunuyla arkadaşlarının ve velilerinin beğenisini kazanan öğrencilerimizi kutluyoruz.', '', 'DEGERLER-EGITIMINDE-KONUMUZ-EMPATI', '', '2', '2017-03-08'),
(57, 'ÇEVRE KİRLİLİĞİ KONULU AFİŞLERİMİZ HAZIR', '', 'Haberler/20170412-H-CEVRE-KIRLILIGI-AFIS.jpg', '', '', '', 'Okulumuz öğrencileri \"Bir Kavak ve İnsanlar\" metninden hareketle \"Çevre Kirliliği\" ile ilgili afişler hazırladılar.', '', 'CEVRE-KIRLILIGI-KONULU-AFISLERIMIZ-HAZIR', '', '2', '2017-04-12'),
(59, 'ÖĞRENMEYİ ÖĞRENME PROGRAMI EĞLENCELİ PARTİYLE SONA ERDİ', '', 'Haberler/20171013-H-OOP-PARTI1.jpg', 'Haberler/20171013-H-OOP-002.jpg,Haberler/20171013-H-OOP-001.jpg', '', '', 'Kalıcı öğrenmenin nasıl olacağını, ders çalışma tekniklerini öğrenen öğrencilerimiz “ Öğrenmeyi Öğrenme Programımızın” sona ermesini her zaman olduğu gibi bir parti ile kutladı. Partinin sonunda öğrencilerimiz, velilerimiz ve öğretmenlerimizle birlikte pastamızı  kestik. Mini konserden sonra  dans ederek eğlenen öğrencilerimizin mutluluğu görülmeye değerdi.', '', 'OGRENMEYI-OGRENME-PROGRAMI-EGLENCELI-PARTIYLE-SONA-ERDI', '', '0,1,2,3', '2017-10-13'),
(61, 'SÜRPRİZ HEDİYE CEREN\'İN', '', 'Haberler/20171016-H-ACTIVE-LEARN.jpg', '', '', '', 'Online Active Learn Programında en fazla kitap okuyan 4.sınıf  öğrencimiz Ceren Sayın’a  sürpriz hediyesi  İngilizce zümre başkanı Hülya Yüceler tarafından verildi.. Öğrencimizi tebrik ediyoruz.', '', 'SURPRIZ-HEDIYE-CEREN-IN', '', '1', '2017-10-16'),
(62, 'TÜRKÇE ETKİNLİK GÜNLERİ BAŞLADI', '', 'Haberler/20171014-H-TURKCE-ETKINLIK-GUNLERI.jpg', 'Haberler/20171014-H-TURKCE-ETKINLIK-GUNLERI41.jpg,Haberler/20171014-H-TURKCE-ETKINLIK-GUNLERI5.jpg,Haberler/20171014-H-TURKCE-ETKINLIK-GUNLERI3.jpg,Haberler/20171014-H-TURKCE-ETKINLIK-GUNLERI2.jpg,Haberler/20171014-H-TURKCE-ETKINLIK-GUNLERI1.jpg,Haberler/', '', '', '“Etkinlik Günleri” kapsamında program hazırlayan ortaokul öğrencilerimiz pandomim gösterisi yaptı.  Atık materyallerden kıyafetler hazırlayıp bir defileyle bunları arkadaşlarına ve velilerine sunan öğrencilerimizin  işitme engelliler dili ile söylediği şarkı büyük beğeni aldı. Öğrencilerimizi tebrik ediyoruz.', '', 'TURKCE-ETKINLIK-GUNLERI-BASLADI', '', '2', '2017-10-14'),
(65, 'OKUL AİLE BİRLİĞİ TOPLANTIMIZ GERÇEKLEŞTİ', '', 'Haberler/20171012-H-OAB.jpg', 'Haberler/20171012-H-OAB.jpg,Haberler/20171012-H-OAB-GENEL-KURUL1.jpg', '', '', '12 Ekim Perşembe günü gerçekleştirilen Okul Aile Birliği Genel Kurul Toplantısında yeni asil  ve yedek üyelerimizin seçimi gerçekleştirildi. Yönetim Asil Üyeliklerimize; Çağrı HAMURCU,Gonca DUMAN, Ayla AYDOĞDU, Mavi DUMANKAYA, Yasemin DOĞAN seçilirken , yedek üyelerimiz Yeşim ÇAĞLAR, Hülya KAMBUR, Serap  İLİKLİ, Zeynep ERKAN, İbrahim CİHAN, Güler DEMİR  olarak belirlendi. Denetleme asil üyesi Nur OKÇU olurken, denetleme yedek üyeliğine Çiğdem MAYDA seçildi. Seçilen tüm üyelerimize yeni görevlerinde başarılar dileriz.', '', 'OKUL-AILE-BIRLIGI-TOPLANTIMIZ-GERCEKLESTI', '', '0,1,2,3', '2017-10-12'),
(66, 'HAFIZA TEKNİKLERİ ÜZERİNE ÇALIŞIYORUZ', '', 'Haberler/20171018-H-HAFIZA-TEKNIKLERI-8-SINIF.jpg', 'Haberler/20171018-H-HAFIZA-TEKNIKLERI2.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI1.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI-8-SINIF.jpg', '', '', 'Türkçe dersimizde 8. sınıflarımızla hafıza tekniklerinden biri olan \"kodlamayı\" kullanarak dersimizi işledik. Bilgiyi belli sembollerle kodlayarak kalıcı öğrenme gerçekleştiren öğrencilerimiz eğlenerek keyifli bir gün geçirdiler.', '', 'HAFIZA-TEKNIKLERI-UZERINE-CALISIYORUZ', '', '2', '2017-10-18'),
(67, 'HAFTANIN YILDIZLARI', '', 'Haberler/20171018-H-HAFTANIN-YILDIZLARI.jpg', 'Haberler/20171018-H-HAFTANIN-YILDIZLARI2.jpg,Haberler/20171018-H-HAFTANIN-YILDIZLARI1.jpg', '', '', 'İngilizcede haftanın yıldızları sahiplerini buldu. Her hafta ödevlerini zamanında getiren, sınıf kurallarına uyan ve dersi iyi dinleyen öğrencilerimiz, dönüşümlü olarak yıldızlarla ödüllendirilecekler. 1. ve 2.sınıf öğrencilerimizi tebrik ediyoruz.', '', 'HAFTANIN-YILDIZLARI', '', '1', '2017-10-18'),
(68, 'EROZYONU ÖNLEME HAFTASI', '', 'Haberler/20171018-H-TEMA1.jpg', 'Haberler/20171018-H-TEMA4.jpg,Haberler/20171018-H-TEMA3.jpg,Haberler/20171018-H-TEMA2.jpg', '', '', 'TEMA Çayyolu Temsilciliği Gönüllüleri Aylin Tural, Gönül Başbay, Semra Erigüç ve Şükran Tunç okulumuzu ziyaret etti. “Erozyonu Önleme Haftası” nedeniyle orman konulu seminer veren Aylin Tural’ı öğrencilerimiz büyük bir dikkatle dinledi. TEMA Çayyolu Temsilciliği gönüllülerine çok teşekkür ediyoruz.', '', 'EROZYONU-ONLEME-HAFTASI', '', '1,2', '2017-10-18'),
(69, 'KİTAP OKUMAYI SEVİYORUZ', '', 'Haberler/20171020-H-KITAP-OKUMA1.jpg', 'Haberler/20171020-H-KITAP-OKUMA4.jpg,Haberler/20171020-H-KITAP-OKUMA3.jpg,Haberler/20171020-H-KITAP-OKUMA2.jpg', '', '', 'Bugün Türkçe dersimizde, daha önce dağıtmış olduğumuz haftalık kitap okuma formlarını kontrol günümüzdü. Velileriyle birlikte evde her gün düzenli 1 saat kitap okuyan 5. sınıflarımızdan en çok okuyan arkadaşlarımızı balonlarla ödüllendirdik. Keyifli bir ders geçirdik.', '', 'KITAP-OKUMAYI-SEVIYORUZ', '', '2', '2017-10-20'),
(70, '2017-2018 EKİM AYI YEMEK LİSTESİ', '', 'Yemek-Listesi/20171001-YEMEK-LISTE.jpg', 'Yemek-Listesi/20171001-YEMEK-LISTE.jpg', '', '', 'EKİM 2017', '', '2017-2018-EKIM-AYI-YEMEK-LISTESI', '', '1,2', '2017-10-01'),
(71, '2017-2018_İLKOKUL_SINAV_TAKVİMİ', '', 'Genel/20170918-SINAV-TAKVIMI.jpg', 'Genel/20170918-SINAV-TAKVIMI.jpg', '', '', 'İLKOKUL', '', '2017-2018-ILKOKUL-SINAV-TAKVIMI', '', '1', '2017-09-18'),
(78, 'ÖĞRENCİLERİMİZ İSPANYA BÜYÜKELÇİLİĞİNDE', '', 'Haberler/20171102-H-ISPANYA-BUYUKELCILIGI.jpg', 'Haberler/20171102-H-ISPANYA-BUYUKELCILIGI12.jpg,Haberler/20171102-H-ISPANYA-BUYUKELCILIGI11.jpg,Duyurular/20171102-H-ISPANYA-BUYUKELCILIGI10.jpg,Haberler/20171102-H-ISPANYA-BUYUKELCILIGI09.jpg,Haberler/20171102-H-ISPANYA-BUYUKELCILIGI08.jpg', '', '', 'Okulumuz öğrencileri İspanya Büyükelçisi Sayın Rafael Mendivil’in davetlisi olarak gittikleri büyükelçilik konutunda çok sıcak karşılandı. Eğitim Koordinatörü Javier Menendez Sanchez’in de eşlik ettiği öğle yemeğinde İspanyolca sohbet edip ,  geleneksel İspanyol yemeklerini yiyen öğrencilerimiz keyifli vakit geçirdi.', '', 'OGRENCILERIMIZ-ISPANYA-BUYUKELCILIGINDE', '', '2', '2017-10-20'),
(79, 'BAHÇEDE DERS KEYFİ', 'LESSON IN THE GARDEN', 'Haberler/20171102-LISE-BAHCE.jpg', 'Haberler/20171102-LISE-BAHCE03.jpg,Haberler/20171102-LISE-BAHCE02.jpg,Haberler/20171102-LISE-BAHCE01.jpg', 'Haberler/20171102-LISE-BAHCE.jpg', '', 'Anadolu Lisesi öğrencilerimiz güzel havanın tadını derslerini bahçede yaparak çıkarıyorlar.', 'Our Anatolian High School students have their lessons while enjoying the wonderful weather.', 'BAHCEDE-DERS-KEYFI', 'LESSON-IN-THE-GARDEN', '0,1,2,3', '2017-10-23'),
(80, 'İLKOKUL MECLİS BAŞKANIMIZI SEÇTİK', 'WE ELECT OUR PRIMARY SCHOOL COUNCIL PRESIDENT', 'Haberler/20171024-H-ILKOKUL-BASKANLIK.jpg', 'Haberler/20171024-H-ILKOKUL-BASKANLIK08.jpg,Haberler/20171024-H-ILKOKUL-BASKANLIK07.jpg,Haberler/20171024-H-ILKOKUL-BASKANLIK06.jpg,Haberler/20171024-H-ILKOKUL-BASKANLIK05.jpg,Haberler/20171024-H-ILKOKUL-BASKANLIK04.jpg,Haberler/20171024-H-ILKOKUL-BASKANL', 'Haberler/20171024-H-ILKOKUL-BASKANLIK.jpg', 'Haberler/20171024-H-ILKOKUL-BASKANLIK08.jpg,Haberler/20171024-H-ILKOKUL-BASKANLIK07.jpg,Haberler/20171024-H-ILKOKUL-BASKANLIK06.jpg,Haberler/20171024-H-ILKOKUL-BASKANLIK05.jpg,Haberler/20171024-H-ILKOKUL-BASKANLIK04.jpg,Haberler/20171024-H-ILKOKUL-BASKANL', 'İlkokul Okul Meclisi Başkanlık seçimlerimiz sona erdi.  Öğrencimiz  Ekin Şener 2017-2018 eğitim öğretim dönemi Özel Ankara Eğitim Kurumları İlkokul Meclis Başkanı seçilerek görevine başladı. Öğrencimizi tebrik ediyoruz.', 'The elections for Primary School Council Presidency are held. Our student Ekin Şener is elected as the President of the Council in 2017-2018. We congratulate our student.', 'ILKOKUL-MECLIS-BASKANIMIZI-SECTIK', 'WE-ELECT-OUR-PRIMARY-SCHOOL-COUNCIL-PRESIDENT', '1', '2017-10-24'),
(81, 'ORTAOKUL MECLİS BAŞKANIMIZI SEÇTİK', '', 'Haberler/20171025-H-BASKANLIK-ORTAOKUL.jpg', 'Haberler/20171025-H-BASKANLIK-ORTAOKUL07.jpg,Haberler/20171025-H-BASKANLIK-ORTAOKUL06.jpg,Haberler/20171025-H-BASKANLIK-ORTAOKUL05.jpg,Haberler/20171025-H-BASKANLIK-ORTAOKUL04.jpg,Haberler/20171025-H-BASKANLIK-ORTAOKUL03.jpg,Haberler/20171025-H-BASKANLIK-', '', '', 'Ortaokul Meclisi Başkanlık seçimlerimiz sona erdi. Öğrencimiz İlke Marin Özzengin 2017-2018 eğitim öğretim dönemi Özel Ankara Eğitim Kurumları Ortaokul Meclis Başkanı seçilerek görevine başladı. Öğrencimizi tebrik ediyoruz.', '', 'ORTAOKUL-MECLIS-BASKANIMIZI-SECTIK', '', '2', '2017-10-25'),
(82, 'ÖĞRENCİMİZ DÜNYA İKİNCİSİ', '', 'Haberler/20171025-H-YAREN-DUNYA-IKINCILIGI.jpg', 'Haberler/20171025-H-YAREN-DUNYA-IKINCILIGI04.jpg,Haberler/20171025-H-YAREN-DUNYA-IKINCILIGI03.jpg,Haberler/20171025-H-YAREN-DUNYA-IKINCILIGI02.jpg,Haberler/20171025-H-YAREN-DUNYA-IKINCILIGI01.jpg', '', '', '20-22 Ekim 2017’ de Çek Cumhuriyeti\'nin Prag şehrinde yapılan Gençlik Olimpiyatları Kalifikasyon müsabakalarında mix bayrak yarışında 11 ülkeden 20 takımın katıldığı müsabakada  Modern  Pentatlon  sporcumuz Yaren Nur POLAT dünya ikincisi olmuştur.(Yüzme, Eskrim, Koşu+ Lazer Atış) Öğrencimizi tebrik ediyor, başarılarının devamını diliyoruz.', '', 'OGRENCIMIZ-DUNYA-IKINCISI', '', '0,1,2,3', '2017-10-25'),
(83, '5. SINIF ÖĞRENCİLERİMİZ  AY PROJESİ GÖREVİNDE', 'OUR 5TH GRADERS ARE ON THE PROJECT MOON MISSION', 'Haberler/20171025-H-AY-PROJESI.jpg', 'Haberler/20171025-H-AY-PROJESI05.jpg,Haberler/20171025-H-AY-PROJESI04.jpg,Haberler/20171025-H-AY-PROJESI03.jpg,Haberler/20171025-H-AY-PROJESI02.jpg,Haberler/20171025-H-AY-PROJESI01.jpg', 'Haberler/20171025-H-AY-PROJESI.jpg', 'Haberler/20171025-H-AY-PROJESI05.jpg,Haberler/20171025-H-AY-PROJESI04.jpg,Haberler/20171025-H-AY-PROJESI03.jpg,Haberler/20171025-H-AY-PROJESI02.jpg,Haberler/20171025-H-AY-PROJESI01.jpg', 'Öğrencilerimiz fen bilimleri dersinde mühendislik becerilerini kullanarak, bir roket tasarımı yaptı. Bu roketin yere güvenilir bir biçimde inmesi için planlama yapan öğrencilerimiz sonrasında bunları projeye dönüştürdü. Öğrencilerimizi tebrik ediyoruz.', 'Our students design a rocket by using their engineering skills in the Science class. They prepare a Project with this rocket discussing about how to land it. We congratulate our students.', '5-SINIF-OGRENCILERIMIZ-AY-PROJESI-GOREVINDE', 'OUR-5TH-GRADERS-ARE-ON-THE-PROJECT-MOON-MISSION', '2', '2017-10-25'),
(84, 'MUHTEŞEM GADGET SHOW', 'AMAZING GADGET SHOW', 'Haberler/20171025-H-GADGET-SHOW05.jpg', 'Haberler/20171025-H-GADGET-SHOW06.jpg,Haberler/20171025-H-GADGET-SHOW04.jpg,Haberler/20171025-H-GADGET-SHOW03.jpg,Haberler/20171025-H-GADGET-SHOW02.jpg,Haberler/20171025-H-GADGET-SHOW01.jpg,Haberler/20171025-H-GADGET-SHOW.jpg', 'Haberler/20171025-H-GADGET-SHOW05.jpg', 'Haberler/20171025-H-GADGET-SHOW06.jpg,Haberler/20171025-H-GADGET-SHOW04.jpg,Haberler/20171025-H-GADGET-SHOW03.jpg,Haberler/20171025-H-GADGET-SHOW02.jpg,Haberler/20171025-H-GADGET-SHOW01.jpg,Haberler/20171025-H-GADGET-SHOW.jpg', 'Okulumuz 7.sınıf öğrencileri hazırladıkları The Gadget Show programında yaptıkları becerikli aletleri  arkadaşlarına ve velilerine tanıttılar. Bu güzel program için öğrencilerimizi kutluyoruz.', 'Our 7th graders introduce the tools that they designed to their parents and friends during the ‘The Gadget Show’', 'MUHTESEM-GADGET-SHOW', 'AMAZING-GADGET-SHOW', '2', '2017-10-25'),
(85, 'ÖĞRENCİMİZ BELİZ DEMİRHAN’LA GURUR DUYUYORUZ', 'WE ARE PROUD OF OUR STUDENT BELİZ DEMİRHAN', 'Haberler/20171025-H-BELIZ-DEMIRHAN.jpg', 'Haberler/20171025-H-BELIZ-DEMIRHAN02.jpg,Haberler/20171025-H-BELIZ-DEMIRHAN01.jpg', 'Haberler/20171025-H-BELIZ-DEMIRHAN.jpg', 'Haberler/20171025-H-BELIZ-DEMIRHAN02.jpg,Haberler/20171025-H-BELIZ-DEMIRHAN01.jpg', '“Amatör Spor Haftası Etkinlikleri” çerçevesinde  “Sonbahar Okları Okçuluk Yarışması” 232 sporcunun katılımıyla gerçekleşti. Öğrencimiz Beliz Demirhan minikler gurubunda 3. olarak madalyasını aldı. Öğrencimizi tebrik ediyor, başarılarının devamını diliyoruz.', 'During the Amateur Sports Week Activities’ , the Autumn Archery Competition is held with 232 athletes. Our student Beliz DEMİRHAN gets her medal being the third in ‘Toddler Group’. We congratulate and hope the best for our student.', 'OGRENCIMIZ-BELIZ-DEMIRHAN’LA-GURUR-DUYUYORUZ', 'WE-ARE-PROUD-OF-OUR-STUDENT-BELIZ-DEMIRHAN', '1', '2017-10-25'),
(86, 'CUMHURİYET VE KURTULUŞ MÜZESİNİ ZİYARET ETTİK', 'WE VISIT THE REPUBLIC AND SALVATION MUSEUM', 'Haberler/20171026-H-KURTULUS-MUZESI.jpg', 'Haberler/20171026-H-KURTULUS-MUZESI09.jpg,Haberler/20171026-H-KURTULUS-MUZESI08.jpg,Haberler/20171026-H-KURTULUS-MUZESI07.jpg,Haberler/20171026-H-KURTULUS-MUZESI06.jpg,Haberler/20171026-H-KURTULUS-MUZESI05.jpg,Haberler/20171026-H-KURTULUS-MUZESI04.jpg,Hab', 'Haberler/20171026-H-KURTULUS-MUZESI.jpg', 'Haberler/20171026-H-KURTULUS-MUZESI09.jpg,Haberler/20171026-H-KURTULUS-MUZESI08.jpg,Haberler/20171026-H-KURTULUS-MUZESI07.jpg,Haberler/20171026-H-KURTULUS-MUZESI06.jpg,Haberler/20171026-H-KURTULUS-MUZESI05.jpg,Haberler/20171026-H-KURTULUS-MUZESI04.jpg,Hab', 'Okulumuz 2. ve 3. sınıf öğrencileri  Cumhuriyet ve Kurtuluş Müzesini ziyaret etti. Öğrencilerimiz Cumhuriyet Müzesi\'nde ülkemizdeki ilk üç cumhurbaşkanı dönemini yansıtan olayları, fotoğrafları, cumhurbaşkanlarının özel eşyaları ile o dönemde mecliste alınan kararlar ve kanunların sergilendiği alanları gezdi.', 'Our 2nd and 3rd graders pay a visit to Republic and Salvation Museum. They visit the areas with the photos of the first Presidents of the Republic and see the possessions of them.', 'CUMHURIYET-VE-KURTULUS-MUZESINI-ZIYARET-ETTIK', 'WE-VISIT-THE-REPUBLIC-AND-SALVATION-MUSEUM', '1', '2017-10-26'),
(87, 'LABORATUVARDAYIZ', 'WE ARE IN THE LAB', 'Haberler/20171026-H-KALP-AKCIGER.jpg', 'Haberler/20171026-KALP-AKCIGER05.jpg,Haberler/20171026-KALP-AKCIGER04.jpg,Haberler/20171026-KALP-AKCIGER03.jpg,Haberler/20171026-KALP-AKCIGER02.jpg,Haberler/20171026-KALP-AKCIGER01.jpg', 'Haberler/20171026-H-KALP-AKCIGER.jpg', 'Haberler/20171026-KALP-AKCIGER05.jpg,Haberler/20171026-KALP-AKCIGER04.jpg,Haberler/20171026-KALP-AKCIGER03.jpg,Haberler/20171026-KALP-AKCIGER02.jpg,Haberler/20171026-KALP-AKCIGER01.jpg', '6.sınıf öğrencilerimizle birlikte fen bilimleri laboratuvarımızda kalp ve akciğer incelemesi yaptık. Meraklı beyinler her zaman olduğu gibi yine çok keyif aldı.', 'With our 6th graders, we do experiments on heart and lungs in our science laboratory. Our tiny curious brains have fun.', 'LABORATUVARDAYIZ', 'WE-ARE-IN-THE-LAB', '2', '2017-10-26'),
(88, 'MUHAMMET SERHAN ÖZKAN DEĞERLİ BİLGİLERİNİ BİZİMLE PAYLAŞTI', '', 'Haberler/20171027-H-SERHAN-OZKAN-EMDR02.jpg', 'Haberler/20171027-H-SERHAN-OZKAN-EMDR04.jpg,Haberler/20171027-H-SERHAN-OZKAN-EMDR03.jpg,Haberler/20171027-H-SERHAN-OZKAN-EMDR02.jpg,Haberler/20171027-H-SERHAN-OZKAN-EMDR01.jpg,Haberler/20171027-H-SERHAN-OZKAN-EMDR.jpg', '', '', 'Günümüzde sık rastlanan hiperaktivite, dikkat eksikliği gibi davranış bozukluğu ve daha pek çok rahatsızlığın temelinde yatan sebeplerden biri ve belki de en önemli nedeni dikkat etmediğimiz beslenme şeklimizdir. Psikolojik Danışman ve Pedagog Muhammet Serhan Özkan kan grubuna göre beslenme, mizaca göre beslenme, fitoterpi, gerçek(organik)gıda tüketme gibi daha birçok konuda bilgileri bizimle paylaştı. Etkisinden çıkılamayan bazı anları hazmetme düzeyi kişiden kişiye değişmekte ve hazmedilmeyen anlar travmaya dönüşebilmekte diyen değerli pedagog bu durumun önüne geçmek için EMDR Terapisi hakkında bilgi verdi. Kendisine teşekkür eder, çalışmalarında başarılar dileriz.', '', 'MUHAMMET-SERHAN-OZKAN-DEGERLI-BILGILERINI-BIZIMLE-PAYLASTI', '', '1,2', '2017-10-27'),
(89, 'YUNANİSTAN’DAN HABER VAR', 'NEWS FROM GREECE', 'Haberler/20171027-H-PENFRIENDS.jpg', 'Haberler/20171027-H-PENFRIENDS09.jpg,Haberler/20171027-H-PENFRIENDS08.jpg,Haberler/20171027-H-PENFRIENDS07.jpg,Haberler/20171027-H-PENFRIENDS06.jpg,Haberler/20171027-H-PENFRIENDS05.jpg,Haberler/20171027-H-PENFRIENDS04.jpg,Haberler/20171027-H-PENFRIENDS03.', 'Haberler/20171027-H-PENFRIENDS.jpg', 'Haberler/20171027-H-PENFRIENDS09.jpg,Haberler/20171027-H-PENFRIENDS08.jpg,Haberler/20171027-H-PENFRIENDS07.jpg,Haberler/20171027-H-PENFRIENDS06.jpg,Haberler/20171027-H-PENFRIENDS05.jpg,Haberler/20171027-H-PENFRIENDS04.jpg,Haberler/20171027-H-PENFRIENDS03.', 'Cambridge Penfriends Projesi kapsamında 5. sınıflarımızla gerçekleştirdiğimiz mektup arkadaşlığımız tüm hızıyla devam ediyor. Yunanistan’daki “ Arsekio Primary School of Patras “ öğrencilerinin AEK Ankara Eğitim Kurumları öğrencilerine gönderdikleri mektuplar ve kendi elleriyle hazırladıkları hediyeler bugün öğrencilerimizle buluştu.', 'Our Cambridge Penfriends Project with Greece is still in progress with our 5th graders. Students in Arsekio Primary School of Patras send their letters and hand-made gifts to students of AEK Ankara Education Institutions.', 'YUNANISTAN’DAN-HABER-VAR', 'NEWS-FROM-GREECE', '2', '2017-10-27'),
(90, 'CUMHURİYET BAYRAMIMIZ KUTLU OLSUN', '', 'Haberler/20171030-H-CUMHURIYET-BAYRAMI.jpg', 'Haberler/20171030-H-CUMHURIYET-BAYRAMI20.jpg,Haberler/20171030-H-CUMHURIYET-BAYRAMI19.jpg,Haberler/20171030-H-CUMHURIYET-BAYRAMI17.jpg,Haberler/20171030-H-CUMHURIYET-BAYRAMI16.jpg,Haberler/20171030-H-CUMHURIYET-BAYRAMI15.jpg,Haberler/20171030-H-CUMHURIYET', '', '', 'Cumhuriyet Bayramımızı büyük bir coşkuyla kutladık.', '', 'CUMHURIYET-BAYRAMIMIZ-KUTLU-OLSUN', '', '1,2', '2017-10-30'),
(91, 'HAFIZA TEKNİKLERİ ÜZERİNE ÇALIŞIYORUZ', 'WE WORK ON THE MEMORY TECHNIQUES', 'Haberler/20171018-H-HAFIZA-TEKNIKLERI.jpg', 'Haberler/20171018-H-HAFIZA-TEKNIKLERI05.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI04.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI03.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI02.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI01.jpg', 'Haberler/20171018-H-HAFIZA-TEKNIKLERI.jpg', 'Haberler/20171018-H-HAFIZA-TEKNIKLERI05.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI04.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI03.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI02.jpg,Haberler/20171018-H-HAFIZA-TEKNIKLERI01.jpg', 'Türkçe dersimizde 8. sınıflarımızla hafıza tekniklerinden biri olan \"kodlamayı\" kullanarak dersimizi işledik. Bilgiyi belli sembollerle kodlayarak kalıcı öğrenme gerçekleştiren öğrencilerimiz eğlenerek keyifli bir gün geçirdiler.', 'We had our Turkish lesson with our 8th graders using the Technique of Coding. Our students had a fun day of permanent learning by using coded symbols for information.', 'HAFIZA-TEKNIKLERI-UZERINE-CALISIYORUZ', 'WE-WORK-ON-THE-MEMORY-TECHNIQUES', '2', '2017-10-18'),
(92, 'HAYRETTİN KARACA PARKI', 'HAYRETTİN KARACA PARK', 'Haberler/20171005-H-HAYRETTIN-KARACA-PARKI.jpg', 'Haberler/20171005-H-HAYRETTIN-KARACA-PARKI05.jpg,Haberler/20171005-H-HAYRETTIN-KARACA-PARKI04.jpg,Haberler/20171005-H-HAYRETTIN-KARACA-PARKI03.jpg,Haberler/20171005-H-HAYRETTIN-KARACA-PARKI02.jpg,Haberler/20171005-H-HAYRETTIN-KARACA-PARKI01.jpg,Haberler/2', 'Haberler/20171005-H-HAYRETTIN-KARACA-PARKI.jpg', 'Haberler/20171005-H-HAYRETTIN-KARACA-PARKI05.jpg,Haberler/20171005-H-HAYRETTIN-KARACA-PARKI04.jpg,Haberler/20171005-H-HAYRETTIN-KARACA-PARKI03.jpg,Haberler/20171005-H-HAYRETTIN-KARACA-PARKI02.jpg,Haberler/20171005-H-HAYRETTIN-KARACA-PARKI01.jpg,Haberler/2', 'İlkokul öğrencilerimiz TEMA  Vakfı kurucusu Hayrettin KARACA  parkının açılışına katıldı.', 'Our Primary students Join the opening of Hayrettin KARACA Park which refers to the founder of TEMA.', 'HAYRETTIN-KARACA-PARKI', 'HAYRETTIN-KARACA-PARK', '1', '2017-10-05'),
(93, 'YANGIN TATBİKATINDAYIZ', 'FIRE DRILL AT OUR SCHOOL', 'Haberler/201071106-H-YANGIN-TATBIKATI.jpg', 'Haberler/201071106-H-YANGIN-TATBIKATI07.jpg,Haberler/201071106-H-YANGIN-TATBIKATI06.jpg,Haberler/201071106-H-YANGIN-TATBIKATI04.jpg,Haberler/201071106-H-YANGIN-TATBIKATI02.jpg,Haberler/201071106-H-YANGIN-TATBIKATI01.jpg', 'Haberler/20171106-H-YANGIN-TATBIKATI.jpg', 'Haberler/20171106-H-YANGIN-TATBIKATI5.jpg,Haberler/20171106-H-YANGIN-TATBIKATI4.jpg,Haberler/20171106-H-YANGIN-TATBIKATI3.jpg,Haberler/20171106-H-YANGIN-TATBIKATI2.jpg,Haberler/20171106-H-YANGIN-TATBIKATI1.jpg,Haberler/20171106-H-YANGIN-TATBIKATI.jpg', 'Bugün okulumuzda yangın tatbikatımızı gerçekleştirdik. Yangın durumunda ne yapmamız gerektiğini, söndürme tekniklerini, itfaiyenin görevlerini öğrenen öğrencilerimiz ”simülasyonla yangın söndürme “ deneyimi yaşadı. Ankara itfaiye Daire Başkanlığı’na okulumuza verdiği destek için teşekkür ederiz.', 'There was a fire drill at our school today. Our students experienced about what to do in case of a fire and how to extinguish the fire in a simulation. We are thankful to Ankara Department of Fire Brigade.', 'YANGIN-TATBIKATINDAYIZ', 'FIRE-DRILL-AT-OUR-SCHOOL', '1,2,3', '2017-11-06'),
(94, 'KÜÇÜKLERİN TİYATRO KEYFİ', 'THE LİTTLE ONES HAVE FUN', 'Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO.jpg', 'Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO03.jpg,Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO02.jpg,Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO01.jpg,Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO.jpg', 'Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO.jpg', 'Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO03.jpg,Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO02.jpg,Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO01.jpg,Haberler/20171101-H-SURPRIZ-BALIK-TIYATRO.jpg', 'Anaokulumuzun minikleri, misafir öğrencilerimizle birlikte “Sürpriz Balık” adlı tiyatro oyunumuzu izledi.  Oyunu büyük bir dikkatle ve keyifle izleyen öğrencilerimizin mutluluğu görülmeye değerdi.', 'Our little ones at pre-school watch the play ‘Surprise Fish’ with our guest students. It was worth to see their joy and happiness while watching the performance.', 'KUCUKLERIN-TIYATRO-KEYFI', 'THE-LITTLE-ONES-HAVE-FUN', '0,1', '2017-11-01'),
(95, 'GÖREVİMİZ UZAY', 'SPACE IS OUR MISSION', 'Haberler/20171102-H-GOREVIMIZ-UZAY.jpg', 'Haberler/20171102-H-GOREVIMIZ-UZAY02.jpg,Haberler/20171102-H-GOREVIMIZ-UZAY011.jpg,Haberler/20171102-H-GOREVIMIZ-UZAY01.jpg,Haberler/20171102-H-GOREVIMIZ-UZAY.jpg', 'Haberler/20171102-H-GOREVIMIZ-UZAY.jpg', 'Haberler/20171102-H-GOREVIMIZ-UZAY02.jpg,Haberler/20171102-H-GOREVIMIZ-UZAY011.jpg,Haberler/20171102-H-GOREVIMIZ-UZAY01.jpg,Haberler/20171102-H-GOREVIMIZ-UZAY.jpg', 'Okulumuz 5. Sınıf öğrencileri Fen bilimleri dersi “Güneş, Dünya ,Ay” Ünitesi  kapsamında “Görevimiz Uzay” temalı STEM yaklaşımı ile Roket tasarımı yaptılar. Bu roket tasarımında mühendislik becerilerini kullanarak araştırmalar yaptılar, tasarladıkları roketlerin güvenli bir biçimde yere inmesi için yumurta kullanarak önce sınıf içi daha sonra okulumuz 3. Kattan bahçeye denemeler yaptılar. Tüm 5. Sınıf öğrencilerimizi projelere verdikleri emekler ve hayal güçleri için teşekkür ederiz.', 'Our 5th graders in their Science lesson designed their rockets in relevance to their chapter ‘The Sun, Earth and Moon’. During the designing process, they did researches on rockets by using their knowledge of engineering. They threw their rockets with eggs from the third floor to the garden in order to check whether they could land safely on the ground or not. We thank to our 5th graders who used their imagination and the efforts that they made on these projects.', 'GOREVIMIZ-UZAY', 'SPACE-IS-OUR-MISSION', '2', '2017-11-02'),
(97, 'MEŞE PALAMUDU DİKTİK', 'WE PLANTED ACORNS', 'Haberler/20171104-H-MESE-PALAMUDU.jpg', 'Haberler/20171104-H-MESE-PALAMUDU8.jpg,Haberler/20171104-H-MESE-PALAMUDU7.jpg,Haberler/20171104-H-MESE-PALAMUDU6.jpg,Haberler/20171104-H-MESE-PALAMUDU5.jpg,Haberler/20171104-H-MESE-PALAMUDU4.jpg,Haberler/20171104-H-MESE-PALAMUDU3.jpg,Haberler/20171104-H-M', 'Haberler/20171104-H-MESE-PALAMUDU.jpg', 'Haberler/20171104-H-MESE-PALAMUDU8.jpg,Haberler/20171104-H-MESE-PALAMUDU7.jpg,Haberler/20171104-H-MESE-PALAMUDU6.jpg,Haberler/20171104-H-MESE-PALAMUDU5.jpg,Haberler/20171104-H-MESE-PALAMUDU4.jpg,Haberler/20171104-H-MESE-PALAMUDU3.jpg,Haberler/20171104-H-M', 'TEMA Çayyolu Temsilciliği Gönüllüleri ile birlikte meşe palamudu dikimi yapan öğrencilerimiz doğayla ve toprakla uğraşmanın keyfini çıkardı.', 'Our students who planted acorns with the volunteers of Cayyolu TEMA Foundation experienced the nature and had joy.', 'MESE-PALAMUDU-DIKTIK', 'WE-PLANTED-ACORNS', '1', '2017-11-04'),
(98, 'AYIN KİTABINI SEÇTİK', 'WE CHOSE THE BOOK OF THE MONTH', 'Haberler/20171121-H-AYIN-KITABI.jpg', 'Haberler/20171121-H-AYIN-KITABI5.jpg,Haberler/20171121-H-AYIN-KITABI4.jpg,Haberler/20171121-H-AYIN-KITABI3.jpg,Haberler/20171121-H-AYIN-KITABI2.jpg,Haberler/20171121-H-AYIN-KITABI1.jpg,Haberler/20171121-H-AYIN-KITABI.jpg', 'Haberler/20171121-H-AYIN-KITABI.jpg', 'Haberler/20171121-H-AYIN-KITABI5.jpg,Haberler/20171121-H-AYIN-KITABI4.jpg,Haberler/20171121-H-AYIN-KITABI3.jpg,Haberler/20171121-H-AYIN-KITABI2.jpg,Haberler/20171121-H-AYIN-KITABI1.jpg,Haberler/20171121-H-AYIN-KITABI.jpg', 'Türkçe dersinde öğrencilerimiz  ayın kitabı olan İskender Pala\'nın \"İki Dirhem Bir Çekirdek\" adlı kitabı hakkında inceleme yaptılar. Hem deyimleri daha yakından tanıdılar hem de keyifli bir ders geçirdiler.', 'Our students in their Turkish class analyzed the book of İskender Pala’s ‘İki Dirhem Bir Çekirdek’. They both studied the idioms and had a fun lesson.', 'AYIN-KITABINI-SECTIK', 'WE-CHOSE-THE-BOOK-OF-THE-MONTH', '2', '2017-11-21'),
(99, 'ERKEK ÖĞRENCİLERİMİZE ERGENLİĞİ ANLATTIK', 'WE INFORMED OUR MALE STUDENTS ABOUT PUBERTY', 'Haberler/20171117-H-ERKEKLERDE-ERGENLIK.jpg', 'Haberler/20171117-H-ERKEKLERDE-ERGENLIK4.jpg,Haberler/20171117-H-ERKEKLERDE-ERGENLIK3.jpg,Haberler/20171117-H-ERKEKLERDE-ERGENLIK2.jpg,Haberler/20171117-H-ERKEKLERDE-ERGENLIK1.jpg,Haberler/20171117-H-ERKEKLERDE-ERGENLIK.jpg', 'Haberler/20171117-H-ERKEKLERDE-ERGENLIK.jpg', 'Haberler/20171117-H-ERKEKLERDE-ERGENLIK4.jpg,Haberler/20171117-H-ERKEKLERDE-ERGENLIK3.jpg,Haberler/20171117-H-ERKEKLERDE-ERGENLIK2.jpg,Haberler/20171117-H-ERKEKLERDE-ERGENLIK1.jpg,Haberler/20171117-H-ERKEKLERDE-ERGENLIK.jpg', '7,8.9.10.11 ve 12.sınıf erkek öğrencilerimize yönelik “Ergenlikte Bedensel ve Ruhsal Gelişim” konulu seminerimizde  Ürolog Yrd.Doç.Dr. Semih Tangal Psikiyatrist Ahmet Gül ve  Çocuk Psikiyatristi Hesna Gül  öğrencilerimize  ergenlikte yaşanan bedensel ve ruhsal değişimlerle ilgili bilgi verdi. Öğrencilerimizin tüm sorularını yanıtlayan kıymetli uzmanlarımıza çok teşekkür ederiz.', 'In their presentation titled as ‘physiological and spiritual development during puberty’ the urologist Asc.Dr. Semih Tangal ,the psychiatrist Ahmet Gül and child psychiatrist Hesna Gül  gave information to our 7th,8th,9th,10th, 11th and 12th male graders. We are thankful to the experts who replied all the questions that our students asked.', 'ERKEK-OGRENCILERIMIZE-ERGENLIGI-ANLATTIK', 'WE-INFORMED-OUR-MALE-STUDENTS-ABOUT-PUBERTY', '2,3', '2017-11-17'),
(100, 'DÜNYA ÇOCUK HAKLARI GÜNÜ', 'WORLD’S CHILDREN RIGHTS DAY', 'Haberler/20171120-H-COCUK-HAKLARI-GUNU1.jpg', 'Haberler/20171120-H-COCUK-HAKLARI-GUNU.jpg', 'Haberler/20171120-H-COCUK-HAKLARI-GUNU1.jpg', 'Haberler/20171120-H-COCUK-HAKLARI-GUNU.jpg', '“Çocukların kanun hükümleri ile korunmuş eğitim, sağlık, barınma, fiziksel, psikolojik ya da cinsel sömürüye karşı korunma gibi temel haklarının tümüne çocuk hakları adı verilmektedir.  Dili, dini, rengi, ırkı ne olursa olsun hiçbir ayrım gözetmeksizin bütün çocuklar aynı haklara sahiptir” diyen 2.sınıf öğrencilerimiz Dünya Çocuk Hakları Günü nedeniyle hazırladıkları programı arkadaşlarına ve öğretmenlerine sundu. Öğrencilerimizi tebrik ediyoruz.', 'The rights of children in terms of education, health, accommodation, physical, physocological abusement and etc. are called the rights of children. Without regarding the language, religion, race, all children have the same rights. Therefore; our 2nd graders made a presentation to their friends and teachers mentioning about the importance of the day. We congratulate them all.', 'DUNYA-COCUK-HAKLARI-GUNU', 'WORLD’S-CHILDREN-RIGHTS-DAY', '1', '2017-11-20'),
(101, 'ERGENLİKTE YAŞADIĞIMIZ DEĞİŞİMLERİ ÖĞRENDİK', 'WE LEARN ABOUT THE CHANGES DURING PUBERTY', 'Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK.jpg', 'Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK5.jpg,Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK4.jpg,Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK3.jpg,Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK2.jpg,Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK1.jpg', 'Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK.jpg', 'Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK5.jpg,Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK4.jpg,Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK3.jpg,Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK2.jpg,Haberler/20171104-H-KIZ-OGRENCILER-ERGENLIK1.jpg', '7,8.9.10.11 ve 12.sınıf kız öğrencilerimize yönelik “Ergenlikte Bedensel ve Ruhsal Gelişim” konulu seminerimizde  Jinekolog Doç.Dr.Özlem Uzunlar ve Klinik Psikolog Suphi Tunç öğrencilerimize  ergenlikte yaşanan bedensel ve ruhsal değişimlerle ilgili bilgi verdi. Öğrencilerimizin tüm sorularını yanıtlayan kıymetli uzmanlarımıza çok teşekkür ederiz.', 'The gynecologist Doç.Dr.Özlem Uzunlar and Clinic phycologist Klinik Psikolog Suphi Tunç conducted a seminar about ‘ The Physical and Mental Advancement During Puberty’ to our 7th, 8th, 9th, 10th, 11th and 12th female students. We thanked to the experts who answered all the questions of our students.', 'ERGENLIKTE-YASADIGIMIZ-DEGISIMLERI-OGRENDIK', 'WE-LEARN-ABOUT-THE-CHANGES-DURING-PUBERTY', '2,3', '2017-11-04'),
(102, 'ATAMIZIN HUZURUNDAYIZ', 'WE ARE IN THE PRESENCE OF ATATÜRK', 'Haberler/20171115-H-ANITKABIR.jpg', 'Haberler/20171115-H-ANITKABIR6.jpg,Haberler/20171115-H-ANITKABIR5.jpg,Haberler/20171115-H-ANITKABIR4.jpg,Haberler/20171115-H-ANITKABIR3.jpg,Haberler/20171115-H-ANITKABIR2.jpg', 'Haberler/20171115-H-ANITKABIR.jpg', 'Haberler/20171115-H-ANITKABIR6.jpg,Haberler/20171115-H-ANITKABIR5.jpg,Haberler/20171115-H-ANITKABIR4.jpg,Haberler/20171115-H-ANITKABIR3.jpg,Haberler/20171115-H-ANITKABIR2.jpg,Haberler/20171115-H-ANITKABIR1.jpg', 'Atamızın aramızdan ayrılışının 79. yılında AEK Anaokulu, İlkokulu, Ortaokulu ve Anadolu Lisesi olarak Anıtkabir’de gerçekleştirdiğimiz anma töreninde büyük önderimizi, sevgi, saygı ve minnetle andık.', 'This has been the 79th year since our leader Atatürk passed away. We as Pre-school, Primary, Middle and High Schools of AEK Education Institutions commemorate with gratitude, love and respect in Anıtkabir.', 'ATAMIZIN-HUZURUNDAYIZ', 'WE-ARE-IN-THE-PRESENCE-OF-ATATURK', '0,1,2,3', '2017-11-15'),
(103, 'MESLEKLER MİNİ ŞOV', 'JOBS MINI-SHOW', 'Haberler/20171114-INGILIZCE-3-SINIF.jpg', 'Haberler/20171114-INGILIZCE-3-SINIF5.jpg,Haberler/20171114-INGILIZCE-3-SINIF4.jpg,Haberler/20171114-INGILIZCE-3-SINIF3.jpg,Haberler/20171114-INGILIZCE-3-SINIF2.jpg,Haberler/20171114-INGILIZCE-3-SINIF11.jpg,Haberler/20171114-INGILIZCE-3-SINIF1.jpg', 'Haberler/20171114-INGILIZCE-3-SINIF.jpg', 'Haberler/20171114-INGILIZCE-3-SINIF5.jpg,Haberler/20171114-INGILIZCE-3-SINIF4.jpg,Haberler/20171114-INGILIZCE-3-SINIF3.jpg,Haberler/20171114-INGILIZCE-3-SINIF2.jpg,Haberler/20171114-INGILIZCE-3-SINIF11.jpg,Haberler/20171114-INGILIZCE-3-SINIF1.jpg', '3.sınıf öğrencilerimizin işledikleri ünite olan meslekler konusu mini bir şovla eğlenceli bir aktivite haline getirildi. Bu sayede öğrencilerimiz eğlenerek İngilizce kelimeleri pekiştirip, ekip çalışması sorumluluğunu üstlenmiş oldu. Öğrencilerimizi tebrik ediyoruz.', 'The unit that has been covered by our English teachers with our 3rd graders about ‘Jobs’ was presented as a mini-show. Thus, our students revised the essential vocabulary working in teams. We congratulate them all.', 'MESLEKLER-MINI-SOV', 'JOBS-MINI-SHOW', '1', '2017-11-14'),
(104, 'ATAMIZI SAYGI, SEVGİ VE ÖZLEMLE ANIYORUZ', 'WE COMMEMORATE OUR LEADER ATATÜRK WITH LOVE AND RESPECT', 'Haberler/20171110-ATAMIZI-ANMA.jpg', 'Haberler/20171110-ATAMIZI-ANMA6.jpg,Haberler/20171110-ATAMIZI-ANMA5.jpg,Haberler/20171110-ATAMIZI-ANMA4.jpg,Haberler/20171110-ATAMIZI-ANMA3.jpg,Haberler/20171110-ATAMIZI-ANMA2.jpg,Haberler/20171110-ATAMIZI-ANMA1.jpg', 'Haberler/20171110-ATAMIZI-ANMA.jpg', 'Haberler/20171110-ATAMIZI-ANMA6.jpg,Haberler/20171110-ATAMIZI-ANMA5.jpg,Haberler/20171110-ATAMIZI-ANMA4.jpg,Haberler/20171110-ATAMIZI-ANMA3.jpg,Haberler/20171110-ATAMIZI-ANMA2.jpg,Haberler/20171110-ATAMIZI-ANMA1.jpg', 'Her 10 Kasım\'da olduğu gibi bu 10 Kasım\'da da Atatürk\'e olan bağlılığımızı ve sevgimizi ortak düşünce ve duygularla bir kez daha dile getiriyor, büyük önderimizi özlemle anıyoruz.', 'As we do every 10th November, we commemorate our loyalty and love to Atatürk once again with common thoughts and feelings, we deeply miss him.', 'ATAMIZI-SAYGI,-SEVGI-VE-OZLEMLE-ANIYORUZ', 'WE-COMMEMORATE-OUR-LEADER-ATATURK-WITH-LOVE-AND-RESPECT', '1,2,3', '2017-11-10');
INSERT INTO `general_haberler` (`No`, `tr_Baslik`, `en_Baslik`, `tr_AnaResim`, `tr_DigerResimler`, `en_AnaResim`, `en_DigerResimler`, `tr_Yazi`, `en_Yazi`, `tr_SectionID`, `en_SectionID`, `Okul`, `Tarih`) VALUES
(105, 'KERMES GELİRİMİZ YARDIMA MUHTAÇ ÇOCUKLARA GİTTİ', 'OUR BAKE SELL PROFIT GOES TO THE CHILDREN WHO NEED HELP', 'Haberler/20171127-KERMES-ORTAOKUL.jpg', 'Haberler/deneme-1.jpg,Haberler/20171127-KERMES-ORTAOKUL9.jpg,Haberler/20171127-KERMES-ORTAOKUL8.jpg,Haberler/20171127-KERMES-ORTAOKUL7.jpg,Haberler/20171127-KERMES-ORTAOKUL6.jpg,Haberler/20171127-KERMES-ORTAOKUL5.jpg', 'Haberler/20171127-KERMES-ORTAOKUL.jpg', 'Haberler/20171127-KERMES-ORTAOKUL9.jpg,Haberler/20171127-KERMES-ORTAOKUL8.jpg,Haberler/20171127-KERMES-ORTAOKUL7.jpg,Haberler/20171127-KERMES-ORTAOKUL6.jpg,Haberler/20171127-KERMES-ORTAOKUL5.jpg,Haberler/20171127-KERMES-ORTAOKUL4.jpg', 'AEK Okul Aile Birliğinin düzenlediği kermeste ortaokul öğrencilerimiz hazırladıkları yiyecek ve içeceklerin satışını yaptı. İlkokul ve ortaokuldaki öğrencilerimizin alışveriş yaptığı kermeste elde edilen gelir yardıma muhtaç çocuklara bağışlandı. Bu anlamlı çalışma için tüm öğrencilerimize, velilerimize ve AEK Okul Aile Birliğinin değerli üyelerine çok teşekkür ederiz.', 'Our Bake Sell was organized by the Parent-School Association which was held to help the aidless children. Our primary and Middle School students did shopping in order to raise the charity Money. We are thankful to our students, parents and the members of the Parent-School Association for their great contribution.', 'KERMES-GELIRIMIZ-YARDIMA-MUHTAC-COCUKLARA-GITTI', 'OUR-BAKE-SELL-PROFIT-GOES-TO-THE-CHILDREN-WHO-NEED-HELP', '1,2', '2017-11-27'),
(106, 'OYUNCAK MÜZESİNDEYİZ', 'WE ARE AT THE TOY MUSEUM', 'Haberler/20171124-H-OYUNCAK-MUZESI.jpg', 'Haberler/20171124-H-OYUNCAK-MUZESI6.jpg,Haberler/20171124-H-OYUNCAK-MUZESI5.jpg,Haberler/20171124-H-OYUNCAK-MUZESI4.jpg,Haberler/20171124-H-OYUNCAK-MUZESI3.jpg,Haberler/20171124-H-OYUNCAK-MUZESI2.jpg,Haberler/20171124-H-OYUNCAK-MUZESI1.jpg', 'Haberler/20171124-H-OYUNCAK-MUZESI.jpg', 'Haberler/20171124-H-OYUNCAK-MUZESI6.jpg,Haberler/20171124-H-OYUNCAK-MUZESI5.jpg,Haberler/20171124-H-OYUNCAK-MUZESI4.jpg,Haberler/20171124-H-OYUNCAK-MUZESI3.jpg,Haberler/20171124-H-OYUNCAK-MUZESI2.jpg,Haberler/20171124-H-OYUNCAK-MUZESI1.jpg', 'Ankara Üniversitesi Eğitim Bilimleri Fakültesi \"Oyuncak Müzesine  giden öğrencilerimiz kaybolmakta olan oyuncakları inceledi. Aynı zamanda bir araştırma ve eğitim merkezi olarak  hizmet veren ve halen bin beş yüz oyuncak bulunan müzeyi gezip bilgi alan öğrencilerimiz çok keyifli zaman geçirdi.', 'Our students visited the Toy Museum located in Ankara University, Faculty of Education Studies to be informed about the toys which are about to extinct. The museum still serves as a research and development center and our students had a great time while learning about the toys which are approximately over 500 in number.', 'OYUNCAK-MUZESINDEYIZ', 'WE-ARE-AT-THE-TOY-MUSEUM', '1', '2017-11-24'),
(107, 'ÖĞRETMENLER GÜNÜ PANOMUZ', 'OUR TEACHERS DAY BULLETIN BOARD', 'Haberler/20171124-H-ING-OGRETMENLER-GUNU.jpg', 'Haberler/20171124-H-ING-OGRETMENLER-GUNU.jpg', 'Haberler/20171124-H-ING-OGRETMENLER-GUNU.jpg', 'Haberler/20171124-H-ING-OGRETMENLER-GUNU.jpg', 'Öğrencilerimiz öğretmenlerine güzel duygu ve düşüncelerini İngilizce olarak aktardıkları ve süslemelerini kendi yaptıkları kartlarla uygulanan \"Öğretmenler Günü \"panosu hazırladı. İngilizce zümresi olarak bu anlamlı pano için  tüm öğrencilerimize teşekkür ederiz.', 'Our students prepared the ‘Teachers Day’ bulletin board putting their cards, writing about their feelings to their teachers. We as the English Department thank to all out students for their great effort.', 'OGRETMENLER-GUNU-PANOMUZ', 'OUR-TEACHERS-DAY-BULLETIN-BOARD', '2', '2017-11-24'),
(108, 'CERN KONFERANSI', 'CERN CONFERENCE', 'Haberler/20171122-H-CERN-KONFERANSI.jpg', 'Haberler/20171122-H-CERN-KONFERANSI4.jpg,Haberler/20171122-H-CERN-KONFERANSI3.jpg,Haberler/20171122-H-CERN-KONFERANSI2.jpg,Haberler/20171122-H-CERN-KONFERANSI1.jpg', 'Haberler/20171122-H-CERN-KONFERANSI.jpg', 'Haberler/20171122-H-CERN-KONFERANSI4.jpg,Haberler/20171122-H-CERN-KONFERANSI3.jpg,Haberler/20171122-H-CERN-KONFERANSI2.jpg,Haberler/20171122-H-CERN-KONFERANSI1.jpg', 'Biz bugün 6. Ve 7. Sınıflarımız ile bilimin kalbinde CERN\'deydik! Neşe saçan soru sormak için yarışan, gülen gözleriyle umut veren öğrencilerimizle “CERN” 22 KASIM 2017 Saat: 10.00 – 12.00 Dr. Bora Akgün /CERN Dr. Cenk Yıldız /CERN MEB Bilgi İşlem Daire Başkanlığının Bilime Yolculuk E-Konferansları” ile CERN hakkında bilgiler aldık. Yakın zamanda, özellikle Higgs parçacığının keşfi sayesinde CERN laboratuvarına ve orada gerçekleşen hızlandırıcı ve parçacık fiziğine karşı yoğun bir ilgi ve merak oluştu. Bu merak yersiz değildir, çünkü parçacık ve hızlandırıcı fiziği, bilimin ve teknolojinin sınırlarını zorlayan, her an yenilikçi buluşlarla beslenen çok hareketli ve renkli bir bilim dalıdır. İşte tam bu sebepten öğrencilerin, gençlerin ve içinde keşif heyecanı taşıyan herkesin evrenin en temel yapıtaşlarını bulmayı amaçlayan bu dalı yakından tanımalarının yararlı olacağını düşündük.', 'Today we were in CERN –the heart of science with our 6th and 7th graders! With our students who have hope in their eyes and compete with others to ask as many questions as they can to the experts  Dr. Bora Akgün /CERN Dr. Cenk Yıldız /CERN in terms of the E-Conferences on 22 November,2017 from 10.00 to 12.00. Recently, there has been a curiosity about the particle physics especially after the discovery of the Higgs Particle at CERN. It is no wonder that this is absolutely a new amazing science field which is concerned about the particle accelerator. For this reason, we thought that it would be essential and fascinating to know about this new branch of physics especially for the ones who are amazed by the knowledge of universe like our students.', 'CERN-KONFERANSI', 'CERN-CONFERENCE', '2', '2017-11-22'),
(109, 'ANAOKULUMUZUN MİNİKLERİ ESKİ TBMM’DE', 'OUR PRE-SCHOOL STUDENTS ARE IN THE OLD PARLIAMENT BUILDING', 'Haberler/20171124-H-ESKI-TBMM-ANAOKULU.jpg', 'Haberler/20171124-H-ESKI-TBMM-ANAOKULU5.jpg,Haberler/20171124-H-ESKI-TBMM-ANAOKULU4.jpg,Haberler/20171124-H-ESKI-TBMM-ANAOKULU3.jpg,Haberler/20171124-H-ESKI-TBMM-ANAOKULU2.jpg,Haberler/20171124-H-ESKI-TBMM-ANAOKULU1.jpg', 'Haberler/20171124-H-ESKI-TBMM-ANAOKULU.jpg', 'Haberler/20171124-H-ESKI-TBMM-ANAOKULU5.jpg,Haberler/20171124-H-ESKI-TBMM-ANAOKULU4.jpg,Haberler/20171124-H-ESKI-TBMM-ANAOKULU3.jpg,Haberler/20171124-H-ESKI-TBMM-ANAOKULU2.jpg,Haberler/20171124-H-ESKI-TBMM-ANAOKULU1.jpg', 'Özel Ankara Eğitim Kurumları Anaokulu olarak eski TBMM\'ni ziyaret ettik. Artık hepimiz Ulu Önderimiz Atatürk’ün bizler için ne kadar çalıştığını çok daha iyi biliyoruz.', 'Our Pre-School visited the old Parliament building. We all know that our leader Ataturk worked hard for our sake.', 'ANAOKULUMUZUN-MINIKLERI-ESKI-TBMM’DE', 'OUR-PRE-SCHOOL-STUDENTS-ARE-IN-THE-OLD-PARLIAMENT-BUILDING', '0', '2017-11-24'),
(110, 'ÖĞRETMENLER GÜNÜ KUTLU OLSUN', 'HAPPY TEACHERS DAY', 'Haberler/20171124-H-OGRETMENLER-GUNU.jpg', 'Haberler/20171124-H-OGRETMENLER-GUNU8.jpg,Haberler/20171124-H-OGRETMENLER-GUNU7.jpg,Haberler/20171124-H-OGRETMENLER-GUNU6.jpg,Haberler/20171124-H-OGRETMENLER-GUNU5.jpg,Haberler/20171124-H-OGRETMENLER-GUNU41.jpg,Haberler/20171124-H-OGRETMENLER-GUNU4.jpg', 'Haberler/20171124-H-OGRETMENLER-GUNU.jpg', 'Haberler/20171124-H-OGRETMENLER-GUNU8.jpg,Haberler/20171124-H-OGRETMENLER-GUNU7.jpg,Haberler/20171124-H-OGRETMENLER-GUNU6.jpg,Haberler/20171124-H-OGRETMENLER-GUNU5.jpg,Haberler/20171124-H-OGRETMENLER-GUNU41.jpg,Haberler/20171124-H-OGRETMENLER-GUNU4.jpg', 'Geleceğimizin teminatı gençlerimizi, çocuklarımızı yetiştiren, fedakarlığın ve şefkatin timsali, toplumların şekillenmesinde söz sahibi olan, kutsal ve şerefli bir mesleği ifa eden, medeniyet yürüyüşündeki neferlerimiz, değerli öğretmenlerimiz,\r\n24 KASIM ÖĞRETMENLER GÜNÜNÜZ KUTLU OLSUN.', 'Happy Teachers Day to all our teachers who raise our children and prepare them for their futures shaping our nation and those who are precious to all of us.', 'OGRETMENLER-GUNU-KUTLU-OLSUN', 'HAPPY-TEACHERS-DAY', '0,1,2,3', '2017-11-24'),
(111, 'TÜRK TELEKOM MÜZESİNDEYİZ', 'WE ARE AT TURKISH TELEKOM MUSEUM', 'Haberler/20171114-H-TURK-TELEKOM-MUZESI.jpg', 'Haberler/20171114-H-TURK-TELEKOM-MUZESI6.jpg,Haberler/20171114-H-TURK-TELEKOM-MUZESI5.jpg,Haberler/20171114-H-TURK-TELEKOM-MUZESI4.jpg,Haberler/20171114-H-TURK-TELEKOM-MUZESI2.jpg,Haberler/20171114-H-TURK-TELEKOM-MUZESI1.jpg', 'Haberler/20171114-H-TURK-TELEKOM-MUZESI.jpg', 'Haberler/20171114-H-TURK-TELEKOM-MUZESI6.jpg,Haberler/20171114-H-TURK-TELEKOM-MUZESI5.jpg,Haberler/20171114-H-TURK-TELEKOM-MUZESI4.jpg,Haberler/20171114-H-TURK-TELEKOM-MUZESI2.jpg,Haberler/20171114-H-TURK-TELEKOM-MUZESI1.jpg', 'Türk Telekom Telekomünikasyon Müzesi eğitim, bilim ve teknoloji müzesi olarak iletişim alanında aktif eğitici anlayışıyla hazırlanmış ilk ve tek uygulamalı müze olarak nitelendirilmektedir. Hızla gelişen iletişim teknolojisinin tarihi boyutu, dokunarak, kullanarak ve uygulama yapılarak görülebilen Telekomünikasyon Müzesini ziyaret eden Anadolu Lisesi öğrencilerimiz mors alfabesiyle ilgili bilgi alıp, sergilenen 402 parça eser ile tarihi bir yolculuk yaptı.', 'Turkish Telekom Communication Museum is considered as a science and technology museum which is the first and the only one prepared with the active education understanding. Our Anatolian High School students paid a visit to the museum in which it is possible to witness the rapid changes of history and inventions by looking at the 402 pieces of art and they also were briefed about the Morse Alphabet.', 'TURK-TELEKOM-MUZESINDEYIZ', 'WE-ARE-AT-TURKISH-TELEKOM-MUSEUM', '3', '2017-11-14'),
(112, 'OKUDUĞUMUZ KİTAPLARI TANITIYORUZ', 'WE PRESENTED THE BOOKS THAT WE READ', 'Haberler/20171113-H-KITAP-ANLATIMI.jpg', 'Haberler/20171113-H-KITAP-ANLATIMI5.jpg,Haberler/20171113-H-KITAP-ANLATIMI4.jpg,Haberler/20171113-H-KITAP-ANLATIMI3.jpg,Haberler/20171113-H-KITAP-ANLATIMI2.jpg,Haberler/20171113-H-KITAP-ANLATIMI1.jpg', 'Haberler/20171113-H-KITAP-ANLATIMI.jpg', 'Haberler/20171113-H-KITAP-ANLATIMI5.jpg,Haberler/20171113-H-KITAP-ANLATIMI4.jpg,Haberler/20171113-H-KITAP-ANLATIMI3.jpg,Haberler/20171113-H-KITAP-ANLATIMI2.jpg,Haberler/20171113-H-KITAP-ANLATIMI1.jpg', 'Öğrencilerimiz Türkçe dersinde okumuş oldukları kitapları, arkadaşlarına tanıttı. Böylece topluluk önünde konuşma, kendini ifade etme, jest ve mimikleri kullanma gibi özellikleri öğrendiler.', 'Our students presented the books that they read in their Turkish lesson. Therefore, they learned about the public speaking, mimics and gestures and how to express themselves.', 'OKUDUGUMUZ-KITAPLARI-TANITIYORUZ', 'WE-PRESENTED-THE-BOOKS-THAT-WE-READ', '2', '2017-11-13'),
(113, '‘SORUNUN DEĞİL ÇÖZÜMÜN PARÇASI OLUN’', 'BE PART OF THE SOLUTION NOT THE POLLUTION', 'Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS.jpg', 'Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS5.jpg,Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS4.jpg,Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS3.jpg,Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS2.jpg,Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS1.jpg', 'Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS.jpg', 'Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS5.jpg,Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS4.jpg,Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS3.jpg,Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS2.jpg,Haberler/20171113-H-CEVRE-KIRLILIGI-AFIS1.jpg', '9. sınıf Fen Lisesi öğrencilerimiz İngilizce dersinde çevre kirliliği ile ilgili sunumlarını yaptılar. Sunumlarıyla birlikte posterler ve broşürler hazırladılar. Çevre kirliliği ile nasıl başa çıkabiliriz ve neler yapabiliriz sorularıyla beyin fırtınası yapan öğrencilerimiz ‘Sorunun değil Çözümün Parçası Ol’ dediler. ‘Be part of the solution not the pollution’.', 'Our 9th graders at Science High School made their presentations about the environmental pollution. With their presentations they also prepared posters and leaflets. They did brainstorming with the questions of ‘How we can deal with the pollution’ under the motto of ‘Be part of the Solution, Not the Pollution.’', '‘SORUNUN-DEGIL-COZUMUN-PARCASI-OLUN’', 'BE-PART-OF-THE-SOLUTION-NOT-THE-POLLUTION', '3', '2017-11-13'),
(114, 'KIZILAY HAFTASI ETKİNLİKLERİ', 'RED CRESCENT ACTIVITIES', 'Haberler/20171103-H-KIZILAY-HAFTASI.jpg', 'Haberler/20171103-H-KIZILAY-HAFTASI2.jpg,Haberler/20171103-H-KIZILAY-HAFTASI1.jpg', 'Haberler/20171103-H-KIZILAY-HAFTASI.jpg', 'Haberler/20171103-H-KIZILAY-HAFTASI2.jpg,Haberler/20171103-H-KIZILAY-HAFTASI1.jpg', '29 Ekim ile 4 Kasım tarihleri arasında her yıl kutladığımız Kızılay Haftası yıl içindeki belirli gün ve haftalar içinde önemli bir yere sahiptir. Doğal afetler dediğimiz depremlerde, sel ve su baskınlarında, önüne geçilemeyen büyük yangınlarda ve uluslar arasında çıkan savaşlarda dost elini uzatan, yaralı, kimsesiz, hasta insanlara  hiçbir ayrım yapmadan herkese eşit şekilde yardım eden kuruluşlar arasında en önde geleni “KIZILAY“dır. Okulumuz 3.sınıf öğrencileri bu haftanın önemini hazırladıkları güzel  anlatımla arkadaşlarına ve öğretmenlerine sundu.', 'Week of Red Crescent has a great importance which is annually celebrated on 29th October to 4th November. The leading organization which helps in cases of natural disasters such as; earthquakes, floods, wildfires to everyone who is in need of help regardless of discrimination. Our 3rd graders made their presentations about the importance of this week and presented to their friends and teachers.', 'KIZILAY-HAFTASI-ETKINLIKLERI', 'RED-CRESCENT-ACTIVITIES', '1', '2017-11-03'),
(116, 'İNGİLİZCE BİNGO OYNADIK', '', 'Haberler/20170118-H-INGILIZCE-BINGO.jpg', '', '', '', '2-B sınıfıyla bugün İngilizce Bingo oynadık ve de çok  eğlendik.', '', 'INGILIZCE-BINGO-OYNADIK', '', '0,1,2,3', '2017-01-18');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_hakkimizda`
--

DROP TABLE IF EXISTS `general_hakkimizda`;
CREATE TABLE IF NOT EXISTS `general_hakkimizda` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `tr_SectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_SectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_hakkimizda`
--

INSERT INTO `general_hakkimizda` (`No`, `tr_Baslik`, `en_Baslik`, `tr_Yazi`, `en_Yazi`, `tr_SectionID`, `en_SectionID`, `ListOrder`) VALUES
(1, 'Tarihçe', 'History', '<p>AEK Ankara Eğitim Kurumları, 1994 yılında Okul Öncesi ile başladığı eğitim hayatına, 2007 yılında İlkokulu, 2015\'te ise Anadolu Lisesi\'ni bünyesine ekleyerek yeni yerleşkesinde eğitim öğretim hayatına devam etmektedir.</p>', '<p>AEK Ankara Eğitim Kurumları have started their journey of educating students with primarily founded DEK Pre-school in 1994; and continued by establishing its Elementary School in 2007 and Anatolian High School in 2015. DEK provides its students with education in its newly built campus.</p>', 'tarihce', 'history', 1),
(2, 'Vizyon', 'Vision', '<p>\n          Atatürk ilke ve inkılapları doğrultusunda öğrencilerimizi geleceğe hazırlarken;\n          <ul>\n            <li>Eğitim-Öğretimde, ülkemizde ve dünyada örnek ve öncü okul olmak.</li>\n            <li>Bilgiye ulaşabilen, bilgiyi kullanan ve aynı zamanda üreten mezunlar vermek.</li>\n            <li>Yabancı dile önem vererek öğrencilerin uluslararası eğitim-öğretim programlarından da yararlanmalarını sağlamak.</li>\n            <li>Eğitim-Öğretim programları hazırlamak, geliştirmek ve bu programları diğer eğitim kurumları ile paylaşmak.</li>\n            <li>Öğrencilerimizi; ulusal ve evrensel değerlere sahip, farklı kültürlere saygılı, anadiline hakim, yabancı dillere önem veren, uluslararası eğitim-öğretim programlarından yararlanabilen, sosyal sorumluluk bilincine sahip, yenilikçi ve lider bireyler yetiştirmektir.</li>\n          </ul>\n          <b>AEK Ankara Eğitim Kurumları</b>, değişimi yakalayan;\n          <br>\n          Gelişen dünyada yenilikçi ve sürekli gelişimi destekleyen bir eğitim kurumudur.\n          <br><br>\n          <b>AEK Ankara Eğitim Kurumları</b>, toplumsal sorumluluk bilinciyle;\n          <br>\n          Ülkesine, ailesine, yaşadığı fiziksel ve sosyal çevreye duyarlı, nesiller ve düşünen bireyler yetiştirir.\n          <br><br>\n          <b>AEK Ankara Eğitim Kurumları</b>, bilimin ışığında;\n          <br>\n          Yenilikçi, teknolojik gelişmeleri takip eden, gerçekçi ve bilimsel değerlendirmeler yapma anlayışı ile çalışır ve bu doğrultuda bireyler yetiştirir.\n          <br><br>\n          <b>Eğitimde Bütünsellik İlkesiyle;</b>\n          <br>\n          Çocuklarımıza farklı imkanlar sunarak bilim, spor, sanat ve kişisel gelişim alanlarında da dinamik bir eğitim sistemine sahiptir. Çocukların ruhsal duygusal zihinsel bedensel gelişimlerini destekleyecek eğitim sistemi sunar. Aynı zamanda beyin temelli öğrenim modelini benimsemiştir.\n          <br><br>\n          <b>AEK Ankara Eğitim Kurumları</b>, toplumsal değerlerimizi yaşatma felsefesiyle;\n          <br>\n          Yardımseverlik, hoşgörü, dürüstlük, farklılıklara saygılı olmak gibi insani değerlere önem veren ve bunu adalet duygusuyla birleştiren, benimseyen bir yapıya sahiptir.\n        </p>', '<p>           While preparing our children for their future in the light of Ataturk’s Principles and Reforms, AEK aims to           <ul>             <li>Be a pioneer and example for education not only in our country, but also throughout the world</li>             <li>Raise graduates, who can obtain, use and produce knowledge,</li>             <li>Enable our students to participate in international education and training programs by attaching importance to learning a foreign language,</li>             <li>Prepare and develop educational programs, and share them with other educational institutions,</li>             <li>Educate students; who possess national and universal values, respect different cultures, have a good command of their vernacular, can speak foreign languages and participate in international education and training programs, have awareness of their social responsibility, bares leadership and innovative skills.</li>           </ul>           <b>AEK Ankara Eğitim Kurumları</b>, is an educational institution, which embraces change and supports continuous development and innovative education throughout the world.           <br>           <b>AEK Ankara Eğitim Kurumları</b> raises succesful individuals and generations, who are aware of their country, family, physical and social environment, with social responsibility awareness.           <br><br>           <b>AEK Ankara Eğitim Kurumları</b>, operates with principles; which are innovative, realist, scientific, and follow the latest technological developments, in the light of science; and trains its students with these principles.           <br>           <b>AEK Ankara Eğitim Kurumları</b> has an education system, which is dynamic in the fields of science, sports, art, and self-improvement, with the Holism Principle in Education. It provides an educational system that supports mental, emotional, intellectual, and physical development of children.           <br><br>           <b>AEK Ankara Eğitim Kurumları</b> attaches importance to humanitarian values such as charity, tolerance, honesty, and respect to differences with the idea of keeping our social values; and assimilates them by associating these values with the sense of justice.         </p>', 'vizyon', 'vision', 2),
(3, 'Misyon', 'Mission', '<p>\n          <ul>\n            <li>Öğrencisi, velisi, öğretmeni, çalışan ve yöneticisi ile bir bütün olmak;</li>\n            <li>Öğrencilerimizin özgün yeteneklerini fark edebilecekleri ortam hazırlamak.</li>\n            <li>Tarih bilincine sahip, ulusal ve evrensel kimlik taşıyan bireyler yetiştirmek.</li>\n            <li>Gelişmeyi ve yenileşmeyi dünya standartlarında gerçekleştirmek.</li>\n            <li>Atatürk ilke ve inkılâplarının özünü benimsemiş aydın nesiller yetiştirmek.</li>\n            <li>Öğrencilerimize insani değerler ve yaşam becerileri kazandırarak onları hayata hazırlamaktır.</li>\n          </ul>\n        </p>', '<p>           <ul>             <li>Acting in unison with students, parents, personnel and administrative staff,</li>             <li>Providing our students with an environment that helps them recognize their skills,</li>             <li>Raising individuals, who have both national and universal identities, with historical consciousness,</li>             <li>Helping our students improve and innovate themselves in accordance with world standards,</li>             <li>Educating generations, who adhere to Ataturk’s Principles and Reforms,</li>             <li>Preparing our students for life by adorning them with humanitarian values and living skills.</li>           </ul>         </p>', 'misyon', 'mission', 3);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_iletisim`
--

DROP TABLE IF EXISTS `general_iletisim`;
CREATE TABLE IF NOT EXISTS `general_iletisim` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Ad` varchar(25) COLLATE utf8_turkish_ci NOT NULL,
  `en_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tel1` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tel1D` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tel2` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tel2D` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tel3` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tel3D` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Email` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `YolTarifi` text COLLATE utf8_turkish_ci NOT NULL,
  `Adres` text COLLATE utf8_turkish_ci NOT NULL,
  `Maps` text COLLATE utf8_turkish_ci NOT NULL,
  `Kod` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT 'Kolej',
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_iletisim`
--

INSERT INTO `general_iletisim` (`No`, `tr_Ad`, `en_Ad`, `Tel1`, `Tel1D`, `Tel2`, `Tel2D`, `Tel3`, `Tel3D`, `Email`, `YolTarifi`, `Adres`, `Maps`, `Kod`, `ListOrder`) VALUES
(1, 'Anaokulu', 'Kindergarten', '+90 (312) 215 0539', '+903122150539', '+90 (312) 236 1335', '+903122361335', '+90 (555) 996 2193', '+905559962193', 'anaokulu@aek.k12.tr', 'https://www.google.com/maps/dir//Mutlukent,+DEK+Anaokulu,+1967.+Sk.+No:3,+06800+%C3%87ankaya%2FAnkara/@39.8947751,32.700402,13.75z/data=!4m9!4m8!1m0!1m5!1m1!1s0x14d3387c7a93551d:0xc60897f08e06ba20!2m2!1d32.7102848!2d39.897807!3e0', 'Mutlukent Mah. 1967 Sok. Binsesin Sitesi No:5/A Ümitköy 06800 Çankaya/ANKARA', '', 'Kolej', 1),
(2, 'İlkokul', 'Primary School', '+90 (312) 235 8081', '+903122358081', '+90 (545) 722 4515', '+905457224515', '+90 (555) 883 8175', '+905558838175', 'ilkokul@aek.k12.tr', 'https://www.google.com/maps/dir//Prof.+Dr.+Ahmet+Taner+K%C4%B1%C5%9Flal%C4%B1+Mahallesi,+AEK+Ankara+E%C4%9Fitim+Kurumlar%C4%B1,+Alacaatl%C4%B1+Caddesi+No:32,+06810+Yenimahalle%2FAnkara/@39.864649,32.6808423,17z/data=!4m16!1m6!3m5!1s0x0:0x8718bc35e6adb3f1!2sAEK+Ankara+E%C4%9Fitim+Kurumlar%C4%B1!8m2!3d39.864649!4d32.683031!4m8!1m0!1m5!1m1!1s0x14d33f2d46e3ea19:0x8718bc35e6adb3f1!2m2!1d32.683031!2d39.864649!3e0', 'Ahmet Taner Kışlalı Mah. Alacaatlı Cad. No:32 Çayyolu 06810 Çankaya/ANKARA', '', 'Kolej', 2),
(3, 'Ortaokul', 'Secondary School', '+90 (312) 235 8081', '+903122358081', '+90 (545) 722 4515', '+905457224515', '+90 (555) 883 8175', '+905558838175', 'ortaokul@aek.k12.tr', 'https://www.google.com/maps/dir//Prof.+Dr.+Ahmet+Taner+K%C4%B1%C5%9Flal%C4%B1+Mahallesi,+AEK+Ankara+E%C4%9Fitim+Kurumlar%C4%B1,+Alacaatl%C4%B1+Caddesi+No:32,+06810+Yenimahalle%2FAnkara/@39.864649,32.6808423,17z/data=!4m16!1m6!3m5!1s0x0:0x8718bc35e6adb3f1!2sAEK+Ankara+E%C4%9Fitim+Kurumlar%C4%B1!8m2!3d39.864649!4d32.683031!4m8!1m0!1m5!1m1!1s0x14d33f2d46e3ea19:0x8718bc35e6adb3f1!2m2!1d32.683031!2d39.864649!3e0', 'Ahmet Taner Kışlalı Mah. Alacaatlı Cad. No:32 Çayyolu 06810 Çankaya/ANKARA', '', 'Kolej', 3),
(4, 'Anadolu Lisesi', 'Anatolian High School', '+90 (312) 238 2636', '+903122382636', '+90 (545) 722 4515', '+905457224515', '+90 (555) 877 3781', '+905558773781', 'anadolulisesi@aek.k12.tr', 'https://www.google.com/maps/dir//Prof.+Dr.+Ahmet+Taner+K%C4%B1%C5%9Flal%C4%B1+Mahallesi,+AEK+Ankara+E%C4%9Fitim+Kurumlar%C4%B1,+Alacaatl%C4%B1+Caddesi+No:32,+06810+Yenimahalle%2FAnkara/@39.864649,32.6808423,17z/data=!4m16!1m6!3m5!1s0x0:0x8718bc35e6adb3f1!2sAEK+Ankara+E%C4%9Fitim+Kurumlar%C4%B1!8m2!3d39.864649!4d32.683031!4m8!1m0!1m5!1m1!1s0x14d33f2d46e3ea19:0x8718bc35e6adb3f1!2m2!1d32.683031!2d39.864649!3e0', 'Ahmet Taner Kışlalı Mah. Alacaatlı Cad. No:32 Çayyolu 06810 Çankaya/ANKARA', '', 'Kolej', 4),
(5, 'Google Maps', 'Google Maps', '', '', '', '', '', '', '', '', '', 'https://www.google.com/maps/d/embed?mid=1Le0Fz518sHyiR1RWOmFQa6dl2mfMtBZR', 'Maps', 5);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_kadro`
--

DROP TABLE IF EXISTS `general_kadro`;
CREATE TABLE IF NOT EXISTS `general_kadro` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `AdSoyad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Aciklama` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_UzunAciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `en_UzunAciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `Resim` text COLLATE utf8_turkish_ci NOT NULL,
  `GrupSectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=129 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_kadro`
--

INSERT INTO `general_kadro` (`No`, `AdSoyad`, `Aciklama`, `tr_UzunAciklama`, `en_UzunAciklama`, `Resim`, `GrupSectionID`, `ListOrder`) VALUES
(1, 'Serpil KOZA', 'ilkokul-muduru', '', '', 'Kadro/Serpil-Koza.jpg', 'Mudur', 58),
(3, 'Derya MERAL', 'anadolu-lisesi-muduru', '', '', 'Kadro/Derya-Meral.jpg', 'Mudur', 59),
(4, 'Zerrin AKGÜN', 'ortaokul-muduru', '', '', 'Kadro/Zerrin-Akgun.jpg', 'Mudur', 60),
(5, 'Füsun AKINTI', 'ilkokul-mudur-yardimcisi', '', '', 'Kadro/Fusun-Akinti.jpg', 'mudur-yardimcisi', 62),
(6, 'Muhittin ÖZGÜN', 'ortaokul-mudur-yardimcisi', '', '', 'Kadro/Muhittin-Ozgun.jpg', 'mudur-yardimcisi', 63),
(7, 'Hayrettin DEMİR', 'anadolu-lisesi-mudur-yardimcisi', '', '', 'Kadro/Hayrettin-Demir.jpg', 'mudur-yardimcisi', 64),
(8, 'Mehtap Nur BİTMEZ', 'ilkokul-pdr-birimi', '', '', 'Kadro/Mehtap-Nur-Bitmez.jpg', 'pdr-birimi', 88),
(9, 'Merve Özcan KURT', 'ortaokul-pdr-birimi', '', '', 'Kadro/Merve-Ozcan-Kurt.jpg', 'pdr-birimi', 89),
(10, 'Hakan GÜLLE', 'anadolu-lisesi-pdr-birimi', '', '', 'Kadro/Hakan-Gulle.jpg', 'pdr-birimi', 90),
(11, 'Ayten ÖZDEMİR', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Ayten-Ozdemir.jpg', 'ilkokul-sinif-ogretmeni', 38),
(13, 'Dilşad İNCEDAL', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Dilsad-Incedal.jpg', 'ilkokul-sinif-ogretmeni', 39),
(14, 'Fatma TEKİN', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Fatma-Tekin.jpg', 'ilkokul-sinif-ogretmeni', 40),
(15, 'Gülseren SAYLAM', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Gulseren-Saylam.jpg', 'ilkokul-sinif-ogretmeni', 41),
(16, 'Güzin NAMLI', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Guzin-Namli.jpg', 'ilkokul-sinif-ogretmeni', 42),
(17, 'Nebahat ÖZKAN', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Nebahat-Ozkan.jpg', 'ilkokul-sinif-ogretmeni', 43),
(18, 'Nurten ONAT', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Nurten-Onat.jpg', 'ilkokul-sinif-ogretmeni', 44),
(19, 'Pervin İLHAN', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Pervin-Ilhan.jpg', 'ilkokul-sinif-ogretmeni', 45),
(20, 'Saadet KAHRAMANOĞLU', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Saadet-Kahramanoglu.jpg', 'ilkokul-sinif-ogretmeni', 46),
(21, 'Sema BURSAL', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Sema-Bursal.jpg', 'ilkokul-sinif-ogretmeni', 47),
(22, 'Serpil GEZEN', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Serpil-Gezen.jpg', 'ilkokul-sinif-ogretmeni', 48),
(23, 'Sevgi ERTONGA', 'ilkokul-sinif-ogretmeni', '', '', 'Kadro/Sevgi-Ertonga.jpg', 'ilkokul-sinif-ogretmeni', 49),
(25, 'Hüseyin YILMAZ', 'turk-dili-ve-edebiyati-zumresi', '', '', 'Kadro/Huseyin-Yilmaz.jpg', 'turk-dili-ve-edebiyati-zumresi', 95),
(26, 'Olcay CENGİZ', 'turk-dili-ve-edebiyati-zumresi', '', '', 'Kadro/Olcay-Cengiz.jpg', 'turk-dili-ve-edebiyati-zumresi', 96),
(27, 'Yasemin YEŞİLKAYA', 'turk-dili-ve-edebiyati-zumresi', '', '', 'Kadro/Yasemin-Yesilkaya.jpg', 'turk-dili-ve-edebiyati-zumresi', 97),
(29, 'Ayşegül AZMAN', 'matematik-zumresi', '', '', 'Kadro/Aysegul-Azman.jpg', 'matematik-zumresi', 50),
(30, 'Duygu ÇAKAN', 'matematik-zumresi', '', '', 'Kadro/Duygu-Cakan.jpg', 'matematik-zumresi', 51),
(31, 'İlkay ŞAHİN', 'matematik-zumresi', '', '', 'Kadro/Ilkay-Sahin.jpg', 'matematik-zumresi', 52),
(32, 'Mutlu DERELİ', 'matematik-zumresi', '', '', 'Kadro/Mutlu-Dereli.jpg', 'matematik-zumresi', 53),
(33, 'Ozan Barış BOLAT', 'matematik-zumresi', '', '', 'Kadro/Ozan-Bolat.jpg', 'matematik-zumresi', 54),
(34, 'Selen ÇAKIR', 'matematik-zumresi', '', '', 'Kadro/Selen-Cakir.jpg', 'matematik-zumresi', 55),
(35, 'Senem MIRÇIK', 'matematik-zumresi', '', '', 'Kadro/Senem-Mircik.jpg', 'matematik-zumresi', 56),
(36, 'Yıldırım Kemal ÇOPUR', 'matematik-zumresi', '', '', 'Kadro/Yildirim-Kemal-Copur.jpg', 'matematik-zumresi', 57),
(37, 'Aytül PALA', 'fizik', '', '', 'Kadro/Aytul-Pala.jpg', 'fen-bilimleri-zumresi', 22),
(38, 'Burcu BAYKAL', 'fen-bilimleri', '', '', 'Kadro/Burcu-Baykal.jpg', 'fen-bilimleri-zumresi', 23),
(39, 'Demet BOZKURT (AYDIN)', 'kimya', '', '', 'Kadro/Demet-Bozkurt-Aydin.jpg', 'fen-bilimleri-zumresi', 24),
(40, 'Dilara TOPUKÇU', 'fizik', '', '', 'Kadro/Dilara-Topukcu.jpg', 'fen-bilimleri-zumresi', 25),
(41, 'Elif BİLEN', 'fen-bilimleri', '', '', 'Kadro/Elif-Bilen.jpg', 'fen-bilimleri-zumresi', 26),
(42, 'Şeyma ÜNNÜ', 'biyoloji', '', '', 'Kadro/Seyma-Unnu.jpg', 'fen-bilimleri-zumresi', 27),
(43, 'Ufuk ATAK', 'fizik', '', '', 'Kadro/Ufuk-Atak.jpg', 'fen-bilimleri-zumresi', 28),
(44, 'Ülkü ALTINTAŞ HAYTA', 'fen-bilimleri', '', '', 'Kadro/Ulku-Altintas-Hayta.jpg', 'fen-bilimleri-zumresi', 29),
(45, 'Yasemin DEKLİ', 'kimya', '', '', 'Kadro/Yasemin-Dekli.jpg', 'fen-bilimleri-zumresi', 30),
(46, 'Asena Mine ATAKUL', 'sosyal-bilgiler', '', '', 'Kadro/Asena-Mine-Atakul.jpg', 'sosyal-bilimler-zumresi', 91),
(47, 'Azad AK', 'din-kulturu-ve-ahlak-bilgisi', '', '', 'Kadro/Azak-Ak.jpg', 'sosyal-bilimler-zumresi', 92),
(48, 'Derya ATEŞ', 'sosyal-bilgiler', '', '', 'Kadro/Derya-Ates.jpg', 'sosyal-bilimler-zumresi', 93),
(50, 'Mehmet DEMİRBAŞ', 'cografya', '', '', 'Kadro/Mehmet-Demirbas.jpg', 'sosyal-bilimler-zumresi', 94),
(53, 'Ayşegül PEHLİVANLI', 'ingilizce', '', '', 'Kadro/Aysegul-Pehlivanli.jpg', 'yabanci-diller-zumresi', 98),
(54, 'Berrak KANTARCI', 'ingilizce', '', '', 'Kadro/Berrak-Kantarci.jpg', 'yabanci-diller-zumresi', 99),
(55, 'Burcu Yıldız AYDIN', 'ingilizce', '', '', 'Kadro/Burcu-Yildiz-Aydin.jpg', 'yabanci-diller-zumresi', 100),
(58, 'Gülçin DİKTAŞ', 'ingilizce', '', '', 'Kadro/Gulcin-Diktas.jpg', 'yabanci-diller-zumresi', 101),
(61, 'Nil GİRİTLİ', 'ingilizce', '', '', 'Kadro/Nil-Giritli.jpg', 'yabanci-diller-zumresi', 102),
(62, 'Nuray ALTINER', 'ingilizce', '', '', 'Kadro/Nuray-Altiner.jpg', 'yabanci-diller-zumresi', 103),
(63, 'S. Arzu AYHAN', 'ingilizce', '', '', 'Kadro/Arzu-Ayhan.jpg', 'yabanci-diller-zumresi', 104),
(64, 'Seda ŞIK ABDURREZZAK', 'ingilizce', '', '', 'Kadro/Seda-Sik.jpg', 'yabanci-diller-zumresi', 105),
(65, 'Zülal TARAKÇIOĞLU', 'ingilizce', '', '', 'Kadro/Zulal-Tarakcioglu.jpg', 'yabanci-diller-zumresi', 108),
(66, 'Aykut METİN', 'grafik-tasarim', '', '', 'Kadro/Aykut-Metin.jpg', 'idari-birimler', 31),
(67, 'Can ÖZDEMİR', 'idari-isler', '', '', 'Kadro/Can-Ozdemir.jpg', 'idari-birimler', 32),
(69, 'Ebru SAYIN', 'halkla-iliskiler', '', '', 'Kadro/Ebru-Sayin.jpg', 'idari-birimler', 33),
(70, 'Figen KORHAN', 'Öğrenci İşleri', '', '', 'Kadro/Figen-Korhan.jpg', 'idari-birimler', 34),
(71, 'Gülizar ATEŞ', 'hemsire', '', '', 'Kadro/Gulizar-Ates.jpg', 'idari-birimler', 35),
(72, 'Hamdiye AŞKAN', 'desk', '', '', 'Kadro/Hamdiye-Askan.jpg', 'idari-birimler', 36),
(75, 'Birsen KANDIR', 'destek-ekibi', '', '', 'Kadro/Birsen-Kandir.jpg', 'destek-ekibi', 9),
(76, 'Döne YASAN', 'destek-ekibi', '', '', 'Kadro/Done-Yasan.jpg', 'destek-ekibi', 11),
(77, 'Halime ÖZENÇ', 'destek-ekibi', '', '', 'Kadro/Halime-Ozenc.jpg', 'destek-ekibi', 10),
(78, 'Meryem GÖKŞEN', 'destek-ekibi', '', '', 'Kadro/Meryem-Goksen.jpg', 'destek-ekibi', 12),
(79, 'Murat MERİÇ', 'destek-ekibi', '', '', 'Kadro/Murat-Meric.jpg', 'destek-ekibi', 13),
(80, 'Nejla ÖCAL', 'destek-ekibi', '', '', 'Kadro/Nejla-Ocal.jpg', 'destek-ekibi', 14),
(81, 'Yeliz SÖYLEMEZ', 'destek-ekibi', '', '', 'Kadro/Yeliz-Soylemez.jpg', 'destek-ekibi', 15),
(82, 'Zübeyde AKTAŞ', 'destek-ekibi', '', '', 'Kadro/Zubeyde-Aktas.jpg', 'destek-ekibi', 16),
(83, 'Dr. Sultan BATUR', 'yonetim-kurulu-baskani', '1966 yılında Ankara’da doğdu. 1989 Ege Üniversitesi Tıp Fakültesinden mezun oldu. 1993 yılından itibaren eğitim nörolojisi ve eğitim psikolojisi üzerine pek çok çalışma yaptı. Beyin temelli eğitimin modelinin Türkiye’deki ilk uygulayıcısıdır.', 'She was born in 1966, in Ankara. She has graduated from the Faculty of Medicine of Ege University in 1989. She has conducted various studies on educational neurology and educational psychology ever since 1993. She is the first practitioner of brain-based education model in Turkey.', 'Placeholder/250x250.png', 'yonetim-kurulu', 107),
(84, 'Dr. Feride KİBAROĞLU', 'yonetim-kurulu-uyesi', '1965 yılında Ankara’da doğdu. Çukurova Üniversitesi Tıp Fakültesini bitirdi. Halen Magnet Hastanelerinin Yönetim Kurulu Başkanı olarak görev yapmaktadır.', '1965 yılında Ankara’da doğdu. Çukurova Üniversitesi Tıp Fakültesini bitirdi. Halen Magnet Hastanelerinin Yönetim Kurulu Başkanı olarak görev yapmaktadır.', 'Placeholder/250x250.png', 'yonetim-kurulu', 106),
(85, 'Dr. Murat BATUR', 'yonetim-kurulu-uyesi', '1962 yılında Ankara’da doğdu. 1989 Ege Üniversitesi Tıp Fakültesinden mezun oldu. Magnet Hastanesi Tıbbi Direktörlük görevini sürdürmektedir.', 'He was born in Ankara, in 1962. He has graduated from the Faculty of Medicine of Ege University in 1989. He has been working at the Medical Director of Magnet Hospitals.', 'Placeholder/250x250.png', 'yonetim-kurulu', 109),
(86, 'Ali İhsan KİBAROĞLU', 'yonetim-kurulu-uyesi', '1964 yılında Ankara’da doğdu. 1989 yılında Hacettepe Üniversitesi Felsefe Bölümü’nü bitirdi. Halen Magnet Hastanelerinde kurucu ve yönetici olarak görev yapmaktadır.', 'He was born in Ankara, in 1964. He has graduated from the department of Philosophy of Hacettepe University in 1989. He still works as the founder and executive of Magnet Hospitals.', 'Placeholder/250x250.png', 'yonetim-kurulu', 110),
(87, 'Gonca Duman', 'okul-aile-birligi-baskani', '', '', 'Kadro/Gonca-Duman.jpg', 'okul-aile-birligi', 65),
(88, 'Mavi Dumankaya', 'okul-aile-birligi-baskan-yardimcisi', '', '', 'Kadro/Mavi-Dumankaya.jpg', 'okul-aile-birligi', 66),
(90, 'Arda SENYAYLA', 'anaokulu-sinif-ogretmeni', '', '', 'Kadro/Arda-Senyayla.jpg', 'anaokulu-sinif-ogretmeni', 1),
(91, 'Ayşe Zisan GÜRLER', 'anaokulu-sinif-ogretmeni', '', '', 'Kadro/Ayse-Zisan-Gurler.jpg', 'anaokulu-sinif-ogretmeni', 2),
(92, 'Dilek DENİZ', 'anaokulu-sinif-ogretmeni', '', '', 'Kadro/Dilek-Deniz.jpg', 'anaokulu-sinif-ogretmeni', 3),
(93, 'Ebru ÖZEKER', 'anaokulu-sinif-ogretmeni', '', '', 'Kadro/Ebru-Ozeker.jpg', 'anaokulu-sinif-ogretmeni', 4),
(94, 'Halime Hande POLATKAL', 'anaokulu-sinif-ogretmeni', '', '', 'Kadro/Halime-Hande-Polatkal.jpg', 'anaokulu-sinif-ogretmeni', 5),
(95, 'Oya BADAT', 'anaokulu-sinif-ogretmeni', '', '', 'Kadro/Oya-Badat.jpg', 'anaokulu-sinif-ogretmeni', 6),
(96, 'Seda Ayca ARSLAN', 'anaokulu-sinif-ogretmeni', '', '', 'Kadro/Seda-Ayca-Arslan.jpg', 'anaokulu-sinif-ogretmeni', 7),
(97, 'Zeliha Tekin KÖSE', 'anaokulu-sinif-ogretmeni', '', '', 'Kadro/Zeliha-Tekin-Kose.jpg', 'anaokulu-sinif-ogretmeni', 8),
(98, 'Meryem ÇAYLAK', 'halkla-iliskiler', '', '', 'Kadro/Meryem-Caylak.jpg', 'idari-birimler', 37),
(99, 'Husne KİLCİ', 'destek-ekibi', '', '', 'Kadro/Husne-Kilci.jpg', 'destek-ekibi', 17),
(100, 'Ayse AKGUN', 'destek-ekibi', '', '', 'Kadro/Ayse-Akgun.jpg', 'destek-ekibi', 18),
(101, 'Gonca TURKEM', 'destek-ekibi', '', '', 'Kadro/Gonca-Turkem.jpg', 'destek-ekibi', 19),
(102, 'Gulistan OZBİLGİN', 'destek-ekibi', '', '', 'Kadro/Gulistan-Ozbilgin.jpg', 'destek-ekibi', 20),
(103, 'Gulseren KAMİSLİ', 'destek-ekibi', '', '', 'Kadro/Gulseren-Kamisli.jpg', 'destek-ekibi', 21),
(104, 'Gulnur ILHAN', 'anaokulu-pdr-birimi', '', '', 'Kadro/Gulnur-Ilhan.jpg', 'pdr-birimi', 87),
(105, 'Hale Mengukaan', 'anaokulu-muduru', '', '', 'Kadro/Hale-Mengukaan.jpg', 'Mudur', 61),
(108, 'Zeynep Erkan', 'muhasip', '', '', 'Kadro/Zeynep-Erkan.jpg', 'okul-aile-birligi', 67),
(109, 'Ayla Aydoğdu', 'yazman', '', '', 'Kadro/Ayla-Aydogdu.jpg', 'okul-aile-birligi', 68),
(110, 'Nur Okçu', 'denetci', '', '', 'Kadro/Nur-Okcu.jpg', 'okul-aile-birligi', 69),
(111, 'Çiğdem Mayda', 'denetci-yardimcisi', '', '', 'Kadro/Cigdem-Mayda.jpg', 'okul-aile-birligi', 70),
(112, 'Yasemin Doğan', 'uye', '', '', 'Kadro/Yasemin-Dogan.jpg', 'okul-aile-birligi', 71),
(113, 'Yeşim Çağlar', 'uye', '', '', 'Kadro/Yesim-Caglar.jpg', 'okul-aile-birligi', 72),
(114, 'Serap İlikli', 'yedek-uye', '', '', 'Kadro/Serap-Ilikli.jpg', 'okul-aile-birligi', 73),
(116, 'Açıklama Yazısı 3', '', 'Açıklama Yazısı 3', '', 'Genel/OAB-3.png', 'okul-aile-birligi-galeri', 74),
(117, '', '', 'Açıklama Yazısı 4', '', 'Genel/OAB-4.png', 'okul-aile-birligi-galeri', 75),
(118, '', '', 'Açıklama Yazısı 5', '', 'Genel/OAB-5.png', 'okul-aile-birligi-galeri', 76),
(119, '', '', 'Açıklama Yazısı 6', '', 'Genel/OAB-6.png', 'okul-aile-birligi-galeri', 77),
(120, '', '', 'Açıklama Yazısı 7', '', 'Genel/OAB-7.png', 'okul-aile-birligi-galeri', 78),
(121, '', '', 'Açıklama Yazısı 8', '', 'Genel/OAB-8.png', 'okul-aile-birligi-galeri', 79),
(122, '', '', 'Açıklama Yazısı 9', '', 'Genel/OAB-9.png', 'okul-aile-birligi-galeri', 80),
(123, '', '', 'Açıklama Yazısı 10', '', 'Genel/OAB-10.png', 'okul-aile-birligi-galeri', 81),
(124, '', '', 'Açıklama Yazısı 11', '', 'Genel/OAB-11.png', 'okul-aile-birligi-galeri', 82),
(125, '', '', 'Açıklama Yazısı 12', '', 'Genel/OAB-12.png', 'okul-aile-birligi-galeri', 83),
(126, '', '', 'Açıklama Yazısı 13', '', 'Genel/OAB-13.png', 'okul-aile-birligi-galeri', 84),
(127, '', '', 'Açıklama Yazısı 14', '', 'Genel/OAB-14.png', 'okul-aile-birligi-galeri', 85),
(128, '', '', 'Açıklama Yazısı 15', '', 'Genel/OAB-15.png', 'okul-aile-birligi-galeri', 86);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_kadro_grup`
--

DROP TABLE IF EXISTS `general_kadro_grup`;
CREATE TABLE IF NOT EXISTS `general_kadro_grup` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_KisaAd` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_KisaAd` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `MainSectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `SubSectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `MainOrSub` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT 'Main',
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=86 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_kadro_grup`
--

INSERT INTO `general_kadro_grup` (`No`, `tr_KisaAd`, `en_KisaAd`, `tr_Ad`, `en_Ad`, `MainSectionID`, `SubSectionID`, `MainOrSub`, `ListOrder`) VALUES
(1, 'Müdür', 'Directors', 'Müdürlerimiz', 'Directors', 'kadro', 'Mudur', 'Sub', 5),
(2, 'Müdür Yardımcısı', 'Head Quarters', 'Müdür Yardımcılarımız', 'Head Quarters', 'kadro', 'mudur-yardimcisi', 'Sub', 6),
(3, 'PDR Birimi', 'Psychological Counseling, Guidance', 'PDR Birimimiz', 'Psychological Counseling, Guidance', 'kadro', 'pdr-birimi', 'Sub', 7),
(12, 'Kadro', 'Staff', 'Kadro', 'Staff', 'kadro', '', 'Main', 1),
(13, 'Okul Aile Birliği', 'School Parent Association', 'Okul Aile Birliği', 'School Parent Association', 'okul-aile-birligi', '', 'Main', 2),
(14, 'Yönetim Kurulu', 'Board of Directors', 'Yönetim Kurulu', 'Board of Directors', 'yonetim-kurulu', '', 'Main', 3),
(16, 'Anaokulu Müdürü', 'Kindergarten Manager', 'Anaokulu Müdürümüz', 'Kindergarten Manager', 'Mudur', 'anaokulu-muduru', 'SubSub', 20),
(17, 'İlkokul Müdürü', 'Primary School Principal', 'İlkokul Müdürümüz', 'Primary School Principal', 'Mudur', 'ilkokul-muduru', 'SubSub', 21),
(18, 'Ortaokul Müdürü', 'Secondary School Principal', 'Ortaokul Müdürümüz', 'Secondary School Principal', 'Mudur', 'ortaokul-muduru', 'SubSub', 22),
(19, 'Anadolu Lisesi Müdürü', 'Anatolian High School Principal', 'Anadolu Lisesi Müdürümüz', 'Anatolian High School Principal', 'Mudur', 'anadolu-lisesi-muduru', 'SubSub', 23),
(20, 'Anadolu Lisesi Müdür Yardımcısı', 'Anatolian High School Principal Assistant', 'Anadolu Lisesi Müdür Yardımcımız', 'Anatolian High School Principal Assistant', 'mudur-yardimcisi', 'anadolu-lisesi-mudur-yardimcisi', 'SubSub', 24),
(21, 'Ortaokul Müdür Yardımcısı', 'Secondary School Principal Assistant', 'Ortaokul Müdür Yardımcımız', 'Secondary School Principal Assistant', 'mudur-yardimcisi', 'ortaokul-mudur-yardimcisi', 'SubSub', 25),
(22, 'İlkokul Müdür Yardımcısı', 'Primary School Principal Assistant', 'İlkokul Müdür Yardımcımız', 'Primary School Principal Assistant', 'mudur-yardimcisi', 'ilkokul-mudur-yardimcisi', 'SubSub', 26),
(23, 'Anadolu Lisesi', 'Anatolian High School', 'Anadolu Lisesi', 'Anatolian High School', 'pdr-birimi', 'anadolu-lisesi-pdr-birimi', 'SubSub', 27),
(24, 'Ortaokul', 'Secondary School', 'Ortaokul', 'Secondary School', 'pdr-birimi', 'ortaokul-pdr-birimi', 'SubSub', 28),
(25, 'İlkokul', 'Primary School', 'İlkokul', 'Primary School', 'pdr-birimi', 'ilkokul-pdr-birimi', 'SubSub', 29),
(26, 'Anaokulu', 'Kindergarten', 'Anaokulu', 'Kindergarten', 'pdr-birimi', 'anaokulu-pdr-birimi', 'SubSub', 30),
(28, 'Anaokulu Sınıf Öğretmeni', 'Kindergarten Class Teachers', 'Anaokulu Sınıf Öğretmenlerimiz', 'Kindergarten Class Teachers', 'kadro', 'anaokulu-sinif-ogretmeni', 'Sub', 8),
(29, 'İlkokul Sınıf Öğretmeni', 'Primary School Class Teachers', 'İlkokul Sınıf Öğretmenlerimiz', 'Primary School Class Teachers', 'kadro', 'ilkokul-sinif-ogretmeni', 'Sub', 9),
(30, 'Türk Dili ve Edebiyatı Zümresi', 'Turkish Language and Literature', 'Türk Dili ve Edebiyatı Zümremiz', 'Turkish Language and Literature', 'kadro', 'turk-dili-ve-edebiyati-zumresi', 'Sub', 10),
(31, 'Matematik Zümresi', 'Math', 'Matematik Zümremiz', 'Math', 'kadro', 'matematik-zumresi', 'Sub', 11),
(32, 'Fen Bilimleri Zümresi', 'Science', 'Fen Bilimleri Zümremiz', 'Science', 'kadro', 'fen-bilimleri-zumresi', 'Sub', 12),
(33, 'Fen Bilimleri', 'Science', 'Fen Bilimleri', 'Science', 'fen-bilimleri-zumresi', 'fen-bilimleri', 'SubSub', 31),
(34, 'Fizik', 'Physics', 'Fizik', 'Physics', 'fen-bilimleri-zumresi', 'fizik', 'SubSub', 32),
(35, 'Kimya', 'Chemistry', 'Kimya', 'Chemistry', 'fen-bilimleri-zumresi', 'kimya', 'SubSub', 33),
(36, 'Biyoloji', 'Biology', 'Biyoloji', 'Biology', 'fen-bilimleri-zumresi', 'biyoloji', 'SubSub', 34),
(37, 'Sosyal Bilimler Zümresi', 'Social Sciences', 'Sosyal Bilimler Zümremiz', 'Social Sciences', 'kadro', 'sosyal-bilimler-zumresi', 'Sub', 13),
(38, 'Sosyal Bilgiler', 'Social Sciences', 'Sosyal Bilgiler', 'Social Sciences', 'sosyal-bilimler-zumresi', 'sosyal-bilgiler', 'SubSub', 35),
(39, 'Din Kültürü ve Ahlak Bilgisi', 'Religion Culture and Ethics', 'Din Kültürü ve Ahlak Bilgisi', 'Religion Culture and Ethics', 'sosyal-bilimler-zumresi', 'din-kulturu-ve-ahlak-bilgisi', 'SubSub', 36),
(40, 'Tarih', 'History', 'Tarih', 'History', 'sosyal-bilimler-zumresi', 'tarih', 'SubSub', 37),
(41, 'Coğrafya', 'Geography', 'Coğrafya', 'Geography', 'sosyal-bilimler-zumresi', 'cografya', 'SubSub', 38),
(42, 'Yabancı Diller Zümresi', 'Foreign Languages', 'Yabancı Diller Zümremiz', 'Foreign Languages', 'kadro', 'yabanci-diller-zumresi', 'Sub', 14),
(43, 'İngilizce', 'English', 'İngilizce', 'English', 'yabanci-diller-zumresi', 'ingilizce', 'SubSub', 39),
(44, 'İspanyolca', 'Spanish', 'İspanyolca', 'Spanish', 'yabanci-diller-zumresi', 'ispanyolca', 'SubSub', 40),
(45, 'İdari Birimler', 'Administrative Units', 'İdari Birimlerimiz', 'Administrative Units', 'kadro', 'idari-birimler', 'Sub', 15),
(46, 'Desk', 'Desks', 'Desk', 'Desks', 'idari-birimler', 'desk', 'SubSub', 41),
(47, 'Grafik-Tasarım', 'Graphic-Design', 'Grafik-Tasarım', 'Graphic-Design', 'idari-birimler', 'grafik-tasarim', 'SubSub', 42),
(48, 'Halkla İlişkiler', 'Public Relations', 'Halkla İlişkiler', 'Public Relations', 'idari-birimler', 'halkla-iliskiler', 'SubSub', 43),
(49, 'Hemşire', 'Nurse', 'Hemşire', 'Nurse', 'idari-birimler', 'hemsire', 'SubSub', 44),
(50, 'İdari İşler', 'Technical Affairs', 'İdari İşler', 'Technical Affairs', 'idari-birimler', 'idari-isler', 'SubSub', 45),
(51, 'İdari Personel', 'Technical Staff', 'İdari Personel', 'Technical Staff', 'idari-birimler', 'idari-personel', 'SubSub', 46),
(52, 'Muhasebe', 'Finance', 'Muhasebe', 'Finance', 'idari-birimler', 'muhasebe', 'SubSub', 47),
(53, 'Destek Ekibi', 'Support Team', 'Destek Ekibimiz', 'Support Team', 'kadro', 'destek-ekibi', 'Sub', 16),
(54, 'Yönetim Kurulu Başkanı', 'Chairman of the board', 'Yönetim Kurulu Başkanı', 'Chairman Of The Board', 'yonetim-kurulu', 'yonetim-kurulu-baskani', 'SubSub', 48),
(55, 'Yönetim Kurulu Üyesi', 'Board Member', 'Yönetim Kurulu Üyesi', 'Board Member', 'yonetim-kurulu', 'yonetim-kurulu-uyesi', 'SubSub', 49),
(56, 'Okul Aile Birliği Başkanı', 'Head of School Parents Association', 'Okul Aile Birliği Başkanı', 'Head of School Parents Association', 'okul-aile-birligi', 'okul-aile-birligi-baskani', 'SubSub', 50),
(57, 'Okul Aile Birliği Başkan Yardımcısı', 'Vice President, School Parent Association', 'Okul Aile Birliği Başkan Yardımcısı', 'Vice President, School Parent Association', 'okul-aile-birligi', 'okul-aile-birligi-baskan-yardimcisi', 'SubSub', 51),
(58, 'Muhasip', 'Accountant', 'Muhasip', 'Accountant', 'okul-aile-birligi', 'muhasip', 'SubSub', 52),
(59, 'Yazman', 'Secretary', 'Yazman', 'Secretary', 'okul-aile-birligi', 'yazman', 'SubSub', 53),
(60, 'Üye', 'Member', 'Üye', 'Member', 'okul-aile-birligi', 'uye', 'SubSub', 54),
(61, 'Denetçi', '', 'Denetçi', '', 'okul-aile-birligi', 'denetci', 'SubSub', 55),
(62, 'Denetçi Yardımcısı', '', 'Denetçi Yardımcısı', '', 'okul-aile-birligi', 'denetci-yardimcisi', 'SubSub', 56),
(63, 'Yedek Üye', '', 'Yedek Üye', '', 'okul-aile-birligi', 'yedek-uye', 'SubSub', 57),
(64, 'Okul Aile Birliği Galeri', 'School Parent Association Gallery', 'Okul Aile Birliği Galeri', 'School Parent Association Gallery', 'okul-aile-birligi-galeri', '', 'Main', 4),
(66, 'Okul Aile Birliği Galeri', 'School Parent Association Gallery', 'Okul Aile Birliği Galeri', 'School Parent Association Gallery', 'okul-aile-birligi-galeri', 'okul-aile-birligi-galeri', 'Sub', 17),
(68, 'Yönetim Kurulu', 'Board of Directors', 'Yönetim Kurulu', 'Board of Directors', 'yonetim-kurulu', 'yonetim-kurulu', 'Sub', 18),
(69, 'Okul Aile Birliği', 'School Parent Association', 'Okul Aile Birliği', 'School Parent Association', 'okul-aile-birligi', 'okul-aile-birligi', 'Sub', 19),
(70, 'Anaokulu Sınıf Öğretmeni', 'Kindergarten Class Teachers', '', '', 'anaokulu-sinif-ogretmeni', 'anaokulu-sinif-ogretmeni', 'SubSub', 58),
(71, 'İlkokul Sınıf Öğretmeni', 'Primary School Class Teachers', '', '', 'ilkokul-sinif-ogretmeni', 'ilkokul-sinif-ogretmeni', 'SubSub', 59),
(72, 'Türk Dili ve Edebiyatı Zümresi', 'Turkish Language and Literature', '', '', 'turk-dili-ve-edebiyati-zumresi', 'turk-dili-ve-edebiyati-zumresi', 'SubSub', 60),
(73, 'Matematik Zümresi', 'Math', '', '', 'matematik-zumresi', 'matematik-zumresi', 'SubSub', 61),
(74, 'Destek Ekibi', 'Support Team', '', '', 'destek-ekibi', 'destek-ekibi', 'SubSub', 62),
(75, 'Okul Aile Birliği Galeri', 'School Parent Association Gallery', 'Okul Aile Birliği Galeri', 'School Parent Association Gallery', 'okul-aile-birligi-galeri', 'okul-aile-birligi-galeri', 'SubSub', 63);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_kategoriler`
--

DROP TABLE IF EXISTS `general_kategoriler`;
CREATE TABLE IF NOT EXISTS `general_kategoriler` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `Isim` varchar(65) COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`),
  UNIQUE KEY `k` (`Isim`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_kategoriler`
--

INSERT INTO `general_kategoriler` (`No`, `Isim`, `ListOrder`) VALUES
(1, 'Duyurular', 3),
(2, 'Galeri', 5),
(3, 'Genel', 2),
(5, 'Etkinlikler', 6),
(6, 'Haberler', 4),
(7, 'Kadro', 7),
(8, 'Yemek-Listesi', 8),
(9, 'Basinda-Biz', 9),
(10, 'Basarilar', 10),
(11, 'Banner', 1);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_kullanicilar`
--

DROP TABLE IF EXISTS `general_kullanicilar`;
CREATE TABLE IF NOT EXISTS `general_kullanicilar` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `TCNo` varchar(11) COLLATE utf8_turkish_ci NOT NULL,
  `Sifre` varchar(60) COLLATE utf8_turkish_ci NOT NULL,
  `Ogrenci` int(1) NOT NULL DEFAULT '0',
  `Ogretmen` int(1) DEFAULT '0',
  `Rehberlik` int(1) NOT NULL DEFAULT '0',
  `Teknik` int(1) NOT NULL DEFAULT '0',
  `Yonetici` int(1) NOT NULL DEFAULT '0',
  `Admin` int(1) NOT NULL DEFAULT '0',
  `user_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_modified` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `user_last_login` datetime DEFAULT NULL,
  PRIMARY KEY (`No`),
  UNIQUE KEY `TCNo` (`TCNo`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_kullanicilar`
--

INSERT INTO `general_kullanicilar` (`No`, `Email`, `TCNo`, `Sifre`, `Ogrenci`, `Ogretmen`, `Rehberlik`, `Teknik`, `Yonetici`, `Admin`, `user_date`, `user_modified`, `user_last_login`) VALUES
(1, 'sasiogludogucan@gmail.com', '65911056744', '$2a$08$3p9nD0puKQ45xUKuEjwd7u4np0q1KVli3qPZu2mgEmT/yJyiZg0cq', 0, 0, 0, 0, 0, 1, '2017-08-11 11:21:38', '2017-08-11 11:21:38', '2017-12-11 13:28:25'),
(2, 'doktorlar@gmail.com', '12345678910', '$2a$08$YN0Y6H6J2NSnfwp2m5Q4vOzMIsf8d99gFpDMAu02L6rqVFslfm..6', 0, 0, 0, 0, 0, 1, '2017-10-03 19:48:28', '2017-10-03 19:48:28', '2017-12-01 17:57:20');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_kurucu_mesaji`
--

DROP TABLE IF EXISTS `general_kurucu_mesaji`;
CREATE TABLE IF NOT EXISTS `general_kurucu_mesaji` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_kurucu_mesaji`
--

INSERT INTO `general_kurucu_mesaji` (`No`, `tr_Baslik`, `en_Baslik`, `tr_Yazi`, `en_Yazi`, `ListOrder`) VALUES
(1, 'Dr. Sultan Batur\'un Mesajı', 'Message From Dr. Sultan Batur', '<h3>Değerli Anneler ve Babalar!</h3>\n  <strong>AEK Ankara Eğitim Kurumları</strong> olarak her çocuğun eşsiz özellik ve yeteneklerle donatıldığına inanıyoruz. Eğitimde önemli olan bu özellikleri keşfetmek ve geliştirmektir. Çocukların sahip olduğu üstün özelliklerin keşfedilmesi; çocuğun kendini gerçekleştirmesini sağlar. Bunun da sistemli ve planlı çalışma ile mümkün olacağının farkındayız.\n  <br>\n  <br>\n  <strong>Amaçlarımız</strong>\n  <ul>\n    <li>Ülkemizdeki ve dünyadaki gelişmeleri yakından takip ederek, yenilikleri eğitim ve öğretim hayatına yansıtmak,</li>\n    <li>Çocukların öğrenme ve gelişme hızına göre eğitim programını şekillendirmek,</li>\n    <li>Çocukların sahip oldukları beceri ve ilgi alanlarını en üst düzeyde geliştirmek,</li>\n    <li>Çocukların sahip oldukları özgüveni tetikleyerek, yaratıcılık ve liderlik dürtülerinin önündeki engelleri kaldırmaktır.</li>\n  </ul>\n  Bunlarla birlikte eğitimin olmazsa olmazı, çocuklarımıza vereceğimiz koşulsuz sevgi ve onlara karşı duyacağımız güvendir. Sevgi ve güven ile donatılmış bir eğitim, çocuklarımızın başarı ve mutluluk dolu bir hayat yaşamalarını sağlayacaktır. Bu prensiplerden yola çıkan bizler,<strong>AEK Ankara Eğitim Kurumları</strong> çatısı altında mutlu, özgüvenli, sağlıklı ve başarılı çocuklar görmenin haklı gururunu yaşamaktayız. Bu güvenle diyoruz ki: “Ankara Eğitim Kurumları\'nın her öğrencisi, üstün yeteneklerle donatılmış mutlu bir bireydir.”\n  <br>\n  <br>\n  Değişimin ve ilerlemenin sınırı olmadığını bilen <strong>AEK Ankara Eğitim Kurumları</strong> yapacağı çalışmalarla öğrencilerine daha iyiyi ve daha güzeli sunmaya devam edecektir. Çocuklarımızın geleceğini bugünden garantiye alalım. Çünkü onlar, aldıkları eğitimin izlerini yaşam boyu taşıyacaklar.', '<h3>Dear Parents!</h3>   As <strong>AEK Ankara Eğitim Kurumları</strong>, we believe that each child possesses unique characteristics and skills. What is important in education is to discover and improve these characteristics. Discovering these unique characteristics of each child enables them to realize themselves. We are aware of the fact that this can only happen through a systematic and planned study.   <br>   <br>   <strong>Our Objectives are;</strong>   <ul>     <li>Reflecting innovations on education and training by closely following the latest developments in our country and the world,</li>     <li>Shaping our education program based on children’s learning and development rate,</li>     <li>Improving the skills and areas of interest of our children to the maximum,</li>     <li>Eliminating the barriers preventing our children’s urge of leadership by stimulating their confidence.</li>   </ul>   Eliminating the barriers preventing our children’s urge of leadership by stimulating their confidence. <strong>AEK Ankara Eğitim Kurumları</strong> properly takes pride in seeing happy, confident, healthy, and successful students under our roof. Therefore, it is safe to say that ”Each student of AEK Ankara Eğitim Kurumları is an individual adorned with superior abilities”. Recognizing that there is no limit to change or improvement, AEK Ankara Eğitim Kurumları will continue to offer the best to its students through its operations.  Let us guarantee our children’s future now. Because, they will bear the traces of the education they have received for the rest of their lives.', 1),
(2, 'Dr. Feride KİBAROĞLU\'nun Mesajı', 'Message From Dr. Feride Kibaroğlu', '<ul>\n    <strong>\n    <li>FARKLI DÜŞÜN!</li>\n    <li>FARKLI OL!</li>\n    <li>FARKLILIK OLUŞTUR!</li>\n    </strong>\n  </ul>\n  Bu üç cümle hayat başarımızın anahtarıdır. Farkındalık, görünenin ve herkesin gördüğünün ötesine geçmektir. Bilim adamları; başarılı insanları incelediklerinde, onların farkındalıklarının yüksek olduğunu, fırsatları değerlendirip yakaladıklarını ortaya koydular. Sizler de başarılı olduğunuz konularda farkındalığınızın yüksek olduğunu ve fırsatları iyi bir biçimde değerlendirdiğinizi fark etmişsinizdir. Bizler bu felsefemizle çocuklarımızda farkındalık oluşturmayı hedefliyoruz. Çocuklarımız, ister doktor, ister mühendis, ister pazarcı, ister müzisyen, isterse öğretmen olsunlar ama hepsinin farkında olsunlar.\n  <br>\n  <br>\n  Üniversitede bir hocamız bize: “Doktor çok, üniversite bitiren çok ama bazıları başarılı çünkü onlar farkındalıkları yüksek, fırsatları gören, yakalayan ve değerlendiren insanlar.” demişti. Farkındalığım geliştikçe sevgili hocamın ne demek istediğini daha iyi anlıyorum. Şimdi çocuklarımıza bu eğitimi verme zamanı.\n  <br>\n  <br>\n  <strong>FARKLILIKLARI FARK ETMENİZ DİLEĞİYLE..</strong>', '<ul> <strong> <li>THINK DIFFERENT!</li> <li>BE DIFFERENT!</li> <li>CREATE DIFFERENCE!</li> </strong> </ul> These three sentences are the key to success of our lives.  Awareness is being beyond what is seen and what everybody sees. After examining successful people, scientists suggest that their awareness is quite high and that they make use of opportunities. I believe you recognize that your awareness is high in the subjects, at which you are successful and in which you make use of opportunities. We aim at raising awareness in our children with our philosophy. No matter what profession our children choose, whether they become doctors, engineers, musicians, ballet,danceis business managers, or teachers; what is important is whether they are aware of what they are. <br> <br> One of our professors at medical college once told us ”There are a lot of doctors and people graduated from university; but only a very few of them are successful, because their awareness is high, they are the people who recognize and make use of opportunities.” The more awareness I have, the better I understand what my beloved teacher meant. Now is the time to educate our children in this way. <br> <br> <strong>I WISH YOU ALL RECOGNIZE THE DIFFERENCES…</strong>', 2);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_navbar`
--

DROP TABLE IF EXISTS `general_navbar`;
CREATE TABLE IF NOT EXISTS `general_navbar` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `IsLink` int(11) NOT NULL DEFAULT '1',
  `IsLinkInBaseurl` int(11) NOT NULL DEFAULT '1',
  `Link` text COLLATE utf8_turkish_ci NOT NULL,
  `Level` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `MainSectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `SubSectionID` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_navbar`
--

INSERT INTO `general_navbar` (`No`, `tr_Ad`, `en_Ad`, `IsLink`, `IsLinkInBaseurl`, `Link`, `Level`, `MainSectionID`, `SubSectionID`, `ListOrder`) VALUES
(1, 'Anasayfa', 'Home', 1, 1, '', 'Main', '', '', 1),
(2, 'Kurumsal', '', 0, 1, '', 'Main', 'kurumsal', '', 2),
(3, 'Eğitim Sistemimiz', '', 1, 1, 'Egitim-Sistemimiz', 'Main', '', '', 3),
(4, 'Neden AEK', '', 1, 1, 'Neden-AEK', 'Main', '', '', 4),
(5, 'Hakkımızda', 'About Us', 1, 1, 'Hakkimizda', 'Sub', 'kurumsal', '', 10),
(6, 'Birimler', '', 0, 1, '', 'Sub', 'kurumsal', 'birimler', 14),
(7, 'Lojistik Hizmetler', '', 1, 1, 'Lojistik-Hizmetler', 'SubSub', 'birimler', '', 19),
(8, 'Kurumlar', '', 0, 1, '', 'Main', 'kurumlar', '', 5),
(9, 'Veli/Öğrenci', '', 0, 1, '', 'Main', 'veli-ogrenci', '', 6),
(10, 'İnsan Kaynakları', '', 1, 1, '#', 'Main', '', '', 7),
(12, 'Portal', '', 1, 1, 'Portal', 'Main', '', '', 8),
(13, 'İletişim', '', 1, 1, 'Iletisim', 'Main', '', '', 9),
(14, 'Yönetim Kurulu', 'Administrative Staff', 1, 1, 'Yonetim-Kurulu', 'Sub', 'kurumsal', '', 11),
(15, 'Kurucu Mesajı', 'Founder’s Message', 1, 1, 'Kurucu-Mesaji', 'Sub', 'kurumsal', '', 12),
(16, 'Kadro', '', 1, 1, 'Kadro', 'Sub', 'kurumsal', '', 13),
(17, 'Anaokulu', 'Kindergarten', 1, 1, '#', 'Sub', 'kurumlar', '', 15),
(18, 'İlkokul', 'Primary School', 1, 1, '#', 'Sub', 'kurumlar', '', 16),
(19, 'Ortaokul', 'Middle School', 1, 1, '#', 'Sub', 'kurumlar', '', 17),
(20, 'Anadolu Lisesi', 'Anatolian High School', 1, 1, '#', 'Sub', 'kurumlar', '', 18),
(21, 'K12 Öğrenci Takip Sistemi', '', 1, 0, 'http://ankaraegitimkurumlari.k12net.com/', 'Sub', 'veli-ogrenci', '', 21),
(22, 'Sınav Başvurusu', '', 1, 1, 'Sinav-Basvurusu', 'Sub', 'veli-ogrenci', '', 22),
(23, 'İdari Birimler', '', 1, 1, 'Idari-Birimler', 'SubSub', 'birimler', '', 20);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_neden_aek`
--

DROP TABLE IF EXISTS `general_neden_aek`;
CREATE TABLE IF NOT EXISTS `general_neden_aek` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `tr_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `en_Baslik` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Yazi` text COLLATE utf8_turkish_ci NOT NULL,
  `ListOrder` int(11) NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_neden_aek`
--

INSERT INTO `general_neden_aek` (`No`, `tr_Baslik`, `en_Baslik`, `tr_Yazi`, `en_Yazi`, `ListOrder`) VALUES
(1, 'Eğitimde 24 Yıllık Tecrübe', '24 Years of Experience in Education', 'Yazı Gelecek', '', 1),
(2, 'Beyin Temelli Öğrenme Modeli', 'Full And Permanent Learning', 'Yazı Gelecek', '', 2),
(3, 'Okul + Dershane + Bireysel Dersler', 'School + Courses + Individual Lessons', 'Yazı Gelecek', '', 3),
(4, 'Tecrübeli Yenilikçi Kadro', 'Innovative Experienced Staff', 'AEK Ankara Eğitim Kurumları olarak kaliteli eğitim ve öğretimin güçlü bir kadroyla gerçekleşeceğini biliyoruz. Bu nedenle okulumuzun misyon ve vizyonuna katkıda bulunacak, çocuk sevgisini yüreğinde taşıyan, konusunda uzman, mesleğini seven, başarılı, özverili, yenilikçi, iletişim becerileri yüksek, disiplinli, çalışma alışkanlığı edinmiş, eğitim ve öğretim kadrosuna sahibiz.', 'AEK Ankara Eğitim Kurumları recognize that a qualified education can only be ensured through a strong staff. Therefore, we choose to work with educators, who contribute to our mission & vision, has love for children in their hearts, are experts in their fields, love their profession, have good communication skills and habit of properly working, and are innovative, disciplined, and devoted.', 4),
(5, 'Güvenli Okul', 'Safe School', '<ul>\n	<li>Öğrencimizin okula gelişinden ailesine teslim edilene kadar geçen süreçte güvenliğinin sağlanması, bizim için önemlidir. Nöbet sistemi ve güvenlik kameraları, öğrencilerin her alanda takip edilmelerini sağlar.</li>\n	<li>Çocuğun okula gelmemesi durumunda özel tespit sistemimizle anında aileye bilgi aktarılır.</li>\n	<li>Çocuğun okula giriş ve okuldan çıkışlarında okul dışı ekstra uyaranlar kontrol edilir ve aileye anında bilgi verilir.</li>\n	<li>Çocuklarımızın kullandıkları eğitim materyallerinin herhangi bir güvenlik açığı doğurmaması için düzenli bir şekilde kontrol ve denetimleri yapılır.</li>\n	<li>Okulumuz yerleşke olarak manyetik alandan uzak (alıcı-verici, istasyon, trafo, elektrik direkleri vs.) bir yerleşkeye sahiptir.</li>\n	<li>Güvenlik görevlilerince okuldaki tüm giriş ve çıkışlar kontrol altında tutulmaktadır.</li>\n	<li>Okulumuz yerleşke olarak merkezi bir yer olmasına rağmen insan kalabalığının yoğun olduğu ve olumsuzlukların yaşanabileceği mekanlardan ve modellerden uzak ve nezih bir yerdedir.</li>\n</ul>', '<ul> 	<li>It is of high importance for us to ensure that our students are safe from the time they arrive at  school until they are delivered to their parents. Monitoring and security cameras enables the school to monitor the students in all areas.</li> 	<li>In case a student does not come to the school; his/her parents are immediately informed through our  special detection system.</li> 	<li>Extra stimulators, which are outside the school, are checked while students come to and leave the  school; and families are immediately informed.</li> 	<li>The educational materials used by our students are audited on a regular basis in order to prevent any  security flaws.</li> 	<li>Our school campus is far from magnetic fields such as receiver, transmitter, transformer, electric poles etc.</li> 	<li>Our security guards keeps students under control while they come to and leave the school.</li> 	<li>Our school campus has a central location, yet is far from crowded places, where negative events  and models could be experienced.</li> </ul>', 5),
(6, 'Temiz Okul', 'Clean School', 'Hijyen ve temizlik bizim için çok önemlidir. Özellikle öğrencilerimizin kullandığı ortak alanlar: tuvaletler, sınıflar, koridorlar, kullandıkları eğitim materyalleri, özel dezenfekten ve uluslararası sağlık kriterlerine uygun (nontoksik, non allerjik) maddelerle temizlenmektedir. Çalışanlarımıza ve öğrencilerimize periyodik olarak hijyen konusunda çeşitli eğitimler ve seminerler de verilmektedir.', 'Hygiene and sanitation are quite important for us. The common use areas used by our students such as restrooms, classrooms, hallways, and educational materials are cleared with special disinfectant agents and materials, which are pertinent to international health criteria (non-toxic, non-allergic). Our personnel and students are periodically provided with various seminars and trainings on hygiene.', 6),
(7, 'Fiziksel Özelliklerimiz', 'Physical Property', '<ul>\n	<li>Kampüsümüz 6.500 Metrekareye Yakın Kapalı, 3.500 Metrekare Açık Alan Olmak Üzere 10.00 Metrekarelik Kullanım Alanına,</li>\n	<li>Geniş Ve Ferah Mekanlara,</li>\n	<li>Aydınlık, Yüksek Tavanlı, Havadar Sınıflara,</li>\n	<li>Öğrenciler İçin Dinlenme Mekanlarına,</li>\n	<li>İç Mekanlarda Geniş Koridorlara,</li>\n	<li>Eğlence, Sportif ve Eğitsel Amaçlı Özel Alanlara,</li>\n	<li>Müzik Atolyelerine,</li>\n	<li>400 Kişilik Tam Akustik Konferans Salonuna,</li>\n	<li>Sinema Ve Gösteri Merkezine,</li>\n	<li>Açık Ve Kapalı Spor Salonlarına,</li>\n	<li>İç Mekan Oyun Salonlarına,</li>\n	<li>3D Eğitim Sınıfına,</li>\n	<li>Kütüphane Bilgi Erişim Merkezlerine,</li>\n	<li>Sağlık Merkezine ve Revire,</li>\n	<li>Organik Kantine,</li>\n	<li>Ekolojik Alanlara,</li>\n	<li>Sanat Atölyesine,</li>\n	<li>Dans Salonlarına,</li>\n	<li>Satranç Sınıfına,</li>\n	<li>Beyin Fırtınası Atolyesine,</li>\n	<li>Geniş Ve Ferah Yemekhanelere Sahiptir.</li>\n</ul>', 'OUR CAMPUS HAS 10,000 SQUARE METERS OF SPACE, 6,500 SQUARE METERS OF WHICH IS INDOOR SPACE, AND 3,500 SQUARE METERS OF WHICH IS OUTDOOR SPACE. <strong>THIS SPACE INCLUDES:</strong> <ul> 	<li>WIDE AND SPACIOUS PLACES,</li> 	<li>LUMINOUS, FRESH CLASSROOMS WITH HIGH CEILINGS,</li> 	<li>RECREATIONAL AREAS FOR STUDENTS,</li> 	<li>WIDE HALLWAYS INDOORS,</li> 	<li>PRIVATE AREAS FOR ENTERTAINMENT, SPORTIVE, AND EDUCATIONAL PURPOSES,</li> 	<li>MUSIC STUDIOS,</li> 	<li>FULL ACOUSTIC CONFERENCE HALL WITH 400 PEOPLE CAPACITY</li> 	<li>CINEMA AND EXHIBITION CENTER,</li> 	<li>INDOOR AND OUTDOOR SPORTS FACILITIES,</li> 	<li>INDOOR GAME ARCADES,</li> 	<li>3D EDUCATION CLASSROOMS,</li> 	<li>LIBRARIES AND INFORMATION RETRIEVAL CENTERS,</li> 	<li>HEALTH CENTER AND INFIRMARY,</li> 	<li>ORGANIC CANTEEN,</li> 	<li>ECOLOGICAL SPACES,</li> 	<li>ART STUDIO,</li> 	<li>DANCE HALLS,</li> 	<li>CHESS ROOM,</li> 	<li>BRAIN-STORMING WORKSHOP,</li> 	<li>WIDE AND SPACIOUS CAFETERIA</li> </ul>', 7),
(8, 'Öğrenci Koçluğu Birimi', 'Student Coaching Unit', '<ul>\n	<li>Öğrencinin Başarılı Sonuçlara Odaklanmasını,</li>\n	<li>Güçlü Sorular Sorarak Çözümleri Öğrencinin Kendisinin Bulmasını,</li>\n	<li>Öğrencinin Hedef Belirlemesini,</li>\n	<li>Öğrencinin Çalışma Planını En Uygun Şekilde Oluşturmasını Ve Hayata Geçirmesini,</li>\n	<li>Öğrencinin Hedefe Ulaşması İçin Bulunduğu Nokta İle Varmak İstediği Nokta Arasındaki Farkı Anlamasını,</li>\n	<li>Öğrencinin Gündelik Hayata Dair Ne Varsa Çözüme Ulaştırmasını,</li>\n	<li>Öğrencinin Aile, Okul Ve Arkadaşlarıyla Kurduğu İletişimin Sağlıklı Olmasını,</li>\n	<li>Öğrencinin İçsel Motivasyonunu Yüksek Tutmasını,</li>\n	<li>Öğrenciyle Paylaştığı Her Konunun Eyleme Geçip Geçmediğinin Kontrolünü Sağlar. Bu Nedenle \"Öğrenci Koçu Çok İyi Bir Yol Arkadaşıdır\".</li>\n</ul>', '<strong>STUDENT COACHING UNIT ENABLES STUDENTS</strong> <ul> 	<li>TO FOCUS ON ACHIEVING SUCCESSFUL RESULTS,</li> 	<li>TO FIND SOLUTIONS BY ASKING QUESTIONS ON THEIR OWN,</li> 	<li>TO SET A TARGET,</li> 	<li>TO CREATE AND PRACTICE THE MOST SUITABLE STUDY PLAN FOR THEMSELVES,</li> 	<li>TO UNDERSTAND THE DISTANCE BETWEEN WHERE THEY ARE AND WHERE THEY WANT TO BE FOR ACHIEVING THEIR TARGET,</li> 	<li>TO SOLVE ANY ISSUE ABOUT THEIR EVERYDAY LIVES,</li> 	<li>TO COMMUNICATE WITH THEIR PARENTS, SCHOOL, AND FRIENDS IN A HEALTHY WAY,</li> 	<li>TO KEEP THEIR INTERNAL MOTIVATION HIGH.</li> 	<li>IT ALSO CHECKS WITH STUDENTS TO DETERMINE WHETHER SUBJECTS SHARED WITH STUDENTS ARE PRACTICED, OR NOT.</li> </ul>', 8),
(9, 'Rehberlik Çalışmaları', 'Counselling Studies', '<strong>Psikolojik Danışma Ve Rehberlik</strong>\n<br>\nPsikolojik Danışma ve Rehberlik birimimiz; her yaş gurubunun özelliği ve ihtiyaçları farklı olduğu için her çocuğun özelliği ve ihtiyaçları da farklıdır ilkesiyle çalışır. Öğrencilerimizin belli yaş dönemlerindeki; sosyal ve çevresel uyum problemlerinde (öğrenci-öğrenci, öğrenci-veli, öğrenci-okul, veli-öğretmen vb.) ve okul içi iletişimde etkilidir.\n<br>\n<br>\nAnaokulu çocuklarındaki her yaş gurubunun özellikleri farklıdır. PDR gün içinde onları izler ölçümlerle değerlendirir, gerekli birimler ve aile ile işbirliği yapar.\n<br>\n<br>\nİlkokul öğrencilerinin ruhsal ve sosyal yönden ihtiyaç duyduğu her durumda yanındadır. Öğrencileri inceler, izler, gerekli testleri yaparak öğrenciye ve aileye destek verir.\n<br>\n<br>\nOrtaokul gençliğe geçiş dönemidir. Bu dönem özeldir ve özel ilgi gerektirir. Bu dönemde öğrencilerin bedensel ve ruhsal gelişimlerinde desteğe ihtiyaçları vardır. Bu destek öğrencileri duygusal ve sosyal bakımdan rahatlatarak onların sağlıklı büyümelerini sağlar.\n<br>\n<br>\nLise olgunluğa geçiş sürecidir ve bocalamaların en çok yaşandığı dönemdir. Rehberlik birimi bu dönemde de aileyle işbirliği yaparak öğrencilerin duygusal ve sosyal olgunluk kazanmasını destekler.\n<br>\n<br>\n<strong>PDR Sorun Çözme Gruplarımız</strong>\n<ul>\n	<li>Aile İletişim Grubu</li>\n	<li>Zamanı Değerlendirme Grubu</li>\n	<li>Başarılı Ders Çalışma Grubu</li>\n	<li>Etkili İletişim Grubu</li>\n	<li>Duygu Öfke Kontrol Grubu</li>\n	<li>Sınav Kaygı Grubu</li>\n</ul>\n<br>\n<strong>PDR Biriminin Çalışma Sistematiği</strong>\n<ul>\n	<li>Bireysel Görüşme Yapılır. İlk Aşamadır, Öğrenciyi Birebir Tanımak Amaçlanır. Bunun İçin Öğrenciye Birçok Test Uygulanır.</li>\n	<li>Öğrenci Düzenli Görüşme Takvimine Alınır.</li>\n	<li>Aile Ve Rehberlik İşbirliği Sağlanır.</li>\n	<li>Öğrenci İzleme Programına Alınır.</li>\n	<li>Grup Çalışmaları Yapılır. Gerekli Durumlarda Aynı Sorunları Yaşayan Öğrenciler Grup Çalışmasına Alınır.</li>\n	<li>Bu Çalışmalarda Öğrenci Aynı Veya Benzer Sorunu Yaşayan Öğrencilerle Birliktedir.</li>\n</ul>', '<strong>PSYCHOLOGICAL COUNSELING AND GUIDANCE</strong> <br> Our Psychological Counseling and Guidance unit works with the principle that each age group has different features and requirements thus each children has different features and requirements. Psychological counseling is effective in communication in school and social & environmental adaptation problems they experience during certain phases (student-student, student-teacher, student-school, parents-teacher etc.). Each age group in Preschool children possesses different features. PCG monitors preschool children throughout the day, evaluates them; and the related units cooperate with their parents. PCG is there whenever Elementary School students are in a mental or social need. It monitors, examines the students and supports them and their families by running necessary tests. Middle School is the transition from childhood into adolescence. This phase is special and requires special care. Students need support for their physical and mental development during this phase. Providing students with that support enables them to grow up in a healthy manner by emotionally and socially comforting them. High School is the transition process from adolescence into maturity, during which students experience the most frequent confusion. PCG Unit cooperates with the family and supports students to obtain emotional and social maturity during this phase. <br> <br> <strong>PCG PROBLEM SOLVING GROUPS</strong> <ul> 	<li>FAMILY COMMUNICATION GROUP</li> 	<li>TIME VALUATION GROUP</li> 	<li>EFFECTIVE STUDY GROUP</li> 	<li>EFFECTIVE COMMUNICATION GROUP</li> 	<li>EMOTIONAL ANGER CONTROL GROUP</li> 	<li>EXAM ANXIETY GROUP etc.</li> </ul> <br> <strong>OPERATION SYSTEM OF PCG UNIT</strong> <ul> 	<li>INDIVIDUAL INTERVIEWS ARE OFFERED. IN THE FIRST STAGE, IT IS AIMED TO PERSONALLY GET TO KNOW EACH STUDENT. THEREFORE, MANY TESTS ARE APPLIED ON STUDENTS.</li> 	<li>STUDENTS ARE INTERVIEWED ON A REGULAR BASIS. </li> 	<li>PARENTS AND PCG COOPERATES.</li> 	<li>MONITORING PROGRAM IS IMPLEMENTED ON STUDENTS.</li> 	<li>GROUP WORKS ARE CONDUCTED. THE STUDENTS EXPERIENCING SAME PROBLEMS ARE MET IN THE GROUP WORKS, WHEN NECESSARY.</li> 	<li>IN SUCH GROUP WORKS, THE STUDENTS EXPERIENCING SAME OR SIMILAR PROBLEMS ARE PUT TOGETHER</li> </ul>', 9);

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_ogrenci_bilgileri`
--

DROP TABLE IF EXISTS `general_ogrenci_bilgileri`;
CREATE TABLE IF NOT EXISTS `general_ogrenci_bilgileri` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `OkulNo` int(11) NOT NULL,
  `Ad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Soyad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Cinsiyet` varchar(1) COLLATE utf8_turkish_ci NOT NULL,
  `DogumTarihi` varchar(15) COLLATE utf8_turkish_ci NOT NULL,
  `TCNo` int(11) NOT NULL,
  `Sinif` int(11) NOT NULL,
  `Sube` varchar(65) COLLATE utf8_turkish_ci NOT NULL,
  `GeldigiOkul` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Semt` varchar(65) COLLATE utf8_turkish_ci NOT NULL,
  `Adres` text COLLATE utf8_turkish_ci NOT NULL,
  `EvTel` int(11) NOT NULL,
  `AnneAdSoyad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `AnneTel` int(11) NOT NULL,
  `AnneMeslek` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `AnneIs` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `AnneIsTel` int(11) NOT NULL,
  `AnneIsAdres` text COLLATE utf8_turkish_ci NOT NULL,
  `AnneMail` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `BabaAdSoyad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `BabaTel` int(11) NOT NULL,
  `BabaMeslek` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `BabaIs` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `BabaIsTel` int(11) NOT NULL,
  `BabaIsAdres` text COLLATE utf8_turkish_ci NOT NULL,
  `BabaMail` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `GecenYilServis` varchar(1) COLLATE utf8_turkish_ci NOT NULL,
  `Servis` varchar(1) COLLATE utf8_turkish_ci NOT NULL,
  `HatNo` int(2) NOT NULL,
  `KaydiKesinDegil` varchar(1) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`),
  UNIQUE KEY `OkulNo` (`OkulNo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_popup`
--

DROP TABLE IF EXISTS `general_popup`;
CREATE TABLE IF NOT EXISTS `general_popup` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `BasSaat` time NOT NULL,
  `BitSaat` time NOT NULL,
  `Resim` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_popup`
--

INSERT INTO `general_popup` (`No`, `BasSaat`, `BitSaat`, `Resim`) VALUES
(5, '20:00:00', '22:30:00', 'Placeholder/250x250.png'),
(12, '19:00:00', '13:30:00', 'Placeholder/270x190.png');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_sinavbasvurusu`
--

DROP TABLE IF EXISTS `general_sinavbasvurusu`;
CREATE TABLE IF NOT EXISTS `general_sinavbasvurusu` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `AdSoyad` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Cinsiyet` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `SinavTarihi` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `DogumTarihi` date NOT NULL,
  `DogumYeri` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `OOSinif` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `OOOkul` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Bolum` varchar(255) COLLATE utf8_turkish_ci NOT NULL DEFAULT 'Yok',
  `AnneAd` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `AnneTel` int(11) NOT NULL,
  `AnneEmail` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `BabaAd` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `BabaTel` int(11) NOT NULL,
  `BabaEmail` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Adres` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tc` varchar(11) COLLATE utf8_turkish_ci NOT NULL,
  `Aciklama` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_sinavbasvurusu`
--

INSERT INTO `general_sinavbasvurusu` (`No`, `AdSoyad`, `Cinsiyet`, `SinavTarihi`, `DogumTarihi`, `DogumYeri`, `OOSinif`, `OOOkul`, `Bolum`, `AnneAd`, `AnneTel`, `AnneEmail`, `BabaAd`, `BabaTel`, `BabaEmail`, `Adres`, `Tc`, `Aciklama`) VALUES
(7, 'Doğucan Şaşıoğlu', 'E', '1-2017-12-21', '2017-12-17', 'asdadgs', '1-1', 'asdgasdg', '', 'asdgasdg', 124124124, 'deneme@mail.com', 'hshdffdssd', 2147483647, 'deneme@mail.com', 'adasdf', '12345678909', 'asdgsadg'),
(8, '234', 'E', '2-2017-12-25', '2017-12-10', 'asdfasdf', '1-2', 'agasgdasdgagsd', '', 'asdgasdg', 5235235, 'deneme@mail.com', 'jhsdjhsfdgsdfh', 5235235, 'deneme@mail.com', 'gaasgdagsd', '01234567891', 'asdgasdg');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_sinav_takvimi`
--

DROP TABLE IF EXISTS `general_sinav_takvimi`;
CREATE TABLE IF NOT EXISTS `general_sinav_takvimi` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `Ders` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `tr_Aciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `en_Aciklama` text COLLATE utf8_turkish_ci NOT NULL,
  `Sube` text COLLATE utf8_turkish_ci NOT NULL,
  `Okul` text COLLATE utf8_turkish_ci NOT NULL,
  `Yil` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tarih` date NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=3382 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci ROW_FORMAT=COMPACT;

--
-- Tablo döküm verisi `general_sinav_takvimi`
--

INSERT INTO `general_sinav_takvimi` (`No`, `Ders`, `tr_Aciklama`, `en_Aciklama`, `Sube`, `Okul`, `Yil`, `Tarih`) VALUES
(1564, '', 'IFY Aylık İlerleme Testi - 1. dönem 1. test', 'IFY Monthly Progress Test', '4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2017-11-03'),
(1565, '', 'IFY Aylık İlerleme Testi - 1. dönem 2. test', 'IFY Monthly Progress Test', '4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2017-12-20'),
(1566, '', 'IFY Aylık İlerleme Testi. 1. dönem 3. test', 'IFY Monthly Progress Test', '4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2018-01-03'),
(2495, 'deneme', 'TEOG Hazırlık Sınavı-1', 'TEOG Preparation Exam-1', '8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-01-20'),
(2496, 'deneme', 'LYS Hazırlık Sınavı-1', 'LYS Preparation Exam-1', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-20'),
(2497, 'deneme', 'TEOG Hazırlık Sınavı-1', 'TEOG Preparation Exam-2', '8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-01-21'),
(2498, 'deneme', 'LYS Hazırlık Sınavı-2', 'LYS Preparation Exam-2', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-21'),
(2499, 'deneme', 'TEOG Hazırlık Sınavı-1', 'TEOG Preparation Exam-3', '8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-01-22'),
(2500, 'deneme', 'LYS Hazırlık Sınavı-3', 'LYS Preparation Exam-3', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-22'),
(2501, 'deneme', 'TEOG Hazırlık Sınavı-1', 'TEOG Preparation Exam-4', '8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-01-23'),
(2502, 'deneme', 'LYS Hazırlık Sınavı-4', 'LYS Preparation Exam-4', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-23'),
(2503, 'deneme', 'TEOG Hazırlık Sınavı-1', 'TEOG Preparation Exam-5', '8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-01-24'),
(2504, 'deneme', 'LYS Hazırlık Sınavı-5', 'LYS Preparation Exam-5', '12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-24'),
(2610, 'deneme', '2. Dönem 4. Sınav', 'Semester 2, Exam 4', '6-A,7-A,7-B,8-A', '2', '2017-2018', '2018-05-22'),
(2824, 'deneme', 'Ortaokul Hazır Bulunuşluk Sınavı', 'Readiness Examination of Secondary School', '6-A,7-A,7-B,5-A,5-B,5-C,6-B,6-C,6-D', '2', '2017-2018', '2017-09-18'),
(2825, 'deneme', 'İlkokul Hazır Bulunuşluk Sınavı', 'Readiness Examination of Primary School', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2017-09-19'),
(2826, 'deneme', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C', '2', '2017-2018', '2017-10-18'),
(2827, 'matematik', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2017-10-19'),
(2828, 'turkce', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2017-10-20'),
(2829, 'fen-bilimleri', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2017-10-23'),
(2830, 'matematik', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2017-10-24'),
(2831, 'turkce', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2017-10-25'),
(2832, 'sosyal-bilgiler', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2017-10-26'),
(2835, 'ingilizce', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2017-11-01'),
(2836, 'matematik', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2017-11-06'),
(2842, 'sosyal-bilgiler', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2017-11-09'),
(2843, 'fizik', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2017-11-13'),
(2847, 'tarih', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2017-11-15'),
(2848, 'kimya', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2017-11-17'),
(2851, 'turkce', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C', '2', '2017-2018', '2017-11-22'),
(2852, 'turkce', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2017-11-30'),
(2853, 'matematik', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2017-12-01'),
(2854, 'fen-bilimleri', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C', '2', '2017-2018', '2017-12-04'),
(2855, 'matematik', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2017-12-05'),
(2858, 'deneme', '1. Dönem 3. Sınav', 'Semester 1, Exam 3', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2017-12-17'),
(2865, 'din-kulturu-ve-ahlak-bilgisi', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2017-12-28'),
(2869, 'matematik', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-03'),
(2870, 'turkce', '1. Dönem 3. Sınav', 'Semester 1, Exam 3', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-01-04'),
(2874, 'geometri', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-05'),
(2875, 'biyoloji', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-08'),
(2876, 'matematik', '1. Dönem 3. Sınav', 'Semester 1, Exam 3', '8-B,8-C,8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A', '2', '2017-2018', '2018-01-09'),
(2879, 'turk-dili-ve-edebiyati', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-10'),
(2880, 'kimya', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-12'),
(2881, 'deneme', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-01-20'),
(2882, 'deneme', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C', '2', '2017-2018', '2018-02-23'),
(2883, 'turkce', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-03-05'),
(2884, 'matematik', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-03-06'),
(2885, 'fen-bilimleri', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C', '2', '2017-2018', '2018-03-12'),
(2886, 'matematik', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C', '2', '2017-2018', '2018-03-13'),
(2887, 'turkce', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '8-B,8-C,8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A', '2', '2017-2018', '2018-03-14'),
(2892, 'din-kulturu', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C', '2', '2017-2018', '2018-03-19'),
(2895, 'sosyal-bilgiler', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-03-21'),
(2896, 'din-kulturu-ve-ahlak-bilgisi', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-03-22'),
(2898, 'deneme', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-03-28'),
(2899, 'ingilizce-uygulama', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-04-04'),
(2900, 'turkce', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-04-10'),
(2903, 'fen-bilimleri', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-04-16'),
(2904, 'matematik', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-04-17'),
(2905, 'ingilizce', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-04-25'),
(2906, 'deneme', '2. Dönem 3. Sınav', 'Semester 2, Exam 3', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-04-26'),
(2907, 'din-kulturu-ve-ahlak-bilgisi', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-05-07'),
(2908, 'fen-bilimleri', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-05-12'),
(2909, 'sosyal-bilgiler', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-05-13'),
(2910, 'din-kulturu', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-05-14'),
(2911, 'turkce', '2. Dönem 3. Sınav', 'Semester 2, Exam 3', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-05-16'),
(2912, 'matematik-uygulama', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-05-20'),
(2913, 'deneme', '2. Dönem 4. Sınav', 'Semester 2, Exam 4', '8-B,8-C,8-D,5-A,5-B,5-C,6-B,6-C,6-D', '2', '2017-2018', '2018-05-22'),
(2916, 'matematik', '2. Dönem 3. Sınav', 'Semester 2, Exam 3', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-05-24'),
(2917, 'fen-bilimleri', '2. Dönem 3. Sınav', 'Semester 2, Exam 3', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-05-28'),
(2918, 'matematik', '2. Dönem 3. Sınav', 'Semester 2, Exam 3', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-05-29'),
(2922, 'biyoloji', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '9-AL-A,9-AL-B,9-FL-A,9-FL-B,10-AL-A,10-AL-B,10-FL-A,10-FL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-11-16'),
(2924, 'matematik-uygulama', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '5-A,5-A,5-B,5-B,5-C,5-C,6-B,6-B,6-C,6-C,6-D,6-D,6-A,6-A,7-A,7-A,7-B,7-B,8-A,8-A,8-B,8-B,8-C,8-C,8-D,8-D', '2', '2017-2018', '2017-10-31'),
(2925, 'ingilizce', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,3', '2017-2018', '2017-11-07'),
(2927, 'turk-dili-ve-edebiyati', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2017-11-14'),
(2929, 'matematik-uygulama', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2017-12-12'),
(2931, 'din-kulturu', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '1,2', '2017-2018', '2017-12-26'),
(2932, 'ingilizce-uygulama', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '1,2', '2017-2018', '2017-12-27'),
(2934, 'sosyal-bilgiler', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '2,3', '2017-2018', '2018-01-04'),
(2936, 'ingilizce', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '3', '2017-2018', '2018-01-09'),
(2939, 'trafik-guvenligi', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-03-27'),
(2940, 'turkce', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '1,2', '2017-2018', '2018-04-11'),
(2943, 'deneme', 'Sınav-Sınıf Düzeyi Belirlenmesi', 'Examination-Determination of Grade Level', '2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2017-09-14'),
(2944, 'ingilizce-uygulama', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2017-11-08'),
(2945, 'deneme', '1. Dönem 1. Sınav', 'Semester 1, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2017-11-21'),
(2947, 'trafik-guvenligi', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,3', '2017-2018', '2018-01-02'),
(2949, 'matematik-uygulama', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '1,2', '2017-2018', '2018-03-20'),
(2950, 'ingilizce-uygulama', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '1,2', '2017-2018', '2018-05-23'),
(2951, 'ingilizce', '3. Değerlendirme', 'Assessment Cycle-3', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2018-06-04'),
(2952, 'deneme', '1. Dönem 2. Sınav', 'Semester 1, Exam 2', '6-A,7-A,7-B,8-A,8-D,5-A,5-B,5-C,6-B,6-C,6-D,8-B,8-C', '2', '2017-2018', '2017-11-14'),
(2953, 'ingilizce', '1. Değerlendirme', 'Assessment Cycle-1', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2017-12-20'),
(2954, 'turkce', '1. Dönem 3. Sınav', 'Semester 1, Exam 3', '7-B,8-A,8-B,8-C,8-D,5-A,5-B,5-C,6-B,6-C,6-D,6-A,7-A', '2', '2017-2018', '2018-01-03'),
(2955, 'matematik', '1. Dönem 3. Sınav', 'Semester 1, Exam 3', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '1,2', '2017-2018', '2018-01-05'),
(3175, 'sosyal-bilgiler', '2. Dönem 1. Sınav', 'Semester 2, Exam 1', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-03-15'),
(3176, 'ingilizce', '2. Değerlendirme', 'Assessment Cycle-2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B,5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D,9-FL-A,9-FL-B,9-AL-A,9-AL-B,10-FL-A,10-FL-B,10-AL-A,10-AL-B,11-MF-A,11-MF-B,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2018-03-15'),
(3326, 'turkce', '2. Dönem 3. Sınav', 'Semester 2, Exam 3', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-05-22'),
(3328, 'turkce', '2. Dönem 3. Sınav', 'Semester 2, Exam 3', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C', '1', '2017-2018', '2018-05-22'),
(3347, 'deneme', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '1-A,1-B,1-C,2-A,2-B,2-C,2-D,3-A,3-B,3-C,4-A,4-B', '1', '2017-2018', '2018-05-22'),
(3376, 'deneme', '1. Dönem 4. Sınav', 'Semester 1, Exam 4', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-01-08'),
(3377, 'fen-bilimleri', '1. Dönem 3. Sınav', 'Semester 1, Exam 3', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-01-08'),
(3378, 'sosyal-bilgiler', '2. Dönem 2. Sınav', 'Semester 2, Exam 2', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-05-30'),
(3379, 'ingilizce', '2. Dönem 3. Sınav', 'Semester 2, Exam 3', '5-A,5-B,5-C,6-A,6-B,6-C,6-D,7-A,7-B,8-A,8-B,8-C,8-D', '2', '2017-2018', '2018-05-30'),
(3381, 'cografya', 'agdsgasdg', '', '1-A,2-A,3-B,4-B,5-B,5-C,6-A,6-C,6-D,8-C,9-AL-B,10-FL-B,11-MF-A,11-TM-A,11-TM-B,12-MF-A,12-MF-B,12-TM-A,12-TM-B', '1,2,3', '2017-2018', '2020-01-15');

-- --------------------------------------------------------

--
-- Tablo için tablo yapısı `general_sinav_tarihleri`
--

DROP TABLE IF EXISTS `general_sinav_tarihleri`;
CREATE TABLE IF NOT EXISTS `general_sinav_tarihleri` (
  `No` int(11) NOT NULL AUTO_INCREMENT,
  `Sinif` varchar(255) COLLATE utf8_turkish_ci NOT NULL,
  `Tarih` date NOT NULL,
  PRIMARY KEY (`No`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_turkish_ci;

--
-- Tablo döküm verisi `general_sinav_tarihleri`
--

INSERT INTO `general_sinav_tarihleri` (`No`, `Sinif`, `Tarih`) VALUES
(14, '1', '2017-12-21'),
(15, '2', '2017-12-25'),
(16, '3', '2017-12-30'),
(17, '9', '2017-12-21'),
(18, '10', '2017-12-20');
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
