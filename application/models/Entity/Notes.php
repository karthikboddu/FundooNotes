<?php


namespace Entity;

/**
 * Notes Model
 *
 * @Entity
 * @Table(name="Notes")
 */
class Notes{

	/**
	 * @Id
	 * @Column(type="integer", nullable=false)
	 * @GeneratedValue(strategy="AUTO")
	 */
    protected $id;

    /**
	 * @Column(type="string", nullable=false)
	 */
    protected $title;

     /**
	 * @Column(type="string", nullable=false)
	 */
    protected $description;

	/**
	 * @ManyToOne(targetEntity="Users")
	 * @JoinColumn(name="user_id", referencedColumnName="id")
	 */
    protected $user_id;


    // protected $reminder;

    // protected $color;

}


?>