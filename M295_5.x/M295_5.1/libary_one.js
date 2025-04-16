const express = require('express');
const app = express();
const port = 7003;
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('./swagger.json');
const session = require("express-session");
app.use(express.json());
app.use('/swagger-ui', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use(session({
    secret: 'ExpressSessionLibrary',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

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

let lends = [
    {
        id: 1,
        customer_id: "C12345",
        isbn: "978-3-16-148410-0",
        borrowed_at: new Date("2023-10-01T10:00:00Z"),
        returned_at: null
    },
    {
        id: 2,
        customer_id: "C67890",
        isbn: "978-0-7432-7356-5",
        borrowed_at: new Date("2023-10-05T14:30:00Z"),
        returned_at: new Date("2023-10-10T16:00:00Z")
    },
    {
        id: 3,
        customer_id: "C54321",
        isbn: "978-0-452-28423-4",
        borrowed_at: new Date("2023-10-07T09:15:00Z"),
        returned_at: null
    },
    {
        id: 4,
        customer_id: "C98765",
        isbn: "978-0-14-044913-6",
        borrowed_at: new Date("2023-10-08T11:45:00Z"),
        returned_at: new Date("2023-10-12T13:30:00Z")
    },
    {
        id: 5,
        customer_id: "C11223",
        isbn: "978-0-670-81302-4",
        borrowed_at: new Date("2023-10-09T08:00:00Z"),
        returned_at: null
    }
];

const u_email = "desk@library.example"
const u_password = "m295"


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
});

app.get("/lends", async (req, res) => {
    if (req.session.authenticated === true) {
        res.json(lends);
    } else {
        res.status(401).json({error: "Unauthorized: Password or E-Mail false."})
    }

});

app.get("/lends/:id", async (req, res) => {
    const id = parseInt(req.params.id);
    const lend = lends.find(l => l.id === id);

    if (lend) {
        if(req.session.authenticated === true){
            res.json(lend)
        } else {
            res.status(401).json({error: "Unauthorized: Password or E-Mail false."})
        }
    } else {
        res.status(404).json({error: "Lend not found."});
    }
});

app.post("/lends", async (req, res) => {
    const {customer_id, isbn} = req.body;

    if (!customer_id || !isbn) {
        res.status(422).json({error: "Customer ID and ISBN are required."});
    }

    const isBookLent = lends.some(lend => lend.isbn === isbn && lend.returned_at === null);
    if (isBookLent) {
        return res.status(400).json({ error: "This book is already lent out." });
    }

    const openLendsCount = lends.filter(lend => lend.customer_id === customer_id && lend.returned_at === null).length;
    if (openLendsCount >= 3) {
        return res.status(400).json({ error: "This customer already has 3 open lends." });

    }

    if(req.session.authenticated) {
        const newLend = {
            id: lends.length + 1,
            customer_id,
            isbn,
            borrowed_at: new Date(),
            returned_at: null
        };

        lends.push(newLend);
        res.status(201).json(newLend);
    } else {
        res.status(401).json({error: "Unauthorized: Password or E-Mail false."})
    }


});

app.delete("/lends/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const lend = lends.find(l => l.id === id);

    if (!lend) {
        return res.status(404).json({ error: "Lend not found" });
    }

    if (lend.returned_at) {
        return res.status(400).json({ error: "Book has already been returned" });
    }

    if(req.session.authenticated === true) {
        lend.returned_at = new Date();
        return res.status(200).json({ message: "Book returned successfully", lend });
    } else {
        res.status(401).json({error: "Unauthorized: Password or E-Mail false."})
    }


});

app.post("/login", (req, res) =>{
    const {email, password} = req.body;

    if (!email || !password) {
        return res.status(401).json({ error: "Email and password required." });
    }

    if (password === u_password && email === u_email) {
        req.session.authenticated = true;
        req.session.email = email;
        req.session.password = password;
        res.status(201).json({email});
    } else {
        res.status(401).json({error: "Unauthorized: Password or E-Mail false."})
    }
})

app.get("/verify", (req, res) => {
    const email = req.session.email;

    if(req.session.authenticated === true) {
        res.status(200).json({email})
    } else {
        res.status(401).json({error: "Unauthorized: Password or E-Mail false."})
    }

})

app.delete("/logout", (req, res) => {
    if(req.session.authenticated === true){
        req.session.authenticated = false;
        res.status(204)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
