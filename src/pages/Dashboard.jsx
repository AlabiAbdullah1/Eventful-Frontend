import React from "react";
import { useQuery } from "@tanstack/react-query";

const Dashboard = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["posts"],
    queryFn: () =>
      fetch("http://127.0.0.1:8000/event").then((res) => res.json()),
    staleTime: 4000,
  });

  // Log the data to see its structure
  // console.log(data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  // Check if data.message is an array before using .map()
  const users = data?.data;

  console.log(users);

  if (!Array.isArray(users)) {
    return <div>Data is not an array</div>;
  }

  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <h2>{user._id}</h2>
          <h4>{user.name}</h4>
          {/* <p>{user.email}</p> */}
        </div>
      ))}
    </div>
  );
};

export default Dashboard;
