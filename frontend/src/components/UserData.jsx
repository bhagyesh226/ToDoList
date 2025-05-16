// src/components/UserData.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import LoginForm from "./LoginForm";
import "../App.css";

const API_URL = `http://localhost:5000/items`;

function UserData({ isDarkMode }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showItems, setShowItems] = useState(false); // default false

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    if (isAuthenticated && showItems) {
      fetchItems();
    }
  }, [isAuthenticated, showItems]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email) return alert("Both fields are required");

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, { name, email });
        setEditId(null);
      } else {
        await axios.post(API_URL, { name, email });
      }
      setName("");
      setEmail("");
      fetchItems();
    } catch (err) {
      console.error("Error saving item:", err);
    }
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setName(item.name);
    setEmail(item.email);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchItems();
    } catch (err) {
      console.error("Error deleting item:", err);
    }
  };

  const handleShowUsersClick = () => {
    if (!isAuthenticated) {
      setShowLoginForm(true);
    } else {
      setShowItems((prev) => !prev);
    }
  };

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    setShowLoginForm(false);
    setShowItems(true); // automatically show items after login
    fetchItems();
  };

  const cardClass = isDarkMode ? "bg-secondary text-white" : "bg-white";
  const inputClass = isDarkMode ? "bg-secondary text-light" : "bg-light text-dark";
  const buttonClass = isDarkMode ? "btn-outline-light" : "btn-outline-dark";

  return (
    <>
      <div className={`card ${cardClass} shadow mx-auto mt-4`} style={{ maxWidth: "500px" }}>
        <div className="card-body">
          <h4 className="card-title text-center mb-3">User Info</h4>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              className={`form-control mb-2 ${inputClass}`}
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              className={`form-control mb-3 ${inputClass}`}
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="d-flex justify-content-between">
              <button type="submit" className={`btn ${buttonClass} w-45`}>
                {editId ? "Update" : "Add"}
              </button>

              <button
                type="button"
                className={`btn ${buttonClass} w-45`}
                onClick={handleShowUsersClick}
              >
                {isAuthenticated ? (showItems ? "Hide" : "Show") : "Show"} Users
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Login Form */}
      {showLoginForm && !isAuthenticated && (
        <LoginForm onLoginSuccess={handleLoginSuccess} />
      )}

      {/* User Data Cards */}
      {isAuthenticated && showItems && (
        <div className="d-flex flex-wrap justify-content-center mt-4">
          {items.map((item) => (
            <div
              className={`card m-2 p-3 shadow-sm ${isDarkMode ? "bg-secondary text-white" : "bg-light"}`}
              style={{ width: "18rem", transition: "0.3s ease-in-out" }}
              key={item._id}
            >
              <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.email}</p>
                <div className="d-flex justify-content-between">
                  <button
                    className="btn btn-sm btn-outline-info"
                    onClick={() => handleEdit(item)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(item._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default UserData;
