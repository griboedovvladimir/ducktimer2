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

/**
 * Helper function to check if user is authenticated
 * @returns true if user has a valid auth token in session or local storage
 */
const isAuthenticated = () => {
  return !!(storageService.getTokenFromSessionStorage() || storageService.getTokenFromLocalStorage());
};

export const Main = () => {
  const maxTimersCount = 20;
  const navigate = useNavigate();
  const [timers, setTimers] = React.useState<{ id: string; time: string }[]>([]);
  const [theme, setTheme] = React.useState('light');
  // State for compact view mode (denser layout with more columns)
  const [isCompactView, setIsCompactView] = React.useState(false);

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

  /**
   * Toggles between normal and compact timer view modes
   * Persists preference to session storage for current session
   */
  const toggleCompactView = () => {
    const newValue = !isCompactView;
    setIsCompactView(newValue);
    storageService.setCompactViewToSessionStorage(newValue);
  };

  useEffect(() => {
    setDefaultTheme();
    document.documentElement.setAttribute('data-theme', storageService.getThemeFromLocalStorage() || 'light');
    setTheme(storageService.getThemeFromLocalStorage() || 'light');
    // Restore compact view preference from session storage
    setIsCompactView(storageService.getCompactViewFromSessionStorage());

    // Redirect to login if not authenticated (fixed inverted logic from original)
    if (!isAuthenticated()) {
      navigate(ROUTE_CONSTANTS.LOGIN_PAGE);
    }
  }, [navigate]);

  // Render main content only if authenticated (fixed inverted logic from original)
  return isAuthenticated() ? (
    <div className={theme}>
      <ThemeSwitcher theme={theme} setTheme={setTheme} />
      <div className={styles.row1}>
        <Clock />
        {/* Pass compact view state and toggle function to top menu */}
        <TopMenu addTimer={onAddTimer} clearBoard={onClearBoard} timersCount={timers.length} isCompactView={isCompactView} toggleCompactView={toggleCompactView} />
        <div className={styles.logout}>
          <Person className={styles.logoutIcon} onClick={onLogOut} />
        </div>
      </div>
      <div className={styles.row2}>
        {/* Apply compact class to grid for responsive column adjustments */}
        <div className={`${styles.table} ${isCompactView ? styles.compact : ''}`}>
          {timers.map((timer: { time: string; id: string }) => (
            // Pass compact view flag to each timer for reduced spacing
            <Timer key={timer.id} id={timer.id} time={timer.time} onRemoveTimer={onRemoveTimer} theme={theme} isCompactView={isCompactView} />
          ))}
        </div>
        <RightMenu />
      </div>
    </div>
  ) : null;
};
