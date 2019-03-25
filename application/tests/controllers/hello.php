<?php
    class hello extends TestCase{
        public function test_hello(){
            $output = $this->request('GET',['unittest','hello']);
            $expected = '<h2>hello</h2>';
            $this->assertContains($expected,$output);
        }
    }

?>