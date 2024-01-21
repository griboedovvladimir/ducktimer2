import { useEffect, useState } from 'react';

import { useFetchFilmsPropertiesMutation, useFetchFilmsQuery } from '../../services/filmApiService';
import { FilmPropertiesForm } from '../FilmPropertiesForm';

export enum FilmFormFields {
  Film = 'film',
  Type = 'type',
  Dev = 'dev',
}

export const FilmSelectForm = () => {
  const { data: filmsOptions, isLoading, error } = useFetchFilmsQuery('');
  const [trigger, { data: filmProperties }] = useFetchFilmsPropertiesMutation();

  const [isFilmSelected, setIsFilmSelected] = useState(false);
  const [filmFormModel, setFilmFormModel] = useState({
    film: '',
    type: '35mm',
    dev: '',
  });

  useEffect(() => {
    if (filmsOptions) {
      setFilmFormModel({
        ...filmFormModel,
        film: filmsOptions.films[0],
        dev: filmsOptions.developers[0],
      });
    }
  }, [filmFormModel, filmsOptions]);

  const onChangeFormFields = (type: FilmFormFields, value: string): void => {
    setFilmFormModel({ ...filmFormModel, [type]: value });
  };

  const onFilmSelect = () => {
    setIsFilmSelected(true);
    trigger({ film: filmFormModel.film, dev: filmFormModel.dev });
  };

  // eslint-disable-next-line no-nested-ternary
  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Something went wrong</p>
  ) : (
    <form>
      <p>Select film, film type and developer</p>
      <select
        defaultValue={filmsOptions?.films[0]}
        onChange={({ target }) => onChangeFormFields(FilmFormFields.Film, target.value)}
        name="film-select"
      >
        {filmsOptions?.films.map((film) => <option>{film}</option>)}
      </select>
      <select
        onChange={({ target }) => onChangeFormFields(FilmFormFields.Type, target.value)}
        name="film-type-select"
        defaultValue="35mm"
      >
        <option>35mm</option>
        <option>120</option>
        <option>sheet</option>
      </select>
      <select
        defaultValue={filmsOptions?.developers[0]}
        onChange={({ target }) => onChangeFormFields(FilmFormFields.Dev, target.value)}
        name="dev-select"
      >
        {filmsOptions?.developers.map((developer) => <option>{developer}</option>)}
      </select>
      <button className="trans-color-btn" onClick={() => onFilmSelect()} type="button">
        Next
      </button>
      {isFilmSelected && <FilmPropertiesForm {...filmFormModel} filmProperties={filmProperties} />}
    </form>
  );
};
