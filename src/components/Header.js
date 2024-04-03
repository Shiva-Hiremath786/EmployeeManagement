import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { RiLogoutBoxLine } from 'react-icons/ri';
import { RxAvatar } from 'react-icons/rx';
import './Header.css';

const Header = ({ user, onLogout, setSearchQuery }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearchInputChange = (e) => {
    setSearchInput(e.target.value);
    console.log('Search Input:', e.target.value); 
    setSearchQuery(e.target.value); 
  };

  console.log('Search Query:', searchInput); 

  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-links">
          <li className="nav-item">
            <input
              type="text"
              placeholder="Search"
              className="search-bar"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
          </li>
          <li className="nav-item">
            <Link to="/" className="nav-link" onClick={onLogout}>
              <RiLogoutBoxLine className="icon" /> Logout
            </Link>
          </li>
          <li className="nav-item">
            <RxAvatar className="avatar" />
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
