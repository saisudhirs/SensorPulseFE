import axios from "axios";

interface SensorsResponse {
    sensorid: number;
    sensorname: string;
    unit: string
}

interface SensorRequest {
    token: string
}

function getSensors({token}: SensorRequest): Promise<SensorsResponse> {
    return axios.get(`$BASE_URL/sensors`, {
        params: {
            token,
        },
    })
        .then(response => response.data)
        .catch(error => {
            console.error('Error fetching login:', error);
            alert(error)
            throw error;
        })
}

export default getSensors;