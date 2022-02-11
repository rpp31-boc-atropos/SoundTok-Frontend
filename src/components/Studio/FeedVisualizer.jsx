import React, { useState, useEffect, useRef } from 'react';
import song from '../../../song.mp3';
import { OuterBox, Canvas } from './Styles/styles';

const FeedVisualizer = () => {


  const canvasRef = useRef();
  let width = 550;
  let height = 200;
  let audioSource;
  let analyser;
  let ctx;

  useEffect(() => {
    const canvas = canvasRef.current;
    ctx = canvas.getContext('2d');
  });

  const Bars = () => {
    const audio = document.querySelector('audio');
    const audioCtx = new AudioContext();
    // console.log('audio: ', audio)
    audio.play();
    audioSource = audioCtx.createMediaElementSource(audio);
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
        ctx.fillStyle = 'white';
        ctx.fillRect(x, height - barHeight + 25, barWidth, barHeight);
        x += barWidth;
      }

      requestAnimationFrame(Animate);
    };
    Animate();
  };

  return (
    <OuterBox>
      <h4>Feed Visualizer</h4>
      <Canvas ref={canvasRef} onClick={Bars}>

      </Canvas>
    </OuterBox>
  );

};

export default FeedVisualizer;



