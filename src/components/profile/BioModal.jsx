import React, { useState } from 'react';
// import ReactDom from 'react-dom';
import styled from 'styled-components';
const axios = require('axios'); //comment out once app is working

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, .5);
  height: 100vh;
`;

const Modal = styled.div`
  display: flex;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #FFF;
  padding: 30px;
  z-index: 1000;
  flex-direction: column;
  color: black;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 4px;
  border: none;
  background: #141414;
  color: #fff;
  font-size: 24px
  cursor: pointer;
`;

const Submit = styled.button`
  font-family: Helvetica, Arial, sans-serif;
  background-color: black;
  height: 40px;
  font-size: 16px;
  color: white;
  border-radius: 10px;
  padding: 10px;
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
          <Overlay></Overlay>
          <Modal>
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
              <Submit>
                <input type="submit" value="Update" onClick={handleSubmit}></input>
              </Submit>
            </form>
          </Modal>
        </React.Fragment>
        : null
      }
    </>
  );
};

export default BioModal;