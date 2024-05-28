import React, { useState, useEffect } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import axios from 'axios';
import '../CreateProject/CreateProject.css';
import icon1 from '../../../images/01__1_-removebg-preview (1).png';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const animatedComponents = makeAnimated();

const CreateProject = () => {
  const [projects, setProjects] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedLead, setSelectedLead] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState([]);
  const [searchQuery, setSearchQuery] = useState(''); // Define searchQuery state here
  const [sortingOption, setSortingOption] = useState(''); // Add this line to define sortingOption
  const [Users, setUsers] = useState([]);
  

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'white',
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isSelected ? 'lightgrey' : 'white',
      '&:hover': {
        backgroundColor: 'lightgray',
      },
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'black', // Here we change the placeholder text color to black
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'black',
    }),
    menu: provided => ({
      ...provided,
      maxHeight: '200px', // Adjust the maximum height as needed // Enable vertical scrolling
    }),

    // Add more custom styles if needed
  };
  const handleSortingChange = (e) => {
    setSortingOption(e.target.value); // This function updates sortingOption
  };


  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
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
const handleLeadChange = (selectedOption) => {
  setSelectedLead(selectedOption);
};


const handleMembersChange = (selectedOptions) => {
  setSelectedMembers(selectedOptions);
};

  const simulateEmailNotification = (formData) => {
    let leadEmail = '';
    const membersEmails = formData.assignedMembers.map((member) => {
      return `${member.toLowerCase().replace(/\s/g, '')}@abidisolutions.com`;
    });

    toast.info(`Project ${formData.projectName} assigned to ${leadEmail}.`);
    membersEmails.forEach((email) => {
      toast.info(`Project ${formData.projectName} assigned to ${email}.`);
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
        projectName: e.target.projectName.value,
        lead: selectedLead ? selectedLead.label : '',
        assignedMembers: selectedMembers.map((member) => member.label),
        startDate: e.target.startDate.value,
        endDate: e.target.endDate.value,
    };

    try {
        if (editingIndex !== null) {
            const projectId = projects[editingIndex]._id; // Ensure each project has an _id property
            await axios.put(`http://localhost:8000/api/projects/${projectId}`, formData);
            const updatedProjects = [...projects];
            updatedProjects[editingIndex] = { ...formData, _id: projectId };
            setProjects(updatedProjects);
            toast.success('Project updated successfully');
        } else {
            const response = await axios.post('http://localhost:8000/api/projects', formData);
            setProjects([...projects, { ...formData, _id: response.data.project._id }]);
            toast.success('Project added successfully');
        }
    } catch (error) {
        console.error('Error processing project:', error);
        toast.error('Error processing project');
    }

    setPopupOpen(false);
    setEditingIndex(null);
};


useEffect(() => {
  const getAllUsers = async()=>{
    try{
      const allUsers = await axios.get("http://localhost:8000/api/users/names");
      console.log(allUsers.data);
      setUsers(allUsers.data);
    }catch(e){
      console.log(e);
    }
  }

  getAllUsers();

  const fetchProjects = async () => {
    try {
      const response = await axios.get('http://localhost:8000/api/project/created',{params:{
        name: localStorage.getItem('name'),
      }});
      console.log(response.data);
      setProjects(response.data); // Assuming the back-end responds with an array of projects
    } catch (error) {
      console.error('Error fetching projects:', error);
      toast.error('Error fetching projects');
    }
  };

  fetchProjects();
}, []);



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
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>Projects</h2>
            <button onClick={handleAddProjectClick}>
              Add Project
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
        <th>Project Name</th>
        <th>Lead</th>
        <th>Assigned Members</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Action</th>
      </tr>
    </thead>
    <tbody>
      {filteredProjects.map((project, index) => (
        <tr key={project._id || index}>
          <td>{project.projectName}</td>
          <td>{project.lead}</td>
          <td>{
project.assignedMembers.join(', ')}</td>
<td>{new Date(project.startDate).toLocaleDateString()}</td>
<td>{new Date(project.endDate).toLocaleDateString()}</td>
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
            <div className='pop-heading'>
              <img src={icon1} alt='' />
              <h2>{editingIndex !== null ? 'Edit Project' : 'Add Project'}</h2>
            </div>
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
                <label htmlFor="lead">Lead:</label>
                <Select
                  value={selectedLead}
                  onChange={handleLeadChange}
                  styles={customStyles}
                  options={Users.map(user => ({ value: user, label: user }))}
                />
              </div>
              <div className="form-group">
                <label htmlFor="assignedMembers">Assigned Members:</label>
                <Select
                  isMulti
                  value={selectedMembers}
                  onChange={handleMembersChange}
                  styles={customStyles}
                  options={Users.map(user => ({ value: user, label: user }))}
                  components={animatedComponents}
                />
              </div>
              <div className="form-group">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].startDate : ''}
                />
              </div>
              <div className="form-group">
                <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  required
                  defaultValue={editingIndex !== null ? filteredProjects[editingIndex].endDate : ''}
                />
              </div>
              <button type="submit">
                {editingIndex !== null ? 'Save Changes' : 'Add Project'}
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

export default CreateProject;
