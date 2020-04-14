// sdg challenge 1

const dataInput = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614
};

let dataParsed;

const covid19ImpactEstimator = (data) => {
  const convertData = () => {
    dataParsed = data;
    return dataParsed;
  };
  convertData();

  const checkPeriod = () => {
    let period;
    if (dataParsed.periodType === 'days') {
      period = dataParsed.timeToElapse;
      return period;
    }
    if (dataParsed.periodType === 'weeks') {
      period = dataParsed.timeToElapse * 7;
      return period;
    }
    if (dataParsed.periodType === 'months') {
      period = dataParsed.timeToElapse * 30;
      return period;
    }
    return Math.trunc(period);
  };

  const impactInfectionsByRequestedTime = () => {
    const factor = Math.trunc(dataParsed.timeToElapse / 3);
    if (dataParsed.periodType === 'days') {
      return Math.trunc((dataParsed.reportedCases * 10) * (2 ** factor));
    }
    if (dataParsed.periodType === 'weeks') {
      return Math.trunc((dataParsed.reportedCases * 10)
      * (2 ** factor));
    }
    if (dataParsed.periodType === 'months') {
      return Math.trunc((dataParsed.reportedCases * 10)
      * (2 ** factor));
    }
    return Math.trunc((dataParsed.reportedCases * 10)
    * (2 ** factor));
  };

  const severeInfectionsByRequestedTime = () => {
    const factor = Math.trunc(dataParsed.timeToElapse / 3);
    if (dataParsed.periodType === 'days') {
      return Math.trunc((dataParsed.reportedCases * 50) * (2 ** factor));
    }
    if (dataParsed.periodType === 'weeks') {
      return Math.trunc((dataParsed.reportedCases * 50)
      * (2 ** factor));
    }
    if (dataParsed.periodType === 'months') {
      return Math.trunc((dataParsed.reportedCases * 50)
      * (2 ** factor));
    }
    return Math.trunc((dataParsed.reportedCases * 50)
    * (2 ** factor));
  };

  // Challenge 2

  const impactSevereCases = () => {
    const func = impactInfectionsByRequestedTime();
    return func * (15 / 100);
  };

  const severeCases = () => {
    const func = severeInfectionsByRequestedTime();
    return func * (15 / 100);
  };

  const bedsByTimeImpact = () => {
    const positivePatiantsBed = dataParsed.totalHospitalBeds * (35 / 100);
    const totalSeverePatients = impactSevereCases();
    const availableBeds = positivePatiantsBed - totalSeverePatients;
    return Math.trunc(availableBeds);
  };

  const bedsByTimeSevere = () => {
    const positivePatiantsBed = dataParsed.totalHospitalBeds * (35 / 100);
    const totalSeverePatients = severeCases();
    const availableBeds = positivePatiantsBed - totalSeverePatients;
    return Math.trunc(availableBeds);
  };

  // Challenge 3

  const casesForICUImpact = () => {
    const func = impactInfectionsByRequestedTime();
    const percentInfectionsByTime = Math.trunc(func * (5 / 100));
    return percentInfectionsByTime;
  };

  const casesForICUSevere = () => {
    const func = severeInfectionsByRequestedTime();
    const percentInfectionsByTime = Math.trunc(func * (5 / 100));
    return percentInfectionsByTime;
  };

  const reqVentilatorImpact = () => {
    const func = impactInfectionsByRequestedTime();
    const percentRequireVentitator = Math.trunc(func * (2 / 100));
    return percentRequireVentitator;
  };

  const reqVentilatorSevere = () => {
    const func = severeInfectionsByRequestedTime();
    const percentRequireVentitator = Math.trunc(func * (2 / 100));
    return percentRequireVentitator;
  };

  const moneyLossImpact = () => {
    const func = impactInfectionsByRequestedTime();
    const moneyLoss = Math.trunc((func * dataParsed.region.avgDailyIncomePopulation
    * dataParsed.region.avgDailyIncomeInUSD) / dataParsed.timeToElapse);
    return moneyLoss;
  };

  const moneyLossSevere = () => {
    const func = severeInfectionsByRequestedTime();
    const moneyLoss = Math.trunc((func * dataParsed.region.avgDailyIncomePopulation
    * dataParsed.region.avgDailyIncomeInUSD) / dataParsed.timeToElapse);
    return moneyLoss;
  };

  dataParsed.timeToElapse = checkPeriod();

  return {
    data: dataParsed,
    impact: {
      currentlyInfected: dataParsed.reportedCases * 10,
      infectionsByRequestedTime: impactInfectionsByRequestedTime(),
      severeCasesByRequestedTime: impactSevereCases(),
      hospitalBedsByRequestedTime: bedsByTimeImpact(),
      casesForICUByRequestedTime: casesForICUImpact(),
      casesForVentilatorsByRequestedTime: reqVentilatorImpact(),
      dollarsInFlight: moneyLossImpact()
    },
    severeImpact: {
      currentlyInfected: dataParsed.reportedCases * 50,
      infectionsByRequestedTime: severeInfectionsByRequestedTime(),
      severeCasesByRequestedTime: severeCases(),
      hospitalBedsByRequestedTime: bedsByTimeSevere(),
      casesForICUByRequestedTime: casesForICUSevere(),
      casesForVentilatorsByRequestedTime: reqVentilatorSevere(),
      dollarsInFlight: moneyLossSevere()
    }
  };
};

covid19ImpactEstimator(dataInput);

module.exports = covid19ImpactEstimator;

// export default covid19ImpactEstimator;
