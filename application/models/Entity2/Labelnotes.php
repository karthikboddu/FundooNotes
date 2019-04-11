<?php
namespace Entity;
/**
 * Labelnotes Model
 *
 * @Entity
 * @Table(name="Labelnotes")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Labelnotes
{
    /** @Id @GeneratedValue @Column(type="integer") */
    private $id;


 /**
     * Bidirectional - Many comments are favorited by many users (INVERSE SIDE)
     *
     * @ManyToMany(targetEntity="Labels", mappedBy="labelname")
     */
    private $labelnot;

    /**
     * Bidirectional - Many Comments are authored by one user (OWNING SIDE)
     *
     * @ManyToOne(targetEntity="Labels", inversedBy="emailid")
     */
    private $noteid;
}