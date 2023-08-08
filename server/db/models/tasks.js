const mongoose = require('mongoose');

const tasksSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  finished: {
    type: Boolean,
    default: false, // By default, tasks are not finished
  },
});

const Tasks = mongoose.model('tasks', tasksSchema);

module.exports = Tasks;
