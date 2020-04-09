import { getEstimatedNumberOfInfected, getTimeToElapse } from './utils';

const severeImpact = (data) => {
  //   challenge 1
  const currentlyInfected = data.reportedCases * 50;
  const infectionsByRequestedTime = currentlyInfected * getEstimatedNumberOfInfected(data);

  //   challenge 2
  const severeCasesByRequestedTime = Math.trunc(
    (15 / 100) * infectionsByRequestedTime
  );
  const hospitalBedsByRequestedTime = Math.trunc(
    data.totalHospitalBeds - ((35 / 100) * severeCasesByRequestedTime)
  );

  //   challenge 3
  const casesForICUByRequestedTime = Math.trunc(
    (5 / 100) * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = Math.trunc(
    (2 / 100) * infectionsByRequestedTime
  );

  const dollarsInFlight = (
    infectionsByRequestedTime
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD
    * getTimeToElapse(data)
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
