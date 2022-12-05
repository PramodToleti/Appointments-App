import {Component} from 'react'
import {format} from 'date-fns'
import {v4 as uuidv4} from 'uuid'
import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    title: '',
    date: '',
    appointmentsList: [],
    isStarred: false,
    isFiltered: false,
  }

  toggleFilter = () => {
    this.setState(prevState => ({isFiltered: !prevState.isFiltered}))
  }

  onToggleStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(each => {
        if (each.id === id) {
          return {...each, isStarred: !each.isStarred}
        }
        return each
      }),
    }))
  }

  onChangeDate = event => {
    this.setState({date: event.target.value})
  }

  onChangeTitle = event => {
    this.setState({title: event.target.value})
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {title, date, isStarred} = this.state
    const [year, month, day] = date.split('-')
    const stringDate = format(new Date(year, month, day), 'dd MMMM yyyy, EEEE')
    const newAppointment = {
      id: uuidv4(),
      title,
      date: stringDate,
      isStarred,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      title: '',
      date: '',
    }))
  }

  showAppointments = () => {
    const {isFiltered, appointmentsList} = this.state
    if (isFiltered === true) {
      const starredAppointments = appointmentsList.filter(
        each => each.isStarred === true,
      )
      if (starredAppointments.length === 0) {
        return (
          <div className="no-appointments-container">
            <p className="no-appointments">No Appointments Found</p>
          </div>
        )
      }
      return starredAppointments.map(each => (
        <AppointmentItem
          appointmentDetails={each}
          key={each.id}
          onToggleStarred={this.onToggleStarred}
        />
      ))
    }
    if (appointmentsList.length === 0) {
      return (
        <div className="no-appointments-container">
          <p className="no-appointments">No Appointments Found</p>
        </div>
      )
    }
    return appointmentsList.map(each => (
      <AppointmentItem
        appointmentDetails={each}
        key={each.id}
        onToggleStarred={this.onToggleStarred}
      />
    ))
  }

  render() {
    const {title, date, isFiltered} = this.state
    const filterStyles = isFiltered ? 'filter-starred-button' : 'starred-button'
    return (
      <div className="bg-container">
        <div className="appointment-card">
          <div className="input-container">
            <form className="input-field" onSubmit={this.onAddAppointment}>
              <h1 className="heading">Add Appointment</h1>
              <label htmlFor="titleInput" className="label-name">
                TITLE
              </label>
              <input
                type="text"
                value={title}
                id="titleInput"
                placeholder="Title"
                className="input"
                onChange={this.onChangeTitle}
              />
              <label htmlFor="dateInput" className="label-name">
                DATE
              </label>
              <input
                type="date"
                value={date}
                onChange={this.onChangeDate}
                className="input"
                id="dateInput"
              />
              <button className="add-button" type="submit">
                Add
              </button>
            </form>
            <img
              src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
              alt="appointments"
              className="appointment-image"
            />
          </div>
          <hr className="separator" />
          <div className="appointments-header">
            <h1 className="user-appointments-heading">Appointments</h1>
            <button
              type="button"
              onClick={this.toggleFilter}
              className={filterStyles}
            >
              Starred
            </button>
          </div>
          <ul className="user-appointments-container">
            {this.showAppointments()}
          </ul>
        </div>
      </div>
    )
  }
}

export default Appointments
