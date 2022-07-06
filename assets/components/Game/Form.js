import React, {Component} from 'react';
import { withTranslation } from 'react-i18next';
import axios from 'axios';


class Form extends Component {
    
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            password: "",
            mode: 1,
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    componentDidMount() {
        // rechercher s'il y a un id pour l'update
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.datas !== prevProps.datas) {
            this.setState({
                datas: this.props.datas
            });
        }
    }
    
    handleChange(event) {   
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;
    
        this.setState({
            [name]: value
        });
    }
    
    async handleSubmit(event) {
        event.preventDefault();
        var results = await axios.post('/game/create', this.state)
        .then(function(response) {
            return response;
        });
        console.log(results)
        // this.state.ws.session.publish('acme/channel/' + this.props.datas.roomId, { datas: this.state.newcomment }); 
    }
    
    render() {
        const { t } = this.props;

        return (
            <>
                <form
                    onSubmit={this.handleSubmit}
                >
                    <div className="form-group">
                        <label>{t('game.fields.name.label')}</label>
                        <input type="text" 
                            className="form-control" 
                            placeholder={t('game.fields.name.placeholder')}
                            name="name"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('game.fields.password.label')}</label>
                        <input type="text" 
                            className="form-control" 
                            placeholder={t('game.fields.password.placeholder')}
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>{t('game.fields.mode.label')}</label>
                        <select 
                            name="mode" 
                            id="" 
                            className="form-control"
                            value={this.state.mode}
                            onChange={this.handleChange}
                        >
                            <option value="0">{t('game.fields.mode.options.empty')}</option>
                            <option value="1">{t('game.fields.mode.options.classic')}</option>
                            <option value="2">{t('game.fields.mode.options.extend')}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <button type="submit" className='btn btn-info'>{t('forms.submit.label')}</button>
                    </div>
                </form>
            </>
        );

    }
}
export default withTranslation()(Form);