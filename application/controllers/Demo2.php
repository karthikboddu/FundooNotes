<?php
defined('BASEPATH') OR exit('No direct script access allowed');

require(APPPATH . '/libraries/REST_Controller.php');
require(APPPATH . '/libraries/Format.php');

use Restserver\Libraries\REST_Controller;


class Demo2 extends REST_Controller{
    function __construct(){
        parent::__construct();
    }
    public function demo1_get(){
        echo 'demo 1';
    }
}

?>