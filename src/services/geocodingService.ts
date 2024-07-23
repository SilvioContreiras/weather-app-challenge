import axios from 'axios';

const PROXY_API_URL = 'http://localhost:4000/geocode';

export const getCoordinates = async (address: string) => {
    try {
        const response = await axios.get(PROXY_API_URL, {
            params: { address },
        });

        console.log('Geocoding response:', response.data);


        if (response.data.result && response.data.result.addressMatches && response.data.result.addressMatches.length > 0) {
            return response.data.result.addressMatches[0].coordinates;
        } else {
            console.error('No matching address found:', response.data);
            throw new Error('No matching address found. Please provide a more specific address.');
        }
    } catch (error) {
        console.error('Error fetching coordinates:', error);
        throw new Error('Failed to fetch coordinates. Please check the address and try again.');
    }
};
