import React, {useState, useEffect, useRef} from 'react';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { IoClose, IoSearch } from 'react-icons/io5';
import { useClickOutside } from 'react-click-outside-hook';
import MoonLoader from 'react-spinners/MoonLoader';
import useDebounce from './debounceHook.jsx';
import axios from 'axios';
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
  const [isLoading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [noResult, setNoResult] = useState(false)
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
    setNoResult(true);
    setLoading(false);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(()=> {
    if (isClickedOutside) {
      collapseContainer();
    }
  }, [isClickedOutside]);

  const prepareSearchQuery = (query) => {
    const url = `https://api.soundtok.live/hashtag?q=${query}`
    return encodeURI(url);
  }

  const searchAction = async () => {
    console.log('triggered search', searchQuery)
    if(!searchQuery || searchQuery.trim() === "")
      return;
    setLoading(true);
    const URL = prepareSearchQuery(searchQuery)
    // request data here
    // const response = await axios.get(URL).catch((err) => {
    //   console.log("Error: ", err)
    // })
    const response = {}
    response.data = ['test', 'test case','another test']

    if (response) {
      console.log("Response", response.data)
      if (response.data && response.data.length == 0) {
        setNoResult(true);
      }
      setResults(response.data);
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

      </SearchInputContainer>
      {isExpanded && <LineSeperator />}
      {isExpanded && (
        <SearchContent>
          {isLoading && (
            <LoadingWrapper>
              <MoonLoader loading color="#000" size={20} />
            </LoadingWrapper>
          )}

          {!isLoading && (
            <>
              {results.map(
                (result, index) => {
                return (
                  <div key={ index }>
                    {result}
                  </div>
                )}
              )}
            </>
          )}
        </SearchContent>
      )}
    </SearchBarContainer>

  );
};


export default Search;