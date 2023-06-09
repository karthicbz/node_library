const mongoose = require('mongoose');

const schema = mongoose.Schema;

const BookInstanceSchema = new schema({
    book:{type:schema.Types.ObjectId, ref:'Book', required:true},
    imprint:{type:String, required:true},
    status:{
        type:String,
        required: true,
        enum:["Available", "Maintenance", "Loaned", "Reserved"],
        default: "Maintenance",
    },
    due_back: { type: Date, default: Date.now },
});

BookInstanceSchema.virtual('url').get(function(){
    return(`/catalog/bookinstance/${this._id}`);
});

module.exports = mongoose.model('BookInstance', BookInstanceSchema);