import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');

  const handleToast = (message, toastType) => {
    toastType === 'danger' ? toast.error(message) : toast.success(message);
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    const loginData = {
      userEmail,
      userPassword,
    };

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const responseData = await response.json();

      if (response.ok) {
        handleToast('Login successful', 'success');

      } else {
        handleToast(responseData.error, 'danger');
      }
    } catch (error) {
      handleToast('Login failed', 'danger');
    }
  };

  return (
    <div className="container mt-5">
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
        <h3 className="mb-4">Login</h3>

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

        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default Login;
