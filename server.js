const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/proxy', async (req, res) => {
    const targetUrl = req.query.url;
    
    if (!targetUrl) {
        return res.status(400).json({ error: 'URL parameter required' });
    }
    
    try {
        const response = await axios.get(targetUrl, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            timeout: 10000
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch URL: ' + error.message });
    }
});

app.get('/', (req, res) => {
    res.json({ status: 'Proxy service is running' });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Proxy running on port ${PORT}`);
});
