import React, {Component} from 'react'; 


import Loading from '../../pictures/svg/spinner-solid.svg';
import HandPaper from '../../pictures/svg/hand-solid.svg';
import HandRock from '../../pictures/svg/hand-back-fist-solid.svg';
import HandLizard from '../../pictures/svg/hand-lizard-solid.svg';
import HandScissors from '../../pictures/svg/hand-scissors-solid.svg';
import HandSpock from '../../pictures/svg/hand-spock-solid.svg';
import User from '../../pictures/svg/user-solid.svg';
import UserGroup from '../../pictures/svg/user-group-solid.svg';
import CloseFill from '../../pictures/svg/x-circle-fill.svg';
import Close from '../../pictures/svg/x.svg'; 
import Ok from '../../pictures/svg/thumbs-up-solid.svg';
import Nok from '../../pictures/svg/thumbs-down-solid.svg'; 

class Icon extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            current: props.icon
        }

        this.state.allSvg = {}
        this.state.allSvg['loading'] = Loading,
        this.state.allSvg['paper'] = HandPaper,
        this.state.allSvg['rock'] = HandRock,
        this.state.allSvg['lizard'] = HandLizard,
        this.state.allSvg['scissors'] = HandScissors,
        this.state.allSvg['spock'] = HandSpock
        this.state.allSvg['user'] = User
        this.state.allSvg['usergroup'] = UserGroup
        this.state.allSvg['closefill'] = CloseFill
        this.state.allSvg['close'] = Close
        this.state.allSvg['ok'] = Ok
        this.state.allSvg['nok'] = Nok
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
        const svg = this.state.current

        return (
            <img 
                src={this.state.allSvg[svg]} 
                alt={svg} 
                className="icon"
            />
        ) 
    }
}
export default Icon;