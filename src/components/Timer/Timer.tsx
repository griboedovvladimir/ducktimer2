// eslint-disable-next-line import/no-extraneous-dependencies
import { ConfigProvider, TimePicker, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRef, useState } from 'react';

import { OTHER_CONSTANTS, SELECT_PROCESS_OPTIONS } from '../../CONSTANTS';
import { Film, Pause, Play, Set } from '../../shared/icons';
import { FilmSelectForm } from '../FilmSelectForm';
import styles from './Timer.module.css';

interface IProps {
  id: string;
  time: string;

  onRemoveTimer(id: string): void;

  theme: string;
}

export const Timer = ({ id, time, onRemoveTimer, theme }: IProps) => {
  const [timePickerValue, setTimePickerValue] = useState(OTHER_CONSTANTS.START_TIME);
  const [currentTimerValue, setCurrentTimerValue] = useState(time);
  const [timerSet, setTimerSet] = useState(0);
  const [state, setState] = useState({
    id,
    timerFinished: false,
    panelIsOpen: false,
    formIsActivated: false,
    otherProcess: '',
    selectProcess: '',
    note: '',
  });
  const processSelectValue = useRef<any>();

  const timersClassList = state.timerFinished ? 'timers finished' : 'timers';
  const process = state.otherProcess ? state.otherProcess : state.selectProcess;
  const isDarkTheme = theme === 'dark';
  const timeFormat = 'HH:mm:ss';
  const themeConfig = {
    token: {
      colorText: isDarkTheme ? '#ff0000' : '#000',
      colorTextHeading: isDarkTheme ? '#ff0000' : '#000',
      colorTextLightSolid: isDarkTheme ? '#ff0000' : '#fff',
      boxShadowSecondary: isDarkTheme ? '0 0 0 2px #ff0000' : '0 0 0 2px #000',
      colorBgElevated: isDarkTheme ? '#000' : '#fff',
      colorPrimary: '#000',
    },
    components: {
      DatePicker: {
        activeBorderColor: isDarkTheme ? '#ff0000' : '#000',
        activeShadow: '0 0 0 2px rgb0 0 0 / 0.2)',
        colorTextDisabled: isDarkTheme ? '#ff0000' : '#000',
        colorPrimary: isDarkTheme ? '#ff0000' : '#000',
        controlItemBgActive: isDarkTheme ? '#000' : '#fff',
      },
    },
  };

  const onStopTimer = () => {
    cancelAnimationFrame(timerSet);
    setTimerSet(0);
  };

  const onSetTimer = () => {
    onStopTimer();
    setCurrentTimerValue(timePickerValue);
    setState({ ...state, timerFinished: false });
  };

  const onSelectProcess = (value: string) => {
    setState({ ...state, selectProcess: value });
  };

  const onChangeNote = (note: string) => {
    setState({ ...state, note });
  };

  const setTime = (e: any) => {
    setCurrentTimerValue(e.format(timeFormat));
    setTimePickerValue(e.format(timeFormat));
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
    // @ts-ignore
    import('../../assets/sounds/duck.mp3').then((module) => {
      const audio = new Audio(module.default);

      audio.autoplay = true;
      setState({ ...state, timerFinished: true });
    });
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
            setTimerSet(requestAnimationFrame(goTimer));
        }
      };

      setTimerSet(requestAnimationFrame(goTimer));
    }
  };

  return (
    <div className={timersClassList}>
      <button type="button" onClick={() => onRemoveTimer(id)} className={styles.delete}>
        ×
      </button>
      <ConfigProvider theme={themeConfig}>
        <Typography.Title level={5} ellipsis={{ rows: 1 }} className={styles.process}>
          {process || SELECT_PROCESS_OPTIONS[0]}
        </Typography.Title>
      </ConfigProvider>

      <div className={styles.timerPanel}>
        <div className="time">{currentTimerValue || OTHER_CONSTANTS.START_TIME}</div>
        {state.note && <p>Note: {state.note}</p>}
        <div className={styles.timerButtons}>
          {timerSet ? (
            <button type="button" aria-label="pause">
              <Pause className="button-icon" onClick={onStopTimer} />
            </button>
          ) : (
            <button type="button" aria-label="start">
              <Play onClick={onStartTimer} className="button-icon" />
            </button>
          )}
          <button type="button" aria-label="set">
            <Set onClick={onSetTimer} className="button-icon" />
          </button>
        </div>
      </div>
      {state.panelIsOpen && (
        <div className={styles.setTimerPanel} defaultValue=" ">
          <div className={styles.formRow}>
            <span>Select process</span>
            <select
              onChange={({ target }) => onSelectProcess(target.value)}
              name="selectProcess"
              ref={processSelectValue}
            >
              {getProcessOptions()}
            </select>
          </div>
          {processSelectValue.current?.value === 'other process' && (
            <div className={styles.formRow}>
              <span>Other process</span>
              <input
                onChange={({ target }) => onSelectProcess(target.value)}
                type="text"
                name="process"
                size={4}
                defaultValue={state.otherProcess}
              />
            </div>
          )}
          <ConfigProvider theme={themeConfig}>
            <TimePicker
              className={styles.timePicker}
              onChange={setTime}
              defaultValue={dayjs('00:00:00', timeFormat)}
              showNow={false}
              allowClear={false}
            />
          </ConfigProvider>
          <textarea
            onChange={({ target }) => onChangeNote(target.value)}
            name="note"
            className={styles.textarea}
            placeholder="Note"
          />
          <button
            type="button"
            aria-label="film"
            className="film-button trans-color-btn"
            onClick={showFilmSelectionForm}
          >
            <Film />
          </button>
          {state.formIsActivated && <FilmSelectForm setTimer={setCurrentTimerValue} />}
        </div>
      )}
      <button type="button" onClick={onTogglePanel} className="stork trans-color-btn">
        {state.panelIsOpen ? '▲' : '▼'}
      </button>
    </div>
  );
};
