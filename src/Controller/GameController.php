<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class GameController extends AbstractController
{
    /**
     * @Route("/game", name="app_game")
     */
    public function index(): Response
    {
        die();
        return $this->render('game/index.html.twig', [
            'controller_name' => 'GameController',
        ]);
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
