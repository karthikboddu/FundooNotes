<?php
    class hello extends TestCase{
        public function test_hello(){
            $output = $this->request('GET',['unittest',' ']);
            $expected = '<h2>hello</h2>';
            $this->assertContains($expected,$output);
            $dealer = Phake::mock('dealer');
            
        }
        
    }

?>