import React from 'react'
import { useSelector } from 'react-redux'
import './Addtask.css';
import { useForm } from 'react-hook-form'
import axios from 'axios';
import TaskHistory from '../taskhistory/TaskHistory';
import Addtaskmodel from '../addtaskmodel/Addtaskmodel';

export default function AddTask() {
  const [modalShow, setModalShow] = React.useState(false);


  let userr = JSON.parse(localStorage.getItem('user'));
  console.log(userr);
  let form = useForm();

  // const addtask = async (taskdata) => {
  //   taskdata.userID = userr._id;
  //   console.log(taskdata);
  //  await axios.post('/createtask', { taskdata: taskdata }).then((resp) => {
  //     console.log(resp.data);
  //   });

  //   form.reset();
  // }

  return (
    <div>
      <div className='modal-body'>
        <div className='container'>
          <div className='sign-up-container'>
            <div className='row'>
            </div>
            <div className="row">
              <button onClick={() => setModalShow(true)}
                type="submit"
                className={`col s12 btn btn-larger indigo height`}>
                Add Task
              </button>
            </div>
            <Addtaskmodel
              show={modalShow}
              onHide={() => setModalShow(false)}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
