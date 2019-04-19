<?php
// header('Access-Control-Allow-Origin: *');
// header("Access-Control-Allow-Headers: Authorization");
// defined('BASEPATH') or exit('No direct script access allowed');
//include "/var/www/html/codeigniter/application/service/UserDataController.php";

include '/var/www/html/codeigniter/application/service/JWT.php';
include_once '/var/www/html/codeigniter/application/service/RedisConn.php';
class NotesController extends CI_Controller
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
    public function fetchNotes()
    {
        $uid = $_POST['id'];
        $em = $this->doctrine->em;
       // $query = $em->createQuery('SELECT n.id ,n.title, n.description,n.color,n.reminder,n.image,l.labelname from Entity\Notes n  JOIN n.labels l WHERE n.uid=?1 ');
        //$query = $em->createQuery('SELECT   n.id ,n.title, n.description,n.color,n.reminder,n.image,l.labelname from Entity\Notes n  left  JOIN n.labels l where n.uid=?1 ORDER BY n.id DESC');
        $query = $em->createQuery('SELECT   n.id ,n.title, n.description,n.color,n.reminder,n.image,l.labelname from Entity\Notes n  left  JOIN n.labels l where n.uid=?1 AND n.archive=0 AND n.trash=0 ORDER BY n.id DESC');
        $query->setParameter(1, $uid);
       // $rff = $query->getResult();
        $noteArr = $query->getScalarResult();
       
        // $res = $noteArr[0];
        // //  print_r($res);
        // $title = $res['n_title'];
        // $desc = $res['n_description'];

        // $data = array(
        //     "title"=>$title,
        //     "description"=>$desc
        // );
        // $ss = json_encode($data);
        print json_encode($noteArr);
    }


    public function removeLabel(){
 


    }

}
