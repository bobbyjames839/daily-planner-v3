import { Link } from "react-router-dom"
import '../styles/Nav.css'

export const Nav = () => {
  return (
    <div className="nav">
      <p>dailyPlanner</p>
      <div className="nav-inner">
        <Link className='nav-link' to={'/'}>Home</Link>
        <Link className='nav-link' to={'/reminders+goals'}>Reminders & Goals</Link>
      </div>
    </div>
  )
}