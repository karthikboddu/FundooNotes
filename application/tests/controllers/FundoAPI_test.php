<?php
require_once "/var/www/html/codeigniter/application/controllers/UserData.php";
include "/var/www/html/codeigniter/application/tests/controllers/TeastCaseConstants.php";

class FundoAPI_test extends TestCase
{
    /**
     * variable to the constants
     */
    public $constantClassObj = null;
    public function __construct()
    {
        $this->constantClassObj = new TeastCaseConstants();
    }
/**
 * @method testLogin
 * @description test case for the user login
 */

    public function testLogin()
    {

        $file                 = $this->constantClassObj->loginTestcaseFileName;
        $data                 = file_get_contents($file, true);
        $testCaseExampleArray = json_decode($data, true);

        foreach ($testCaseExampleArray as $key => $value) {
            $_POST['Emailid']    ='karthikb5566@gmail.com';
            $_POST['password'] = '123456';
            $ref               = new UserData();
            $result            = $ref->login();
            $res               = $this->assertEquals($value['expected'], $result);
        }
    }
}