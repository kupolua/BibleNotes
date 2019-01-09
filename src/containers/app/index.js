import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
// import { Link } from 'react-router-dom';
import { fetchVersesAction } from '../Bible/fetchVersesAction'; //todo: for develop mode -dev
import NotesMenu from '../Menu';
import VersesList from '../Bible';
import Notes from '../Notes';

let search = window.location.search;
let numDay;

let errorMessage = 'Add number day of year: /?numDay=3';

search.replace(/\?/, '').split('&').map((param) => {
  if(param.search('numDay') !== -1) {
    numDay = param.replace(/numDay=/, '')
  }
});

class App extends React.Component{
  constructor(props) {
    super(props);

    if(numDay) {
      errorMessage = 'Loading...';
      this.props.fetchVersesAction(numDay);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({...nextProps.notesReducer})
  }

  render() {
    if(!this.state) {return <div style={{
      display: 'flex', justifyContent: 'center', alignItems: 'center',
      width: '100%', height: window.innerHeight,
      fontSize: 18, color: 'red',
    }}>{errorMessage}</div>}

    return (
      <div>
        <NotesMenu />
        {this.state.isLogin ? <Notes /> : <VersesList />}

      </div>
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
    fetchVersesAction,
  }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
// export default App;
// export default withAuthenticator(App);
// export default connect(mapStateToProps, mapDispatchToProps)(process.env.REACT_APP_MODE === 'autologin' ? App : withAuthenticator(App));
