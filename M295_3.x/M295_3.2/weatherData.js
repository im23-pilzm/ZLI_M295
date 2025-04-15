const express = require('express');
const app = express();
const port = 7000;

app.get('/temperature/:plz', async (req, res) => {
    const plz = req.params.plz;

    if (!/^\d{4}$/.test(plz)) {
        return res.status(400).json({ error: 'Invalid postal code format. Must be 4 digits.' });
    }

    const apiURL = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${plz}00`;

    try {
        const fetch = (await import('node-fetch')).default;
        const response = await fetch(apiURL);

        if (response.status !== 200) {
            console.error('API response status:', response.status);
            return res.status(response.status).json({ error: 'Failed to fetch temperature data' });
        }

        const data = await response.json();
        const temperature = data?.currentWeather?.temperature;

        if (temperature !== undefined) {
            res.json({ temperature });
        } else {
            res.status(404).json({ error: 'Temperature not found in response' });
        }

    } catch (error) {
        console.error('Error fetching temperature:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});