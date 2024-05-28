import React, { useState } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../EmployeeInfo/EmployeeInfo.css';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EmployeeInfo = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [projects, setProjects] = useState([
    {
      name: 'Zeeshan',
      fathername: 'Raja',
      homeaddress: 'Model town',
      phone: '000',
      email: 'abc@gmail.com',
      department: 'IT',
      designation: 'Level 2',
    },
  ]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState(null);
  const [selectedAssignedBy, setSelectedAssignedBy] = useState([]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
  };

  const handleAddTaskClick = () => {
    setPopupOpen(true);
    setEditingIndex(null);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setEditingIndex(null);
  };

  const handleAssignedToChange = (selectedOption) => {
    setSelectedAssignedTo(selectedOption);
  };

  const handleAssignedByChange = (selectedOptions) => {
    setSelectedAssignedBy(selectedOptions);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = {
      name: e.target.name.value,
      fathername: e.target.fathername.value,
      homeaddress: e.target.homeaddress.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      department: e.target.department.value,
      designation: e.target.designation.value,

    };

    if (editingIndex !== null) {
      const updatedProjects = [...projects];
      updatedProjects[editingIndex] = formData;
      setProjects(updatedProjects);
    } else {
      setProjects([...projects, formData]);
    }

    setPopupOpen(false);
    setEditingIndex(null);
    e.target.reset();
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortingOption === 'sortby') {
      return 0;
    } else if (sortingOption === 'name') {
      return a.projectName.localeCompare(b.projectName);
    } else if (sortingOption === 'id') {
      return a.id - b.id;
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>Employee Info</h2>
            <button onClick={handleAddTaskClick}>
                Employee Info
            </button>
          </div>
          <div className='cp-content'>
            <div className='cp-search'>
              <input
                className='cp-searchfield'
                type="text"
                placeholder="Search projects or tasks..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className='cp-sort'>
                <select id="sort" value={sortingOption} onChange={handleSortingChange}>
                  <option value="sortby" disabled>Sort by</option>
                  <option value="name">Name</option>
                  <option value="id">ID</option>
                </select>
              </div>
            </div>
            <div className='cp-list'>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Home Address</th>
                    <th>Phone</th>
                    <th>Email</th>
                    <th>Department</th>
                    <th>Designation</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.name}</td>
                      <td>{project.homeaddress}</td>
                      <td>{project.phone}</td>
                      <td>{project.email}</td>
                      <td>{project.department}</td>
                      <td>{project.designation}</td>
                      <td>
                        <button onClick={() => handleEditClick(index)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editingIndex !== null ? 'Employee Info' : 'Employee Info'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="Name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].name : ''}
                />
              </div>
             
              <div className="form-group">
                <label htmlFor="homeaddress">Home Address:</label>
                <input
                  type="text"
                  id="homeaddress"
                  name="homeaddress"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].homeaddress : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone :</label>
                <input
                  type="text"
                  id="phone"
                  name="phone"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].phone : ''}
              />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="text"
                  id="email"
                  name="email"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].email : ''}
              />
              </div>
              <div className="form-group">
                <label htmlFor="department">Department:</label>
                <input
                  type="text"
                  id="department"
                  name="department"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].department : ''}
              />
              </div>     
              <div className="form-group">
                <label htmlFor="designation">Designation:</label>
                <input
                  type="text"
                  id="designation"
                  name="designation"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].designation   : ''}
              />
              </div>     
              <button type="submit">
                {editingIndex !== null ? 'Save Changes' : 'Submit'}
              </button>
              <button onClick={handlePopupClose} className='close-but'>Cancel</button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default EmployeeInfo;
