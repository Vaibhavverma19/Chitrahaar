import React, { useState, useEffect } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { useNavigate, useLocation } from "react-router-dom";

import "./header.scss";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/movix-logo.svg";

const Header = () => {
  const [show, setShow] = useState("top");
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const openMobileMenu = () => {
    setMobileMenu(true);
    setShowSearch(false);
  };
  const openSearch = () => {
    setMobileMenu(false);
    setShowSearch(true);
  };

  const handlequery = (event) => {
    if (event.key === "Enter" && query.length > 0) {
      //console.log(query);
      navigate(`/search/${query}`);
      setTimeout(()=>setShowSearch(false),100);
    }
  };

  const navigationHandler=(type)=>{
    navigate(`/explore/${type}`);
    setTimeout(()=>setMobileMenu(false),100);
  }
  const gohome=()=>{
    navigate(`/`);
  }
  return (
    <header className={` header ${mobileMenu ? "mobileView" : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          {/* <img src={logo} onClick={gohome}></img> */}
          <h1 onClick={gohome}>Chitrahaar</h1>
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={()=>navigationHandler("tv")}>TV Shows</li>
          <li className="menuItem" onClick={()=>navigationHandler("movie")}>Movies</li>
          <li className="menuItem">
            <HiOutlineSearch  onClick={openSearch} />
          </li>
        </ul>
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? (
            <VscChromeClose onClick={() => setMobileMenu(false)} />
          ) : (
            <SlMenu onClick={openMobileMenu} />
          )}
        </div>
      </ContentWrapper>
      {showSearch && (
        <div className="searchBar">
          <ContentWrapper />
          <div className="searchInput">
            <input
              type="text"
              placeholder="search for movies or TV shows..."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={handlequery}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
