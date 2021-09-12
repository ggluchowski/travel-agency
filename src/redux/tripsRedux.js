/* SELECTORS */

export const getAllTrips = ({trips}) => trips;

export const getFilteredTrips = ({trips, filters}) => {
  let output = trips;

  // filter by search phrase
  if(filters.searchPhrase){
    const pattern = new RegExp(filters.searchPhrase, 'i');
    output = output.filter(trip => pattern.test(trip.name));
  }

  // TODO - filter by duration
  if(filters.duration){
    const fromDay = filters.duration.from;
    const toDay = filters.duration.to;
    output = output.filter( trip =>
      trip.days <= toDay && trip.days >= fromDay
    )
    console.log('Output filter: ', output);
  }

  // TODO - filter by tags
  if(filters.tags){
    const tagsFilter = filters.tags;
    output = output.filter(trip => {
      const tagsTrip = trip.tags;
      let match = 0;
      for (let tagFilter of tagsFilter){
        for (let tagTrip of tagsTrip){
          if(tagTrip === tagFilter)
          match++;
        }
      }
      if(match === tagsFilter.length)
      return trip;
    });

  }

  // TODO - sort by cost descending (most expensive goes first)
  const temp = output.map(trip => {
    const replaceCost = trip.cost.replace(',','');
    const trimDolar = replaceCost.substr(1);
    const costNum = trip.costNum = parseFloat(trimDolar);
    return costNum;
  })
  console.log(temp);

  output = output.sort((a, b) => b.costNum - a.costNum);

  return output;
};

export const getTripById = ({trips}, tripId) => {
  const filtered = trips;

  const tripsFiltered = filtered.filter(trip => trip.id === tripId)
  // TODO - filter trips by tripId

  //console.log('filtering trips by tripId:', tripId, filtered);
  return tripsFiltered.length ? tripsFiltered[0] : {error: true};
};

export const getTripsForCountry = ({trips}, countryCode) => {
  const filtered = trips;

  // TODO - filter trips by countryCode

  const tripsFiltered = filtered.filter(trip => trip.country.code === countryCode)

  //console.log('filtering trips by countryCode:', countryCode, filtered, tripsFiltered);
  return tripsFiltered.length ? tripsFiltered : [{error: true}];
};

/* ACTIONS */

/*
// action name creator
const reducerName = 'trips';
const createActionName = name => `app/${reducerName}/${name}`;

// action types


// action creators


// reducer
export default function reducer(statePart = [], action = {}) {
  switch (action.type) {
    default:
      return statePart;
  }
}
 */
