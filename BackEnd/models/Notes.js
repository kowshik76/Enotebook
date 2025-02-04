const mongoose = require('mongoose');
const { Schema } = mongoose;

const NotesSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    title: {  // ✅ Changed `Title` to `title` (MongoDB convention)
        type: String,
        required: true
    },
    description: {  // ✅ Changed `Description` to `description`
        type: String,
        required: true
    },
    tag: {
        type: String,
        default: "General"
    },
    date: {
        type: Date,
        default: Date.now
    }
});

// Export Notes model
module.exports = mongoose.model('notes', NotesSchema);
