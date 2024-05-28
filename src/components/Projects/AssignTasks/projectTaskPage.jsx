import React, { useState, useEffect } from "react";
import TopMenuBar from "../../Topmenu/TopMenuBar";
import SideBar from "../../Sidebar/SideBar";
import "../AssignTasks/AssignTasks.css";
import Select from "react-select";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const ProjectTaskPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [taskName, setTaskName] = useState();
  const [sortingOption, setSortingOption] = useState("sortby");
  const [projects, setProjects] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [selectedAssignedTo, setSelectedAssignedTo] = useState(null);
  const [startDate, setstartDate] = useState();
  const [endDate, setendDate] = useState()
  const [selectedAssignedBy, setSelectedAssignedBy] = useState([]);
  const [createdProject, setcreatedProject] = useState([]);
  const { projectName } = useParams("projectName");
  const [currentUser, setcurrentUser] = useState(localStorage.getItem("name"));
  const [taskDesc, setTaskDesc] = useState('');
  const [Users, setUsers] = useState();
  
  const handleTaskDescChange = (event) => {
    const { value } = event.target;
    setTaskDesc(value);
  };

  const handleTaskNameChange = (event) => {
    const { value } = event.target;
    setTaskName(value);
  };

  // const getCreatedProjects = async () => {
  //   let currentUser = localStorage.getItem("name");
  //   try {
  //     const response = await axios.get(
  //       "http://localhost:8000/api/project/created",
  //       {
  //         params: {
  //           name: currentUser,
  //         },
  //       }
  //     );
  //     console.log(response.data);
  //     setcreatedProject(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch projects:", error);
  //   }
  // };

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
  
    console.log(projectName);
  }, []);

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

  // const fetchTasks = async () => {
  //   try {
  //     const response = await axios.get("/api/tasks");
  //     setProjects(response.data);
  //   } catch (error) {
  //     console.error("Failed to fetch tasks:", error);
  //     toast.error("Failed to fetch tasks");
  //   }
  // };

  const handleSearchChange = (e) => setSearchQuery(e.target.value);

  const handleSortingChange = (e) => setSortingOption(e.target.value);

  const handleAddTaskClick = () => {
    setPopupOpen(true);
    setEditingIndex(null);
    setSelectedAssignedTo(null);
    setSelectedAssignedBy([]);
  };

  const handlestartDateChange = (event) => {
    const { value } = event.target;
    setstartDate(value);
  };

  
  const handleendDateChange = (event) => {
    const { value } = event.target;
    setendDate(value);
  };


  const handleEditClick = (index) => {
    setEditingIndex(index);
    setPopupOpen(true);
    // Pre-fill form with existing task data
    const task = projects[index];
    setSelectedAssignedTo({ value: task.assignedTo, label: task.assignedTo });
    // Assuming 'assignedBy' is a comma-separated string
    setSelectedAssignedBy(
      task.assignedBy.split(",").map((name) => ({ value: name, label: name }))
    );
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setEditingIndex(null);
  };

  const handleAssignedToChange = (selectedOption) =>
    setSelectedAssignedTo(selectedOption);

  const handleAssignedByChange = (selectedOptions) => {
    // Ensure selectedOptions is always treated as an array
    setSelectedAssignedBy(
      selectedOptions
    );
  };
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      projectName: e.target.projectName.value,
      taskName: e.target.taskName.value,
      assignedTo: selectedAssignedTo ? selectedAssignedTo.value : "",
      assignedBy: selectedAssignedBy
        ? selectedAssignedBy.map((opt) => opt.value).join(", ")
        : "",
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
        toast.success("Task updated successfully");
      } else {
        const response = await axios.post(
          "http://localhost:8000/api/assign-tasks",
          formData
        );
        setProjects([
          ...projects,
          { ...formData, _id: response.data.project._id },
        ]);
        toast.success("Task added successfully");
      }
    } catch (error) {
      console.error(
        "Error processing project:",
        error.response ? error.response.data : error.message
      );
      toast.error(
        `Error processing project: ${
          error.response ? error.response.data.message : "Unknown error"
        }`
      );
    }

    setPopupOpen(false);
    setEditingIndex(null);
  };

  const sortedProjects = [...projects].sort((a, b) => {
    if (sortingOption === "sortby") {
      return 0;
    } else if (sortingOption === "name") {
      return a.projectName.localeCompare(b.projectName);
    } else if (sortingOption === "id") {
      // Assuming tasks have a unique 'id' or '_id' property
      return (a._id || a.id).localeCompare(b._id || b.id);
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter((project) =>
    project.projectName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const saveAssignTask = async()=>{
    const formData = {
      projectName: projectName,
      taskName: taskName,
      assignedTo: selectedAssignedTo.label,
      assignedBy: selectedAssignedBy.label,
      startDate: startDate,
      endDate: endDate,
      textDescription: taskDesc,
    };
    console.log(formData);
    try{
      await axios.post("http://localhost:8000/api/create-tasks",formData);
      alert("Task Assigned Successfully");
      await axios.get('http://localhost:8000/api/task/mail', {
        params: {
          personalEmail: "maazali1611@gmail.com",
          textDescription: formData.textDescription,
          startDate: formData.startDate,
          endDate:formData.endDate,
          assignedBy:formData.assignedBy,
          projectName: formData.projectName,
        }
      }).then(() => console.log("email sent!"));
    }catch(err){
      alert("Something went wrong",err);
    }
    
  }

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div id="form-cont">
          <h1
            style={{
              textAlign: "center",
              textTransform: "capitalize",
              color: "#978d03",
              fontSize: "40px",
            }}
          >
            {projectName}
          </h1>
            <h3>Assign Task to Team</h3>
            <div id="form-row">
              <div className="formitem">
                <label htmlFor="taskName">Task Name:</label>
                <input
                  type="text"
                  id="taskName"
                  name="taskName"
                  value={taskName} // Bind the value to the state
                  onChange={handleTaskNameChange} // 
                  required
                  defaultValue={
                    editingIndex !== null
                      ? filteredProjects[editingIndex].taskName
                      : ""
                  }
                />
              </div>
              
              <div className="formitem">
                <label htmlFor="assignedTo">Assigned To:</label>
                <Select 
                  value={selectedAssignedTo}
                  onChange={handleAssignedToChange}
                  options={Users?.map(user => ({ value: user, label: user }))}
                  styles={customStyles}
                />
              </div>
              <div className="formitem">
              <label htmlFor="assignedBy">Assigned By:</label>
              <Select
                value={selectedAssignedBy}
                onChange={handleAssignedByChange}
                options={[{ value: `${currentUser}`, label: `${currentUser}` }]}
                styles={customStyles}
              />
              </div>
            </div>
          <div id="form-row">
            <div className="form-desc">
            <label htmlFor="taskDesc">Task Description:</label>
                <textarea
                  name="taskDesc"
                  id="taskDesc"
                  maxLength={200}
                  value={taskDesc}  
                  onChange={handleTaskDescChange} 
                ></textarea>
            </div>
         
            </div>
            <div id="form-row-assigntask">
              <div className="formitem">
                <label htmlFor="startDate">Start Date:</label>
                <input
                  type="date"
                  id="startDate"
                  name="startDate"
                  required
                  value={startDate}  
                  onChange={handlestartDateChange} 
                  defaultValue={
                    editingIndex !== null
                      ? filteredProjects[editingIndex].startDate
                      : ""
                  }
                />
              </div>
              
              <div className="formitem">
              <label htmlFor="endDate">End Date:</label>
                <input
                  type="date"
                  id="endDate"
                  name="endDate"
                  required
                  value={endDate}  
                  onChange={handleendDateChange} 
                  defaultValue={
                    editingIndex !== null
                      ? filteredProjects[editingIndex].endDate
                      : ""
                  }
                />
              </div>
              <div id="formbutt">
              <button className="formbutton" onClick={saveAssignTask}>
              {editingIndex !== null ? "Save Changes" : "Assign Task"}
            </button>
              </div>
            </div>
       
           
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectTaskPage;
