import React from 'react';
import './ColorPicker.css';

import { Slider } from './_components/Slider';
import { Picker } from './_components/Picker';

export class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.togglePickers = this.togglePickers.bind(this);
    this.setBackgroundColor = this.setBackgroundColor.bind(this);
    this.state = {
      active: false,
      bgColor: '#61dafb',
      pickerColors: ['#16a085', '#61dafb', '#00467f', '#000000'],
      timeout: null,
      sliders: [],
      slideDuration: 1000
    };
  }

  setBackgroundColor(bgColor) {
    var sliders = this.state.sliders;
    sliders.push(<Slider bgColor={bgColor} reference={this.container} transitionDuration={this.state.slideDuration} />);

    var timeout = this.state.timeout;
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      this.setState({ bgColor: bgColor, sliders: [] });
    }, this.state.slideDuration);
    this.setState({
      sliders: sliders,
      timeout: timeout
    });
  }

  componentDidMount() {
    window.addEventListener('load', () => {
      this.setState({ active: true });
      this.selectors.style.transform = 'rotate(0deg)';
      const delay = 0.2;
      let duration = delay * this.state.pickerColors.length;
      this.selectors.style.transition = 'transform ' + duration + 's' + ' ease-in-out';
      setTimeout(() => {
        this.setState({ active: false });
        this.selectors.style.transform = 'none';
        this.selectors.style.transition = 'none';
      }, duration * 1000);
    });
  }

  togglePickers() {
    this.setState({ active: !this.state.active });
  }

  render() {
    const pickerColors = this.state.pickerColors;
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
          pickerIsActive={this.state.active}
          pickerClicked={this.setBackgroundColor}
          pickerColor={pickerColors[i]}
          delay={delay}
        />
      );
    }
    return (
      <div
        style={{ backgroundColor: this.state.bgColor, height: '' }}
        className="color-picker-container"
        ref={container => {
          this.container = container;
        }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="svg-sliders">
          {this.state.sliders}
        </svg>
        <div className="btn-container">
          <div className={'btn' + (this.state.active === true ? ' active' : '')} onClick={this.togglePickers}>
            <ion-icon name="color-palette" style={{ color: 'white', fontSize: '2.5rem' }} />
          </div>
        </div>
        <div className="selector-container">
          <div
            ref={selectors => {
              this.selectors = selectors;
            }}
            className="selectors">
            {pickers}
          </div>
        </div>
      </div>
    );
  }
}
