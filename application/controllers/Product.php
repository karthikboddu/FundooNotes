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
    
    }
    public function find_get($id){
        echo json_encode($this->ProductModel->find($id));
    }

    public function create_post(){
        $prod = array(
        $this->post('id'),
        $this->post('name'),
        $this->post('price'),
        $this->post('quantity'));
        $d = $this->ProductModel->insert($prod);
            print_r($d);
    }

    public function update_put(){
        $prod = array(        
        $this->put('name'),
        $this->put('price'),
        $this->put('quantity'));
         $this->ProductModel->update($this->put('id'),$prod);
    }

    public function delete_delete($id){
        $this->ProductModel->delete($id);
    }


}

?>