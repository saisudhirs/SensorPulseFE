import getSensors, {SensorsResponse} from "../hooks/getSensors";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {Button, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {sensorSlice} from "../redux/store";
import getData from "../hooks/getData";


export default function Dashboard() {
    const token = useAppSelector(state => state.tok.token as string)
    const sensors = useAppSelector(state => state.sensors)
    const SensorRequest = {token: token}
    const dispatch = useAppDispatch()
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const [sensorList, setSensorList] = useState<Array<SensorsResponse>>([])
    const sensorid = useAppSelector(state => state.sensors.sensorid)
    const [data, setData] = useState("")

    useEffect(() => {
        getSensors(token).then(r => {
            setSensorList(r)
        })
    }, [])
    const [state, setState] = useState({from: "", to: ""})

    if (!sensorList || sensorList.length === 0) {
        return <i>No sensors found.</i>
    }
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setState({...state, [e.target.name]: e.target.value})
    }
    const ocf = (e: SelectChangeEvent) => {
        let selected: SensorsResponse | null | undefined = sensorList.find(v => {
            dispatch(sensorSlice.actions.setSensorID(v.sensorid))
            return v.sensorid === (e.target.value)
        })
        if (selected === undefined) {
            selected = null
        }
    }
    const onSubmit = () => {
        const DataRequest = {token: token, sensorid: sensorid, to: state.to, from: state.from}
        getData(DataRequest).then(r => {
            setData(r as unknown as string)
        })
    }
    console.log(sensorList)
    // const curValue = sensors.sensorid === "" ? "-1": sensors.sensorid
    return <Grid container direction={"column"} gap={3} padding={2}>
        <Grid sx={{minWidth: 170, maxWidth: 300}}>
            <Select onChange={ocf} fullWidth={true}>
                {sensorList.map((r, k) => {
                    return <MenuItem value={r.sensorid} key={k}>{r.sensorname}</MenuItem>
                })}
            </Select>
        </Grid>
        <Grid>
            {/*<DatePicker selected={startDate} onChange={(date) => setStartDate(date)} />*/}
            <TextField label={"Time & Date from"} name={"from"} onChange={onChange}/>
        </Grid>
        <Grid>
            <TextField label={"Time & Date to"} name={"to"} onChange={onChange}/>
        </Grid>
        <Grid>
            <Button onClick={onSubmit}>Get Data</Button>
        </Grid>
        <Grid>
            <Typography>{data}</Typography>
        </Grid>
    </Grid>

}