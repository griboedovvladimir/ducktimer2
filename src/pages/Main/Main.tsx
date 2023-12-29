// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

import { Clock } from '../../components/Clock';
import { RightMenu } from '../../components/RightMenu';
import { Timer } from '../../components/Timer';
import { TopMenu } from '../../components/TopMenu';
import { guid } from '../../shared/helpers/guid';
import { Person } from '../../shared/icons';

export const Main = ({ currentTheme }: any) => {
  const popupType = null;
  const [timers, setTimers] = React.useState([]);

  const onClosePopup = () => {};
  const onLogOut = () => {};
  const onOpenRightMenuPopup = () => {};
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
    <div className={currentTheme?.theme} onClick={onClosePopup}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <button type="button" popovertarget="mypopover">
        Toggle the popover
      </button>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <div id="mypopover" popover="auto">
        Popover content
      </div>

      <div className={popupType ? 'effect-background' : ''} />
      {/* <ThemeSwitcher /> */}
      <div className="row1">
        <Clock />

        <div className="logout">
          <Person title="Log out" className="icon" onClick={onLogOut} />
        </div>
      </div>
      <TopMenu addTimer={onAddTimer} clearBoard={onClearBoard} />
      <div className="row2">
        <RightMenu onOpenRightMenuPopup={onOpenRightMenuPopup} />
        <div className="table">
          {timers.map((timer: { time: string; id: string }) => (
            <Timer key={timer.id} id={timer.id} time={timer.time} onRemoveTimer={onRemoveTimer} />
          ))}
        </div>
      </div>
      {/* {this.state.popupType && <Popup popupType={popupType} popClose={onClosePopup} />} */}
    </div>
  );
};
