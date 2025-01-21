import React from "react";
import { Line, Doughnut } from "react-chartjs-2";

import {
    CategoryScale,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend, 
    Chart as ChartJS,
    } 
    from "chart.js";
import { orange, orangeLight, purple, purpleLight } from '../../constants/color';
import { getLast7Days } from '../../lib/features';




ChartJS.register(
    CategoryScale,
    Tooltip,
    Filler,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Legend
);


const labels = getLast7Days();

const lineChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
        title: {
            display: false,
        },
    },

    scales: {
        x: {
            grid: {
                display: false,
            },
        },
        y: {
            beginAtZero: true,
            grid: {
                display: false,
            },
        },
    },
};



// eslint-disable-next-line react/prop-types
const LineChart = ({ value = [] }) => {
    const data = {
    labels,
      datasets: [
        {
          data: value,
          label: "Message",
          fill: true,
          backgroundColor: purpleLight, // Soft teal fill
          borderColor: purple, // Teal line
        },
      ],
    };
  
  return (
    <Line data={data} options={lineChartOptions} />
  );
};

const doughnutChartOptions = {
    responsive: true,
    plugins: {
        legend: {
            display: false,
        },
    },
    cutout: 120,
};


// eslint-disable-next-line react/prop-types
const DoughnutChart = ({ value = [], labels = [] }) => {
    const data = {
        labels,
          datasets: [
            {
              data: value,
              label: "Total Chats Vs Group Chats",
              fill: true,
              backgroundColor: [purpleLight, orangeLight], // Soft teal fill
              borderColor: [purple, orange],// Teal line
              hoverBackgroundColor: [ purple, orange ],
              offset: 40,
            },

          ],
        };
    return (
        <Doughnut
          style={{ zIndex: 10 }}
          data={data} 
          options={doughnutChartOptions} 
        />
    );
  };

export { LineChart, DoughnutChart };
