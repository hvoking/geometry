// React imports
import { useState } from 'react';

// App imports
import { SVGWrapper } from './svg';
import { Background } from './background';
import { Foreground } from './foreground';
import { Handler } from './handler';
import { Legend } from './legend';
import { Wrapper } from './wrapper';

// Context imports
import { useFilters } from '../../context/filters';
import { useSliderSizes } from '../../context/sizes/slider';

// Third-party imports
import * as d3 from 'd3';

export const Slider = () => {
  const { quantity, setQuantity } = useFilters();
  const [ activeForeground, setActiveForeground ] = useState(false);

  const { innerWidth, innerHeight } = useSliderSizes();

  const minBound = 0;
  const maxBound = 300;
  const circleRadius = innerHeight / 6;
  const offset = 20;

  const xScale: any = d3.scaleLinear()
    .domain([ minBound, maxBound ])
    .range([ offset, innerWidth - offset ]);

  return (
      <SVGWrapper>
        <Legend 
          xScale={xScale}
          circleRadius={circleRadius} 
          currentPosition={quantity}
        />
        <Background
          xScale={xScale} 
          minBound={minBound} 
          maxBound={maxBound} 
          circleRadius={circleRadius}
        />
        <Foreground
          xScale={xScale} 
          minBound={minBound}
          currentPosition={quantity} 
          circleRadius={circleRadius}
          activeForeground={activeForeground}
        />
        <Handler
          cx={xScale(quantity)} 
          cy={circleRadius} 
          r={circleRadius}
        />
        <Wrapper
          xScale={xScale}
          innerWidth={innerWidth}
          innerHeight={innerHeight}
          setCurrentPosition={setQuantity}
          setNetArea={setQuantity}
          minBound={minBound}
          maxBound={maxBound}
          setActiveForeground={setActiveForeground}
        />
      </SVGWrapper>
  )
}

Slider.displayName="Slider";