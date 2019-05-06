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
    protected $collnid;  
    
    /**
     * @ManyToMany(targetEntity="Users",mappedBy="coll_list")
     */
    protected $coluid;
    
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->colnid = new \Doctrine\Common\Collections\ArrayCollection();
        $this->coluid = new \Doctrine\Common\Collections\ArrayCollection();
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
     * Set owneruid
     *
     * @param \Entity\Users $owneruid
     *
     * @return Collaborators
     */
    public function setOwneruid(\Entity\Users $owneruid = null)
    {
        $this->owneruid = $owneruid;

        return $this;
    }

    /**
     * Get owneruid
     *
     * @return \Entity\Users
     */
    public function getOwneruid()
    {
        return $this->owneruid;
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
