import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

class StartGame extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            ws: props.ws,
            round: props.round,
            currentuser: props.currentuser,
            players: props.players
        }
        
    }

    render() {
        const { t } = this.props;
        const players = this.state.players

        return (
            <> 
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
                            return <Round key={index} round={round} players={players} />
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
            </>  
        ) 
    }
}
export default withTranslation()(StartGame);