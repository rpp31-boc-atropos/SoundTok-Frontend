import * as Tone from 'tone';

const ReverbFunc = () => {
  return function (graphEnd, masterGainNode) {
    var effects = new Tone.Reverb(1.2);

    Tone.connect(graphEnd, effects);
    Tone.connect(effects, masterGainNode);

    return function cleanup() {
      effects.disconnect();
      effects.dispose();
    };
  };
};

export default ReverbFunc;