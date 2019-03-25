<?php
class Result_test extends TestCase{
    public function test_get_msg(){
        $output = $this->request('GET',['Unittest','get_msg']);
        $expected = "succesfully get result from model";

        $this->assertEquals($expected,$output);
    }
}