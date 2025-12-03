import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="navbar">
      <div className="logo">
        <Link to="/">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <nav id="myLinks" className={`nav-links ${open ? "open" : ""}`}>
        <Link to="/whoarewe">WHO ARE WE</Link>
        <Link to="/membership">MEMBERSHIP</Link>
        <Link to="/scholarships">SCHOLARSHIPS</Link>
        <Link to="/store">STORE</Link>
      </nav>

      <button
        className="hamburger"
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="myLinks"
        aria-label="Toggle menu"
      >
        <span className="bar" />
        <span className="bar" />
        <span className="bar" />
      </button>
    </header>
  );
}

