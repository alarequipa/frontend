import React from 'react';
import { Card, CardHeader, CardContent } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
  import { Bar } from 'react-chartjs-2';
  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );
  export const options = {

    responsive: true,
    plugins: {
      hover: {
        mode: 'nearest',
        intersect: true,
      },
      tooltips: {
        mode: 'index',
        intersect: false,
    },
     legend: {
        labels: {
            fontColor: 'rgba(17,17,17,.7)',
        },
        align: 'end',
        position: 'bottom',
     },

      scales: {
        xAxes: [
            {
                display: false,
                scaleLabel: {
                    display: true,
                    labelString: 'Month',
                },
                gridLines: {
                    borderDash: [2],
                    borderDashOffset: [2],
                    color: 'rgba(33, 37, 41, 0.3)',
                    zeroLineColor: 'rgba(33, 37, 41, 0.3)',
                    zeroLineBorderDash: [2],
                    zeroLineBorderDashOffset: [2],
                },
            },
        ],
        yAxes: [
            {
                display: true,
                scaleLabel: {
                    display: false,
                    labelString: 'Value',
                },
                gridLines: {
                    borderDash: [2],
                    drawBorder: false,
                    borderDashOffset: [2],
                    color: 'rgba(33, 37, 41, 0.2)',
                    zeroLineColor: 'rgba(33, 37, 41, 0.15)',
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
            backgroundColor: '#03a9f4',
            borderColor: '#03a9f4',
            data: [30, 78, 56, 34, 100, 45, 13],
            fill: false,
            barThickness: 8,
        },
        {
            label: new Date().getFullYear() - 1,
            fill: false,
            backgroundColor: '#f44336',
            borderColor: '#f44336',
            data: [27, 68, 86, 74, 10, 4, 87],
            barThickness: 8,
        },   
    ],
  };
  
export default function ChartBar() {
   
    return (
    <Card className='p-4 card'>
                    <CardHeader className='bg-blue-400 text-white text-center m-auto -mt-9 shadow-md shadow-slate-400 rounded-lg'
                    title="Empresas por departamento"/>

                        <CardContent>
                            <div className='relative'>
                            <Bar options={options} data={data} />

                            </div>

                        </CardContent>
    </Card>
        
    );
};

