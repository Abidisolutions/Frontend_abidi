import React, { useEffect, useState } from 'react';
import TopMenuBar from '../Topmenu/TopMenuBar';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import '../Home/home.css';
import './doc.css';
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 

const Doc = () => {let [UserStatus, setUserStatus] = useState();
  let [userName, setUserName] = useState();
  let [timeEntries,setTimeEntries] = useState();
  let [projects,setProjects] = useState();
  let [filename,setFileName] = useState();



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

  async function HandleSubmitUpload(e){
    e.preventDefault();
    try{
    //   const data ={
    //   filename: e.target.documentName.value,
    //   sentBy: e.target.sentby.value,
    //   dated: e.target.dated.value,
    //   reason: e.target.reason.value,
    //   file: e.target.fileupload.files[0],
    // }
    let formData = new FormData();
    formData.append('filename',e.target.documentName.value);
    formData.append('sentBy',e.target.sentby.value);
    formData.append('dated',e.target.dated.value);
    formData.append('reason',e.target.reason.value);
    formData.append('file',e.target.fileupload.files[0]);
    console.log(e.target.sentby.value);
    console.log(formData);
    const res = await axios.post("http://localhost:3000/api/document",formData);
    console.log(res);
    alert("File Uploaded !");
  }

    catch(e){
      console.log(e);
      alert("Failed to upload file");
      
    }
  }
 
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
        <div className='cp-header'>
            <h2>Document Information</h2>
            <img src="doc.svg" alt="Invoice Icon" style={{width: '12vw', height: '95%'}}></img>
          </div>
          <form  className='InvoiceForm' id="docForm" onSubmit={HandleSubmitUpload}>
          <div className="row">
          <div className="column">
            <span style={{marginBottom:"18px",marginTop:"18px"}}><h3 style={{color:"#E8C16E",display:'inline'}}>DOCUMENT INFORMATION</h3> <img alt="Invoice Icon" style={{display:'inline',width: '30px', height: '30px',marginLeft:8}} src='invoice-icon.png'></img></span>
            
              <label className='label' style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}  htmlFor="documentName">Document Name: *</label>
              <input type="text" style={{padding:7,borderRadius:5,width:"60%"}}  id="documentName" name="documentName"/><br/>              
              
              <label className='label' style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}  htmlFor="bankid">Sent By: *</label>
              <input type="text" style={{padding:7,borderRadius:5,width:"60%"}}  id="sentby" name="sentby"/><br/>              

              <label className='label' style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}  htmlFor="bankid">Reason / Label: *</label>
              <input type="text" style={{padding:7,borderRadius:5,width:"60%"}}  id="reason" name="reason"/><br/>  

              <label htmlFor="paymentTerms" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Dated: *</label>
              <input type="date" style={{padding:7,borderRadius:5,width:"60%"}}  id="dated" name="dated"/><br/>              
              
              <label style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>File (PDF): *</label>
              <label htmlFor='fileupload' className='custom-file-upload' style={{backgroundColor:"#fff",color:"#292826",fontWeight:"normal"}}>File Upload</label>
              <input type="file" onChange={(e)=>setFileName(e.target.files[0].name)} style={{borderRadius:5,width:"60%"}}  id="fileupload" name="fileupload"/>     
              <span>{filename? filename: "None Selected!"}</span>
              <br></br>
              <button className='custom-submit-upload' type='submit'>Upload File</button>
            </div>
          </div>
          </form>

          </div>
      </div>
    </div>
  );
};

export default Doc