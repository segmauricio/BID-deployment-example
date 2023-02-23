const mongoose = require('mongoose');

const PetSchema = new mongoose.Schema({
    name: { 
        type: String,
        required: true,
        minLength:[3, 'Name should be at least 3 characters long'] 
    },
    type:  {
        type: String,
        required: true,
        minLength:[3, 'Type should be at least 3 characters long'] 
    },
    description: { 
        type: String,
        required: true,
        minLength:[3, 'Description should be at least 3 characters long'] 
    },
    skills: [
        {
            type: String,
        }
    ],
    likes: Number,
}, { timestamps: true });

module.exports.Pet = mongoose.model('Pet', PetSchema);

