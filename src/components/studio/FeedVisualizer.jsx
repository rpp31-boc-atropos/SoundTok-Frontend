import React, { useState, useEffect, useRef } from 'react';
import { OuterBox, Canvas } from './Styles/styles';

const FeedVisualizer = () => {


  const canvasRef = useRef();
  let width = 550;
  let height = 200;
  let audioSource;
  let analyser;
  let ctx;
  let audioCtx;
  // let audio;

  const [audio, setAudio] = useState('');

  const [flag, setFlag] = useState(false);


  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
    setAudio(document.getElementById('audio'));
  });

  const PlayerStarted = () => {
    console.log(flag);
    audio.play();
  };

  const Visuals = () => {

    console.log('audioSource', audioSource);
    console.log('audioCTX', audioCtx);
    setFlag(true);
    console.log('audio.src', audio.src);

    console.log('flag', flag);



    audioCtx = audioCtx || new AudioContext();

    audioSource = audioSource || audioCtx.createMediaElementSource(audio);
    audioSource.disconnect(audioCtx);

    analyser = audioCtx.createAnalyser();
    audioSource.connect(analyser);
    analyser.connect(audioCtx.destination);
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    const barWidth = width / bufferLength;
    let barHeight;
    let x;

    const Animate = () => {
      x = 0;
      ctx.clearRect(0, 0, width, height);
      analyser.getByteFrequencyData(dataArray);

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i];
        ctx.fillStyle = 'rgb(255, 250, 206)';
        ctx.fillRect(x, height - barHeight + 25, barWidth, barHeight);

        x += barWidth;
      }

      requestAnimationFrame(Animate);
    };

    audio.play();
    Animate();


  };

  return (
    <OuterBox>
      <h4>Feed Visualizer</h4>
      <Canvas ref={canvasRef} ></Canvas>
      {flag ? <button onClick={PlayerStarted}>Play Button</button> : <button onClick={Visuals}>Play Button</button>}
    </OuterBox>
  );

};

export default FeedVisualizer;



