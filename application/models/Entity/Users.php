<?php


namespace Entity;

/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Users")
 */
class Users{

 	/**
	 * @Id
	 * @Column(type="integer", nullable=false)
	 * @GeneratedValue(strategy="AUTO")
	 */
    protected $id;

     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $fname;


    /**
	 * @Column(type="string", nullable=false)
	 */
    protected $lname;


    /**
	 * @Column(type="string", nullable=false)
	 */
    protected $emailid;


    /**
     * @OneToMany(targetEntity="Notes", mappedBy="")
     */
    protected $user_id;

     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $password;
    


}

?>