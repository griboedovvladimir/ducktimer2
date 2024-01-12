export const VolumeMixer = () => {
  return (
    <div className="content">
      <form name="form1" action="" method="get">
        <p className="mixer-labels">
          Dilution:&nbsp;&nbsp;
          <input type="text" name="units1" value="1" maxLength={4} className="mixer-field" />
          +
          <input type="text" name="units2" value="9" maxLength={4} className="mixer-field" />
          +
          <input type="text" name="units3" value="0" maxLength={4} className="mixer-field" />
        </p>
        <p className="mixer-labels">
          Final Volume&nbsp;(ml):&nbsp;&nbsp;
          <input type="text" name="vol" value="500" maxLength={6} className="field__calck" />
        </p>
        <p className="mixer-labels">
          Total&nbsp;=&nbsp;&nbsp;
          <span id="Total1" />
          <span id="Total2" />
          <span id="Total3" />
          <span id="Water" />
        </p>
        <p className="mixer__calc">
          <input id="volumeCalc" className="mixer__calc-button" type="button" name="button" value="Calculate" />
        </p>
      </form>
    </div>
  );
};
