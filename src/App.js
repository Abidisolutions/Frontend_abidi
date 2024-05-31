import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './components/Home/HomePage.js'; // import Page1 from './components/Page1';
import Clockin_out from './components/TimeAndAttendance/Clockin_out/Clockin_out.js'
import RecordWorkingHours from './components/TimeAndAttendance/RecordWorkingHours/RecordWorkingHours.js'
import TimeoffReq from './components/TimeAndAttendance/TimeoffReq/TimeoffReq.js'
import ManageExceptions from './components/TimeAndAttendance/ManageExceptions/ManageExceptions.js'
import ReportingAndAnalysis from './components/TimeAndAttendance/ReportingAndAnalysis/ReportingAndAnalysis.js'
import CreateProject from './components/Projects/CreateProject/CreateProject.js'
import AssignTasks from './components/Projects/AssignTasks/AssignTasks.js'
import EarningAndDeductions from './components/Payroll/EarningAndDeductions/EarningAndDeductions.js'
import EmployeeInfo from './components/Payroll/EmployeeInfo/EmployeeInfo.js'
import CreateInvoice from './components/Invoice/CreateInvoice/CreateInvoice.js'
import SalaryStructure from './components/Payroll/SalaryStructure/SalaryStructure.js'
import TaskStatus from './components/Projects/TaskStatus/TaskStatus.js'
import Login from './components/Login/login.js'
import CreateUser from './components/create_user/CreateUser.js'
import View from './components/Invoice/ViewInvoice/ViewInvoice.js'
import PaymentStatus from './components/Invoice/PaymentStatus/PaymentStatus.js'
import CreateCalender from './components/Payroll/CreateCalender/CreateCalender.js'
import Tasks from './components/statistics/Tasks.jsx';
import Menu from './components/statistics/Menu.jsx';
import HourBar from './components/statistics/hour.jsx';
import ProjectTaskPage from './components/Projects/AssignTasks/projectTaskPage.jsx';
import MyTasks from './components/Projects/MyTasks/MyTasks.js';
import Account from './components/my_account/account.jsx';
import AllUsers from './components/AllUsers/allusers.jsx'
import ProjectStats from './components/Projects/ProjectStats/ProjectStats.jsx'
import TimeoffApp from './components/TimeAndAttendance/TimeoffApproval/TimeoffApp.js';
import ViewOne from './components/Invoice/ViewOneInvoice/ViewInvoice.js';
import Doc from './components/Documents/doc.jsx';
import DocView from './components/Documents/docView/docView.jsx';

// import Page2 from './components/Page2';
// Import other page components as needed
// import SettingsPage from './components/SettingsPage';

const App = () => {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="HomePage" element={<HomePage />} />
      <Route path="Clockin_out" element={<Clockin_out />} />
      <Route path="RecordWorkingHours" element={<RecordWorkingHours />} />
      <Route path="TimeoffReq" element={<TimeoffReq />} />
      <Route path="ManageExceptions" element={<ManageExceptions />} />
      <Route path="ReportingAndAnalysis" element={<ReportingAndAnalysis />} />
      <Route path="CreateProject" element={<CreateProject />} />
      <Route path="AssignTasks" element={<AssignTasks />} />
      <Route path="EarningAndDeductions" element={<EarningAndDeductions />} />
      <Route path="CreateInvoice" element={<CreateInvoice />} />
      <Route path="EmployeeInfo" element={<EmployeeInfo />} />
      <Route path="SalaryStructure" element={<SalaryStructure />} />
      <Route path="TaskStatus" element={<TaskStatus />} />
      <Route path="CreateUser" element={<CreateUser />} />
      <Route path="ViewInvoice" element={<View />} />
      <Route path="PaymentStatus" element={<PaymentStatus />} />
      <Route path="CreateCalender" element={<CreateCalender />} />
      <Route path="stats" element={<Menu />} />
      <Route path="stats/task" element={<Tasks />} />
      <Route path="stats/hour" element={<HourBar />} />
      <Route path="project/:projectName" element={<ProjectTaskPage />} />
      <Route path="/MyTasks" element={<MyTasks />} />
      <Route path="/myAccount" element = {<Account/>}/>
      <Route path="/AllUsers" element = {<AllUsers/>}/>
      <Route path="/projectstats" element = {<ProjectStats/>}/>
      <Route path="/timeoff-app" element = {<TimeoffApp/>}/>
      <Route path="/ViewInvoice/:id" element = {<ViewOne/>}/>
      <Route path="/docUpload" element = {<Doc/>}/>
      <Route path="/docView" element = {<DocView/>}/>

      {/* <Route path="/page1" element={<Page1 />} />
      <Route path="/page2" element={<Page2 />} />
      {/* Add routes for other pages as needed */}
      {/* <Route path="/settings" element={<SettingsPage />} /> */}
    </Routes>
    </Router>
  );
};

export default App;
