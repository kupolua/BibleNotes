import React from 'react'
import moment from 'moment';
import Plan from './B2YPlan';

class Calendar extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            planList: this.createPlanList(),
            weekPresenter: {
                weekNum: null,
            },
        };

        this.displayPlanList = this.displayPlanList.bind(this);
    }


    createPlanList () {
        const daysPlanList = Plan[2].days[0];
        let weekList = {};

        daysPlanList.forEach((dayPlan) => {
            let date = moment().utc().dayOfYear(dayPlan.numday);
            let week = date.format('W');

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
                                    {dayList.map((day, dayId) => {
                                        return (
                                            <div key={dayId} className={'day'}>
                                                <div className={'dayDate'}> {day.date} </div>
                                                <div className={'dayTitle'}> {day.title} </div>
                                            </div>
                                        )
                                    })}
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
                                    <button onClick={() => {console.log(this.state.weekPresenter)}}>Submit</button>
                                </div>
                            </div> :
                            <div className={'calendarContainer mini'} key={'calendarContainer' + weekId} onClick={() => {this.setState({
                                weekPresenter: {
                                    ...this.state.weekPresenter, weekNum:
                                        weekId+1,
                                    weekDateReference: this.state.planList[weekId+1][0].date + ' - ' + this.state.planList[weekId+1][6].date,
                                    weekBibleReference: this.state.planList[weekId+1][0].title + ' - ' + this.state.planList[weekId+1][6].title,
                                }
                            })}}>
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
                                    this.state.planList[weekId+1][0].date + ' - ' + this.state.planList[weekId+1][6].date :
                                    null
                                }
                                </div>
                                <div className={'weekBibleReference'}>
                                    {
                                        this.state.planList[weekId+1][0] ?
                                            this.state.planList[weekId+1][0].title + ' - ' + this.state.planList[weekId+1][6].title :
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




export default Calendar;