import './index.css'

const AppointmentItem = props => {
  const {appointmentDetails, onToggleStarred} = props
  const {id, title, date, isStarred} = appointmentDetails
  const formattedDate = `Date: ${date}`
  const starImage = isStarred
    ? 'https://assets.ccbp.in/frontend/react-js/appointments-app/filled-star-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/appointments-app/star-img.png'

  const onClickStarred = () => {
    onToggleStarred(id)
  }

  return (
    <li className="appointment-sub-card">
      <div>
        <h1 className="appointment-title">{title}</h1>
        <p className="appointment-date">{formattedDate}</p>
      </div>
      <button className="star-button" type="button" onClick={onClickStarred}>
        <img src={starImage} alt="star" className="star-icon" />
      </button>
    </li>
  )
}
export default AppointmentItem
