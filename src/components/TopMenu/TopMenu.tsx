import { Tooltip } from 'antd';
import React from 'react';

import { Clear, Load, Save, Timer } from '../../shared/icons';

export const TopMenu = ({ addTimer, clearBoard }: any) => {
  return (
    <div id="controlpanel">
      <Tooltip title="Add">
        <Timer className="controlpanel icon2" onClick={addTimer} />
      </Tooltip>
      <Tooltip title="Load board">
        <Load className="controlpanel icon2" />
      </Tooltip>
      <Tooltip title="Save board">
        <Save className="controlpanel icon2" />
      </Tooltip>
      <Tooltip title="Clear board">
        <Clear onClick={clearBoard} className="controlpanel icon2" />
      </Tooltip>
    </div>
  );
};
