<?php

header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
header("Access-Control-Request-Method: POST");
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/ArchiveService.php";

class Archive extends CI_Controller
{
    private $refService = "";


    /**
     * @description create an instance of service methods
     */
    public function __construct()
    {
        parent::__construct();
        $this->refService = new ArchiveService();
    }


    public function fetchArchive(){
        $uid =  $_POST['uid'];
        $this->refService->archivednotes($uid);
    }


    public function unarchive(){
        $uid = $_POST['uid'];
        $this->refService->archive($uid);
    }

}