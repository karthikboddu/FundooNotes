<?php
include '/var/www/html/codeigniter/application/tests/controllers/TeastCaseConstants.php';
include '/var/www/html/codeigniter/application/controllers/UserData.php';
include '/var/www/html/codeigniter/application/vendor/autoload.php';
class Fundoo extends TestCase
{
    /**
     * variable to the constants
     */
    public $constantClassObj = null;
    public function __construct()
    {
        $this->constantClassObj = new TeastCaseConstants();
    }
    public function testLogin()
    {

        $file = $this->constantClassObj->loginTestcaseFileName;
        $data = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);

        foreach ($testCaseExampleArray as $key => $value) {
            $_POST['Emailid'] = $value['testEmail'];
            var_dump($value['testEmail']);
            $_POST['password'] = $value['password'];
            $ref = new UserData();
            $result = $ref->login();
            $res = $this->assertEquals($value['expected'], $result);
        }
    }
}
