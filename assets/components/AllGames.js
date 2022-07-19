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
            openGame: false,
            roomId: 0,
            showCreateGame: false,
            games: [],
            allmode: props.allmode,
            alltype: props.alltype,
            filters: {}
        };

        this.handleShowCreateGame = this.handleShowCreateGame.bind(this);
        this.handleCloseCreateGame = this.handleCloseCreateGame.bind(this);
        
        
        this.handleOpenGame = this.handleOpenGame.bind(this);
        this.handleCloseGame = this.handleCloseGame.bind(this);

        
        // this.handleChange = this.handleChange.bind(this);
        // this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount() {
        await this.getGames();
    }

    async getGames() {
        // rechercher les parties existantes
        var results = await axios.get('/games').then(function(response) {
            return response;
        });

        if(results.data.games.length > 0) {            
            this.setState({
                games: results.data.games
            });
        }
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

    handleOpenGame(event) {
        // Ajoute le joueur dans la partie

        window.location.href = '/game/play/' + event
    }

    handleCloseGame(event) {
        this.setState({
            openGame: false,
            roomId: 0,
        });
    }
    
    render() {
        const { t } = this.props;
        const games = this.state.games
        const openGame = this.state.openGame
        const roomCurrent = this.state.roomId
        const showCreateGame = this.state.showCreateGame

        const alltype = this.state.alltype  
        const allmode = this.state.allmode 
        
        return (
            <>
                { openGame && roomCurrent > 0 ? 
                    <>
                        <Game
                            room={roomCurrent}
                            currentuser={this.props.currentuser}
                            clickHandler={this.handleCloseGame}
                        />
                    </>
                    :    
                    <>  
                        <p>{t('allgames.title')}</p>
                        <nav>
                            <ul className='d-flex'>
                                <li><button onClick={this.handleShowCreateGame}>{t('game.create')}</button></li>
                                <li><button>{t('allgames.nav.buttons.find_game')}</button></li>
                            </ul>
                        </nav>             
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
                                {games.map((game, index) => {
                                    
                                    return <tr key={index}>
                                                <td>{game.name}</td>
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
                                                <td>
                                                    <span className='d-flex align-items-center'>2 / 8&nbsp;<Icon icon='usergroup'/></span>
                                                </td>
                                                <td>
                                                    <ul className='d-flex'>
                                                        <li>
                                                            <button onClick={() => {this.handleOpenGame(game.id)}}>{t('allgames.table.actions.show')}</button>
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
                                })}
                            </tbody>
                        </table>
                        <Modal show={showCreateGame} onHide={this.handleCloseCreateGame}>
                            <Modal.Header closeButton>
                                <Modal.Title>{t('game.create')}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <FormGame 
                                    allmode={allmode}
                                    alltype={alltype}
                                />
                            </Modal.Body>
                            <Modal.Footer>
                                
                            </Modal.Footer>
                        </Modal>
                    </>
                }
            </>
        ) 
    }
}
export default withTranslation()(AllGames);