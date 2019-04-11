<?php
defined('BASEPATH') or exit('No direct script access allowed');

class Doctrinetest extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('doctrine');
    }

    public function user() {
        $em = $this->doctrine->em;
        $query = $em->createQuery('
        SELECT p,c FROM \Entity\User p
        JOIN p.group c
        ');
        $result = $query->getResult();


    //     $query = $em->createQuery(
    //         'SELECT p, c FROM \Entity\Labels p
    //         LEFT	JOIN p.emailid c
    //         ');
    // $result =  $query->getResult();
    // print_r($result[0]);

//     $qb = $em->createQueryBuilder();
//     $qb->select('p', 't', 'c')
//     ->from('Entity/Pupils', 'p')
//     ->leftJoin('Entity/PupilTeacherCourseHasMany ptc')
//     ->innerJoin('ptc.teachers', 't')
//     ->innerJoin('ptc.courses', 'c')
// ;
// $res = $qb->getQuery()->getResult();


    }
    


}