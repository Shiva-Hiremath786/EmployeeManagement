import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import EmployeeForm from './EmployeeForm';
import './HomePage.css';

const generateId = () => {
  return Math.floor(Math.random() * 90000) + 10000; // Generates a 5-digit random ID
};

const HomePage = () => {
  const [employees, setEmployees] = useState([]);
  const [showEmployeeForm, setShowEmployeeForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [editingEmployee, setEditingEmployee] = useState(null);

  useEffect(() => {
    const initialData = JSON.parse(localStorage.getItem('employees')) || [
      { id: generateId(), firstName: 'John', lastName: 'Doe', email: 'john.doe@example.com', hobbies: 'Reading' },
      { id: generateId(), firstName: 'Jane', lastName: 'Smith', email: 'jane.smith@example.com', hobbies: 'Gardening' },
    ];
    setEmployees(initialData);
  }, []);

  useEffect(() => {
    const filtered = employees.filter(employee =>
      employee.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.hobbies.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

  const handleSearchInputChange = (query) => {
    setSearchQuery(query);
  };

  const handleAddEmployee = (employeeData) => {
    setEmployees([...employees, { ...employeeData, id: generateId() }]);
    setShowEmployeeForm(false);
  };

  const handleEditEmployee = (employee) => {
    setEditingEmployee(employee);
    setShowEmployeeForm(true);
  };

  const handleUpdateEmployee = (updatedData) => {
    const updatedEmployees = employees.map(employee =>
      employee.id === updatedData.id ? { ...employee, ...updatedData } : employee
    );
    setEmployees(updatedEmployees);
    setEditingEmployee(null);
    setShowEmployeeForm(false);
  };

  const handleDeleteEmployee = (id) => {
    const shouldDelete = window.confirm('Are you sure you want to delete this employee?');
    if (shouldDelete) {
      const updatedEmployees = employees.filter(employee => employee.id !== id);
      setEmployees(updatedEmployees);
    }
  };
  

  return (
    <div>
      <Header onSearchInputChange={handleSearchInputChange} setSearchQuery={setSearchQuery} />
      <main className="main-content">
        <h1>Welcome to Home Page</h1>
        <div className="add-employee-form">
          <button className="add-button" onClick={() => setShowEmployeeForm(true)}>Add Employee</button>
        </div>
      
        <table className="employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Email</th>
              <th>Hobbies</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map(employee => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.firstName}</td>
                <td>{employee.lastName}</td>
                <td>{employee.email}</td>
                <td>{employee.hobbies}</td>
                <td>
                  <button className="edit-button" onClick={() => handleEditEmployee(employee)}>Edit</button>
                  <button className="delete-button" onClick={() => handleDeleteEmployee(employee.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main>
      {showEmployeeForm && (
        <EmployeeForm
          editingEmployee={editingEmployee} // Corrected prop name
          onAddEmployee={handleAddEmployee}
          onUpdateEmployee={handleUpdateEmployee}
          onClose={() => setShowEmployeeForm(false)}
        />
      )}
      <Footer />
    </div>
  );
}

export default HomePage;
