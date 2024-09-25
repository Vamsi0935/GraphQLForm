import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "./form.css";
import { FaExclamationCircle } from "react-icons/fa";

const Form = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthDate: "",
    gender: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    postalCode: "",
    email: "",
    mobileNumber: "",
    comments: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: "",
    });
  };

  const validateForm = () => {
    let tempErrors = {};
    const { firstName, lastName, email, mobileNumber } = formData;

    if (!firstName) {
      tempErrors.firstName = "First name is required.";
    }
    if (!lastName) {
      tempErrors.lastName = "Last name is required.";
    }
    if (!email) {
      tempErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      tempErrors.email = "Email is invalid.";
    }
    if (!mobileNumber) {
      tempErrors.mobileNumber = "Mobile number is required.";
    } else if (!/^\d+$/.test(mobileNumber)) {
      tempErrors.mobileNumber = "Mobile number must be digits only.";
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        const response = await axios.post(
          "https://graph-ql-form-api.vercel.app/graphql",
          {
            query: `
              mutation CreateUser($input: UserInput!) {
                createUser(userInput: $input) {
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
            `,
            variables: {
              input: formData,
            },
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data.errors) {
          throw new Error(
            "GraphQL error: " + JSON.stringify(response.data.errors)
          );
        }

        console.log("User Created:", response.data.data.createUser);

        await Swal.fire({
          icon: "success",
          title: "Registration Successful!",
          text: "User has been created successfully.",
        });

        navigate("/list-data", { state: formData });
      } catch (error) {
        console.error("Error creating user:", error);

        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text:
            error.response?.data?.errors?.[0]?.message ||
            "There was an error creating the user. Please try again.",
        });
      }
    }
  };

  return (
    <div className="register-container">
      <div className="title py-3">
        <h1 className="display-5">
          <strong>Registration Form</strong>
        </h1>
        <p>Fill out the form carefully for registration</p>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="row">
          <label htmlFor="firstName">Full Name:</label>
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${
                  errors.firstName ? "is-invalid" : ""
                }`}
                aria-label="First name"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && (
                <span className="input-group-text text-danger">
                  <FaExclamationCircle />
                </span>
              )}
            </div>
            {errors.firstName && (
              <div className="text-danger">{errors.firstName}</div>
            )}
            <div className="form-text">
              <p style={{ fontSize: "12px" }}>First Name</p>
            </div>
          </div>
          <div className="col">
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${
                  errors.lastName ? "is-invalid" : ""
                }`}
                aria-label="Last name"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && (
                <span className="input-group-text text-danger">
                  <FaExclamationCircle />
                </span>
              )}
            </div>
            {errors.lastName && (
              <div className="text-danger">{errors.lastName}</div>
            )}
            <div className="form-text">
              <p style={{ fontSize: "12px" }}>Last Name</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label htmlFor="birthDate" className="form-label">
              Birth Date
            </label>
            <input
              type="date"
              className="form-control"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
            />
          </div>
          <div className="col">
            <label htmlFor="gender" className="form-label">
              Gender:
            </label>
            <select
              className="form-select"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Please Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="N/A">N/A</option>
            </select>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="addressLine1" className="form-label">
            Address
          </label>
          <input
            type="text"
            className="form-control"
            name="addressLine1"
            value={formData.addressLine1}
            onChange={handleChange}
          />
          <div className="form-text">
            <p style={{ fontSize: "12px" }}>Street Address</p>
          </div>
          <input
            type="text"
            className="form-control"
            name="addressLine2"
            value={formData.addressLine2}
            onChange={handleChange}
          />
          <div className="form-text">
            <p style={{ fontSize: "12px" }}>Street Address Line 2</p>
          </div>

          <div className="row">
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
              <div className="form-text">
                <p style={{ fontSize: "12px" }}>City</p>
              </div>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
              <div className="form-text">
                <p style={{ fontSize: "12px" }}>State / Province</p>
              </div>
            </div>
          </div>

          <input
            type="text"
            className="form-control"
            name="postalCode"
            value={formData.postalCode}
            onChange={handleChange}
          />
          <div className="form-text">
            <p style={{ fontSize: "12px" }}>Postal / Zip Code</p>
          </div>
        </div>

        <div className="row">
          <div className="col">
            <label htmlFor="email">Email: </label>
            <div className="input-group">
              <input
                type="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && (
                <span className="input-group-text text-danger">
                  <FaExclamationCircle />
                </span>
              )}
            </div>
            {errors.email && <div className="text-danger">{errors.email}</div>}
            <div className="form-text">
              <p style={{ fontSize: "12px" }}>Email Address</p>
            </div>
          </div>

          <div className="col">
            <label htmlFor="mobileNumber">Mobile Number:</label>
            <div className="input-group">
              <input
                type="text"
                className={`form-control ${
                  errors.mobileNumber ? "is-invalid" : ""
                }`}
                name="mobileNumber"
                value={formData.mobileNumber}
                onChange={handleChange}
              />
              {errors.mobileNumber && (
                <span className="input-group-text text-danger">
                  <FaExclamationCircle />
                </span>
              )}
            </div>
            {errors.mobileNumber && (
              <div className="text-danger">{errors.mobileNumber}</div>
            )}
            <div className="form-text">
              <p style={{ fontSize: "12px" }}>Mobile Number</p>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="comments" className="form-label">
            Comments
          </label>
          <textarea
            className="form-control"
            name="comments"
            rows="3"
            value={formData.comments}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;
