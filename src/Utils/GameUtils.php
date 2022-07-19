<?php

namespace App\Utils;

class GameUtils {

    private const ROCK_ID     = 1;
    private const SCISSORS_ID = 2;
    private const PAPER_ID    = 3;
    private const LIZARD_ID   = 4;
    private const SPOCK_ID    = 5;

    private const CHOICE_ROCK     = [
        'id' => self::ROCK_ID,
        'strong' => [
            self::SCISSORS_ID
        ],
        'low' => [
            self::PAPER_ID
        ],
        'mode' => [
            self::GAME_MODE_CLASSIC, 
            self::GAME_MODE_EXTENDED
        ]
    ];
    
    private const CHOICE_SCISSORS = [
        'id' => self::SCISSORS_ID,
        'strong' => [
            self::PAPER_ID
        ],
        'low' => [
            self::ROCK_ID
        ],
        'mode' => [
            self::GAME_MODE_CLASSIC, 
            self::GAME_MODE_EXTENDED
        ]
    ];

    private const CHOICE_PAPER    = [
        'id' => self::PAPER_ID,
        'strong' => [
            self::ROCK_ID
        ],
        'low' => [
            self::SCISSORS_ID
        ],
        'mode' => [
            self::GAME_MODE_CLASSIC, 
            self::GAME_MODE_EXTENDED
        ]
    ];

    private const CHOICE_LIZARD   = [
        'id' => self::LIZARD_ID,
        'strong' => [],
        'mode' => [
            self::GAME_MODE_EXTENDED
        ]
    ];

    private const CHOICE_SPOCK    = [
        'id' => self::SPOCK_ID,
        'strong' => [],
        'mode' => [
            self::GAME_MODE_EXTENDED
        ]
    ];

    private const GAME_MODE_EMPTY    = 0;
    private const GAME_MODE_CLASSIC  = 1;
    private const GAME_MODE_EXTENDED = 2;

    private const GAME_TYPE_EMPTY    = 0;
    private const GAME_TYPE_PRACTICE = 1;
    private const GAME_TYPE_1V1      = 2;
    private const GAME_TYPE_TOURNOI  = 3;
    private const GAME_TYPE_SURVIVAL = 4;
    

    public const ALL_CHOICE = [
        self::CHOICE_ROCK,
        self::CHOICE_SCISSORS,
        self::CHOICE_PAPER,
        self::CHOICE_LIZARD,
        self::CHOICE_SPOCK
    ];

    public const ALL_MODE = [
        self::GAME_MODE_EMPTY    => 'game.fields.mode.options.empty',
        self::GAME_MODE_CLASSIC  => 'game.fields.mode.options.classic',
        self::GAME_MODE_EXTENDED => 'game.fields.mode.options.extend'
    ];
    
    public const ALL_TYPE = [
        self::GAME_TYPE_EMPTY    => 'game.fields.type.options.empty',
        self::GAME_TYPE_PRACTICE => 'game.fields.type.options.practice',
        self::GAME_TYPE_1V1      => 'game.fields.type.options.1v1',
        self::GAME_TYPE_TOURNOI  => 'game.fields.type.options.tournoi',
        self::GAME_TYPE_SURVIVAL => 'game.fields.type.options.survival'
    ];

}