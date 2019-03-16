<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
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
        $title = $_POST['title'];
        $desc = $_POST['desc'];
        $this->refService->addNotes($title,$desc);
    }


    public function fetchNotes(){

        $this->refService->noteFetch();
    }


}