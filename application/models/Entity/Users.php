<?php


namespace Entity;
use Doctrine\Common\Collections\ArrayCollection;
/**
 * Labels Model
 * @Entity
 * @Table(name="Users")
 */
class Users{

    /**
     * @Id @GeneratedValue @Column(type="integer")
     * @var string
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
	 * @Column(type="string", nullable=false)
	 */
    protected $password;

    /**
     * 
     * @OneToMany(targetEntity="Notes",mappedBy="uid" )
     */
    protected $user_id;


    /**
     * 
     * @OneToMany(targetEntity="Labels",mappedBy="labelssss" )
     */
    protected $label_list;

    public function __construct()
    {
        $this->user_id = new ArrayCollection;
        $this->label_list = new ArrayCollection();
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
     * Set fname
     *
     * @param string $fname
     *
     * @return Users
     */
    public function setFname($fname)
    {
        $this->fname = $fname;

        return $this;
    }

    /**
     * Get fname
     *
     * @return string
     */
    public function getFname()
    {
        return $this->fname;
    }

    /**
     * Set lname
     *
     * @param string $lname
     *
     * @return Users
     */
    public function setLname($lname)
    {
        $this->lname = $lname;

        return $this;
    }

    /**
     * Get lname
     *
     * @return string
     */
    public function getLname()
    {
        return $this->lname;
    }

    /**
     * Set emailid
     *
     * @param string $emailid
     *
     * @return Users
     */
    public function setEmailid($emailid)
    {
        $this->emailid = $emailid;

        return $this;
    }

    /**
     * Get emailid
     *
     * @return string
     */
    public function getEmailid()
    {
        return $this->emailid;
    }

    /**
     * Set password
     *
     * @param string $password
     *
     * @return Users
     */
    public function setPassword($password)
    {
        $this->password = $password;

        return $this;
    }

    /**
     * Get password
     *
     * @return string
     */
    public function getPassword()
    {
        return $this->password;
    }

    /**
     * Add userId
     *
     * @param \Entity\Notes $userId
     *
     * @return Users
     */
    public function addUserId(\Entity\Notes $userId)
    {
        $this->user_id[] = $userId;

        return $this;
    }

    /**
     * Remove userId
     *
     * @param \Entity\Notes $userId
     */
    public function removeUserId(\Entity\Notes $userId)
    {
        $this->user_id->removeElement($userId);
    }

    /**
     * Get userId
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getUserId()
    {
        return $this->user_id;
    }

    /**
     * Add labelList
     *
     * @param \Entity\Labels $labelList
     *
     * @return Users
     */
    public function addLabelList(\Entity\Labels $labelList)
    {
        $this->label_list[] = $labelList;

        return $this;
    }

    /**
     * Remove labelList
     *
     * @param \Entity\Labels $labelList
     */
    public function removeLabelList(\Entity\Labels $labelList)
    {
        $this->label_list->removeElement($labelList);
    }

    /**
     * Get labelList
     *
     * @return \Doctrine\Common\Collections\Collection
     */
    public function getLabelList()
    {
        return $this->label_list;
    }
}
