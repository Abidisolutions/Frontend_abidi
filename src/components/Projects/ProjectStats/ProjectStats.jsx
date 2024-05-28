import React,{useEffect, useState} from "react";
import TopMenuBar from "../../Topmenu/TopMenuBar";
import SideBar from "../../Sidebar/SideBar";
import "../ProjectStats/ProjectStats.css";
import axios from "axios";
import { Link } from "react-router-dom";

const ProjectStats = () => {
  const [completedTasks, setcompletedTasks] = useState();
  const [reviewTasks, setreviewTasks,] = useState();
  const [progressTasks, setprogressTasks] = useState();

  useEffect(()=>{
    async function getCompletedTasks(){
      try{
        const res = await axios.get("http://localhost:8000/api/tasks/completed",{params:{
        name: localStorage.getItem("name")
      }});
      console.log(res.data);
      setcompletedTasks(res.data);
      }catch(e){
        console.log("Error Occured",e);
      }
      
    }
    async function getReviewTasks(){
      try{
        const res = await axios.get("http://localhost:8000/api/tasks/review",{params:{
          name: localStorage.getItem("name")
        }});
        console.log(res.data);
        setreviewTasks(res.data);

      }catch(e){
        console.log("Error Occured",e);
      }
     
    }
    async function getProgressTasks(){
      try{
        const res = await axios.get("http://localhost:8000/api/tasks/in-progress",{params:{
        name: localStorage.getItem("name")
      }});
      console.log(res.data);
      
      setprogressTasks(res.data);
      }catch(e){
        console.log("Error Occured",e);
      }
      
    }
    getCompletedTasks();
    getProgressTasks();
    getReviewTasks();
  },[])
  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
        <div className="statuscards">
        <div class="card">
            <div class="content">
              <p class="date">{Date(Date.now()).toString().slice(0,25)}</p>
              <h1 class="title">In  Progress</h1>
              <ol class="task-list">
              {progressTasks?.map((task)=><li>{task.taskName}</li>)}
              </ol>
              <Link to="/MyTasks" class="button">
                Check Tasks
              </Link>
            </div>
          </div>
          <div class="card">
            <div class="content">
              <p class="date">{Date(Date.now()).toString().slice(0,25)}</p>
              <h1 class="title">Review / Testing</h1>
              <ol class="task-list">
              {reviewTasks?.map((task)=><li>{task.taskName}</li>)}
              </ol>
              <Link to="/MyTasks" class="button">
                Check Tasks
              </Link>
            </div>
          </div>
          <div class="card">
            <div class="content">
              <p class="date">{Date(Date.now()).toString().slice(0,25)}</p>
              <h1 class="title">Completed</h1>
              <ol class="task-list">
                {completedTasks?.map((task)=><li>{task.taskName}</li>)}
                </ol>
              <Link to="/MyTasks" class="button">
                Check Tasks
              </Link>
            </div>
          </div>
        </div>
      
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;
