<?php
/**
 * purpose   : program to implement api for login and register
 * @author   : karthik
 * @version  : 1.0
 * @since    : 24-02-2019
 ***********************************************************************************/

defined('BASEPATH') or exit('No direct script access allowed');

class Signin extends CI_Controller
{
    public function __construct()
    {
        parent::__construct();
        $this->load->model('login');
    }

    /**
     * function to register user
     */
    public function add()
    {
        $request = json_decode(file_get_contents('php://input'), true);

        $message = '';
        $validation_error = '';

        //validation on given user input
        if (empty($request['fname'])) {
            $error[] = 'Name is Required';
        } else {
            $data[':name'] = $request['fname'];
        }

        if (empty($request['email'])) {
            $error[] = 'Email is Required';
        } else {
            if (!filter_var($request['email'], FILTER_VALIDATE_EMAIL)) {
                $error[] = 'Invalid Email Format';
            } else {
                $data[':email'] = $request['email'];
            }
        }

        //validate password and confirm password are equal
        if (!($request['password'] == $request['cpassword'])) {
            $error[] = 'password should be same';
        }
        if (empty($request['password'])) {
            $error[] = 'Password is Required';
        } else {
            $data[':password'] = password_hash($request['password'], PASSWORD_DEFAULT);
        }

        //if the error array is empty then register

        if (empty($error)) {
            $data = $this->login->insert_form($request);
            if ($data) {
                $message = 'Registration Completed';
            }
            //  $this->fetchdata();
        } else {
            $validation_error = implode(", ", $error);
        }

        $output = array(
            'error' => $validation_error,
            'message' => $message,
        );

        echo json_encode($output);

    }

    public function verify()
    {
        $request = json_decode(file_get_contents('php://input'));
        $email = $request->email;
        $text = '';
        if ($email != '') {
            $sel = $this->db->query("SELECT  count(*) as all from registration where email = '$email' ")->row();
            $text = "Available";
            if ($sel['all'] > 0) {
                $text = "Not available";
            }
        }

        echo $text;

    }

    public function logout()
    {

    }

    /**
     * function to login user with email and password
     */
    public function login()
    {
        $form_data = json_decode(file_get_contents("php://input"));
        $validation_error = '';

        //validate user email and password
        if (empty($form_data->email)) {
            $errr[] = 'Email is Required';
        } else {
            if (!filter_var($form_data->email, FILTER_VALIDATE_EMAIL)) {
                $errr[] = 'Invalid Email Format';
            } else {
                $data[':email'] = $form_data->email;
            }
        }

        if (empty($form_data->password)) {
            $errr[] = 'Password is Required';
        }

        //if the error array is empty then login
        if (empty($errr)) {
            $data = $this->login->find($form_data);
            // $name = $this->login->findname($form_data);
            if (!$data) {
                $errr[] = 'entered wrong details';
                $validation_error = implode(", ", $errr);
            }
            // $mess = $name;

        } else {
            $validation_error = implode(", ", $errr);
        }

        $output = array(
            'errr' => $validation_error,

        );

        echo json_encode($output);
    }
}
