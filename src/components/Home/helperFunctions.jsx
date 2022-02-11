let helpers;
export default helpers = {
  secondsToLength: (seconds) => {
    let length;
    if (seconds < 60) {
      length = seconds + 's';
    } else {
      let min = Math.floor(seconds / 60);
      let sec = Math.floor(seconds % 60);

      if (sec < 10) {
        sec = '0' + sec;
      }

      length = min + ':' + sec;
    }

    return length;
  },
};
