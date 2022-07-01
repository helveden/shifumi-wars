import React, {Component} from 'react';
import Game from './Game';

import { Modal, Button } from 'react-bootstrap';

import { useTranslation, withTranslation } from 'react-i18next';


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
                        <li><button onClick={this.handleShow}>Create Game</button></li>
                        <li><button>Rejoindre une Game</button></li>
                    </ul>
                </nav>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Joueurs</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Classic - Tournoi - Well - No password</td>
                            <td>2 / 8</td>
                            <td>
                                <ul className="d-flex">
                                    <li>
                                        <button>Show</button>
                                    </li>
                                    <li>
                                        <button>Rejoindre</button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td>Etendu - 1v1 - No well - With password</td>
                            <td>1 / 1</td>
                            <td>
                                <ul className="d-flex">
                                    <li>
                                        <button>Show</button>
                                    </li>
                                    <li>
                                        <button>Rejoindre</button>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <Modal show={show} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={this.handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </>
        ) 
    }
}
export default withTranslation()(AllGames);