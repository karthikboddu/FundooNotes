<?php
namespace Entity;

/**
* Labels Model
*
* @Entity
* @Table(name="halfmove")
* @author  Joseph Wynn <joseph@wildlyinaccurate.com>
*/
class Halfmove
{
    /**
     * @var string
     * @Id
     * @Column(name="name", type="string")
     * 
     */
    protected $id;

    /**
     * @ManyToOne(targetEntity="Game", inversedBy="halfmoves")
     * @ORM\JoinColumn(name="game", referencedColumnName="name")
     */
    private $game;

    public function getGame(){
        return $this->game;
    }

    public function setGame($game){
        $this->game = $game;
    }
}