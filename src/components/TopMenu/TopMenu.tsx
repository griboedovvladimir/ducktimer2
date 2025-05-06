// @ts-nocheck // TODO: remove this line after stable popover API
import { Tooltip } from 'antd';
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';
import { Clear, Load, Save, Timer } from '../../shared/icons';
import { LoadBoard } from '../LoadBoard';
import { Popover } from '../Popover/Popover';
import { SaveBoard } from '../SaveBoard/SaveBoard';
import styles from '../../pages/Main/Main.module.css';

export const TopMenu = ({ addTimer, clearBoard }: any) => {
  return (
    <div id="controlpanel" className={styles.topMenu}>
      <Tooltip title="Add">
        <Timer className="controlpanel icon" onClick={addTimer} />
      </Tooltip>
      <Tooltip title="Load board">
        <button type="button" aria-label={PopupTarget.Load} popovertarget={PopupTarget.Load}>
          <Load className="controlpanel icon" />
        </button>
      </Tooltip>
      <Tooltip title="Save/Delete board">
        <button type="button" aria-label={PopupTarget.Save} popovertarget={PopupTarget.Save}>
          <Save className="controlpanel icon" />
        </button>
      </Tooltip>
      <Tooltip title="Clear board">
        <Clear onClick={clearBoard} className="controlpanel icon" />
      </Tooltip>

      <Popover popoverTarget={PopupTarget.Save}>
        <SaveBoard />
      </Popover>

      <Popover popoverTarget={PopupTarget.Load}>
        <LoadBoard />
      </Popover>
    </div>
  );
};
