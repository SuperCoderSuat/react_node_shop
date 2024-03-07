import './Navbar.scss'
import navlogo from '../../assets/images/nav-logo.svg'
import navProfile from '../../assets/images/nav-profile.svg'
// src={navProfile}

const Navbar = () => {
    return (
        <div className='navbar'>
            <img src={navlogo} alt="" className="nav-logo" />
            <img  alt="" className="nav-profile" /> 
        </div>
    );
}
 
export default Navbar;