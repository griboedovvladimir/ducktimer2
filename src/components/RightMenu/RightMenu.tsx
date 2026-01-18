// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';
import { Exp, Grid, Temp, Vol } from '../../shared/icons';
import { TempConverter } from '../TempConverter';
import { Popover } from '../Popover/Popover';
import { PushProcessing } from '../PushProcessing';
import { VolumeMixer } from '../VolumeMixer';
import styles from './RightMenu.module.css';

interface IProps {
  compactView: boolean;
  setCompactView: (value: boolean) => void;
}

export const RightMenu = ({ compactView, setCompactView }: IProps) => {
  const toggleCompactView = () => {
    setCompactView(!compactView);
  };

  return (
    <>
      <div className={styles.panel}>
        <button type="button" popovertarget={PopupTarget.VolumeMixer}>
          <Vol />
        </button>
        <button type="button" aria-label={PopupTarget.TempConverter} popovertarget={PopupTarget.TempConverter}>
          <Temp />
        </button>
        <button type="button" aria-label={PopupTarget.PushProcessing} popovertarget={PopupTarget.PushProcessing}>
          <Exp />
        </button>
        <button
          type="button"
          aria-label="Toggle compact view"
          onClick={toggleCompactView}
          title={compactView ? 'Grid view' : 'Compact view'}
        >
          <Grid />
        </button>
      </div>

      <Popover popoverTarget={PopupTarget.VolumeMixer}>
        <VolumeMixer />
      </Popover>

      <Popover popoverTarget={PopupTarget.TempConverter}>
        <TempConverter />
      </Popover>

      <Popover popoverTarget={PopupTarget.PushProcessing}>
        <PushProcessing />
      </Popover>
    </>
  );
};
