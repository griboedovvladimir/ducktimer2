import React, { useEffect, useState } from 'react';

import { storageService } from '../../services/storage.service';
import { Lamp, Sun } from '../../shared/icons';

export const ThemeSwitcher = () => {
  const [switcher, setSwitcher] = useState(false);

  const switchHandle = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const theme: string = event.target.checked ? 'b-n-r' : 'b-n-w';

    // this.props.switchTheme(theme);
    storageService.setThemeToSessionStorage(theme);
    setSwitcher(event.target.checked);
    console.log(event.target.checked);
  };

  const setDefaultTheme = () => {
    if (!storageService.getThemeFromLocalStorage()) {
      storageService.setThemeToSessionStorage('b-n-w');
    }
  };

  useEffect(() => {
    setDefaultTheme();
    // this.props.switchTheme(
    //   storageService.getThemeFromLocalStorage() || 'b-n-w'
    // );
    // setSwitcher(!(storageService.getThemeFromLocalStorage() === 'b-n-w'));
  }, []);

  return (
    <div>
      <input onChange={switchHandle} className="checkbox" id="checkbox1" checked={switcher} type="checkbox" />
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control, jsx-a11y/label-has-for */}
      <label htmlFor="checkbox1" className="checkbox-label">
        <span className="on">
          <Lamp />
        </span>
        <span className="off">
          <Sun />
        </span>
      </label>
    </div>
  );
};
