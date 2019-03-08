<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

defined('BASEPATH') or exit('No direct script access allowed');
include '/var/www/html/codeigniter/application/RabbitMq/send.php';
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
        $stmt->execute();
        $no = $stmt->rowCount();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);


        if ($no>0) {
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


    public function forgotpassword($email){
        $present = InsertData::emailpresent($email);

        if($present){
            $rabb = new Send();
        
            $token     = md5($email);
            $query     = "UPDATE registeruser SET reset_key = '$token' where email = '$email'";
            $statement = $this->db->conn_id->prepare($query);
            $statement->execute();
            $sub      = 'password recovery mail';
            $body     = 'click here to reset passwordhttp://localhost:4200/verify?token=';
            $response = $rabb->sendMail($email, $sub, $body);
            if ($response == "sent") {
                $data = array(
                    "message" => "200",
                );
                print json_encode($data);
                return "200";

            } else {
                $data = array(
                    "message" => "400",
                );
                print json_encode($data);
                return "400";

            }

        }else{
            $data = array(
                "message" => "404",
            );
            print json_encode($data);
            return "404";
        }
    }



    public function emailpresent($email){
        $query = "SELECT * from registeruser WHERE email = '$email'";
        $stmt = $this->db->conn_id->prepare($query);

        $stmt->execute();

        $count = $stmt->rowCount();

        if($count >0){
            return true;
        }else{
            return false;
        }
    }

}
