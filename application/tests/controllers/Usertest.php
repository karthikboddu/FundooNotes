<?php
include '/var/www/html/codeigniter/application/vendor/autoload.php';

class Usertest extends TestCase{

    private $http;

    public function setUp()
    {
        $this->http = new GuzzleHttp\Client(['base_uri' => 'http://localhost/codeigniter/']);
    }

//     public function tearDown() {
//         $this->http = null;
//     }

    public function testGet()
    {
    $response = $this->http->request('GET', 'testapi');
    $EFD =$response->getStatusCode();
    var_dump($EFD);
    $this->assertEquals(200, $response->getStatusCode());

    // $contentType = $response->getHeaders()["Content-Type"][0];
    // $this->assertEquals("application/json", $contentType);

    // $userAgent = json_decode($response->getBody())->{"loginto"};
    // $this->assertRegexp('/Guzzle/', $userAgent);
}


// public function testPost(){
//     $email = 'karthik.b184@gmail.com';
//     $password = '123456';
//     $data = array(
//         'email'=>$email,
//         'password'=>$password
//     );
    
//     // $request = $this->http->post('loginto',null,json_encode($data));
       
//         $response = $this->http->post('register', ['firstName'=>'BSDFSF','lastName'=>'sdfsdfsdf','Emailid' => 'kar84@gmail.com','password'=>123456]);
//     // $response = $request->send();

 
//     $this->assertEquals(200, $response->getStatusCode());
//     // $this->assertArrayHasKey('email',$data);


// }


}