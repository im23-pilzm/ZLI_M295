const express = require("express");
const morgan = require("morgan");

const app = express();
app.use(express.json());
// Middleware
app.use(morgan("dev"));

// In-memory database
let books = [
  {
    id: 1,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    year: 1925,
  },
  { id: 2, title: "1984", author: "George Orwell", year: 1949 },
  { id: 3, title: "To Kill a Mockingbird", author: "Harper Lee", year: 1960 },
];

// Routes
app.get("/api/books", (req, res) => {
  res.json(books);
});

app.get("/api/books/:id", (req, res) => {
  const book = books.find((b) => b.id === parseInt(req.params.id));
  if (!book) return res.status(404).json({ message: "Book not found" });
  res.json(book);
});

app.post("/api/books", (req, res) => {
  const { title, author, year } = req.body || {};
  if (!title || !author || !year) {
    return res
      .status(400)
      .json({ message: "Please provide title, author and year" });
  }

  const newBook = {
    id: books.length + 1,
    title,
    author,
    year: year,
  };

  books.push(newBook);
  res.status(201).json(newBook);
});

app.put("/api/books/:id", (req, res) => {
  const book = books.find(b => b.id === parseInt(req.params.id));
  const { title, author, year } = req.body;
  if (!book) {
    return res.status(404).json({ message: "Book not found" });
  }

  if (title) book.title = title;
  if (author) book.author = author;
  if (year) book.year = year;

  res.status(200).json(book);
});

app.delete("/api/books/:id", (req, res) => {
  const bookIndex = books.findIndex((b) => b.id === parseInt(req.params.id));
  if (bookIndex === -1)
    return res.status(404).json({ message: "Book not found" });

  const deletedBook = books.splice(bookIndex, 1)[0];
  res.status(200).json(deletedBook);
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
