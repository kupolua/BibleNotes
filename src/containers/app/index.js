import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { fetchVersesAction } from '../Bible/fetchVersesAction'; //todo: for develop mode -dev

let search = window.location.search;
let numDay;

let errorMessage = 'Add number day of year: /?numDay=3';

search.replace(/\?/, '').split('&').map((param) => {
  if(param.search('numDay') != -1) {
    numDay = param.replace(/numDay=/, '')
  }
});

class App extends React.Component{
  constructor(props) {
    super(props)

    if(numDay) {
      errorMessage = 'Loading...';
      this.props.fetchVersesAction(numDay);
    }
  }

  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({...nextProps.notesReducer})
  }

  render() {
    if(!this.state) {return <div>{errorMessage}</div>}

    return (
      <div>
        <div style={{
          display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'space-between',
          height: 100, marginTop: 20,
        }}>
          <div style={{
            display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-start',
            height: 100, width: '50%',
          }}>
            <Link to="/" style={{width: 80, height: 40, paddingTop: 9, paddingLeft: 18, border: '1px solid green', borderRadius: 5}} >Home</Link>

          </div>

        </div>

        <div>{this.state.readingPlan.title}</div>
        {this.state.verses.map((chapter) => {
          return (
            <div  key={"chapterContainer" + chapter[0]} style={{marginLeft: 30}}>
              <div>Глава: {chapter[0]}</div>
              <div>{
                Object.keys(chapter).map((verseId) => {
                  if(verseId === '0') {return}
                  return (
                    <div
                      key={'verseContainer' + verseId}
                      style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',
                        marginTop: 5
                      }}>
                      <div key={'verseId' + verseId} style={{width: 40, marginRight: 10}}>{verseId}</div>
                      <div key={'verse' + verseId}>{chapter[verseId]}</div>
                    </div>
                  )
                })
              }</div>
            </div>
          )
        })}
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
