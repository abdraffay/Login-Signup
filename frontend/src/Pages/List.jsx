import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const List = () => {
  const navigate = useNavigate();
  const [AllRoles, setAllRoles] = useState([]);

  // Toast Notification Helper
  const handleToast = (message, toastType) => {
    toastType === "danger" ? toast.error(message) : toast.success(message);
  };

  // Fetch all roles
  const getAllRoles = async () => {
    try {
      const response = await fetch("http://localhost:5000/userrole");
      const data = await response.json();
      setAllRoles(data)
    } catch (error) {
      handleToast("Failed to fetch roles.", "danger");
    }
  };

  // Delete role by ID
  const deleteRole = async (RoleName) => {
    try {
      const response = await fetch(`http://localhost:5000/userrole/${RoleName}`, {
        method: 'DELETE'
      });
      if (response.ok) {
        handleToast("Role Deleted Successfully !!", "success");
        getAllRoles(); 
      } else {
        handleToast(`Role not deleted successfully: ${RoleName}`, "danger");
      }
    } catch (error) {
      handleToast( error.message);
    }
  };

  useEffect(() => {
    getAllRoles();
  }, []);

  return (
    <div className='container mt-4'>
      <h1 className='mt-2'>Roles List</h1>
      <ToastContainer />
      <table className="table">
        <thead>
          <tr className='table-dark'>
            <th scope="col">#</th>
            <th scope="col">Role Name</th>
            <th scope="col">Status</th>
            <th scope="col">Handle</th>
          </tr>
        </thead>
        <tbody>
          {AllRoles && AllRoles.length > 0 ? (
            AllRoles.map((Role, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{Role.RoleName}</td>
                <td>{Role.Status}</td>
                <td>
                  <button className='btn btn-danger btn-sm' onClick={() => deleteRole(Role.RoleName)}>Delete</button>
                  <Link to={`/UpdateRole/${Role.RoleName}`} className="btn btn-primary btn-sm">Update</Link>
                </td>
              </tr>
            ))
          ) : (
            <tr><td colSpan="4">Roles not found</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default List;
