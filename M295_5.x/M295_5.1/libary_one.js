const express = require('express');
const app = express();
const port = 7002;

let books = [];

app.get("/books", async (req, res) => {
    res.json(books);
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
