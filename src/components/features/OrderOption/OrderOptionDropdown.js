import { formatPrice } from '../../../utils/formatPrice';
import styles from './OrderOption.module.scss';
import PropTypes from 'prop-types';
import OrderOptionNumber from './OrderOptionNumber';

const OrderOptionDropdown = ({values, required, currentValue, setOptionValue}) => (
  <select
  className={styles.dropdown}
  value={currentValue}
  onChange={event => setOptionValue(event.currentTarget.value)}
  >
    {required ? '' : (
      <option key='null' value=''>---</option>
    )}
    {values.map(value => (
      <option key={value.id} value={value.id}>{value.name} ({formatPrice(value.price)})</option>
    ))}
  </select>
);

OrderOptionNumber.propTypes = {
  values: PropTypes.object,
  required: PropTypes.bool,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
}

export default OrderOptionDropdown;