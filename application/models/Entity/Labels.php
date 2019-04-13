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

	protected $labelssss;

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
}
