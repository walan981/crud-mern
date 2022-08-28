
import {useState, useEffect} from "react";
import Axios from "axios";
import './App.css';

function App() {

  const[bookName, setBookName] = useState('');
  const[authorName, setAuthorName] = useState('');
  const[bookRead, setBookRead] = useState([]);
  const[newBookTitle, setNewBookTitle] = useState('');

  const addToDatabase = () =>{
    //Using AXIOS to add entries in our MongoDB
    Axios.post("http://localhost:3001/insert", {  //uses what was specified in server/index.js
    bookTitle: bookName, 
    bookAuthor: authorName,
    date: Date().toString(),
  });
  };

  useEffect(() => { //displaying read data on front-end
    Axios.get('http://localhost:3001/read').then((response)=>{ 
      setBookRead(response.data);
    })
  },[])

  const updateBook = (id) =>{
    Axios.put('http://localhost:3001/update', {
      id: id,
      newBookTitle: newBookTitle,
     })
  }

  const deleteBook = (id) =>{
    Axios.delete(`http://localhost:3001/delete/${id}`)
  };
  

  return (
    <div className="App">
      <h1>MERN CRUD App</h1>

      <label>Book Title</label>
      <input type="text" onChange={(e)=>{setBookName(e.target.value)}}></input>
      <label>Author</label>
      <input type="text"  onChange={(e)=>{setAuthorName(e.target.value)}}></input>
     <button onClick={addToDatabase}>Add to List</button>
    

    <h1>Book List</h1>
    {bookRead.map((book, key)=>{
      return(
        <div key={key}>
          <h4>{book.bookTitle}, {book.bookAuthor}</h4>
          <input type="text" placeholder="edit title"
           onChange={(e)=>{setNewBookTitle(e.target.value)}}/>
          <button onClick={()=>updateBook(book._id)}>update</button>
          <button onClick={()=>deleteBook(book._id)}>Delete</button>
        </div>
      )
    })}
    </div>
  );
}

export default App;
