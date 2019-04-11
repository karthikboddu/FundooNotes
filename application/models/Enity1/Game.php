<?php
namespace Entity;
/**
 * Labels Model
 *
 * @Entity
 * @Table(name="Game")
 * @author  Joseph Wynn <joseph@wildlyinaccurate.com>
 */
class Game  
{

    /**
     * @var string
     * @Id
     * @Column(name="labelname", type="string")
     * 
     * 
     */
    protected $id;

    /**
     * @OneToMany(targetEntity="Halfmove", mappedBy="game")
     */
    private $halfmoves;



    public function __construct()
    {
        $this->halfmoves = new ArrayCollection();
    }
}