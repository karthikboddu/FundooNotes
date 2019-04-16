<?php

namespace Entity;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Labels")
 */
class Labels{

    /**
	 *  @Id @Column(type="integer") @GeneratedValue
	 * 
	 */
    protected $id;
    /**
	 *  @Column(type="string")
	 *  */
    protected $labelname;

  
    /**
     * @ManyToOne(targetEntity="Users", inversedBy="userid")
     */
    protected $luid;
    

    /**
     * @ManyToMany(targetEntity="Notes",mappedBy="labels")
     */
	protected $labeluid;

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
     * Set labelname
     *
     * @param string $labelname
     *
     * @return Labels
     */
    public function setLabelname($labelname)
    {
        $this->labelname = $labelname;

        return $this;
    }

    /**
     * Get labelname
     *
     * @return string
     */
    public function getLabelname()
    {
        return $this->labelname;
    }

    /**
     * Set luid
     *
     * @param \Entity\Users $luid
     *
     * @return Labels
     */
    public function setLuid(\Entity\Users $luid = null)
    {
        $this->luid = $luid;

        return $this;
    }

    /**
     * Get luid
     *
     * @return \Entity\Users
     */
    public function getLuid()
    {
        return $this->luid;
    }
}
