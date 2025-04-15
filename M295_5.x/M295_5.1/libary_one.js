const express = require('express');
const app = express();
const port = 7003;
app.use(express.json());

let books = [
    {
        isbn: "978-3-16-148410-0",
        title: "The Great Gatsby",
        year: 1925,
        author: "F. Scott Fitzgerald"
    },
    {
        isbn: "978-0-7432-7356-5",
        title: "To Kill a Mockingbird",
        year: 1960,
        author: "Harper Lee"
    },
    {
        isbn: "978-0-452-28423-4",
        title: "1984",
        year: 1949,
        author: "George Orwell"
    },
    {
        isbn: "978-0-14-044913-6",
        title: "The Odyssey",
        year: -800,
        author: "Homer"
    },
    {
        isbn: "978-0-670-81302-4",
        title: "The Catcher in the Rye",
        year: 1951,
        author: "J.D. Salinger"
    }
];

app.get("/books", async (req, res) => {
    res.json(books);
})

app.get("/books/:isbn", async (req, res) => {
    isbn = req.params.isbn;
    const book = books.find(b => b.isbn === isbn);

    if (book) {
        res.json(book);
    } else {
        res.status(404).json({error: "Book not found."});
    }


});

app.post("/books", async (req, res) => {
    const {isbn, title, year, author} = req.body;

    if (!isbn || !title || !year || !author) {
        res.status(422).json({error: "Unprocessable Entity"});
    } else {
        const newBook = {
            isbn,
            title,
            year,
            author
        };
        books.push(newBook);
        res.json(newBook);
    }
});

app.put("/books/:isbn", async (req, res) => {
    const isbn = req.params.isbn;
    const {title, year, author} = req.body;

    const book = books.find(b => b.isbn === isbn);

    if (book) {
        const overwrittenBook = {
            isbn: isbn,
            title,
            year,
            author
        };
        res.json({overwrittenBook});
        books.push(overwrittenBook);
    } else {
        res.status(404).json({error: "Book not found."});
    }
});

app.delete("/books/:isbn", async (req, res) => {
    const isbn = req.params.isbn;

    if (isbn !== -1) {
        books.splice(isbn, 1);
        return res.status(204).send();
    } else {
        return res.status(404).json({ error: "Book not found" });
    }
});

app.patch("/books/:isbn", async (req, res) => {
    const isbn = req.params.isbn;
    const updatedCont = req.body;

    const book = books.find(b => b.isbn === isbn);

    for (let key in updatedCont) {
        if(book.hasOwnProperty(key)) {
            book[key] = updatedCont[key];
        }
    }
    res.json(book);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
