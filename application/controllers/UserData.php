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

        $em = $this->doctrine->em;
        $uid = uniqid();
        $user = new Entity\Users;
		$user->setFname($fname);
        $user->setLname($lname);
        $user->setEmailid($email);
        $user->setPassword($password);
        $user->setImage("");
        
		$res = $em->persist($user);
		 $em->flush();
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
        $_POST;
        $res = $this->refService->testget();   
        return $res;
    }


    public function testlogin(){
        $email = $_POST['Emailid'];
        $password = $_POST['password'];
        $res = $this->refService->logintest($email, $password);
        return $res;
    }

    /**
     * @method forgotpass()
     */
    public function forgotpass(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $email = $_POST['Emailid'];

        $res = $this->refService->forgotpassword($email);
        }
    }

    public function fetchemail(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $email = $_POST['token'];
        $res = $this->refService->fetchemailid($email);
        }
    }   

    public function resetpassword(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $password = $_POST['password'];
        $token = $_POST['token'];
        $res = $this->refService->resetpass($password,$token);
        }
    }

    public function socialLogin(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $email = $_POST['email'];
        $name = $_POST['name'];

        $this->refService->socialSigin($email,$name);
        }
    }

    public function profilePic(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['uid'];
        $image = $_POST['image'];
        $this->refService->updateProfilepic($id,$image);
        }
    }

    public function userImage(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['uid'];
    
        $this->refService->fetchUserImage($id);
        }
    }

    
    
    
}
