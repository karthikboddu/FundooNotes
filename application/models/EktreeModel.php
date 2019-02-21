<?php
class Ektreemodel extends CI_Model
{
public function insert_form($request)
 {
    $insertStatus=$this->db->insert('registration',array('firstName'=>$request['email'],'lastname'=>$request['password']));
    return $insertStatus;
 }
}
?>