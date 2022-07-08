import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

import LogRound from './LogRound'

class WaitRound extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            round: props.round,
            players: props.players
        }
        
    }

    render() {
        const { t } = this.props;
        const round = this.state.round
        const users = round.users // liste du tableau mis en base quand le joueur qui créer la partie arrive dans la partie ainsi que les autres joueurs puis relier avec WS user_id
        const players = this.state.players
        const type = round.type

        return (
            <> 
                
                { type == 'log' || type == 'ready' || type == 'not-ready' ?
                        <>
                            <LogRound
                                round={round}
                            />
                        </>
                    : <li className="round">Loading</li> 
                }
                
            </>  
        ) 
    }
}
export default withTranslation()(WaitRound);