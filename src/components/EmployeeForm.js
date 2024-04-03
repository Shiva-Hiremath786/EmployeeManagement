import React, { useState, useEffect } from 'react';
import './EmployeeForm.css';

const EmployeeForm = ({ onClose, onAddEmployee, onUpdateEmployee, editingEmployee }) => {
  const [employeeData, setEmployeeData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    hobbies: '',
  });

  // Use useEffect to update form data when editingEmployee changes
  useEffect(() => {
    if (editingEmployee) {
      setEmployeeData({
        firstName: editingEmployee.firstName,
        lastName: editingEmployee.lastName,
        email: editingEmployee.email,
        hobbies: editingEmployee.hobbies,
      });
    } else {
      setEmployeeData({
        firstName: '',
        lastName: '',
        email: '',
        hobbies: '',
      });
    }
  }, [editingEmployee]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployeeData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingEmployee) {
      onUpdateEmployee({ ...employeeData, id: editingEmployee.id });
    } else {
      onAddEmployee({ ...employeeData, id: Date.now() });
    }
    setEmployeeData({
      firstName: '',
      lastName: '',
      email: '',
      hobbies: '',
    });
    onClose(); // Close the form after saving
  };

  const handleCancel = () => {
    setEmployeeData({
      firstName: '',
      lastName: '',
      email: '',
      hobbies: '',
    });
    onClose(); // Close the form without saving
  };

  return (
    <div className="employee-form">
      <h2>{editingEmployee ? 'Edit Employee' : 'Add Employee'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="First Name"
          name="firstName"
          value={employeeData.firstName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          name="lastName"
          value={employeeData.lastName}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={employeeData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          placeholder="Hobbies"
          name="hobbies"
          value={employeeData.hobbies}
          onChange={handleChange}
          required
        />
        <div className="button-container">
          <button type="submit">{editingEmployee ? 'Save Changes' : 'Save'}</button>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
