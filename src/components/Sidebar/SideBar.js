import React, { useState,useEffect } from 'react'; // Import useState hook
import { Link } from 'react-router-dom';
import HamburgerIcon from '../../images/Hamburger_icon.svg.png'; // Import your hamburger icon
import '../Sidebar/sidebar.css'
import clock from '../../images/punch-clock.png'
import punch from '../../images/wall-clock.png'
import time from '../../images/earth-hour.png'
import man from '../../images/management.png'
import report from '../../images/report.png'
import project from '../../images/project.png'
import assign from '../../images/assignment.png'
import clip from '../../images/clipboard.png'
import earn from '../../images/Earnings.png'
import invoice from '../../images/invoice.png'
import pay from '../../images/payment-Status.png'
import data from '../../images/personal-data.png'
import salary from '../../images/salary.png'
import view from '../../images/View Invoice.png'
import createuser from '../../images/user.png'
import alluser from '../../images/allusers.png'
import axios from 'axios';

  const SideBar = () => {
    const [isOpen, setIsOpen] = useState(true);
    const [isAdmin, setisAdmin] = useState(false);
    const [isManager, setisManager] = useState(false); 
    const [isCEO, setisCEO] = useState(false);   // Initialize the sidebar as open
  
    // Define the toggle function
    const toggleSidebar = () => {
      setIsOpen(!isOpen);
    };

   
  
    async function getUserId(userId){
      try{
        let res = await axios.get(`https://123abcd-abidi_pro.mdbgo.io/api/users/user/${userId}`,{
          params:{
            userId:userId
          }
        });
        return res.data.status;
        }catch(e){
          console.log(e);
        }
    }

    useEffect(()=>{
      let userId = localStorage.getItem('userId');
      getUserId(userId).then((value)=>{
        if(value=="Admin" || value=="CEO"){
          setisAdmin(true);
        }
        if(value=="Admin" || value=="CEO" || value=="Manager" || value=="Leader"){
          setisManager(true);
        }
        if(value=="CEO"){
          setisCEO(true);
        }
      });
      
    },[])
  return (
    <div className={`side-bar ${isOpen ? '' : 'closed'}`}>
    <nav>
      <button onClick={toggleSidebar} className="sidebar-toggle">
        <img src={HamburgerIcon} alt="Hamburger Icon" />
      </button>
        <Link to="/" className='side_mainheading'>DASHBOARD</Link>
        <h3 className='side_barheading'>Time</h3>
        <Link to="/Clockin_out"> <img src={punch} alt='' />Clockin/Clockout</Link>
        <Link to="/TimeoffReq"><img src={time} alt='' />Submit Timeoff Requests</Link>
        <Link to="/ManageExceptions"><img src={man} alt='' />Holiday Exceptions</Link>
        <Link to="/timeoff-app"><img src={man} alt='' />Timeoff Approval</Link>

        <h3 className='side_barheading'>Projects</h3>
        {
          isManager && <>
          <Link to="/CreateProject"><img src={project} alt='' />Create Project</Link>
          <Link to="/AssignTasks"><img src={assign} alt='' />Assign Tasks</Link>
          <Link to="/TaskStatus"><img src={clip} alt='' />Task Status</Link>
          </>
        }

        {
          !isCEO && <Link to="/MyTasks"><img src={clip} alt='' />My Tasks</Link>
        }

{
          !isCEO && <Link to="/projectstats"><img src={clip} alt='' />My Task Board</Link>
        }
        

        <h3 className='side_barheading'>Payroll</h3>
        <Link to="/CreateCalender"><img src={clock} alt='' />Create Calendar</Link>
        <Link to="/EarningAndDeductions"><img src={earn} alt='' />Earning And Deductions</Link>
        <Link to="/SalaryStructure"><img src={salary} alt='' />Salary Structure And Benefits</Link>
        <Link to="/EmployeeInfo"><img src={data} alt='' />Employee Info And Documents</Link>
        {isAdmin? <>
          <h3 className='side_barheading'>Invoices</h3>
        <Link to="/CreateInvoice"><img src={invoice} alt='' />Create Invoice</Link>
        <Link to="/ViewInvoice"><img src={view} alt='' />View Invoice</Link>
        <Link to="/PaymentStatus"><img src={pay} alt='' />Payment Status</Link> 
        </>
         : null
      }
        
        {
          isAdmin?
          <>
          <h3 className='side_barheading'>Users</h3>
          <Link to = "/CreateUser"><img src={createuser} alt='' />Create User</Link>
          <Link to = "/AllUsers"><img src={alluser} alt='' />All Users</Link>
          </>          
          :null
        }
        

  
      </nav>
    </div>
  );
};

export default SideBar;
