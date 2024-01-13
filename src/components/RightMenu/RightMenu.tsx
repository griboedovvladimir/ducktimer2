// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';
import { Exp, Temp, Vol } from '../../shared/icons';
import { Converter } from '../Converter';
import { Popover } from '../Popover/Popover';
import { PushProcessing } from '../PushProcessing';
import { VolumeMixer } from '../VolumeMixer';

export const RightMenu = () => {
  return (
    <>
      <div className="rightpanel">
        <div className="panel">
          {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
          <button
            type="button"
            // eslint-disable-next-line react/no-unknown-property
            popovertarget={PopupTarget.VolumeMixer}
          >
            <Vol title="Volume mixer" className="button-icon" />
          </button>
          <button
            type="button"
            aria-label="Time/temp converter"
            // eslint-disable-next-line react/no-unknown-property
            popovertarget={PopupTarget.TempConverter}
          >
            <Temp title="Time/temp converter" className="button-icon" />
          </button>
          <button
            type="button"
            aria-label="Push processing"
            // eslint-disable-next-line react/no-unknown-property
            popovertarget={PopupTarget.PushProcessing}
          >
            <Exp title="Push processing" className="button-icon" />
          </button>
        </div>
      </div>

      <Popover popoverTarget={PopupTarget.VolumeMixer}>
        <VolumeMixer />
      </Popover>

      <Popover popoverTarget={PopupTarget.TempConverter}>
        <Converter />
      </Popover>

      <Popover popoverTarget={PopupTarget.PushProcessing}>
        <PushProcessing />
      </Popover>
    </>
  );
};
