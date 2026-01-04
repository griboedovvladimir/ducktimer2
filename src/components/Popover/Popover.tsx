// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

import { PopupTarget } from '../../shared/enums/popup-target';

const PopupsTitles = {
  [PopupTarget.VolumeMixer]: 'Volume mixer',
  [PopupTarget.TempConverter]: 'Time/Temp Conversion Chart',
  [PopupTarget.PushProcessing]: 'Push processing',
};

export const Popover = ({ popoverTarget, children }: PropsWithChildren<{ popoverTarget: string }>) => {
  return (
    <div id={popoverTarget} popover="auto" className="popup">
      <div className="popup-container">
        <h1>{PopupsTitles[popoverTarget]}</h1>
        <button type="button" className="popup__close" popovertarget={popoverTarget} popovertargetaction="hide">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
