import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import { formatPrice } from '../../../utils/formatPrice';

const OrderOptionNumber = ({limits, currentValue, setOptionValue, price}) => (
  <div className={styles.number}>
    <input
    type='number'
    className={styles.inputSmall}
    value={currentValue}
    min={limits.min}
    max={limits.max}
    onChange={event => setOptionValue(event.currentTarget.value)}
    />
    ({formatPrice(price)})
  </div>
);

OrderOptionNumber.propTypes = {
  limits: PropTypes.object,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
}

export default OrderOptionNumber;