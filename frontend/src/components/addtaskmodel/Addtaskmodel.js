import React from 'react'
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux';
import { v4 } from 'uuid';
import { base_url } from '../../Url';
import axios from 'axios';
export default function Addtaskmodel(props) {
  let taskform = useForm();
  let dispatch = useDispatch();
  // let user = useSelector(store=>store.createsection.cu);
  let userr = JSON.parse(localStorage.getItem('user'));


  const createtask = async (taskdata) => {
    taskdata.userID = userr._id;
    console.log(taskdata);

    try {
      console.log(`${base_url}/createtask`)
      const request = await axios.post(`${base_url}/createtask`, taskdata)
      console.log(request.data);
    }
    catch (e) {
      console.log('error at front end', e);
    }

    taskform.reset();
  }

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Modal heading
        </Modal.Title> */}

      </Modal.Header>
      <form className="col s12" id="reg-form" onSubmit={taskform.handleSubmit(createtask)}>
        <Modal.Body>
          {/* <h4>Centered Modal</h4>
        <p>
          Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
          dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
          consectetur ac, vestibulum at eros.
        </p> */}
          <div className="row">
            <div className="input-field col s6">
              <input {...taskform.register('title')} id="title" type="text"
                placeholder='Add Task'
                className="validate" required="" />
              {/* <label htmlFor="title">Job Title</label> */}
            </div>
          </div>
          {/* <div className="row">
          <div className="input-field col s6">
            <button
              className="btn btn-large btn-register waves-effect waves-light"
              type="submit"
              name="action">
              Create Job
             
            </button>
          </div>
        </div> */}
        </Modal.Body>
        <Modal.Footer>
          <button onClick={props.onHide}>cancel</button>
          <button
            type="submit"
            name="action"
            onClick={props.onHide}>Save Task</button>
        </Modal.Footer>
      </form>
    </Modal>
  )
}
