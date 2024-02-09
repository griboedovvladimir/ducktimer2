// @ts-nocheck // TODO: remove this line after stable popover API
import { Tooltip } from 'antd';
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';
import { Clear, Load, Save, Timer } from '../../shared/icons';
import { Popover } from '../Popover/Popover';

export const TopMenu = ({ addTimer, clearBoard }: any) => {
  return (
    <div id="controlpanel">
      <Tooltip title="Add">
        <Timer className="controlpanel icon2" onClick={addTimer} />
      </Tooltip>
      <Tooltip title="Load board">
        <button
          type="button"
          aria-label={PopupTarget.Load}
          // eslint-disable-next-line react/no-unknown-property
          popovertarget={PopupTarget.Load}
        >
          <Load className="controlpanel icon2" />
        </button>
      </Tooltip>
      <Tooltip title="Save board">
        <button
          type="button"
          aria-label={PopupTarget.Save}
          // eslint-disable-next-line react/no-unknown-property
          popovertarget={PopupTarget.Save}
        >
          <Save className="controlpanel icon2" />
        </button>
      </Tooltip>
      <Tooltip title="Clear board">
        <Clear onClick={clearBoard} className="controlpanel icon2" />
      </Tooltip>

      <Popover popoverTarget={PopupTarget.Save}>
        <div>Is not ready yet</div>
      </Popover>

      <Popover popoverTarget={PopupTarget.Load}>
        <div>Is not ready yet</div>
      </Popover>
    </div>
  );
};
