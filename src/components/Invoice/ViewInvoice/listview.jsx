import React from 'react';
import './View.css';

const ListView = ({ invoices, navigate }) => {
  return (
    <div className="list-view">
      <table>
        <thead>
          <tr>
            <th>Invoice Number</th>
            <th>Company</th>
            <th>Payment Method</th>
            <th>Client</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((data, i) => (
            <tr key={i} onClick={() => navigate(`/ViewInvoice/${data._id}`)} style={{ cursor: 'pointer' }}>
              <td>{data.invoiceNumber}</td>
              <td>{data.companyName}</td>
              <td>{data.paymentTerms}</td>
              <td>{data.clientName}</td>
              <td>{data.date.slice(0, 10)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListView;
