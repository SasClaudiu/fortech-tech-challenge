import React from "react";
import logo from "../../assets/images/logo.png";
import { Logo } from "../Logo";
import { SearchBar } from "../SearchBar";
import "./Navbar.scss";

export const Navbar = () => {
  return (
    <>
      <nav className="navbar">
        <Logo src={logo} />
      </nav>
      <SearchBar />
    </>
  );
};
