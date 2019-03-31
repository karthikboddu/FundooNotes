<?php

header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
header("Access-Control-Request-Method: POST");
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/LabelService.php";

class Label extends CI_Controller
{
    private $refService = "";


    /**
     * @description create an instance of service methods
     */
    public function __construct()
    {
        parent::__construct();
        $this->refService = new LabelService();
    }

    public function addLabel(){
        $uid = $_POST['uid'];
        $label = $_POST['label'];

        $this->refService->labelAdd($uid,$label);
    }


    public function fetchLabel()
    {
        $uid = $_POST['uid'];
        $this->refService->labelFetch($uid);
    }

}