// React imports
import { useState } from 'react';

// App imports
import { SVGWrapper } from './svg';
import { Background } from './background';
import { Foreground } from './foreground';
import { Wrapper } from './wrapper';
import './styles.scss';

// Context imports
import { useFilters } from '../../context/filters';
import { useSliderSizes } from '../../context/sizes/slider';

// Third-party imports
import * as d3 from 'd3';

export const Slider = () => {
  const { currentPosition, setCurrentPosition, setQuantity } = useFilters();
  const { innerWidth, innerHeight } = useSliderSizes();

  const minBound = 20;
  const maxBound = 100;
  const offset = 20;

  const xScale: any = d3.scaleLinear()
    .domain([ minBound, maxBound ])
    .range([ offset, innerWidth - offset ]);

  return (
    <div className="right-slider-wrapper">
      <SVGWrapper>
        <Background
          xScale={xScale} 
          minBound={minBound} 
          maxBound={maxBound} 
          innerHeight={innerHeight}
        />
        <Foreground
          xScale={xScale} 
          minBound={minBound}
          currentPosition={currentPosition} 
          innerHeight={innerHeight}
        />
        <Wrapper
          xScale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          setCurrentPosition={setCurrentPosition}
          setNetArea={setQuantity }
          minBound={minBound}
          maxBound={maxBound}
        />
      </SVGWrapper>
    </div>
  )
}

Slider.displayName="Slider";