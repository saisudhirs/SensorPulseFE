import axios from "axios";
import {BASE_URL} from "./useLogin";

export interface SensorsResponse {
    sensorname: string,
    sensorid: string,
    units: string
}

interface SensorRequest {
    token: string
}

interface SensorReturn {
        rows: SensorsResponse[]
}

export default function getSensors(token: string): Promise<Array<SensorsResponse>> {
    return axios.get<SensorReturn>(`${BASE_URL}/sensors`, {
        params: {
            token,
        },
    })
        .then(response => {
            return response.data.rows
        })
        .catch(error => {
            console.error('Error fetching login:', error);
            alert(error)
            return []
        })
}