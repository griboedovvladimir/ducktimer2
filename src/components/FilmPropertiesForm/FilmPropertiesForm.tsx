import { useEffect, useState } from 'react';

import { useFetchTimeMutation } from '../../services/filmApiService';

enum FilmPropertiesFormField {
  Asaiso = 'asaiso',
  Dilution = 'dilution',
  Temp = 'temp',
}

export const FilmPropertiesForm = ({ film, type, dev, filmProperties }: any) => {
  const [isFormChanged, setIsFormChanged] = useState(false);
  const [state, setState] = useState({
    type,
    film,
    dev,
    [FilmPropertiesFormField.Asaiso]: '',
    [FilmPropertiesFormField.Dilution]: '',
    [FilmPropertiesFormField.Temp]: '',
  });

  useEffect(() => {
    if (filmProperties) {
      setState({
        ...state,
        [FilmPropertiesFormField.Asaiso]: filmProperties.asaiso[0],
        [FilmPropertiesFormField.Dilution]: filmProperties.dilution[0],
        [FilmPropertiesFormField.Temp]: filmProperties.temp[0],
      });
    }
  }, [filmProperties, state]);

  const [trigger, { data: time }] = useFetchTimeMutation();

  const onChangeForm = (field: FilmPropertiesFormField, value: string) => {
    setIsFormChanged(true);
    setState({ ...state, [field]: value });
  };

  const setTime = () => {
    trigger(
      isFormChanged
        ? state
        : {
            ...state,
            [FilmPropertiesFormField.Asaiso]: filmProperties?.asaiso[0] || '',
            [FilmPropertiesFormField.Dilution]: filmProperties?.dilution[0] || '',
            [FilmPropertiesFormField.Temp]: filmProperties?.temp[0] || '',
          },
    );
  };
  const errorMessage = 'errorMessage';

  if (!filmProperties?.asaiso.length && !filmProperties?.dilution.length && !filmProperties?.temp.length) {
    return <p>Time not found, select other parameters</p>;
  }

  return (
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
        {filmProperties?.asaiso.map((iso: any) => <option>{iso}</option>)}
      </select>
      <select
        defaultValue={filmProperties?.dilution[0]}
        name="dilution"
        onChange={({ target }) => onChangeForm(FilmPropertiesFormField.Dilution, target.value)}
      >
        {filmProperties?.dilution.map((dilution: any) => <option>{dilution}</option>)}
      </select>
      <select
        defaultValue={filmProperties?.temp[0]}
        name="temp"
        onChange={({ target }) => onChangeForm(FilmPropertiesFormField.Temp, target.value)}
      >
        {filmProperties?.temp.map((temp: any) => <option>{temp}</option>)}
      </select>
      <button className="trans-color-btn" onClick={setTime} type="button">
        Set time
      </button>
      {errorMessage}
      {time}
    </div>
  );
};
