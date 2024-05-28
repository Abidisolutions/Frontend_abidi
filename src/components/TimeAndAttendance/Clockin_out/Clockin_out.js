import React from 'react';
import { useState, useEffect,useRef } from "react";
import { Link } from 'react-router-dom';
import Image from "../../../images/time.png";
import '../../TimeAndAttendance/Clockin_out/Clockin_out.css';
import SideBar from '../../Sidebar/SideBar';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import axios from 'axios';
import { Preview, print } from 'react-html2pdf';
import { DownloadTableExcel } from 'react-export-table-to-excel';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ClockIn_out = () => {
  let interval;
  const tableRef = useRef(null);
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [checkInTime, setCheckInTime] = useState(null);
  const [checkInButtonText, setCheckInButtonText] = useState("Checkin");
  const [timeEntries, setTimeEntries] = useState([]);
  const [ispause, setIspause] = useState(false);

  useEffect(() => {

    if (isActive) {
      setIspause(false);
      interval = setInterval(() => {
        setTime(time+ 1);
      }, 1000);
    } else if (!isActive && time !== 0) {
      clearInterval(interval);
    }
    getEntries();

    return () => clearInterval(interval);
  }, [isActive, time]);
  
  const handlePause = () => {
      setIspause(!ispause);
      setIsActive(!isActive); // If clock is active and paused, clear interval to pause
  }

  const handleCheckin = () => {
    const now = new Date();
    if (!isActive) {
      // Clocking in
      setCheckInTime(now); // Update clock-in time
      setIsActive(true);
      setCheckInButtonText("CLOCK OUT");
    } else {
      // Clocking out
      setIsActive(false);
      setCheckInButtonText("CHECK IN");
      let newEntry = {
        date: now.toLocaleDateString(),
        day: now.toLocaleDateString('en-US', { weekday: 'long' }),
        checkIn: checkInTime.toLocaleTimeString(),
        checkOut: now.toLocaleTimeString(),
        totalTime: formattedTime
      };
      // setTimeEntries(prevEntries => [...prevEntries, newEntry]);
      setTime(0);
      newEntry.email= localStorage.getItem('email');
      axios.post("http://localhost:8000/api/timeEntries",newEntry).then((res)=>{console.log(res);window.location.reload();}).catch((err)=>{console.log(err);toast.info(err.response.data.error);});
      // Do not reset checkInTime here, let it persist for the next clock-in
    }
  };

  const getTotalTime = (startTime, endTime) => {
    const diffInSeconds = Math.floor((endTime - startTime) / 1000);
    const hours = Math.floor(diffInSeconds / 3600);
    const minutes = Math.floor((diffInSeconds % 3600) / 60);
    const seconds = diffInSeconds % 60;

    return `${hours}h : ${minutes}min : ${seconds}sec`;
  };

  const opt = {
    margin:       10, // Add 10mm margin to all sides
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  const getEntries = async () => {
    try{
      let res = await axios.get('http://localhost:8000/api/timeEntries',{
        params:{
          email:localStorage.getItem('email')
        }
      });
      setTimeEntries(res.data);
    }
    catch(e){
      console.log(e);
    }
  };

  const formattedTime = new Date(time * 1000).toISOString().substr(11, 8);
  const formattedTodayTime = new Date().toLocaleTimeString();

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <h2 className="section-heading">Clock In and Clock Out</h2>
          <div className="flex-container">
           
            <div className="table-container">
              <h2 className="section-heading">Time Sheet</h2>
              <p className="timesheet-description">
                The Time Sheet of your given hours is shown here
              </p>
              <table id={"tableSheet"} ref={tableRef}>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Day</th>
                    <th>Check In</th>
                    <th>Check Out</th>
                    <th>Total Time</th>
                  </tr>
                </thead>
                <tbody>
                  {timeEntries.map((entry, index) => (
                    <tr key={index}>
                      <td>{entry.date}</td>
                      <td>{entry.day}</td>
                      <td>{entry.checkIn}</td>
                      <td>{entry.checkOut}</td>
                      <td>{entry.totalTime}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="clock-in-box">
              <div className="top">
                <img src={Image} alt="watch_pic" />
                <h3>Your Time</h3>
              </div>
              <div className="middle">
                <h1>{formattedTime}</h1>
                <h4>
                  Clocked In: Today At {isActive ? checkInTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true }) : ''}
                </h4>
                <button disabled={ispause} onClick={handleCheckin}>{checkInButtonText}</button> <br></br>
                {ispause? `Un-pause in order to Checkout`:``}
                <p>Today's time: {formattedTodayTime}</p>
              </div>
              <div className="lower">
                <p>This Week <br /> <span>16h 30m</span></p>
                <h4>Pay Period <br /> <span>56h 30m</span> </h4>
              </div>
              <div className="lower_timesheet">
              <button disabled={time? false:true} onClick={handlePause}>{ispause? `Start`:`Pause`}</button> <br></br>
                
                  <button onClick={()=>print(localStorage.getItem("email"),"tableSheet")}> Your Timesheet </button>
                  <br></br>
                  <DownloadTableExcel
                    filename={`Attendence: ${localStorage.getItem("email")}`}
                    sheet="users"
                    currentTableRef={tableRef.current}>
                   <button> Export excel </button>
                  </DownloadTableExcel>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClockIn_out;
