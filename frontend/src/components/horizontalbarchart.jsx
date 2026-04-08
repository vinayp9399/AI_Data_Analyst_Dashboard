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

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HorizontalBarChart = () => {
  const data = {
    labels: ['Apple', 'Google', 'Microsoft', 'Amazon', 'Meta'],
    datasets: [
      {
        label: 'Market Share %',
        data: [25, 30, 20, 15, 10],
        backgroundColor: 'rgba(54, 162, 235, 0.5)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    indexAxis: 'y', // This flips the chart from vertical to horizontal
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: 'Tech Giant Market Share 2026',
      },
      responsive: true,
  maintainAspectRatio: true, 
  aspectRatio: 1,
    },
  };

  return (
      <Bar data={data} options={options} />

  );
};

export default HorizontalBarChart;