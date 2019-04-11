<?php

namespace Entity;

use Doctrine\Common\Collections\ArrayCollection;

/**
 * Labelnotes Model
 *
 * @Entity
 * @Table(name="Labelnotes")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Labelnotes
{

    /**
     * @Id
     * @Column(type="string", nullable=false)
     * @GeneratedValue(strategy="AUTO")
     */
    protected $id;

    /**
     * @Column(type="string", length=32, unique=true, nullable=false)
     */
    protected $labelname;

    /**
     * @OneToMany(targetEntity="Labels", mappedBy="labelname")
     */
    protected $users;

    /**
     * Initialize any collection properties as ArrayCollections
     *
     * http://docs.doctrine-project.org/projects/doctrine-orm/en/latest/reference/association-mapping.html#initializing-collections
     *
     */
    public function __construct()
    {
        $this->users = new ArrayCollection;
    }


    /**
     * Get id
     *
     * @return integer
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Group
     */
    public function setName($name)
    {
        $this->name = $name;
        return $this;
    }

    /**
     * Get name
     *
     * @return string
     */
    public function getName()
    {
        return $this->name;
    }

    /**
     * Add users
     *
     * @param Entity\User $users
     * @return Group
     */
    public function addUser(\Entity\User $users)
    {
        $this->users[] = $users;
        return $this;
    }

    /**
     * Get users
     *
     * @return Doctrine\Common\Collections\Collection
     */
    public function getUsers()
    {
        return $this->users;
    }

}
