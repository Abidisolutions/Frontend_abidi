import React, { useState, useEffect } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../../Invoice/ViewOneInvoice/View.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import icon1 from '../../../images/01__1_-removebg-preview (1).png';
import { useParams } from 'react-router-dom';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
 
 
const ViewOne = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [Invoices, setInvoices] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  let navigate = useNavigate();
  let {id} = useParams();
 
   useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get(`http://localhost:8000/api/viewOne-invoices/`, { params: { _id: id } });
      setInvoices(response.data[0]);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };
 
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
 
  const handleEditClick = (index) => {
    setEditingIndex(index);
    setPopupOpen(true);
  };
 
  const handlePopupClose = () => {
    setPopupOpen(false);
    setEditingIndex(null);
  };
 
  const handleDownloadInvoice = () => {
    setTimeout(() => {
      const input = document.getElementById('invoice');
      if (input) {
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL('image/png');
          const pdf = new jsPDF('portrait', 'pt', 'a4');
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = pdf.internal.pageSize.getHeight();
 
          const imgWidth = pdfWidth;
          const imgHeight = (canvas.height * pdfWidth) / canvas.width;
 
          pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
          pdf.save(`invoice_${Invoices.invoiceNumber}.pdf`);
        }).catch(error => {
          console.error("Error capturing invoice:", error);
        });
      } else {
        console.error("Invoice element not found");
      }
    }, 1000);
  };
 
 
  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div id="invoice" className="main-content">
        <div className='headerbox'>
        <div className='inv-header'>
            <p>Invoice #{Invoices.invoiceNumber}</p>

          <button onClick={handleDownloadInvoice}>
              Download Invoice
            </button>
          </div>
        </div>
      
          <div id="invoice" className='cp-content'>
        <div className='inv-box'>
          
          <div className='inv-items'>
        <h2 style={{ color: 'rgb(151, 141, 3)', marginRight: '10px' }}>Client Information</h2>
        {/* <img src={clientIcon} alt="Client Icon" style={{ width: '30px', height: '30px' }} /> */}
 
      {/* Client Name */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Client Name:</label>
        <p>{Invoices.clientName}</p>
      </div>
 
      {/* Client Company Name */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Client Company Name:</label>
        <p>{Invoices.clientCompany}</p>
      </div>
 
      {/* Client Address */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Client Address:</label>
        <p>{Invoices.clientAddress}</p>
      </div>
 
      {/* Client Phone Number */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Client Phone Number:</label>
        <p>{Invoices.clientPhone}</p>
      </div>
 
      {/* Client Email Address */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Client Email Address:</label>
        <p>{Invoices.clientEmail}</p>
      </div>
          </div>
          <div className='inv-items'>
        <h2 style={{ color: 'rgb(151, 141, 3)', marginRight: '10px' }}>Company Information</h2>
        {/* <img src={officeIcon} alt="Office Icon" style={{ width: '30px', height: '30px' }} /> */}
 
      {/* Company Name */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Company Name:</label>
        <p>{Invoices.companyName}</p>
      </div>
 
      {/* Company Address */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Company Address:</label>
        <p>{Invoices.companyAddress}</p>
      </div>
 
      {/* Company Phone Number */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Company Phone Number:</label>
        <p>{Invoices.companyPhone}</p>
      </div>
 
      {/* Company Email Address */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Company Email Address:</label>
        <p>{Invoices.companyEmail}</p>
      </div>
 
      {/* Company Website */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Company Website:</label>
        <p>{Invoices.companyWebsite}</p>
      </div>
          </div>
          <div className='inv-items'>
          <h2 style={{ color: 'rgb(151, 141, 3)', marginRight: '10px' }}>Invoice Information</h2>
          <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Invoice Number:</label>
        <p>{Invoices.invoiceNumber}</p>
      </div>
 
      {/* Account ID/Number */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Account ID/Number:</label>
        <p>{Invoices.bankid}</p>
      </div>
 
      {/* Payment Terms */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Payment Terms:</label>
        <p>{Invoices.paymentTerms}</p>
      </div>
 
      {/* Invoice Amount */}
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontWeight: 'bold' }}>Invoice Amount:</label>
        <p>{Invoices.totalAmount}</p>
      </div>
 
          </div>
        </div>
      
  
      
           
          </div>
        </div>
      </div>
    </div>
  );
};
 
export default ViewOne;