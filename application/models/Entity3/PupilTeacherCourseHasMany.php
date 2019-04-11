<?php

namespace Entity;
/**
 * PupilTeacherCourseHasMany Model
 *
 * @Entity
 * @Table(name="PupilTeacherCourseHasMany")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class PupilTeacherCourseHasMany
{
        /** @Id @GeneratedValue @Column(type="integer") */
        private $id;
    /**
     * @ORM\ManyToOne(targetEntity="Pupils", cascade={"your options"})
     * @ORM\JoinColumn(name="pupil_id", referencedColumnName="id")
     */
    protected $pupils;

    /**
     * @ORM\ManyToOne(targetEntity="Teachers", cascade={"your options"})
     * @ORM\JoinColumn(name="teacher_id", referencedColumnName="id")
     */
    protected $teachers;


    /**
     * @ORM\ManyToOne(targetEntity="Courses", cascade={"your options"})
     * @ORM\JoinColumn(name="course_id", referencedColumnName="id")
     */
    protected $courses;
}