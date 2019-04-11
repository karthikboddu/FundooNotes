<?php

namespace Entity;
/**
 * Pupils Model
 *
 * @Entity
 * @Table(name="Pupils")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Pupils
{

       /** @Id @GeneratedValue @Column(type="integer") */
    private $id;

    /**
     * @ORM\OneToMany(targetEntity="PupilTeacherCourseHasMany", mappedBy="pupils",cascade={"your options"} )
     */
    protected $pupilTeacherCourseHasMany;

}