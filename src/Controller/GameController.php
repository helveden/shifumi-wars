<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Game;
use App\Repository\GameRepository;

use Symfony\Component\Serializer\SerializerInterface; 

class GameController extends AbstractController
{
    /**
     * @Route("/game", name="app_game")
     */
    public function index(GameRepository $gameRepo): Response
    {
        $datas = [];
        
        $datas['games'] = $gameRepo->findAll();
        return $this->json($datas);
    }

    /**
     * @Route("/game/create", name="app_game_create")
     */
    public function create(Request $request, EntityManagerInterface $entityManager): Response
    {
        $datas = [];
        $game = new Game();
        $req = (array) json_decode($request->getContent());

        $game->setName($req['name']);
        $game->setMode($req['mode']);
        //$game->setType($req['type']);
        $game->setType(1);
        $game->setStatus(1);
        $game->setWellStatus(1);
        // $game->setPassword($req['password']);

        $game->setUser($this->getUser());

        $entityManager->persist($game);
        $entityManager->flush();
        $datas['game'] = $game->getId();
        // Insertion du joueur dans le jeux

        return $this->json($datas);
    }

    /**
     * @Route("/game/new-player", name="app_game_new_player")
     */
    public function newPlayer(Request $request): Response
    {
        $datas = [];

        // dump($request->getContent());die;

        // Insertion du joueur dans le jeux

        return $this->json($datas);
    }
}
