import formatCurrency from './helper';

const impact = (data) => {
  //   challenge 1
  const currentlyInfected = data.reportedCases * 10;

  //   calculate estimated number of infected based on period type
  const getEstimatedNumberOfInfected = () => {
    if (data.periodType === 'weeks') {
      return 2 ** Math.round((data.timeToElapse * 7) / 3);
    } if (data.periodType === 'months') {
      return 2 ** Math.round((data.timeToElapse * 30) / 3);
    }
    return 2 ** Math.round(data.timeToElapse / 3);
  };

  const infectionsByRequestedTime = currentlyInfected * getEstimatedNumberOfInfected();
  //   challenge 2
  const severeCasesByRequestedTime = Math.round(
    (15 / 100) * infectionsByRequestedTime
  );
  const hospitalBedsByRequestedTime = Math.round(
    data.totalHospitalBeds - (35 / 100) * severeCasesByRequestedTime
  );
  //   challenge 3
  const casesForICUByRequestedTime = Math.round(
    (5 / 100) * infectionsByRequestedTime
  );
  const casesForVentilatorsByRequestedTime = Math.round(
    (2 / 100) * infectionsByRequestedTime
  );
  const dollarsInFlight = formatCurrency.format(infectionsByRequestedTime
    * data.region.avgDailyIncomePopulation
    * data.region.avgDailyIncomeInUSD
    * 30);

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

export default impact;
