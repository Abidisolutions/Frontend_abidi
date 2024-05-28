// abidipro/src/components/AddProjectForm.js (or your actual file)
import React, { useState } from 'react';

const AddProjectForm = () => {
  const [formData, setFormData] = useState({
    projectName: '',
    lead: '',
    assignedMembers: 0,
    startDate: '',
    endDate: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Project added successfully!');
        // Optionally, reset the form or handle success
      } else {
        console.error('Failed to add project');
      }
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      {/* Your form fields go here */}
      <button type="submit">Add Project</button>
    </form>
  );
};

export default AddProjectForm;
