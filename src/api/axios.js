import axios from 'axios';

export default axios.create({
    baseURL: 'https://lockb0x-api-dev.azurewebsites.net/api'
});