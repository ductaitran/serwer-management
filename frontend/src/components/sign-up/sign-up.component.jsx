import React, { useEffect, useState } from 'react';
import { FormInput } from '../form-input/form-input.component';
import { CustomButton } from '../custom-button/custom-button.component';

import './sign-up.styles.scss';
import { userService } from '../../services/user.service';
import { Role } from '../../helpers/role';

// npm modules
const tata = require('tata-js');

function SignUp() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [body, setBody] = useState({});

    useEffect(() => {
        setBody({
            name: name,
            email: email,
            password: password,
            role: Role.Guest,
            location: {}
        });
    }, [name, email, password, confirmPassword]);

    function handleSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            tata.error('Error', 'Password not match!', {
                animate: 'slide'
            });            
            return;
        }
        console.log(body)
        signUp();              
    }

    function signUp() {
        userService.register(JSON.stringify(body))
            .then(result => {
                tata.success('Success', 'Account created', {
                    animate: 'slide'
                });
                
                ClearData();
            })
            .catch(e => {
                tata.error('Error', 'Account Existed, please use another email', {
                    animate: 'slide'
                })
            })
    }

    function ClearData() {
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
    }

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    function handleConfirmPasswordChange(e) {
        setConfirmPassword(e.target.value)
    }

    return (
        <div className='sign-up'>
            <h2 className='title'>Do not have an account</h2>
            <span>Sign up with your email and password</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                <FormInput
                    name="displayName"
                    type="text"
                    value={name}
                    onChange={handleNameChange}
                    label='Display Name'
                    required
                />

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

                <FormInput                    
                    name="confirmPassword"
                    type="password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    label='Confirm Password'
                    required
                />
                <CustomButton type="submit">Sign Up</CustomButton>
            </form>

        </div>
    )
}

export default SignUp;