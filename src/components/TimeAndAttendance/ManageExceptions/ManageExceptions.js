import React, { useState , useEffect} from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../../TimeAndAttendance/ManageExceptions/ManageException.css';
import icon1 from '../../../images/01__1_-removebg-preview (1).png'
import axios from 'axios';

const ManageException = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [data, setdata] = useState([]);
  const [projects, setProjects] = useState([
    {
      Type_of_Exception: 'Late arrival',
      Employee_ID: '0',
      Date: '2022-01-01',
      Time: '5:00am',
      Reason_For_exception: 'tarffic',
    },
    {
      Type_of_Exception: 'Late arrival',
      Employee_ID: '1',
      Date: '2022-01-01',
      Time: '5:00am',
      Reason_For_exception: 'tarffic',
    },
    {
      Type_of_Exception: 'Late arrival',
      Employee_ID: '2',
      Date: '2022-01-01',
      Time: '5:00am',
      Reason_For_exception: 'tarffic',
    },
    {
      Type_of_Exception: 'Late arrival',
      Employee_ID: '3',
      Date: '2022-01-01',
      Time: '5:00am',
      Reason_For_exception: 'tarffic',
    },
    // Add more hardcoded entries as needed
  ]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  async function fetching(){
    let year = new Date();
    let res = await axios.get(`https://date.nager.at/api/v3/publicholidays/${year.getFullYear()}/US`);
    setdata(res.data);
  }

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
      Type_of_Exception: e.target.Type_of_Exception.value || '',
      Employee_ID: e.target.Employee_ID.value || '',
      Date: e.target.Date.value || '',
      Time: e.target.Time.value || '',
      Reason_For_exception: e.target.Reason_For_exception.value || '',
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
      return a.Type_of_Exception.localeCompare(b.Type_of_Exception);
    } else if (sortingOption === 'id') {
      return a.id - b.id;
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter((project) =>
    project.Type_of_Exception.toLowerCase().includes(searchQuery.toLowerCase())
  );
  useEffect(()=>{
    fetching();
  },[])

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>Holidays Exceptions</h2>
            <button onClick={handleAddProjectClick}>
              Add
            </button>
          </div>
          <div className='cp-content'>
            <div className='cp-search'>
              <input
                className='cp-searchfield'
                type="text"
                placeholder="Search projects..."
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
                    <th>S.NO</th>
                    <th>Holiday Name</th>
                    <th>Date</th>
                    <th>Country</th>
                    <th>TYPE</th>
                  </tr>
                </thead>

                <tbody>
                  {data.map((data,index) => (
                    
                    <tr key={index}>
                      <td style={{textAlign:"center"}}>{index+1}</td>
                      <td>{data.name}</td>
                      <td>{data.date}</td>
                      <td>{data.countryCode}</td>
                      <td>{data.types[0]}</td>
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
              <h2>{editingIndex !== null ? 'Submit Manage Exception' : 'Add Exception'}</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="Type_of_Exception">Type of Exception:</label>
                <input
                  type="text"
                  id="Type_of_Exception"
                  name="Type_of_Exception"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].Type_of_Exception : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Employee_ID">Employee ID</label>
                <input
                  type="text"
                  id="Employee_ID"
                  name="Employee_ID"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].Employee_ID : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Date">Date:</label>
                <input
                  type="date"
                  id="Date"
                  name="Date"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].Date : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Time">Time:</label>
                <input
                  type="time"
                  id="Time"
                  name="Time"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].Time : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Reason_For_exception">Reason For Exception:</label>
                <input
                  type="text"
                  id="Reason_For_exception"
                  name="Reason_For_exception"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].Reason_For_exception : ''}
                />
              </div>
              <button type="submit">
                {editingIndex !== null ? 'Save Changes' : 'Add Exception'}
              </button>
              <button onClick={handlePopupClose} className='close-but'>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageException;
