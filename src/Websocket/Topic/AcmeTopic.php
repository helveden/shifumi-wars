<?php

namespace App\Websocket\Topic;

use Gos\Bundle\WebSocketBundle\Client\ClientManipulatorInterface;
use Gos\Bundle\WebSocketBundle\Router\WampRequest;
use Gos\Bundle\WebSocketBundle\Topic\TopicInterface;
use Ratchet\ConnectionInterface;
use Ratchet\Wamp\Topic;

use App\Manager\ManageGame;
use App\Repository\GameRepository;

final class AcmeTopic implements TopicInterface
{
    /** @var ClientManipulatorInterface */
    private $clientManipulator;

    /**
     * @param ClientManipulatorInterface $clientManipulator
     */
    public function __construct(ClientManipulatorInterface $clientManipulator)
    {
        $this->clientManipulator = $clientManipulator;
    }

    /**
     * This will receive any Subscription requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic               $topic
     * @param WampRequest         $request
     */
    public function onSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request): void
    {
        // This will broadcast the message to ALL subscribers of this topic.
        if (!empty($connection->resourceId)) {
            $topic->broadcast([
                'event'   => 'subscribe',
                'user_id' => $connection->resourceId,
                'msg'     => ' has joined ' . $topic->getId()
            ]);
        }
    }

    /**
     * This will receive any UnSubscription requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic               $topic
     * @param WampRequest         $request
     */
    public function onUnSubscribe(ConnectionInterface $connection, Topic $topic, WampRequest $request): void
    {
        //this will broadcast the message to ALL subscribers of this topic.

        if (!empty($connection->resourceId)) {
            $topic->broadcast([
                'event'   => 'unsubscribe',
                'user_id' => $connection->resourceId,
                'msg'     => ' has left ' . $topic->getId()
            ]);
        }
    }

    /**
     * This will receive any Publish requests for this topic.
     *
     * @param ConnectionInterface $connection
     * @param Topic               $topic
     * @param WampRequest         $request
     * @param mixed               $event      The event data
     * @param array               $exclude
     * @param array               $eligible
     */
    public function onPublish(
        ConnectionInterface $connection,
        Topic $topic,
        WampRequest $request,
        $event,
        array $exclude,
        array $eligible
    ): void {
        /*
            https://github.com/GeniusesOfSymfony/WebSocketBundle/blob/2.x/Resources/docs/SessionSetup.md

            $topic->getId() will contain the FULL requested uri, so you can proceed based on that

            if ($topic->getId() == "acme/channel/shout")
               //shout something to all subs.
        */

        if (!empty($connection->resourceId)) {
            $topic->broadcast(array_merge($event, [
                'event'   => 'publish',
                'user_id' => $connection->resourceId
            ]));
        
            if(!empty($event['params']['api'])):

                // Manage Game Here et envoie des données aux joueurs
                $manageGame = new ManageGame($event['params']['api']);
                // On récupère les données envoyé par l'utilisateur, quand il fait un choix on lock les actions user puis on envoi
                // On retourne les résultats
                
                $topic->broadcast(
                    [
                        'event'   => 'test',
                        'type'   => 'log',
                        'msg' => 'ws.test.translation',
                        'game' => $manageGame->getGame(8) // remplacer par un hash de partie > Voir Topic ID $topic->getId() pour gérer cette situation
                    ]
                );
            endif;
        }
        
    }

    /**
     * Like RPC is will use to prefix the channel
     *
     * @return string
     */
    public function getName(): string
    {
        return 'acme.topic';
    }
}
