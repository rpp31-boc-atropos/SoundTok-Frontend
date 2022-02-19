import { DateTime } from 'luxon';

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
  parseTags: (text) => {
    const regex = /#[^\s]*/g;
    const tags = [];

    // eslint-disable-next-line no-constant-condition
    while (true) {
      const match = regex.exec(text);
      if (match) {
        const [tag] = match;
        tags.push({[tag]: match.index});
      } else {
        return tags;
      }
    }
  },
  isoToTimeAgo: (isoString) => {
    const timeUnits = [
      'years',
      'months',
      'days',
      'hours',
      'minutes',
      'seconds',
    ];
    const displayUnits = ['y', 'mo', 'd', 'h', 'm', 's'];

    const start = DateTime.fromISO(isoString);
    const end = DateTime.now();
    const diff = end.diff(start, timeUnits).toObject();

    for (let i = 0; i < timeUnits.length; i++) {
      const unit = timeUnits[i];
      const displayUnit = displayUnits[i];
      if (diff[unit] > 0) {
        const time = Math.floor(diff[unit]) + displayUnit;
        return time;
      }
    }
  }
};
