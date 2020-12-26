import React from 'react';
import { FormInput } from '../form-input/form-input.component';
import { CustomButton } from '../custom-button/custom-button.component';

import './sign-up.styles.scss';

// npm modules
const tata = require('tata-js');

class SignUp extends React.Component {
    constructor() {
        super();

        this.state = {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: ''
        }
    }

    handleSubmit = async event => {
        event.preventDefault();

        const {displayName, name, password, confirmPassword} = this.state;

        if (password !== confirmPassword) {            
            tata.error('Error', 'Password not match!', {
                animate: 'slide'
            })
            return;
        }


    }

    handleChange = event => {
        const { value, name } = event.target;
        this.setState({ [name]: value })
    }

    render() {
        const {displayName, email, password, confirmPassword} = this.state;
        return (
            <div className='sign-up'>
                <h2 className='title'>Do not have an account</h2>
                <span>Sign up with your email and password</span>
                <form className='sign-up-form' onSubmit={ this.handleSubmit }>
                    <FormInput 
                        name="displayName" 
                        type="text" 
                        value={displayName} 
                        onChange={this.handleChange}
                        label='Display Name'
                        required 
                    />  

                    <FormInput 
                        name="email" 
                        type="email" 
                        value={email} 
                        onChange={this.handleChange}
                        label='Email'
                        required 
                    />                    

                    <FormInput 
                        name="password" 
                        type="password" 
                        value={password} 
                        onChange={this.handleChange}
                        label='Password'
                        required 
                    />

                    <FormInput 
                        name="confirmPassword" 
                        type="password" 
                        value={confirmPassword} 
                        onChange={this.handleChange}
                        label='Confirm Password'
                        required 
                    />  
                    <CustomButton type="submit">Sign Up</CustomButton>                    
                </form>

            </div>
        )
    }
}

export default SignUp;