import styled from 'styled-components';
import { FaVolumeDown, FaVolumeUp, FaArrowsAltH, FaUpload, FaGripLinesVertical } from "react-icons/fa";
import { BsPlayCircleFill, BsFillPauseCircleFill, BsStopBtnFill } from "react-icons/bs";
import { MdOutlineFastForward, MdOutlineFastRewind } from "react-icons/md";



export const OuterBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Canvas = styled.canvas`
  border-radius: 20px;
  // background-color: pink;
  width: 500px;
  height: 100px;
`;

export const ButtonSeparator = styled.div`
  display: flex;
  justify-content: space-between;
  width: 250px;
  border: 2px solid white;
  margin-top: 20px;
  padding: 20px 20px;
`;

export const StudioWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 1700px;
  height: 830px;
  border: 2px solid rgb(255, 250, 206);
`;

export const StudioHeader = styled.div`
  display flex;
  width 1700px;
  height 65px;
  border-bottom: 2px solid rgb(255, 250, 206);
  align-items: center;
  justify-content: space-between;
`;

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Header = styled.h3`
  color: rgb(255, 250, 206);
  margin-left: 10px;
  // transition: -webkit-transform 0.2s;
	// transition: transform 0.2s;
	// transition: transform 0.2s, -webkit-transform 0.2s;
  // &:hover {
  //   -webkit-transform: scale(1.5);
	//   transform: scale(1.5);
  // }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  width: 300px;
  height: 40px;
  margin-right: 5px;
`;

export const Button1 = styled.button`
  color: rgb(255, 250, 206);
  border: 2px solid rgb(255, 250, 206);
  // display:inline-block;
  padding: 0 1em;
  font-size: 14px;
  // margin: 0px 5px;
  border-radius:0.52em;
  box-sizing: border-box;
  text-decoration:none;
  text-align:center;
  transition: all 0.3s;

  &:hover {
    background-color: rgb(255, 250, 206);
    color: black;
  }
`;

export const EditorWrapper = styled.div`
  display: flex;
  height: 700px;
  width: 1700px;
  border-bottom: 2px solid rgb(255, 250, 206);
`;

export const ControlBarWrapper = styled.div`
  width: 1700px;
  height 60px;
  display: flex;
  justify-content: felx-start;
`;

export const PlayerControls = styled.div`
  display: flex;
  justify-content: center;
  width: 960px;
`;

export const LeftPanel = styled.div`
  height: 700px;
  width: 350px;
  border-right: 2px solid rgb(255, 250, 206);
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const AddAudioTrackWrapper = styled.div`
  height: 61px;
  width: 350px;
  // border-bottom: 2px solid rgb(255, 250, 206);
  border-right: 2px solid rgb(255, 250, 206);
  display: flex;
  justify-content: center;
  align-items: center;
`;



export const RightPanel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 700px;
  width: 369px;
  border-left: 2px solid rgb(255, 250, 206);
`;

export const DraftTitle = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 373px;
  // padding-bottom: 15px;
  height: 50px;
  border-bottom: 2px solid rgb(255, 250, 206);
`;

export const DraftWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  margin-top: 8px;
  width: 369px;
  height: auto;
  // border-top: 2px solid rgb(255, 250, 206);
`;

export const Draft = styled.div`
  margin: 8px 0;
  border: 2px solid rgb(255, 250, 206);
  padding: 0.25em 0.5em;

  transition: -webkit-transform 0.2s;
	transition: transform 0.2s;
	transition: transform 0.2s, -webkit-transform 0.2s;
  &:hover {
    -webkit-transform: scale(1.5);
	  transform: scale(1.5);
    cursor: pointer;
    background-color: purple;
  }
`;



export const MidPanel = styled.div`
  height: 700px;
  width: 1340px;
`;

export const Controls = styled.div`
  display: flex;
  width: 200px;
`;

export const PlayWaveSurferButton = styled.button`
  width: 70px;
  padding: 0.5em 0.5em;
  margin-right: 5px;
`;


export const VolumeDown = styled(FaVolumeDown)`
  color purple;
  margin-right: 55px;
  margin-top: 5px;
  font-size: 20px;
`;

export const VolumeUp = styled(FaVolumeUp)`
  color: purple;
  margin-left: 55px;
  margin-top: 5px;
  font-size: 20px;
`;

export const Pause = styled(BsFillPauseCircleFill)`
  color purple;
  font-size: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const Play = styled(BsPlayCircleFill)`
  color purple;
  font-size: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const Stop = styled(BsStopBtnFill)`
  color purple;
  font-size: 35px;

  &:hover {
    cursor: pointer;
  }
`;

export const Rewind = styled(MdOutlineFastRewind)`
  color purple;
  font-size: 40px;

  &:hover {
    cursor: pointer;
  }
`;

export const FastForward = styled(MdOutlineFastForward)`
  color purple;
  font-size: 40px;

  &:hover {
    cursor: pointer;
  }
`;

export const AllButtons = styled.div`
  height: 60px;
  width 560px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  // border: 2px solid red;
`;

export const EffectButton = styled.div`
  border: 2px solid rgb(255, 250, 206);
  padding: 0.25em 0.5em;
  // width: 100px;
  margin: 0 5px;

  &:hover {
    background-color: rgb(255, 250, 206);
    color: black;
    cursor: pointer;
  }
`;

export const MoveAudio = styled(FaArrowsAltH)`
  color purple;
  font-size: 30px;

  &:hover {
    cursor: pointer;
  }
`;

export const Highligther = styled(FaGripLinesVertical)`
  color purple;
  font-size: 25px;

  &:hover {
    cursor: pointer;
  }
`;

export const UploadIcon = styled(FaUpload)`
  margin-top: 5px;
  margin-right: 10px;
  color purple;
  font-size: 25px;

  &:hover {
    cursor: pointer;
  }
`;
