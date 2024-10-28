import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [data, setData] = useState({
    users: [],
    posts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        // Make parallel requests for users and posts
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get("https://jsonplaceholder.typicode.com/users"),
          axios.get("https://jsonplaceholder.typicode.com/posts"),
        ]);

        // Set the fetched data in state
        setData({
          users: usersResponse.data,
          posts: postsResponse.data,
        });
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {data.users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
        ))}
      </ul>

      <h2>Posts</h2>
      <ul>
        {data.posts.slice(0, 10).map((post) => (  // Limit posts display to first 10
          <li key={post.id}>
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dashboard;
