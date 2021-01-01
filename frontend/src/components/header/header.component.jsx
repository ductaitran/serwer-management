import React from 'react';
import { Link, useHistory } from 'react-router-dom';

import { ReactComponent as Logo } from '../../assets/router.svg';
import { Role } from '../../helpers/role';
import { authenticationService } from '../../services/authentication.service';

import './header.styles.scss';

export default function Header({ currentUser }) {
    const history = useHistory();
    function signOut() {
        authenticationService.signout();
        history.push('/signin');
        window.location.reload();
    }

    return (
        <div className='header'>
            <Link className='logo-container' to='/'>
                <Logo className='logo' />
            </Link>
            <div className='options'>
                {/* render link to monitor page if admin/user logged in */}
                {

                    currentUser && (currentUser.role === Role.Admin || currentUser.role === Role.User) ?
                        (<Link className='option' to='/monitor'>Monitor</Link>)
                        : console.log('')

                }
                <Link className='option' to='/schedule'>
                    Schedule
                </Link>
                <Link className='option' to='/contact'>
                    Contact
                </Link>

                {/* render link to admin page if admin logged in */}
                {

                    currentUser && (currentUser.role === 'Admin') ?
                        (<Link className='option' to='/admin'>Admin</Link>)
                        : console.log('')

                }

                {/* check if user logged in or not */}
                {
                    currentUser ?
                        (<div className='option' onClick={signOut}>Sign Out</div>)
                        :
                        (<Link className='option' to='/signin'>
                            Sign In
                        </Link>)
                }

            </div>
        </div>
    );
}
