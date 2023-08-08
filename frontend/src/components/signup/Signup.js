import React from 'react'
import Button from '../button/Button';
import { useState } from 'react'
import './Signup.css';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FormInput from '../form-input/FormInput';
import axios from 'axios';


const defaultFormFields = {
  userName: '',
  email: '',
  password: '',
}

export default function Signup() {
  // let data = useForm();
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { userName, email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }

  const createaccount = async(e) => {
    e.preventDefault();



    console.log(userName);
   
    try {

      await axios.post('/createUser', {userName,email,password});
     console.log('user created successfully');
     toast.success('User created successfully');

    } catch (e) {
      console.log(e);
      toast.error('Error creating user');
     
    }

    resetFormFields();
  }




  return (
    <div className='modal-body'>
      <div className='container'>
        <div className='sign-up-container'>
          <h2>I do not have an account?</h2>
          <span>Sign up with your email and password</span>
          <form onSubmit={createaccount}>
            <FormInput
              label='userName'
              type="text"
              required
              id="userName"
              onChange={handleChange}
              name='userName'
              value={userName} />
            <FormInput
              label='Email'
              type="email"
              required
              onChange={handleChange}
              name='email'
              value={email} />


            <FormInput
              label='Password'
              type="password"
              required
              onChange={handleChange}
              name='password'
              value={password} />



            <Button type='submit' text='Sign Up' />


          </form>
        </div>
      </div>
    </div>
  )
}
