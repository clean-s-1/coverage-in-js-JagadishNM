const alerts = require('../typewise-alert');
const {expect} = require('chai');

describe("inferBreach", () => {

it('infers a value lower than the minimum as TOO_LOW', () => {
  expect(alerts.inferBreach(20, 50, 100)).equals('TOO_LOW');
});

it('infers a value higher than the maximum as TOO_HIGH', () => {
  expect(alerts.inferBreach(100, 50, 70)).equals('TOO_HIGH');
});

it('infers a value within the range as NORMAL', () => {
  expect(alerts.inferBreach(60, 50, 100)).equals('NORMAL');
});

})

describe("classifyTemperatureBreach", () => {
  it("Classify temperature breach with PASSIVE_COOLING type to return TOO_LOW for a value lower than the minimum", () => {
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', -20))
    .equals("TOO_LOW");
  });

  it("Classify temperature breach with PASSIVE_COOLING type to return TOO_HIGH for a value lower than the maximum", () => {
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 50))
    .equals("TOO_HIGH");
  });

  it("Classify temperature breach with PASSIVE_COOLING type to return NORMAL for a value between minimum and maximum", () => {
    expect(alerts.classifyTemperatureBreach('PASSIVE_COOLING', 20))
    .equals("NORMAL");
  });

  it("Classify temperature breach with HI_ACTIVE_COOLING type to return TOO_LOW for a value lower than the minimum", () => {
    expect(alerts.classifyTemperatureBreach('HI_ACTIVE_COOLING', -2))
    .equals("TOO_LOW");
  });

  it("Classify temperature breach with HI_ACTIVE_COOLING type to return TOO_HIGH for a value lower than the maximum", () => {
    expect(alerts.classifyTemperatureBreach('HI_ACTIVE_COOLING', 48))
    .equals("TOO_HIGH");
  });

  it("Classify temperature breach with HI_ACTIVE_COOLING type to return NORMAL for a value between minimum and maximum", () => {
    expect(alerts.classifyTemperatureBreach('HI_ACTIVE_COOLING', 30))
    .equals("NORMAL");
  });

  it("Classify temperature breach with MED_ACTIVE_COOLING type to return TOO_LOW for a value lower than the minimum", () => {
    expect(alerts.classifyTemperatureBreach('MED_ACTIVE_COOLING', -5))
    .equals("TOO_LOW");
  });

  it("Classify temperature breach with MED_ACTIVE_COOLING type to return TOO_HIGH for a value lower than the maximum", () => {
    expect(alerts.classifyTemperatureBreach('MED_ACTIVE_COOLING', 45))
    .equals("TOO_HIGH");
  });

  it("Classify temperature breach with MED_ACTIVE_COOLING type to return NORMAL for a value between minimum and maximum", () => {
    expect(alerts.classifyTemperatureBreach('MED_ACTIVE_COOLING', 20))
    .equals("NORMAL");
  });

});

describe("checkAndAlert", () => {

})
