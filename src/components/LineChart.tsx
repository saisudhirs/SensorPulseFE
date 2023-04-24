import {
    ArgumentAxis,
    Chart,
    Legend,
    LineSeries,
    Title, Tooltip,
    ValueAxis,
    ZoomAndPan
} from '@devexpress/dx-react-chart-material-ui';
import React from "react";
import {EventTracker, HoverState} from '@devexpress/dx-react-chart';
import {useAppSelector} from "../redux/hooks";
import {DataResponse} from "../hooks/getData";

export default function LineChart({analytics}: { analytics: Array<DataResponse> }) {
    const sensorName = useAppSelector(state => state.sensors.sensorname)
    const unitName = useAppSelector(state => state.sensors.units)

    if (analytics === null || analytics === undefined || analytics.length === 0) {
        return <i>No data available</i>
    }
    const data = analytics.map(d => ({...d, time: (new Date(d.time)).getTime()}))
    return <div>
        <Chart data={data}>
            <LineSeries valueField="val"
                        argumentField="time"
                        name={unitName}/>
            <Title text={sensorName}/>
            <ZoomAndPan zoomRegionKey={"ctrl"}/>
            <Legend position={"bottom"}/>

            {/*<ArgumentAxis/>*/}
            {/*<ValueAxis/>*/}
            {/*<EventTracker/>*/}
            {/*<HoverState/>*/}
            {/*<Tooltip/>*/}

        </Chart>
    </div>
}

