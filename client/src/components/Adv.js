import moment from 'moment'
import { FaLocationArrow, FaBriefcase, FaCalendarAlt } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import Wrapper from '../assets/wrappers/Adv'
import AdvInfo from './AdvInfo'


const Adv = ({ _id, title, advLocaion, status, details, foodType, createdAt }) => {

  const { setEditAdv, deleteAdv } = useAppContext()

  let date = moment(createdAt)
  date = date.format('MMMM Do YYYY, h:mm:ss a');
  return (
    <Wrapper>
      <header>
        <div className="main-icon">{foodType.charAt(0)}</div>
        <div className="info">
          <h5>{title}</h5>
          <p>{details}</p>
        </div>
      </header>
      <div className="content">
        <div className="content-center">
          <AdvInfo icon={<FaLocationArrow />} text={advLocaion} />
          <AdvInfo icon={<FaCalendarAlt />} text={date} />
          <AdvInfo icon={<FaBriefcase />} text={details} />
          <div className={`status ${status}`}>{status}</div>
        </div>
        <div className="actions">
          <Link to='/add-adv' className='btn edit-btn' onClick={() => {
            setEditAdv(_id)
          }}>
            Edit
          </Link>
          <button type='button' className='btn delete-btn' onClick={() => {
            deleteAdv(_id)
          }}>Delete</button>
        </div>
      </div>
    </Wrapper>
  )
}

export default Adv