import { useState } from 'react';

import { useFetchFilmsPropertiesQuery, useFetchTimeQuery } from '../../services/filmApiService';

enum FilmPropertiesFormField {
  Asaiso = 'asaiso',
  Dilution = 'dilution',
  Temp = 'temp',
}

export const FilmPropertiesForm = ({ film, type, dev }: any) => {
  const { data: filmProperties, isLoading } = useFetchFilmsPropertiesQuery({ film, dev });

  const [isFormChanged, setIsFormChanged] = useState(false);
  const [state, setState] = useState({
    type,
    film,
    dev,
    [FilmPropertiesFormField.Asaiso]: '',
    [FilmPropertiesFormField.Dilution]: '',
    [FilmPropertiesFormField.Temp]: '',
  });

  const [skip, setSkip] = useState(true);

  const { data: time } = useFetchTimeQuery(
    isFormChanged
      ? state
      : {
          ...state,
          [FilmPropertiesFormField.Asaiso]: filmProperties?.asaiso[0] || '',
          [FilmPropertiesFormField.Dilution]: filmProperties?.dilution[0] || '',
          [FilmPropertiesFormField.Temp]: filmProperties?.temp[0] || '',
        },
    { skip },
  );

  const onChangeForm = (field: FilmPropertiesFormField, value: string) => {
    setIsFormChanged(true);
    setState({ ...state, [field]: value });
  };

  const setTime = () => {
    setSkip((prev) => !prev);
  };
  const errorMessage = 'errorMessage';

  return isLoading ? (
    <p>Loading...</p>
  ) : (
    <div>
      <div>
        Select parameters
        <p>
          <span>ISO/ASA</span>
          <span>dilution</span>
          <span>temperature</span>
        </p>
      </div>
      <select
        defaultValue={filmProperties?.asaiso[0]}
        name="iso"
        onChange={({ target }) => onChangeForm(FilmPropertiesFormField.Asaiso, target.value)}
      >
        {filmProperties?.asaiso.map((iso) => <option>{iso}</option>)}
      </select>
      <select
        defaultValue={filmProperties?.dilution[0]}
        name="dilution"
        onChange={({ target }) => onChangeForm(FilmPropertiesFormField.Dilution, target.value)}
      >
        {filmProperties?.dilution.map((dilution) => <option>{dilution}</option>)}
      </select>
      <select
        defaultValue={filmProperties?.temp[0]}
        name="temp"
        onChange={({ target }) => onChangeForm(FilmPropertiesFormField.Temp, target.value)}
      >
        {filmProperties?.temp.map((temp) => <option>{temp}</option>)}
      </select>
      <button className="trans-color-btn" onClick={setTime} type="button">
        Set time
      </button>
      {errorMessage}
      {time}
    </div>
  );
};
