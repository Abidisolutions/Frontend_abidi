import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../TimeoffReq/TimeoffReq.css';
import icon1 from '../../../images/01__1_-removebg-preview (1).png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TimeoffApp = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [projects, setProjects] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/timeoff');
        setProjects(data);
      } catch (error) {
        console.error('Error fetching data: ', error);
      }
    };
    fetchData();
  }, []);

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

  const handleApprove = async (index,reason,off_date,end_date,email,name) => {
    setEditingIndex(index);
    try{
      const res = await axios.post("https://123abcd-abidi_pro.mdbgo.io/api/timeoff/approve",{
        id:index
      });
      toast.success(res.data.message);
      window.location.reload();
      const res_two = await axios.get("https://123abcd-abidi_pro.mdbgo.io/api/timeoff/mail",{ params:{
        id:index,
        reason:reason,
        off_date:off_date,
        end_date:end_date,
        email:email,
        name:name
       }
      });
    }catch(e){
      console.log(e);
    }
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setEditingIndex(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      Type_of_Time_Off: e.target.Type_of_Time_Off.value,
      Reason_for_Time_Off: e.target.Reason_for_Time_Off.value,
      To: e.target.To.value,
      From: e.target.From.value,
    };

    try {
      if (editingIndex !== null) {
        const updatedProject = await axios.put(`https://123abcd-abidi_pro.mdbgo.io/api/timeoff/${projects[editingIndex]._id}`, formData);
        const updatedProjects = [...projects];
        updatedProjects[editingIndex] = updatedProject.data;
        setProjects(updatedProjects);
      } else {
        const newProject = await axios.post('https://123abcd-abidi_pro.mdbgo.io/api/timeoff', formData);
        setProjects([...projects, newProject.data]);
      }
      setPopupOpen(false);
      setEditingIndex(null);
      e.target.reset();
    } catch (error) {
      console.error('Error submitting form: ', error);
    }
  };

  const sortedProjects = projects.sort((a, b) => {
    if (sortingOption === 'name') {
      return a.Type_of_Time_Off.localeCompare(b.Type_of_Time_Off);
    } else if (sortingOption === 'id' && a._id && b._id) {
      return a._id.localeCompare(b._id);
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter((project) =>
    project.Type_of_Time_Off.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>Time off Approval</h2>
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
                    <th>Type of Time-Off</th>
                    <th>Reason for Time-Off</th>
                    <th>From</th>
                    <th>To</th>
                    <th>Approved</th>
                    <th>Action</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.Type_of_Time_Off}</td>
                      <td>{project.Reason_for_Time_Off}</td>
                      <td>{project.To}</td>
                      <td>{project.From}</td>
                      <td style={{textAlign:"center"}}>{project.Approved? "Approved":"X"}</td>
                      <td>
                        <button disabled={project.Approved} onClick={() => handleApprove(project._id,project.Reason_for_Time_Off,project.To,project.From,project.Email,project.Name)} style={{backgroundColor: project.Approved? "#919191":"#1dd1a1",color: project.Approved? "#FFFFFF":"#FFFFFF"}}>Approve</button>
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
              <h2>{editingIndex !== null ? 'Submit Time of Request' : 'Add Time Off Request'}</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="Type_of_Time_Off">Type of Time Off:</label>
                <input
                  type="text"
                  id="Type_of_Time_Off"
                  name="Type_of_Time_Off"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].Type_of_Time_Off : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="Reason_for_Time_Off">Reason for Time Off:</label>
                <input
                  type="text"
                  id="Reason_for_Time_Off"
                  name="Reason_for_Time_Off"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].Reason_for_Time_Off : ''}
                />
              </div>
            
              <div className="form-group">
                <label htmlFor="To"> To:</label>
                <input
                  type="date"
                  id="To"
                  name="To"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].To : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="From">From:</label>
                <input
                  type="date"
                  id="From"
                  name="From"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].From : ''}
                />
              </div>
              <button type="submit">
                {editingIndex !== null ? 'Save Changes' : 'Add Time off Request'}
              </button>
              <button onClick={handlePopupClose} className='close-but'>Cancel</button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TimeoffApp;
