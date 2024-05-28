import React, { useState , useEffect } from 'react';
import TopMenuBar from '../../Topmenu/TopMenuBar';
import SideBar from '../../Sidebar/SideBar';
import '../PaymentStatus/PaymentStatus.css';
import icon1 from '../../../images/01__1_-removebg-preview (1).png'
import axios from "axios"; 
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const PaymentStatus = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortingOption, setSortingOption] = useState('sortby');
  const [invoices, setinvoices] = useState([]);
  const [selectedInvoice, setselectedInvoice] = useState();
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [editingIndex, setEditingIndex] = useState(null);
  const [paid, setPaid] = useState(false);
 
  useEffect(() => {
    fetchInvoices();
  }, [paid])
  

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const fetchInvoices = async () => {
    try {
      const response = await axios.get('https://123abcd-abidi_pro.mdbgo.io/api/view-invoices');
      setinvoices(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching invoices:", error);
    }
  };
 
  const handleSortingChange = (e) => {
    setSortingOption(e.target.value);
  };
 
  const handleAddProjectClick = () => {
    setPopupOpen(true);
    setEditingIndex(null);
  };
 
  const handleEditClick = (index,{invoiceNumber}) => {
    setEditingIndex(index);
    setselectedInvoice(invoiceNumber);
    setPopupOpen(true);
  };
 
  const handlePopupClose = () => {
    setPopupOpen(false);
    setEditingIndex(null);
  };
 
  const handleFormSubmit = async (e) => {
    e.preventDefault();
 
    const formData = {
      paidAmount: Number(e.target.paidAmount.value),
      invoiceNumber: selectedInvoice,
    };
  try{
    const response = await axios.post('https://123abcd-abidi_pro.mdbgo.io/api/pay-invoices',formData);
    toast.success('Payment Status updated successfully');
    setPaid(paid? false : true);
    setPopupOpen(false);
  } catch (error) {
    console.log(error);
    toast.error('Error in updating Payment Status');
  }
    // if (editingIndex !== null) {
    //   const updatedProjects = [...projects];
    //   updatedProjects[editingIndex] = formData;
    //   setProjects(updatedProjects);
    // } else {
    //   setProjects([...projects, formData]);
    // }
 
    // setPopupOpen(false);
    // setEditingIndex(null);
    // e.target.reset();
  };
 
  const sortedInvoices = [...invoices].sort((a, b) => {
    if (sortingOption === 'sortby') {
      return 0;
    } else if (sortingOption === 'name') {
      return a.clientName.localeCompare(b.clientName);
    } else if (sortingOption === 'id') {
      return a.invoiceNumber - b.invoiceNumber;
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
            <h2>Payment Status</h2>
            <button onClick={handleAddProjectClick}>
              Payment Status
            </button>
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
              <div className='cp-sort'>
                <select id="sort" value={sortingOption} onChange={handleSortingChange}>
                  <option value="sortby" disabled>Sort by</option>
                  <option value="name">Client Name</option>
                  <option value="id">Invoice No</option>
                </select>
              </div>
            </div>
            <div className='cp-list'>
              <table>
                <thead>
                  <tr>
                    <th style={{maxWidth:"1%"}}>Invoice <br/> Number</th>
                    <th>Dated</th>
                    <th>Issued By</th>
                    <th>Issued For</th>
                    <th>Total Payment <br/> Required</th>
                    <th>Paid <br/> Amount</th>
                    <th>Remaining <br/> Amount</th>
                    <th>Action</th>
                  </tr>
                </thead>
                
                <tbody>
                  {sortedInvoices.map((invoice, index) => (
                    <tr key={index}>
                      <td style={{textAlign:"start"}}>{invoice.invoiceNumber}</td>
                      <td>{invoice.date.slice(0,10)}</td>
                      <td>{invoice.companyName}</td>
                      <td>{invoice.clientName}</td>
                      <td>{invoice.totalAmount}</td>
                      <td>{invoice.paidAmount}</td>
                      <td>{Number(invoice.totalAmount) - Number(invoice.paidAmount)}</td>
                      <td>
                        <button disabled={!(Boolean(invoice.totalAmount-invoice.paidAmount))} style={{backgroundColor:(invoice.totalAmount-invoice.paidAmount)==0? "#000000" : "#65EE26",color:"#ffffff",fontWeight:"bold"}} onClick={() => handleEditClick(index,{invoiceNumber:invoice.invoiceNumber})}>{(invoice.totalAmount-invoice.paidAmount)==0? "Paid":"Pay"}</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      {/* Popup */}
      {isPopupOpen && (
        <div className="popup">
          <div className="popup-content">
            <div className='pop-heading'>
             <img src={icon1} alt='' />
              <h2>{editingIndex !== null ? 'Enter Paid Amount' : 'Add Payment'}</h2>
            </div>
            <form onSubmit={handleFormSubmit}>
              <div className="form-group">
                <label htmlFor="Payment_Date">Payment Amount</label>
                <input
                  type="number"
                  id="paidAmount"
                  name="paidAmount"
                  required
                />
              </div>
                      
              <button style={{backgroundColor:"#65EE26",border:"none",fontWeight:"bolder"}} type="submit">
                {editingIndex !== null ? 'Pay' : 'Add Payment Status'}
              </button>
              <button onClick={handlePopupClose} className='close-but'>Cancel</button>
 
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default PaymentStatus;