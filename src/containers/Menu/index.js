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
        this.onNotes = this.onNotes.bind(this);
        this.onReader = this.onReader.bind(this);
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            ...nextProps.notesReducer
        })
    }

    onLogin() {
        this.props.toLoginAction(true);
    }

    onReader () {
        console.log('isReader');
    }

    onNotes () {
        console.log('isNotes');
    }

    render () {
        return (
            <Menu>
                <Dropdown item simple text='Меню' direction='left' options={this.state.options} />
                {this.state.isLogin ? <Menu.Item onClick={() => {this.onNotes()}}>Note</Menu.Item> : null}
                {this.state.isLogin ? <Menu.Item onClick={() => {this.onReader()}}>Read</Menu.Item> : null}
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
