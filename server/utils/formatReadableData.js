
const mapDaytoString = {
  0: 'Mon',
  1: 'Tue',
  2: 'Wed',
  3: 'Thu',
  4: 'Fri',
  5: 'Sat',
  6: 'Sun'
}

const getHour = (time) => {
  const hour = Math.floor(time / 100);
  let result;
  if (hour === 0 || hour === 24) {
    result = 12;
  } else if (hour > 24) {
    result = hour - 24;
  } else if (hour > 12) {
    result = hour - 12;
  } else {
    result = hour;
  }
  return result;
}

const getMinute = (time) => {
  let minute = time % 100;
  if (minute < 10) {
    minute = '0' + minute;
  }
  return minute;
}

const getHourAndNonZeroMinuteString = (time) => {
  let hour = getHour(time);
  let minute = getMinute(time);
  return `${hour}.${minute}`;
}

const handleTimeHelper = (time) => {
  let result = '';

  // Between 12am(0000) to 11.59am same day
  if (time >= 100 && time <= 1159) {
    if (time % 100 !== 0) {
      result = getHourAndNonZeroMinuteString(time) + 'am';
    } else {
      result = getHour(time) + 'am';
    }
  }
  // Between 12 pm to 11.59pm same day
  else if (time >= 1200 && time <= 2359) {
    if (time % 100 !== 0) {
      result = getHourAndNonZeroMinuteString(time) + 'pm';
    } else {
      result = getHour(time) + 'pm';
    }
  }
  // From 12.00am next day onwards
  else if (time >= 2400) {
    if (time % 100 !== 0) {
      result = getHourAndNonZeroMinuteString(time) + 'am';
    } else {
      result = getHour(time) + 'am';
    }
  }
  return result;
}

// time - array of start and end time e.g.[830, 1350] | [1433, 2355] | [1222, 2453]
//   possible range: 0(12am same day) - 3559(11.59am next day).
// Returns human readable time e.g. 8.30am - 1.50pm 
const handleTime = (time) => {
  let result = '';
  const [startTime, endTime] = time;
  result = handleTimeHelper(startTime) + ' - ' + handleTimeHelper(endTime);
  return result;
}

// days - array of ints e.g. [0, 1, 2] | [0, 2, 3]
// Returns human readable format e.g. Mon-Wed | Mon, Wed-Thu
const handleDay = (days) => {
  let prev, curr;
  let result = '';
  let fromIndex = 0;
  let toIndex;

  if (days.length === 1) {
    result = mapDaytoString[days[0]];
  } else {
    prev = days[0];

    for (i = 1; i < days.length; i++) {
      curr = days[i];

      // Keep going
      if (curr - prev === 1) {
        toIndex = i;
      } else {
        // Write intermediate result
        if (curr - prev > 1) {
          // Day range
          if (typeof toIndex === 'number') {
            result = result + mapDaytoString[days[fromIndex]] + '-' + mapDaytoString[days[toIndex]] + ', ';
            toIndex = undefined;
          } else {
            // Single day
            result = result + mapDaytoString[days[fromIndex]] + ', ';
          }
          fromIndex = i;
        } 
      }
      prev = curr;
    }

    // Two cases:
    // 1. fromIndex is at the last element and toIndex is undefined. e.g. [0, 1, 4, 6]
    // 2. fromIndex is at the 2nd last element(or before), and toIndex is at the last element. e.g. [0, 1, 5, 6]
    if (typeof toIndex === 'undefined') {
      result = result + mapDaytoString[days[fromIndex]]
    } else if (toIndex === days.length - 1) {
      result = result + mapDaytoString[days[fromIndex]] + '-' + mapDaytoString[days[toIndex]];
    }
  }
  return result;
}

module.exports = (stores) => {
  const results = [];
  let result = {};
  let timings = [];

  for (const store of stores) {
    result = {};
    timings = [];
    result._id = store._id;
    result.name = store.name;
    result.slug = store.slug;
    result.timeslots = store.timeslots;

    // timings: an array of string `${day}, ${time}`
    for (const timeslot of store.timeslots) {
      const day = handleDay(timeslot.days);
      const time = handleTime(timeslot.time);
      timings.push(`${day}, ${time}`);
    }
    result.timings = timings;
    results.push(result)
  }
  return results;
}