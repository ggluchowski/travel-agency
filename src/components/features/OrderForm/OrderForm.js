import React from 'react';
import PropTypes from 'prop-types';
//import styles from './OrderForm.scss';
import { Grid, Row, Col } from 'react-flexbox-grid';

import OrderSummary from '../OrderSummary/OrderSummary';

const OrderForm = ({tripCost, options}) => (
  <Grid>
    <Row>
      <Col xs={12}>
        <OrderSummary tripCostToSummary={tripCost} summaryOptions={options} />
      </Col>
    </Row>
  </Grid>
);

OrderForm.propTypes = {
  tripCost: PropTypes.string,
  options: PropTypes.object,
};

export default OrderForm;