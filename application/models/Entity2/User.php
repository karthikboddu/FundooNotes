<?php
namespace Entity;
/**
 * User Model
 *
 * @Entity
 * @Table(name="User")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class User
{
    /** @Id @GeneratedValue @Column(type="string") */
    private $id;

    /**
     * Bidirectional - Many users have Many favorite comments (OWNING SIDE)
     *
     * @ManyToMany(targetEntity="Comment", inversedBy="userFavorites")
     * @JoinTable(name="user_favorite_comments")
     */
    private $favorites;

    /**
     * Unidirectional - Many users have marked many comments as read
     *
     * @ManyToMany(targetEntity="Comment")
     * @JoinTable(name="user_read_comments")
     */
    private $commentsRead;

    /**
     * Bidirectional - One-To-Many (INVERSE SIDE)
     *
     * @OneToMany(targetEntity="Comment", mappedBy="author")
     */
    private $commentsAuthored;

    /**
     * Unidirectional - Many-To-One
     *
     * @ManyToOne(targetEntity="Comment")
     */
    private $firstComment;


    public function getReadComments() {
        return $this->commentsRead;
   }

   public function setFirstComment(Comment $c) {
       $this->firstComment = $c;
   }
}