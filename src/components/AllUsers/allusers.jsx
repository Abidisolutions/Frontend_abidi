import React, { useState, useEffect } from "react";
import TopMenuBar from "../Topmenu/TopMenuBar";
import SideBar from "../Sidebar/SideBar";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import '../AllUsers/allusers.css'
const AllUsers = () => {

  const columns = [
    { field: "name", headerName: "Name", width: 220 },
    { field: "designation", headerName: "Designation", width: 180 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "personalEmail",
      headerName: "Email",
      description: "This column has a value getter and is not sortable.",
      width: 250,
    },
    {
      field: "reportTo",
      headerName: "Managed By",
      description: "This column has a value getter and is not sortable.",
      width: 150,
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 200,
      renderCell: (params) => {
        return (
          <div>
            <button className="edit-but" onClick={() => handleEditClick(params.row)}>Update</button>
            <button className="del-but"onClick={() => handleDeleteClick(params.row)}>Delete</button>
          </div>
        );
      },
    },
  ];

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isPopupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    async function getUsers() {
      try {
        let res = await axios.get("https://123abcd-abidi_pro.mdbgo.io/api/getUser");
        setUsers(res.data);
        console.log(res.data);
      } catch (e) {
        console.log("Error Fetching Users: ", e);
      }
    }
    getUsers();
  }, []);

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      // Make API call to update user data
      await axios.put(`https://123abcd-abidi_pro.mdbgo.io/api/updateUser`, {
        _id:selectedUser,
        name: e.target.name.value,
        designation: e.target.designation.value,
        status: e.target.status.value,
        personalEmail: e.target.personalEmail.value,
        reportTo: e.target.reportTo.value,
      });
      // Assuming successful update, close the popup
      setPopupOpen(false);
      setSelectedUser(null);
      window.location.reload();
      // Optionally, you can update the users state to reflect the changes immediately
    } catch (error) {
      console.error('Error updating user:', error);
      // Handle error, show error message, etc.
    }
  };
  
  const handleEditClick = (user) => {
    setPopupOpen(true);
  };

  const handleDeleteClick = async (user) => {
    if(selectedUser==null){
      alert("Please select/tick a user first!");
    }else{
      let newone = await axios.delete("https://123abcd-abidi_pro.mdbgo.io/api/deleteUser",{params: {id: selectedUser}});
      console.log("Delete user:", newone);
      window.location.reload();
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setSelectedUser(null);
  };

  return (

    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className="cp-header">
            <h2>All Users</h2>
          </div>
          <div className="cp-content">
            <div style={{ height: 600, width: "100%" }}>
              <DataGrid
               rows={users}
               columns={columns}
               initialState={{
                 pagination: {
                   paginationModel: { page: 0, pageSize: 5 },
                 },
               }}
               pageSizeOptions={[5, 10]}
               checkboxSelection
               onRowSelectionModelChange={(i)=>{setSelectedUser(i[0]);}}
               disableMultipleRowSelection={true}
              />
            </div>
          </div>
        </div>
      </div>

      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>Edit User</h2>
            <form onSubmit={handleEditSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  // onChange={handleChange} // Implement change handler if needed
                />
              </div>
              <div className="form-group">
                <label htmlFor="designation">Designation:</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="status">Status:</label>
                <select name="status" className='userselector'>
                  <option value="CEO">CEO</option>
                  <option value="Admin">Admin</option>
                  <option value="Manager">Manager</option>
                  <option value="Leader">Leader</option>
                  <option value="Employee">Employee</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="personalEmail">Email:</label>
                <input
                  type="text"
                  id="personalEmail"
                  name="personalEmail"
                  // onChange={handleChange}
                />
              </div>
              <div className="form-group">
                <label htmlFor="reportTo">Managed By:</label>
                <input
                  type="text"
                  id="reportTo"
                  name="reportTo"
                  // onChange={handleChange}
                />
              </div>
              <button type="submit">Save</button>
              <button type="submit"onClick={handlePopupClose}>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AllUsers;
