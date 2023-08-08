import React from 'react'

import { useSelector } from 'react-redux'

import { useForm } from 'react-hook-form'
import axios from 'axios';
import TaskHistory from '../taskhistory/TaskHistory';
import AddTask from '../addtask/AddTask';


export default function Dashbaords() {
  let cu = useSelector(state => state.data.cu);
  let isuser = useSelector(state => state.data.isuser);
  let userr = JSON.parse(localStorage.getItem('user'));
  console.log(userr);
  console.log(isuser);
  let form = useForm();

  const addtask = async (taskdata) => {
    taskdata.userID = userr._id;
    console.log(taskdata);
    axios.post('/createtask', { taskdata: taskdata }).then((resp) => {
      console.log(resp.data);
    });

    form.reset();
  }



  return (

    <div>
      {isuser &&
        <>
          <h4>Wellcome {userr.userName}</h4>
        
          <TaskHistory />
          <AddTask />



        </>
      }
    </div>
  )
}

