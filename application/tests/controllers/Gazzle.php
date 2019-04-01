<?php
include '/var/www/html/codeigniter/application/vendor/autoload.php';
class Gazzle extends TestCase{

    public function testPOST()
    {
        // create our http client (Guzzle)
        $client = new  GuzzleHttp\Client(['base_uri' => 'http://localhost/codeigniter/'], array(
            'request.options' => array(
                'exceptions' => false,
            )
        ));
    
        $nickname = 'ObjectOrienter'.rand(0, 999);
        $data = array(
            'nickname' => $nickname,
            'avatarNumber' => 5,
            'tagLine' => 'a test dev!'
        );
    
        $request = $client->post('testapi', null, json_encode($data));

          $response = $request->send();

    $this->assertEquals(201, $response->getStatusCode());
    $this->assertTrue($response->hasHeader('Location'));
    $data = json_decode($response->getBody(true), true);
    $this->assertArrayHasKey('nickname', $data);
}
}