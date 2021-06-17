// @flow
import { get } from 'lodash';
import { connect } from 'react-redux';
import { createSelector } from 'redux-starter-kit';
import onClickOutside from 'react-onclickoutside';
import Draggable, { type DraggableEventHandler, type DraggableData } from 'react-draggable';
import NodeInputList from './NodeInputList';
import NodeOutputList from './NodeOutputList';
import type { AnyNode } from 'models/NodeBase';
import type { NodeInSpace, Pos } from 'types';
import { Hotkey, Hotkeys, HotkeysTarget } from '@blueprintjs/core';
import { addVec } from 'utils/vector';
import { truncate } from 'utils/string';
import EditInput from 'components/EditInput';

import { pure } from 'recompose';
import { useState } from 'react';

type SP = {| pos: Pos, infoShowing: boolean |};
type OP = {|
  index: number,
  nis: NodeInSpace,
  onNodeStart: (NodeInSpace, DraggableData) => void,
  onNodeStop: (NodeInSpace, DraggableData) => void,
  onNodeMove: (NodeInSpace, DraggableData) => void,
  onStartConnector: (string, number, e: MouseEvent, d: DraggableData) => void,
  onCompleteConnector: (string, number) => void,
  onNodeSelect?: (NodeInSpace, ?number, ?boolean) => void,
  onNodeDeselect?: (NodeInSpace, boolean, ?boolean) => void,
  onDelete?: AnyNode => void,
  visible: boolean,
  selected: boolean,
  scale?: ?number,
  positionOffset?: Pos | typeof undefined,
  disabled: boolean,
|};
type P = {| ...SP, ...OP |};
type S = { loading: boolean, renaming: boolean };
const MoveBufferPx = 4;

const Node = () => {
  const [state, setState] = useState({ loading: false, renaming: false });
  dragStart: ?Pos;

  componentDidMount() {
    if (state.loading !== nis.node.isLoading) {
      setState({ loading: nis.node.isLoading });
    }
    nis.node.setLoadStateListener(loading => setState({ loading }));
  }

  componentDidUpdate(prevProps: P) {
    if (prevnis.node.id !== nis.node.id) {
      prevnis.node.setLoadStateListener(null);
      if (state.loading !== nis.node.isLoading) {
        setState({ loading: nis.node.isLoading });
      }
      nis.node.setLoadStateListener(loading => setState({ loading }));
    }
  }

  componentWillUnmount() {
    nis.node.setLoadStateListener(null);
  }

  _onDelete = () => onDelete && onDelete(nis.node);

  handleDragStart = (event: MouseEvent, data: DraggableData) => {
    event.stopPropagation();
    if (event.metaKey || event.shiftKey) {
      return;
    }
    dragStart = { x: event.clientX, y: event.clientY };
    onNodeStart(nis, data);
  };

  handleDragStop: DraggableEventHandler = (event: MouseEvent, data: DraggableData) => {
    event.stopPropagation();
    onNodeStop(nis, data);
    setTimeout(() => {
      dragStart = null;
    });
  };

  handleDrag = (event: MouseEvent, data: DraggableData) => {
    event.stopPropagation();
    !event.metaKey && onNodeMove(nis, data);
  };

  onStartConnector = (i: number, e: MouseEvent, d: DraggableData) =>
    onStartConnector(nis.node.id, i, e, d);

  onCompleteConnector = index => {
    onCompleteConnector(nis.node.id, index);
    forceUpdate();
  };

  _selectNode = (resetHighlights?: boolean) =>
    onNodeSelect &&
    onNodeSelect(nis, index, resetHighlights);

  _selectNodeWithResets = () => _selectNode(true);

  _deselectNode = (removeHighlight: boolean, resetOtherHighlights: boolean) => {
    if (onNodeDeselect) {
      onNodeDeselect(nis, removeHighlight, resetOtherHighlights);
    }
  };

  handleClick = (event: MouseEvent) => {
    const x = get(dragStart, 'x');
    const y = get(dragStart, 'y');
    if (
      x &&
      y &&
      event.clientX &&
      event.clientY &&
      (Math.abs(event.clientX - x) > MoveBufferPx || Math.abs(event.clientY - y) > MoveBufferPx)
    ) {
      return;
    }
    if (selected) {
      _deselectNode(event.metaKey, !event.metaKey);
    } else {
      _selectNode();
    }
  };

  // noinspection JSUnusedGlobalSymbols
  handleClickOutside = event => {
    const { selected, infoShowing, onNodeDeselect, nis } = props;
    const ignore = !selected && !infoShowing;
    if (event.metaKey || event.shiftKey || ignore) {
      return;
    }
    onNodeDeselect && onNodeDeselect(nis, false);
  };

  _rename = () => setState({ renaming: true });
  _noRename = () => setState({ renaming: false });

  _setTitle = (s: string) => {
    nis.node.setTitle(s);
    forceUpdate();
  };

  const { selected, infoShowing, visible, pos, scale, positionOffset, disabled } = props;
  const { node } = nis;
  const { loading, renaming } = state;
  const sel = infoShowing ? 'in-view' : selected ? 'selected' : '';
  let nodeClass = 'node' + (sel ? ` ${sel} ignore-react-onclickoutside` : '');
  if (!visible) {
    return <div />;
  }

  return (
    <Draggable
      disabled={disabled}
      position={pos}
      handle=".node"
      onStart={handleDragStart}
      onStop={handleDragStop}
      onDrag={handleDrag}
      scale={scale || 1}
      positionOffset={positionOffset}
    >
      <div
        className={nodeClass}
        onClick={handleClick}
        onDoubleClick={_selectNodeWithResets}
        id={node.domId()}
      >
        <header
          className={`node-header${renaming ? ' node-header-edit' : ''}`}
          onDoubleClick={_rename}
        >
          <EditInput
            editing={renaming}
            value={renaming ? node.title || '' : truncate(node.name(), 16)}
            onChange={_setTitle}
            onFinish={_noRename}
          />
        </header>
        <div className="node-content">
          <NodeInputList
            connected={node.connectedInputKeys()}
            items={node.inKeys()}
            display={node.constructor.displayInKeys()}
            onCompleteConnector={onCompleteConnector}
          />
          <NodeOutputList
            connected={node.connectedOutputKeys()}
            items={node.outKeys()}
            display={node.constructor.displayOutKeys()}
            onStartConnector={onStartConnector}
            scale={scale || 1}
            positionOffset={positionOffset ? addVec(pos, positionOffset) : pos}
          />
        </div>
        {loading && <div className="spinner" />}
      </div>
    </Draggable>
  );

  // noinspection JSUnusedGlobalSymbols
  renderHotkeys() {
    const show = selected || infoShowing;
    if (!show) {
      return <Hotkeys />;
    }
    return (
      <Hotkeys>
        <Hotkey
          group="Node Actions"
          combo="backspace"
          label="Delete selected node"
          global={true}
          onKeyDown={_onDelete}
        />
      </Hotkeys>
    );
  }
}

const getInfoShowing = (s, op) => Boolean(s.graph.infoOpen === op.nis.node.id);
const getPos = (s, op) => s.graph.nodePos[op.nis.node.id] || op.nis.pos;

const makeSelectCreator = () =>
  createSelector(
    [getPos, getInfoShowing],
    (pos, infoShowing) => ({ pos, infoShowing })
  );

const makeSelect = () => {
  const selector = makeSelectCreator();
  return (s, op) => selector(s, op);
};

export default connect(makeSelect)(onClickOutside(HotkeysTarget(pure(Node))));
