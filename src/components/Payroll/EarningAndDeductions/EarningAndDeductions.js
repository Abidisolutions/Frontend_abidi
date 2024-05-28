import React, { useState } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../EarningAndDeductions/EarningAndDeductions.css';
import Select from 'react-select';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EarningAndDeductions = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [projects, setProjects] = useState([
    {
      name: 'Zeeshan',
      totalearning: '100000',
      leavedeductions: '0.00',
      noofleaves: '0',
      reportingmanager: 'Najaf',
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
      totalearning: e.target.totalearning.value,
      leavedeductions: e.target.leavedeductions.value,
      noofleaves: e.target.noofleaves.value,
      reportingmanager: e.target.reportingmanager.value,
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
            <h2>Earning And Deductions</h2>
            <button onClick={handleAddTaskClick}>
            EarningAndDeductions
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
                    <th>Total Earning</th>
                    <th>Leave Deductions</th>
                    <th>No of Leaves</th>
                    <th>Reporting Manager</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.name}</td>
                      <td>{project.totalearning}</td>
                      <td>{project.leavedeductions}</td>
                      <td>{project.noofleaves}</td>
                      <td>{project.reportingmanager}</td>
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
            <h2>{editingIndex !== null ? 'Edit Earning And Deductions' : 'Earning And Deductions'}</h2>
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
                <label htmlFor="totalearning">Total Earning:</label>
                <input
                  type="text"
                  id="totalearning"
                  name="totalearning"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].totalearning : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="leavedeductions">Leave Deductions:</label>
                <input
                  type="text"
                  id="leavedeductions"
                  name="leavedeductions"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].leavedeductions : ''}
              />
              </div>
              <div className="form-group">
                <label htmlFor="noofleaves">No Of Leaves:</label>
                <input
                  type="text"
                  id="noofleaves"
                  name="noofleaves"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].noofleaves : ''}
              />
              </div>
              <div className="form-group">
                <label htmlFor="reportingmanager">Reporting Manager:</label>
                <input
                  type="text"
                  id="reportingmanager"
                  name="reportingmanager"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].reportingmanager : ''}
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

export default EarningAndDeductions;
