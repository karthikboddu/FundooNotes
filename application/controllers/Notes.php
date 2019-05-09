<?php

header("Access-Control-Allow-Headers: Authorization");
header('Access-Control-Allow-Headers: X-Requested-With, Content-Type, Accept, Origin, Authorization
');
header("Access-Control-Request-Method: POST");
defined('BASEPATH') or exit('No direct script access allowed');
include "/var/www/html/codeigniter/application/service/NoteService.php";

class Notes extends CI_Controller
{
    private $refService = "";


    /**
     * @description create an instance of service methods
     */
    public function __construct()
    {
        parent::__construct();
        $this->refService = new NoteService();
    }

    public function createNotes(){
        $id = $_POST['id'];
        $title = $_POST['title'];
        $desc = $_POST['desc'];
        $rem = $_POST['remainder'];
        $color = $_POST['color'];
        $labelid = $_POST['labelid'];
        $notesres = $this->refService->addNotes($id,$title,$desc,$rem,$color,$labelid);
        return $notesres;
    }


    public function fetchNotes(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $email = $_POST['id'];
        $this->refService->noteFetch($email);
        }
    }


    
    public function notesDrapDrop(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $uid = $_POST['uid'];
        $diff = $_POST['diff'];
        $currId = $_POST['currId'];
        $direction = $_POST['direction'];    
        $this->refService->dragDropNotes($uid,$diff,$currId,$direction);
        }
    }


    public function updateNotes(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $title = $_POST['title'];
        $desc = $_POST['description'];
        $id = $_POST['uid'];
        $color = $_POST['color'];
        $this->refService->notesUpdate($title,$desc,$id,$color);
        }
    }
    public function setColor(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['id'];
        $color = $_POST['color'];
        $flag = $_POST['flag'];
        $this->refService->colorSet($id,$color,$flag);
        }
    }

    public function noteTrash(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['id'];
        $this->refService->trashNote($id);
        }
    }

    public function deleteNote(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['id'];
        $this->refService->noteDelete($id);
        }
    }
    
    public function noteRestore(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['id'];
        $this->refService->notesRestore($id);
        }
    }

    public function notefetch(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['id'];
        $this->refService->fetchnote($id);   
        }
    }

    public function changetimedate(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['id'];
        $datetime = $_POST['presentDateTime'];
        $this->refService->updatedate($id,$datetime);
        }
    }

    public function reminderDelete(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['id'];
        $datetime = $_POST['presentDateTime'];
        $this->refService->reminderDelete($id);
    }
    }


    public function labelsfetch(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $id = $_POST['id'];
        $this->refService->labelscomp($id);
        }
    }

    public function noteImage(){
        $post = $_POST;
        if(empty($post)){
            return;
        }else{
        $base64 = $_POST['base64'];
        $uid = $_POST['uid'];
        $nid = $_POST['noteid'];
        $this->refService->imageNote($base64,$uid,$nid);
        }
    }

}