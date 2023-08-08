let myExpres = require('express');
const bcrypt = require('bcrypt');
let app = myExpres();
let jwt = require('jsonwebtoken');
app.use(myExpres.json());

let User = require('./db/models/user');
let Tasks = require('./db/models/tasks');
require('./db/db.js');

const cors = require('cors');

app.use(cors());

// create user

app.post('/createUser', async (req, res) => {
  const user = new User(req.body);
  console.log(req.body);
  console.log(user);
  try {
    await user.save();
    res.json({
      success: true
    })
  } catch (e) {
    res.status(500).send(e);
  }
  console.log(req.body);
})


// login user
app.post('/loginuser', async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (req.body.password != user.password) {
      return res.status(400).json({ message: 'Incorrect password' });
    }
    if (user) {
      jwt.sign({
        myID: user._id,
      }, "hello hello hello", {
        expiresIn: '2d',
      }, (err, token) => {
        if (err) {
          console.error("Error signing the token:", err);
          return res.status(500).json({ message: 'Error signing the token' });
        }
        res.json({
          user, token,
        });
      })
    }
    else {
      res.json(null);
    }
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


// create task
app.post('/createtask', async (req, res) => {
  try {
    let user = await User.findOne({ _id: req.body.userID });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    let newtask = new Tasks({ title: req.body.title });
    await newtask.save();
    console.log(newtask);
    user.tasks.push(newtask);
    await user.save();

    return res.json({ newtask });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});



app.get('/tasksShow/:userID', async (req, res) => {

  try {
    const userID = req.params.userID;
    const user = await User.findOne({ _id: userID });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.tasks.length > 0) {
      console.log(user.tasks);
      const tasks = await Tasks.find({
        '_id': user.tasks
      });
      return res.json(tasks);
    }
    return res.json({ "message": "", "length": 0 });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }

});


// delete tasks

app.delete('/tasksdeleted/:userID', async (req, res) => {

  try {
    const userID = req.params.userID;
    const user = await User.findOne({ _id: userID });
    console.log(user);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    if (user.tasks.length > 0) {
      console.log(user.tasks);
      const taskIDs = user.tasks.map(task => task._id); 
      await Tasks.deleteMany({
        '_id': { $in: taskIDs }
      });

      user.tasks = [];
      await user.save();
      return res.json(user.tasks);
    }
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }

});

// update mark finished task
app.put('/taskfinished/:taskid', async (req, res) => {
  try {
    const taskID = req.params.taskid;
    const task = await Tasks.findOne({ _id: taskID });

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    task.finished = true;
    await task.save();

    return res.json({ message: 'Task marked as finished' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});



// Delete finished tasks
app.delete('/deletefinishedtasks/:userID', async (req, res) => {
  try {
    const userID = req.params.userID;
    const user = await User.findOne({ _id: userID });
console.log(user.userName)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
      // Print all tasks of the specific user
  console.log('All tasks of the user:');
  console.log(user.tasks);

  

//   // Filter the finished task IDs as an array
//   const finishedTaskIDs = user.tasks.filter(task => task.finished).map(task => task._id);
//   console.log('Finished task IDs:', finishedTaskIDs);

// //Now please print and than filter all tasks of that specifc user
//     if (!finishedTaskIDs) {
//       return res.json({ message: 'No finished tasks found for the user' });
//     }


//     // Unlink the finished task IDs from the user.tasks array
//     user.tasks.pull(...finishedTaskIDs);
//     await user.save();

//     // Delete the finished tasks from the Tasks model
//     await Tasks.deleteMany({
//       '_id': { $in: finishedTaskIDs }
//     });

//     console.log('Finished tasks deleted successfully');

//     return res.json({ message: 'Finished tasks deleted successfully' });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: e.message });
  }
});
















app.listen(process.env.PORT || 4000, () => {  //////////////////////////////////
  console.log("server working");               /////////////////////////////
})                                                 //////////////////////
