import React from 'react';
import { Line } from 'react-chartjs-2';
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

// Registering the elements required for a Line chart
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.valueDescription,
        data: props.values,
        fill: false, // Set to true if you want an Area Chart
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.3, // Adds a slight curve to the line
        pointBackgroundColor: 'rgb(255, 99, 132)',
      },
    ],
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
  maintainAspectRatio: true, 
  aspectRatio: 1,
  };

  return <Line data={data} options={options} />;
};

export default LineChart;