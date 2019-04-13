<?php
defined('BASEPATH') or exit('No direct script access allowed');

use Doctrine\ORM\EntityRepository;
class Doctrinetest extends CI_Controller
{

    public function __construct()
    {
        parent::__construct();
        $this->load->library('doctrine');
    }

 
    public function product(){
        
        $em = $this->doctrine->em;
        $productRepository = $em->getRepository('Product');
        $products = $productRepository->findAll();
        foreach ($products as $product) {
            echo sprintf("-%s\n", $product->getName());
        }
    }

    public function user() {
        $em = $this->doctrine->em;
        $query = $em->createQuery('
        SELECT p,c FROM \Entity\Labels p
        JOIN p.labelname c
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