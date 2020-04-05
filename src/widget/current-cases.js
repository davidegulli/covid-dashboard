import React, { useRef, useEffect } from 'react';
import Chart from 'chart.js';
import moment from 'moment';

const CurrentCases = (props) => {

    const chartDiv = useRef(null);

    const labels = props.data.map(
        item => moment(item.data).format("DD/MM"));

    const dataPoints = props.data.map(
        item => item.totale_positivi);

    const totaleCasiDataPoints = props.data.map(
        item => item.totale_casi);

    const intensiveCareDataPoints = props.data.map(
        item => item.terapia_intensiva);

    useEffect(() => {

        console.log(props.data);

        const canvasRef = chartDiv.current.getContext("2d");

        new Chart(canvasRef, {
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

    });

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

export default CurrentCases;