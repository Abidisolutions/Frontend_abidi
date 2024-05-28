
import React from 'react';
import SideBar from '../../Sidebar/SideBar';
import TopMenuBar from '../../Topmenu/TopMenuBar';
const ReportingAndAnalysis = () => {
    return (
        <div className="home-page">
          <TopMenuBar />
          <div className="content-container">
            <SideBar />
            <div className="main-content">
              <h2>Reporting And Analysis</h2>
              <p>This is some placeholder content for the home page.</p>
              {/* You can add more content here */}
            </div>
          </div>
        </div>
      );
};

export default   ReportingAndAnalysis ;
