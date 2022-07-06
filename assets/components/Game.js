import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

import WS from '../../vendor/gos/web-socket-bundle/public/js/websocket.min.js';

import Icon from './partials/Icon'

import Round from './Round/Round'

class Game extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            currentuser: props.currentuser,
            rounds: [],
            ws: WS.connect('ws://127.0.0.1:8080')
        };
        
        this.addRound = this.addRound.bind(this);
    }
    
    componentDidMount() {

        // Init
        var that = this;
        
        // Header Scripts
    
    
        // WS        
        this.state.ws.on('socket/connect', function (session) {
            // this is the GosSocket object
            this.on('socket/disconnect', function (error) {
                
            });
            
            
            session.subscribe('acme/channel/' + that.props.room, function (uri, payload) {
                var result = {};
                
                if(payload.event == 'subscribe') {                
                    result = {
                        // contacts: that.state.contacts.concat(payload.user_id)
                    }
                }
            
                if(payload.event == 'publish') {                
                    result = {
                        rounds: that.state.rounds.concat(payload),
                        // newcomment: ''
                    }
                }
            
                that.setState(result)
            });
        })
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // console.log(this.state.rounds, prevProps)
        if(this.state.rounds !== prevProps.rounds) {
            // this.state.rounds.push({msg: select});

            // let rounds = this.state.rounds
            // this.setState({
            //     rounds: rounds
            // });
        }
    }

    addRound(select) {
        
        this.state.ws.session.publish('acme/channel/' + this.props.room, { msg: select, user: this.props.currentuser });

    }
    
    render() {
        const { t } = this.props;
        const rounds = this.state.rounds
        const room = this.props.room

        return (
            <>
                <div id='game'>
                    <div className=''>
                        <section className='wrap-game'>
                            <header className='game-header'>
                                <nav>
                                    <ul className='game-nav d-flex justify-content-end align-items-center'>
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
                                    <li><button onClick={() => {this.addRound('paper')}}><Icon icon='paper'/></button></li>
                                    <li><button onClick={() => {this.addRound('rock')}}><Icon icon='rock'/></button></li>
                                    <li><button onClick={() => {this.addRound('scissors')}}><Icon icon='scissors'/></button></li>
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