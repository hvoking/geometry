// @flow
import type { DraggableData } from 'react-draggable';
import { DraggableCore } from 'react-draggable';
import type { Pos } from 'types';
import { pure } from 'recompose';
import PropTypes from 'prop-types';

type P = {
  index: number,
  onMouseDown: (number, MouseEvent, DraggableData) => void,
  item: string,
  filled: boolean,
  scale: number,
  positionOffset: Pos | typeof undefined,
};

const NodeOutputItem: P = ({ index, filled, item }) => {
  const onMouseDown = (e: MouseEvent, data: DraggableData) => {
    e.stopPropagation();
    e.preventDefault();
    // this.props.onMouseDown(this.props.index, e, data);
  };

  const onClick = (e: MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    // const { onMouseDown, index } = this.props;
    // onMouseDown(index, e);
  };
  const modifier = filled ? '' : ' unconnected';
  return (
    <DraggableCore onStart={onMouseDown}>
      <li onClick={onClick}>
        <span>
          {item}
          <i className={`fa fa-circle${modifier}`} />
        </span>
      </li>
    </DraggableCore>
  );
}

NodeOutputItem.propTypes = {
  index: PropTypes.number,
  filled: PropTypes.bool,
  item: PropTypes.string,
  scale: PropTypes.number,
}

export default pure(NodeOutputItem);
