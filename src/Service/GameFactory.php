<?php

namespace App\Service;

use Symfony\Component\Security\Core\Security;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Game;
use App\Entity\User;

class GameFactory extends AbstractFactory {

    private $em;

    public function __construct(
        EntityManagerInterface $em,
        Security $security
    )
    {
        $this->em = $em;
        $this->security = $security;
    }

    public function get(int $id) {
        return $this->em->getRepository(Game::class)->find($id);
    }
    
    public function filter(array $params = []) {

    }

    public function saveGame(array $req = []) {
        $datas = [];

        if(array_key_exists('id', $req)):
            $game = $this->get($req['id']);
        else:
            $game = new Game();
            // Required
            $game->setUser($this->getUser());
            $game->setName($req['name']);
            $game->setMode($req['mode']);
            // $game->setType($req['type']);
            $game->setType(1);
            $game->setStatus(1);
            $game->setNbPlayers(2); // Max 10
            $game->setWellStatus(1);

            // Optionnal
            // $game->setPassword($req['password']);
        endif;
 
        // If Actions
        if(array_key_exists('action', $req) && $req['action'] == 'ready'):
            $refreshPlayers = [];
            $playersInfos = $game->getPlayersInfo() === null ? [] : $game->getPlayersInfo();

            $refreshPlayers[] = [
                'user_id' => $this->getUser()->getId(),
                'isReady' => true
            ];
            
            $playersInfos = array_merge($playersInfos, $refreshPlayers);
            $game->setPlayersInfo($playersInfos);
        endif;

        $this->em->persist($game);
        $this->em->flush();

        $datas = array_merge($game->toArray(), ['progress' => $this->progessGame($game)]);

        return $datas;
    }

    public function progessGame($game) {
        $state = [];

        // Check de tous les joueurs si Ready
        $nbPlayers = $game->getNbPlayers();
        $playersInfo = $game->getPlayersInfo();

        if($nbPlayers == count($playersInfo)):
            $state['nbPlayers'] = 'completed';
            foreach($playersInfo as $playerInfo):
                if(array_key_exists('isReady', $playerInfo) && $playerInfo['isReady']):
                    $state['allPlayersReady'] = $playerInfo['isReady'];
                endif;
            endforeach;
        endif;

        return $state;
    }

}