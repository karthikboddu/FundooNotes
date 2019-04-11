<?php


namespace Entity;
/**
 * Teachers Model
 *
 * @Entity
 * @Table(name="Teachers")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Teachers
{


        /** @Id @GeneratedValue @Column(type="integer") */
        private $id;
    /**
     * @ORM\OneToMany(targetEntity="PupilTeacherCourseHasMany", mappedBy="teachers",cascade={"your options"} )
     */
    protected $pupilTeacherCourseHasMany;

}