import React, { Component } from 'react';
import DayNotesList from './DayNotesList'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
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
    let  date = moment().utc().dayOfYear(this.state.numDay).format("YYYY-MM-DD");
    let week = moment(date).utc().weeks();
    let month = moment(date).utc().month();
    let firstDayOfWeek = moment(date).utc().day(1).format("DD");
    let lastDayOfWeek = moment(date).utc().day(7).format("DD.MM.YYYY");

    if (week === 0) {
      firstDayOfWeek = moment().utc().startOf("year").format("DD");
    }

    this.setState({
      numWeek: week,
      firstDayOfWeek: firstDayOfWeek,
      lastDayOfWeek: lastDayOfWeek
    });
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
          <div>
            {'Week'} {this.state.numWeek}
          </div>
          <div>
            {this.state.firstDayOfWeek} {'-'} {this.state.lastDayOfWeek}
          </div>
          <div>
            {'Notes: '} {this.state.notesList[this.state.numWeek] ?
              this.state.notesList[this.state.numWeek].reduce((accumulator, currentValue) => {
                return accumulator + currentValue.length
              }, 0)
              : 0}
          </div>
        </div>
        <hr/>
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
