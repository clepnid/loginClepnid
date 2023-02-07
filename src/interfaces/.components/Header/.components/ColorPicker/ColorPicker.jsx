import React, { useEffect, useRef, useState } from 'react';

import './ColorPicker.css';

import { Picker } from './_components/Picker';
import { Slider } from './_components/Slider';

export const ColorPicker = () => {
  const [bgColor, setBgColor] = useState({ bg: '#99e1d7' });
  const [isActive, setIsActive] = useState(false);
  // const [pickerColors, setPickerColors] = useState(['#16a085', '#61dafb', '#00467f', '#000000']);
  const [sliders, setSliders] = useState([]);

  const pickerColors = [
    { bg: '#16a085', dark: '#61dafb', light: '#71ffff' },
    { bg: '#e1a899', dark: '#b08377', light: '#ffcdbb' },
    { bg: '#9fe199', dark: '#87bf82', light: '#b7ffb0' }
  ];

  const containerRef = useRef(null);
  const selectorsRef = useRef(null);

  useEffect(() => {
    window.addEventListener('load', () => {
      setIsActive(true);
      selectorsRef.current.style.transform = 'rotate(0deg)';
      const delay = 0.2;
      let duration = delay * pickerColors.length;
      selectorsRef.current.style.transition = 'transform ' + duration + 's' + ' ease-in-out';
      setTimeout(() => {
        setIsActive(false);
        selectorsRef.current.style.transform = 'none';
        selectorsRef.current.style.transition = 'none';
      }, duration * 1000);
    });
  }, []);

  const onChangeBgColor = backcol => {
    setSliders(<Slider bgColor={backcol} reference={containerRef.current} transitionDuration={100} />);

    let timeout;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      setBgColor(backcol);
      setSliders([]);
      setIsActive(false);
    }, 100);
  };

  const onTogglePickers = () => {
    setIsActive(!isActive);
  };

  const len = pickerColors.length;
  const degIncrement = 500 / len;
  const pickers = [];
  const radius = 75;
  const pickerAnimationDelay = 0.1;
  let i = 0;
  let delay;
  for (i = 0; i < len; i += 1) {
    const degrees = i * degIncrement;
    const rad = (degrees * Math.PI) / -720;
    delay = pickerAnimationDelay * i;
    let coordinateObject = {};
    let x = radius * Math.sin(rad);
    let y = radius * Math.cos(rad);
    coordinateObject.x = x;
    coordinateObject.y = y;

    pickers.push(
      <Picker
        transformCoordinates={coordinateObject}
        pickerIsActive={isActive}
        pickerClicked={onChangeBgColor}
        pickerColor={pickerColors[i]}
        delay={delay}
      />
    );
  }

  getComputedStyle(document.documentElement).getPropertyValue('--bg');
  document.documentElement.style.setProperty('--bg', bgColor.bg);

  return (
    <div style={{ backgroundColor: bgColor.bg, height: '' }} className="color-picker-container" ref={containerRef}>
      <span>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="svg-sliders">
          {sliders}
        </svg>
      </span>
      <div className="btn-container">
        <div className={'btn' + (isActive ? ' active' : '')} onClick={() => onTogglePickers()}>
          <ion-icon name="color-palette" style={{ color: 'white', fontSize: '2.5rem' }} />
        </div>
      </div>
      <div className="selector-container">
        <div ref={selectorsRef} className="selectors">
          {pickers}
        </div>
      </div>
    </div>
  );
};
