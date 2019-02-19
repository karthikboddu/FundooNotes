<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class ProductModel extends CI_Model{
    public function findall(){
       $data = $this->db->query("SELECT * FROM product ")->result();
        // print_r($data);
        foreach ($data as $record) {
            print_r($record->id."   ");
            print_r($record->name."   ");
            print_r($record->price."   ");
            print_r($record->quantity."</br>");
            
            // echo $row['name']."<br />\n";
        }
    }
    public function find($id){
       $data =  $this->db->query("SELECT * FROM product WHERE id = '$id'")->row(); 
        // $this->db->where('id',$id);
        // return $this->db->get('product')->row();
        return $data;
        // foreach ($data as $record) {
        //     print_r($record->id."</br>");
        //     print_r($record->name."</br>");
        //     print_r($record->price."</br>");
        //     print_r($record->quantity."</br>");
        //     // echo $row['name']."<br />\n";
        // }
    }

    public function insert($data){
        print_r($data);
        $id = $data[0];
        $name = $data[1];
        $price = $data[2];
        $quantity = $data[3];
        $query = $this->db->query("INSERT INTO product (id,name,price,quantity) VALUES ('" . $id . "','" . $name . "'," . $price . "," . $quantity . ")");
        ProductModel::queryRun($query);        
    }

    public function update($id,$data){
        print_r($data);
        $name = $data[0];
        $price = $data[1];
        $quantity = $data[2];
        $query = $this->db->query("UPDATE product SET name='".$name."', price='".$price."', quantity='".$quantity."' where id='".$id ."'");
        // $this->db->where('id',$id);
        // $this->db->update('product',$data);
        ProductModel::queryRun($query); 
    }

    public function delete($id){
        $query = $this->db->query("DELETE from product where id='".$id ."'  ");
        ProductModel::queryRun($query);
    }

            /**
     * function t orun query and return status to the user 
     * 
     * @return json the json data of the sql query 
     */
    public function queryRun($res)
    {
        // if (!($res = $this->db->query($query))) {
        //     $error = $this->db->error(); // Has keys 'code' and 'message'
        //     echo json_encode(array("status" => 500, "message" => $error["message"]), JSON_PRETTY_PRINT);
        // } else {
         //   var_dump($res);
            if (is_bool($res))
                echo json_encode(array("status" => 200, "message" => "succes"), JSON_PRETTY_PRINT);
            else
                echo json_encode(array("status" => 200, "message" => "fail"), JSON_PRETTY_PRINT);
        
    }
}


?>