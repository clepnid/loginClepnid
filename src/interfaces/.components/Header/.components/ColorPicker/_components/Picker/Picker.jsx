import React from 'react';

export const Picker = ({ delay, pickerClicked, pickerColor, pickerIsActive, transformCoordinates }) => {
  const onPickerClicked = () => {
    pickerClicked(pickerColor);
  };

  return (
    <span
      style={
        pickerIsActive
          ? {
              backgroundColor: pickerColor.bg,
              transform: 'translate(' + transformCoordinates.x + 'px, ' + transformCoordinates.y + 'px)',
              transitionDelay: delay + 's'
            }
          : {
              backgroundColor: pickerColor.bg,
              transform: 'translate(0px,0px)',
              transitionDelay: delay + 's'
            }
      }
      className="selector"
      onClick={() => onPickerClicked()}
    />
  );
};
