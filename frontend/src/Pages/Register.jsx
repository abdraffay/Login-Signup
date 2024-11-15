import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const [AllRoles, setAllRoles] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [userImage, setUserImage] = useState(null);  // File input, default to null
  const [UserRole, setUserRole] = useState('');       // Ensure initial value is an empty string

  const handleToast = (message, toastType) => {
    toastType === "danger" ? toast.error(message) : toast.success(message);
  };

  // Fetch roles from the API
  const fetchRoles = async () => {
    try {
      const rolesResponse = await fetch('http://localhost:5000/userrole');
      const roles = await rolesResponse.json();
      setAllRoles(roles);
    } catch (error) {
      handleToast("Failed to load roles", "danger");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("userEmail", userEmail);
    formData.append("userPassword", userPassword);
    formData.append("userImage", userImage);  // Append file directly
    formData.append("userRole", UserRole);

    try {
      const response = await fetch('http://localhost:5000/user', {
        method: 'POST',
        body: formData,
      });

      const responseData = await response.json();

      if (response.ok) {
        handleToast(responseData.message, "success");
      } else {
        handleToast(responseData.error, "danger");
      }
    } catch (error) {
      handleToast("Registration failed", "danger");
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <h3 className="mb-4">Registration Form</h3>

        {/* Username */}
        <div className="mb-3">
          <label htmlFor="user" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="user"
            placeholder="Enter Username"
            value={userName || ''}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>

        {/* Email */}
        <div className="mb-3">
          <label htmlFor="userEmail" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="userEmail"
            placeholder="Enter Email"
            value={userEmail || ''}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label htmlFor="psw" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="psw"
            placeholder="Enter Password"
            value={userPassword || ''}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        {/* Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            className="form-control"
            id="image"
            onChange={(e) => setUserImage(e.target.files[0])}  // Removed value attribute for file input
          />
        </div>

        {/* User Role */}
        <div className="mb-3">
          <label htmlFor="role" className="form-label">User Role</label>
          <select
            className="form-select"
            value={UserRole || ''}
            onChange={(e) => setUserRole(e.target.value)}
          >
            <option value="">Select Role</option>
            {AllRoles.map((role, index) => (
              <option key={index} value={role.RoleName}>
                {role.RoleName}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="btn btn-primary w-100">Register</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Register;
