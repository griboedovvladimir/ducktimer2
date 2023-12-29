import React, { useEffect, useState } from 'react';

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
    <div id="clock">
      <Time title="" className="icon2 time-icon" onClick={onChangeClockLocale} />
      <div id="time">{time}</div>
    </div>
  );
};
