"use client";

import React from "react";
import "../globals.css";

const Footer = () => {
  const today = new Date().toLocaleDateString(); // system date

  return (
    <footer className="app-footer">
      <p>© Jessica Angela Huang | 22586615 | {today}</p>
    </footer>
  );
};

export default Footer;
