// @ts-nocheck // TODO: remove this line after stable popover API
import { Tooltip } from 'antd';
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';
import { Exp, Temp, Vol } from '../../shared/icons';
import { TempConverter } from '../TempConverter';
import { Popover } from '../Popover/Popover';
import { PushProcessing } from '../PushProcessing';
import { VolumeMixer } from '../VolumeMixer';

export const RightMenu = () => {
  return (
    <>
      <div className="rightpanel">
        <div className="panel">
          <Tooltip title="Volume mixer">
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              // eslint-disable-next-line react/no-unknown-property
              popovertarget={PopupTarget.VolumeMixer}
            >
              <Vol className="button-icon" />
            </button>
          </Tooltip>
          <Tooltip title="Time/temp converter">
            <button
              type="button"
              aria-label="Time/temp converter"
              // eslint-disable-next-line react/no-unknown-property
              popovertarget={PopupTarget.TempConverter}
            >
              <Temp className="button-icon" />
            </button>
          </Tooltip>
          <Tooltip title="Push processing">
            <button
              type="button"
              aria-label="Push processing"
              // eslint-disable-next-line react/no-unknown-property
              popovertarget={PopupTarget.PushProcessing}
            >
              <Exp className="button-icon" />
            </button>
          </Tooltip>
        </div>
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
