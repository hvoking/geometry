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
  const { currentPosition, setCurrentPosition, quantity, setQuantity } = useFilters();
  const { innerWidth, innerHeight } = useSliderSizes();

  const minBound = 20;
  const maxBound = 100;
  const offsetLeft = 48;
  const offsetRight = 45;

  const xScale: any = d3.scaleLinear()
    .domain([ minBound, maxBound ])
    .range([ offsetLeft, innerWidth - offsetRight ]);

  return (
    <div className="right-slider-wrapper">
      <SVGWrapper>
        <rect
          x={0}
          y={0}
          width={innerWidth}
          height={innerHeight}
          fill="rgba(0, 0, 0, 1)"
        />
        <text 
          fill="rgba(255, 255, 255, 0.8)"
          fontSize="0.8em"
          x={24}
          y={15}
          alignmentBaseline="middle"
          textAnchor="middle"
        >
          points
        </text>
        <text 
          fill="rgba(255, 255, 255, 0.8)"
          fontSize="0.8em"
          x={innerWidth - 7}
          y={15}
          alignmentBaseline="middle"
          textAnchor="end"
        >
          {quantity * quantity}
        </text>
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