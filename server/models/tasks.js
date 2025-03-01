const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    key: { type: String, required: true },
    tasks: { type: Array, required: true }
}, { versionKey: false });

const Tasks = mongoose.model('Tasks', taskSchema);

const addTasks = async function(taskDetails, callback) {
    try {
        // Find the document with the given key
        const userTaskDetails = await Tasks.findOne({ key: taskDetails.key });

        if (!userTaskDetails) {
            callback(false); // If no document found, return false
            return;
        }

        const newTask = { taskName: taskDetails.taskName, completion: false };

        userTaskDetails.tasks.push(newTask);

        await userTaskDetails.save();

        callback(true); 
    } catch (err) {
        console.error("Error saving task:", err);
        callback(false); 
    }
};

const getTasks = async function(key, callback) {
    try {
        const userTasks = await Tasks.findOne({ key: key });
        callback(userTasks.tasks);
    } catch (err) {
        callback([]);
    }
};

module.exports = { Tasks, addTasks, getTasks };
