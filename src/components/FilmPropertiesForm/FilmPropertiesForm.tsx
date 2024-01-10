import { useFetchFilmsPropertiesQuery } from '../../services/filmApiService';

export const FilmPropertiesForm = ({ film, type, dev }: any) => {
  const { data: filmProperties } = useFetchFilmsPropertiesQuery({ film, dev });

  const setTime = () => {
    type.toString();
  };
  const errorMessage = 'errorMessage';

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
      <select name="iso" id="iso">
        {filmProperties?.iso.map((iso) => <option>{iso}</option>)}
      </select>
      <select name="dilution" id="dilution">
        {filmProperties?.dilution.map((dilution) => <option>{dilution}</option>)}
      </select>
      <select name="temp" id="temp">
        {filmProperties?.temp.map((temp) => <option>{temp}</option>)}
      </select>
      <button className="trans-color-btn" onClick={setTime} type="button">
        Set time
      </button>
      {errorMessage}
    </div>
  );
};
