import { useRef, useState } from 'react';

export const VolumeMixer = () => {
  const vol = useRef<any>('');
  const units1 = useRef<any>('');
  const units2 = useRef<any>('');
  const units3 = useRef<any>('');
  const [state, setState] = useState({
    total1: '',
    total2: '',
    total3: '',
    water: '',
  });

  const calcVol = () => {
    const FinalVol = parseFloat(vol.current.value);
    const Units1 = parseFloat(units1.current.value);
    const Units2 = parseFloat(units2.current.value);
    const Units3 = parseFloat(units3.current.value);

    const TotalUnits = Units1 + Units2 + Units3;
    const TotalMix = FinalVol / TotalUnits;

    const newState = { ...state };

    newState.total1 = `${Math.round(TotalMix * Units1)} ml`;
    newState.total2 = ` + ${Math.round(TotalMix * Units2)} ml`;

    if (Units3 > 0) {
      newState.total3 = ` + ${Math.round(TotalMix * Units3)} ml`;
    } else {
      newState.total3 = '';
    }

    setState({ ...state, ...newState, water: ' water' });
  };

  return (
    <div className="content">
      <form name="form1" action="" method="get">
        <p className="mixer-labels">
          Dilution:&nbsp;&nbsp;
          <input type="text" name="units1" defaultValue="1" maxLength={4} className="mixer-field" ref={units1} />
          +
          <input type="text" name="units2" defaultValue="9" maxLength={4} className="mixer-field" ref={units2} />
          +
          <input type="text" name="units3" defaultValue="0" maxLength={4} className="mixer-field" ref={units3} />
        </p>
        <p className="mixer-labels">
          Final Volume&nbsp;(ml):&nbsp;&nbsp;
          <input type="text" name="vol" defaultValue="500" maxLength={6} className="field__calck" ref={vol} />
        </p>
        <p className="mixer-labels">
          Total&nbsp;=&nbsp;&nbsp;
          <span>{state.total1}</span>
          <span>{state.total2}</span>
          <span>{state.total3}</span>
          <span>{state.water}</span>
        </p>
        <p className="mixer__calc">
          <input
            className="mixer__calc-button"
            onClick={calcVol}
            type="button"
            name="button"
            defaultValue="Calculate"
          />
        </p>
      </form>
    </div>
  );
};
