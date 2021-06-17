// @flow
import NodeInputItem from './NodeInputItem';
import PropTypes from 'prop-types';
import { pure } from 'recompose';

type P = {
  onCompleteConnector: number => void,
  items: string[],
  connected: string[],
  display: string[],
};

const NodeInput: P = ({ onCompleteConnector, items, connected, display }) => {
  const onMouseUp = (i: number) => {
    onCompleteConnector(i);
  };
  return (
    <div className="nodeInputWrapper">
      <ul className="nodeInput">
        {items.map((item, i) => (
          <NodeInputItem
            onMouseUp={onMouseUp}
            key={`item-${i}`}
            index={i}
            item={display[i]}
            filled={connected.includes(item)}
          />
        ))}
      </ul>
    </div>
  );
}

NodeInput.propTypes = {
  onCompleteConnector: PropTypes.func,
  items: PropTypes.arrayOf(PropTypes.string),
  connected: PropTypes.arrayOf(PropTypes.string),
  display: PropTypes.arrayOf(PropTypes.string),
}

export default pure(NodeInput);
