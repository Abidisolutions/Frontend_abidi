import React from 'react';
import '../Topmenu/topmenu.css'
import profile_icon from '../../images/profile.png'
import Profile from '../dropdown_Profile/mui_profile';
import {Link} from "react-router-dom";
const TopMenuBar = () => {
  return (
    <div className="top-menu-bar">
      <div className="logo">Abidi-Pro</div>
     
      <div className="icons">
        <div className="statistic-icon"><Link to="/stats" style={{ textDecoration: 'none' , color:"black"}}> Statistics</Link></div>
        <div className="settings-icon" style={{ textDecoration: 'none' , color:"black"}}>Settings </div>
        <div className="product-icon" style={{ textDecoration: 'none' , color:"black"}}>Products</div>
      </div>
      <div className="profile">
        <Profile></Profile>
      </div>
      
    </div>
  );
};

export default TopMenuBar;
