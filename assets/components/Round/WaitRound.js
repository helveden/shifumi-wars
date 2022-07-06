import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

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

        return (
            <> 
            
                <li className="round">
                    <ul>
                        {
                            // Ici on fait une liste des joueurs avec les status qui s'affiche au fur et à mesure en temps réel
                            // Difficulté comment bien passer les changements en WS 
                            // Solution Aiguiller les données dans le payload
                        }
                        {players.map((user, index) => {
                            return <li key={index} className="comment">{user.username} 
                                {
                                    user.id == this.props.currentuser ?
                                    <>
                                        <input name="" id="" type="checkbox" value="" /> 
                                    </>
                                    : null // loading // svg coché des autres joueurs
                                }
                            </li> // {round.user.choice}
                        })}
                    </ul>
                </li>
            </>  
        ) 
    }
}
export default withTranslation()(WaitRound);