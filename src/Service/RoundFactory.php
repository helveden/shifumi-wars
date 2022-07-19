<?php

namespace App\Service;

use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Round;
use App\Entity\User;

class RoundFactory {

    private $em;

    public function __construct(
        EntityManagerInterface $em,
        Security $security
    )
    {
        $this->em = $em;
        $this->security = $security;
    }

    public function get($id) {
        return $this->em->getRepository(Round::class)->find($id);
    }
    
    public function filter(array $params = []) {

    }

    public function saveRound(array $req = []) : Round
    {
        if(array_key_exists('id', $req)):
            $round = $this->get($req['id']);
        else:
            $round = new Round();
        endif;
        
        // Required
        $round->setUser($this->security->getUser());

        $this->em->persist($round);
        $this->em->flush();

        return $round;
    }

}