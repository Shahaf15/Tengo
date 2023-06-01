import Wrapper from '../assets/wrappers/Navbar.js'
import { FaAlignLeft, FaUserCircle, FaCaretDown } from 'react-icons/fa'
import { useAppContext } from '../context/appContext.js'
import Logo from './Logo.js'
import { useState } from 'react'

const NavBar = () => {
    const [showLogout, setShowLogout] = useState(false)
    const { toggleSidebar, logoutUser, user } = useAppContext()
    return (
        <Wrapper>
            <div className='nav-center'>
                <button className='toggle-btn' type='button' onClick={toggleSidebar}>
                    <FaAlignLeft />
                </button>
                <div>
                    <Logo />
                    <h3 className='logo-text'>dashboard</h3>
                </div>
                <div className='btn-container'>
                    <button
                        type='button'
                        className='btn'
                        onClick={() => setShowLogout(!showLogout)}
                    >
                        <FaUserCircle />
                        {user?.name}
                        <FaCaretDown />
                    </button>
                    <div className={showLogout ? 'dropdown show-dropdown' : 'dropdown'}>
                        <button type='button' className='dropdown-btn' onClick={logoutUser}>
                            logout
                        </button>
                    </div>
                </div>
            </div>

        </Wrapper>
    )
}

export default NavBar