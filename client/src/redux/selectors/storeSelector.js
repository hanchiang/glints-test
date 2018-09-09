
// moment returns: 0 = sunday, 1 = monday, 6 = saturday
// backend's format: 0 = monday, 1 = tuesday, 6 = sunday
const correctDayOrder = (day) => {
  if (day === 0) {
    return 6;
  } else {
    return day -1;
  }
}

const getVisibleStores = (stores, filterDate) => {
  if (filterDate == null) return stores;

  const filterDay = correctDayOrder(filterDate.day());
  const filterTime = filterDate.hour() * 100 + filterDate.minute();

  let toInclude;
  const result = stores.filter(store => {
    toInclude = false;

    for (const timeslot of store.timeslots) {
      if (!timeslot.days.includes(filterDay)) continue;

      const [startTime, endTime] = timeslot.time;
      if (filterTime >= startTime && filterTime <= endTime) {
        toInclude = true;
      }

      // If filter time is am, check for both current day am, and the next day am
      else if (filterTime >= 0 && filterTime <= 1159) {
        if ((filterTime + 2400 >= startTime && filterTime + 2400 <= endTime)) {
          toInclude = true;
        }
      }

      if (toInclude) break;
    }
    return toInclude;
  })
  

  return result;
}

export default getVisibleStores;