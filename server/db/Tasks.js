const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    key: { type: String, required: true },
    tasks: { type: Array, required: true }
}, { versionKey: false });

const Tasks = mongoose.model('Tasks', taskSchema);

exports.Tasks = Tasks;