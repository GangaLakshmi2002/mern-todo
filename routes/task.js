const express = require('express');
const router = express.Router();
const Task = require('../models/task');
const auth = require('../middleware/auth');

router.post('/', auth(['admin']), async(req, res) => {
    const {title, description , assignedTo} = req.body;
    if(!title || !description || !assignedTo){
        res.status(400).json({
            message: 'all fields are required'
        })
    }
    const task = new Task({
        title, description, assignedTo , createdBy: req.user._id
    });
    await task.save();
    res.status(200).json({
        is_success: 'true',
        message: 'task created successfully'
    })
});

router.get('/', async(req, res) => {
    const tasks = await Task.find({}).populate('assignedTo');
    res.status(200).json({
        is_success: true,
        tasks
    })
});



router.put('/:id', auth(['admin', 'user']), async(req, res) => {
    console.log(req.body);
    const _id = req.params.id;
    await Task.findOneAndUpdate({_id}, req.body)
    .then((data) => {
        // console.log(data);
        res.json({message: "successfully updated ", data})
    })
});

router.delete('/:id', auth(['admin', 'user']), async(req, res) => {
    await Task.findOneAndDelete(req.params.id);
    res.status(200).json({message: 'task deleted successfully'})
});

router.get('/:id', async(req, res) => {
    const id = req.params.id;
    const tasks = await Task.findById(id).populate('assignedTo');
    res.status(200).json({
        is_success: true,
        tasks
    })
});

module.exports = router;