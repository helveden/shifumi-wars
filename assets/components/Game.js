import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';

import WS from '../../vendor/gos/web-socket-bundle/public/js/websocket.min.js';

import Icon from './partials/Icon'

import Round from './Round/Round'

class Game extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            room: props.room,
            players: props.players,
            currentuser: props.currentuser,
            currentRound: 0,
            isAuthor: null, // préparation de l'hote < Servira de tests car je m'attend à des logs en doublons, voir démultiplié à cause de la publication WS avec l'hote de la partie, seul lui envoie les données au WS
            rounds: [],
            isLock: false,
            isReady: false,
            ws: WS.connect('ws://127.0.0.1:8080')
        };
        
        this.addAction = this.addAction.bind(this);
        this.addRound = this.addRound.bind(this);
    }
    
    async componentDidMount() {

        // Init
        var that = this;
        
        // Header Scripts
    
    
        // WS        
        this.state.ws.on('socket/connect', function (session) {
            // this is the GosSocket object
            this.on('socket/disconnect', function (error) {
                
            });
            
            
            session.subscribe('acme/channel/' + that.state.room, async function (uri, payload) {
                var result = {};
                
                console.log(payload)

                if(payload.event == 'subscribe') {
                    result = {
                        currentuser: {...that.state.currentuser, ...{user_id: payload.user_id}}
                        // contacts: that.state.contacts.concat(payload.user_id)
                    } 

                    // à replacer ailleur car ça génère du doublon
                    that.addRound('log', {msg: that.state.currentuser.email + payload.msg, user: result.currentuser})
                }
            
                if(payload.event == 'publish') {                
                    result = {
                        rounds: that.state.rounds.concat(payload),
                    }
                }

                that.setState(result)
            });
        }) 
        
        // Get game at this moment
        // var results = await axios.get('/game/show/' + this.props.room).then(function(response) {
        //     return response;
        // });
        
        
        // var rounds = this.state.rounds.concat({status: results.data.game.status})
        
        // this.setState({
        //     players: results.data.players,
        //     rounds: rounds
        // });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        
        if(this.state.players !== prevProps.rounds) {
            // this.state.rounds.concat({msg: select});

            // let rounds = this.state.rounds
            // this.setState({
            //     rounds: rounds
            // });
        }
    }

    async addAction(action, params) {
        var newState = {}
        if(action == 'ready') {
            var res = await axios.post('/game/update/' + this.state.room, {
                action: action
            })

            console.log(res)

            newState = {
                isReady: true
            }
        }

        this.setState(newState);
    }

    addRound(type, params) {
        if(type == 'log') {
            this.state.ws.session.publish('acme/channel/' + this.props.room, { 
                msg: params.msg, 
                type: type, 
                params: params 
            });

        } else if(type == 'ready') {
            this.state.ws.session.publish('acme/channel/' + this.props.room, { 
                msg: this.state.currentuser.email + ' est pret à jouer', 
                type: type, 
                params: this.state 
            });
            
        } else if(type == 'not-ready') {
            this.state.ws.session.publish('acme/channel/' + this.props.room, { type: type, msg: this.state.currentuser.email + ' n\'est pas encore pret à jouer', params: this.state });

        } else if(type == 'after-ready') {
            // ici on va en DB pour récupérer la game 
            // On vérifie que tous les joueurs sont prèt et on créer le premier round puis on affiche
            

            // Si tous les joueurs sont pret on affiche ici le mode play round avec le current round et son id
        } else if(type == 'choice') {
            
            // Une fois les joueurs près, le round 1 à été créé
            this.state.ws.session.publish('acme/channel/' + this.props.room, { type: type, msg: this.state.currentuser.email + ' à validé son choix', params: params });

            // à chaque fois qu'un joueur valide son choix
            // on va en DB et on vérifie que le round est terminé > Si terminé, le round suivant est créé et l'id est retourné également si ce n'est pas encore la fin du jeu
            // on retourne le résultat du round et le nouvel id du prochain round
        } else if(type == 'result-round') {
            // On affiche le résultat de la round
            this.state.ws.session.publish('acme/channel/' + this.props.room, { type: type, msg: this.state.currentuser.email + ' à validé son choix', params: params });

        } else if(type == 'result-game') {
            // Si plus aucun rounds est créés, les résultat de la partie son retournés
            // Les joueurs peuvent se sérrer la main et/ou quitter la page pour retourner à l'accueil
        }

    }
    
    render() {
        const { t } = this.props;
        const rounds = this.state.rounds
        const room = this.props.room
        const players = this.state.players
        const isLock = this.state.isLock
        const isReady = this.state.isReady

        return (
            <>
                <div id='game'>
                    <div className=''>
                        <section className='wrap-game'>
                            <header className='game-header'>
                                <nav>
                                    <ul className='game-nav d-flex justify-content-end align-items-center'>                                     
                                        {players.map((player, index) => {
                                            return <li key={index}>{player.email}</li>
                                        })}
                                        <li>G {room}</li>
                                        <li><button onClick={this.props.clickHandler}><Icon icon='close'/></button></li>
                                    </ul>
                                </nav>
                            </header>
                            <div className='game-content'>
                                <ul>                                        
                                    {rounds.map((round, index) => {
                                        return <Round key={index} round={round} />
                                    })}
                                </ul>
                            </div>
                            <footer>
                                <ul className='game-actions d-flex justify-content-center align-items-center'>
                                    { !isReady ?
                                        <>
                                            <li>
                                                <button onClick={() => {this.addAction('ready')}}>
                                                    <Icon icon='ok'/>
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => {this.addRound('not-ready')}}>
                                                    <Icon icon='nok'/>
                                                </button>
                                            </li>
                                        </>
                                        : null
                                    }
                                    { !isLock && isReady ?
                                        <>
                                            <li>
                                                <button onClick={() => {this.addRound('choice', 'paper')}}>
                                                    <Icon icon='paper'/>
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => {this.addRound('choice', 'rock')}}>
                                                    <Icon icon='rock'/>
                                                </button>
                                            </li>
                                            <li>
                                                <button onClick={() => {this.addRound('choice', 'scissors')}}>
                                                    <Icon icon='scissors'/>
                                                </button>
                                            </li>
                                        </>
                                        : null 
                                    }
                                    { isLock ?
                                        <li>
                                            <button className='rotate' onClick={() => {this.addRound('loading')}}>
                                                <Icon icon='loading' />
                                            </button>
                                        </li>
                                        : null
                                    }
                                </ul>
                            </footer>
                        </section>
                    </div>
                </div>
            </>  
        ) 
    }
}
export default withTranslation()(Game);