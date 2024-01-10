import { useState } from 'react';

import { useFetchFilmsQuery } from '../../services/filmApiService';
import { FilmPropertiesForm } from '../FilmPropertiesForm';

enum FormFields {
  Film = 'film-select',
  Type = 'film-type-select',
  Dev = 'dev-select',
}

export const FilmSelectForm = () => {
  const { data: filmsOptions, isLoading, error } = useFetchFilmsQuery('');

  const [isFilmSelected, setIsFilmSelected] = useState(false);

  const filmFormModel = {
    film: '',
    type: '35mm',
    dev: '',
  };

  const onChangeFormFields = (type: FormFields, value: string): void => {
    switch (type) {
      case FormFields.Film:
        filmFormModel.film = value;
        break;
      case FormFields.Type:
        filmFormModel.type = value;
        break;
      case FormFields.Dev:
        filmFormModel.dev = value;
        break;
      default:
        break;
    }
  };

  // eslint-disable-next-line no-nested-ternary
  return isLoading ? (
    <p>Loading...</p>
  ) : error ? (
    <p>Something went wrong</p>
  ) : (
    <form>
      <p>Select film, film type and developer</p>
      <select onChange={({ target }) => onChangeFormFields(FormFields.Film, target.value)} name="film-select">
        {filmsOptions?.films.map((film) => <option>{film}</option>)}
      </select>
      <select onChange={({ target }) => onChangeFormFields(FormFields.Type, target.value)} name="film-type-select">
        <option>35mm</option>
        <option>120</option>
        <option>sheet</option>
      </select>
      <select onChange={({ target }) => onChangeFormFields(FormFields.Dev, target.value)} name="dev-select">
        {filmsOptions?.developers.map((developer) => <option>{developer}</option>)}
      </select>
      <button className="trans-color-btn" onClick={() => setIsFilmSelected(true)} type="button">
        Select
      </button>
      {isFilmSelected && <FilmPropertiesForm {...filmFormModel} />}
    </form>
  );
};
