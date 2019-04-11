<?php
namespace Entity;
/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Labels")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Labels
{
    /**@Id  @GeneratedValue @Column(type="integer") */
    private $id;

    /**
     * Bidirectional - Many users have Many favorite comments (OWNING SIDE)
     *
     * @ManyToMany(targetEntity="Labelnotes", inversedBy="labelnot")
     * @JoinTable(name="labelmap")
     */
    private $labelname;

    /**
     * Bidirectional - One-To-Many (INVERSE SIDE)
     *
     * @OneToMany(targetEntity="Labelnotes", mappedBy="noteid")
     */
    private $emailid;

    
}