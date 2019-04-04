<?php

header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
header("Access-Control-Request-Method: POST");
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/NoteService.php";

class Notes extends CI_Controller
{
    private $refService = "";


    /**
     * @description create an instance of service methods
     */
    public function __construct()
    {
        parent::__construct();
        $this->refService = new NoteService();
    }

    public function createNotes(){
        $id = $_POST['id'];
        $title = $_POST['title'];
        $desc = $_POST['desc'];
        $rem = $_POST['remainder'];
        $color = $_POST['color'];
        $notesres = $this->refService->addNotes($id,$title,$desc,$rem,$color);
        return $notesres;
    }


    public function fetchNotes(){
        $email = $_POST['id'];
        $this->refService->noteFetch($email);
    }

    public function updateNotes(){
        $title = $_POST['title'];
        $desc = $_POST['description'];
        $id = $_POST['id'];
        $this->refService->notesUpdate($title,$desc,$id);
    }
    public function setColor(){
        $id = $_POST['id'];
        $color = $_POST['color'];
        $flag = $_POST['flag'];
        $this->refService->colorSet($id,$color,$flag);
    }

    public function notedelete(){
        $id = $_POST['id'];
        $this->refService->deletenote($id);
    }

    public function changetimedate(){
        $id = $_POST['id'];
        $datetime = $_POST['presentDateTime'];
        $this->refService->updatedate($id,$datetime);
    }

}