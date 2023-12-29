import React from 'react';

import { Time } from '../../shared/icons';

export const Clock = () => {
  const clock = new Date().toLocaleTimeString('en-GB');
  const onChangeClockLocale = () => {};

  return (
    <div id="clock">
      <Time title="" className="icon2" onClick={onChangeClockLocale} />
      <div id="time">{clock}</div>
    </div>
  );
};
