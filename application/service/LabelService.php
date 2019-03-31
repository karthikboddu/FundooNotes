<?php

header("Access-Control-Allow-Headers: Authorization");

header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
include '/var/www/html/codeigniter/application/service/RedisConn.php';
include 'JWT.php';
defined('BASEPATH') or exit('No direct script access allowed');

use \Firebase\JWT\JWT;

class LabelService extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();

    }

    public function labelAdd($uid,$label){
        $query = "INSERT into labels (label,user_id,created_at) values ('$label','$uid',now())";
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
    
    public function labelFetch($uid){
        $query = "SELECT * from labels Where user_id ='$uid'  ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();
        $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);
        print json_encode($arr);
    }


}