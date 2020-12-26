import React from 'react';
import { Link } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/router.svg';

import './header.styles.scss';

const Header = () => (
    <div className='header'>
        <Link className='logo-container' to='/'>
            <Logo className='logo' />
        </Link>
        <div className='options'>
            <Link className='option' to='/monitor'>
                Monitor
            </Link>
            <Link className='option' to='/schedule'>
                Schedule
            </Link>
            <Link className='option' to='/contact'>
                Contact 
            </Link>
            <Link className='option' to='/signin'>
                Sign In 
            </Link>
        </div>
    </div>
)

export default Header;