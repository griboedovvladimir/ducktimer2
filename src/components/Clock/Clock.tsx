import React, { useEffect, useState } from 'react';

import styles from './Clock.module.css';
import { Time } from '../../shared/icons';

export const Clock = () => {
  const [locale, setLocale] = useState('en-GB');
  const [time, setTime] = useState(new Date().toLocaleTimeString(locale));

  const onChangeClockLocale = () => {
    setLocale(locale === 'en-GB' ? 'en-US' : 'en-GB');
  };

  useEffect(() => {
    const id = (() => setInterval(() => setTime(() => new Date().toLocaleTimeString(locale)), 500))();

    return () => clearTimeout(id);
  }, [locale]);

  return (
    <div className={styles.clock}>
      <Time title="" className={styles.timeIcon} onClick={onChangeClockLocale} />
      <div className={styles.time}>{time}</div>
    </div>
  );
};
