import React, {Component} from 'react';
import axios from 'axios';
import Game from './Game';
import FormGame from './Game/Form';

import { Modal, Button } from 'react-bootstrap';
import { withTranslation } from 'react-i18next';
 
import Icon from './partials/Icon'

class AllGames extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentUser: props.user,
            openGame: false,
            roomId: 0,
            showCreateGame: false,
            datas: [],
            filters: {}
        };

        this.handleShowCreateGame = this.handleShowCreateGame.bind(this);
        this.handleCloseCreateGame = this.handleCloseCreateGame.bind(this);
        
        
        this.handleOpenGame = this.handleOpenGame.bind(this);
        this.handleCloseGame = this.handleCloseGame.bind(this);

        
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        // rechercher les parties existantes
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.datas !== prevProps.datas) {
            this.setState({
                datas: this.props.datas
            });
        }
    }

    handleCloseCreateGame(event) {
        this.setState({
            showCreateGame: false
        });
    }

    handleShowCreateGame(event) {
        this.setState({
            showCreateGame: true
        });
    } 

    async handleOpenGame(event) {
        // Ajout du joueur dans la partie
        await axios.post('/game/new-player', {
            user: this.state.currentUser
        })
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        .then(function () {
            // always executed
        });  


        this.setState({
            openGame: true,
            roomId: event,
        });
    }

    handleCloseGame(event) {
        this.setState({
            openGame: false,
            roomId: 0,
        });
    }
    
    render() {
        const { t } = this.props;
        const showCreateGame = this.state.showCreateGame  
        const openGame = this.state.openGame
        const roomCurrent = this.state.roomId
        
        return (
            <>
            
                <p>{t('allgames.title')}</p>
                <nav>
                    <ul className='d-flex'>
                        <li><button onClick={this.handleShowCreateGame}>{t('game.create')}</button></li>
                        <li><button>{t('allgames.nav.buttons.find_game')}</button></li>
                    </ul>
                </nav>
                { openGame && roomCurrent > 0 ? 
                    <>
                        <Game
                            room={roomCurrent}
                            clickHandler={this.handleCloseGame}
                        />
                    </>
                :
                    <table className='table'>
                        <thead>
                            <tr>
                                <th>{t('allgames.table.head.name')}</th>
                                <th>{t('allgames.table.head.config')}</th>
                                <th>{t('allgames.table.head.players')}</th>
                                <th>{t('allgames.table.head.actions')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Nom du jeu</td>
                                <td>
                                    <ul className='d-flex align-items-center game-name-list'>
                                        <li>Classic - Tournoi - Well - No password</li>
                                        <li><Icon icon='paper'/></li>
                                        <li><Icon icon='rock'/></li>
                                        <li><Icon icon='scissors'/></li>
                                        <li><Icon icon='spock'/></li>
                                        <li><Icon icon='lizard'/></li>
                                    </ul>
                                </td>
                                <td><span className='d-flex align-items-center'>2 / 8&nbsp;<Icon icon='usergroup'/></span></td>
                                <td>
                                    <ul className='d-flex'>
                                        <li>
                                            <button onClick={() => {this.handleOpenGame('123')}}>{t('allgames.table.actions.show')}</button>
                                        </li>
                                        <li>
                                            <button>{t('allgames.table.actions.edit')}</button>
                                        </li>
                                        <li>
                                            <button>{t('allgames.table.actions.meet')}</button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                            
                            <tr>
                                <td>Nom du jeu</td>
                                <td>
                                    <ul className='d-flex align-items-center game-name-list'>
                                        <li>Classic - Tournoi - Well - No password</li>
                                        <li><Icon icon='paper'/></li>
                                        <li><Icon icon='rock'/></li>
                                        <li><Icon icon='scissors'/></li>
                                        <li><Icon icon='spock'/></li>
                                        <li><Icon icon='lizard'/></li>
                                    </ul>
                                </td>
                                <td><span className='d-flex align-items-center'>2 / 8&nbsp;<Icon icon='usergroup'/></span></td>
                                <td>
                                    <ul className='d-flex'>
                                        <li>
                                            <button onClick={() => {this.handleOpenGame('456')}}>{t('allgames.table.actions.show')}</button>
                                        </li>
                                        <li>
                                            <button>{t('allgames.table.actions.edit')}</button>
                                        </li>
                                        <li>
                                            <button>{t('allgames.table.actions.meet')}</button>
                                        </li>
                                    </ul>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                }
                <Modal show={showCreateGame} onHide={this.handleCloseCreateGame}>
                    <Modal.Header closeButton>
                        <Modal.Title>{t('game.create')}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormGame />
                    </Modal.Body>
                    <Modal.Footer>
                        
                    </Modal.Footer>
                </Modal>
            </>
        ) 
    }
}
export default withTranslation()(AllGames);