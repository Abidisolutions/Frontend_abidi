import React from 'react';
import './View.css';

const GridView = ({ invoices, navigate }) => {
  return (
    <div className="grid-view">
      {invoices.map((data, i) => (
        <div
          className='boxInvoice'
          onClick={() => navigate(`/ViewInvoice/${data._id}`)}
          key={i}
          style={{
            cursor: "pointer",
            border: '2px solid #000',
            marginLeft: 42,
            marginBottom: 4,
            borderRadius: '20px',
            width: '70%',
            minHeight: '100px',
            display: 'flex',
            alignItems: 'center',
            padding: '10px',
            transition: 'all 0.2s ease-in-out',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            ":hover": { transform: 'scale(1.1)' }
          }}>
          <div style={{ marginRight: '20px' }}>
            <img src="invoice.png" alt="Invoice Icon" style={{ width: '80px', height: '80px' }} />
          </div>
          <div style={{ flexGrow: 1 }}>
            <h2 style={{ marginTop: 0, marginBottom: '10px', fontSize: '24px' }}>Invoice #{data.invoiceNumber}</h2>
            <p style={{ margin: '5px 0' }}><strong>Company:</strong> {data.companyName}</p>
            <p style={{ margin: '5px 0' }}><strong>Payment Method:</strong> {data.paymentTerms}</p>
            <p style={{ margin: '5px 0' }}><strong>For:</strong> {data.clientName}</p>
            <p style={{ margin: '5px 0' }}><strong>Date:</strong> {data.date.slice(0, 10)}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default GridView;
