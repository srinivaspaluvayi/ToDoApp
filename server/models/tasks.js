const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    key: { type: String, required: true },
    tasks: { type: Array, required:true}
});

const Task = mongoose.model('Tasks', taskSchema);

const addTasks = function(task, callback) {
    const newTask = new Task(task);
    newTask.save((err) => {
        if (err) {
            callback(false);
        } else {
            callback(true);
        }
    });
};

const getTasks = async function(key, callback) {
    try{
        const userTasks = await Task.findOne({ key: key });
        callback(userTasks.tasks);
    }
    catch(err) {
        callback([]);
    }
};

module.exports = { Task, addTasks, getTasks };
