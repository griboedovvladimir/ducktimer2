import React, { useEffect } from 'react';

import { useFetchFilmsQuery } from '../../services/filmApiService';

enum FormFields {
  Film = 'film-select',
  Type = 'film-type-select',
  Dev = 'dev-select',
}

export const FilmSelectForm = () => {
  const { data: filmsOptions, isLoading } = useFetchFilmsQuery('');

  const filmFormModel = {
    film: '',
    type: '35mm',
    dev: '',
  };

  useEffect(() => {
    // filmFormModel = {
    //   film: this.props.formsOptions[0][0],
    //   type: '35mm',
    //   dev: this.props.formsOptions[1][0],
    // };
  }, []);

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

  const getSecondFilmFormOptions = (): void => {};

  // const getSecondFilmFormOptions = (): void => {
  //   this.setSecondFilmPresetForm('Loading...');
  //   restService
  //     .post(API_CONSTANTS.FILM_FORM_SECOND_STEP, this.filmFormModel)
  //     .then((resp) => resp.json())
  //     .then((data: any) => {
  //       data === 'false'
  //         ? this.setSecondFilmPresetForm("Selected film and developer can't use together")
  //         : this
  //             .setSecondFilmPresetForm
  //             // <SecondFilmPresetForm
  //             //   id={this.props.id}
  //             //   firstFormData={this.filmFormModel}
  //             //   formsOptions={data}
  //             // />
  //             ();
  //     });
  // };

  // private setSecondFilmPresetForm(value: string | null | React.ReactNode) {
  //   this.setState({ ...this.state, secondFilmPresetForm: value });
  // }

  return isLoading ? (
    <p>Loading...</p>
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
      <button className="trans-color-btn" onClick={getSecondFilmFormOptions} type="button">
        Select
      </button>
      {/* {secondFilmPresetForm} */}
    </form>
  );
};
