import * as React from 'react';
import styled from 'styled-components';

const FeedVisualizer = (props) => {
  const analyserCanvas = React.useRef(null);

  const audioTest = async () => {
    if (navigator.mediaDevices.getUserMedia !== null) {
      const options = {
        video: false,
        audio: true,
      };
      try {
        const stream = await navigator.mediaDevices.getUserMedia(options);
        const audioCtx = new AudioContext();
        const analyser = audioCtx.createAnalyser();
        analyser.fftSize = 2048;
        const audioSrc = audioCtx.createMediaStreamSource(stream);
        audioSrc.connect(analyser);
        const data = new Uint8Array(analyser.frequencyBinCount);

      } catch (err) {
        console.log({err})
      }
    }
  }

  const ctx = analyserCanvas.current.getContext('2d');
  const draw = (dataParm: any) => {
    dataParm = [...dataParm];
    ctx.fillStyle = 'white';  //white background
    ctx.lineWidth = 2; //width of candle/bar
    ctx.strokeStyle = '#d5d4d5'; //color of candle/bar
    const space = analyserCanvas.current.width / dataParm.length;
    dataParm.forEach((value: number, i: number) => {
        ctx.beginPath();
        ctx.moveTo(space * i, analyserCanvas.current.height); //x,y
        ctx.lineTo(space * i, analyserCanvas.current.height - value); //x,y
        ctx.stroke();
    });
  };

  const loopingFunction = () => {
    requestAnimationFrame(loopingFunction);
    analyser.getByteFrequencyData(data);
    draw(data);
  };

  requestAnimationFrame(loopingFunction);

  return (
    <>
      <canvas ref={analyserCanvas} className=""></canvas>
    </>
  );

};

export default FeedVisualizer;