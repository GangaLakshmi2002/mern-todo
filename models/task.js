const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');

const taskSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    description:{
      type:String  
    },
    status:{
        type: String,
        enum : ['pending', 'in-progress', 'completed'],
        default: 'pending'
    },
    assignedTo:{
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    
}, {
    timestamps : true
})

module.exports = mongoose.model('Task', taskSchema);