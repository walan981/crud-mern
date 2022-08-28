const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema({
    bookTitle:{
        type: String,
        required: true,
    },
    bookAuthor:{
        type: String,
        required: true,
    },
    date:{
        type: String,
        required: true,
    }
});


const Book = mongoose.model("Book", BookSchema) //has to be the name of the MongoDB compass entry in capital letter and in singular form
module.exports = Book;