// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';
import { Clear, Compact, Load, Save, Timer } from '../../shared/icons';
import { LoadBoard } from '../LoadBoard';
import { Popover } from '../Popover/Popover';
import { SaveBoard } from '../SaveBoard/SaveBoard';
import styles from '../../pages/Main/Main.module.css';

/**
 * Props for the TopMenu component
 */
interface TopMenuProps {
  addTimer: () => void;
  clearBoard: () => void;
  isCompactView: boolean;
  toggleCompactView: () => void;
}

/**
 * Top menu bar with controls for timer management and view options
 * @param addTimer - Function to add a new timer
 * @param clearBoard - Function to clear all timers
 * @param isCompactView - Current state of compact view
 * @param toggleCompactView - Function to toggle between normal and compact view
 */
export const TopMenu = ({ addTimer, clearBoard, isCompactView, toggleCompactView }: TopMenuProps) => {
  return (
    <div id="controlpanel" className={styles.topMenu}>
      <button type="button" onClick={addTimer}>
        <Timer />
      </button>
      {/* Toggle button to switch between normal (6 cols) and compact (8 cols) timer layouts */}
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
