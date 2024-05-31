import React, { useEffect, useState } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import axios from 'axios';
import '../../Home/home.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
 
const HomePage = ({ children }) => {
  const [documents, setDocuments] = useState([]);
  const navigate = useNavigate();

  async function fetchDocuments(){
    try{
        const response = await axios.get('http://localhost:3000/api/documents');
        console.log(response.data);
        setDocuments(response.data);
      }catch(error){
        console.log(error);
    }
  }

  useEffect(() => {
    fetchDocuments();
  }, []);
 
  return (
 
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content" style={{fontFamily:"Poppins"}}>
        <h1>View Documents</h1>
        <table>
        <thead>
          <tr>
            <th>S.No</th>
            <th>File</th>
            <th>Provider</th>
            <th>Saved Date</th>
          </tr>
        </thead>
        <tbody>
          {documents.map((data, i) => 
            <tr key={i} onClick={() => (window.open(`http://localhost:3000/${data.path}`, '_blank'))} style={{ cursor: 'pointer' }}>
              <td>{i+1}</td>
              <td>{data.filename}</td>
              <td>{data.sentBy}</td>
              <td>{data.dated.slice(0, 10)}</td>
            </tr>
          )}
        </tbody>
      </table>
          </div>
      </div>
    </div>
  );
};
 
export default HomePage;