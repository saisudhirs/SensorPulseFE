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
getSensors: SensorsResponse[]
}

export default function getSensors(token: string): Array<SensorsResponse> {
 axios.get(`${BASE_URL}/sensors`, {
        params: {
            token,
        },
    })
        .then(response => {
            console.log(response.data.getSensors)
            if (response) {
                return response.data.getSensors
            }
            else return []
        })
        .catch(error => {
            console.error('Error fetching login:', error);
            alert(error)
            return []
        })
    return []
}

// export default getSensors;