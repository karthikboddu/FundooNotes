<?php
require_once '/var/www/html/codeigniter/application/RabbitMq/vendor/autoload.php';
require_once '/var/www/html/codeigniter/application/RabbitMq/receive.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;
use PhpAmqpLib\Message\AMQPMessage;

use PhpAmqpLib\Connection\AMQPConnection;
class Send
{
    public function sendMail($toEmail,$subject,$body){

        $connection = new AMQPConnection('localhost', 5672,'guest', 'guest');
        $channel = $connection->channel();
        $channel->queue_declare('hello', false, false . false, false);

        $data = json_encode(array(
            "from"       => "karthik.b184@gmail.com",
            "from_email" => "karthik.b184@gmail.com",
            "to_email"   => $toEmail,
            "subject"    => $subject,
            "message"    => $body,
        ));



        $msg = new AMQPMessage($data, array('delivery_mode' => 2));

        $channel->basic_publish($msg, '','hello');
        /**
         * calling the receiver
         */
        $obj = new Receiver();

        $obj->receiverMail();
        $channel->close();
        $connection->close();
        return "sent";
    }
}
