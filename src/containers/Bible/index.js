import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { fetchVersesAction } from '../Bible/fetchVersesAction'; //todo: for develop mode -dev
import EditNoteVerse from '../Bible/editNoteVerse';

class VersesList extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.notesReducer,
      showModal: false,
      verseAdress: {
        name: '',
        book: '',
        chapter: '',
        verseId: '',
        text: ''
      }
    }
    
    this.hideModal = this.hideModal.bind(this);
  }
  componentWillReceiveProps(nextProps, nextContext) {
    this.setState({...nextProps.notesReducer})
  }

  showModal(chapter, verseId, text) {
    if (this.state.isLogin) {
      const {name, book} = this.state.readingPlan;
      this.setState({
        showModal: true,
        verseAdress: {
          name,
          book,
          chapter,
          verseId,
          text
        }
      })
      //console.log(this.state.verses);
    }
  }

  hideModal() {
    //console.log("close");
    // console.log(this.state.readingPlan);
    // console.log(this.state.verses);
    this.setState({ showModal: false })
  }

  render() {
   // console.log(this.state.isLogin);
    return (
      <div>
        <div>{this.state.readingPlan.title}</div>
        {this.state.verses.map((chapter) => {
          return (
            <div  key={"chapterContainer" + chapter[1]} style={{marginLeft: 30}}>
              <div key={"chapter" + chapter[0]}>Глава: {chapter[0]}</div>
              <div key={"verseMainContainer" + chapter[0]}>{
                Object.keys(chapter).map((verseId) => {
                  if(verseId === '0') {return}
                  return (
                    <div
                      key={'verseContainer' + verseId}
                      style={{
                        display: 'flex', flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start',
                        marginTop: 5
                      }}
                      onClick={() => {this.showModal(chapter[0], verseId, chapter[verseId])}}>
                      <div key={'verseId' + verseId} style={{width: 40, marginRight: 10}}>{verseId}</div>
                      <div key={'verse' + verseId}>{chapter[verseId]}</div>
                    </div>
                  )
                })
              }</div>
            </div>
          )
        })}
        <EditNoteVerse 
          verseAdress={this.state.verseAdress} 
          handleClose={this.hideModal} 
          show={this.state.showModal}
          />
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

export default connect(mapStateToProps, mapDispatchToProps)(VersesList);
// export default App;
// export default withAuthenticator(App);
// export default connect(mapStateToProps, mapDispatchToProps)(process.env.REACT_APP_MODE === 'autologin' ? App : withAuthenticator(App));
