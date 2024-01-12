export const PushProcessing = () => {
  return (
    <div className="content">
      <p>
        These are general guidelines when no published development times are available. To use this chart multiply the
        published time at recommended ASA by the factor in parenthesis (ie. If Tri-X rated at 400ASA is normally
        developed for 6 mins in a standard soup, then when Tri-X is pushed three stops to 3200ASA development would be:
        6 x 4.5 = 27 mins). Please use these recommendations as starting points only. In many cases these times will
        prove excessive, but when all else fails they can be a good guideline. Please note separate data for Tmax films.
      </p>
      <br />
      <dl>
        <dt>Standard Developer</dt>
        <dd>1 stop push = (x1.5)</dd>
        <dd>2 stop push = (x2.25)</dd>
        <dd>3 stop push = (x4.5)</dd>
        <dt>Compensating Developer</dt>
        <dd>1 stop push = (x1.4)</dd>
        <dd>2 stop push = (x1.85)</dd>
        <dd>3 stop push = (x2.5)</dd>
        <dt>TMax Films</dt>
        <dd>1 stop push = no change</dd>
        <dd>2 stop push = (x1.33)</dd>
        <dd>3 stop push = (x1.66)</dd>
      </dl>
      <br />
      <p>
        *Compensating developers include Microphen, TMax, and any other developers which are specifically formulated for
        push processing
      </p>
    </div>
  );
};
