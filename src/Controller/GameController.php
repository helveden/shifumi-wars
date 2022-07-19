<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;
use Doctrine\ORM\EntityManagerInterface;

use App\Entity\Game;
use App\Repository\GameRepository;
use App\Repository\UserRepository;


use App\Service\GameFactory;

use Symfony\Component\Serializer\SerializerInterface; 

class GameController extends AbstractController
{
    private $gameFactory;

    public function __construct(GameFactory $gameFactory)
    {
        $this->gameFactory = $gameFactory;
    }

    /**
     * @Route("/games", name="app_games")
     */
    public function index(GameRepository $gameRepo): Response
    {
        $datas = [];
        
        $datas['games'] = $gameRepo->findAll();
        return $this->json($datas);
    }
    /**
     * @Route("/game/show/{id}", name="app_game_show")
     */
    public function show(GameRepository $gameRepo, UserRepository $userRepo, $id): Response
    {
        $datas = [];
        $datas['game'] = $gameRepo->find($id);
        $datas['players'] = $userRepo->findBy(['id' => $datas['game']->getPlayers()]);
        return $this->json($datas);
    }
    /**
     * @Route("/game/play/{id}", name="app_game_play")
     */
    public function play(GameRepository $gameRepo, UserRepository $userRepo, EntityManagerInterface $entityManager, $id): Response
    {
        $datas = [];

        $game = $gameRepo->find($id);
        
        if(!in_array($this->getUser()->getId(), $game->getPlayers())):
            $players = array_merge($game->getPlayers(), [$this->getUser()->getId()]);
            $game->setPlayers($players);

            $entityManager->persist($game); 
            $entityManager->flush();
            
        endif;

        $datas['game'] = $game->toArray();
        $datas['room'] = $id;
        $datas['players'] = $userRepo->getArray(['id' => $game->getPlayers()]);
        
        return $this->render('game/index.html.twig', $datas);
    }

    /**
     * @Route("/game/create", name="app_game_create")
     */
    public function create(Request $request, EntityManagerInterface $entityManager): Response
    {
        $datas = [];
        $req = (array) json_decode($request->getContent());
        $game = $this->gameFactory->saveGame($req);

        $datas['game'] = $game;
        // Insertion du joueur dans le jeux

        return $this->json($datas);
    }

    /**
     * @Route("/game/update/{id}", name="app_game_update")
     */
    public function update(
        Request $request, 
        EntityManagerInterface $entityManager,
        $id
    ): Response
    {
        $datas = [];
        $req = (array) json_decode($request->getContent());
        $req['id'] = $id;
        $datas['game'] = $this->gameFactory->saveGame($req);
        

        return $this->json($datas);
    }
}
