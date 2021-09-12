import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';

const OrderOptionText = ({name, currentValue, setOptionValue}) => (
  <div className={styles.component}>
    <input
    value={currentValue}
    className={styles.input}
    type='text'
    placeholder={name}
    onChange={event => setOptionValue(event.currentTarget.value)}
    >
    </input>
  </div>
);

OrderOptionText.propTypes = {
  name: PropTypes.string,
  currentValue: PropTypes.string,
  setOptionValue: PropTypes.func,
}

export default OrderOptionText;