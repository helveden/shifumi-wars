import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';


class Round extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            round: props.round
        }
        
    }

    render() {
        const { t } = this.props;
        const round = this.state.round

        return (
            <>
                <li className="round">
                    <ul>
                        <li>Player 1 : choice</li>
                        <li>Player 2 : choice</li>
                    </ul>
                </li>
            </>  
        ) 
    }
}
export default withTranslation()(Round);