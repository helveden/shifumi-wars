import React, {Component} from 'react';
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
            showCreateGame: false,
            datas: [],
            rounds: [],
            filters: {}
        };

        this.handleShowCreateGame = this.handleShowCreateGame.bind(this);
        this.handleCloseCreateGame = this.handleCloseCreateGame.bind(this);
        
        
        this.handleOpenGame = this.handleOpenGame.bind(this);
        this.handleCloseGame = this.handleCloseGame.bind(this);

        
        this.addRound = this.addRound.bind(this);
        
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

    handleOpenGame(event) {
        this.setState({
            openGame: true
        });
    }

    handleCloseGame(event) {
        this.setState({
            openGame: false
        });
    }

    addRound(select) {
        this.state.rounds.push({msg: select});

        let rounds = this.state.rounds
        this.setState({
            rounds: rounds
        });
    }
    
    render() {
        const { t } = this.props;
        const showCreateGame = this.state.showCreateGame  
        const openGame = this.state.openGame
        const rounds = this.state.rounds
        
        return (
            <>
            
                <p>{t('allgames.title')}</p>
                <nav>
                    <ul className='d-flex'>
                        <li><button onClick={this.handleShowCreateGame}>{t('game.create')}</button></li>
                        <li><button>{t('allgames.nav.buttons.find_game')}</button></li>
                    </ul>
                </nav>
                { openGame ? 
                    <div id='game'>
                        <div className=''>
                            <section className='wrap-game'>
                                <header className='game-header '>
                                    <nav>
                                        <ul className='game-nav d-flex justify-content-end align-items-center'>
                                            <li><button onClick={this.handleCloseGame}><Icon icon='close'/></button></li>
                                        </ul>
                                    </nav>
                                </header>
                                <div className='game-content'>
                                    <ul>                                        
                                        {rounds.map((round, index) => {
                                            return <li key={index} className="round">{round.msg}</li>
                                        })}
                                    </ul>
                                </div>
                                <footer>
                                    <ul className='game-actions d-flex justify-content-center align-items-center'>
                                        <li><button onClick={() => {this.addRound('paper')}}><Icon icon='paper'/></button></li>
                                        <li><button onClick={() => {this.addRound('rock')}}><Icon icon='rock'/></button></li>
                                        <li><button onClick={() => {this.addRound('scissors')}}><Icon icon='scissors'/></button></li>
                                    </ul>
                                </footer>
                            </section>
                        </div>
                    </div>
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
                                            <button onClick={this.handleOpenGame}>{t('allgames.table.actions.show')}</button>
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