import React from 'react';

import { Clear, Load, Save, Timer } from '../../shared/icons';

export const TopMenu = ({ addTimer, clearBoard }: any) => {
  return (
    <div id="controlpanel">
      <Timer title="Add" className="controlpanel icon2" onClick={addTimer} />
      <Load title="Load board" className="controlpanel icon2" />
      <Save title="Save board" className="controlpanel icon3" />
      <Clear title="Clear board" onClick={clearBoard} className="controlpanel icon2" />
    </div>
  );
};
