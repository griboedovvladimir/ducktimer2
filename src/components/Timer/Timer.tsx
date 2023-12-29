import { useState } from 'react';

import { OTHER_CONSTANTS, SELECT_PROCESS_OPTIONS } from '../../CONSTANTS';
import { Film, Pause, Play, Set } from '../../shared/icons';
import { useFetchFilmsQuery } from '../../services/filmApiService';

interface IProps {
  id: string;
  time: string;
  onRemoveTimer(id: string): void;
}

export const Timer = ({ id, time, onRemoveTimer }: IProps) => {
  const { data: films } = useFetchFilmsQuery('');

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
  const onSelectProcess = () => {};
  const onChangeTimerParams = () => {};
  const onChangeTimerValue = () => {};
  const onTogglePanel = () => {
    setState({ ...state, panelIsOpen: !state.panelIsOpen, formIsActivated: false });
  };
  const getFilmOptions = () => {};

  const getProcessOptions = () =>
    SELECT_PROCESS_OPTIONS.map((processOption) => <option key={processOption}>{processOption}</option>);

  return (
    <div className={timersClassList}>
      {films?.length}
      <button type="button" onClick={() => onRemoveTimer(id)} className="delete trans-color-btn">
        ×
      </button>
      <h4>{process}</h4>
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
          <select onChange={onSelectProcess} name="selectProcess">
            {getProcessOptions()}
          </select>
          <br />
          Other process
          <input onChange={onChangeTimerParams} type="text" name="process" size={4} defaultValue={state.otherProcess} />
          <div>
            <input onChange={onChangeTimerValue} type="text" name="hours" size={1} defaultValue={timerValue.hours} />
            :
            <input onChange={onChangeTimerValue} type="text" name="min" size={1} defaultValue={timerValue.min} />
            :
            <input onChange={onChangeTimerValue} type="text" name="sec" size={1} defaultValue={timerValue.sec} />
          </div>
          <textarea onChange={onChangeTimerParams} name="note" className="timer-inputs" placeholder="Note" />
          <div>
            <Film title="Load film preset time" className="film-button trans-color-btn" onClick={getFilmOptions} />
          </div>
          {state.formIsActivated}
        </div>
      )}
      <button type="button" onClick={onTogglePanel} className="stork trans-color-btn">
        {state.panelIsOpen ? '▲' : '▼'}
      </button>
    </div>
  );
};
