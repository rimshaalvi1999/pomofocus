
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Signup from './components/signup/Signup';
import Login from './components/login/Login';
import Header from './components/header/Header';
import Dashbaords from './components/dashboards/Dashbaords';
import { login } from './store/actions/dataAction';
import {useSelector,useDispatch } from 'react-redux';
import { useState,useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
function App() {
let dispatch=useDispatch();

let [ulogged,setUlogged]=useState({});
let cu = useSelector(state => state.data.cu);
//   useEffect(() => {
//     axios.post('/session-check', {
//       token:localStorage.getItem('token')
//     }).then((resp) => {
//       if (resp.data) {
//         dispatch(login(resp.data.user));
//         setUlogged(resp.data.user.userName);
//       }
//     })
// // let token=localStorage.getItem('token');
// //      if(token){
// //       setUlogged(cu.userName);
// //      }

//   }, []);


  return (
    <div className="App">

      <BrowserRouter>
        <Header  />
        <Routes>
          <Route path='/Signup' element={<Signup />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/Dashbaords' element={<Dashbaords />} />
        </Routes>


        <ToastContainer> </ToastContainer>
      </BrowserRouter>
     
    </div>
  );
}

export default App;
