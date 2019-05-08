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

    public function noteFetch($uid)
    {
        $query = "SELECT n.id ,n.title, n.description,n.color,n.reminder,n.image,n.dragId,l.labelname 
        from Notes n left join notes_labels nl on n.id=nl.notes_id left JOIN Labels l 
        on nl.labels_id=l.id WHERE archive='0' AND trash='0' AND (n.uid_id='$uid' or n.id in
         (SELECT nc.notes_id from Collaborator c  join notes_collaborators nc on c.id=nc.collaborators_id) ) ORDER BY n.dragId desc";

     //   $query1= "SELECT * FROM notes where  isArchive = '0' and isDeleted='0' and (email = '$email' or id in ( SELECT noteId from collabarator WHERE email='$email') )  order by dragId desc ";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute();

        $arr = $stmt->fetchAll(PDO::FETCH_ASSOC);

        //$encode = json_encode($noteArr);
        $redis = new RedisConn();
        $conn = $redis->connection();

        $redisKey = $conn->exists('notes'.$uid);
      
        if($redisKey==1){
            $hss = $conn->hgetall('notes'.$uid); 
            $newarr = array();
           
            for($i=0;$i<sizeof($hss);$i++){
               $hm =$conn->hmget('notes'.$uid,$i);
            //    $dsf= json_decode($hm[0]);
               array_push($newarr,json_decode($hm[0]));
           }
            print json_encode($newarr);
        }
        else{
            for($i=0;$i<sizeof($arr);$i++){
                $conn->hmset('notes'.$uid,array( $i =>json_encode($arr[$i]) ));
                //$conn->rpush('notes'.$uid,json_encode($arr[$i]) );
            } 
            $newarr = array();
            for($i=0;$i<sizeof($arr);$i++){
               $hm =$conn->hmget('notes'.$uid,$i);
            //    $dsf= json_decode($hm[0]);
               array_push($newarr,json_decode($hm[0]));
           }
           $hss = $conn->hgetall('notes'.$uid); 
            print json_encode($newarr);   
        }

       
        // for($i=0;$i<sizeof($arr);$i++){
        //     $conn->lpush(0,json_encode($arr[$i]));
        // }

        // for($i=0;$i<sizeof($arr);$i++){
        //     $conn->hmset($uid,5,$arr[$i]);
        // }

        
      

        // $dd = $conn->hgetall(notes.$uid); 

 

        // $hm =$conn->hmget('metavars','foo');
        // $del = $conn->hdel('metavars','foo');
     
        // for($j=0;$j<sizeof($arr);$j++){
        //     $hss = $conn->hgetall('notes'.$i);    
        //  }
        //  $hss = $conn->hgetall('notes1');  
        
        

    }

    public function flushAll()
    {
        $redis = new RedisConn();
        $conn = $redis->connection();
        $conn->flushAll();
    }
    public function dragDropNotes($uid,$diff,$currId,$direction)
    {
    $headers = apache_request_headers();
    $token   = $headers['Authorization'];
    $reff    = new JWT();
    if ($reff->verifytoken($token)) {
        for ($i = 0; $i < $diff; $i++) {
            if ($direction == "negative") {
                /**
                 * @var string $query has query to select the next max note id of the notes
                 */
                $query = "SELECT MAX(dragId) dragId FROM Notes where dragId < '$currId' and uid_id='$uid'";
            } else {
                /**
                 * @var string $query has query to select the next min note id of the notes
                 */
                $query = "SELECT MIN(dragId) dragId FROM Notes where dragId > '$currId' and uid_id='$uid'";
            }
            $statement = $this->db->conn_id->prepare($query);
            $statement->execute();
            $swapId = $statement->fetch(PDO::FETCH_ASSOC);
            /**
             * @var swapId to store the next id
             */
            $swapId = $swapId['dragId'];
            /**
             * @var string $query has query to swap the tow rows
             */
            $query = "UPDATE Notes a INNER JOIN Notes b on a.dragId <> b.dragId set a.dragId = b.dragId
                WHERE a.dragId in ('$swapId','$currId') and b.dragId in ('$swapId','$currId')";
            $statement = $this->db->conn_id->prepare($query);
            $temp      = $statement->execute();

            /**
             * storing in the next id
             */
            $currId = $swapId;
        }

    } else {
        $data = array(
            "error" => "404",
        );
        /**
         * returns json array response
         */
        print json_encode($data);
    }


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

        $resultSet = $stmt->get_result();
        if ($res) {
            $trashArr = $resultSet->fetchAll(PDO::FETCH_ASSOC);
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
