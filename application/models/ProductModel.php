<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProductModel extends CI_Model{
    public function findall(){
        return $this->db->get('product')->result();
    }
    public function find($id){
        $this->db->where('id',$id);
        return $this->db->get('product')->row();
    }

    public function insert($data){
        $this->db->insert('product',$data);
    }

    public function update($id,$data){
        $this->db->where('id',$id);
        $this->db->update('product',$data);
    }

    public function delete($id){
        $this->db->where('id',$id);
        $this->db->delete('product');
    }
}


?>