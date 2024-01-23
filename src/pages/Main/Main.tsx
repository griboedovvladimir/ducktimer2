import { Tooltip } from 'antd';
import React, { useEffect } from 'react';

import { Clock } from '../../components/Clock';
import { RightMenu } from '../../components/RightMenu';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Timer } from '../../components/Timer';
import { TopMenu } from '../../components/TopMenu';
import { storageService } from '../../services/storage.service';
import { guid } from '../../shared/helpers/guid';
import { Person } from '../../shared/icons';

export const Main = ({ currentTheme }: any) => {
  const [timers, setTimers] = React.useState([]);
  const [theme, setTheme] = React.useState('b-n-w');

  const onLogOut = () => {};
  const onAddTimer = () => {
    // @ts-ignore
    setTimers([...timers, { id: guid(), time: '00:00:00' }]);
  };
  const onRemoveTimer = (id: string) => {
    setTimers(timers.filter((timer: { id: string }) => timer.id !== id));
  };
  const onClearBoard = () => {
    setTimers([]);
  };

  const setDefaultTheme = () => {
    if (!storageService.getThemeFromLocalStorage()) {
      storageService.setThemeToSessionStorage('b-n-w');
    }
  };

  useEffect(() => {
    setDefaultTheme();
    document.documentElement.classList.add(storageService.getThemeFromLocalStorage() || 'b-n-w');
    setTheme(storageService.getThemeFromLocalStorage() || 'b-n-w');
  }, []);

  return (
    <div className={currentTheme?.theme}>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <div className="row1">
        <Clock />
        <div className="logout">
          <Tooltip title="Log out">
            <Person className="icon" onClick={onLogOut} />
          </Tooltip>
        </div>
      </div>

      <TopMenu addTimer={onAddTimer} clearBoard={onClearBoard} />

      <div className="row2">
        <RightMenu />
        <div className="table">
          {timers.map((timer: { time: string; id: string }) => (
            <Timer key={timer.id} id={timer.id} time={timer.time} onRemoveTimer={onRemoveTimer} theme={theme} />
          ))}
        </div>
      </div>
    </div>
  );
};
