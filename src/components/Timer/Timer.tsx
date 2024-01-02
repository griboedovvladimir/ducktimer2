// eslint-disable-next-line import/no-extraneous-dependencies
import { ConfigProvider, TimePicker } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

import { OTHER_CONSTANTS, SELECT_PROCESS_OPTIONS } from '../../CONSTANTS';
import { Film, Pause, Play, Set } from '../../shared/icons';
import { FilmSelectForm } from '../FilmPresetForm';
import styles from './Timer.module.css';

interface IProps {
  id: string;
  time: string;
  onRemoveTimer(id: string): void;
}

export const Timer = ({ id, time, onRemoveTimer }: IProps) => {
  const [state, setState] = useState({
    id,
    currentTimerValue: time,
    timerFinished: false,
    panelIsOpen: false,
    formIsActivated: false,
    otherProcess: '',
    selectProcess: '',
    note: '',
  });

  const [timerValue, setTimerValue] = useState({
    hours: '00',
    min: '00',
    sec: '00',
  });

  const timersClassList = state.timerFinished ? 'timers finished' : 'timers';
  const process = (state.otherProcess ? state.otherProcess : state.selectProcess) || 'default value';
  const onSetTimer = () => {
    setTimerValue({ ...timerValue, hours: '00', min: '00', sec: '00' });
  };
  const onStopTimer = () => {};
  const onStartTimer = () => {};
  const onSelectProcess = (value: string) => {
    setState({ ...state, selectProcess: value });
  };

  const onChangeNete = (note: string) => {
    setState({ ...state, note });
  };

  const setTime = (e: any) => {
    setState({ ...state, currentTimerValue: e.format('HH:mm:ss') });
  };

  const onTogglePanel = () => {
    setState({ ...state, panelIsOpen: !state.panelIsOpen, formIsActivated: false });
  };

  const showFilmSelectionForm = () => {
    setState({ ...state, formIsActivated: true });
  };

  const getProcessOptions = () =>
    SELECT_PROCESS_OPTIONS.map((processOption) => <option key={processOption}>{processOption}</option>);

  return (
    <div className={timersClassList}>
      <button type="button" onClick={() => onRemoveTimer(id)} className="delete trans-color-btn">
        ×
      </button>
      <h4 className={styles.process}>{process}</h4>
      <div className="timer-panel">
        <span>{state.currentTimerValue || OTHER_CONSTANTS.START_TIME}</span>
        <p> Note: {state.note}</p>
        <div className="timer-buttons">
          <Pause title="Pause" className="icon2" onClick={onStopTimer} />
          <Play title="Start" onClick={onStartTimer} className="icon2" />
          <Set title="Set" onClick={onSetTimer} className="icon2" />
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
                  activeBorderColor: '#000',
                  activeShadow: '0 0 0 2px rgba(0, 0, 0, 0.2)',
                  colorTextDisabled: '#000',
                  colorPrimary: '#000',
                  controlItemBgActive: '#fff',
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
          <div>
            <Film
              title="Load film preset time"
              className="film-button trans-color-btn"
              onClick={showFilmSelectionForm}
            />
          </div>
          {state.formIsActivated && <FilmSelectForm />}
        </div>
      )}
      <button type="button" onClick={onTogglePanel} className="stork trans-color-btn">
        {state.panelIsOpen ? '▲' : '▼'}
      </button>
    </div>
  );
};
