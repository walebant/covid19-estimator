//   get estimated number of infected based on period type
export const getEstimatedNumberOfInfected = (data) => {
  if (data.periodType === 'days') {
    if (data.timeToElapse > 3) return 2 ** Math.trunc(data.timeToElapse / 3);
  }
  if (data.periodType === 'weeks') {
    return 2 ** Math.trunc((data.timeToElapse * 7) / 3);
  }
  if (data.periodType === 'months') {
    return 2 ** Math.trunc((data.timeToElapse * 30) / 3);
  }
  return data.timeToElapse;
};


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
