import React from 'react'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import moment from 'moment';
import Plan from './B2YPlan';
import { putPresenterAction } from "./putPresenterAction";
import { getPresenterAction } from "./getPresenterAction";

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.props.getPresenterAction();

        this.state = {
            planList: this.createPlanList(),
            weekPresenter: {
                weekNum: null,
            },
        };

        this.displayPlanList = this.displayPlanList.bind(this);
    }

    componentWillReceiveProps(nextProps, nextContext) {
        console.log('nextProps', nextProps.notesReducer.presenters);
    }


    createPlanList () {
        const daysPlanList = Plan[2].days[0];
        let weekList = {};

        daysPlanList.forEach((dayPlan) => {
            let date = moment().utc().dayOfYear(dayPlan.numday);
            let week = date.format('W');

            if(moment(date).isoWeekYear() === 2020){
                if (weekList[53]) {
                    weekList[53][weekList[53].length] = {
                        date: date.format('DD.MM'),
                        title: dayPlan.title
                    }
                } else {
                    weekList[53] = [{
                        date: date.format('DD.MM'),
                        title: dayPlan.title
                    }]
                }
            } else {
                if (weekList[week]) {
                    weekList[week][weekList[week].length] = {
                        date: date.format('DD.MM'),
                        title: dayPlan.title
                    }
                } else {
                    weekList[week] = [{
                        date: date.format('DD.MM'),
                        title: dayPlan.title
                    }]
                }
            }
        });

        return weekList
    }

    displayPlanList () {
        return (
            Object.values(this.state.planList).map((dayList, weekId) => {
                return (
                    <div key={weekId}>
                        {this.state.weekPresenter.weekNum === weekId+1 ?
                            <div className={'calendarContainer'} key={'calendarContainer' + weekId}>
                                <div className={'planWeekList'} key={'planWeekList' + weekId}>
                                    <div className={'week'} onClick={() => {
                                        this.state.weekPresenter.weekNum === weekId+1 ?
                                        this.setState({
                                            weekPresenter: {
                                               ...this.state.weekPresenter, weekNum: null
                                            }}):
                                        this.setState({weekPresenter: {
                                                ...this.state.weekPresenter, weekNum: weekId+1
                                            }})}}
                                    > {weekId + 1} </div>
                                    <div className={'dayContainer'}>
                                        {dayList.map((day, dayId) => {
                                            return (
                                                <div key={dayId} className={'day'}>
                                                    <div className={'dayDate'}> {day.date} </div>
                                                    <div className={'dayTitle'}> {day.title} </div>
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                                <div className={'calendarForm'}>
                                    <input placeholder={'Имя Фамилия Отчество'} onChange={(e) => {this.setState({
                                        weekPresenter: {
                                            ...this.state.weekPresenter, presenter: {
                                                ...this.state.weekPresenter.presenter, name: e.target.value
                                            }
                                        }
                                    })}}/>
                                    <input placeholder={'+380'} onChange={(e) => {this.setState({
                                        weekPresenter: {
                                            ...this.state.weekPresenter, presenter: {
                                                ...this.state.weekPresenter.presenter, phoneNum: e.target.value
                                            }
                                        }
                                    })}}/>
                                    <input placeholder={'email'} onChange={(e) => {this.setState({
                                        weekPresenter: {
                                            ...this.state.weekPresenter, presenter: {
                                                ...this.state.weekPresenter.presenter, email: e.target.value
                                            }
                                        }
                                    })}}/>
                                    <button onClick={() => {this.props.putPresenterAction(this.state.weekPresenter)}}>Submit</button>
                                </div>
                            </div> :
                            <div className={'calendarContainer mini'}
                                 key={'calendarContainer' + weekId}
                                 onClick={() => {
                                     this.setState({
                                        weekPresenter: {
                                            ...this.state.weekPresenter, weekNum:
                                                weekId+1,
                                            weekDateReference: this.state.planList[weekId+1][0].date + ' - ' + this.state.planList[weekId+1][this.state.planList[weekId+1].length -1].date,
                                            weekBibleReference: this.state.planList[weekId+1][0].title + ' - ' + this.state.planList[weekId+1][this.state.planList[weekId+1].length -1].title,
                                        }
                                     })
                                 }}
                            >
                                <div className={'week'} onClick={() => {
                                    this.state.weekPresenter.weekNum === weekId+1 ?
                                        this.setState({
                                            weekPresenter: {
                                                ...this.state.weekPresenter, weekNum: null
                                        }}):
                                        this.setState({weekPresenter: {
                                                ...this.state.weekPresenter, weekNum: weekId+1
                                        }});

                                    this.setState({
                                        weekPresenter: {
                                            ...this.state.weekPresenter,
                                        }
                                    });
                                }}
                                > {weekId + 1} </div>
                                <div className={'weekDateReference'}>
                                {
                                    this.state.planList[weekId+1][0] ?
                                    this.state.planList[weekId+1][0].date + ' - ' + this.state.planList[weekId+1][this.state.planList[weekId+1].length -1].date :
                                    null
                                }
                                </div>
                                <div className={'weekBibleReference'}>
                                    {
                                        this.state.planList[weekId+1][0] ?
                                            this.state.planList[weekId+1][0].title + ' - ' + this.state.planList[weekId+1][this.state.planList[weekId+1].length -1].title :
                                            null
                                    }
                                </div>
                            </div>
                        }
                    </div>
                )
            })
        )
    }

    render () {
        return (
            <div>
                {this.displayPlanList()}
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
        putPresenterAction,
        getPresenterAction,
    }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
// export default Calendar;
