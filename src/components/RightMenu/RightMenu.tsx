// @ts-nocheck // TODO: remove this line after stable popover API
import { Tooltip } from 'antd';
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';
import { Exp, Temp, Vol } from '../../shared/icons';
import { TempConverter } from '../TempConverter';
import { Popover } from '../Popover/Popover';
import { PushProcessing } from '../PushProcessing';
import { VolumeMixer } from '../VolumeMixer';
import styles from './RightMenu.module.css';

export const RightMenu = () => {
  return (
    <>
      <div className={styles.panel}>
        <Tooltip title="Volume mixer">
          <button type="button" popovertarget={PopupTarget.VolumeMixer}>
            <Vol className="button-icon" />
          </button>
        </Tooltip>
        <Tooltip title="Time/temp converter">
          <button type="button" aria-label={PopupTarget.TempConverter} popovertarget={PopupTarget.TempConverter}>
            <Temp className="button-icon" />
          </button>
        </Tooltip>
        <Tooltip title="Push processing">
          <button type="button" aria-label={PopupTarget.PushProcessing} popovertarget={PopupTarget.PushProcessing}>
            <Exp className="button-icon" />
          </button>
        </Tooltip>
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
