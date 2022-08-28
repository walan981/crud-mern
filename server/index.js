const express = require('express')
const app = express();
app.use(express.json()); //receive information from front-end in JSON format

const cors = require("cors"); //cors package, enhances the front-end and back-end integration
app.use(cors());


const PORT = 3001;  //Define running port for the backend
app.listen(PORT, ()=>{
    console.log(`Server Running on Port ${PORT}`);
})

//initialize mongoose
const mongoose = require('mongoose') 
//set which mongoDB Cluster db we try to connect to
mongoose.connect('mongodb+srv://walan981:agente007@cluster0.1v4fnfp.mongodb.net/library?retryWrites=true&w=majority', {
    useNewUrlParser: true,
});

//import our MongoDB models templates
const bookModel = require("./models/Books");
// ***** process the reqs to insert new database documents **** 
app.post('/insert', async(req,res)=>{
    //retrieving the form inputs from client/App.js
    const bookTitle = req.body.bookTitle;
    const bookAuthor = req.body.bookAuthor;
    const date = req.body.date;
    console.log('oi')
    const book = new bookModel({
        bookTitle: bookTitle, bookAuthor: bookAuthor, date: date});
    try{
        await book.save();
    }catch(err){
        console.log(err);
    }
});

//reading database data 
app.get('/read', async(req,res)=>{
    bookModel.find({}, (err, result) =>{
        if(err){
            res.send(err);
        }
        res.send(result);
    })
    // bookModel.find({bookTitle: "Dune"}, (err, result) =>{
    //     if(err){
    //         res.send(err);
    //     }
    //     res.send(result);
    // })
});

//update db collections
app.put('/update', async(req,res)=>{
    //retrieving the form inputs from client/App.js
    const newBookTitle = req.body.newBookTitle;
    const id = req.body.id;
    try{
        await bookModel.findById(id, (err, updatedBook)=>{
            updatedBook.bookTitle = newBookTitle;
            updatedBook.save();
            res.send("update");
        });
    }catch(err){
        console.log(err);
    }
});

//delete db collections
app.delete('/delete/:id', async(req,res)=>{
    //retrieving the form inputs from client/App.js
    const id = req.params.id;
    await bookModel.findByIdAndRemove(id).exec();
    res.send("deleted")
});



