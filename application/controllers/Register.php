<?php

defined('BASEPATH') or exit('No direct script access allowed');

class Register extends CI_Controller
{
    private $refService = "";
    public function __construct()
    {
        parent::__construct();
        $this->refService = new InsertData();
    }

    public function insertUser(){
        $fname = $_POST['firstName'];
        $lname = $_POST['lastName'];
        $email = $_POST['email'];
        $password = $_POST['password'];
        $this->refService->insertDb($fname,$lname,$email,$password);

    }
}

?>