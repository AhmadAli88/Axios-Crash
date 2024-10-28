import React, { useState } from 'react';
import axios from 'axios';

const UserForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
  const [status, setStatus] = useState({
    loading: false,
    error: null,
    success: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await axios.post('https://api.example.com/users', formData);
      setStatus({ loading: false, error: null, success: true });
      console.log('User created:', response.data);
    } catch (err) {
      setStatus({
        loading: false,
        error: err.response?.data?.message || 'An error occurred',
        success: false
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
      />
      <input
        type="email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
      />
      <button type="submit" disabled={status.loading}>
        {status.loading ? 'Submitting...' : 'Submit'}
      </button>
      {status.error && <div>Error: {status.error}</div>}
      {status.success && <div>User created successfully!</div>}
    </form>
  );
};
export default UserForm