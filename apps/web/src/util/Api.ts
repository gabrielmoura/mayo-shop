import axios from 'axios';
export default axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND ?? 'http://localhost:3001',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
    },
});