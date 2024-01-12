// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

import { Popups } from '../../shared/enums';
import { Exp, Temp, Vol } from '../../shared/icons';
import { Converter } from '../Converter';
import { PushProcessing } from '../PushProcessing';
import { VolumeMixer } from '../VolumeMixer';

export const RightMenu = ({ onOpenRightMenuPopup }: any) => {
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
            <Vol title="Volume mixer" className="icon2" onClick={() => onOpenRightMenuPopup(Popups.VOLUME_MIXER)} />
          </button>
          <button
            type="button"
            aria-label="Time/temp converter"
            // eslint-disable-next-line react/no-unknown-property
            popovertarget="tempConverter"
          >
            <Temp
              title="Time/temp converter"
              className="icon2"
              onClick={() => onOpenRightMenuPopup(Popups.TEMP_CONVERTER)}
            />
          </button>
          <button
            type="button"
            aria-label="Push processing"
            // eslint-disable-next-line react/no-unknown-property
            popovertarget="pushProcessing"
          >
            <Exp
              title="Push processing"
              className="icon2"
              onClick={() => onOpenRightMenuPopup(Popups.PUSH_PROCESSING)}
            />
          </button>
        </div>
      </div>

      {/* eslint-disable-next-line react/no-unknown-property */}
      <div id="volumMixer" popover="auto" className="popup">
        <VolumeMixer />
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <div id="tempConverter" popover="auto" className="popup">
        <Converter />
      </div>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <div id="pushProcessing" popover="auto" className="popup">
        <PushProcessing />
      </div>
    </>
  );
};
