<?php
 header('Access-Control-Allow-Origin: *');
 header("Access-Control-Allow-Headers: Authorization");
// defined('BASEPATH') or exit('No direct script access allowed');
//include "/var/www/html/codeigniter/application/service/UserDataController.php";
use \Firebase\JWT\JWT;

include '/var/www/html/codeigniter/application/service/JWT.php';
include_once '/var/www/html/codeigniter/application/service/RedisConn.php';
class CollabaratorController extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->library('doctrine');

        // $this->refService = new UserDataController();
    }


    public function checkEmail(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $em = $this->doctrine->em;
        $email = $_POST['email'];
        $query = $em->createQuery('SELECT u.emailid from Entity\Users u WHERE u.emailid=?1');
        $query->setParameter(1, $email);
        $noteArr = $query->getScalarResult();
        $no = sizeof($noteArr);
        // $res = $noteArr[0];

        if($no>0){
            $data = array(
                "status" => "200",
            );
            print json_encode($data);

        } else {
            $data = array(
                "status" => "204",
            );
            print json_encode($data);
        }
        
     
    }}


    public function addCollabarator(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
       $owneremail =  $_POST['owneruid'];
       $collemail = $_POST['collemail'];
       $nid = $_POST['noteid'];

        $em = $this->doctrine->em;

        $collabarator = new Entity\Collaborators;

       // $collid = $em->find('Entity\Users', $collemail);
        $queery = $em->createQuery('SELECT u.id from Entity\Users u WHERE u.emailid=?1');
        $queery->setParameter(1, $collemail);
        $userarr = $queery->getScalarResult();
        foreach ($userarr as $u) {
            $colluid = $u['id'];
        }


        $notes = $em->find('Entity\Notes' ,$nid);

        $collusers = $em->find('Entity\Users',$colluid);
        $ownerusers = $em->find('Entity\Users',$owneremail);

        $collabarator->setOwneruid($ownerusers);
        $collabarator->setCuid($collusers);
        
        
        $collabarator->addColnid($notes);
        $collabarator->addColuid($ownerusers);
        $collabarator->setCuid($collusers);

        $notes->addCollaborate($collabarator);
        


        $em->persist($collabarator);
        $em->flush();
    }
    }
}



