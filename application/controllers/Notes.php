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
        $email = $_POST['email'];
        $title = $_POST['title'];
        $desc = $_POST['desc'];
        $rem = $_POST['remainder'];
        $this->refService->addNotes($email,$title,$desc,$rem);
    }


    public function fetchNotes(){
        $email = $_POST['email'];
        $this->refService->noteFetch($email);
    }

    public function updateNotes(){
        $title = $_POST['title'];
        $desc = $_POST['description'];
        $id = $_POST['id'];
        $this->refService->notesUpdate($title,$desc,$id);
    }


}