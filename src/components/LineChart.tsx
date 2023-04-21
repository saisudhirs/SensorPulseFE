import {Chart, Legend, LineSeries, Title} from '@devexpress/dx-react-chart-material-ui';
import React from "react";

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
    const analytics = [{label: "first", time: 100}, {label: "sirst", time: 200}, {label: "tirst", time: 100}]
    return <div>
        <Chart data={analytics}>
            <LineSeries valueField="time"
                        argumentField="label"/>
            <Title
                text="Overview of activities"
            />
            <Legend />

        </Chart>
        {/*<h2>Line Chart</h2>*/}
        {/*<Line data={chartData} />*/}
    </div>
}

// export default LineChart;
