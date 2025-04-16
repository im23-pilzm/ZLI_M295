const express = require('express');
const app = express();
const port = 7005;
const session = require("express-session");
app.use(express.json());
require('dotenv').config();

app.use(session({
    secret: 'testExpressSession',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.post("/name", async (req, res) => {
    const { name } = req.body;
    if (!name) {
        return res.status(400).json({error: "Name required"});
    }

    req.session.name = name;

    return res.status(200).json({ message: `Name '${name}' saved to session.`});
});

app.get("/name", async (req, res) => {
    const name = req.session.name

    if (!name) {
        return res.status(404).json({error: "No name found"});
    }

    return res.status(200).json({ message: `Name '${name}' found in session.`});
})

app.delete("/name", (req, res) => {
    const name = req.session.name
    if(name) {
        delete req.session.name
        return res.status(200).json({ message: `Name '${name}' deleted from session.`});
    } else {
        return res.status(404).json({error: "No name found"});
    }
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
