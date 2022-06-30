import React, {Component} from 'react';

class Game extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            
        };
    }
    
    componentDidMount() {

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
            </>  
        ) 
    }
}
export default Game;