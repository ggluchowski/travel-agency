import React from 'react';
import { shallow } from 'enzyme';
import DaysToSummer from './DaysToSummer';

const mockProps = {
  longTimeBefore: '20 days to SUMMER',
  oneDay: '1 day to SUMMER',
  longTimeAfter: '228 days to SUMMER',
  shortTimeBefore: '3 days to SUMMER',
  shortTimeAfter: '270 days to SUMMER',
  inSummer: '',

};

describe('Component DaysToSummer', () => {
  it('should render correct', () => {
    const component = shallow(<DaysToSummer />);
    expect(component).toBeTruthy();
  });

  it('should render div and title', () => {
    const component = shallow(<DaysToSummer />);
    const divElement = component.find('.component');
    const titleElement = divElement.find('.title');

    expect(divElement.length).toBe(1);
    expect(titleElement.length).toBe(1);
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

  const checkDescriptionAtDay = ( date, expectedDescription ) => {
    it(`should show correct at ${date}`, () => {
      global.Date = mockDate(`${date}T00:00:00.000Z`);
      const component = shallow(<DaysToSummer {...mockProps}/>);
      const renderDay = component.find('.title').text();
      console.log(component.debug());
      expect(renderDay).toEqual(expectedDescription);

      global.Date = trueDate;
    });
  };

  describe('Component DaysToSummer with mocked Date', () => {
    checkDescriptionAtDay('2021-06-01', mockProps.longTimeBefore);
    checkDescriptionAtDay('2021-09-24', mockProps.shortTimeAfter);
    checkDescriptionAtDay('2021-06-20', mockProps.oneDay);
    checkDescriptionAtDay('2021-07-21', mockProps.inSummer);
    checkDescriptionAtDay('2021-06-18', mockProps.shortTimeBefore);
    checkDescriptionAtDay('2021-11-05', mockProps.longTimeAfter);
  });
