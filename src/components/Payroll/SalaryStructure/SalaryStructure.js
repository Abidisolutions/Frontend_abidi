import React, { useState } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../SalaryStructure/SalaryStructure.css';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SalaryStructure = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [projects, setProjects] = useState([
    {
      name: 'Zeeshan',
      department: 'Raja',
      workinghours: 'Level 2',
      basicsalary: 'Model town',
      allownce: '000',
      date: 'abc@gmail.com',
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
      department: e.target.department.value,
      workinghours: e.target.workinghours.value,
      basicsalary: e.target.basicsalary.value,
      allownce: e.target.allownce.value,
      date: e.target.date.value,

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
            <h2>Salary Structure</h2>
            <button onClick={handleAddTaskClick}>
                Salary Structure
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
                    <th>Department</th>
                    <th>Working Hours</th>
                    <th>Basic Salary</th>
                    <th>Allownce</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.name}</td>
                      <td>{project.department}</td>
                      <td>{project.workinghours}</td>
                      <td>{project.basicsalary}</td>
                      <td>{project.allownce}</td>
                      <td>{project.date}</td>
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
            <h2>{editingIndex !== null ? 'Salary Structure' : 'Salary Structure'}</h2>
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
                <label htmlFor="workinghours">Working Hours:</label>
                <input
                  type="text"
                  id="workinghours"
                  name="workinghours"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].workinghours : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="basicsalary">Basic Salary:</label>
                <input
                  type="text"
                  id="basicsalary"
                  name="basicsalarys"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].basicsalary : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="allownce">Allownce :</label>
                <input
                  type="text"
                  id="allownce"
                  name="allownce"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].allownce : ''}
              />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].date : ''}
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

export default SalaryStructure;
