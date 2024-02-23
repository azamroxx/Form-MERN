import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const Update = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState(0);
  const [error, setError] = useState();

  const { id } = useParams();
  const navigate = useNavigate();

  const getSingleUser = async () => {
    const response = await fetch(`http://localhost:5000/${id}`);
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      setError("");
      console.log("updated user", result);
      setName(result.name);
      setEmail(result.email);
      setAge(result.age);
    }
  };
  const handleUpdate = async (e) => {
    e.preventDefault();
    const updatedUser = { name, email, age };
    const response = await fetch(`http://localhost:5000/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updatedUser),
      headers: { "Content-type": "application/json" },
    });
    const result = await response.json();
    if (!response.ok) {
      console.log(result.error);
      setError(result.error);
    }
    if (response.ok) {
      console.log(result);
      setError("");
      navigate("/all");
    }
  };
  useEffect(() => {
    getSingleUser();
  }, []);
  return (
    <div className="container my-2">
      {error && <div className="alert alert-danger">{error}</div>}
      <h2 className="text-center">Edit data</h2>
      <form onSubmit={handleUpdate}>
        <div className="mb-3 row">
          <label className="col-sm-2">Name</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3 row">
          <label className="col-sm-2">Age</label>
          <input
            type="number"
            className="form-control"
            value={age}
            onChange={(e) => setAge(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};
