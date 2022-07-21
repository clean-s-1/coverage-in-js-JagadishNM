const alerts = require('../typewise-alert');
const {expect} = require('chai');
const sinon = require('sinon');

const stub = sinon.stub();

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



describe("sendToController", () => {
  beforeEach(function() {
    if (null == this.sinon) {
      this.sinon = sinon.createSandbox();
    } else {
      this.sinon.restore();
    }
    this.sinon.stub(console, 'log');
  });
  it('sendToController with breach type with value TOO_LOW', () => {
    const breachType = 'TOO_LOW';
    alerts.sendToController(breachType);
    expect( console.log.calledOnce ).to.be.true;
    expect( console.log.calledWith('65261, TOO_LOW') ).to.be.true;
  });
})

describe("sendToEmail", () => {
  it('sendToMail with TOO_LOW', () => {
    const breachType = 'TOO_LOW';
    alerts.sendToEmail(breachType);
    expect( console.log.calledWith('To: a.b@c.com') ).to.be.true;
    expect( console.log.calledWith('Hi, the temperature is too low') ).to.be.true;
  });

  it('sendToMail with TOO_HIGH', () => {
    const breachType = 'TOO_HIGH';
    alerts.sendToEmail(breachType);
    expect(console.log.calledWith('To: a.b@c.com') ).to.be.true;
    expect(console.log.calledWith('Hi, the temperature is too high')).to.be.true;
  });
})

describe("checkAndAlert", () => {
  it('checkAndAlert  with TO_CONTROLLER', () => {
    const mockAlertTarget = 'TO_CONTROLLER';
    const mockTemperatureInc = 30;
    const mockBatteryChar = {
      coolingType: 'PASSIVE_COOLING',
    };
    alerts.checkAndAlert(mockAlertTarget, mockBatteryChar, mockTemperatureInc);
    expect( console.log.calledWith('65261, NORMAL') ).to.be.true;
  });

  it('checkAndAlert with TO_EMAIL', () => {
    const mockAtype = 'TO_EMAIL';
    const mockTempInc2 = 50;
    const mockBatChar2 = {
      coolingType: 'HI_ACTIVE_COOLING',
    };
    const logMessage = 'To: a.b@c.com';
    const logMessage2 = 'Hi, the temperature is too high';
    alerts.checkAndAlert( mockAtype, mockBatChar2, mockTempInc2);
    expect( console.log.calledWith(logMessage) ).to.be.true;
    expect( console.log.calledWith(logMessage2)).to.be.true;
  });
})
