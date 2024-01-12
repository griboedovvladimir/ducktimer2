// @ts-nocheck // TODO: remove this line after stable popover API
import React from 'react';

export const Popover = ({ popoverTarget, children }: PropsWithChildren<{ popoverTarget: string }>) => {
  return (
    // eslint-disable-next-line react/no-unknown-property
    <div id={popoverTarget} popover="auto" className="popup">
      <div className="popup-container">
        {/* eslint-disable-next-line react/no-unknown-property */}
        <button type="button" className="popup__close" popovertarget={popoverTarget} popovertargetaction="hide">
          ×
        </button>
        {children}
      </div>
    </div>
  );
};
