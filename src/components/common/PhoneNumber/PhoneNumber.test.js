import React from 'react';
import { shallow } from 'enzyme';
import PhoneNumber from './PhoneNumber';

const mockProps = {
  intervalFrom8To12: '8:00 - 12:00 - Amanda, 678.243.8455',
  intervalFrom12To16: '12:00 - 16:00 - Tobias, 278.443.6455',
  intervalFrom16To22: '16:00 - 22:00 - Helena, 178.143.4755',
  intervalFrom22To8: 'The office opens at 8:00 UTC',
};


const trueDate = Date;

const mockDate = customDate => class extends Date {
  constructor(...args) {
    if (args.length) {
      super(...args);
    } else {
      super(customDate);
    }
    return this;
  }
  static now() {
    return (new Date(customDate)).getTime();
  }
};

const checkTimeInterval = ( time, expectedInterval ) => {
  it(`should show correct interval at ${time}`, () => {
    global.Date = mockDate(`2021-09-19T${time}.135Z`);
    const component = shallow(<PhoneNumber {...mockProps} />);
    const renderDescription = component.find('div').text();
    expect(renderDescription).toContain(expectedInterval);

    global.Date = trueDate;
  });
};

const checkTimeIntervalAfterTime = (time, delaySeconds, expectedDescription) => {
  it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {

    jest.useFakeTimers();

    global.Date = mockDate(`2021-09-18T${time}.135Z`);
    const component = shallow(<PhoneNumber {...mockProps} />);
    const newTime = new Date();
    newTime.setSeconds(newTime.getSeconds() + delaySeconds);
    global.Date = mockDate(newTime.getTime());

    jest.advanceTimersByTime(delaySeconds * 1000);

    const renderTime = component.find('div').text();
    expect(renderTime).toContain(expectedDescription);

    global.Date = trueDate;

    jest.useRealTimers();
  });
};

describe('Component PhoneNumber', () => {
  it('should render correct', () => {
    const component = shallow(<PhoneNumber />);
    expect(component).toBeTruthy();
  });
});

describe('Component PhoneNumber with mocked Date', () => {
  checkTimeInterval('07:12:57', mockProps.intervalFrom22To8);
  checkTimeInterval('08:12:57', mockProps.intervalFrom8To12);
  checkTimeInterval('11:59:59', mockProps.intervalFrom8To12);
  checkTimeInterval('12:12:57', mockProps.intervalFrom12To16);
  checkTimeInterval('16:12:57', mockProps.intervalFrom16To22);
  checkTimeInterval('23:12:57', mockProps.intervalFrom22To8);
});

describe('Component PhoneNumber with mocked Date and delay', () => {
  checkTimeIntervalAfterTime('07:50:00', 600 , mockProps.intervalFrom8To12);
  checkTimeIntervalAfterTime('11:59:58', 3 , mockProps.intervalFrom12To16);
  checkTimeIntervalAfterTime('15:59:50', 11 , mockProps.intervalFrom16To22);
  checkTimeIntervalAfterTime('21:59:00', 61 , mockProps.intervalFrom22To8);
});
