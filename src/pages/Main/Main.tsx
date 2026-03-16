import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { Clock } from '../../components/Clock';
import { RightMenu } from '../../components/RightMenu';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Timer } from '../../components/Timer';
import { TopMenu } from '../../components/TopMenu';
import { ROUTE_CONSTANTS } from '../../CONSTANTS';
import { storageService } from '../../services/storage.service';
import { guid } from '../../shared/helpers/guid';
import { Person } from '../../shared/icons';
import styles from './Main.module.css';

export const Main = () => {
  const maxTimersCount = 20;
  const navigate = useNavigate();
  const [timers, setTimers] = React.useState<{ id: string; time: string }[]>([]);
  const [theme, setTheme] = React.useState('light');
  const [compactView, setCompactView] = React.useState(false);

  const onLogOut = () => {
    storageService.removeTokenFromSessionStorage();
    storageService.removeTokenFromLocalStorage();
    navigate(ROUTE_CONSTANTS.LOGIN_PAGE);
  };
  const onAddTimer = () => {
    if (timers.length !== maxTimersCount) {
      setTimers([...timers, { id: guid(), time: '00:00:00' }]);
    }
  };
  const onRemoveTimer = (id: string) => {
    setTimers(timers.filter((timer: { id: string }) => timer.id !== id));
  };
  const onClearBoard = () => {
    setTimers([]);
  };

  const setDefaultTheme = () => {
    if (!storageService.getThemeFromLocalStorage()) {
      storageService.setThemeToSessionStorage('light');
    }
  };

  useEffect(() => {
    setDefaultTheme();
    document.documentElement.setAttribute('data-theme', storageService.getThemeFromLocalStorage() || 'light');
    setTheme(storageService.getThemeFromLocalStorage() || 'light');

    if (!storageService.getTokenFromSessionStorage() && !storageService.getTokenFromLocalStorage()) {
      navigate(ROUTE_CONSTANTS.LOGIN_PAGE);
    }
  }, [navigate]);

  return !storageService.getTokenFromSessionStorage() ? (
    <div className={theme}>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <div className={styles.row1}>
        <Clock />
        <TopMenu addTimer={onAddTimer} clearBoard={onClearBoard} timersCount={timers.length} />
        <div className={styles.logout}>
          <Person className={styles.logoutIcon} onClick={onLogOut} />
        </div>
      </div>
      <div className={styles.row2}>
        <div className={styles.table}>
          {timers.map((timer: { time: string; id: string }) => (
            <Timer key={timer.id} id={timer.id} time={timer.time} onRemoveTimer={onRemoveTimer} theme={theme} compactView={compactView} />
          ))}
        </div>
        <RightMenu compactView={compactView} setCompactView={setCompactView} />
      </div>
    </div>
  ) : null;
};
