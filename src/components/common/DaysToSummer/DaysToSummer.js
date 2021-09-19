import React from 'react';
import styles from './DaysToSummer.module.scss';

const daysCounter = () => {
  const currentDate = new Date();
  let nextSummer = new Date(Date.UTC(currentDate.getFullYear(), 5, 21));
  const monthCal = currentDate.getUTCMonth();
  const dayCal = currentDate.getUTCDate();

  if((monthCal >= 5 && dayCal > 21) || (monthCal >= 6)) {
    nextSummer = new Date(Date.UTC(currentDate.getFullYear() + 1, 5, 21, 0, 0, 0, 0));
    if(((monthCal >= 5 && dayCal >= 21) || (monthCal >= 6)) && ((monthCal <= 8 && dayCal <= 23) || (monthCal <= 7))) {
      return '';
    } else if((monthCal >= 8 && dayCal > 23) || (monthCal >= 9)) {
      const dif = Math.floor((nextSummer - currentDate)/(1000*60*60*24));
      return dif + ' days to SUMMER' ;
    }
  } else if((monthCal <= 5 && dayCal <= 21) || (monthCal <= 4)) {
    nextSummer = new Date(Date.UTC(currentDate.getFullYear(), 5, 21, 0, 0, 0, 0));
    if(monthCal === 5 && dayCal === 20) {
      return '1 day to SUMMER';
    } else {
      const dif = Math.floor((nextSummer - currentDate)/(1000*60*60*24));
      return dif + ' days to SUMMER' ;
    }
  }
};

const DaysToSummer = () => (
  <div className={styles.component}>
    <div className={styles.title}>
      {daysCounter()}
    </div>
  </div>
);

export default DaysToSummer;