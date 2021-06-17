// @flow
import NodeOutputItem from './NodeOutputItem';
import type { Pos } from 'types';
import { DraggableData } from 'react-draggable';

import PropTypes from 'prop-types';
import { pure } from 'recompose';

// Typescript
type P = {
  connected: string[],
  items: string[],
  display: string[],
  onStartConnector: (number, MouseEvent, DraggableData) => void,
  scale: number,
  positionOffset: Pos | typeof undefined,
};

const NodeOutput: P = ({ connected, items, display, onStartConnector, scale, positionOffset }) => {
  return (
    <div className="nodeOutputWrapper">
      <ul className="nodeOutput">
        {items.map((item, i) => {
          return (
            <NodeOutputItem
              filled={connected.includes(item)}
              onMouseDown={onStartConnector}
              key={`item-${i}`}
              index={i}
              item={display[i]}
              scale={scale}
              positionOffset={positionOffset}
            />
          );
        })}
      </ul>
    </div>
  );
}

NodeOutput.propTypes = {
  connected: PropTypes.arrayOf(PropTypes.string),
  items: PropTypes.arrayOf(PropTypes.string),
  display: PropTypes.arrayOf(PropTypes.string),
  onStartConnector: PropTypes.func,
  scale: PropTypes.number,
}

export default pure(NodeOutput);
