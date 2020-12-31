import React, { useState } from 'react';

import { FormInput } from '../form-input/form-input.component';
import { CustomButton } from '../custom-button/custom-button.component';
import { authenticationService } from '../../services/authentication.service';

import './sign-in.styles.scss';
import { useHistory, withRouter } from 'react-router';

// npm modules
const tata = require('tata-js');

function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    function handleSubmit(e) {
        e.preventDefault();
        signIn();
        setEmail('');
        setPassword('');
    }

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function signIn() {
        authenticationService.signin(email, password)
            .then(result => { 
                tata.success('Welcome back', JSON.parse(result).name, {
                    animate: 'slide',                    
                    position: 'mr'
                });                
                history.push('/') 
                window.location.reload();
            })
            .catch(e => {
                tata.error('Oops!', 'Wrong email or password', {
                    animate: 'slide',                    
                })
            })        
    }

    return (
        <div className='sign-in'>
            <h2 className='title'>Already have an account</h2>
            <span>Sign in with your email and password</span>
            <form onSubmit={handleSubmit}>
                <FormInput
                    name="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    label='Email'
                    required
                />

                <FormInput
                    name="password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    label='Password'
                    required
                />
                <CustomButton type="submit">Sign In</CustomButton>
            </form>

        </div>
    )
}

export default withRouter(SignIn);