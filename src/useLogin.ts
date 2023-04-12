import axios from 'axios';

const BASE_URL = 'http://smaran.ddns.net:34258';

interface LoginResponse {
    success: boolean;
    message: string;
}

interface LoginRequest {
    username: string;
    pwd: string;
}

function login({ username, pwd }: LoginRequest): Promise<LoginResponse> {
    return axios.get(`${BASE_URL}/login`, {
        params: {
            username,
            pwd,
        },
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching login:', error);
            alert(error)
            throw error;
        });
}

export default login;
