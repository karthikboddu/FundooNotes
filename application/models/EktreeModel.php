<?php
class Ektreemodel extends CI_Model
{
public function insert_form($request)
 {
    $insertStatus=$this->db->insert('registration',array('firstName'=>$request['fname'],'lastname'=>$request['lname'],
    'email'=>$request['email'],'password'=>$request['password']));
    return $insertStatus;
 }
 
 public function find($request){
      $check = $this->db->where('email',$request['email']);
      return $this->db->get('registration')->row();
 }

}
?>