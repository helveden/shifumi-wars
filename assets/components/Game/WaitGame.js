import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

class WaitGame extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            isConnected:props.isConnected,
            ws: props.ws,
            round: props.round,
            currentuser: props.currentuser,
            players: props.players
        }
        console.log(this.state)
        
    }

    componentDidMount() {
        var that = this;

        // I'm connected
        setTimeout(function() {
           //that.state.ws.session.publish('acme/channel/' + that.props.room, { type: 'connexion', user: that.props.currentuser });
        }, 1000);
    }
    

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.state.players !== this.props.players) {
            this.setState({
                players: this.props.players
            });
        }
    }

    render() {
        const { t } = this.props;
        const round = this.state.round
        const players = this.state.players
        const currentuser= this.state.currentuser
        
        return (
            <> 
                <ul>                                        
                    {players.map((player, index) => {
                        return <li key={index}>{player.email}</li>
                    })}
                </ul>
            </>
        ) 
    }
}
export default withTranslation()(WaitGame);