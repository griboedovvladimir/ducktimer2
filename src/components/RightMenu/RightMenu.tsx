import React from 'react';

import { Popups } from '../../shared/enums/popups.enum';
import { Exp, Temp, Vol } from '../../shared/icons';

export const RightMenu = ({ onOpenRightMenuPopup }: any) => {
  return (
    <div className="rightpanel">
      <div className="panel">
        <Vol title="Volume mixer" className="icon2" onClick={() => onOpenRightMenuPopup(Popups.VOLUME_MIXER)} />
        <Temp
          title="Time/temp converter"
          className="icon2"
          onClick={() => onOpenRightMenuPopup(Popups.TEMP_CONVERTER)}
        />
        <Exp title="Push processing" className="icon2" onClick={() => onOpenRightMenuPopup(Popups.PUSH_PROCESSING)} />
      </div>
    </div>
  );
};
