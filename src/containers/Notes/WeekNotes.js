import React, { Component } from 'react';
import DayNotesList from './DayNotesList'

const notesList = {
  "1": [
    [
      {
        verse: {
          bookTitle: "Бытие",
          book: "1",
          chapter: '1',
          verse: '7'
        },
        userId: "user 1",
        userDate: Date(),
        text: 'Очень много букв "И" в главе, каждая глава начинается с этой буквы!',
        tags: ['#букваИ', '#сотворение']
      },
    ],
    [],
    [
      {
        verse: {
          bookTitle: "Бытие",
          book: "1",
          chapter: '1',
          verse: '7'
        },
        userId: "user 1",
        userDate: Date(),
        text: 'Очень много букв "И" в главе, каждая глава начинается с этой буквы!',
        tags: ['#букваИ', '#сотворение']
      },
      {
        verse: {
          bookTitle: "Бытие",
          book: "1",
          chapter: '1',
          verse: '7'
        },
        userId: "user 1",
        userDate: Date(),
        text: 'Очень много букв "И" в главе, каждая глава начинается с этой буквы!',
        tags: ['#букваИ', '#сотворение']
      },
    ],
    [],
    [
      {
        verse: {
          bookTitle: "Бытие",
          book: "1",
          chapter: '1',
          verse: '7'
        },
        userId: "user 1",
        userDate: Date(),
        text: 'Очень много букв "И" в главе, каждая глава начинается с этой буквы!',
        tags: ['#букваИ', '#сотворение']
      },
    ],
    [],
  ]};

class WeekNotes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      note: {},
      title: 'Бытие 1-2',
      notesSum: 0
    };

    this.createNotesList = this.createNotesList.bind(this);
  }

  createNotesList() {
    const numWeek = 1; //todo: count numWeek using numDay from url
    const weekNotesList = notesList[numWeek];

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
                <div className={'excerpt'}>{this.state.title}</div>
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


  render() {
    return (
      <div className="weekNotes">
        <div className={'weekTitle'}>
          <div>
            {'Week 1'}
          </div>
          <div>
            {'01-07.01.2019'}
          </div>
          <div>
            {'Notes: '} {notesList['1'].reduce((accumulator, currentValue) => {
             return accumulator + currentValue.length
          }, 0)}
          </div>
        </div>
        <hr/>
        {this.createNotesList()}
      </div>
    );
  }
}

export default WeekNotes;
