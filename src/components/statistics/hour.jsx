import React, { useEffect, useState } from 'react';
import TopMenuBar from '../Topmenu/TopMenuBar';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import '../Home/home.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const HourBar = () => {
  const [chartData, setChartData] = useState({
    labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    datasets: [{
      label: 'Employee Weekly Time Given',
      data: [],  // Initialize data as empty array
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
  });

  useEffect(() => {
    const fetchTimeEntries = async () => {
      const email = localStorage.getItem('email');
      try {
        const response = await axios.get(`http://localhost:8000/api/timeEntries?email=${email}`);
        const entries = response.data;

        // Map days to indexes
        const daysMap = {
          Monday: 0, Tuesday: 1, Wednesday: 2, Thursday: 3, Friday: 4
        };

        // Initialize a new data array with zeros for each day of the week
        const newData = [0, 0, 0, 0, 0];

        // Populate the newData array with values from the backend
        entries.forEach(entry => {
          const dayIndex = daysMap[entry.day];
          if (dayIndex !== undefined) {
            newData[dayIndex] = parseInt(entry.totalTime);
          }
        });

        // Update the chart data
        setChartData(prevData => ({
          ...prevData,
          datasets: [{
            ...prevData.datasets[0],
            data: newData
          }]
        }));
      } catch (error) {
        console.error('Failed to fetch time entries', error);
      }
    };

    fetchTimeEntries();
  }, []);

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div style={{ height: "80%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <Bar data={chartData} options={{
              responsive: true,
              plugins: {
                legend: {
                    position: 'top',
                },
                title: {
                    display: true,
                    text: 'Weekly Employee Time Reporting'
                }
              }
            }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default HourBar;
