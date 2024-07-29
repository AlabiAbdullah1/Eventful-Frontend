import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function CreatorDashboard() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [newEvent, setNewEvent] = useState({
    name: "",
    description: "",
    date: "",
    status: "pending",
  });

  const getToken = () => {
    return localStorage.getItem("token");
  };

  const fetchEvents = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("No token found, please login.");
    }

    const response = await fetch("http://127.0.0.1:8000/event", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    return response.json();
  };

  const {
    data,
    error: fetchError,
    isLoading,
  } = useQuery({
    queryKey: ["events"],
    queryFn: fetchEvents,
  });

  const events = data || [];

  const { mutateAsync, isPending, isError } = useMutation({
    mutationFn: async (event) => {
      const token = getToken();
      const { data } = await axios.post("http://127.0.0.1:8000/event", event, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(token);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["events"] });
      toast.success("Event created successfully!");
      setNewEvent({
        name: "",
        description: "",
        date: "",
        status: "pending",
        price: "",
      });
    },
    onError: (error) => {
      toast.error("Failed to create event: " + error.message);
    },
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prevEvent) => ({
      ...prevEvent,
      [name]: value,
    }));
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const { name, email, password, role } = values;
      await mutateAsync({ name, email, password, role });
    } catch (error) {
      console.error("Signup failed:", error.message);
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    if (fetchError) {
      toast.error("Failed to fetch events: " + fetchError.message);
    }
  }, [fetchError]);

  return (
    <div>
      <ToastContainer />
      <h1>Dashboard</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Event Name"
          value={newEvent.name}
          onChange={handleInputChange}
          required
        />
        <input
          type="text"
          name="description"
          placeholder="Event Description"
          value={newEvent.description}
          onChange={handleInputChange}
          required
        />
        <input
          type="date"
          name="date"
          placeholder="Event Date"
          value={newEvent.date}
          onChange={handleInputChange}
          required
        />

        <input
          type="number"
          name="price"
          placeholder="price"
          value={newEvent.price}
          onChange={handleInputChange}
          required
        />

        <button type="submit">Create Event</button>
      </form>
      <h2>Your Events</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {events?.map((event) => (
            <li key={event._id}>
              <h3>{event.name}</h3>
              <p>{event.description}</p>
              <p>{new Date(event.date).toLocaleDateString()}</p>
              <p>Status: {event.status}</p>
              <button onClick={() => navigate(`/event/${event._id}`)}>
                View Details
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

// import { useQuery } from "@tanstack/react-query";
// import { toast } from "react-toastify";
// import Spinner from "../components/Spinner";

// const fetchEvents = async () => {
//   const token = localStorage.getItem("token");

//   if (!token) {
//     throw new Error("No token found, please login.");
//   }

//   const response = await fetch("http://127.0.0.1:8000/event", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   console.log(token);
//   if (!response.ok) {
//     const errorText = await response.text();
//     throw new Error(errorText);
//   }

//   return response.json();
// };

// const CreatorDashboard = () => {
//   const { data, isLoading, isError, error } = useQuery({
//     queryKey: ["events"],
//     queryFn: fetchEvents,
//   });

//   if (isLoading) return <Spinner />;

//   if (isError) {
//     toast.error(error.message);
//     return <div>Error: {error.message}</div>;
//   }

//   const event = data?.event || [];

//   return (
//     <div>
//       <h1>Events</h1>
//       <ul>
//         {event.map((event) => (
//           <li key={event.id}>{event.name}</li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default CreatorDashboard;
