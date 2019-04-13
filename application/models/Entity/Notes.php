<?php


namespace Entity;
use Doctrine\Common\Collections\ArrayCollection;
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
     * @ManyToOne(targetEntity="Users", inversedBy="userid")
     */
	protected $uid;


    /**
     * @ManyToMany(targetEntity="Labels")
     */
    protected $labels;
    // protected $reminder;

	// protected $color;


	public function __construct()
    {
        $this->labels = new ArrayCollection();
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
     * Set title
     *
     * @param string $title
     *
     * @return Notes
     */
    public function setTitle($title)
    {
        $this->title = $title;

        return $this;
    }

    /**
     * Get title
     *
     * @return string
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * Set description
     *
     * @param string $description
     *
     * @return Notes
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string
     */
    public function getDescription()
    {
        return $this->description;
    }

    /**
     * Set uid
     *
     * @param \Entity\Users $uid
     *
     * @return Notes
     */
    public function setUid(\Entity\Users $uid = null)
    {
        $this->uid = $uid;

        return $this;
    }

    /**
     * Get uid
     *
     * @return \Entity\Users
     */
    public function getUid()
    {
        return $this->uid;
    }

    /**
     * Add label
     *
     * @param \Entity\Labels $label
     *
     * @return Notes
     */
    public function addLabel(\Entity\Labels $label)
    {
        $this->labels[] = $label;

        return $this;
    }

    /**
     * Remove label
     *
     * @param \Entity\Labels $label
     */
    public function removeLabel(\Entity\Labels $label)
    {
        $this->labels->removeElement($label);
    }

    /**
     * Get labels
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLabels()
    {
        return $this->labels;
    }
}
