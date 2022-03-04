import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useClickOutside } from 'react-click-outside-hook';
import MoonLoader from 'react-spinners/MoonLoader';
import useDebounce from './debounceHook.jsx';
import axios from 'axios';
import { Link } from 'react-router-dom';

const SearchBarContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  position: fixed;
  left: 50%;
  margin-top: 0.1em;
  margin-left: -17em;
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
  color: white;
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

const LineSeperator = styled.span`
  display: flex;
  min-width: 100%;
  min-height: 2px;
  background-color: #d8d8d878;
`;

const SearchContent = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding: 1em;
  overflow-y: auto;
`;

const LoadingWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WarningMessage = styled.span`
  color: #a1a1a1;
  font-size: 14px;
  display: flex;
  align-self: center;
  justify-self: center;
`;

const containerVariants = {
  expanded: {
    height: '12em',
    zIndex: '100',
    marginTop: '10.4em'
  },
  collapsed: {
    marginTop: '0.2em',
    height: '1.8em',
  },
};

const containerTransition = { type: 'Tween', damping: 20, stiffness: 150, bounce: 0 };


const SearchBar = () => {
  const [isExpanded, setExpanded] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [parentRef, isClickedOutside] = useClickOutside();

  const inputRef = useRef();


  const changeHandler = (e) => {
    e.preventDefault();
    setSearchQuery(e.target.value);
  }
  const expandContainer = () => {
    setExpanded(true);
  };

  const collapseContainer = () => {
    setExpanded(false);
    setSearchQuery("");
    setResults([]);
    setNoResult(false);
    setLoading(false);
    // setIsUserSearch(false);
    setIsEmpty(true);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(()=> {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);


  const searchAction = async () => {

    if (!searchQuery || searchQuery.trim() === "") {
      return;
    }

    setLoading(true);

    let URL = '';
    let query = searchQuery.replace(/#|@/, '');
    console.log(query)
    if (searchQuery[0] == '@') {
      URL = `https://api.soundtok.live/getUserSearch?search=${query}`
    } else {
      URL = `https://api.soundtok.live/getHashtags?search=${query}`
    }

    // get response from API
    let response = await axios.get(URL).catch((err) => {
      console.log("Error: ", err)
    })
    console.log(response.data)

    if (response) {
      if (response.data && response.data.length == 0) {
        setNoResult(true);
        setIsEmpty(true);
      } else {
        setNoResult(false);
        setIsEmpty(false);
      }

      if (searchQuery[0]=='@') {
        setResults(response.data.map(each => each['username'].replace(/#|@/, '')));
      } else {
        setResults(response.data.map(each => each['txt'].replace(/#|@/, '')))
      }

    }

    setLoading(false);
  }

  useDebounce(searchQuery, 500, searchAction)


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
          onChange={changeHandler}
          ref={inputRef}/>
          <CloseIcon onClick={collapseContainer}>
            <IoClose/>
          </CloseIcon>

      </SearchInputContainer >
      {isExpanded && <LineSeperator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color="#000" size={20} />
            </LoadingWrapper>
          )}

          {!isLoading && isEmpty && !noResult && (
            <LoadingWrapper>
              <WarningMessage>Start typing to Search</WarningMessage>
            </LoadingWrapper>
          )}

          {!isLoading && isEmpty && noResult && (
             <LoadingWrapper>
                <WarningMessage>No match results</WarningMessage>
             </LoadingWrapper>
          )}

          {!isLoading && !isEmpty && !noResult && (
            <>
              {results.map((result, index) => {return (
                  (searchQuery[0]=='@') ?
                   <Link key={index} to={`/profile/${result}`} > @{result} </Link>
                  :
                  <Link key={index} to={`/hashtag?q=${result}`} > #{result} </Link>
                  // <Hashtag key={index} text={`#${result}`} ></Hashtag>
              )})}
            </>
          )}


        </SearchContent>
      )}
    </SearchBarContainer>

  );
};


export default SearchBar;