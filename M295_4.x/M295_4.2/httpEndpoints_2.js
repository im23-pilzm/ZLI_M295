const express = require('express');
const app = express();
const port = 7002;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const names = []

app.get("/now", async (req, res) =>{
    const timezone = req.query.tz

    try {
        const now = new Date();
        const formattedTime = new Intl.DateTimeFormat("en-US", {
            timeZone: timezone,
            dateStyle: "full",
            timeStyle: "long"
        }).format(now)

        res.json({timezone, currentTime: formattedTime})
    } catch (error) {
        console.error(error)
        res.status(400).json({error: "Invalid Timezone"})
    }
})

app.post("/names", async (req, res) => {
    console.log(req.body);

    const { name } = req.body;

    if (!name || typeof name !== "string") {
        return res.status(400).json({ error: "Invalid name provided" });
    }

    names.push(name);
    res.json({ message: "Name added successfully", names });
});

app.delete("/names", async (req, res) =>{
    const name = req.query.name;

    if (!name) {
        return res.status(400).json({ error: "Name is required" });
    }

    const index = names.indexOf(name);

    if (index !== -1) {
        names.splice(index, 1);
        return res.status(204).send();
    } else {
        return res.status(404).json({ error: "Name not found" });
    }
});

app.get("/secret2", async (req, res) => {
    const authorization = req.headers.authorization;

    if (!authorization) {
        return res.status(401).json({ error: "Authorization header missing" });
    }

    if (authorization === "Basic aGFja2VyOjEyMzQ=") {
        return res.status(200).send(authorization);
    } else {
        return res.status(401).json({error: "Unauthorized"});
    }
});

app.get("/chuck", async (req, res) => {
    const name = req.query.name

    try{
        const response = await fetch("https://api.chucknorris.io/jokes/random");
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }

        const randomJoke = await response.json();

        const customizedJoke = randomJoke.value.replace(/Chuck Norris/gi, name);

        res.send({joke: customizedJoke});
    } catch (err) {
        console.error(`Error getting data: ${err.message}`);
        res.status(500).send({ error: "Failed to fetch joke" });
    }
});

let me = {
    Vorname: "Max",
    Nachname: "Mustermann",
    Alter: 30,
    Wohnort: "Zürich",
    Augenfarbe: "Blau"
};

app.patch("/me", async (req, res) => {
    const updates = req.body;

    for (let key in updates) {
        if(me.hasOwnProperty(key)) {
            me[key] = updates[key]
        }
    }
    res.json(me)
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

