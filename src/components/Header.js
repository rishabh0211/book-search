import React from "react";

const Header = () => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img src="../logo.svg" className="header__logo" alt="Logo"/>
        <h3 className="header__heading-primary">Your Book Buddy!</h3>
      </div>
    </header>
  )
};

export default Header;