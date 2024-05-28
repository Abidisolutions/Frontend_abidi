import React, { useState, useEffect } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../../Invoice/ViewInvoice/View.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import GridView from '../ViewInvoice/gridview';
import ListView from '../ViewInvoice/listview';


const View = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [invoices, setInvoices] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // State variable for view mode
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/view-invoices');
      setInvoices(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
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

  const filteredInvoices = invoices.filter((invoice) =>
    invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.clientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    invoice.date.slice(0, 10).includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>View Invoice</h2>
        
          </div>
          <div className='cp-content'>
            <div className='cp-search'>
              <input
                className='cp-searchfield'
                type="text"
                placeholder="Search Invoice..."
                value={searchQuery}
                onChange={handleSearchChange}
              />
                  <div className='view-toggle'>
              <label>
                <input
                  type="radio"
                  value="grid"
                  checked={viewMode === 'grid'}
                  onChange={() => setViewMode('grid')}
                />
                Grid View
              </label>
              <label>
                <input
                  type="radio"
                  value="list"
                  checked={viewMode === 'list'}
                  onChange={() => setViewMode('list')}
                />
                List View
              </label>
            </div>
            </div>
            <div className="view-container">
              {viewMode === 'grid' ? (
                <GridView invoices={filteredInvoices} navigate={navigate} />
              ) : (
                <ListView invoices={filteredInvoices} navigate={navigate} />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default View;
