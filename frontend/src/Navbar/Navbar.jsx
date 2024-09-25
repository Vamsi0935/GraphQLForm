import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar bg bg-light shadow p-3 mb-5 bg-body-tertiary rounded">
      <div className="container-fluid justify-content-end">
        <form className="d-flex">
          <Link to="/">
            <button className="btn btn-outline-primary ms-2">Add Data</button>
          </Link>
          <Link to="/list-data">
            <button className="btn btn-outline-success ms-2">List Data</button>
          </Link>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
