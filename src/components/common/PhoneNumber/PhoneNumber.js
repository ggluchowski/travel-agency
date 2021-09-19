import React from 'react';
import styles from './PhoneNumber.module.scss';
import ReactHtmlParser from 'react-html-parser';
import Icon from '../Icon/Icon';

class PhoneNumber extends React.Component {
  constructor() {
    super();

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  choseDate() {
    const currentDate = new Date();
    const currentTime = currentDate.getUTCHours();

    if (currentTime >= 8 && currentTime < 12) {
      return '<span>8:00 - 12:00</span> - Amanda, 678.243.8455';
    } else if (currentTime >= 12 && currentTime < 16) {
      return '<span>12:00 - 16:00</span> - Tobias, 278.443.6455';
    } else if (currentTime >= 16 && currentTime < 22) {
      return '<span>16:00 - 22:00</span> - Helena, 178.143.4755';
    } else {
      return 'The office opens at <span>8:00 UTC</span>';
    }
  };

  render() {
    return (
      <div className={styles.contact}>
        <Icon name='phone' />
        {ReactHtmlParser(this.choseDate())}
      </div>
    )};
};

export default PhoneNumber;