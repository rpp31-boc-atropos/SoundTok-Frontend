import React from 'react';
import './SearchBar.css';

const Search = ({onChange}) => {
  return (
    <div className='search-bar' >
      <input
        type='text'
        placeholder='Search users and hashtags'
        onChange={onChange}
      />
      <button className="search-btn" aria-label="Search">
        <i className="fa fa-search"></i>
      </button>

    </div>
  );
};


export default Search;