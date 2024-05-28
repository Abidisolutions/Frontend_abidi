import React, { useState } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../CreateCalender/CreateCalender.css';
import icon1 from '../../../images/01__1_-removebg-preview (1).png'
 
 
const CreateCalender = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [projects, setProjects] = useState([
    {
      PayrollPeriodsStartDate: '2022-01-01',
      PayrollPeriodsEndDate: '2022-02-01',
      CalenderName: 'Abidi Bi weekly Payroll',
      CuttoffDate: '16-02-2024',
      ProcessingSchedule: 'Process payment: Mrach 3 2024',
    },
    {
        PayrollPeriodsStartDate: '2022-01-01',
        PayrollPeriodsEndDate: '2022-02-01',
        CalenderName: 'Abidi Bi weekly Payroll',
        CuttoffDate: '16-02-2024',
        ProcessingSchedule: 'Process payment: Mrach 3 2024',
    },
    {
        PayrollPeriodsStartDate: '2022-01-01',
      PayrollPeriodsEndDate: '2022-02-01',
      CalenderName: 'Abidi Bi weekly Payroll',
      CuttoffDate: '16-02-2024',
      ProcessingSchedule: 'Process payment: Mrach 3 2024',
    },
    {
        PayrollPeriodsStartDate: '2022-01-01',
        PayrollPeriodsEndDate: '2022-02-01',
        CalenderName: 'Abidi Bi weekly Payroll',
        CuttoffDate: '16-02-2024',
        ProcessingSchedule: 'Process payment: Mrach 3 2024',
    },
    // Add more hardcoded entries as needed
  ]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
 
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
 
  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
  };
 
  const handleAddProjectClick = () => {
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
 
  const handleFormSubmit = (e) => {
    e.preventDefault();
 
    const formData = {
      PayrollPeriodsStartDate: e.target.PayrollPeriodsStartDate.value,
      PayrollPeriodsEndDate: e.target.PayrollPeriodsEndDate.value,
      CalenderName: parseInt(e.target.CalenderName.value, 10),
      CuttoffDate: e.target.CuttoffDate.value,
      ProcessingSchedule: e.target.ProcessingSchedule.value,
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
      return a.PayrollPeriodsStartDate.localeCompare(b.PayrollPeriodsStartDate);
    } else if (sortingOption === 'id') {
return a.id - b.id;
    }
    return 0;
  });
 
  const filteredProjects = sortedProjects.filter((project) =>
    project.PayrollPeriodsStartDate.toLowerCase().includes(searchQuery.toLowerCase())
  );
 
  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>Payroll Periods</h2>
            <button onClick={handleAddProjectClick}>
              Add Payrll Period
            </button>
          </div>
          <div className='cp-content'>
            <div className='cp-search'>
              <input
                className='cp-searchfield'
                type="text"
                placeholder="Search Payroll Period..."
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
                    <th>Payroll Periods Start Date</th>
                    <th>Payroll Periods End Date</th>
                    <th>Calender Name</th>
                    <th> Cut-off Dates</th>
                    <th> Processing Schedule</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.PayrollPeriodsStartDate}</td>
                      <td>{project.PayrollPeriodsEndDate}</td>
                      <td>{project.CalenderName}</td>
                      <td>{project.CuttoffDate}</td>
                      <td>{project.ProcessingSchedule}</td>
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
      {/* Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className='pop-heading'>
             <img src={icon1} alt='' />
              <h2>{editingIndex !== null ? 'Edit Payroll Period' : 'Add Payroll Period'}</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="PayrollPeriodsStartDate">  Payroll Periods Start Date:</label>
                <input
                  type="date"
                  id="PayrollPeriodsStartDate"
                  name="PayrollPeriodsStartDate"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].PayrollPeriodsStartDate : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="PayrollPeriodsEndDate">Payroll Periods End Date:</label>
                <input
                  type="date"
                  id="PayrollPeriodsEndDate"
                  name="PayrollPeriodsEndDate"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].PayrollPeriodsEndDate : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="CalenderName">Calender Name:</label>
                <select
                  type="text"
                  id="CalenderName"
                  name="CalenderName"
                  required
                  defaultValue={
                    editingIndex !== null ? filteredProjects[editingIndex].CalenderName : ''
                  }
>
                          <option value="option1">Abidi Bi-Weekly Payroll</option>
                          <option value="option2">Abidi Weekly Payroll</option>
                          <option value="option3">Abidi Bi-Monthly Payroll</option>
                          <option value="option3">Abidi Monthly Payroll</option>
 
                      </select>              </div>
              <div className="form-group">
                <label htmlFor="CuttoffDate">Cuttoff Date:</label>
                <input
                  type="date"
                  id="CuttoffDate"
                  name="CuttoffDate"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].CuttoffDate : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="ProcessingSchedule">Processing Schedule:</label>
                <select
                  type="text"
                  id="ProcessingSchedule"
                  name="ProcessingSchedule"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].ProcessingSchedule : ''}
>
                          <option value="option1"> Verfiy Timecards and bonuses: March 1,2024</option>
                          <option value="option2">Calculate wages: March 2, 2024</option>
                          <option value="option3">Process payments: March 3,2024</option>
                          <option value="option3">Distribute pay stubs: March 4, 2024</option>
 
                      </select>              </div>
              <button type="submit">
                {editingIndex !== null ? 'Save Changes' : 'Add Payroll Period'}
              </button>
              <button onClick={handlePopupClose} className='close-but'>Cancel</button>
 
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default CreateCalender;