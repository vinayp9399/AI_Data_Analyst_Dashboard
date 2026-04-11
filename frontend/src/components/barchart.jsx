import React from 'react';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register the components you need
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const BarChart = (props) => {
  const data = {
    labels: props.labels,
    datasets: [
      {
        label: props.valueDescription,
        data: props.values,
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: 'top' },
      title: { display: true, text: props.title },
    },
    responsive: true,
  maintainAspectRatio: true, 
  aspectRatio: 1,
  };

  return <Bar data={data} options={options} />;
};

export default BarChart;