import { useRef, useState } from 'react';

import { useFetchFilmsPropertiesMutation, useFetchFilmsQuery } from '../../services/filmApiService';
import { FilmPropertiesForm } from '../FilmPropertiesForm';
import styles from './FilmSelectForm.module.css';

export const FilmSelectForm = ({ setTimer }: { setTimer: any }) => {
  const { data: filmsOptions, isLoading, error } = useFetchFilmsQuery('');
  const [trigger, { data: filmProperties, isLoading: isFilmPropertiesLoading }] = useFetchFilmsPropertiesMutation();
  const film = useRef<any>();
  const type = useRef<any>();
  const dev = useRef<any>();

  const [isFilmSelected, setIsFilmSelected] = useState(false);

  const onFilmSelect = () => {
    setIsFilmSelected(true);
    trigger({ film: film.current.value, dev: dev.current.value });
  };

  // eslint-disable-next-line no-nested-ternary
  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Something went wrong</p>
  ) : (
    <form className={styles.form}>
      <p>Select film, film type and developer</p>
      <div className={styles.formRow}>
        <select
          defaultValue={filmsOptions?.films[0]}
          name="film-select"
          ref={film}
          onChange={() => setIsFilmSelected(false)}
        >
          {filmsOptions?.films.map((filmOption) => <option>{filmOption}</option>)}
        </select>
        <select name="film-type-select" defaultValue="35mm" ref={type} onChange={() => setIsFilmSelected(false)}>
          <option>35mm</option>
          <option>120</option>
          <option>sheet</option>
        </select>
        <select
          defaultValue={filmsOptions?.developers[0]}
          name="dev-select"
          ref={dev}
          onChange={() => setIsFilmSelected(false)}
        >
          {filmsOptions?.developers.map((developer) => <option>{developer}</option>)}
        </select>
      </div>
      <button className={styles.nextButton} onClick={() => onFilmSelect()} type="button">
        Next
      </button>
      {isFilmSelected &&
        !isFilmPropertiesLoading &&
        (filmProperties?.asaiso.length && filmProperties.temp.length && filmProperties.dilution.length ? (
          <FilmPropertiesForm
            film={film.current.value}
            dev={dev.current.value}
            type={type.current.value}
            filmProperties={filmProperties}
            setTimer={setTimer}
          />
        ) : (
          <p>Selected film and developer can&apost use together</p>
        ))}
      {isFilmSelected && isFilmPropertiesLoading && <p>Loading...</p>}
    </form>
  );
};
