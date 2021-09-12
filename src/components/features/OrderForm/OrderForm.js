import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderForm.scss';
import { Grid, Row, Col } from 'react-flexbox-grid';
import pricing from '../../../data/pricing.json';

import OrderSummary from '../OrderSummary/OrderSummary';
import OrderOption from '../OrderOption/OrderOption';

const OrderForm = ({tripCost, options, setOrderOption}) => (
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
  </Grid>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
  setOrderOption: PropTypes.func,
};

export default OrderForm;