import React from 'react'
import Dropdown from '@mui/joy/Dropdown';
import Menu from '@mui/joy/Menu';
import MenuButton from '@mui/joy/MenuButton';
import MenuItem from '@mui/joy/MenuItem';
import profileImage from '../../images/profile.png';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import "../dropdown_Profile/profileicon.css"
const Profile = () => {
    const navigate = useNavigate();
    function logout(navigate){
        localStorage.removeItem('email');
        localStorage.removeItem('userId');
        navigate('/');
    }
    return (
      <Dropdown>
        <div className='dropdown'>
          <MenuButton><img src={`http://localhost:8000/${localStorage.getItem('email')}.png`} alt="" /></MenuButton>
          <Menu>
            <MenuItem>Profile</MenuItem>
            <MenuItem><Link to="/myAccount" style={{textDecoration:"None",color:"black"}}>My account</Link> </MenuItem>
            <MenuItem onClick={()=>logout(navigate)}>Logout</MenuItem>
          </Menu>
      </div>
        </Dropdown>
  
      );
}

export default Profile