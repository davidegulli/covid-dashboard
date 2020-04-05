import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import moment from 'moment';
import pattern from 'patternomaly';

const DailyDeltaCasesRegion = (props) => {

    const data = props.data;

    console.log(data);

    const [chart, setChart] = useState(null);

    const chartDiv = useRef(null);

    const labels = data
        .slice(1)
        .map(item => moment(item.data).format("DD/MM"));

    const dataPoints = data
        .slice(1)
        .map((item, index) => {
            return item.nuovi_positivi
        });
        
    const newHealdDataPoints = data
        .slice(1)
        .map((item, index) => {
            return item.dimessi_guariti - data[index].dimessi_guariti;
        });

    const newHealdColors = data
        .slice(1)
        .map((item) => {
            return 'rgb(0, 0, 255, 0.7)';
        });

    const newDeadDataPoints = data
        .slice(1)
        .map((item, index) => {
            return item.deceduti - data[index].deceduti;
    });

    const newDeadColors = data
        .slice(1)
        .map((item) => {
            return 'rgb(255, 255, 255, 0.7)';
        });

    const currentsDataPoints = data
        .slice(1)
        .map((item) => {
            return item.variazione_totale_positivi;
        });

    const currentsColors = data
        .slice(1)
        .map((item) => {
            return 'rgb(220, 20, 60, 0.7)';
        });

    useEffect(() => {

        if(chart != null) {
            chart.destroy();
        }

        const canvasRef = chartDiv.current.getContext("2d");

        const chartRef = new Chart(canvasRef, {
            type: "line",
            data: {
                //Bring in data
                labels: labels,
                datasets: [
                    {
                        label: "Nuovi contagi",
                        data: dataPoints,
                        order: 1,
                        backgroundColor: [
                            'rgb(255, 127, 80, 0.5)'
                        ]
                    },
                    {
                        type: "bar",
                        label: "Incr. Positivi",
                        data: currentsDataPoints,
                        backgroundColor: currentsColors,        
                        order: 2
                    },
                    {
                        type: "bar",
                        label: "Incr. Guariti",
                        data: newHealdDataPoints,
                        backgroundColor: newHealdColors,        
                        order: 3
                    },
                    {
                        type: "bar",
                        label: "Incr. Deceduti",
                        data: newDeadDataPoints,
                        backgroundColor: newDeadColors,        
                        order: 3
                    }
                ],
            },
            options: {
                scales: {
                    xAxes: [{ stacked: true }],
                    yAxes: [{ stacked: true }]
                },
                maintainAspectRatio : true    
            }
        });

        setChart(chartRef);

    }, [data]);

    return(
        <>
            <div>
                <canvas
                    id="currentCasesChart"
                    ref={chartDiv}
                />
            </div>
        </>
    )
}

export default DailyDeltaCasesRegion;