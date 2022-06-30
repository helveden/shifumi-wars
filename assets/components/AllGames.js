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
            </>
        ) 
    }
}
export default AllGames;