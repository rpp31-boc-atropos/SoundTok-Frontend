import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useClickOutside } from 'react-click-outside-hook';
// import {} from './hashtag.json';
// import {} from './users.json';

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  width: 34em;
  height: 1.8em;
  background-color: var(--main-color-blue-light);
  border-radius: 20px;
  box-shadow: 0px 2px 12px 3px rgba(0, 0, 0, 0.14);
`;

const SearchInputContainer = styled.div`
  width: 100%;
  min-height: 1.5em;
  display: flex;
  align-items: center;
  position: relative;
  padding: 2px 15px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 100%;
  outline: none;
  border: none;
  font-size: 15px;
  color: #12112e;
  font-weight: 200;
  border-radius: 6px;
  background-color: transparent;
  &:focus {
    outline: none;
    &::placeholder {
      opacity: 0;
    }
    color: #FFFFFF;
  }
  &::placeholder {
    color: #bebebe;
    transition: all 250ms ease-in-out;
  }
`;

const SearchIcon = styled.span`
  color: #bebebe;
  font-size: 15px;
  margin-right: 10px;
  margin-top: 2px;
  vertical-align: middle;
`;

const CloseIcon = styled(motion.span)`
  color: #bebebe;
  font-size: 15px;
  margin-right: 20px;
  margin-top: 2px;
  vertical-align: middle;
  transition: all 200ms ease-in-out;
  cursor: pointer;
  &:hover {
    color: #dfdfdf;
  }
`;

const containerVariants = {
  expanded: {
    height: '20em',
    zIndex: '100',
    // top: '10px'
  },
  collapsed: {
    height: '1.8em',
  },
};
const containerTransition = { type: 'spring', damping: 22, stiffness: 150};

const Search = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();
  const inputRef = useRef();

  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(()=> {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);

  return (
    <SearchBarContainer
      animate={isExpanded? 'expanded': 'collapsed'}
      variants={containerVariants}
      transition={containerTransition}
      ref={parentRef}>
      <SearchInputContainer>
        <SearchIcon>
          <IoSearch/>
        </SearchIcon>

        <SearchInput
          placeholder='Search @users and #hashtags'
          onFocus={expandContainer}
          ref={inputRef}/>
        <CloseIcon onClick={collapseContainer}>
          <IoClose/>
        </CloseIcon>

      </SearchInputContainer>
    </SearchBarContainer>
    // <div className='search-bar' >
    //   <input
    //     type='text'
    //     placeholder='Search users and hashtags'
    //     onChange={onChange}
    //   />
    //   <button className="search-btn" aria-label="Search">
    //     <i className="fa fa-search"></i>
    //   </button>
    // </div>
  );
};


export default Search;