// src/components/UserData.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/items";

function UserData({ isDarkMode }) {
  const [items, setItems] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState(null);

  const fetchItems = async () => {
    try {
      const res = await axios.get(API_URL);
      setItems(res.data);
    } catch (err) {
      console.error("Error fetching items:", err);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

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

  const cardClass = isDarkMode ? "bg-secondary text-white" : "bg-white";
  const inputClass = isDarkMode ? "bg-secondary text-light" : "bg-light text-secondary";
  

  return (
    <div className={`card ${cardClass} shadow mx-auto`} style={{ maxWidth: "500px" }}>
      <div className="card-body">
        <h4 className="card-title text-center mb-3">User Info</h4>
        <form onSubmit={handleSubmit} >
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
            className={`form-control mb-2 ${inputClass}`}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <button type="submit" className="btn btn-primary w-100">
            {editId ? "Update" : "Add"}
          </button>
        </form>
        <ul className="list-group list-group-flush mt-4">
          {items.map((item) => (
            <li className={`list-group-item ${isDarkMode ? "bg-dark text-white" : ""}`} key={item._id}>
              <strong>{item.name}</strong> - {item.email}
              <div className="mt-2">
                <button className="btn btn-sm btn-outline-info me-2" onClick={() => handleEdit(item)}>
                  Edit
                </button>
                <button className="btn btn-sm btn-outline-danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default UserData;
