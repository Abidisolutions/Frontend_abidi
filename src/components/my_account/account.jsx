import React, { useState, useEffect } from "react";
import axios from "axios";
import TopMenuBar from "../Topmenu/TopMenuBar";
import SideBar from "../Sidebar/SideBar";
import "../my_account/account.css";

const Account = () => {
  const [imageProfile, setimageProfile] = useState();
  const [formData, setFormData] = useState({
    name: "",
    personalEmail: "",
    phoneNumber: "",
    gender: "",
    birthday: "",
    street: "",
    city: "",
    state: "",
    country: "",
    linkedinId: "",
    twitter: "",
    facebook: "",
  });
  const [personalData, setpersonalData] = useState({
    name: "",
    personalEmail: "",
    phoneNumber: "",
    gender: "",
    birthday: "",
    street: "",
    city: "",
    state: "",
    country: "",
    linkedinId: "",
    twitter: "",
    facebook: "",
    reportTo: "",
  });

  const handleFileChange = async (event) => {
    const { id, files } = event.target;
    const fileNameId =
      id === "profile-picture-upload" ? "profile-picture-name" : "resume-name";
    const fileNameElement = document.getElementById(fileNameId);
    fileNameElement.textContent = files[0]
      ? files[0].name
      : "No file chosen...";

      try{
        const formData = new FormData();
        formData.append('email',localStorage.getItem("email"));
        formData.append('file',files[0]);
        setimageProfile(files[0]);
        const response = await fetch('https://123abcd-abidi_pro.mdbgo.io/api/profile', {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();
        console.log(data);
    }
    catch(e){
      console.log("Error Occured: " + e.message);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    axios.get(`https://123abcd-abidi_pro.mdbgo.io/api/users/user/${userId}`)
      .then(response => {
        console.log(response.data);
        const userData = response.data;
        setpersonalData({
          ...formData,
          name: userData.name || "",
          personalEmail: userData.personalEmail || "",
          phoneNumber: userData.phoneNumber || "",
          gender: userData.gender || "",
          birthday: userData.birthday ? userData.birthday.slice(0, 10) : "", // Format birthday to YYYY-MM-DD
          street: userData.street || "",
          city: userData.city || "",
          state: userData.state || "",
          country: userData.country || "",
          linkedinId: userData.linkedinId || "",
          twitter: userData.twitter || "",
          facebook: userData.facebook || "",
          reportTo : userData.reportTo || "",
        });

      })
      .catch(error => console.error("Failed to fetch user details", error));
  }, []);

  const handleUpdate = async (event) => {
    event.preventDefault();
    const userId = localStorage.getItem("userId");

    try {
      await axios.put("https://123abcd-abidi_pro.mdbgo.io/api/users/updateAccount", { userId, ...formData });
      alert("Account updated successfully");
      window.location.reload();
    } catch (error) {
      console.error("Failed to update account", error);
      alert("Failed to update account");
    }
  };



  return (
    <>
      <div className="home-page">
        <TopMenuBar />
        <div className="content-container">
          <SideBar />
          <div className="profile-page">
            <div className="profile-left">
              <form className="create-user-form" onSubmit={handleUpdate}>
                <div className="formbox">
                  <h2>Basic Information</h2>
                  <div id="form-row">
                    <div className="formitem2">
                      <label>Name</label>
                      <input type="text" name="name" onChange={handleChange} disabled placeholder={personalData.name}/>
                    </div>
                    <div className="formitem2">
                      <label>Personal Email</label>
                      <input type="text" name="personalEmail" onChange={handleChange} />
                    </div>
                  </div>
                  <div id="form-row">
                    <div className="formitem3">
                      <label>Phone Number</label>
                      <input type="text" name="phoneNumber" onChange={handleChange} />
                    </div>
                    <div className="formitem3">
                      <label>Gender</label>
                      <input type="text" name="gender" onChange={handleChange} />
                    </div>
                    <div className="formitem3">
                      <label>Date Of Birth</label>
                      <input type="date" name="birthday" onChange={handleChange} />
                    </div>
                  </div>
                  <div id="form-row">
                    <div className="formitem2">
                      <label
                        htmlFor="profile-picture-upload"
                        className="file-upload-label"
                      >
                        Profile Picture
                      </label>
                      <input
                        type="file"
                        id="profile-picture-upload"
                        name="image"
                        accept="image/*"
                        style={{ display: "none" }}
                        onChange={handleFileChange} // You'll define this function to update the file name
                      />
                      <span
                        className="file-upload-btn"
                        onClick={() =>
                          document
                            .getElementById("profile-picture-upload")
                            .click()
                        }
                      >
                        Choose File
                      </span>
                      <span className="file-name" id="profile-picture-name">
                        No file chosen...
                      </span>
                    </div>
                    <div className="formitem2">
                      <label
                        htmlFor="resume-upload"
                        className="file-upload-label"
                      >
                        Resume
                      </label>
                      <input
                        type="file"
                        id="resume-upload"
                        name="resume"
                        style={{ display: "none" }}
                        onChange={handleFileChange} // Use the same function or another if you need specific handling
                      />
                      <span
                        className="file-upload-btn"
                        onClick={() =>
                          document.getElementById("resume-upload").click()
                        }
                      >
                        Choose File
                      </span>
                      <span className="file-name" id="resume-name">
                        No file chosen...
                      </span>
                    </div>
                  </div>
                </div>
                <div className="formbox">
                  <h2>Residence</h2>
                  <div id="form-row">
                    <div className="formitem1">
                      <label>Street</label>
                      <input type="text" name="street" onChange={handleChange}  />
                    </div>
                  </div>
                  <div id="form-row">
                    <div className="formitem3">
                      <label>City</label>
                      <input type="text" name="city" onChange={handleChange}  />
                    </div>
                    <div className="formitem3">
                      <label>State / Province</label>
                      <input type="text" name="state" onChange={handleChange} />
                    </div>
                    <div className="formitem3">
                      <label>Country</label>
                      <input type="text" name="country" onChange={handleChange} />
                    </div>
                  </div>
                </div>
                <div className="formbox">
                  <h2>Social</h2>
                  <div id="form-row">
                    <div className="formitems">
                      <label>LinkedIn</label>
                      <input type="text" name="street" onChange={handleChange} />
                    </div>
                  </div>
                  <div id="form-row">
                    <div className="formitems">
                      <label>Twitter</label>
                      <input type="text" name="twitter" onChange={handleChange} />
                    </div>
                  </div>
                  <div id="form-row">
                    <div className="formitems">
                      <label>Facebook</label>
                      <input type="text" name="facebook" onChange={handleChange} />
                    </div>
                  </div>
                  <span
                        className="file-upload-btn" onClick={handleUpdate}
                      >
                        Save 
                      </span>
                </div>
              </form>
            </div>
            <div className="profile-right" style={{display:"flex",flexDirection:"column",alignItems:"center"}}>
              <div className="profileimg">
              <img src={`https://123abcd-abidi_pro.mdbgo.io/${localStorage.getItem('email')}.png`} alt="" />
              <h2>{personalData.name}</h2>


              </div>
              
              <div  className="preview">
              <p><strong>Personal Email:</strong> {personalData.personalEmail}</p>
              <p><strong>Phone Number:</strong> {personalData.phoneNumber}</p>
              <p><strong>Gender:</strong> {personalData.gender}</p>
              <p><strong>Birthday:</strong> {personalData.birthday}</p>
              <p><strong>Street:</strong> {personalData.street}</p>
              <p><strong>City:</strong> {personalData.city}</p>
              <p><strong>State / Province:</strong> {personalData.state}</p>
              <p><strong>Country:</strong> {personalData.country}</p>
              <p><strong>LinkedIn:</strong> {personalData.linkedinId}</p>
              <p><strong>Twitter:</strong> {personalData.twitter}</p>
              <p><strong>Facebook:</strong> {personalData.facebook}</p>
              <p><strong>Report To:</strong> {personalData.reportTo}</p>

              </div>
              <iframe src={`https://123abcd-abidi_pro.mdbgo.io/${localStorage.getItem('email')}.pdf`} style={{maxHeight:600,margin:20, maxWidth:96+"%"}} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Account;

