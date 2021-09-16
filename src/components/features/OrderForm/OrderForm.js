import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderForm.module.scss';
import { Grid, Row, Col } from 'react-flexbox-grid';
import pricing from '../../../data/pricing.json';
import { formatPrice } from '../../../utils/formatPrice';
import { calculateTotal } from '../../../utils/calculateTotal';

import settings from '../../../data/settings';
import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';
import Button from '../../common/Button/Button';

const sendOrder = (tripId, name, country, options, tripCost) => {
  const totalCost = formatPrice(calculateTotal(tripCost, options));

  const payload = {
    ...options,
    totalCost,
    tripId,
    name,
    country,
  };

  const url = settings.db.url + '/' + settings.db.endpoint.orders;

  const fetchOptions = {
    cache: 'no-cache',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  };

  fetch(url, fetchOptions)
    .then(function(response){
      return response.json();
    }).then(function(parsedResponse){
      console.log('parsedResponse', parsedResponse);
    });
};

const OrderForm = ({tripId, country, name, tripCost, options, setOrderOption}) => (
  <form action="">
    <Grid>
      <Row>
        {pricing.map(data =>
        <Col key={data.id} md={4}>
          <OrderOption currentValue={options[data.id]} {...data} setOrderOption={setOrderOption}/>
        </Col>
        )}
        <Col xs={12}>
          <OrderSummary tripCostToSummary={tripCost} summaryOptions={options} />
        </Col>
      </Row>
      <Row className={styles.button}>
        <Button type="submite" onClick={() => sendOrder(tripId, name, country.alpha3Code, options, tripCost)}>Order now!</Button>
      </Row>
    </Grid>
  </form>
);

OrderForm.propTypes = {
  tripId: PropTypes.string,
  country: PropTypes.object,
  name: PropTypes.string,
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;