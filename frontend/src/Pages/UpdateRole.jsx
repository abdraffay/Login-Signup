import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateRole = () => {
  const [RoleName, setRoleName] = useState("");
  const [Status, setStatus] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();


  const fetchRole = async () => {
    const response = await fetch(`http://localhost:5000/userrole`);

    const data = await response.json();

    const UpdateData = data.filter((x) => x.RoleName === id);
    setRoleName(UpdateData[0].RoleName);
    setStatus(UpdateData[0].Status);
  };

  // Toast Notification Handler
  const handleToast = (message, toastType) => {
    toastType === "danger" ? toast.error(message) : toast.success(message);
  };

  // Handle role update
  const handleUpdate = async (e) => {
    e.preventDefault();

    const updatedRole = {
      RoleName: RoleName,
      Status: Status,
    };

    const response = await fetch(`http://localhost:5000/userrole/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedRole),
    });

    const updateResponse = await response.json();

    if (updateResponse.message) {
      handleToast("Role Updated Successfully", "success");
      setRoleName("");
      setStatus("");
      setTimeout(() => {
        navigate("/list");
      }, 2000);
    } else {
      handleToast(updateResponse.error, "danger");
    }
  };
  useEffect(() => {
    fetchRole();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="mt-3">Update Role</h1>
      <form onSubmit={handleUpdate}>
        <div className="mb-3">
          <label htmlFor="roleName" className="form-label">
            Role Name
          </label>
          <input
            type="text"
            className="form-control"
            value={RoleName}
            onChange={(e) => setRoleName(e.target.value)}
            placeholder="Enter Role Name"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="status" className="form-label">
            Role Status
          </label>
          <select
            className="form-control"
            value={Status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="active" selected={Status === "active"}>
              Active
            </option>
            <option value="unactive" selected={Status === "unactive"}>
              Block
            </option>
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Update Role
        </button>
      </form>

      <ToastContainer />
    </div>
  );
};

export default UpdateRole;
