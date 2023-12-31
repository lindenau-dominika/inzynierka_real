import {Link} from 'react-router-dom'
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';
import React, { useState } from 'react';

export const LoginPage = (props) => {
    if (props.form === 'LoginForm') {
        return (
            <LoginForm/>
        )
    }
    if (props.form === 'RegisterForm') {
        return (
            <RegisterForm />
        )
    }
  }

  export default LoginPage;