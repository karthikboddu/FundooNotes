<?php
 header('Access-Control-Allow-Origin: *');
 header("Access-Control-Allow-Headers: Authorization");
// defined('BASEPATH') or exit('No direct script access allowed');
//include "/var/www/html/codeigniter/application/service/UserDataController.php";
use \Firebase\JWT\JWT;

include '/var/www/html/codeigniter/application/service/JWT.php';
include_once '/var/www/html/codeigniter/application/service/RedisConn.php';
class UserController extends CI_Controller
{
    private $refService = "";

    /**
     * @description create an instance of service methods
     */
    public function __construct()
    {
        parent::__construct();
        $this->load->library('doctrine');

        // $this->refService = new UserDataController();
    }

    public function login()
    {
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $email = $_POST['Emailid'];
        $password = $_POST['password'];
        $em = $this->doctrine->em;
        $users = new Entity\Users;
        $query = $em->createQuery('SELECT u FROM Entity\Users u WHERE u.emailid=?1 AND u.password =?2 ');
        $query->setParameter(1, $email);
        $query->setParameter(2, $password);
        $loginArr = $query->getScalarResult();
        $res = $users;
        $key = "karthik";
        $redis = new RedisConn();
        $conn = $redis->connection();
        foreach ($loginArr as $arr) {
            $uid = $arr['u_id'];
            $image = $arr['u_image'];
        }
        if (is_null($res)) {
            $data = array(
                "status" => "204",
            );
            print json_encode($data);

        } else {
            $token = array(
                "id" => $uid,
                "email" => $email,
                
            );
            $jwt = JWT::encode($token, $key);
            // $verify = JWT::verifytoken($jwt,,$key,'HS256');
            //$decoded = JWT::decode($jwt, $key, array('HS256'));
            $conn->set('userid',$uid);
            $conn->set('token' . $email, $jwt);
            $response = $conn->get('token' . $email);

            $data = array(
                "token" => $response,
                "message" => "200",
            );

            print json_encode($data);
        }
    }
    }

    /**
     * @return result
     */
    public function register()
    {
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $fname = $_POST['firstName'];
        $lname = $_POST['lastName'];
        $email = $_POST['Emailid'];
        $password = $_POST['password'];

        $em = $this->doctrine->em;
        $uid = uniqid();
        $user = new Entity\Users;
        $user->getId();
        $user->setFname($fname);
        $user->setLname($lname);
        $user->setEmailid($email);
        $user->setPassword($password);

        // $article2 = $em->find('Entity\Users', 1);
        // $sd =  $article2->getFname();
        $notes = new Entity\Notes;
        // $user->addUserId($notes);
        $em->persist($user);
        $em->flush();
        $res = $user;
        if (is_null($res)) {
            $data = array(
                "status" => "204",
            );
            print json_encode($data);

        } else {
            $data = array(
                "status" => "200",
            );
            print json_encode($data);
        }

        // $res = $this->refService->registration($fname, $lname, $email, $password);
        // return $res;
    }
    }



    public function insertNotes()
    {
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
            $id = $_POST['id'];
            $title = $_POST['title'];
            $desc = $_POST['desc'];
            $rem = $_POST['remainder'];
            $color = $_POST['color'];
            $labelid = $_POST['labelid'];
            $image = $_POST['image'];
            //$createdAt = CURRENT_TIMESTAMP();
            $em = $this->doctrine->em;
            $notes = new Entity\Notes;
    
            if($rem =="undefined"){
                $rem ="";
            }
            $reff = new JWT();
            
    
            $article2 = $em->find('Entity\Users', $id);
    
            $headers = apache_request_headers();
            $token = $headers['Authorization'];
            $checktoken = $reff->verifytoken($token);
            if($checktoken){
                $notes->setTitle($title);
                $notes->setDescription($desc);
                $notes->setColor($color);
        
                $notes->setTrash(0);
                $notes->setImage($image);
                $notes->setArchive(0);
                $notes->setReminder($rem);
                $notes->setUid($article2);
            
    
    
            if ($labelid != "undefined" && $labelid != "null") {
                $labels = new Entity\Labels;
                $labeldata = $em->find('Entity\Labels', $labelid);
                $notes->addLabel($labeldata);
            }
    
            $article2 = $em->find('Entity\Users', $id);
    
            $notes->setUid($article2);
    
            $em->persist($notes);
    
            $em->flush();
    
            $res = $notes;
    
            $redis = new RedisConn();
            $conn = $redis->connection();
           // $conn->flushAll();
    
        }
    
    
            if (is_null($res)) {
    
    
                $data = array(
                    "status" => "204",
                );
                print json_encode($data);
    
            } else {
    
                $query = $em->createQuery('SELECT MAX(n.id) from Entity\Notes n  WHERE n.uid=?1');
                $query->setParameter(1, $id);
                $narr = $query->getScalarResult();
                $nid = $narr[0]['1'];
    
                $queryd = $em->createQuery('UPDATE Entity\Notes n SET n.dragId =?4  WHERE n.id=?4');
    
                $queryd->setParameter(4, $nid);
                $queryd->getScalarResult();
    
              //  $query = $em->createQuery('SELECT n from Entity\Notes n WHERE n.uid=?1 AND n.id=?2');
                $query = $em->createQuery('SELECT   n.id ,n.title, n.description,n.color,n.trash,n.archive,n.reminder,n.image,n.dragId,l.labelname from Entity\Notes n  left  JOIN n.labels l where  n.uid=?1 AND n.id=?2 AND n.archive=0 AND n.trash=0 ORDER BY n.dragId DESC');
                $query->setParameter(1, $id);
                $query->setParameter(2, $nid);
                $noteRow = $query->getScalarResult();
                $noteRow1 = $query->getArrayResult();
                $data = array(
                    "status" => "200",
                );
                $noteData =array(
                    "id" => $nid,
                    "title"=>$noteRow1[0]['title'],
                    "description"=>$noteRow1[0]['description'],
                    "color"=>$noteRow1[0]['color'],
                    "reminder"=>$noteRow1[0]['reminder'],
                    "archive"=>$noteRow1[0]['archive'],
                    "trash"=>$noteRow1[0]['trash'],
                    "dragId"=>$noteRow1[0]['dragId'],
                    "labelname"=>$noteRow1[0]['labelname']
                );
    
                $dsf = $noteRow[0];
                 $dfd = json_encode($noteData);
                $redisKey = $conn->exists('notes'.$id);
                $ff = $conn->hvals('notes'.$id);
                $newId = sizeof($ff);
                if($redisKey==1){
                   // $conn->rpush('notes',json_encode($noteRow[0]));
                   $conn->hset('notes'.$id,$newId,json_encode($noteData));
                   $fsf = $conn->hgetall('notes'.$id);
                }
                $newarr = array();
                for($i=0;$i<sizeof($ff);$i++){
                   $hm =$conn->hmget('notes'.$id,$i);
                //    $dsf= json_decode($hm[0]);
                   array_push($newarr,json_decode($hm[0]));
               }
               $hss = $conn->hgetall('notes'.$id); 
                print json_encode($data);
    
            
            }
        }
      
    }

    public function addLabel()
    {
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $uid = $_POST['uid'];
        $label = $_POST['label'];

        $em = $this->doctrine->em;
        $labels = new Entity\Labels;

        $article2 = $em->find('Entity\Users', $uid);
        $labels->setLuid($article2);

        $labels->setLabelname($label);

        $em->persist($labels);

        $em->flush();
        }
    }

    public function getLabel()
    {
        $uid = $_POST['uid'];
        $em = $this->doctrine->em;
        //$qb = $em->createQueryBuilder();

        $query = $em->createQuery('SELECT u.id,u.labelname FROM Entity\Labels u JOIN u.luid l where l.id=?1');
        //$query = $em->createQuery('SELECT lu.id,u.id,u.labelname FROM Entity\Labels u inner  JOIN u.labeluid lu   JOIN u.luid l where l.id=?1');
        $query->setParameter(1, $uid);
        // $qb->select('u')
        // ->from('Entity\Labels', 'u');

        // $query = $qb->getQuery();
        $results = $query->getResult();
        print json_encode($results);
    }

    public function fetchNotes()
    {
        $uid = $_POST['id'];
        $em = $this->doctrine->em;
        $query = $em->createQuery('SELECT n from Entity\Notes n WHERE n.uid=?1');
        $query->setParameter(1, $uid);
        $noteArr = $query->getScalarResult();
        // $res = $noteArr[0];

        print json_encode($noteArr);
    }

    public function labelmap()
    {
        $em = $this->doctrine->em;
        $user = new Entity\Users;
        $notes = new Entity\Notes;
        $uid = $_POST['id'];
        $nid = $_POST['nid'];

        $a = $em->find('Entity\Users', $uid);
        $b = $em->find('Entity\Labels', $nid);

        $notes->setTitle('sdfdsf');
        $notes->setDescription('DSFDSFDSF');
        $notes->setColor('DSFS');
        $notes->setArchive(1);
        $notes->setTrash(0);
        $notes->setImage(0);
        $notes->setArchive(0);
        $notes->setReminder('DSD');
        $notes->setUid($a);

        $notes->addLabel($b);
        $sdf = $notes->getLabels();
        $em->persist($notes);
        $em->flush();

    }

    public function labelbyid()
    {

        $em = $this->doctrine->em;
        $id = $_POST['lid'];
        $notes = new Entity\Notes;
        // $que = $em->find('Entity\Notes',2);
        $labe = $notes->getLabels();
        $query = $em->createQuery('SELECT n.id ,n.title, n.description,n.color,n.reminder,n.image,l.labelname from Entity\Notes n JOIN n.labels l WHERE l.id = ?1 ');
        $query->setParameter(1, $id);
        $RES = $query->getScalarResult();

        print json_encode($RES);
    }

    public function updateLabelNote()
    {
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $em = $this->doctrine->em;
        $uid = $_POST['uid'];
        $lid = $_POST['labelid'];
        $notelid = $_POST['notelid'];
        $flag = $_POST['flag'];

        if ($flag == "add") {
            $notes = $em->find('Entity\Notes', $notelid);

            $labeldata = $em->find('Entity\Labels', $lid);
            $notes->addLabel($labeldata);
            $article2 = $em->find('Entity\Users', $uid);

            $notes->setUid($article2);

            $em->persist($notes);

            $em->flush();
        }

        if ($flag == "delete") {

            $em = $this->doctrine->em;

            $notes = $em->find('Entity\Notes', $notelid);

            $queery = $em->createQuery('SELECT l from Entity\Labels l WHERE l.labelname=?1');
            $queery->setParameter(1, $lid);
            $label = $queery->getScalarResult();
            foreach ($label as $ldata) {
                $newlid = $ldata['l_id'];
            }
            $labels = $em->find('Entity\Labels', $newlid);

            $notes->removeLabel($labels);

            $em->persist($notes);
            $em->flush();
        }
    }
    }

    public function fetchLabelName(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $em = $this->doctrine->em;

        $lid = $_POST['lid'];
        $queery = $em->createQuery('SELECT l.labelname from Entity\Labels l WHERE l.id=?1');
            $queery->setParameter(1, $lid);
            $label = $queery->getScalarResult();

            print json_encode($label);
    }
}

}
