<?php
class Unittest extends CI_Controller{
   
    public function hello(){
        $this->load->view('hello');
    }   
    public function get_msg(){
        $this->load->model('Result');
        $msg = $this->Result->get_result();
        echo $msg;
    }  
    
}


?>