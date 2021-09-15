/* eslint-disable default-case */
import React from 'react';
import { shallow } from 'enzyme';
import OrderOption from './OrderOption';
import DatePicker from 'react-datepicker';

describe('Component OrderOption', () => {
  it('should return empty object if called without required props', () => {
    const component = shallow(<OrderOption />);

    expect(component).toEqual({});
  });

  const expectedName = 'name';
  const expectedType = 'number';

  const component = shallow(<OrderOption name={expectedName} type={expectedType} />);

  //console.log(component.debug());

  it('should render', () => {
    expect(component).toBeTruthy();
  });

  it('should render correct name', () => {
    const renderedName = component.find('.title').text();

    expect(renderedName).toEqual(expectedName);
  });

  //Section for subcomponents

  const optionTypes = {
    dropdown: 'OrderOptionDropdown',
    icons: 'OrderOptionIcons',
    checkboxes: 'OrderOptionCheckboxes',
    //number: 'OrderOptionNumber',
    text: 'OrderOptionText',
    date: 'OrderOptionDate',
  };

  const mockProps = {
    id: 'abc',
    name: 'Lorem',
    values: [
      {id: 'aaa', icon: 'h-square', name: 'Lorem A', price: 0 },
      {id: 'xyz', icon: 'h-square', name: 'Lorem X', price: 100 },
    ],
    required: false,
    currentValue: 'aaa',
    price: '50%',
    limits: {
      min: 0,
      max: 6,
    },
  };

  const mockPropsForType = {
    dropdown: {},
    icons: {},
    checkboxes: { currentValue: [mockProps.currentValue] },
    number: { currentValue: 1 },
    text: {},
    date: {},
  };

  const testValue = mockProps.values[1].id;
  const testValueNumber = 3;

  for (let type in optionTypes) {
    describe(`Component OrderOption with type=${type}`, () => {
      /* test setup */
      let component;
      let subcomponent;
      let renderedSubcomponent;
      let mockSetOrderOption;

      beforeEach(() => {
        mockSetOrderOption = jest.fn();
        component = shallow(
          <OrderOption
            type={type}
            setOrderOption={mockSetOrderOption}
            {...mockProps}
            {...mockPropsForType[type]}
          />
        );
        subcomponent = component.find(optionTypes[type]);
        renderedSubcomponent = subcomponent.dive();
        //console.log(subcomponent.debug());
      });

      /* common tests */
      it('passes dummy test', () => {
        expect(1).toBe(1);
        //console.log(subcomponent.debug());
      });

      it(`renders ${optionTypes[type]}`, () => {
        expect(subcomponent).toBeTruthy();
        expect(subcomponent.length).toBe(1);
      });

      /* type-specific tests */
      switch (type) {
        case 'dropdown': {
          /* tests for dropdown */
          it('contains select and options', () => {
            const select = renderedSubcomponent.find('select');
            expect(select.length).toBe(1);

            const emptyOption = select.find('option[value=""]').length;
            expect(emptyOption).toBe(1);

            const options = select.find('option').not('[value=""]');
            expect(options.length).toBe(mockProps.values.length);
            expect(options.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(options.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change', () => {
            renderedSubcomponent.find('select').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'icons': {
          /* tests for icons */
          it('contains div and icon list', () => {
            const divElement = renderedSubcomponent.find('.component');
            expect(divElement.length).toBe(1);

            //console.log(divElement.debug());

            const iconDiv = divElement.find('.icon');
            expect(iconDiv.length).toBe(mockProps.values.length);
            const iconElement = iconDiv.find('Icon');
            expect(iconElement.at(0).prop('name')).toBe(mockProps.values[0].icon);
            expect(iconElement.at(1).prop('name')).toBe(mockProps.values[1].icon);
          });

          it('should run setOrderOption function on click in icon componenet', () => {
            renderedSubcomponent.find('.icon').at(1).simulate('click');
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });

          break;
        }
        case 'checkboxes': {
          /* tests for checkboxes */
          it('contains label and input', () => {
            const divElement = renderedSubcomponent.find('.checkboxes');
            expect(divElement.length).toBe(1);

            //console.log(divElement.debug());

            const inputElement = divElement.find('input');
            expect(inputElement.length).toBe(mockProps.values.length);
            expect(inputElement.at(0).prop('value')).toBe(mockProps.values[0].id);
            expect(inputElement.at(1).prop('value')).toBe(mockProps.values[1].id);
          });

          it('should run setOrderOption function on change in checkboxes component', () => {
            renderedSubcomponent.find('input').at(1).simulate('change', {currentTarget: {checked:true}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: [mockProps.currentValue, testValue] });
          });
          break;
        }
        case 'number': {
          /* tests for number */
          it('contains div and input', () => {
            const divElement = renderedSubcomponent.find('.number');
            expect(divElement.length).toBe(1);

            const inputElement = divElement.find('input');
            expect(inputElement.length).toBe(1);
          });

          it('should run setOrderOption function on change in number component', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValueNumber}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValueNumber });
          });
          break;
        }
        case 'text': {
          /* tests for text */
          it('contains div and input in text component', () => {
            const divElement = renderedSubcomponent.find('.component');
            expect(divElement.length).toBe(1);

            const inputElement = divElement.find('input').prop('type');
            expect(inputElement).toBe('text');
          });

          it('should run setOrderOption function on change in text component', () => {
            renderedSubcomponent.find('input').simulate('change', {currentTarget: {value: testValue}});
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
        case 'date': {
          /* tests for date */
          it('contains div and DataPicker in date component', () => {
            const divElement = renderedSubcomponent.find('.component');
            expect(divElement.length).toBe(1);

            const dateElement = divElement.find(DatePicker);
            expect(dateElement.length).toBe(1);
          });

          it('should run setOrderOption function on change in date component', () => {
            renderedSubcomponent.find(DatePicker).simulate('change', testValue);
            expect(mockSetOrderOption).toBeCalledTimes(1);
            expect(mockSetOrderOption).toBeCalledWith({ [mockProps.id]: testValue });
          });
          break;
        }
      }
    });
  }
});