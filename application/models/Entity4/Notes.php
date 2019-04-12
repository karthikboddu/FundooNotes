<?php

namespace Entity;

/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Notes")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Notes
{

	/**
	 * @Id
	 * @Column(type="string", nullable=false)
	 * @GeneratedValue(strategy="AUTO")
	 */
	protected $id;

	// /**
	//  * @Column(type="string", length=32, unique=true, nullable=false)
	//  */
	// protected $labelnam;



	/**
	 * @Column(type="string", length=255, unique=true, nullable=false)
	 */
	protected $emailid;

	/**
	 * @ManyToOne(targetEntity="User")
	 * @JoinColumn(name="user_id", referencedColumnName="id")
	 */
    
	protected $userId;

	
}
