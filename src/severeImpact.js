const severeImpact = (data) => {
  //   challenge 1
  const currentlyInfected = data.reportedCases * 50;

  //   get estimated number of infected based on period type
  const getEstimatedNumberOfInfected = () => {
    if (data.periodType === 'weeks') {
      return 2 ** Math.trunc((data.timeToElapse * 7) / 3);
    }
    if (data.periodType === 'months') {
      return 2 ** Math.trunc((data.timeToElapse * 30) / 3);
    }
    return 2 ** Math.trunc(data.timeToElapse / 3);
  };

  const infectionsByRequestedTime = currentlyInfected * getEstimatedNumberOfInfected();

  //   challenge 2
  const severeCasesByRequestedTime = Math.trunc(
    (15 / 100) * infectionsByRequestedTime
  );
  const hospitalBedsByRequestedTime = Math.trunc(
    data.totalHospitalBeds - (35 / 100) * severeCasesByRequestedTime
  );

  //   challenge 3
  const casesForICUByRequestedTime = Math.trunc(
    (5 / 100) * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = Math.trunc(
    (2 / 100) * infectionsByRequestedTime
  );

  // normalise time to elapse in days based on period type
  const getTimeToElapse = () => {
    if (data.periodType === 'weeks') {
      return data.timeToElapse * 7;
    }
    if (data.periodType === 'months') {
      return data.timeToElapse * 30;
    }
    return data.timeToElapse;
  };

  const dollarsInFlight = (
    infectionsByRequestedTime
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD
    * getTimeToElapse()
  ).toFixed(2);

  return {
    currentlyInfected,
    infectionsByRequestedTime,
    severeCasesByRequestedTime,
    hospitalBedsByRequestedTime,
    casesForICUByRequestedTime,
    casesForVentilatorsByRequestedTime,
    dollarsInFlight
  };
};

export default severeImpact;
