<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Repository\GameRepository;
use App\Repository\UserRepository;
use App\Repository\RoundRepository;


class ApiController extends AbstractController
{
    /**
     * @Route("/api/game/{id}", name="app_api_game")
     */
    public function getGame(GameRepository $gameRepo, $id): Response
    {
        $datas = [];
        $datas['game'] = $gameRepo->find($id)->toArray();
        return $this->json($datas);
    }

    /**
     * @Route("/api/round/{id}", name="app_api_round")
     */
    public function getRound(RoundRepository $roundRepo, $id): Response
    {
        $datas = [];
        $datas['round'] = $roundRepo->find($id)->toArray();
        return $this->json($datas);
    }
}
