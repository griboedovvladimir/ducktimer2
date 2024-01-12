// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

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
            popovertarget="volumMixer"
          >
            <Vol title="Volume mixer" className="button-icon" />
          </button>
          <button
            type="button"
            aria-label="Time/temp converter"
            // eslint-disable-next-line react/no-unknown-property
            popovertarget="tempConverter"
          >
            <Temp title="Time/temp converter" className="button-icon" />
          </button>
          <button
            type="button"
            aria-label="Push processing"
            // eslint-disable-next-line react/no-unknown-property
            popovertarget="pushProcessing"
          >
            <Exp title="Push processing" className="button-icon" />
          </button>
        </div>
      </div>

      <Popover popoverTarget="volumMixer">
        <VolumeMixer />
      </Popover>

      <Popover popoverTarget="tempConverter">
        <Converter />
      </Popover>

      <Popover popoverTarget="pushProcessing">
        <PushProcessing />
      </Popover>
    </>
  );
};
