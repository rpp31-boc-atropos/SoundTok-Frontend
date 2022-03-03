import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import styled from 'styled-components';
const axios = require('axios'); //comment out once app is working

const Overlay = styled.div`
  display: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  height: 100vh;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
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
//comment out once app is working
const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const BioModal = ({ isOpen, currentBio, handleUpdateProfile, closeModal, profilePicture }) => {

  const [tempBio, setTempBio] = useState(currentBio);
  const [imageSelected, setImageSelected] = useState(profilePicture);

  const handleChange = (e) => {
    setTempBio(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleUpdateProfile(imageSelected, tempBio);
    closeModal();
  };

  return (
    <>
      {isOpen ?
        <React.Fragment>
          <Overlay>
            <form>
              <ButtonWrapper>
                <Button onClick={() => closeModal()}>X</Button>
              </ButtonWrapper>
              <div>
                <input type="file" onChange={(event) => { setImageSelected(event.target.files[0]); }} />
                {/* <button onClick={uploadImage}> Upload Image</button> */}
              </div>
              <div role='bioInstructions'>
                <label>Please update your biography below</label>
              </div>
              <div>
                <input type="text" name="summary" size="60" placeholder={currentBio} onChange={handleChange}></input>
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