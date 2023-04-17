import getSensors, {SensorsResponse} from "./hooks/getSensors";
import {useAppDispatch, useAppSelector} from "./redux/hooks";
import {Grid, MenuItem, Select, SelectChangeEvent} from "@mui/material";


export default function Dashboard() {
    const token = useAppSelector(state => state.tok.token as string)
    const sensors = useAppSelector(state => state.sensors)
    const SensorRequest = {token: token}
    const dispatch = useAppDispatch()

    const SensorList = getSensors(token)
    console.log(SensorList)

    if (!SensorList || SensorList.length === 0) {
        return <i>No sensors found.</i>
    }
    const ocf = (e: SelectChangeEvent) => {
        let selected: SensorsResponse | null | undefined = SensorList.find(v => {
            return v.sensorid === (e.target.value)
        })
        if (selected === undefined) {
            selected = null
        }
    }
    // const curValue = sensors.sensorid === "" ? "-1": sensors.sensorid
    return <Grid sx={{minWidth: 170}}>
        <Select onChange={ocf} fullWidth={true}>
            {SensorList.map((r, k) => {
                return <MenuItem value={r.sensorid} key={k}>{r.sensorname}</MenuItem>
            })}
        </Select>
    </Grid>

}