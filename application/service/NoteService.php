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

    public function addNotes($id, $title, $desc, $rem, $color,$lid)
    {
        $reff = new JWT();
        $flag = 0;
        if (empty($title) || empty($desc)) {
            $flag = 1;
        }
        if ($rem == "undefined") {
            $rem = "";
        }
        if ($flag == 0) {
            $headers = apache_request_headers();
            $token = $headers['Authorization'];

            $redis = new RedisConn();
            $checktoken = JWT::verifytoken($token);
            if ($checktoken) {
                $conn = $redis->connection();
                $response = $conn->get('token');
                $date = date("Y-m-d H:i:s");
                $query = "INSERT into notes (title,description,remainder,color,user_id,lid,created_at) values ('$title','$desc','$rem','$color','$id','$lid',now())";
                $stmt = $this->db->conn_id->prepare($query);
                $res = $stmt->execute();
                if($lid!="undefined"){
                    $queryy = "SELECT id from notes where user_id='$id'";
                    $stm = $this->db->conn_id->prepare($queryy); 
                    $stm->execute();
                    $noteArr = $stm->fetchAll(PDO::FETCH_ASSOC);
                    // $nid = $noteArr['id'];
                    $lquery = "INSERT into labelsmap(notes_id,labels_id) values(LAST_INSERT_ID(),'$lid')";
                    $lstmnt = $this->db->conn_id->prepare($lquery);
                    $lres = $lstmnt->execute();
                }
      
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
        return $data;
    }

    public function noteFetch($email)
    {
        $query = "SELECT * from notes Where user_id ='$email' AND archived !='1' ORDER BY id DESC ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();

        $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($arr as $notes) {
            $title = $notes['title'];
            $desc = $notes['description'];
        }
        print json_encode($arr);

    }

    public function notesUpdate($title, $desc, $id)
    {
        $flag = 0;
        if (empty($title) || empty($desc)) {
            $flag = 1;
        }

        if ($flag == 0) {
            $query = "UPDATE notes SET title = '$title', description ='$desc' where id = '$id'";
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

    public function colorSet($id, $color,$flag)
    {
        if($flag == "color"){
            $query = "UPDATE notes SET color = '$color' where id = '$id'";
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
        if($flag == "Archive"){
            $query = "UPDATE notes set archived = '$color' where id = '$id'";
            $stmt =  $this->db->conn_id->prepare($query);
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

    public function deletenote($id){
        $query = "DELETE from notes WHERE id = '$id'";
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

    public function updatedate($id,$date){
        $query = "UPDATE notes SET remainder = '$date' where id = '$id'";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();
    }


    public function labelscomp($id){
        $query = "SELECT * from labelsmap where labelsid='$id'  ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();

        $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);

        print json_encode($arr);
    }

}
