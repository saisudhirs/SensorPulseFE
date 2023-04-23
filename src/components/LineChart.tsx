import {Chart, Legend, LineSeries, Title} from '@devexpress/dx-react-chart-material-ui';
import React from "react";
import {useAppSelector} from "../redux/hooks";


const chartData = {
    labels: ["January", "February", "March", "April", "May", "June"],
    datasets: [
        {
            label: "My First Dataset",
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            borderColor: "rgb(75, 192, 192)",
            tension: 0.1
        }
    ]
};
const chartOptions = {
    scales: {
        y: {
            type: "linear",
            beginAtZero: true
        }
    }
};

export default function LineChart() {
    const sensorName = useAppSelector(state => state.sensors.sensorname)
    const unitName = useAppSelector(state => state.sensors.units)
    const data = [{
        "data": [{"time": "2023-03-30T06:20:28.338Z", "val": 1.234}, {
            "time": "2023-03-30T06:20:30.175Z",
            "val": 1.234
        }, {"time": "2023-03-30T06:20:31.995Z", "val": 2.234}, {
            "time": "2023-03-30T06:20:33.877Z",
            "val": 1.234
        }, {"time": "2023-03-30T06:20:35.873Z", "val": 1.234}, {
            "time": "2023-03-30T06:20:37.878Z",
            "val": 1.234
        }, {"time": "2023-03-30T06:20:40.069Z", "val": 5.234}, {
            "time": "2023-03-30T06:20:41.861Z",
            "val": 1.234
        }, {"time": "2023-03-30T06:20:43.848Z", "val": 3.234}, {
            "time": "2023-03-30T06:20:45.853Z",
            "val": 1.234
        }, {"time": "2023-03-30T06:20:47.884Z", "val": 2.234}],
        "sensorid": "1",
        "to": 1680157247885,
        "from": 1680157228338
    }]
    const analytics = data[0].data
    // const analytics = [{label: "first", time: 100}, {label: "sirst", time: 200}, {label: "tirst", time: 100}]
    return <div>
        <Chart data={analytics}>
            <LineSeries valueField="val"
                        argumentField="time"
                        name="Time"/>
            <Title
                text={sensorName}
            />
            <Legend/>
            {/*<ArgumentAxis*/}
            {/*    valueMarginsEnabled={false}*/}
            {/*    discreteAxisDivisionMode="crossLabels"*/}
            {/*>*/}
            {/*    <Grid visible={true} />*/}
            {/*</ArgumentAxis>*/}
        </Chart>
        {/*<h2>Line Chart</h2>*/}
        {/*<Line data={chartData} />*/}
    </div>
}

// export default LineChart;
