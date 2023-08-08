import React from 'react'
import './TaskHistory.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'
import menuicon from '../../assets/icons8-menu-dots-24.png';
import deleteblack from '../../assets/delete-black.png';
import clearblack from '../../assets/clear-black.png';
import saveblack2 from '../../assets/save-black2.png';
import plusblack from '../../assets/plus-black.png';
import integrationblack from '../../assets/integration-black.png';
import tick from '../../assets/icons8-tick-30.png';


export default function TaskHistory() {
  let isuser = useSelector(state => state.data.isuser);
  let userr = JSON.parse(localStorage.getItem('user'));
  let [tasks, setTasks] = useState([]);

  // console.log(userr);


  // useEffect(() => {
  //   tasks.userID = userr._id;
  //   let data=tasks.userID;
  //   console.log(data);
  //   axios.get('/tasksShow',data).then((abc) => {
  //     setTasks(abc.data);
  //   })

  // }, []);

  // if(tasks.length=0){
  //  <h3>no task found</h3>
  // }


  useEffect(() => {
    if (userr && userr._id) {
      axios.get(`/tasksShow/${userr._id}`).then((abc) => {
        setTasks(abc.data);
      }).catch((error) => {
        console.error("no task found");
      });
    }
  }, []);

  // useEffect(() => {
  //   axios.get('/tasksShow').then((abc) => {
  //     setTasks(abc.data);
  //   })

  // }, [tasks])
  console.log(tasks);

   const handletomakefinish=async(taskid)=>{
    try {
      await axios.put(`/taskfinished/${taskid}`).then((res)=>{
        console.log('working',res.data);
      })
      axios.get(`/tasksShow/${userr._id}`).then((abc) => {
        setTasks(abc.data);
      });
    } catch (error) {
      console.error(error);
    }
   }



   const handletodeletefinishedtask = async () => {
    try {
      const response = await axios.delete(`/deletefinishedtasks/${userr._id}`);
      console.log(response.data);
      axios.get(`/tasksShow/${userr._id}`).then((abc) => {
        setTasks(abc.data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <>
      {isuser &&
        <div className='modal-body'>
          <div className='container'>
            <div className='sign-up-container'>
              <div className=' history' >
                <h3>Tasks</h3>
                <div>
                  <button className='button menubtn'
                    data-bs-toggle="dropdown" aria-expanded="false">
                    <img className='icon' src={menuicon} alt="" />
                  </button>
                  <ul class="dropdown-menu">
                    <li className='dromdownlist' onClick={handletodeletefinishedtask} ><img className='iconnimage' src={deleteblack} alt="" /><span class="dropdown-item" href="#">Clear finished tasks</span></li>
                    <li className='dromdownlist'><img className='iconnimage' src={clearblack} alt="" /><span class="dropdown-item" href="#">Clear act promodoros</span></li>
                    <li className='dromdownlist'><img className='iconnimage' src={saveblack2} alt="" /><span class="dropdown-item" href="#">Save as template</span></li>
                    <li className='dromdownlist'><img className='iconnimage' src={plusblack} alt="" /><span class="dropdown-item" href="#">Add from templates</span></li>
                    <li className='dromdownlist'><img className='iconnimage' src={integrationblack} alt="" /><span class="dropdown-item" href="#">Import from todolist</span></li>
                    <li className='dromdownlist'
                    onClick={async()=>{
                      if (userr && userr._id) {
                        axios.delete(`/tasksdeleted/${userr._id}`).then((abc) => {
                          setTasks(abc.data);
                        }).catch((error) => {
                          console.error("no task found");
                        });
                      }     
                    }}
                     ><img className='iconnimage' src={deleteblack} alt="" /><span class="dropdown-item" href="#">Clear all tasks</span></li>
                  </ul>
                </div>
              </div>
              <div className='row'>
                {tasks.length > 0 ? (
                  tasks.map((j, index) => (
                    <ul className='list' key={index}>
                      <li className='plus'>
                        <button className='finishedbutton' onClick={()=>handletomakefinish(j._id)}><img className='icon finishedicon' src={tick} alt="" /></button>
                        {j.title}
                      </li>
                    </ul>
                  ))
                ) : (
                  <h3>No task found</h3>
                )}

              </div>
            </div>
          </div>
        </div>}
    </>
  )
}
