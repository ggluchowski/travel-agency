import React from 'react';
import styles from './HappyHourAd.module.scss';
import PropTypes from 'prop-types';
//import { render } from 'enzyme';


class HappyHourAd extends React.Component {
  constructor(){
    super();

    setInterval(() => {
      this.forceUpdate();
    }, 1000);
  }

  static propTypes = {
    title: PropTypes.string,
    promoDescription: PropTypes.string,
  }

  getCountdownTime(){
    const currentDate = new Date();
    const nextNoon = new Date(Date.UTC(currentDate.getUTCFullYear(), currentDate.getUTCMonth(), currentDate.getUTCDate(), 12, 0, 0, 0));

    if(currentDate.getUTCHours() >= 12){
      nextNoon.setUTCDate(currentDate.getUTCDate()+1);
    }
    return Math.round((nextNoon.getTime() - currentDate.getTime())/1000);
  }

  render(){
    const { title, promoDescription, } = this.props;

    const countdownValue = this.getCountdownTime();

    return (
      <div className={styles.component}>
        <h3 className={styles.title}>{title}</h3>
        <div className={styles.promoDescription}>
          {countdownValue > 23 * 60 * 60 ? promoDescription : countdownValue }
        </div>
      </div>
    );
  }
}

export default HappyHourAd;