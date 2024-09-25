import React, { useEffect, useState } from "react";
import axios from "axios";
import "./listdata.css";

const ListData = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const query = `
        query {
          users {
            id
            firstName
            lastName
            birthDate
            gender
            addressLine1
            addressLine2
            city
            state
            postalCode
            email
            mobileNumber
            comments
          }
        }
      `;

      try {
        const response = await axios.post("https://graph-ql-form-api.vercel.app/graphql", {
          query,
          withCredentials: true,
        });
        setUsers(response.data.data.users);
      } catch (error) {
        setError("Error fetching users: " + error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div class="d-flex justify-content-center">
        <div class="spinner-border" role="status">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return <h2 className="text-center">{error}</h2>;
  }

  return (
    <>
      <h1 className="text-center display-3">
        <strong>User Details</strong>
      </h1>
      <div className="summary-container">
        <table className="table-horizontal text-center">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Birth Date</th>
              <th>Gender</th>
              <th>Street Address</th>
              <th>Street Address Line 2</th>
              <th>City</th>
              <th>State</th>
              <th>Postal / ZIP Code</th>
              <th>Email</th>
              <th>Mobile Number</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.birthDate}</td>
                <td>{user.gender}</td>
                <td>{user.addressLine1}</td>
                <td>{user.addressLine2}</td>
                <td>{user.city}</td>
                <td>{user.state}</td>
                <td>{user.postalCode}</td>
                <td>{user.email}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.comments}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ListData;
