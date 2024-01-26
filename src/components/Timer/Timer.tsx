// eslint-disable-next-line import/no-extraneous-dependencies
import { ConfigProvider, TimePicker, Tooltip } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { OTHER_CONSTANTS, SELECT_PROCESS_OPTIONS } from '../../CONSTANTS';
import { Film, Pause, Play, Set } from '../../shared/icons';
import { FilmSelectForm } from '../FilmSelectForm';
import styles from './Timer.module.css';
// @ts-ignore
import beep from '../../assets/sounds/duck.mp3';

interface IProps {
  id: string;
  time: string;
  onRemoveTimer(id: string): void;
  theme: string;
}

export const Timer = ({ id, time, onRemoveTimer, theme }: IProps) => {
  const [timePickerValue, setTimePickerValue] = useState(OTHER_CONSTANTS.START_TIME);
  const [currentTimerValue, setCurrentTimerValue] = useState(time);
  const [state, setState] = useState({
    id,
    timerFinished: false,
    panelIsOpen: false,
    formIsActivated: false,
    otherProcess: '',
    selectProcess: '',
    note: '',
    set: 0,
  });

  const timersClassList = state.timerFinished ? 'timers finished' : 'timers';
  const process = state.otherProcess ? state.otherProcess : state.selectProcess;
  const isDarkTheme = theme === 'b-n-r';

  const onStopTimer = () => {
    cancelAnimationFrame(state.set);
    setState({ ...state, set: 0 });
  };

  const onSetTimer = () => {
    onStopTimer();
    setCurrentTimerValue(timePickerValue);
    setState({ ...state, timerFinished: false });
  };

  const onSelectProcess = (value: string) => {
    setState({ ...state, selectProcess: value });
  };

  const onChangeNete = (note: string) => {
    setState({ ...state, note });
  };

  const setTime = (e: any) => {
    setCurrentTimerValue(e.format('HH:mm:ss'));
    setTimePickerValue(e.format('HH:mm:ss'));
  };

  const onTogglePanel = () => {
    setState({ ...state, panelIsOpen: !state.panelIsOpen, formIsActivated: false });
  };

  const showFilmSelectionForm = () => {
    setState({ ...state, formIsActivated: true });
  };

  const getProcessOptions = () =>
    SELECT_PROCESS_OPTIONS.map((processOption) => <option key={processOption}>{processOption}</option>);

  const timerOverHandle = () => {
    const audio = new Audio(beep);

    audio.autoplay = true;
    setState({ ...state, timerFinished: true });
  };

  const onStartTimer = () => {
    if (currentTimerValue !== OTHER_CONSTANTS.START_TIME) {
      const arr = currentTimerValue.split(':');
      const hour = arr[0];
      const min = arr[1];
      const sec = arr[2];
      const parsedTime = parseInt(hour, 10) * 3600 + parseInt(min, 10) * 60 + parseInt(sec, 10);
      const countdown = new Date();
      const responseTime = new Date(Date.now() + 1000 * parsedTime);

      const goTimer = () => {
        if (currentTimerValue !== OTHER_CONSTANTS.START_TIME) {
          countdown.setTime(Number(responseTime) - Date.now());
          let h = countdown.getUTCHours().toString();
          let m = countdown.getUTCMinutes().toString();
          let s = countdown.getUTCSeconds().toString();

          if (+h < 10) h = `0${h}`;

          if (+m < 10) m = `0${m}`;

          if (+s < 10) s = `0${s}`;

          if (+m === 0 && +s === 0) {
            s = '00';
            timerOverHandle();
          }

          setCurrentTimerValue(`${h}:${m}:${s}`);

          if (countdown.getUTCHours() > 0 || countdown.getUTCMinutes() > 0 || countdown.getUTCSeconds() > 0)
            setState({ ...state, set: requestAnimationFrame(goTimer) });
        }
      };

      setState({ ...state, set: requestAnimationFrame(goTimer) });
    }
  };

  return (
    <div className={timersClassList}>
      <button type="button" onClick={() => onRemoveTimer(id)} className="delete trans-color-btn">
        ×
      </button>
      <h4 className={styles.process}>{process || SELECT_PROCESS_OPTIONS[0]}</h4>
      <div className="timer-panel">
        <span>{currentTimerValue || OTHER_CONSTANTS.START_TIME}</span>
        {state.note && <p> Note: {state.note}</p>}
        <div className="timer-buttons">
          {state.set ? (
            <Tooltip title="Pause">
              <button type="button" aria-label="pause">
                <Pause className="button-icon" onClick={onStopTimer} />
              </button>
            </Tooltip>
          ) : (
            <Tooltip title="Start">
              <button type="button" aria-label="start">
                <Play onClick={onStartTimer} className="button-icon" />
              </button>
            </Tooltip>
          )}
          <Tooltip title="Set">
            <button type="button" aria-label="set">
              <Set onClick={onSetTimer} className="button-icon" />
            </button>
          </Tooltip>
        </div>
      </div>
      {state.panelIsOpen && (
        <div className="set-timer-panel" defaultValue=" ">
          Select process
          <select onChange={({ target }) => onSelectProcess(target.value)} name="selectProcess">
            {getProcessOptions()}
          </select>
          <br />
          Other process
          <input
            onChange={({ target }) => onSelectProcess(target.value)}
            type="text"
            name="process"
            size={4}
            defaultValue={state.otherProcess}
          />
          <ConfigProvider
            theme={{
              components: {
                DatePicker: {
                  activeBorderColor: isDarkTheme ? '#ff0000' : '#000',
                  activeShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
                  colorTextDisabled: isDarkTheme ? '#ff0000' : '#000',
                  colorPrimary: isDarkTheme ? '#ff0000' : '#000',
                  controlItemBgActive: isDarkTheme ? '#000' : '#fff',
                },
              },
            }}
          >
            <TimePicker
              className={styles.timePicker}
              onChange={setTime}
              defaultValue={dayjs('00:00:00', 'HH:mm:ss')}
              showNow={false}
              allowClear={false}
              changeOnBlur
            />
          </ConfigProvider>
          <textarea
            onChange={({ target }) => onChangeNete(target.value)}
            name="note"
            className="timer-inputs"
            placeholder="Note"
          />
          <Tooltip title="Load film preset time">
            <button
              type="button"
              aria-label="film"
              className="film-button trans-color-btn"
              onClick={showFilmSelectionForm}
            >
              <Film />
            </button>
          </Tooltip>
          {state.formIsActivated && <FilmSelectForm setTimer={setCurrentTimerValue} />}
        </div>
      )}
      <button type="button" onClick={onTogglePanel} className="stork trans-color-btn">
        {state.panelIsOpen ? '▲' : '▼'}
      </button>
    </div>
  );
};
