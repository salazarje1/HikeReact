import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik'; 

import './Signup.css'; 

const validate = values => {
    const errors = {}; 
    if(!values.username) {
        errors.username = "Required";
    } else if (values.username.length > 30) {
        errors.username = "Must be 15 characters or less"; 
    }

    if(!values.firstName) {
        errors.firstName = "Required";
    } else if (values.firstName.length > 30) {
        errors.firstName = "Must be 15 characters or less"; 
    }
    
    if(!values.lastName) {
        errors.lastName = "Required";
    } else if (values.lastName.length > 30) {
        errors.lastName = "Must be 15 characters or less"; 
    }
    
    if(!values.email) {
        errors.email = "Required";
    } else if (values.email.length > 30) {
        errors.email = "Must be 15 characters or less"; 
    }
    
    if(!values.password) {
        errors.password = "Required";
    } else if (values.password.length > 30) {
        errors.password = "Must be 15 characters or less"; 
    }

    if(!values.confirmPassword) {
        errors.confirmPassword = "Required";
    } else if (!(values.confirmPassword === values.password)) {
        errors.confirmPassword = "Passwords must match"; 
    }

    return errors
}

const SignupForm = ({ signup }) => {
    const history = useHistory();

    const formik = useFormik({
        initialValues: {
            username: '',
            firstName: '', 
            lastName: '',
            email: '',
            password: '',
            confirmPassword: ''
        },
        validate,
        onSubmit: async (values) => {
            await signup(values);
            history.push("/")
        }
    })
    

    return (
        <form className="Signup-form" onSubmit={formik.handleSubmit}>
            <h1>Sign Up</h1>
            <label htmlFor='username'>Username</label>
            <input type="text" name="username" id="username" value={formik.values.username} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.username && formik.errors.username ? <div className='error'>{formik.errors.username}</div> : null}

            <label htmlFor='firstName'>First Name</label>
            <input type="text" name="firstName" id="firstName" value={formik.values.firstName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.firstName && formik.errors.firstName ? <div className='error'>{formik.errors.firstName}</div> : null}

            <label htmlFor='lastName'>Last Name</label>
            <input type="text" name="lastName" id="lastName" value={formik.values.lastName} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.lastName && formik.errors.lastName ? <div className='error'>{formik.errors.lastName}</div> : null}

            <label htmlFor='email'>Email</label>
            <input type="text" name="email" id="email" value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.email && formik.errors.email ? <div className='error'>{formik.errors.email}</div> : null}

            <label htmlFor='password'>Password</label>
            <input type="password" name="password" id="password" value={formik.values.password} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.password && formik.errors.password ? <div className='error'>{formik.errors.password}</div> : null}

            <label htmlFor='confirmPassword'>Confirm Password</label>
            <input type="password" name="confirmPassword" id="confirmPassword" value={formik.values.confirmPassword} onBlur={formik.handleBlur} onChange={formik.handleChange} />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? <div className='error'>{formik.errors.confirmPassword}</div> : null}


            <button className='btn'>Submit</button>
        </form>
    )
}

export default SignupForm; 