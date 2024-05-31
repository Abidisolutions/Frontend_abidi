import React, { useEffect, useState } from 'react';
import TopMenuBar from '../Topmenu/TopMenuBar';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import '../Home/home.css';
import { Link } from 'react-router-dom';
import { Preview, print } from 'react-html2pdf';
import HourBar from '../statistics/hour';
import Barchart from '../statistics/barchart';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Taskchart from '../statistics/taskchart';
 
const HomePage = ({ children }) => {
 
  let [UserStatus, setUserStatus] = useState();
  let [userName, setUserName] = useState();
  let [timeEntries,setTimeEntries] = useState();
  let [projects,setProjects] = useState();


  function createData(name, project, task, endDate) {
    return { name, project, task, endDate };
  }
 
  async function getUserId(userId) {
    try {
      let res = await axios.get(`https://123abcd-abidi_pro.mdbgo.io/api/users/user/${userId}`, {
        params: {
          userId: userId
        }
      });
      return res.data;
    } catch (e) {
      console.log(e);
    }
  }

  const getEntries = async () => {
    try{
      let res = await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/timeEntries',{
        params:{
          email:localStorage.getItem('email')
        }
      });
      console.log(res.data);
      setTimeEntries(res.data);
    }
    catch(e){
      console.log(e);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/my-tasks',{params:{
        name: localStorage.getItem("name"),
      }});
      console.log(response.data);
      
      setProjects(response.data);
    } catch (error) {
      console.error("Failed to fetch tasks");
    }
  };
 
  useEffect(() => {
    let userId = localStorage.getItem('userId');
    getUserId(userId).then((user) => setUserName(user.name));
    getUserId(userId).then((value) => setUserStatus(value.status));
    getEntries();
    fetchTasks();
  }, []);
 
  return (
 
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
 
        
          <div className="profileimg">
              <img src={`https://123abcd-abidi_pro.mdbgo.io/${localStorage.getItem('email')}.png`} alt="" />
              <h2 className='headHome'>Welcome {userName} !</h2>
 
 
              </div>
          <div className='gridcontainer'>
            <div className='grids'>
              <div className='grid-header'>
                <h2>
                  Status
                </h2>
              </div>
              <div className='grid-items'>
              <div className='grid-content'>
                <img src={`https://abidipro-hr.vercel.app/${UserStatus}.png`} style={{maxHeight:"20vh"}}></img>
               <p style={{fontWeight:'bold'}}>{UserStatus}</p> 
              </div>
              </div>
          
 
            </div>
            <div className='grids'>
  <Link to="/projectstats" className="grid-link">
    <div className='grid-header'>
      <h2>
        My Projects
      </h2>
    </div>
    <div className='grid-items'>
      <div className='grid-content'>
        <Taskchart />
      </div>
    </div>
  </Link>
</div>
           
          </div>        
          <div className='gridcontainer'>
            <div className='grids'>
              <div className='grid-header'>
                <h2>
                  Latest Attendance
                </h2>
              </div>
              <div className='grid-items'>
              <div className='grid-content'>
               {timeEntries?.slice(0,3).map((item)=>{
                return(
                  <div style={{margin:30}}>
                    <img src="checked.png" style={{maxHeight:"3vh",marginRight:10}}></img>
                    <p style={{display:"inline"}}><b>Day:</b> {item.day} -   -   - <b>Day Ended :</b> {item.checkOut}</p>
                  </div>
                )
               })}
              </div>
              </div>
           
 
            </div>
            <div className='grids' style={{overflow:"auto"}}>
              <div className='grid-header'>
                <h2>
                  Latest Tasks
                </h2>
              </div>
              <div className='grid-items'>
              <div className='grid-content'style={{padding:2}} >
              <table style={{ width: '100%', borderCollapse: 'collapse', paddingLeft: 2, paddingRight: 4 }}>
        <thead>
          <tr>
            <th style={{ padding: '8px', textAlign: 'left', backgroundColor: 'black', color: 'white'  }}><b>Name</b></th>
            <th style={{ padding: '8px', textAlign: 'right', backgroundColor: 'black', color: 'white'  }}><b>Project Name</b></th>
            <th style={{ padding: '8px', textAlign: 'right', backgroundColor: 'black', color: 'white'  }}><b>Task Name</b></th>
            <th style={{ padding: '8px', textAlign: 'right', backgroundColor: 'black', color: 'white'  }}><b>End Date</b></th>
          </tr>
        </thead>
        <tbody>
          {projects?.slice(0, 3).map((row, i) => (
            <tr key={i}>
              <td style={{ padding: '8px', textAlign: 'left' }}>{row.assignedTo}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{row.projectName}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{row.taskName}</td>
              <td style={{ padding: '8px', textAlign: 'right' }}>{row.endDate.slice(0,10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
              </div>
              </div>
           
 
            </div>
           
          </div>        
          </div>
      </div>
    </div>
  );
};
 
export default HomePage;