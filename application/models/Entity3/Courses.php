<?php

namespace Entity;
/**
 * Commnet Model
 *
 * @Entity
 * @Table(name="Courses")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Courses
{

        /** @Id @GeneratedValue @Column(type="integer") */
        private $id;
    /**
     * @ORM\OneToMany(targetEntity="PupilTeacherCourseHasMany", mappedBy="courses",cascade={"your options"} )
     */
    protected $pupilTeacherCourseHasMany;

}