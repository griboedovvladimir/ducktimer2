import React from 'react';

import { Clock } from '../../components/Clock';
import { RightMenu } from '../../components/RightMenu';
import { ThemeSwitcher } from '../../components/ThemeSwitcher';
import { Timer } from '../../components/Timer';
import { TopMenu } from '../../components/TopMenu';
import { guid } from '../../shared/helpers/guid';
import { Person } from '../../shared/icons';

export const Main = ({ currentTheme }: any) => {
  const [timers, setTimers] = React.useState([]);

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

  return (
    <div className={currentTheme?.theme}>
      <ThemeSwitcher />
      <div className="row1">
        <Clock />
        <div className="logout">
          <Person title="Log out" className="icon" onClick={onLogOut} />
        </div>
      </div>

      <TopMenu addTimer={onAddTimer} clearBoard={onClearBoard} />

      <div className="row2">
        <RightMenu />
        <div className="table">
          {timers.map((timer: { time: string; id: string }) => (
            <Timer key={timer.id} id={timer.id} time={timer.time} onRemoveTimer={onRemoveTimer} />
          ))}
        </div>
      </div>
    </div>
  );
};
