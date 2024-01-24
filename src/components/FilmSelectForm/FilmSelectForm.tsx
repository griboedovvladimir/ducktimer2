import { useRef, useState } from 'react';

import { useFetchFilmsPropertiesMutation, useFetchFilmsQuery } from '../../services/filmApiService';
import { FilmPropertiesForm } from '../FilmPropertiesForm';

export enum FilmFormFields {
  Film = 'film',
  Type = 'type',
  Dev = 'dev',
}

export const FilmSelectForm = () => {
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
    <form onChange={() => setIsFilmSelected(false)}>
      <p>Select film, film type and developer</p>
      <select defaultValue={filmsOptions?.films[0]} name="film-select" ref={film}>
        {filmsOptions?.films.map((filmOption) => <option>{filmOption}</option>)}
      </select>
      <select name="film-type-select" defaultValue="35mm" ref={type}>
        <option>35mm</option>
        <option>120</option>
        <option>sheet</option>
      </select>
      <select defaultValue={filmsOptions?.developers[0]} name="dev-select" ref={dev}>
        {filmsOptions?.developers.map((developer) => <option>{developer}</option>)}
      </select>
      <button className="trans-color-btn" onClick={() => onFilmSelect()} type="button">
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
          />
        ) : (
          <p>Selected film and developer can&apost use together</p>
        ))}
      {isFilmSelected && isFilmPropertiesLoading && <p>Loading...</p>}
    </form>
  );
};
