import React from "react";
import {shallow} from 'enzyme';
import TripSummary from './TripSummary';

describe('Component TripSummary', () => {
  it('should render correct link adress', () => {
    const expectedLinkAdress = 'abc';
    const component = shallow(<TripSummary id={expectedLinkAdress} tags={['pool']} />)

    //console.log(component.debug());

    const renderLinkAdress = component.find('Link').prop('to');
    expect(renderLinkAdress).toEqual(`/trip/${expectedLinkAdress}`);
  });

  it('should render correct image', () => {
    const expectedImageSrc = 'image.jpg';
    const expectedImageAlt = 'Picture from trip';
    const component = shallow(<TripSummary image={expectedImageSrc} name={expectedImageAlt} tags={['pool']}/>);

    //console.log(component.debug());

    const renderImageSrc = component.find('img').prop('src');
    const renderImageAlt = component.find('img').prop('alt');
    expect(renderImageSrc).toEqual(expectedImageSrc);
    expect(renderImageAlt).toEqual(expectedImageAlt);
  });

  it('should render correct props name, cost and days', () => {
    const expectedName = 'Trip to France';
    const expectedCost = '$123,365.00';
    const expectedDays = 7;
    const component = shallow(<TripSummary name={expectedName} cost={expectedCost} days={expectedDays} tags={['pool']}/>);

    //console.log(component.debug());

    expect(component.find('.title').text()).toEqual(expectedName);
    expect(component.find('.details').text()).toContain(expectedDays);
    expect(component.find('.details').text()).toContain(expectedCost);
  });

  it('should throw error without props', () => {
    expect(() => shallow(<TripSummary />)).toThrow();
  });

  it('should render tags array', () => {
    const expectedTags = ['pool', 'all-inclusive', 'skiing'];
    const component = shallow(<TripSummary tags={expectedTags} />);

    //console.log(component.debug());

    const renderTag0 = component.find('.tag').at(0).text();
    const renderTag1 = component.find('.tag').at(1).text();
    const renderTag2 = component.find('.tag').at(2).text();
    expect(renderTag0).toEqual(expectedTags[0]);
    expect(renderTag1).toEqual(expectedTags[1]);
    expect(renderTag2).toEqual(expectedTags[2]);

  });

  it('should not render div with class tag', () => {
    const expectedTags = [];
    const component = shallow(<TripSummary tags={expectedTags} />)

    //console.log(component.debug());

    const renderTags = component.find('.tags');
    expect(renderTags).toEqual({});
  });


});