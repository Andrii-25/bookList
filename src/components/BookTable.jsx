import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/BookTable.css';

toast.configure();

function BookTable() {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:8000/api/db`)
          .then(res => res.json())
          .then(result => {
              setBooks(result.books);
          })
          }, []);

          const notify = () => toast.success("Successfully deleted!", {
              position: toast.POSITION.TOP_RIGHT
          });

          async function remove(id) {
            await fetch(`http://localhost:8000/api/books/${id}`, {
              method: 'DELETE',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
            }).then(() => {
              notify();
              let updatedBooks = [...books].filter(i => i.id !== id);
              setBooks(updatedBooks);
            });
          }


    const bookList = books.map(book => {
        return (
                <tr key={book.id}>
                    <td>{book.title}</td>
                    <td>{book.author}</td>
                    <td>{book.category}</td>
                    <td>{book.ISBN}</td>
                    <td>
                        <Link to={`/books/${book.id}`}>
                            <button className="button button2">Edit</button>
                        </Link>
                        <button className="button button3" onClick={() => remove(book.id)}>Delete</button>
                    </td>
                </tr>
        )
    })

    return (
        <table>
            <thead>
                <tr>
                    <th>Book title</th>
                    <th>Author name</th>
                    <th>Category</th>
                    <th>ISBN</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {bookList}
            </tbody>
        </table>
    )
}

export default BookTable
