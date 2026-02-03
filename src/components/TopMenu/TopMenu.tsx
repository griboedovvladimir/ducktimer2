// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';
import { Clear, Compact, Load, Save, Timer } from '../../shared/icons';
import { LoadBoard } from '../LoadBoard';
import { Popover } from '../Popover/Popover';
import { SaveBoard } from '../SaveBoard/SaveBoard';
import styles from '../../pages/Main/Main.module.css';

interface TopMenuProps {
  addTimer: () => void;
  clearBoard: () => void;
  isCompactView: boolean;
  toggleCompactView: () => void;
}

export const TopMenu = ({ addTimer, clearBoard, isCompactView, toggleCompactView }: TopMenuProps) => {
  return (
    <div id="controlpanel" className={styles.topMenu}>
      <button type="button" onClick={addTimer}>
        <Timer />
      </button>
      <button 
        type="button" 
        onClick={toggleCompactView}
        title={isCompactView ? "Switch to normal view" : "Switch to compact view"}
        className={isCompactView ? styles.compactViewActive : styles.compactViewInactive}
      >
        <Compact />
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
