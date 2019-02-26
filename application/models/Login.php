<?php
class Login extends CI_Model
{
  
  /**
   * function to insert user details
   */
    public function insert_form($request)
    {
        $fname = $request['fname'];
        $lname = $request['lname'];
        $email = $request['email'];
        $pass = $request['password'];

        $query = $this->db->query("INSERT INTO registration (firstname,lastname,email,password) VALUES ('" . $fname . "','" . $lname . "','" . $email . "','" . $pass . "')");
        return $query;
    }

    /**
     * function to get user details 
     */
    public function find($request)
    {
        $email = $request->email;
        $password = $request->password;
        $data = $this->db->query("SELECT * FROM registration WHERE email = '$email' AND password = '$password'  ")->row();
        // $check = $this->db->where('email',$request['email']);
        // return $this->db->get('registration')->row();
        return $data;
    }

    public function findname($request)
    {
        $email = $request->email;
        $password = $request->password;

        $data = $this->db->query("SELECT * FROM registration WHERE email = '$email' AND password = '$password'  ")->row();
        $name = $data->firstname;
        return $name;
    }

}
