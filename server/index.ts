import express, { Request, Response } from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

app.get('/geocode', async (req: Request, res: Response) => {
    try {
        const response = await axios.get('https://geocoding.geo.census.gov/geocoder/locations/onelineaddress', {
            params: {
                address: req.query.address,
                benchmark: 'Public_AR_Current',
                format: 'json'
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching geocode:', error);
        res.status(500).json({ error: (error as Error).message });
    }
});

app.listen(port, () => {
    console.log(`Proxy server running at http://localhost:${port}`);
});
