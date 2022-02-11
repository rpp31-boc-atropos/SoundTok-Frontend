import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import styled from 'styled-components';

const Overlay = styled.div`
  display: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  height: 100vh;
`;

const Button = styled.button`
  min-width: 100px;
  padding: 16px 32px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px
  cursor: pointer;
`;

const BioModal = ({ isOpen, currentBio, handleUpdateBio, closeModal }) => {

  const [tempBio, setTempBio] = useState('');

  const handleChange = (e) => {
    setTempBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateBio(tempBio);
    closeModal();
  };

  return (
    <>
      {isOpen ?
        <React.Fragment>
          <Overlay>
            <form>
              <div>
                <Button onClick={() => closeModal()}>X</Button>
              </div>
              <div>
                <label>Please update your biography below</label>
                <input type="text" name="summary" placeholder={currentBio} onChange={handleChange}></input>
              </div>
              <input type="submit" value="Update" onClick={handleSubmit}></input>
            </form>
          </Overlay>
        </React.Fragment>
        : null
      }
    </>
  );
};

export default BioModal;