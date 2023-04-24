import getSensors, {SensorsResponse} from "../hooks/getSensors";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import {Button, Card, Grid, MenuItem, Select, SelectChangeEvent} from "@mui/material";
import {useEffect, useState} from "react";
import {sensorSlice} from "../redux/store";
import getData, {DataResponse} from "../hooks/getData";
import LineChart from "../components/LineChart";
import DateTimeSelection from "../components/DateTimeSelection";
import dayjs, {Dayjs} from "dayjs";


export default function Dashboard() {
    const initDate = dayjs()
    const token = useAppSelector(state => state.tok.token as string)
    const dispatch = useAppDispatch()
    const [sensorList, setSensorList] = useState<Array<SensorsResponse>>([])
    const [data, setData] = useState<Array<DataResponse>>([])
    const sensorid = useAppSelector(state => state.sensors.sensorid)
    const [t1, setT1] = useState<Dayjs | null>(dayjs(initDate))
    const [t2, setT2] = useState<Dayjs | null>(dayjs(initDate))

    useEffect(() => {
        getSensors(token).then(r => {
            setSensorList(r)
        })
    }, [])
    const [state, setState] = useState({from: "", to: ""})

    if (!sensorList || sensorList.length === 0) {
        return <i>No sensors found.</i>
    }

    const ocf = (e: SelectChangeEvent) => {
        let selected: SensorsResponse | null | undefined = sensorList.find(v => {
            dispatch(sensorSlice.actions.setSensorID(v.sensorid))
            dispatch(sensorSlice.actions.setSensorName(v.sensorname))
            dispatch(sensorSlice.actions.setUnits(v.units))

            return v.sensorid === (e.target.value)
        })
        if (selected === undefined) {
            selected = null
        }
    }
    const do_fetch_data = (rq: any) => {
        return () => {
            getData(rq).then(r => {
                setData(r)
                setTimeout(do_fetch_data(rq), 1000)
            })
        }
    }
    const onSubmit = () => {
        if (t1?.unix !== undefined && t2?.unix !== undefined) {
            const to = (t2?.unix()) + "000"
            const from = (t1.unix()) + "000"
            const DataRequest = {token: token, sensorid: sensorid, to: to, from: from}
            setTimeout(do_fetch_data(DataRequest), 1000)
        }

    }

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
            <DateTimeSelection label={"From"} value={t1} setValue={setT1}/>
        </Grid>
        <Grid>
            <DateTimeSelection label={"To"} value={t2} setValue={setT2}/>
        </Grid>
        <Grid>
            <Button variant={"contained"} onClick={onSubmit}>Get Data</Button>
        </Grid>
        <Card sx={{padding: 2}}>
            <Grid>
                <LineChart analytics={data}/>
            </Grid>
        </Card>
    </Grid>
}