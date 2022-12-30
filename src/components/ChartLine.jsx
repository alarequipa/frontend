import React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Line } from 'react-chartjs-2';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

  export const options = {
    maintainAspectRatio: true,
    responsive: true,
    plugins: {
        
        title: {
            display: false,
            text: 'Sales Charts',
            fontColor: 'white',
        },
        legend: {
            labels: {
                fontColor: '#f44336',
            },
            align: 'end',
            position: 'bottom',
        },
        tooltips: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'nearest',
            intersect: true,
        },
        scales: {
            xAxes: [
                {
                    ticks: {
                        fontColor: 'rgba(17,17,17,.7)',
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Month',
                        fontColor: 'white',
                    },
                    gridLines: {
                        display: false,
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: 'rgba(33, 37, 41, 0.3)',
                        zeroLineColor: 'rgba(0, 0, 0, 0)',
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: 'rgba(17,17,17,.7)',
                    },
                    display: true,
                    scaleLabel: {
                        display: false,
                        labelString: 'Value',
                        fontColor: 'white',
                    },
                    gridLines: {
                        borderDash: [3],
                        borderDashOffset: [3],
                        drawBorder: false,
                        color: 'rgba(17, 17, 17, 0.15)',
                        zeroLineColor: 'rgba(33, 37, 41, 0)',
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                    },
                },
            ],
        },
    },
  };
  
  const labels = [ 'Enero',
                'Febrero',
                'Marzo',
                'Abril',
                'Mayo',
                'Junio',
                'Julio',];
  
  export const data = {
    labels,
    datasets: [
        {
            label: new Date().getFullYear(),
            backgroundColor: '#000000',
            borderColor: '#000000',
            tension:1,
            cubicInterpolationMode: 'monotone',
            data: [65, 78, 66, 44, 56, 67, 75],
            fill: false,
        },
        {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: '#ff9800',
            borderColor: '#ff9800',
            fontColor:'#ff9800',
            data: [40, 68, 86, 74, 56, 60, 87],
        },
    ],
  };
  
export default function CharLine() {
   
    return (
    <Card className='p-4  card'>
                    <CardHeader className='bg-blue-400 text-white text-center m-auto -mt-9 shadow-md shadow-slate-400 rounded-lg'
                    title="Vehiculos registrados"/>

                        <CardContent>
                            
                            <Line options={options} data={data} />

                        </CardContent>
    </Card>
        
    );
};
