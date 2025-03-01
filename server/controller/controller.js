const jwt = require("jsonwebtoken");

const Credential = require("../models/credentials");
const Task = require("../models/tasks");
const randomKeyGen = require("../util/keyGenerator");

exports.postVerifyLogin = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    Credential.verifyCredentials(email, password, (result) => {
        if (result) {
            const key = result;
            const token = jwt.sign(
                { email: email, key: key },
                JWT_SECRET="ToDoAppToken"
            );
            res.json({ email, key, token });
        } else {
            res.status(401).json({ message: "Invalid credentials" });
        }
    });
};

exports.getHome = (req, res, next) => {
    const key = req.params.key;
    Task.getTasks(key, (tasks) => {
        res.json({ tasks });
    });
};

exports.postAddTask = (req, res, next) => {
    const taskName = req.body.taskName;
    const key = req.body.key;
    const taskDetails = {
        taskName: taskName,
        key: key
    };
    Task.addTasks(taskDetails, (success) => {
        if (success) {
        res.status(201).redirect(`/home/${key}`);

        } else {
        res.status(500).redirect(`/home/${key}`);
        }
    });
};


exports.postRegisterUser = (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
    
    Credential.isUserRegistered(email, (result) =>{
        try{
            if(result) {
                res.status(400).json({ message: "User already registered" });
            }
            else{
                const key = randomKeyGen(email, password);
                Credential.addUser(email, password, key, (userAdded)=>{
                    if(userAdded){
                        Task.addUser(key, (userTaskCreated)=>{
                            if(userTaskCreated){
                                res.redirect("/");
                            }
                            else{
                                res.redirect("/");
                            }
                        })
                    }
                    else{
                        res.redirect("/");
                    }
                });
            }
        }
        catch(e){
            res.redirect("/");
        }
    });
};