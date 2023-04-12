import axios from "axios";

interface DataResponse {
    data: string;
    sensorid: number;
    to: string;
    from: string
}

interface DataRequest {
    token: string;
    sensorid: number;
    to: string;
    from: string
}

function getData({token, sensorid, to, from}: DataRequest): Promise<DataResponse> {
    return axios.get(`$BASE_URL/data`, {
        params: {
            token,
            sensorid,
            to,
            from
        }
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching login:', error);
            alert(error)
            throw error;
        })
}

export default getData;