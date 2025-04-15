const express = require('express');
const app = express();
const port = 7001;
const path = require('path');

const names = [
    "Alice",
    "Bob",
    "Charlie",
    "Diana",
    "Ethan",
    "Fiona",
    "George",
    "Hannah",
    "Ian",
    "Julia",
    "Kevin",
    "Laura",
    "Michael",
    "Nina",
    "Oliver",
    "Paula",
    "Quentin",
    "Rachel",
    "Steve",
    "Tina"
];

app.get("/now", async (req,res) => {
    var d = new Date();
    var n = d.toLocaleTimeString();
    res.send(n)
});

app.get("/zli", async (req, res) => {
    res.redirect("https://www.zli.ch");
});

app.get("/name", async (req, res) => {
    let item = names[Math.floor(Math.random()*names.length)];
    res.send(item)
})

app.get("/html", async (req, res) => {
    const filePath = path.join(__dirname, 'test.html');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(500).send("Internal Server Error");
        }
    });
});

app.get("/image", async (req, res) => {
    const filePath = path.join(__dirname, 'Rectangle-1920x1080-Placeholder.png');
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending file:", err);
            res.status(500).send("Internal Server Error");
        }
    });
})

app.get("/teapot", async (req, res) => {
    res.status(418).send("I'm a teapot")
})

app.get("/user-agent", async (req, res) => {
    const userAgent = req.get("User-Agent");
    res.send(`Your browser is:  ${userAgent}`)
})

app.get("/secret", async (req, res) => {
    res.status(403).send("forbidden")
})

app.get("/xml", async (req, res)=> {
    const filePath = path.join(__dirname, 'example.xml'); // Replace 'example.xml' with your XML file name
    res.sendFile(filePath, (err) => {
        if (err) {
            console.error("Error sending XML file:", err);
            res.status(500).send("Internal Server Error");
        }
    });
})

app.get("/me", async (req, res) => {
    const person = {
        Vorname: "Max",
        Nachname: "Mustermann",
        Alter: 30,
        Wohnort: "Zürich",
        Augenfarbe: "Blau"
    };
    res.json(person);
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

