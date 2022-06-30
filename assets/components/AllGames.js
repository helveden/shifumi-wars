import React, {Component} from 'react';
import Game from './Game';

class AllGames extends Component {
    
    constructor(props) {
        
        super(props);
        
        this.state = {
            datas: [],
            filters: {}
        };
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
    
    render() {
        return (
            <>
                <p>All games</p>
                <nav>
                    <ul class="d-flex">
                        <li><button>Create Game</button></li>
                        <li><button>Rejoindre une Game</button></li>
                    </ul>
                </nav>
                <table class="table">
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
                                <ul class="d-flex">
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
                                <ul class="d-flex">
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
            </>
        ) 
    }
}
export default AllGames;