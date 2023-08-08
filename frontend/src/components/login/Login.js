import React from 'react'
import { useState } from 'react'
import './Login.css';
import Button from '../button/Button';
import FormInput from '../form-input/FormInput';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { base_url } from '../../Url';
import { login } from '../../store/actions/dataAction';
import { userok } from '../../store/actions/dataAction';

const defaultFormFields = {
  email: '',
  password: ''
}

export default function Login() {

  let navigate=useNavigate();
  let dispatch=useDispatch();

  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  }



 


  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value })
  }



  const loginuser = async (event) => {
    event.preventDefault();
    console.log(email);
    console.log(password);

  let resp=  await axios.post(`${base_url}/loginuser`,{email,password});
  if(resp.data){
    localStorage.setItem('token', resp.data.token);
    localStorage.setItem('user', JSON.stringify(resp.data.user) );
    console.log(resp.data.token);
    console.log(resp.data.user);
    dispatch(login(resp.data.user));
    dispatch(userok(true))
    toast.success('User login successfully');
    navigate('/Dashbaords');

  }
      

    resetFormFields();

  };




  return (
    <div className='modal-body'>
      <div className='container'>
        <div className='sign-up-container'>

          <h2>I already have an account</h2>
          <h4>Login</h4>
          <form onSubmit={loginuser}>

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



            <div className="buttons-container">
              <Button type='submit' text='Sign In' />
            </div>
            <div>
              <p>Dont have any account!!!</p>
              <Link to='/Signup' className='linkk'>
                <h6>Sign Up</h6>
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
