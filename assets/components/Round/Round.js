import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';

import WaitRound from './WaitRound'
import PlayRound from './PlayRound'
import EndRound from './EndRound'

class Round extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            round: props.round
        }
        
    }
    
    componentDidMount() {
        // changement de status pour wait ici
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        // if(this.props.datas !== prevProps.datas) {
        //     this.setState({
        //         datas: this.props.datas
        //     });
        // }


        // Update status

        // Waiting status

        // PlayRound status

        // Round

        // End Round


    }

    async process(params) {
        // Ici on appel en base le round pour cache action faite coté WS pour voir les mise à jour du round
        // await 
        

    }

    render() {
        const { t } = this.props;
        const round = this.state.round
        const status = round.status

        return (
            <>
                { status == 1 ?
                    <>
                        <WaitRound 
                            round={round} 
                            currentuser={this.props.currentuser}
                        />
                    </>
                : status == 2 ?
                    <>
                        <PlayRound 
                            round={round} 
                            currentuser={this.props.currentuser}
                        />
                    </>   
                : status == 3 ?
                    <>
                        <EndRound 
                            round={round} 
                            currentuser={this.props.currentuser}
                        />
                    </>
                : null // loading
                }
            </>  
        ) 
    }
}
export default withTranslation()(Round);