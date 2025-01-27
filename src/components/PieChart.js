// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChart = ({ data }) => {
  const chartData = {
    labels: Object.keys(data),
    datasets: [
      {
        data: Object.values(data),
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#F7464A'],
      },
    ],
  };

  return (
    <div style={{ width: '400px', height: '400px' }}>
      <Pie data={chartData} />
    </div>
  );
};

export default PieChart;
