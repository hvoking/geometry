// @flow
import { pure } from 'recompose';
import { useState } from 'react';

type P = { index: number, onMouseUp: number => void, item: string, filled: boolean };
type S = { hover: boolean };

const NodeInputItem: P = ({ index, filled, item }) => {
  const [state, setState]: S = useState({ hover: false })

  const onMouseUp = (e: MouseEvent) => {
    e.stopPropagation();
    console.log(index);
    // onMouseUp(index);
  };
  const onMouseOver = () => setState({ hover: true });
  const onMouseOut = () => setState({ hover: false });

  const { hover } = state;
  const icon = filled || hover ? 'fa-circle' : 'fa-circle';
  const modifier = hover ? ' hover' : filled ? ' connected-node' : '';
  return (
    <li onMouseOver={onMouseOver} onMouseOut={onMouseOut} onMouseUp={onMouseUp}>
      <span className={`input-text${modifier}`}>
        <i className={`fa ${icon}`} />
        {item}
      </span>
    </li>
  );
}

export default pure(NodeInputItem);
