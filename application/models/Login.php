<?php
class Login extends CI_Model
{
public function insert_form($request)
 {
  //   $insertStatus=$this->db->insert('registration',array('firstName'=>$request['fname'],'lastname'=>$request['lname'],
  //   'email'=>$request['email'],'password'=>$request['password']));
  // return $insertStatus;

      $fname = $request[fname];
      $lname = $request[lname];
      $email = $request[email];
      $pass = $request[password];

    $query = $this->db->query("INSERT INTO registration (firstname,lastname,email,password) VALUES ('" . $fname . "','" . $lname . "','" . $email . "','".$pass."')");
    return $query;
 }
 
 public function find($request){
   $email = $request['email'];
   $password = $request['password'];
   $data =  $this->db->query("SELECT * FROM registration WHERE email = '$email' AND password = '$password'  ")->row(); 
      // $check = $this->db->where('email',$request['email']);
      // return $this->db->get('registration')->row();
      return $data;
 }

}
?>