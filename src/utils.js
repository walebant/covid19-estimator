// normalise time to elapse in days based on period type
export const getTimeToElapse = (data) => {
  if (data.periodType === 'weeks') {
    return data.timeToElapse * 7;
  }
  if (data.periodType === 'months') {
    return data.timeToElapse * 30;
  }
  return data.timeToElapse;
};

//   get estimated number of infected based on period type
export const getEstimatedNumberOfInfected = (data) => {
  if (data.periodType === 'days') {
    if (data.timeToElapse > 2) return 2 ** Math.trunc(data.timeToElapse / 3);
  } else {
    return 2 ** Math.trunc(getTimeToElapse(data) / 3);
  }
  return data.timeToElapse;
};
