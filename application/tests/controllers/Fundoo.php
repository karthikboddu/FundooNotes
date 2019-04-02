<?php
include '/var/www/html/codeigniter/application/vendor/autoload.php';
class Fundoo extends TestCase
{
    protected $client;

    public function setUp()
    {
        $this->http = new GuzzleHttp\Client(['base_uri' => 'http://localhost/codeigniter/'], array(
            'request.options' => array(
                'exceptions' => false,
            ),
        ));

    }

    public function testPost()
    {
        $request = $this->http->post('loginto', [
            'form_params' => [
                'Emailid' => 'karthik.184@gmail.com',
                'password' => '123546',
            ],
        ]);
        // $response = $this->client->request('testapi', null,[
        //     'form_params' => [
        //         'email' => 'someone@example.com',
        //         'phone' => '0400000000'
        //     ]
        // ]);

        $stream = $request->getBody();
        $contents = json_decode($stream);
        $res = $contents[0];
        var_dump($contents);
        $this->assertEquals("200", $res);
        // $request = $this->http->post('loginto',[
        //     'form_params' => [
        //         'Emailid' => 'karthikb5566@gmail.com',

        //     ]
        // ]);
        // // var_dump($request);

        // $this->assertEquals(400, $request->getStatusCode(), 'Missing phone parameter should return 400 error');

    }


    public function testRegister(){
        $request = $this->http->post('register', [
            'form_params' => [
                'firstName'=>'barry',
                'lastName'=>'allen',
                'Emailid' => 'flash@gmail.com',
                'password' => 'flash',
            ],
        ]);

        $stream = $request->getBody();
        $contents = json_decode($stream);
        $res = $contents[0];
        var_dump($contents);
        $this->assertEquals("200", $res);

    }
}
