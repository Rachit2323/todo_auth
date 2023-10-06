import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Import the Link and useNavigate components

function Signin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Use the useNavigate hook to get the navigate function
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:4000/api/auth/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        // Handle successful login
        const data = await response.json();
        const { token } = data;

        // Store the token in localStorage
        localStorage.setItem('token', token);

        // Redirect to the /todo route
        console.log('Login successful');
        navigate('/todo');
      } else {
        // Handle login error, e.g., display an error message
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <h2>Signin</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleInputChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleInputChange}
        />
        <button type="submit">Signin</button>
      </form>

      <p>Don't have an account? <Link to="/">Signup</Link></p>
    </div>
  );
}

export default Signin;
