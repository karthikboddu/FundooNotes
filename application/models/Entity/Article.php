<?php
namespace Entity;

/**
 * User Model
 *
 * @Entity
 * @Table(name="Article")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Article{


    /**
	 * @Id
	 * @Column(type="integer", nullable=false)
	 * @GeneratedValue(strategy="AUTO")
	 */
    private $id;


    /**
	 * @Column(type="string", length=32, unique=true, nullable=false)
	 */
    private $title;

    
    /**
	 * @Column(type="string", length=32, unique=true, nullable=false)
	 */
    private $author;



}