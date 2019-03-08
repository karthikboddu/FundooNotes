<?php
require_once '/var/www/html/codeigniter/application/RabbitMq/vendor/autoload.php';
use PhpAmqpLib\Connection\AMQPStreamConnection;

class Receiver{

    public function receiverMail(){
        $connection = new AMQPStreamConnection('localhost',5672,'guest','guest');
        $channel = $connection->channel();

        $channel->queue_declare('hello',false,false,false,true);
        $email = "karthik.b184@gmail.com";
        $password = "Kartik@2357";

        $callback = function($msg){


            $data = json_decode($msg->body,true);
            $to_email = $data['to_email'];
            $subject = $data['subject'];
            $message = $data['message'];

            $transport = (new Swift_SmtpTransport('smtp.gmail.com', 465, 'ssl'))
            ->setUsername($email)
            ->setPassword($password);

            $mailer = new Swift_Mailer($transport);

            $message = (new Swift_Message($subject))
            ->setFrom($email)
            ->setTo([$to_email])
            ->setBody($message);
        /**
         * Send the message
         */
        $result = $mailer->send($message);
        $msg->delivery_info['channel']->basic_ack($msg->delivery_info['delivery_tag']);
        };


        $channel->basic_qos(null, 1, null);
        $channel->basic_consume('hello', '', false, false, false, false, $callback);
         
        while(count($channel->callbacks)) {
            $channel->wait();
        }

    }

}

?>