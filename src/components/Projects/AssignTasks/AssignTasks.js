import React, { useState, useEffect } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../AssignTasks/AssignTasks.css';
import Select from 'react-select';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';

const AssignTasks = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [projects, setProjects] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState(null);
  const [selectedAssignedBy, setSelectedAssignedBy] = useState([]);
  const [createdProject, setcreatedProject] = useState([]);



  const getCreatedProjects = async ()=>{
    let currentUser = localStorage.getItem("name");
    try {
      const response = await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/project/created',{
        params:{
          name:currentUser,
        }
      });
      console.log(response.data);
      setcreatedProject(response.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  }

  useEffect(() => {
    
    getCreatedProjects();
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks');
      setProjects(response.data);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      toast.error('Failed to fetch tasks');
    }
  };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSortingChange = (e) => setSortingOption(e.target.value);

  const handleAddTaskClick = () => {
    setPopupOpen(true);
    setEditingIndex(null);
    setSelectedAssignedTo(null);
    setSelectedAssignedBy([]);
  };

  const handleEditClick = (index) => {
    setEditingIndex(index);
    setPopupOpen(true);
    // Pre-fill form with existing task data
    const task = projects[index];
    setSelectedAssignedTo({ value: task.assignedTo, label: task.assignedTo });
    // Assuming 'assignedBy' is a comma-separated string
    setSelectedAssignedBy(task.assignedBy.split(',').map(name => ({ value: name, label: name })));
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setEditingIndex(null);
  };

  const handleAssignedToChange = (selectedOption) => setSelectedAssignedTo(selectedOption);

  const handleAssignedByChange = (selectedOptions) => {
    // Ensure selectedOptions is always treated as an array
    setSelectedAssignedBy(Array.isArray(selectedOptions) ? selectedOptions : []);
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    

    const formData = {
      projectName: e.target.projectName.value,
      taskName: e.target.taskName.value,
      assignedTo: selectedAssignedTo ? selectedAssignedTo.value : '',
      assignedBy: selectedAssignedBy ? selectedAssignedBy.map(opt => opt.value).join(', ') : '',
      startDate: e.target.startDate.value,
      endDate: e.target.endDate.value,
    };
     

    try {
      if (editingIndex !== null) {
          const projectId = projects[editingIndex]._id; // Ensure each project has an _id property
          await axios.put(`http://localhost:8000/api/assign-tasks/`, formData);
          const updatedProjects = [...projects];
          updatedProjects[editingIndex] = { ...formData, _id: projectId };
          setProjects(updatedProjects);
          toast.success('Task updated successfully');
      } else {
          const response = await axios.post('https://123abcd-abidi_pro.mdbgo.io/api/assign-tasks', formData);
          setProjects([...projects, { ...formData, _id: response.data.project._id }]);
          toast.success('Task added successfully');
      }
    } catch (error) {
      console.error('Error processing project:', error.response ? error.response.data : error.message);
      toast.error(`Error processing project: ${error.response ? error.response.data.message : 'Unknown error'}`);
  }

  setPopupOpen(false);
  setEditingIndex(null);
};


  const sortedProjects = [...projects].sort((a, b) => {
    if (sortingOption === 'sortby') {
      return 0;
    } else if (sortingOption === 'name') {
      return a.projectName.localeCompare(b.projectName);
    } else if (sortingOption === 'id') {
      // Assuming tasks have a unique 'id' or '_id' property
      return (a._id || a.id).localeCompare(b._id || b.id);
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter(project =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>Assign Tasks</h2>
            <button onClick={handleAddTaskClick}>
              Assign Task
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
              {/* <table>
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Task Name</th>
                    <th>Assigned To</th>
                    <th>Assigned By</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {filteredProjects.map((project, index) => (
                    <tr key={index}>
                      <td>{project.projectName}</td>
                      <td>{project.taskName}</td>
                      <td>{project.assignedTo}</td>
                      <td>{project.assignedBy}</td>
                      <td>{project.startDate}</td>
                      <td>{project.endDate}</td>
                      <td>
                        <button onClick={() => handleEditClick(index)}>Edit</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> */}
              {
                createdProject.map((p)=>{
                  return(
                    <div className='gridcont'>
                    <div className='gridbox'>
                            <Link to={`/project/${p.projectName}`}>
                      <p>{p.projectName}</p>
                    </Link>
                    </div>
                    <div className='gridbox'>
                            <Link to={`/project/${p.projectName}`}>
                      <p>{p.projectName}</p>
                    </Link>
                    </div>
                    </div>
                  
                  )
                })
              }
              
              
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editingIndex !== null ? 'Edit Task' : 'Assign Task'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="projectName">Project Name:</label>
                <input
                  type="text"
                  id="projectName"
                  name="projectName"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].projectName : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskName">Task Name:</label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].taskName : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="assignedTo">Assigned To:</label>
                <Select
                  value={selectedAssignedTo}
                  onChange={handleAssignedToChange}
                  options={[
                    { value: 'najaf', label: 'Najaf Ali Tirmizi' },
                    { value: 'murtaza', label: 'Murtaza Mahmood' },
                    { value: 'maaz', label: 'Syed Maaz Ali' },
                    { value: 'amna', label: 'Amna Ajmal' },
                    { value: 'zeeshan', label: 'Zeeshan Afridi' },                   ]}
                />
              </div>
              <div className="form-group">
                <label htmlFor="assignedBy">Assigned By:</label>
                <Select
                  value={selectedAssignedBy}
                  onChange={handleAssignedByChange}
                  options={[
                    { value: 'summiyah', label: 'Summiyah Abbasi' },
                    { value: 'najaf', label: 'Najaf Ali Tirmizi' },
                  ]}
                />
              </div>
              <div className='dates-flex'>
                <div className="form-date">
                  <label htmlFor="startDate">Start Date:</label>
                  <input
                    type="date"
                    id="startDate"
                    name="startDate"
                    required
                    defaultValue={editingIndex !== null ? filteredProjects[editingIndex].startDate : ''}
                  />
                </div>
                <div className="form-date">
                  <label htmlFor="endDate">End Date:</label>
                  <input
                    type="date"
                    id="endDate"
                    name="endDate"
                    required
                    defaultValue={editingIndex !== null ? filteredProjects[editingIndex].endDate : ''}
                  />
                </div>
              </div>              
              <button type="submit">
                {editingIndex !== null ? 'Save Changes' : 'Assign Task'}
              </button>
              <button onClick={handlePopupClose} className='close-but'>Cancel</button>
            </form>
          </div>
        </div>
      )}
      
    </div>
  );
};

export default AssignTasks;
