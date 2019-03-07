<?php
require_once '/var/www/html/codeigniter/application/RabbitMQ/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

$connection = new AMQPStreamConnection('localhost',15672,'guest','guest');
$channel = $connection->channel;

$channel->queue_declare('hello',false,false,false,false);

$msg = new AMQPMessage('Hello world');

$channel->basic_publish($msg,'','hello');

echo "sent hello world";

$connection->close();
$channel->close();


?>