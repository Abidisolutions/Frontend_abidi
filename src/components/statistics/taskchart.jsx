import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../Home/home.css';
 
ChartJS.register(ArcElement, Tooltip, Legend);

const Taskchart = () => {
    const [taskData, setTaskData] = useState([0, 0, 0]); // [completed, ongoing, on review]
 
  useEffect(() => {
    const fetchTaskStatuses = async () => {
      const name = localStorage.getItem('name'); // Assuming 'name' is stored in localStorage
      const response = await axios.get(`http://localhost:8000/api/task-statuses?name=${name}`);
      const statuses = response.data;
 
      const statusCounts = [0, 0, 0]; // [completed, ongoing, on review]
      statuses.forEach(status => {
        if (status === 'Completed') {
          statusCounts[0] += 1;
        } else if (status === 'InProgress') {
          statusCounts[1] += 1;
        } else if (status === 'Review') {
          statusCounts[2] += 1;
        }
      });
 
      setTaskData(statusCounts);
    };
 
    fetchTaskStatuses();
  }, []);
 
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
        labels: {
          color: "black",
        },
      },
    },
  };
 
  const dataset = {
    labels: ['Task Completed', 'Tasks On Going', 'Tasks On Review'],
    datasets: [
      {
        label: 'Tasks Status',
        data: taskData,
        backgroundColor: [
          'rgba(173, 216, 230, 0.2)', // Light blue for completed
          'rgba(255, 165, 0, 0.2)', // Orange for ongoing
          'rgba(255, 0, 0, 0.2)' // Red for review
        ],
        borderColor: [
          'rgba(173, 216, 230, 1)',
          'rgba(255, 165, 0, 1)',
          'rgba(255, 0, 0, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <div style={{height:"35vh"}}>
        <Doughnut options={options} data={dataset} />
    </div>
    
  )
}

export default Taskchart