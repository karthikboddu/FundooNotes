<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");

defined('BASEPATH') or exit('No direct script access allowed');

include 'JWT.php';


class NoteService extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        
    }

    public function addNotes($title,$desc){

        $query = "INSERT into notes (title,description) values ('$title','$desc')";
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

    public function noteFetch(){
        $query = "SELECT * from notes ORDER BY id DESC ";
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
