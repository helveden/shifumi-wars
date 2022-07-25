<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

use App\Entity\Game;
class DefaultController extends AbstractController
{
    /**
     * @Route("/", name="app_default")
     */
    public function index(): Response
    {
        $datas = [];
        $datas['allmode'] = Game::getAllMode();
        $datas['alltype'] = Game::getAllType();
        $datas['allchoice'] = Game::getAllChoice();
        
        return $this->render('default/index.html.twig', $datas);
    }
}
