<?php
defined('BASEPATH') or exit('No direct script access allowed');

class InsertData extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
    }

    /**
     * @param fname,lname,email,password
     */
    public function insertDb($fname, $lname, $email, $password)
    {
        $datta = [
            'fname' => $fname,
            'lname' => $lname,
            'email' => $email,
            'password' => $password,
        ];
        $query = "INSERT into registeruser (fname,lname,email,password) values ('$fname','$lname','$email','$password')";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute($datta);
        if ($res) {
            $data = array(
                "message" => "200",
            );
            print json_encode($data);

        } else {
            $data = array(
                "message" => "204",
            );
            print json_encode($data);
            return "204";

        }
        return $data;
    }

    /**
     * @param email,password
     */
    public function login($email, $password)
    {
        $data = [
            'email' => $email,
            'password' => $password,
        ];
        $query = "SELECT * from registeruser WHERE email ='$email' AND password = '$password' ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute($data);

        if ($res) {
            $data = array(
                "message" => "200",
            );
            print json_encode($data);
          
        } else {
            $data = array(
                "message" => "204",
            );
            print json_encode($data);
            return "204";

        }
        return $data;
    }

}
