<?php
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: Authorization");
include '/var/www/html/codeigniter/application/libraries/predis/autoload.php';


class RedisConn{
    public function connection(){
        $client = new Predis\Client(array(
            'host' => '127.0.0.1',
            'port' => 6379,
            'password' => null,
          ));

          return $client;
    }
}







?>