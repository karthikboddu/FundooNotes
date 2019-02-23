<?php
defined('BASEPATH') OR exit('No direct script access allowed');

class Welcome extends CI_Controller {

	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see https://codeigniter.com/user_guide/general/urls.html
	 */
	public function __construct()
    {
		parent::__construct();
		$this->load->model('login');
    }
	public function index()
	{
		$this->load->view('welcome_message');
	}

	public function add()
	{
		$request= json_decode(file_get_contents('php://input'), TRUE);
		$data=$this->login->insert_form($request);
		if($data)
		{
		   echo "success";
		}else{
		   echo "failure";
		}
		//  $this->fetchdata();   

	}

	public function verify(){
		$request= json_decode(file_get_contents('php://input'));
		$email = $request->email;
		$text ='';
		if($email!=''){
			$sel = $this->db->query("SELECT  count(*) as all from registration where email = '$email' ")->row();
			$text = "Available";
			if($sel['all']>0){
				$text = "Not available";
			}
		}

		echo $text;

	}


	public function fetchdata()
	{
		// $data['fetchdata']=$this->ektreemodel->get_users();
		// $this->load->view('fetchangulardata',$data);
		 $result=$this->db->get('registration')->result();
		 $arr_data=array();
		 $i=0;
		 foreach($result as $row)
		 {
		
			 $arr_data[$i]['firstname']=$row->firstname;
			 $arr_data[$i]['lastname']=$row->lastname;
			 
		   $i++;  
		 }
		
		 echo json_encode($arr_data);
	} 

	public function login(){
		$request = json_decode(file_get_contents('php://input'),true);
		$data = $this->login->find($request);
	}
	
}

