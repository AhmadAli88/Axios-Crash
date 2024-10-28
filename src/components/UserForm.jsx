import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserListWithForm = () => {
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({ name: '', email: '' });
  const [status, setStatus] = useState({ loading: false, error: null, success: false });

  // Fetch initial user list
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
      } catch (err) {
        console.error('Error fetching users:', err);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, error: null, success: false });

    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', formData);
      setUsers((prevUsers) => [...prevUsers, response.data]); // Add new user to the list
      setStatus({ loading: false, error: null, success: true });
      setFormData({ name: '', email: '' }); // Clear form
    } catch (err) {
      setStatus({
        loading: false,
        error: err.response?.data?.message || 'An error occurred',
        success: false
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Name"
        />
        <input
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          placeholder="Email"
        />
        <button type="submit" disabled={status.loading}>
          {status.loading ? 'Submitting...' : 'Add User'}
        </button>
        {status.error && <div>Error: {status.error}</div>}
        {status.success && <div>User added successfully!</div>}
      </form>

      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
};

export default UserListWithForm;
