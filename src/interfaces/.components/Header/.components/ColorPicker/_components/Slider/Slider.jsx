import React, { useEffect, useState, useRef } from 'react';

export const Slider = ({ bgColor, reference, transitionDuration }) => {
  const [ourClientHeight, setOurClientHeight] = useState();
  const [curvePointCoordinatesX, setCurvePointCoordinatesX] = useState(0);
  const [curvePointCoordinatesY, setCurvePointCoordinatesY] = useState(140);
  const [start, setStart] = useState();
  const [startX, setStartX] = useState();
  const [startY, setStartY] = useState(140);
  const [then, setThen] = useState();

  const sliderRef = useRef(null);
  // const container = useRef(reference)

  console.log('slider', sliderRef.current);
  console.log('reference', reference);

  useEffect(() => {
    onLoadStart();
    onLoadStartX();
    onLoadThen();
    setOurClientHeight(reference);
  }, []);

  useEffect(() => {
    sliderRef.current.style.transition = 'none';
    sliderRef.current.style.transform = 'translatey(-100%)';
    // sliderRef.current.clientHeight = ourClientHeight;
    sliderRef.current.style.transition = 'transform ' + transitionDuration + 'ms ease-in-out';
    sliderRef.current.style.fill = bgColor;
    sliderRef.current.style.transform = 'translatey(0%)';
    bounceCurve();
  }, []);

  const getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  };

  const bounceCurve = () => {
    const now = performance.now();
    const elapsedTime = now - start;
    const delta = now - then;
    let spacetoCover = startY - 100;
    let duration = transitionDuration;

    let currentDisplacement = (spacetoCover / duration) * delta;
    let coordinateY = curvePointCoordinatesY - currentDisplacement;

    setCurvePointCoordinatesX(startX);
    setCurvePointCoordinatesY(coordinateY);
    setThen(now);

    if (elapsedTime < transitionDuration) {
      requestAnimationFrame(bounceCurve());
    } else {
      setCurvePointCoordinatesX(50);
      setCurvePointCoordinatesY(100);
    }
  };

  const onLoadStart = () => {
    setStart(performance.now());
  };

  const onLoadStartX = () => {
    setStartX(getRandomIntInclusive(35, 65));
  };

  const onLoadThen = () => {
    setThen(performance.now());
  };

  return (
    <path
      style={{ fill: bgColor }}
      ref={sliderRef}
      d={'M0 0 H100 V100 Q' + curvePointCoordinatesX + ' ' + curvePointCoordinatesY + ' 0 100 L 0 0'}
    />
  );
};
