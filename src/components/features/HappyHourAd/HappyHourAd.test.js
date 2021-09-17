import React from 'react';
import { shallow } from 'enzyme';
import HappyHourAd from './HappyHourAd';

const select = {
  title: '.title',
  descr: '.promoDescription',
};

const mockProps = {
  title: 'Happy Hour',
  promoDescription: 'Promotion TIME!!!',
};

describe('Component HappyHourAd', () => {
  it('should render correct', () => {
    const component = shallow(<HappyHourAd />);
    expect(component).toBeTruthy();
  });

  it('should render header and div', () => {
    const component = shallow(<HappyHourAd />);
    const headerElement = component.find(select.title);
    const countdownElement = component.find(select.descr);

    expect(headerElement.length).toBe(1);
    expect(countdownElement.length).toBe(1);
  });

  it('should render correct title', () => {
    const componenet = shallow(<HappyHourAd {...mockProps} />);
    const titleProps = componenet.find(select.title).text();

    expect(titleProps).toEqual(mockProps.title);
  });
});

const trueDate = Date;

  const mockDate = customDate => class extends Date {
    constructor(...args) {
      if(args.length){
        super(...args);
      } else {
        super(customDate);
      }
      return this;
    }
    static now(){
      return (new Date(customDate)).getTime();
    }
  };

  const checkDescriptionAtTime = ( time, expectedDescription ) => {
    it(`should show correct at ${time}`, () => {
      global.Date = mockDate(`2021-09-18T${time}.135Z`);
      const component = shallow(<HappyHourAd {...mockProps} />);
      const renderTime = component.find(select.descr).text();
      expect(renderTime).toEqual(expectedDescription);

      global.Date = trueDate;
    });
  };



  const checkDescriptionAfterTime = (time, delaySeconds, expectedDescription) => {
    it(`should show correct value ${delaySeconds} seconds after ${time}`, () => {

      jest.useFakeTimers();

      global.Date = mockDate(`2021-09-18T${time}.135Z`);
      const component = shallow(<HappyHourAd {...mockProps} />);
      const newTime = new Date();
      newTime.setSeconds(newTime.getSeconds() + delaySeconds);
      global.Date = mockDate(newTime.getTime());

      jest.advanceTimersByTime(delaySeconds * 1000);

      const renderTime = component.find(select.descr).text();
      expect(renderTime).toEqual(expectedDescription);

      global.Date = trueDate;

      jest.useRealTimers();
    });
  };

describe('Component HappyHour with mocked Date', () => {
  checkDescriptionAtTime('11:57:58', '122');
  checkDescriptionAtTime('11:59:59', '1');
  checkDescriptionAtTime('13:00:00', 23 * 60 * 60 + '');
});

describe('Component HappyHour with mocked Date and delay', () => {
  checkDescriptionAfterTime('11:57:58', 2 , '120');
  checkDescriptionAfterTime('11:59:58', 1 , '1');
  checkDescriptionAfterTime('13:00:00', 60*60 , 22 * 60 * 60 + '');
});

describe('Component HappyHour with mocked Date - Promotion TIME', () => {
  checkDescriptionAtTime('12:00:00', mockProps.promoDescription);
  checkDescriptionAtTime('12:15:59', mockProps.promoDescription);
  checkDescriptionAtTime('12:59:59', mockProps.promoDescription);
});

describe('Component HappyHour with mocked Date and delay to Promotion TIME', () => {
  checkDescriptionAfterTime('11:59:58', 2 , mockProps.promoDescription);
  checkDescriptionAfterTime('11:59:50', 20 , mockProps.promoDescription);
  checkDescriptionAfterTime('13:00:00', 60*60 , 22 * 60 * 60 + '');
});