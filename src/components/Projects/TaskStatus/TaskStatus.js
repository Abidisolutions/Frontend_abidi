import React, { useEffect, useState } from 'react';
import axios from 'axios';

import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../TaskStatus/TaskStatus.css';
import Select from 'react-select';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TaskStatus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [projects, setProjects] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [currentId, setId] = useState();

  useEffect(() => {
    fetchTasks();
    console.log(projects)
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/create-tasks', {
        params: {
          name: localStorage.getItem("name"),
        }
      });

      setProjects(response.data);
    } catch (error) {
      toast.error("Failed to fetch tasks");
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
  };

  const handleAddTaskClick = () => {
    setPopupOpen(true);
    setEditingProject(null);
  };

  const handleEditClick = (project, id) => {
    setId(id);
    setEditingProject(project);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setEditingProject(null);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      taskAssinge: e.target.taskassinge.value,
      completionTime: e.target.completiontime.value,
      date: e.target.date.value,
      taskpriority: e.target.taskpriority.value,
    };


    try {
      if (editingProject) {
        await axios.put(`https://123abcd-abidi_pro.mdbgo.io/api/assigned-tasks/${editingProject._id}`, formData);
        toast.success("Task updated successfully");
      } else {
        await axios.post('https://123abcd-abidi_pro.mdbgo.io/api/assigned-tasks', formData);
        toast.success("Task created successfully");
      }
      fetchTasks();
      setPopupOpen(false);
      setEditingProject(null);
    } catch (error) {
      toast.error("Failed to save the task");
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortingOption === 'sortby') {
      return 0;
    } else if (sortingOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortingOption === 'date') {
      return new Date(a.date) - new Date(b.date);
    }
    return 0;
  });



  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>Task Status</h2>
            <button onClick={handleAddTaskClick}>Add Task</button>
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
                  <option value="date">Date</option>
                </select>
              </div>
            </div>
            <div className='cp-list'>
              <table>
                <thead>
                  <tr>
                    <th>Projec Name</th>
                    <th>Task Name</th>
                    <th>Task Description</th>
                    <th>Assigned To</th>
                    <th>assigned By</th>
                    <th>Start Date</th>
                    <th>End Date</th>
                    <th>Options</th>
                  </tr>
                </thead>

                <tbody>
                  {
                    projects.map((task) => {
                      return (
                        <tr key={task._id}>
                          <td>{task.projectName}</td>
                          <td>{task.taskName}</td>
                          <td>{task.textDescription}</td>
                          <td>{task.assignedTo}</td>
                          <td>{task.assignedBy}</td>
                          <td>{task.startDate.slice(0, 10)}</td>
                          <td>{task.endDate.slice(0, 10)}</td>
                          <td className='twobuttons'>
                            <button onClick={() => handleEditClick(task, task._id)}>Edit</button>
                            <button >Delete</button> 
                          </td>
                        </tr>
                      )
                    })
                  }

                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editingProject ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="name">PROJECT NAME:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  defaultValue={editingProject ? editingProject.name : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskassinge">Task Name:</label>
                <input
                  type="text"
                  id="taskassinge"
                  name="taskassinge"
                  required
                  defaultValue={editingProject ? editingProject.taskAssinge : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="completiontime">Completion Time:</label>
                <input
                  type="text"
                  id="completiontime"
                  name="completiontime"
                  required
                  defaultValue={editingProject ? editingProject.completionTime : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  defaultValue={editingProject ? editingProject.date : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="taskpriority">Task Priority:</label>
                <input
                  type="text"
                  id="taskpriority"
                  name="taskpriority"
                  required
                  defaultValue={editingProject ? editingProject.taskpriority : ''}
                />
              </div>
              <button type="submit">{editingProject ? 'Save Changes' : 'Submit'}</button>
              <button onClick={handlePopupClose} type="button" className='close-but'>Cancel</button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default TaskStatus;
