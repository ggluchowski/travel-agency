import React, {useState} from 'react';
import PropTypes from 'prop-types';
import styles from './OrderOption.module.scss';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const OrderOptionDate = ({setOptionValue}) => {
  const [startDate, setStartDate] = useState(new Date());
  return (
  <div className={styles.component}>
    <DatePicker
    value={startDate}
    selected={startDate}
    onChange={date => {setStartDate(date);
      setOptionValue(date)}
    }
    />
  </div>
  );
};

OrderOptionDate.propTypes = {
  setOptionValue: PropTypes.func,
}

export default OrderOptionDate;