const express = require('express');
const cors = require('cors');

// 'use strict';
var request = require('request');

// replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
var url = 'https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=demo';

const app = express();
app.use(express.json());
app.use(cors());

// Server Run Test
app.get('/', (req, res) => {
    res.send("server working fine!");
});

app.get('/getdata', async (req, response) => {
    try {
        request.get({
            url: url,
            json: true,
            headers: { 'User-Agent': 'request' }
        }, (err, res, data) => {
            if (err) {
                // console.log('Error:', err);
                return response.status(400).json({ error: err });
            } else if (res.statusCode !== 200) {
                // console.log('Status:', res.statusCode);
                return response.status(400).json({ status: res.statusCode });
            } else {
                // console.log(data);
                return response.json({ data });
            }
        });
    } catch (err) {
        return response.status(500).json({ msg: err.message });
    }
});


// Run Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log("Server is running on PORT ", PORT);
});
