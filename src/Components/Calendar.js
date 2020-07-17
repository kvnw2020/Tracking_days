import React from 'react'
import moment, { weekdaysShort } from 'moment'
import './Calendar.css'

class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(), //store moment object into state date
            allMonths: moment.months(),
            showMonthTable: false,
        }
        this.setmonth = this.setmonth.bind(this)
        this.showMonth = this.showMonth.bind(this)
    }

    weekDayShort = moment.weekdaysShort(); //Get the days of the week in short form
    
    setmonth(e, month) {

        let monthNo = this.state.allMonths.indexOf(month);
        let date = Object.assign({}, this.state.date);
        date = moment(date).set("month", monthNo);
        this.setState({
            date: date
        })
    };

    ListOfMonths(props) {
        let months = []
        props.data.map(data => {
            console.log('data', data)
            months.push(
                <td key={data} onClick={e => props.setmonth(e, data)}>
                    {data}
                </td>
            )
        })
        let rows = []
        let cells = []
        months.forEach((row, i) => {
            if(i%3 !== 0 || i === 0) {
                cells.push(row)
            } else {
                rows.push(cells)
                cells = []
                cells.push(row)
            }
        })
        rows.push(cells)
        let monthList = rows.map((d, i) => {
            return <tr>{d}</tr>
        })
        return (
            <div className='calendar'>
                <table>
                    <thead>
                        <h3>Select a month: </h3>
                    </thead>
                    <tbody>
                        {monthList}
                    </tbody>
                </table>
            </div>
        )
    }

    daysInMonth() {
        return this.state.date.daysInMonth()
    }

    month() {
        return this.state.date.format("MMMM")
    }

    firstDayOfMonth() {
        let date = this.state.date
        let firstDay = moment(date).startOf('month').format('d')
        return firstDay
    }

    showMonth() {
        this.setState({
            showMonthTable: !this.state.showMonthTable
        })
    }

    render() {

        let sunToSat = this.weekDayShort.map(day => {
            return (
                <td key={day}>
                    {day}
                </td>
            )
        })
        
        let blanks = []
        for (let i = 0; i < this.firstDayOfMonth(); i++) {
            blanks.push(
                <td>{''}</td>
            )
        }
        
        let daysInMonth = []
        for (let d = 1; d <= this.daysInMonth(); d++) {
            daysInMonth.push(
                <td key={d}>
                    {d}
                </td>
            )
        }
        
        var totalSlots = [...blanks, ...daysInMonth]
        let rows = []
        let cells = []
        totalSlots.forEach((row, i) => {
            if(i % 7 !== 0) {
                cells.push(row)
            } else {
                rows.push(cells)
                cells = []
                cells.push(row)
            }
            if (i === totalSlots.length -1 ) {
                rows.push(cells)
            }
        })
        console.log('lenght ', totalSlots.length)

        let daysinmonth = rows.map((d) => {
            return <tr className='align-left' key={d}>
                        {d}
                    </tr>
        })

        return (
            <div className='container'>
                {this.state.showMonthTable && <this.ListOfMonths data={moment.months()} setmonth={this.setmonth} />}
                <div className='calendar'>
                    <header>
                        <h2 onClick={this.showMonth}>{this.month()}</h2>
                        <a className="btn-prev fontawesome-angle-left" href="#"></a>
				        <a className="btn-next fontawesome-angle-right" href="#"></a>
                    </header>

                    <table>
                        <thead>
                            <tr>
                                {sunToSat}
                            </tr>
                        </thead>
                        <tbody>
                            {daysinmonth}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}

export default Calender