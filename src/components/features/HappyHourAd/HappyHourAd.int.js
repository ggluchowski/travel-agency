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