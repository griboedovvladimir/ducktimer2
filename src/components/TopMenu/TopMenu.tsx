// @ts-nocheck // TODO: remove this line after stable popover API
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
      <button type="button" onClick={addTimer}>
        <Timer />
      </button>
      <button type="button" aria-label={PopupTarget.Load} popovertarget={PopupTarget.Load}>
        <Load />
      </button>
      <button type="button" aria-label={PopupTarget.Save} popovertarget={PopupTarget.Save}>
        <Save />
      </button>
      <button type="button" onClick={clearBoard}>
        <Clear />
      </button>

      <Popover popoverTarget={PopupTarget.Save}>
        <SaveBoard />
      </Popover>

      <Popover popoverTarget={PopupTarget.Load}>
        <LoadBoard />
      </Popover>
    </div>
  );
};
