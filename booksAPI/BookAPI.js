const express = require('express');
const app = express();
const cors = require("cors")
const {parse} = require("dotenv");
app.use(cors());
app.use(express.json());

let books = [
    {
        id: 1,
        title: "TITEL 1",
        author: "AUTHOR 1",
        year: 2020
    },
    {
        id: 2,
        title: "TITEL 2",
        author: "AUTHOR 2",
        year: 2021
    },
    {
        id: 3,
        title: "TITEL 3",
        author: "AUTHOR 3",
        year: 2022
    }
]

app.get("/books", (req, res) => {
    return res.json(books);
});

app.get("/books/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const book = books.find(b => b.id === id);

    console.log("getting book")
    console.log(book)

    if (book) {
        return res.status(200).json(book)
    } else {
        return res.status(404).json({error: "Book not found"});
    }
});

app.post("/books", (req,res) => {
    console.log("posting");
    const {title, author, year} = req.body;

    console.log(title, author, year)
    let newBook = {
        id: books.length + 1,
        title,
        author,
        year
    }
    books.push(newBook)
    const id = books.indexOf(newBook)
    console.log("book sent back", newBook)
    return res.json({
        ...newBook,
    });
})
app.post("/books", (req, res) => {
    const {title, author, year} = req.body;

    console.log("post ")

    if(!title || !author || !year) {
        return res.status(404).json({error: "All params required"});
    } else {

    }
});

app.put("/books/:id", (req, res) => {
    console.log("updating")
    const id = parseInt(req.params.id);
    const {title, author, year} = req.body;

    console.log(id, title, author, year)

    const updatedBook = {
        id: id,
        title,
        author,
        year
    };
    const existingBookIndex = books.indexOf(books.find((b) => b.id == id));
    books[existingBookIndex] = updatedBook
    res.json({...updatedBook})

});


app.listen(3000, "0.0.0.0", () => {
    console.log("Server is running on port")
})
