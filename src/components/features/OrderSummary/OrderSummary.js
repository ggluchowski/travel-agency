import React from 'react';
import PropTypes from 'prop-types';
import styles from './OrderSummary.module.scss';
import {calculateTotal} from '../../../utils/calculateTotal';
import {formatPrice} from '../../../utils/formatPrice';

const OrderSummary = ({tripCostToSummary, summaryOptions}) => (
<div>
  <h2 className={styles.component}>Total:
    <strong>{formatPrice(calculateTotal(tripCostToSummary, summaryOptions ))}</strong>
  </h2>
</div>
);

OrderSummary.propTypes = {
  tripCostToSummary: PropTypes.string,
  summaryOptions: PropTypes.object,
}

export default OrderSummary;