<?php

class Sinav_Basvurusu extends CI_Controller {

    public function __construct()
    {
        parent::__construct();

        $this->data = array('success' => false, 'messages' => array(), 'type' => 'add',
            'cacheKeys' => array(

                'GetSinavBasvurusuTR' => md5('GetSinavBasvurusuCacheTR'),
                'GetSinavBasvurusuEN' => md5('GetSinavBasvurusuCacheEN'),
            ),
        );
        $this->load->driver('cache', array('adapter' => 'file', 'backup' => 'file'));

    }

    public function index()
    {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->load->view('Back/Admin/SinavBasvurusu-view');
        } else {
            redirect('Portal');
        }
    }

    public function OutputExcel()
    {
        $columns=array();
        $dataT;
        $data=array();

        $columns=array(
            'No',
            'Tc',
            'Ad Soyad',
            'Cinsiyet',
            'Doğum Tarihi',
            'Anne Ad',
            'Anne Tel',
            'Anne Email',
            'Baba Ad',
            'Baba Tel',
            'Baba Email',
            'Okumakta Olduğu Okul',
            'Okumakta Olduğu Sınıf',
            'Bölum',
            'Sınav Tarihi'
        );

        $dataT = $this->General_Model->GetSinavBasvurusuToArray();
        foreach ($dataT as $key => $value) {
            $curOOSinif = explode("-",$value['OOSinif']);
            $curOOSinif = $curOOSinif[1];
            $curSinavTarihiT = explode("-",$value['SinavTarihi']);
            $curSinavTarihi = $curSinavTarihiT[3].'-'.$curSinavTarihiT[2].'-'.$curSinavTarihiT[1];

            $data[]=array(
                $value['No'],
                $value['Tc'],
                $value['AdSoyad'],
                $value['Cinsiyet'],
                $value['DogumTarihi'],
                $value['AnneAd'],
                $value['AnneTel'],
                $value['AnneEmail'],
                $value['BabaAd'],
                $value['BabaTel'],
                $value['BabaEmail'],
                $value['OOOkul'],
                $curOOSinif,
                $value['Bolum'],
                $curSinavTarihi
            );
        }

        exportExcel('Sınav Başvuruları',$columns,$data);
    }

    public function UpdateSinavBasvurusu(){
        if(! $this->input->is_ajax_request()) {
            redirect('404');
        } else {
            if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
                $en = $_POST["English"];
                if ($en == "true") {
                    $this->config->set_item('language', FORM_LANGUAGES['Ingilizce']);
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tc', "", 'required|trim|numeric|exact_length[11]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('Cinsiyet', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('AnneAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('AnneTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('AnneEmail', "", 'required|trim|valid_email|strip_tags|xss_clean');
                    $this->form_validation->set_rules('BabaAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('BabaTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('BabaEmail', "", 'required|trim|valid_email|strip_tags|xss_clean');
                    $this->form_validation->set_rules('OOOkul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('OOSinif', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('Bolum', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('SinavTarihi', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                } else {
                    $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('Tc', "", 'required|trim|numeric|exact_length[11]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('AdSoyad', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('Cinsiyet', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('AnneAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('AnneTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('AnneEmail', "", 'required|trim|valid_email|strip_tags|xss_clean');
                    $this->form_validation->set_rules('BabaAd', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('BabaTel', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
                    $this->form_validation->set_rules('BabaEmail', "", 'required|trim|valid_email|strip_tags|xss_clean');
                    $this->form_validation->set_rules('OOOkul', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('OOSinif', "", 'required|trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('Bolum', "", 'trim|max_length[255]|strip_tags|xss_clean'); 
                    $this->form_validation->set_rules('SinavTarihi', "", 'required|trim|max_length[255]|strip_tags|xss_clean');
                }
                
                if ($this->form_validation->run()) {
                    $this->data['type'] = 'update';
                    $result = $this->General_Model->UpdateSinavBasvurusu();
                    if ($result) {
                        $cacheKeys = array('SinavBasvurusu');
                        for ($i=0; $i < sizeof($cacheKeys); $i++) { 
                            $cacheKeyTR = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'TR'];
                            $cacheKeyEN = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'EN'];

                            $gotCacheTR = $this->cache->get($cacheKeyTR);
                            $gotCacheEN = $this->cache->get($cacheKeyEN);

                            if ($gotCacheTR) {
                                $this->cache->delete($cacheKeyTR);
                            }
                            if ($gotCacheEN) {
                                $this->cache->delete($cacheKeyEN);
                            }
                        }
                        $this->data['data'] = $this->General_Model->EditSinavBasvurusu();

                        $this->load->library('encrypt');
                        $this->load->library('email'); // Note: no $config param needed
                        $Sinif = explode("-", $this->data['data']->OOSinif);
                        $Sinif = $Sinif[1];
                        $Cinsiyet = $this->data['data']->Cinsiyet;
                        if ($Cinsiyet == "E") {
                            $Cinsiyet = "Erkek";
                        } else {
                            $Cinsiyet = "Kız";
                        }
                        $messageB = "<i>".TarihToTr($this->data['data']->TarihBasvuru)."</i> tarihinde yapmış olduğunuz sınav başvurusu kabul edilmiş olup, talebiniz doğrultusunda <i>".TarihToTr($this->data['data']->TarihDuzeltme)."</i> tarihinde başvurarak yaptırdığınız düzeltmeler kayıtlarımıza işlenmiştir.<br><br>".
                        "Sınav saatleri sınav başvuru sayısına göre düzenlenecek olup sınavdan 3 gün önce resmi web sitemizde duyurulacak sizlere bilgilendirme mesajı gönderilecektir.<br><br>
                        Sınav saatlerinde velilerimiz mutlaka konferans salonunda veli bilgilendirme toplantısına katılacaklardır. <br>
                        <br><br>
                        Sınava Girecek Öğrencinin;<br><br>
                        TC Kimlik No: <i>".$this->data['data']->Tc."</i><br><br>
                        Adı Soyadı: <i>".$this->data['data']->AdSoyad."</i><br><br>
                        Doğum Tarihi: <i>".TarihToTr($this->data['data']->DogumTarihi)."</i><br><br>
                        Cinsiyeti: <i>".$Cinsiyet."</i><br><br>
                        Anne Adı Soyadı: <i>".$this->data['data']->AnneAd."</i><br><br>
                        Anne Cep Telefonu: <i>".$this->data['data']->AnneTel."</i><br><br>
                        Anne E-posta: <i>".$this->data['data']->AnneEmail."</i><br><br>
                        Baba Adı Soyadı: <i>".$this->data['data']->BabaAd."</i><br><br>
                        Baba Cep Telefonu: <i>".$this->data['data']->BabaTel."</i><br><br>
                        Baba E-posta: <i>".$this->data['data']->BabaEmail."</i><br><br>
                        Okumakta Olduğu Okul: <i>".$this->data['data']->OOOkul."</i><br><br>
                        Okumakta Olduğu Sınıf: <i>".$Sinif."</i><br><br>
                        <br><br>
                        Yukarıdaki kayıtlı bilgilerinizde bir hata varsa lütfen (545) 722 45 15 no'lu telefondan Ebru SAYIN'ı arayarak gerekli düzeltmeleri yaptırınız.<br><br>
                        Başvurunuz için teşekkür ederiz.<br><br>
                        Saygılarımızla<br><br>
                        Özel Ankara Eğitim Kurumları";

                        $mailTo = array('Anne', 'Baba');
                        foreach ($mailTo as $key) {
                            $message = "Sayın ".$this->input->post($key.'Ad')."<br><br>".$messageB;
                            $this->email->from('aek.k12.tr@gmail.com', 'Ankara Eğitim Kurumları');
                            $this->email->to($this->input->post($key.'Email'));
                            $this->email->subject("Sınav Başvurusu | AEK");
                            $this->email->message($message);
                            if ($this->email->send()) {
                                $this->data['success'] = true;
                            } else {
                                $this->data['error'] = $this->email->print_debugger();
                            }
                        }
                    }
                } else {
                    foreach ($_POST as $key => $value) {
                        $this->data['messages'][$key] = form_error($key);
                    }
                }
                echo json_encode($this->data);
            } else {
                redirect('Portal');
            }
        }
    }

public function EditSinavBasvurusu(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
            
            if ($this->form_validation->run()) {
                $this->data['data'] = $this->General_Model->EditSinavBasvurusu();
                if ($this->data['data']) {
                    $this->data['success'] = true;
                }
            }
            echo json_encode($this->data);
        } else {
            redirect('Portal');
        }
    }
}

public function DeleteSinavBasvurusu(){
    if(! $this->input->is_ajax_request()) {
        redirect('404');
    } else {
        if($this->session->userdata('logged_in') && $this->session->userdata('Admin')) {
            $this->form_validation->set_rules('No', "", 'required|trim|numeric|max_length[11]|strip_tags|xss_clean');
            
            if ($this->form_validation->run()) {
                $result = $this->General_Model->DeleteSinavBasvurusu();
                if($result){
                    $cacheKeys = array('SinavBasvurusu');
                    for ($i=0; $i < sizeof($cacheKeys); $i++) { 
                        $cacheKeyTR = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'TR'];
                        $cacheKeyEN = $this->data['cacheKeys']['Get'.$cacheKeys[$i].'EN'];

                        $gotCacheTR = $this->cache->get($cacheKeyTR);
                        $gotCacheEN = $this->cache->get($cacheKeyEN);

                        if ($gotCacheTR) {
                            $this->cache->delete($cacheKeyTR);
                        }
                        if ($gotCacheEN) {
                            $this->cache->delete($cacheKeyEN);
                        }
                    }
                    $this->data['success'] = true;
                }
            }
            echo json_encode($this->data);
        } else {
            redirect('Portal');
        }
    }
}

}
