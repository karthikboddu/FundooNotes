<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/UserDataController.php";

class UserData extends CI_Controller
{
    private $refService = "";

    /**
     * @description create an instance of service methods
     */
    public function __construct()
    {
        parent::__construct();
        $this->refService = new UserDataController();
    }

    /**
     * @return result
     */
    public function register()
    {
        $fname = $_POST['firstName'];
        $lname = $_POST['lastName'];
        $email = $_POST['Emailid'];
        $password = $_POST['password'];
        $res = $this->refService->registration($fname, $lname, $email, $password);
        return $res;
    }

    /**
     * @return result
     */
    public function login()
    {
        $email = $_POST['Emailid'];
        $password = $_POST['password'];
        $res = $this->refService->signin($email, $password);
        return $res;
    }

    public function test(){
        $res = $this->refService->testget();   
    }

    /**
     * @method forgotpass()
     */
    public function forgotpass(){
        $email = $_POST['Emailid'];

        $res = $this->refService->forgotpassword($email);
    }

    public function fetchemail(){
        $email = $_POST['token'];
        $res = $this->refService->fetchemailid($email);
    }   

    public function resetpassword(){
        $password = $_POST['password'];
        $token = $_POST['token'];
        $res = $this->refService->resetpass($password,$token);
    }
}
