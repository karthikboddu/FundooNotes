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
            $checktoken = $reff->verifytoken($token);
            if ($checktoken) {
                $conn = $redis->connection();
                $response = $conn->get('token');
                $date = date("Y-m-d H:i:s");
                $query = "INSERT into Notes (title,description,remainder,color,user_id,lid,created_at) values ('$title','$desc','$rem','$color','$id','$lid',now())";
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
        $query = "SELECT n.id ,n.title, n.description,n.color,n.reminder,n.image,l.labelname from Notes n left join notes_labels nl on n.id=nl.notes_id left JOIN Labels l on nl.labels_id=l.id WHERE archive='0' AND trash='0' AND (n.uid_id='$email' or n.id in (SELECT nc.notes_id from Collaborator c left join notes_collaborators nc on c.id=nc.collaborators_id) )";

        $query1= "SELECT * FROM notes where  isArchive = '0' and isDeleted='0' and (email = '$email' or id in ( SELECT noteId from collabarator WHERE email='$email') )  order by dragId desc ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();

        $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);

        foreach ($arr as $notes) {
            $title = $notes['title'];
            $desc = $notes['description'];
        }
        print json_encode($arr);

    }

    public function notesUpdate($title, $desc, $id,$color)
    {
        $flag = 0;
        if (empty($title) || empty($desc)) {
            $flag = 1;
        }

        if ($flag == 0) {
            $query = "UPDATE Notes SET title = '$title', description ='$desc', color='$color' where id = '$id'";
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
            $query = "UPDATE Notes SET color = '$color' where id = '$id'";
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
            $query = "UPDATE Notes set archive = '$color' where id = '$id'";
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


        if($flag=="Delete"){
            $query = "UPDATE Notes SET reminder ='' where id = '$id' ";
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

    public function trashNote($id){
        $query = "UPDATE Notes set trash='1'  WHERE id = '$id'";
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
    
    public function noteDelete($id){
        $query = "DELETE FROM Notes WHERE id = '$id'";
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

    public function notesRestore($id){
        $query = "UPDATE Notes set trash='0'  WHERE id = '$id'";
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


    public function fetchnote($id){
        $query = "SELECT * from Notes where trash =1 And uid_id='$id'";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();


        if ($res) {
            $trashArr = $stmt->fetchAll(PDO::FETCH_ASSOC);
            $data = array(

                "status" => "200",
            );
            print json_encode($trashArr);

        } else {
            $data = array(
                "status" => "204",
            );
            print json_encode($data);
            return "204";

        }
    }
    public function updatedate($id,$date){
        $query = "UPDATE Notes SET reminder = '$date' where id = '$id'";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();
    }


    public function reminderDelete($id){
 
    }

    public function labelscomp($id){
        $query = "SELECT * from labelsmap where labelsid='$id'  ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();

        $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);

        print json_encode($arr);
    }

    public function imageNote($base64,$uid,$noteid){
        $query = "UPDATE Notes SET image = '$base64'  where uid_id = '$uid' AND id='$noteid'";
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
