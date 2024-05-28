import React, { useState, useEffect } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../CreateInvoice/CreateInvoice.css';
import Select from 'react-select';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CreateInvoice = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [projects, setProjects] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    fetchInvoices();
  }, []);

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/create-invoices');
      setProjects(response.data);
    } catch (error) {
      console.error('Error fetching invoices:', error);
      toast.error('Error fetching invoices');
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    
    const formData = {
      companyName: event.target.companyName.value,
      companyAddress: event.target.companyAddress.value,
      companyPhone: event.target.companyPhone.value,
      companyEmail: event.target.companyEmail.value,
      companyWebsite: event.target.companyWebsite.value,
      companyTin: event.target.companyTin.value,
      invoiceNumber: event.target.invoiceNumber.value,
      bankid: event.target.bankid.value,
      paymentTerms: event.target.paymentTerms.value,
      clientName: event.target.clientName.value,
      clientCompany: event.target.clientCompany.value,
      clientAddress: event.target.clientAddress.value,
      clientPhone: event.target.clientPhone.value,
      clientEmail: event.target.clientEmail.value,
      totalAmount: event.target.totalAmount.value,
      date: new Date().toISOString()
    };

    try {
      const response = await axios.post('https://123abcd-abidi_pro.mdbgo.io/api/invoices', formData); 
      console.log('Form submitted successfully:', response.data);
      toast.success("Invoice Created successfully");

    } catch (error) {
      console.error('Error submitting form:', error);
      toast.info("Kindly Fill all Fields Correctly");
    }
  };

  const sortedProjects = projects.sort((a, b) => {
    if (sortingOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortingOption === 'department') {
      return a.department.localeCompare(b.department);
    }
    return 0;
  });

  const filteredProjects = sortedProjects.filter((project) =>
    project.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="home-page">
      <TopMenuBar />
      <div className="content-container">
        <SideBar />
        <div className="main-content">
          <div className='cp-header'>
            <h2>Create Invoice</h2>
            <img src="invoice.png" alt="Invoice Icon" style={{width: '80px', height: '80px'}}></img>
          </div>
          <form  className='InvoiceForm' onSubmit={handleFormSubmit}>
          <div className="row">
          <div className="column">
            <span style={{marginBottom:"18px",marginTop:"18px"}}><h3 style={{color:"#E8C16E",display:'inline'}}>INVOICE INFORMATION</h3> <img alt="Invoice Icon" style={{display:'inline',width: '30px', height: '30px',marginLeft:8}} src='invoice-icon.png'></img></span>
            
              <label className='label' style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}  htmlFor="invoiceNumber">Invoice Number: *</label>
              <input type="text" style={{padding:7,borderRadius:5,width:"70%"}}  id="invoiceNumber" name="invoiceNumber"/><br/>              
              
              <label className='label' style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}  htmlFor="bankid">Account ID/Number: *</label>
              <input type="text" style={{padding:7,borderRadius:5,width:"70%"}}  id="bankid" name="bankid"/><br/>              

              <label htmlFor="paymentTerms" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Payment Terms: *</label>
              <select id="paymentTerms" style={{padding:7,borderRadius:5,width:"72%"}} name="paymentTerms">
                <option value="Bank Transfer">Bank Transfer</option>
                <option value="Wallet Transfer">Wallet Transfer</option>
                <option value="Cash">Promise / Hand-Cash</option>
              </select>
            
              <br />

              <label htmlFor="totalAmount" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Invoice Amount: *</label>
              <input style={{padding:7,borderRadius:5,width:"72%"}} type="text" id="totalAmount" name="totalAmount"/><br/>


              <span style={{marginBottom:"18px",marginTop:"18px"}}><h3 style={{color:"#E8C16E",display:'inline'}}>CLIENT INFORMATION</h3> <img alt="Invoice Icon" style={{display:'inline',width: '30px', height: '30px',marginLeft:"8px"}} src='client.png'></img></span>
              <label htmlFor="clientName" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Client Name: *</label>
              <input style={{padding:7,borderRadius:5,width:"70%"}} type="text" id="clientName" name="clientName" />
              <br />
              <label htmlFor="clientCompany" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Client Company Name: *</label>
              <input style={{padding:7,borderRadius:5,width:"70%"}} type="text" id="clientCompany" name="clientCompany" />
              <br />
              <label htmlFor="clientAddress" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Client Address: *</label>
              <input style={{padding:7,borderRadius:5,width:"70%"}} type='text' id="clientAddress" name="clientAddress" />
              <br />
              <label htmlFor="clientPhone" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Client Phone Number: *</label>
              <input style={{padding:7,borderRadius:5,width:"70%"}} type="tel" id="clientPhone" name="clientPhone" />
              <br />
              <label htmlFor="clientEmail" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Client Email Address: *</label>
              <input style={{padding:7,borderRadius:5,width:"70%"}} type="text" id="clientEmail" name="clientEmail" />
              <br />
              <button type='submit' style={{backgroundColor:"#FFC13C",fontWeight:"bold",color:"#fff",maxWidth:"30%",marginTop:15,padding:10}}>Create Invoice</button>
              </div>
            <div className="column">
            <span style={{marginBottom:"18px",marginTop:"18px"}}><h3 style={{color:"#E8C16E",display:'inline'}}>COMPANY INFORMATION</h3> <img alt="Invoice Icon" style={{display:'inline',width: '30px', height: '30px',marginLeft:"8px"}} src='office.png'></img></span>
              <label htmlFor="companyName" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Company Name: *</label>
              <input type="text" id="companyName" name="companyName"  style={{padding:7,borderRadius:5,width:"70%"}}/>
              <br />
              <label htmlFor="companyAddress" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Company Address: *</label>
              <input type="text" id="companyAddress" name="companyAddress" style={{padding:7,borderRadius:5,width:"70%"}}/>
              <br />
              <label htmlFor="companyPhone" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Company Phone Number: *</label>
              <input type="tel" id="companyPhone" name="companyPhone" style={{padding:7,borderRadius:5,width:"70%"}} />
              <br />
              <label htmlFor="companyEmail" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',borderColor:'black',border:4}}>Company Email Address: *</label>
              <input type="text" id="companyEmail" name="companyEmail" style={{padding:7,borderRadius:5,width:"70%"}} />
              <br />
              <label htmlFor="companyWebsite" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Company Website: *</label>
              <input type="url" id="companyWebsite" name="companyWebsite"  style={{padding:7,borderRadius:5,width:"70%"}}/>
              <br />
              <label htmlFor="companyTin" style={{paddingBottom:2,marginBottom:5,fontWeight:'bold',}}>Company Tax Identification Number (TIN): *</label>
              <input type="text" id="companyTin" name="companyTin" style={{padding:7,borderRadius:5,width:"70%"}} />
              <br />
            </div>
            
          </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateInvoice;
