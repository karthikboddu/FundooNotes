<?php

namespace Entity;
/**
 * Commnet Model
 *
 * @Entity
 * @Table(name="Comment")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Comment
{
    /** @Id @GeneratedValue @Column(type="string") */
    private $id;

    /**
     * Bidirectional - Many comments are favorited by many users (INVERSE SIDE)
     *
     * @ManyToMany(targetEntity="User", mappedBy="favorites")
     */
    private $userFavorites;

    /**
     * Bidirectional - Many Comments are authored by one user (OWNING SIDE)
     *
     * @ManyToOne(targetEntity="User", inversedBy="commentsAuthored")
     */
     private $author;
}