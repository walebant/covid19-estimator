import { getEstimatedNumberOfInfected, getTimeToElapse } from './utils';

const severeImpact = (data) => {
  //   challenge 1
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * getEstimatedNumberOfInfected(data);

  //   challenge 2
  const severeCasesByRequestedTime = Math.trunc(0.15 * infectionsByRequestedTime);
  const hospitalBedsByRequestedTime = Math.trunc(
    (0.35 * data.totalHospitalBeds) - severeCasesByRequestedTime
  );

  //   challenge 3
  const casesForICUByRequestedTime = Math.trunc(0.05 * infectionsByRequestedTime);
  const casesForVentilatorsByRequestedTime = Math.trunc(0.02 * infectionsByRequestedTime);

  const dollarsInFlight = parseFloat(
    (infectionsByRequestedTime
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD
    * getTimeToElapse(data)).toFixed(2)
  );


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
