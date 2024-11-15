import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Role = () => {
  const [RoleName, setRoleName] = useState("");
  const [Status, setStatus] = useState("");
  const navigator = useNavigate();

  const handleToast = (message, toastType) => {
    toastType === "danger" ? toast.error(message) : toast.success(message);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const API = 'http://localhost:5000/userrole';

    const RoleData = {
      RoleName: RoleName,
      Status: Status
    };

    const Role_Response = await fetch(API, {
      method: "POST",
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(RoleData)
    });

    const Api_response = await Role_Response.json();

    if (Api_response.message === "Role already exists") {
      handleToast("Role already exists.", "danger");
    } else if (Api_response.message) {
      handleToast("Role Added Successfully.", "success");
      setRoleName("");
      setStatus("");
      setTimeout(() => {
        navigator("/list");
      }, 2000);
    } else {
      handleToast(Api_response.error, "danger");
    }
  };
  return (
    <div className='container mt-5'>
      <h1 className='mt-3'>Role Register</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="roleName" className="form-label">Role Name</label>
          <input 
            type="text" 
            className="form-control" 
            value={RoleName}
            onChange={(e) => setRoleName(e.target.value)} 
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">Role Status</label>
          <select 
            className="form-control" 
            value={Status} 
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="active">Active</option>
            <option value="unactive">Block</option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">Add Role</button>
      </form>
      <ToastContainer />
    </div>
  );
};
export default Role