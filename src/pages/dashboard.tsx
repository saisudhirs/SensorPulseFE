import getSensors, {SensorsResponse} from "../hooks/getSensors";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {Button, Card, Grid, MenuItem, Select, SelectChangeEvent, TextField, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {sensorSlice} from "../redux/store";
import getData, {DataResponse} from "../hooks/getData";
import LineChart from "../components/LineChart";
import DateTimeSelection from "../components/DateTimeSelection";
import dayjs, {Dayjs} from "dayjs";
import * as trace_events from "trace_events";


export default function Dashboard() {
    const initDate = dayjs()
    const token = useAppSelector(state => state.tok.token as string)
    const sensors = useAppSelector(state => state.sensors)
    const SensorRequest = {token: token}
    const dispatch = useAppDispatch()
    const [sensorList, setSensorList] = useState<Array<SensorsResponse>>([])
    const [data, setData] = useState<Array<DataResponse>>([])
    const sensorid = useAppSelector(state => state.sensors.sensorid)
    // const [data, setData] = useState("")
    const [t1, setT1] = useState<Dayjs | null>(dayjs(initDate))
    const [t2, setT2] = useState<Dayjs | null>(dayjs(initDate))

    useEffect(() => {
        getSensors(token).then(r => {
            setSensorList(r)
        })
    }, [])
    const [state, setState] = useState({from: "", to: ""})

    // if (!sensorList || sensorList.length === 0) {
    //     return <i>No sensors found.</i>
    // }
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
        for (let i = 0; i < 1000; i++) {
            setTimeout(() => {
                getData(DataRequest).then(r => {
                    setData(r)
                    console.log(r[-1].val)
                    console.log(r[-1].time)
                })
            }, i * 1000);

        }
    }
    // console.log(sensorList)
    // const curValue = sensors.sensorid === "" ? "-1": sensors.sensorid

    return <Grid container direction={"column"} gap={3} padding={2}>
        <Grid sx={{minWidth: 170, maxWidth: 300}}>
            <Select onChange={ocf} fullWidth={true} defaultValue={"Select a sensor"}>
                <MenuItem disabled={true} value={-1}>Select a sensor</MenuItem>
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
            <DateTimeSelection label={"From"} value={t1} setValue={setT1}/>
        </Grid>
        <Grid>
            <DateTimeSelection label={"To"} value={t2} setValue={setT2}/>
        </Grid>
        <Grid>
            <Button variant={"contained"} onClick={onSubmit}>Get Data</Button>
        </Grid>
        {/*<Grid> return data.map(s => {*/}
        {/*    <Typography>{*/}
        {/*        s.val, s.time}</Typography>*/}

        {/*})*/}

        {/*</Grid>*/}
        <Card sx={{padding: 2}}>

            <Grid>
                <LineChart analytics={data}/>
            </Grid>
        </Card>
    </Grid>

}