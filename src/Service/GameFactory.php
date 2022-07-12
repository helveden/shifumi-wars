<?php

namespace App\Service;

use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Game;
use App\Entity\User;

class GameFactory {

    private $em;

    public function __construct(
        EntityManagerInterface $em,
        Security $security
    )
    {
        $this->em = $em;
        $this->security = $security;
    }
    
    public function createGame($req = []) {
        $game = new Game();

        $game->setName($req['name']);
        $game->setMode($req['mode']);
        // $game->setType($req['type']);
        $game->setType(1);
        $game->setStatus(1);
        $game->setWellStatus(1);
        // $game->setPassword($req['password']);

        $game->setUser($this->security->getUser());

        $this->em->persist($game);
        $this->em->flush();

        return $game;
    }
    
    public function saveGame($req = []) {
        
    }

}