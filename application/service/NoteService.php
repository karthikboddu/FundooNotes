<?php

header("Access-Control-Allow-Headers: Authorization");

header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
include '/var/www/html/codeigniter/application/service/RedisConn.php';
include 'JWT.php';
defined('BASEPATH') or exit('No direct script access allowed');

use \Firebase\JWT\JWT;
class NoteService extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        
    }

    public function addNotes($email,$title,$desc,$rem){
        $reff = new JWT();
        $flag = 0;        
        if(empty($title)||empty($desc)){
            $flag = 1;
        }
        if($flag == 0){
            $headers = apache_request_headers();
            $token   = $headers['Authorization'];
            
            $redis = new RedisConn();
            $checktoken = JWT::verifytoken($token);
            if($checktoken){
                $conn = $redis->connection();
                $response = $conn->get('token');
                $date = date("Y-m-d H:i:s");
                $query = "INSERT into notes (title,description,email,remainder) values ('$title','$desc','$email','$rem')";
                $stmt = $this->db->conn_id->prepare($query);
                $res = $stmt->execute();
                if ($res) {
                    $data = array(
                        "status" => "200",
                    );
                    print json_encode($data);
        
                } else {
                    $data = array(
                        "status" => "204",
                    );
                    print json_encode($data);
                    return "204";
        
                }
            }
 
        }

    }

    public function noteFetch($email){
        $query = "SELECT * from notes Where email ='$email' ORDER BY id DESC ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();

        $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach($arr as $notes){
            $title = $notes['title'];
            $desc = $notes['description'];
        }
        print json_encode($arr);


    }


}
