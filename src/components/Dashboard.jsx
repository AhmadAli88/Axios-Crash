import React from "react";

const Dashboard = () => {
  const [data, setData] = useState({
    users: [],
    posts: [],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [usersResponse, postsResponse] = await Promise.all([
          axios.get("https://api.example.com/users"),
          axios.get("https://api.example.com/posts"),
        ]);

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
};
export default Dashboard;
