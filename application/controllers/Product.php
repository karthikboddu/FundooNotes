<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH . '/libraries/REST_Controller.php');
require(APPPATH . '/libraries/Format.php');

use Restserver\Libraries\REST_Controller;

class Product extends REST_Controller{
    function __construct(){
        parent::__construct();
    }

    public function find_all_get(){
        $data = json_encode($this->ProductModel->findall());
        print_r($data);
        $this->load->view('index',$data);
    }
    public function find_get($id){
        echo json_encode($this->ProductModel->find($id));
    }

    public function create_post(){
        $prod = array(
        'id'=>$this->post('id'),
        'name'=>$this->post('name'),
        'price'=>$this->post('price'),
        'quantity'=>$this->post('quantity'));
        $this->ProductModel->insert($prod);
    }

    public function update_put(){
        $prod = array(        
        'name'=>$this->put('name'),
        'price'=>$this->put('price'),
        'quantity'=>$this->put('quantity'));
         $this->ProductModel->update($this->put('id'),$prod);
    }

    public function delete_delete($id){
        $this->ProductModel->delete($id);
    }
}

?>