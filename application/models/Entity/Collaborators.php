<?php

namespace Entity;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Collaborator")
 */
class Collaborators{

    /**
	 *  @Id @Column(type="integer") @GeneratedValue
	 * 
	 */
    protected $id;

    // /**
	//  * 
    //  *  @Column(type="integer")
	 
    //  * */
    // protected $collEmail;

    /**
     * @ManyToOne(targetEntity="Users", inversedBy="userid")
     */
    protected $cuid;


        /**
     * @ManyToOne(targetEntity="Users", inversedBy="userid")
     */
    protected $owneruid;

    /**
     * @ManyToMany(targetEntity="Notes",mappedBy="collaborate")
     */
    protected $colnid;  
    
    /**
     * @ManyToMany(targetEntity="Users",mappedBy="coll_list")
     */
    protected $coluid;
    

    /**
     * Constructor
     */
    public function __construct()
    {
        $this->collid = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set ownerEmail
     *
     * @param string $ownerEmail
     *
     * @return Collaborators
     */
    public function setOwnerEmail($ownerEmail)
    {
        $this->ownerEmail = $ownerEmail;

        return $this;
    }

    /**
     * Get ownerEmail
     *
     * @return string
     */
    public function getOwnerEmail()
    {
        return $this->ownerEmail;
    }

    /**
     * Set collEmail
     *
     * @param string $collEmail
     *
     * @return Collaborators
     */
    public function setCollEmail($collEmail)
    {
        $this->collEmail = $collEmail;

        return $this;
    }

    /**
     * Get collEmail
     *
     * @return string
     */
    public function getCollEmail()
    {
        return $this->collEmail;
    }

    /**
     * Set cuid
     *
     * @param \Entity\Users $cuid
     *
     * @return Collaborators
     */
    public function setCuid(\Entity\Users $cuid = null)
    {
        $this->cuid = $cuid;

        return $this;
    }

    /**
     * Get cuid
     *
     * @return \Entity\Users
     */
    public function getCuid()
    {
        return $this->cuid;
    }

    /**
     * Add collid
     *
     * @param \Entity\Notes $collid
     *
     * @return Collaborators
     */
    public function addCollid(\Entity\Notes $collid)
    {
        $this->collid[] = $collid;

        return $this;
    }

    /**
     * Remove collid
     *
     * @param \Entity\Notes $collid
     */
    public function removeCollid(\Entity\Notes $collid)
    {
        $this->collid->removeElement($collid);
    }

    /**
     * Get collid
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getCollid()
    {
        return $this->collid;
    }

    /**
     * Add colnid
     *
     * @param \Entity\Notes $colnid
     *
     * @return Collaborators
     */
    public function addColnid(\Entity\Notes $colnid)
    {
        $this->colnid[] = $colnid;

        return $this;
    }

    /**
     * Remove colnid
     *
     * @param \Entity\Notes $colnid
     */
    public function removeColnid(\Entity\Notes $colnid)
    {
        $this->colnid->removeElement($colnid);
    }

    /**
     * Get colnid
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getColnid()
    {
        return $this->colnid;
    }

    /**
     * Add coluid
     *
     * @param \Entity\Users $coluid
     *
     * @return Collaborators
     */
    public function addColuid(\Entity\Users $coluid)
    {
        $this->coluid[] = $coluid;

        return $this;
    }

    /**
     * Remove coluid
     *
     * @param \Entity\Users $coluid
     */
    public function removeColuid(\Entity\Users $coluid)
    {
        $this->coluid->removeElement($coluid);
    }

    /**
     * Get coluid
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getColuid()
    {
        return $this->coluid;
    }
}
