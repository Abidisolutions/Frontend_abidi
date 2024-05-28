import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend ,CategoryScale, LinearScale, BarElement, Title} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
  );

  const barChart = {
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [{
      label: 'Employee Weekly Time Given',
      data: [5, 3, 9, 6,6 ],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(255, 159, 64, 0.2)',
        'rgba(255, 205, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        
      ],
      borderColor: [
        'rgb(255, 99, 132)',
        'rgb(255, 159, 64)',
        'rgb(255, 205, 86)',
        'rgb(75, 192, 192)',
        'rgb(54, 162, 235)',
      ],
      borderWidth: 1
    }]
  };

const Barchart = ({style}) => {
  return (
    <Bar style={{maxHeight:260,maxWidth:390,padding:10, height:400}} data={barChart} options={{
        responsive: true,
        plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Monthly Time Given Charts'
        }
        }
    }}></Bar>
  )
}

export default Barchart