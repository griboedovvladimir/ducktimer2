import { useRef, useState } from 'react';

import { useFetchTimeMutation } from '../../services/filmApiService';
import styles from './FilmPropertiesForm.module.css';

enum FilmPropertiesFormField {
  Asaiso = 'asaiso',
  Dilution = 'dilution',
  Temp = 'temp',
}

interface IProps {
  film: string;
  type: string;
  dev: string;
  setTimer: (time: string | undefined) => void;
  filmProperties: {
    asaiso: string[];
    dilution: string[];
    temp: string[];
  };
}

export const FilmPropertiesForm = ({ film, type, dev, filmProperties, setTimer }: IProps) => {
  const asaiso = useRef<any>();
  const dilution = useRef<any>();
  const temp = useRef<any>();
  const [isFilmSelected, setIsFilmSelected] = useState(false);

  const [trigger, { data: time, isLoading }] = useFetchTimeMutation();

  const setTime = () => {
    setIsFilmSelected(true);
    trigger({
      film,
      type,
      dev,
      [FilmPropertiesFormField.Asaiso]: asaiso.current.value,
      [FilmPropertiesFormField.Dilution]: dilution.current.value,
      [FilmPropertiesFormField.Temp]: temp.current.value,
    })
      .unwrap()
      .then((res) => setTimer(new Date(parseInt(res, 10) * 60 * 1000).toUTCString().match(/(\d\d:\d\d:\d\d)/)?.[0]));
  };

  return (
    <div className={styles.form}>
      <div>Select parameters</div>
      <p className={styles.formLabels}>
        <span>ISO/ASA</span>
        <span>dilution</span>
        <span>temperature</span>
      </p>
      <div className={styles.formRow}>
        <select defaultValue={filmProperties?.asaiso[0]} name="iso" ref={asaiso}>
          {filmProperties?.asaiso.map((isoProperty: any) => <option>{isoProperty}</option>)}
        </select>
        <select defaultValue={filmProperties?.dilution[0]} name="dilution" ref={dilution}>
          {filmProperties?.dilution.map((dilutionProperty: any) => <option>{dilutionProperty}</option>)}
        </select>
        <select defaultValue={filmProperties?.temp[0]} name="temp" ref={temp}>
          {filmProperties?.temp.map((tempProperty: any) => <option>{tempProperty}</option>)}
        </select>
      </div>
      <button className={styles.setTimeButton} onClick={setTime} type="button">
        Set time
      </button>
      {!isLoading && time === 'false' && isFilmSelected && <p>Time not found, select other parameters</p>}
      {isLoading && <p>Loading...</p>}
    </div>
  );
};
