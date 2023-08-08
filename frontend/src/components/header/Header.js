import React from 'react'
import { Link } from 'react-router-dom';
import './Header.css';
import chart from '../../assets/graph-white.png';
import settings from '../../assets/config-white.png'
import login from '../../assets/user-white.png';
import logo from '../../assets/logo.png';
import { logout } from '../../store/actions/dataAction';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from 'react';
import { userok } from '../../store/actions/dataAction';
export default function Header() {
  let [ulogged, setUlogged] = useState({});
  let isuser = useSelector(state => state.data.isuser);
  let cu = useSelector(state => state.data.cu);
  let dispatch = useDispatch();



  useEffect(() => {
    // axios.post('/session-check', {
    //   anc: localStorage.getItem('token')
    // }).then((resp) => {
    //   if (resp.data) {
    //     dispatch(login(resp.data.user));
    //     setUlogged(resp.data.user.userName);
    //   }
    // })
    let token = localStorage.getItem('token');
    if (token) {
      dispatch(userok(true));
      setUlogged(cu.userName);
    }
    else {
      dispatch(userok(false));

    }

  }, []);


  return (
    <>
      <header className='container header'>
        <div className='content'>
          <h1 className='text'>
            <Link to="/" className='link'>
              <img src={logo} alt="pomofocus-logo" className='logo' />
              <span className='logo-text'>
                Pomofocus
              </span>
            </Link>
          </h1>
          <ul className='nav'>
            <li>
              <Link to="/report" className='link' >
                <button className='button' icon={chart}>
                  <img className='iconimage' src={chart} alt="" />
                  <span>
                    Report
                  </span>
                </button>
              </Link>
            </li>
            <li>
              <Link to="/settings" className='link'>
                <button className='button' icon="settings">
                  <img className='iconimage' src={settings} alt="" />
                  <span>
                    Setting
                  </span>
                </button>
              </Link>
            </li>
            {
              !isuser ?
                <>
                  <li>
                    <Link to="/Login" className='link'>
                      <button className='button' icon="settings">
                        <img className='iconimage' src={login} alt="" />
                        <span>
                          Login
                        </span>
                      </button>
                    </Link>
                  </li>
                </>
                :
                <>
                  <li>
                    <Link to="/Login" onClick={() => {
                      dispatch(logout());
                      dispatch(userok(false));
                      localStorage.removeItem('token');
                      localStorage.removeItem('user');
                    }}
                      className='link'>
                      <button className='button' icon="settings">
                        <img className='iconimage' src={login} alt="" />
                        <span>
                          Logout
                        </span>
                      </button>
                    </Link>
                  </li>
                </>
            }
          </ul>
        </div>
      </header>

    </>


  )
}
