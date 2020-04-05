import React, { useRef, useEffect, useState } from 'react';
import Chart from 'chart.js';
import moment from 'moment';

const CurrentCasesRegion = (props) => {

    const [chart, setChart] = useState(null);

    const chartDiv = useRef(null);

    const data = props.data;

    const labels = data
        .map(item => moment(item.data).format("DD/MM"));

    const dataPoints = data
        .map(item => item.totale_positivi);

    const totaleCasiDataPoints = data
        .map(item => item.totale_casi);

    const intensiveCareDataPoints = data.map(
        item => item.terapia_intensiva);
    
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
                        label: "Totale Attualemente Positivi",
                        data: dataPoints,
                        order: 2,
                        backgroundColor: [
                            'rgb(255, 0, 0, 0.5)'
                        ]
                    },
                    {
                        label: "Totale Casi",
                        data: totaleCasiDataPoints,
                        order: 3,
                        backgroundColor: [
                            'rgb(255, 255, 0, 0.5)'
                        ]
                    },
                    {
                        label: "Terapia Intensiva",
                        data: intensiveCareDataPoints,
                        order: 1,
                        backgroundColor: [
                            'rgb(114, 44, 253)'
                        ]
                    }
                ]
            },
            options: {
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

export default CurrentCasesRegion;