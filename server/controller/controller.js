const jwt = require("jsonwebtoken");

const Credential = require("../models/credentials");
const Task = require("../models/tasks");

exports.postVerifyLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Credential.verifyCredentials(email, password, (result) => {
        // console.log(result);

        if (result) {
            const token = jwt.sign(
                { email: email },
                JWT_SECRET="ToDoAppToken"
            );
            res.json({ email, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
};

exports.getHome = (req, res, next) => {
    const key = req.body.key;
    Task.getTasks(key, (tasks) => {
        res.json({ tasks });
    });
};

exports.postAddTask = (req, res, next) => {
    const taskName = req.body.taskName;
    const task = new Task(taskName);
    addTasks(task, (success) => {
        if (success) {
            res.status(201).json({ message: "Task added successfully", task });
        } else {
            res.status(500).json({ message: "Failed to add task" });
        }
    });
};
