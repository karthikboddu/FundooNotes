<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');

defined('BASEPATH') or exit('No direct script access allowed');
include '/var/www/html/codeigniter/application/Rabbitmq/sender.php';
include '/var/www/html/codeigniter/application/static/LinkRef.php';
include 'JWT.php';
include '/var/www/html/codeigniter/application/models/Entity/Users.php';
 include_once '/var/www/html/codeigniter/application/service/RedisConn.php';
use \Firebase\JWT\JWT;

class UserDataController extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();


    }

    public function testget(){
        $query = "SELECT * from registeruser";
        $stmt = $this->db->conn_id->prepare($query);
        $result = $stmt->execute();
        $no = $stmt->rowCount();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return "200";
        // if($result){
        //     // $data = array(
        //     //     "status" => "300",
        //     // );

        //     // print json_encode($data);
        // }
    }

    /**
     * @param fname,lname,email,password
     */
    public function registration1($fname, $lname, $email, $password)
    {
        
        $checkemail = UserDataController::emailpresent($email);
        $uid = uniqid();
        if (!$checkemail) {
            $datta = [
                'fname' => $fname,
                'lname' => $lname,
                'email' => $email,
                'password' => $password,
            ];
            $query = "INSERT into registeruser (user_id,fname,lname,email,password) values ('$uid','$fname','$lname','$email','$password')";
            $stmt = $this->db->conn_id->prepare($query);
            $res = $stmt->execute($datta);
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
        } else {
            $data = array(
                "status" => "201",
            );
            print json_encode($data);

        }

        return $data;
    }


        /**
     * @param image
     */
    public function updateProfilepic($id,$image)
    {
        $query = "UPDATE Users set image = '$image' WHERE id='$id'";
        $stmt = $this->db->conn_id->prepare($query);
        $res = $stmt->execute($datta);
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



    /**
     * @param email,password
     */
    public function signin($email, $password)
    {
        $redis = new RedisConn();
        $conn = $redis->connection();
        $conn->set('scretkey',"karthik");
        $key =$conn->get('scretkey');
        $data = [
            'email' => $email,
            'password' => $password,
        ];
        // $headers = apache_response_headers();
        // $token   = explode(" ", $headers['Authorization']);
        $query = "SELECT * from registeruser WHERE email ='$email' AND password = '$password' ";
        $stmt = $this->db->conn_id->prepare($query);
        $stmt->execute();
        $no = $stmt->rowCount();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        foreach ($res as $login) {
            $uid = $login['user_id'];
            $email = $login['email'];
            $randnum = rand(1111111111, 9999999999);

        }
        if ($no > 0) {

            $token = array(
                "id"=>$uid,
                "email" => $email,
                "random" => $randnum,
            );
            $jwt = JWT::encode($token, $key);
            // $verify = JWT::verifytoken($jwt,,$key,'HS256');
            $decoded = JWT::decode($jwt, $key, array('HS256'));
            
          
            $conn->set('token'.$email, $jwt);
            $response = $conn->get('token'.$email);

            $data = array(
                "token" => $response,
                "message" => "200",
            );
        
            print json_encode($data);
            // print "200";
        } else {
            $data = array(
                "message" => "204",
            );
            print json_encode($data);
            return "204";

        }
        return $data;
    }

    /**
     * @method forgotpassword()
     * @param email
     */
    public function forgotpassword($email)
    {
        $constants = new LinkConstants();
        $present = UserDataController::emailpresent($email);

        if ($present) {
            $rabb = new SendMail();
            $token = array(
                "email"=>$email,
            );
            $key = "karthik";
            $jwt = JWT::encode($token, $key);
            // $token = md5($email);
            $query = "UPDATE Users SET reset_token = '$jwt' where emailid = '$email'";
            $statement = $this->db->conn_id->prepare($query);
            $resforgot = $statement->execute();
            $sub = 'password recovery mail';
            $body = $constants->resetLinkMsg . $constants->resetLink.$jwt;
            if($resforgot){

            }
            $response = $rabb->sendEmail($email, $sub, $body);
            if ($response == "sent") {
                $data = array(
                    "message" => "200",
                );
                print json_encode($data);

            } else {
                $data = array(
                    "message" => "400",
                );
                print json_encode($data);
                return "400";

            }

        } else {
            $data = array(
                "message" => "404",
            );
            print json_encode($data);
            return "404";
        }
        return $data;
    }

    /**
     * @method emailpresent()
     * @param email
     */

    public function emailpresent($email)
    {
        $query = "SELECT * from Users WHERE emailid = '$email'";
        $stmt = $this->db->conn_id->prepare($query);

        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $count = $stmt->rowCount();

        if ($count > 0) {
            return true;
        } else {
            return false;
        }
    }

        /**
     * @method emailpresent()
     * @param email
     */

    public function fetchUserImage($id)
    {
        $query = "SELECT * from Users WHERE id = '$id'";
        $stmt = $this->db->conn_id->prepare($query);

        $stmt->execute();
        $res = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $count = $stmt->rowCount();

        if ($count > 0) {
            print json_encode($res);
        } else {
            return false;
        }
    }


    /**
     * @method fetchemailid()
     * @param token
     */

    public function fetchemailid($token)
    {
        $query = "SELECT email From registeruser where reset_key ='$token' ";
        $stmt = $this->db->conn_id->prepare($query);
        $stmt->execute();

        $arr = $stmt->fetch(PDO::FETCH_ASSOC);
        if ($arr) {
            $dataa = array(
                'key' => $arr['email'],
                'status' => '200',

            );
            print json_encode($dataa);
        } else {
            $dataa = array(
                'key' => "\n",
                'status' => '204',
            );
            print json_encode($dataa);
        }

    }

    /**
     * @method resetpass()
     * @param password,token
     */
    public function resetpass($password, $token)
    {
        $query = "UPDATE registeruser set password = '$password' where reset_key='$token' ";
        $stmt = $this->db->conn_id->prepare($query);
        $stmt->execute();
        $flag = 0;
        $que1 = "SELECT reset_key from registeruser where password ='$password' ";
        $stmt1 = $this->db->conn_id->prepare($que1);
        $updatepass = $stmt1->execute();

        $arr = $stmt1->fetch(PDO::FETCH_ASSOC);

        if ($arr['reset_key'] == null) {
            $flag = 1;
            $data = array(
                "message" => "404",
            );
            print json_encode($data);
        } else if ($flag == 0) {

            $data = array(
                "message" => "200",
            );
            print json_encode($data);
            $query3 = "UPDATE registeruser SET reset_key='' where password='$password'";
            $stmt2 = $this->db->conn_id->prepare($query3);
            $updatekey = $stmt2->execute();

            $redata = $stmt2->fetch(PDO::FETCH_ASSOC);
        }

    }

    public function socialSigin($email,$name){
        $emailExists = UserDataController::emailpresent($email);
        $redis = new RedisConn();
        $conn = $redis->connection();
        $key =$conn->get('scretkey');
        if($emailExists){
            $que1 = "SELECT id from Users where emailid ='$email' ";
            $stmt = $this->db->conn_id->prepare($que1);
            $stmt->execute();
            $idArr = $stmt->fetch(PDO::FETCH_ASSOC);
            $id = $idArr['id'];
            $resToken = array("id"=>$id);
            $token = JWT::encode($resToken,$key);
            $data  = array(
                "token"   => $token,
                "message" => "200",
            );
            print json_encode($data);
        }else{
            $uid = uniqid();
            $query = "INSERT into Users (id,fname,emailid) values ('$uid','$name','$email')";
            $stmt = $this->db->conn_id->prepare($query);
            $res = $stmt->execute();
            if($res)
            {
                $token = JWT::encode($email,$key);
                $data  = array(
                    "token"   => $token,
                    "message" => "200",
                );
                print json_encode($data);
            }
            else{
                $data  = array(

                    "message" => "204",
                );
                print json_encode($data);
            
            }
        }
    }





    /**
     * @param fname,lname,email,password
     */
    public function registration($fname, $lname, $email, $password)
    {
        $em = $this->doctrine->em;
        $uid = uniqid();
        $user = new Entity\Users;
		$user->setFname($fname);
        $user->setLname($lname);
        $user->setEmailid($email);
        $user->setPassword($password);
        // $user->addUserId($uid);

        $user = new Entity\Notes;
        $em = $this->doctrine->em;
		// $user->setUsername('wildlyinaccurate');
		// $user->setPassword('Passw0rd');
		// $user->setEmail('wildlyinaccurate@gmail.com');
		// $user->setGroup($group);

		$res = $em->persist($user);
		 $em->flush();

        // $checkemail = UserDataController::emailpresent($email);
        // $uid = uniqid();
        // if (!$checkemail) {
        //     $datta = [
        //         'fname' => $fname,
        //         'lname' => $lname,
        //         'email' => $email,
        //         'password' => $password,
        //     ];
        //     $query = "INSERT into registeruser (user_id,fname,lname,email,password) values ('$uid','$fname','$lname','$email','$password')";
        //     $stmt = $this->db->conn_id->prepare($query);
        //     $res = $stmt->execute($datta);
        //     if ($res) {
        //         $data = array(
        //             "status" => "200",
        //         );
        //         print json_encode($data);

        //     } else {
        //         $data = array(
        //             "status" => "204",
        //         );
        //         print json_encode($data);
        //         return "204";

        //     }
        // } else {
        //     $data = array(
        //         "status" => "201",
        //     );
        //     print json_encode($data);

        // }

        // return $data;
    }
















}
