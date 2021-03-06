import React, { Component } from 'react';
import DayNotesList from './DayNotesList'
import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
import moment from 'moment';

class WeekNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...this.props.notesReducer,
      numWeek: 0,
      firstDayOfWeek: 0,
      lastDayOfWeek: 0,
    };

    this.createNotesList = this.createNotesList.bind(this);
    this.setDate = this.setDate.bind(this);
  }

  componentWillMount () {
    this.setDate();
  }

  setDate () {
    let date = moment().dayOfYear(this.state.numDay);

    if (date.format('W') === 1) {
      this.setState({
        firstDayOfWeek: moment().startOf("year").format("DD"),
      });
    } else {
      this.setState({
        numWeek: date.format('W'),
        firstDayOfWeek: date.day(1).format('DD'),
        lastDayOfWeek: date.day(7).format('DD.MM.YYYY')
      });
    }
  }

  createNotesList() {
    const weekNotesList = this.state.notesList[this.state.numWeek];

    if (this.state.notesList[this.state.numWeek]) {
      return (
        weekNotesList.map((dayNotesList, i) => {
          return(
            <div
                key={i}
                className={'containerDayNotes'}
                onClick={() => this.setState({[i]: !this.state[i]})}
            >
              <div className={'dayNotes'}>
                <div className={'numDay'}>{i + 1}</div>
                <div className={'dayNoteData'}>
                  <div className={'excerpt'}>{this.state.readingPlan.title}</div>
                  <div className={'tagsList'}>{'[tags]'}</div>
                  <div className={'userList'}>{'[users]'}</div>
                </div>
                <div className={'quantityNotes'}>{dayNotesList.length}</div>
              </div>
              {
                this.state[i]
                    ? <DayNotesList dayNotesList={dayNotesList} />
                    : null
              }
            </div>
          )
        })
      )
    }
  }


  render() {
    return (
      <div className="weekNotes">
        <div className={'weekTitle'}>
          <div className={'NotesTitleNumWeek'}>
            {this.state.numWeek}
          </div>
          <div>
            {this.state.firstDayOfWeek} {'-'} {this.state.lastDayOfWeek}
          </div>
          <div>
            {'Заметок: '} {this.state.notesList[this.state.numWeek] ?
              this.state.notesList[this.state.numWeek].reduce((accumulator, currentValue) => {
                return accumulator + currentValue.length
              }, 0)
              : 0}
          </div>
        </div>
        {this.createNotesList()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    notesReducer: state.notesReducer,
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({
//     toLoginAction,
//   }, dispatch);
// }

export default connect(mapStateToProps, /mapDispatchToProps/)(WeekNotes);
