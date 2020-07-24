import React from 'react'
import moment, { weekdaysShort } from 'moment'
import './Calendar.css'

class Calender extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            date: moment(), //store moment object into state date
            allMonths: moment.months(), //gets all the months of the year
            showMonthTable: false,
            showYearTable: false,
            selectDay: null,
        }
        this.setmonth = this.setmonth.bind(this)
        this.showMonth = this.showMonth.bind(this)
        this.setYear = this.setYear.bind(this)
        this.showYear = this.showYear.bind(this)
        this.onPrev = this.onPrev.bind(this)
        this.onNext = this.onNext.bind(this)
        this.selectDay = this.selectDay.bind(this)
    }

    weekDayShort = moment.weekdaysShort(); //Get the days of the week in short form

    daysInMonth() {
        return this.state.date.daysInMonth()
    }

    month() {
        return this.state.date.format("MMMM")
    }

    year() {
        return this.state.date.format('Y')
    }

    firstDayOfMonth() {
        let date = this.state.date
        let firstDay = moment(date).startOf('month').format('d')
        return firstDay
    }

    showMonth() {
        this.setState({
            showMonthTable: !this.state.showMonthTable,
            showYearTable: !this.state.showYearTable
        })
    }

    showYear() {
        this.setState({
            showYearTable: !this.state.showYearTable,
            showMonthTable: !this.state.showMonthTable
        })
    }

    getDates(startDate, stopDate) {
        var dateArray = []
        var currentDate = moment(startDate)
        var stopDate = moment(stopDate)
        while(currentDate <= stopDate) {
            dateArray.push(moment(currentDate).format('YYYY'))
            currentDate = moment(currentDate).add(1, "year")
        }
        return dateArray
    }
    
    setmonth(e, month) {

        let monthNo = this.state.allMonths.indexOf(month); //find the index of the month that is pass as argumnt
        let date = Object.assign({}, this.state.date); //copies the state date
        date = moment(date).set("month", monthNo); //sets the date to month property that was passed thru
        this.setState({
            date: date,
            showMonthTable: !this.state.showMonthTable
        })
    };

    ListOfMonths(props) {
        let months = []
        props.data.map(data => {
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

    setYear(year) {
        let date = Object.assign({}, this.state.date)
        date = moment(date).set('year', year)
        this.setState({
            date: date,
            showYearTable: !this.state.showYearTable
        })
    }

    getYears(startYear, stopYear) {
        let yearArray = []
        let currentYear = moment(startYear)
        let lastYear = moment(stopYear)
        while (currentYear <= lastYear) {
            yearArray.push(moment(currentYear).format('YYYY'))
            currentYear = moment(currentYear).add(1, 'year')
        }
        return yearArray
    }

    ListOfYear(props) {
        let years = []
        let yearlist = moment().set('year', props).add('year', 12).format('Y')

        let yearsLater = props.getYears(props, yearlist)

        yearsLater.map(data => {
            years.push(
                <td key={data} onClick={e =>{props.setYear(data)}}>
                    {data}
                </td>
            )
        })
        let rows = []
        let cells = []

        years.forEach((row, i) => {
            if(i%3 !== 0 || i===0) {
                cells.push(row)
            } else {
                rows.push(cells)
                cells = []
                cells.push(row)
            }
        })
        rows.push(cells)
        let listyear = rows.map((d,i) => {
            return <tr>{d}</tr>
        })

        return (
            <table className="calendar">
                <thead>
                    <tr>
                        <th>Select a Yeah</th>
                    </tr>
                </thead>
                <tbody>{listyear}</tbody>
            </table>
        )
    }

    onPrev() {
        let curr = ''
        if(this.state.showMonthTable === true) {
            curr = 'year'
        } else {
            curr = 'month'
        }
        this.setState({
            date: this.state.date.subtract(1, curr)
        })
    }

    onNext() {
        let curr = ''
        if(this.state.showMonthTable === true) {
            curr = 'year'
        } else {
            curr = 'month'
        }
        this.setState({
            date: this.state.date.add(1, curr)
        })
    }

    selectDay(e, d) {
        this.setState({
            selectDay: d
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
                <td key={d} onClick={e => {this.selectDay(e,d)}}>
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

        let daysinmonth = rows.map((d) => {
            return <tr className='align-left' key={d}>
                        {d}
                    </tr>
        })

        return (
            <div className='container'>
                {this.state.showYearTable && <this.ListOfYear data={this.year()} getYears={this.getYears} setYear={this.setYear} />}
                {this.state.showMonthTable && <this.ListOfMonths data={moment.months()} setmonth={this.setmonth} />}
                <div className='calendar'>
                    <header>
                        <h2 onClick={this.showMonth}>{this.month()}</h2>
                        <h2 onClick={this.showYear}>{this.year()}</h2>
                        <a className="btn-prev fontawesome-angle-left" href="#" onClick={this.onPrev}></a>
				        <a className="btn-next fontawesome-angle-right" href="#" onClick={this.onNext}></a>
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
                <h1>Selected day is: {this.state.selectDay}</h1>
            </div>
        )
    }
}

export default Calender