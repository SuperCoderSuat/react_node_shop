import logo from '../../assets/images/logo.png';
import cart_icon from '../../assets/images/cart_icon.png'
import './Navbar.scss';
import { useContext, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../../context/ShopContext';
import down_shop_icon from '../../assets/images/down_shop_icon.png'

const Navbar = () => {
    const [menu, setMenu] = useState("shop");
    const { getTotalCartItems } = useContext(ShopContext);
    const menuRef = useRef();

    const dropdown_toggle = (e) => {
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

    return (
        <div className='navbar'>
            <div className='nav-logo'>
                <img src={logo} alt="Logo" />
                <p>FashionFam</p>
            </div>
            <img className='nav-dropdown' onClick={dropdown_toggle} src={down_shop_icon} alt="" />
            <ul ref={menuRef} className='nav-menu'>
                <li onClick={() => setMenu("shop")}><Link to='/'>Shop</Link>{ menu === "shop" ? <hr/> : <></> }</li>
                <li onClick={() => setMenu("mens")}><Link to='/mens'>Men</Link>{ menu === "mens" ? <hr/> : <></> }</li>
                <li onClick={() => setMenu("womens")}><Link to='womens'>Women</Link>{ menu === "womens" ? <hr/> : <></> }</li>
                <li onClick={() => setMenu("kids")}><Link to='kids'>Kids</Link>{ menu === "kids" ? <hr/> : <></> }</li>
            </ul>
            <div className='nav-login-cart'>
                {localStorage.getItem('auth-token') ? <button onClick={() => {localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button> : <Link to='/login'><button>Login</button></Link>}
                <Link to='/cart'><img src={cart_icon} alt="Cart" /></Link>
                <div className='nav-cart-count'>{getTotalCartItems()}</div>
            </div>
        </div>
    );
}
 
export default Navbar;