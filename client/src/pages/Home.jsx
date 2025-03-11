import React from "react";
import Navbar from "../components/Navbar.jsx";
import { NavBarHome } from "../components/Homecomp/NavBarHome.jsx";
import { BodyHome } from "../components/Homecomp/BodyHome.jsx";
import { FooterHome } from "../components/Homecomp/FooterHome.jsx";

const Home = () => {
  return (
    <>
      <NavBarHome />
      <BodyHome />
      <FooterHome />
    </>
  );
};

export default Home;
