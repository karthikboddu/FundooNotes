<?php

header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
header("Access-Control-Request-Method: POST");
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/ReminderService.php";

class Reminder extends CI_Controller
{
    private $refService = "";


    /**
     * @description create an instance of service methods
     */
    public function __construct()
    {
        parent::__construct();
        $this->refService = new ReminderService();
    }

    public function fetchReminderNotes(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $uid = $_POST['uid'];
        $this->refService->reminderNotesFetch($uid);
        }
    }

    public function pushRemainder(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $uid = $_POST['uid'];
        $title = $_POST['title'];
        }
    }

}