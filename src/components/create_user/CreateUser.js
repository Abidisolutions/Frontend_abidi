import React, { useState, useEffect } from 'react';
import TopMenuBar from '../Topmenu/TopMenuBar';
import SideBar from '../Sidebar/SideBar';
import axios from 'axios';
import '../create_user/create_user.css';

const CreateUser = () => {
  let [UserStatus, setUserStatus] = useState();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    officeId: '',
    linkedinId: '',
    designation: '',
    city: '',
    phoneNumber: '',
    birthday: '',
    status: '',
    reportTo:'',
    personalEmail: "", // Add status to form data
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://123abcd-abidi_pro.mdbgo.io/api/users/create-user', {
        ...formData,
        birthday: formData.birthday ? new Date(formData.birthday).toISOString() : null,
      });
      alert('User created successfully');
      // Clear the form
      setFormData({
        email: '',
        password: '',
        name: '',
        officeId: '',
        linkedinId: '',
        designation: '',
        city: '',
        phoneNumber: '',
        birthday: '',
        status: '',
        reportTo: '',
        personalEmail: "", // Reset status
      });
      await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/createUser/mail', {
        params: {
          personalEmail: formData.personalEmail,
          email: formData.email,
          password: formData.password,
        }
      }).then(() => alert("email sent!"));
    } catch (error) {
      console.error('Error creating user:', error.response.data);
      alert('Error creating user');
    }
  };

  async function getUserId(userId) {
    try {
      let res = await axios.get(`https://123abcd-abidi_pro.mdbgo.io/api/users/user/${userId}`, {
        params: {
          userId: userId,
        },
      });
      return res.data.designation;
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    let userId = localStorage.getItem('userId');
    getUserId(userId).then((value) => setUserStatus(value));
  }, []);

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div id="form-cont">
            <h1
              style={{
                textAlign: "center",
                textTransform: "capitalize",
                color: "#978d03",
                fontSize: "40px",
                marginBottom:"20px",
              }}
            > Create User
            </h1>
            <form onSubmit={handleSubmit} className="create-user-form">
            <div id="form-row">
              <div className="formitem">
                <label>Email</label>
                <input type="email" id='uemail' name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="formitem">
                <label>Password</label>
                <input type="password" name="password" value={formData.password} onChange={handleChange} required />
              </div>
              <div className="formitem">
                <label>Personal Email</label>
                <input type="email" name="personalEmail"id='uemail' value={formData.personalEmail} onChange={handleChange} required />
              </div>
            </div>
            <div id="form-row">
              <div className="formitem">
                <label>Name</label>
                <input type="text" name="name" value={formData.name} onChange={handleChange} />
              </div>
              <div className="formitem">
                <label>Designation</label>
                <input type="text" name="designation" value={formData.designation} onChange={handleChange} />
              </div>
              <div className="formitem">
              <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
              </div>
            

            </div>
            <div id="form-row">
            <div className="formitem">
                <label>Status</label>
                <select name="status" className='userselector' value={formData.status} onChange={handleChange}>
                  <option value="CEO">CEO</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Leader">Leader</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>

              <div className="formitem">
                <label>Report to:</label>
                <select name="reportTo" className='userselector' value={formData.reportTo} onChange={handleChange}>
                  <option value="Summiyah Abbasi">Summiyah Abbasi</option>
                  <option value="Hassan Rizvi">Hassan Rizvi</option>
                  <option value="Najaf Tirmizi">Najaf Tirmizi</option>
                </select>
              </div>
              <div className="formitem">
              <label>Office ID</label>
          <input type="text" name="officeId" value={formData.officeId} onChange={handleChange} />
              </div>

             
            </div>
            <div id="form-row">
           
            <div className="formitem">
              <label>LinkedIn ID</label>
          <input type="text" name="linkedinId" value={formData.linkedinId} onChange={handleChange} />
              </div>
              <div className="formitem">
              <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
              </div>
              
              <div className="formitem">
              <label>Birthday</label>
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} />
              </div>
             

            </div>
            <div id="form-bttonrow">
           
            <div id="formbutt">
              <button type="submit" >Create</button>

              </div>
             

            </div>
</form>

          </div>
        </div>




      </div >
    </div >


  );
};

export default CreateUser;
