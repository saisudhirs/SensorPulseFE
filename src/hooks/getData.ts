import axios from "axios";
import {BASE_URL} from "./useLogin";

export interface DataResponse {
    time: string,
    val: string
}

interface DataRequest {
    token: string;
    sensorid: string;
    to: string;
    from: string
}

interface DataReturn {
    data: DataResponse[]
}

function getData({token, sensorid, to, from}: DataRequest): Promise<Array<DataResponse>> {
    return axios.get<DataReturn>(`${BASE_URL}/data`, {
        params: {
            token,
            sensorid,
            to,
            from
        }
    })
        .then(response => {
            // console.log(response.data.data)
            return response.data.data
        })
        .catch(error => {
            console.error('Error fetching data:', error);
            alert(error)
            return []
        })
}

export default getData;