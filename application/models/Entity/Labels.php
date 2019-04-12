<?php

namespace Entity;

/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Labels")
 */
class Labels{

    /**
	 * @Id
	 * @Column(type="integer", nullable=false)
	 * @GeneratedValue(strategy="AUTO")
	 */
    protected $id;

    /**
	 * @Column(type="string", nullable=false)
	 */
    protected $labelname;

     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $emailid;

}

?>