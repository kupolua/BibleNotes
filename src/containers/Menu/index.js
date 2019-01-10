import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Menu, Dropdown } from 'semantic-ui-react'
import { toLoginAction } from "./toLoginAction";

class NotesMenu extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            ...this.props.notesReducer,
            options: [
                { key: 1, text: 'Войти', value: 1, onClick: () => {this.onLogin()} },
                { key: 2, text: 'О проекте', value: 2 },
            ]
        };

        this.onLogin = this.onLogin.bind(this);
    }

    onLogin() {
        this.props.toLoginAction(true);
    }

    render () {
        return (
            <Menu>
                <Dropdown item simple text='Меню' direction='left' options={this.state.options} />
            </Menu>
        )
    }
}

function mapStateToProps(state) {
    return {
        notesReducer: state.notesReducer,
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        toLoginAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NotesMenu);
