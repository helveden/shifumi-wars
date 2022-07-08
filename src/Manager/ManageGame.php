<?php

namespace App\Manager;


class ManageGame {

    private $players = [];

    public function __construct($api) {
        $this->api = $api . '/api/';
    }

    public function getGame($id) {
        return file_get_contents( $this->api . 'game/' . $id);
    }

    public function getRound() {
        return file_get_contents($this->api . 'round/' . $id);
    }

    public function result() {
        
    }
}