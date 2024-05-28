import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend ,CategoryScale, LinearScale, BarElement, Title} from 'chart.js';
import React,{useEffect,useState} from 'react';
import TopMenuBar from '../Topmenu/TopMenuBar';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import '../Home/home.css'
import "./menu.css";
import {Link} from "react-router-dom";

const Menu = () => {
    return (
        <>
        <div className="home-page">
          <TopMenuBar />
          <div className="content-container">
            <SideBar />
            <div className="main-content">
            <Link class="badge-button" to="/stats/task">Tasks Completed</Link>
            <div style={{margin:10}}></div>
            <Link class="badge-button" to="/stats/hour">Hours Record</Link>
            </div>
          </div>
        </div>
        </>
      )
}

export default Menu