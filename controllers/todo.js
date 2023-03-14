const Task = require('../models/todoList');

exports.getList = (req, res, next)=>{
    
    const userId  = req.session.user._id;
    
    Task.find({userId}).then(taskList => {
        res.render('index', {tasks: taskList, pageTitle: 'All Tasks'})
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getAddTask = (req, res, next)=>{
    res.render('new', {pageTitle: 'New task'});
}

exports.postAddTask = (req, res, next)=>{
    const title = req.body.title;
    const description = req.body.description;
    const task = new Task({
        title: title,
        description: description,
        userId: req.session.user._id
    });
    task
        .save()
        .then(() => {
            res.redirect('/');
        })
        .catch(err => console.log(err));
}

exports.postDeleteTask = (req, res, next)=>{
    const taskId = req.body.taskId;
    Task.findByIdAndRemove(taskId)
        .then(()=>{
            res.redirect('/');
        })
        .catch(err=> console.log(err));
}