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
            show: false,
            datas: [],
            filters: {}
        };

        this.handleShow = this.handleShow.bind(this);
        this.handleClose = this.handleClose.bind(this);
        
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

    handleClose(event) {
        this.setState({
            show: false
        });
    }

    handleShow(event) {
        this.setState({
            show: true
        });
    }
    
    render() {
        const { t } = this.props;
        const show = this.state.show  
        
        return (
            <>
            
                <p>{t('allgames.title')}</p>
                <nav>
                    <ul className="d-flex">
                        <li><button onClick={this.handleShow}>{t('game.create')}</button></li>
                        <li><button>{t('allgames.nav.buttons.find_game')}</button></li>
                    </ul>
                </nav>
                <table className="table">
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
                                <ul className="d-flex align-items-center game-name-list">
                                    <li>Classic - Tournoi - Well - No password</li>
                                    <li><Icon icon="paper"/></li>
                                    <li><Icon icon="rock"/></li>
                                    <li><Icon icon="scissors"/></li>
                                    <li><Icon icon="spock"/></li>
                                    <li><Icon icon="lizard"/></li>
                                </ul>
                            </td>
                            <td><span className="d-flex align-items-center">2 / 8&nbsp;<Icon icon="usergroup"/></span></td>
                            <td>
                                <ul className="d-flex">
                                    <li>
                                        <button>{t('allgames.table.actions.show')}</button>
                                    </li>
                                    <li>
                                        <button>{t('allgames.table.actions.meet')}</button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Modal show={show} onHide={this.handleClose}>
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