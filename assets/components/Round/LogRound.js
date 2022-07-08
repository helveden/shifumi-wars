import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

class LogRound extends Component {
    
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
                <li className="round">{round.msg}</li>
            </>  
        ) 
    }
}
export default withTranslation()(LogRound);