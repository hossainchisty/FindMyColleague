/* eslint-disable react/no-unescaped-entities */
import { useState, useEffect, useRef } from "react";
import "../App.css";

function Employee() {
  const [searchTerm, setSearchTerm] = useState("");
  const [employees, setEmployees] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const tableRef = useRef();

  const fetchEmployees = (searchTerm) => {
    fetch(`https://api-employee.vercel.app/api/employee/?search=${searchTerm}`)
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setNotFound(data.length === 0);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  useEffect(() => {
    fetchEmployees(searchTerm);
  }, [searchTerm]);

  // useEffect(() => {
  //   fetchEmployees(searchTerm); // Preload employee data on component mount
  // }, []); // Empty dependency array means this effect will run only once

  return (
    <div className="container">
      <h1>FindMyColleague</h1>
      <input
        type="text"
        name="search"
        placeholder="Search by Name"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {notFound ? (
        <p className="not-found">No employees found for "{searchTerm}"</p>
      ) : (
        <table ref={tableRef} className="employee-table">
          <thead>
            <tr>
              <th>Employee ID</th>
              <th>Employee Name</th>
              <th>Salary($)</th>
              <th>Date of Birth</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empid}>
                <td>{employee.empid}</td>
                <td>{employee.empName}</td>
                <td>{employee.salary}</td>
                <td>{employee.dob}</td>
                <td>{employee.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Employee;
