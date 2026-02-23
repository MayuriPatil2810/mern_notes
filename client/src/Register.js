import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://mern-notes-7.onrender.com/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Registration Successful ✅");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } else {
        setMessage(data.message || "Registration Failed ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Server Error ❌");
    }
  };

  return (
    <div style={{ width: "300px", margin: "100px auto" }}>
      <h2>Register</h2>

      {message && <p>{message}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Enter Name"
            value={user.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <input
            type="password"
            name="password"
            placeholder="Enter Password"
            value={user.password}
            onChange={handleChange}
            required
          />
        </div>

        <br />

        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
