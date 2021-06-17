// @flow

import { connect } from 'react-redux';
import { createSelector } from 'redux-starter-kit';
import { DraggableCore } from 'react-draggable';
import { get, uniq, throttle, omit, fromPairs, mapValues } from 'lodash';
import Node from './Node';
import Graph from 'models/Graph';
import Edge from 'models/Edge';

import type { DraggableData } from 'react-draggable';
import { Hotkey, Hotkeys, HotkeysTarget } from '@blueprintjs/core';
import {
  selectedS,
  selectView,
  selSet as _selSet,
  zoomIn as _zIn,
  zoomOut as _zOut,
  zoomReset as _zReset,
  setPan as _setPan,
  updatePos as _updatePos,
  setPos as _setPos,
  zooms,
  selectPositions,
} from 'redux/ducks/graph';

import type { NodeInSpace, Pos } from 'types';
import type { AnyNode } from 'models/NodeBase';
import AllEdges from 'components/AllEdges';
import type { PosMemo, SelectedView } from 'redux/ducks/graph';
import { addVec, scaleVec, subVec, unitVec, zero } from 'utils/vector';
import type { Direction } from 'utils/vector';

import { pure } from 'recompose';

type OP = {|
  graph: Graph,
  onCreateEdge?: Edge => void,
  onDeleteEdge?: Edge => void,
  onNodeSelect?: AnyNode => void,
  onNodeDeselect?: (AnyNode, ?boolean, ?boolean) => void,
  onNodeSelectionChange?: (?AnyNode, ?number) => void,
  visible: boolean,
|};
type SP = {|
  selected: { [string]: boolean },
  selectCount: number,
  ...SelectedView,
  positions: PosMemo,
|};
type DP = {|
  selSet: (string[]) => void,
  zoomIn: (?Pos) => void,
  zoomOut: (?Pos) => void,
  zoomReset: () => void,
  setPan: Pos => void,
  updatePos: PosMemo => void,
  setPos: PosMemo => void,
|};

type P = {| ...SP, ...OP, ...DP |};
type S = {|
  source: ?[string, number],
  connecting: boolean,
  mousePos: ?Pos,
  canvasDragEnd: ?Pos,
  metaDown: boolean,
|};

const NodeGraph = () => {
  dragOffsets: PosMemo = {};
  canvasDragStart: ?Pos;
  moving: boolean = false;
  deselectNodes: boolean = false;
  timeoutId: ?TimeoutID = null;
  deltaY: number = 0;
  state = { source: null, connecting: false, mousePos: null, canvasDragEnd: null, metaDown: false };

  componentDidMount() {
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('keyup', onKeyUp);
    document.addEventListener('keydown', onKeyDown);
    window.centerP = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    window.addEventListener('resize', onWinResize);
    const { graph } = props;
    graph && _setPosFromGraph();
  }

  componentWillUnmount() {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    document.removeEventListener('keyup', onKeyUp);
    document.removeEventListener('keydown', onKeyDown);
    window.removeEventListener('resize', onWinResize);
    timeoutId && clearTimeout(timeoutId);
    _debouncedSetMouse.cancel();
  }

  componentDidUpdate(prev) {
    const { graph, scale } = props;
    graph && graph !== prev.graph && _setPosFromGraph();
    if (prev.scale !== scale && document.body) {
      const size = 250 * (scale * 0.25 + 0.75);
      document.body.style.backgroundSize = `${size}px ${size}px`;
    }
  }

  onKeyUp = (e: KeyboardEvent) => e.key === 'Meta' && setState({ metaDown: false });
  onKeyDown = (e: KeyboardEvent) => e.key === 'Meta' && setState({ metaDown: true });
  onScroll = (e: WheelEvent) => {
    const { zoom, scale } = props;
    deltaY += e.deltaY;
    const thresh = 30;
    let txFn = null;
    if (deltaY > thresh && zoom < zooms.length - 1) {
      txFn = props.zoomIn;
      deltaY = 0;
    } else if (deltaY < -thresh && zoom > 0) {
      txFn = props.zoomOut;
      deltaY = 0;
    }
    if (deltaY > thresh || deltaY < -thresh) {
      deltaY = 0;
    }
    if (txFn) {
      const fromCenter = subVec({ x: e.clientX, y: e.clientY }, window.centerP);
      txFn(scaleVec(fromCenter, scale * 0.1 * Math.sign(e.deltaY)));
    }
  };

  onWinResize = () => {
    window.centerP = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  };

  onMouseUp = () => {
    timeoutId = setTimeout(() => setState({ mousePos: null }), 1);
  };

  onMouseMove = (e: MouseEvent) => {
    if (moving) {
      return;
    }
    const { connecting } = state;
    const { selectCount } = props;
    const set = connecting || selectCount > 0;
    if (!set) {
      return;
    }
    _debouncedSetMouse(e);
  };

  _debouncedSetMouse = throttle((e: MouseEvent) => {
    setState({ mousePos: { x: e.clientX, y: e.clientY } });
  }, 24);

  _getSelected = (): NodeInSpace[] => {
    const { selected, graph } = props;
    return graph.nodes.filter(nis => selected[nis.node.id]);
  };

  onNodeStartMove = (started: NodeInSpace, data: DraggableData) => {
    if (!props.selected[started.node.id]) {
      dragOffsets = { [started.node.id]: zero };
      props.selectCount && props.selSet([]);
    } else {
      dragOffsets = fromPairs(
        _getSelected()
          .map(nis => [nis.node.id, subVec(started.pos, nis.pos)])
          .concat([[started.node.id, zero]])
      );
    }
    moving = true;
  };

  onNodeStopMove = (node: NodeInSpace, data: DraggableData) => {
    onNodeMove(node, data);
    const updates = mapValues(dragOffsets, offset => subVec(data, offset));
    _posUpdate(updates);
    dragOffsets = {};
    moving = false;
  };

  _posUpdate = (updates: PosMemo) => {
    props.graph.updatePositions(updates);
    _setPosFromGraph();
  };

  lastData: ?DraggableData;
  lastUpdateTime: number = performance.now();
  onNodeMove = (node: NodeInSpace, data: DraggableData) => {
    const thresh = 120 * props.scaleInverse;
    const timeThresh = props.selectCount < 4 ? 16 : props.selectCount < 11 ? 30 : 50;
    if (
      !lastData ||
      performance.now() - lastUpdateTime > timeThresh ||
      Math.abs(lastData.x - data.x) > thresh ||
      Math.abs(lastData.y - data.y) > thresh
    ) {
      const updates = mapValues(dragOffsets, offset => subVec(data, offset));
      props.updatePos(updates);
      lastUpdateTime = performance.now();
      lastData = data;
    }
  };

  onStartConnector = (id: string, outputIndex: number, e: MouseEvent) => {
    setState({
      connecting: true,
      source: [id, outputIndex],
      mousePos: { x: e.clientX, y: e.clientY },
    });
  };

  onCompleteConnector = (id: string, inIndex: number) => {
    const { connecting, source } = state;
    const { graph } = props;
    if (connecting && source) {
      const [nodeId, outIdx] = source;
      let fromNode = graph.nodeWithId(nodeId);
      let toNode = graph.nodeWithId(id);
      if (fromNode && toNode) {
        let fromAttr = fromNode.node.outKeyAt(outIdx);
        let toAttr = toNode.node.inKeyAt(inIndex);
        const edge = new Edge(fromNode.node, toNode.node, fromAttr, toAttr);
        graph.addEdge(edge);
        props.onCreateEdge && props.onCreateEdge(edge);
      }
    }
    setState({ connecting: false, mousePos: null });
    forceUpdate();
  };

  handleRemoveConnector = (edge: Edge) => {
    if (props.onDeleteEdge) {
      props.onDeleteEdge(edge);
    }
    props.graph.removeEdge(edge);
    forceUpdate();
  };

  onNodeSelect = (n: NodeInSpace, idx?: number, resetHighlights?: boolean) => {
    if (props.onNodeSelect) {
      props.onNodeSelect(n.node);
    }
    const highlighted = resetHighlights
      ? [n.node.id]
      : uniq(Object.keys(props.selected).concat(n.node.id));
    if (highlighted.length > 1) {
      _onNodeChange(null);
    } else {
      _onNodeChange(n.node, idx);
    }
    props.selSet(highlighted);
  };

  onNodeDeselect = (n: NodeInSpace, removeHighlight: boolean, resetOtherHighlights?: boolean) => {
    if (props.onNodeDeselect) {
      props.onNodeDeselect(n.node);
    }
    _onNodeChange(null);
    if (removeHighlight || resetOtherHighlights) {
      const highlighted = resetOtherHighlights
        ? removeHighlight
          ? []
          : [n.node.id]
        : Object.keys(omit(props.selected, n.node.id));
      props.selSet(highlighted);
    }
  };

  onDeleteNode = (n: AnyNode) => {
    props.graph.removeNode(n);
    _setPosFromGraph();
    _onNodeChange(null);
  };

  _setPosFromGraph = () => props.setPos(props.graph.nodePositions());

  _onNodeChange = (n: ?AnyNode, idx?: number) => {
    if (props.onNodeSelectionChange) {
      props.onNodeSelectionChange(n, idx);
    }
  };

  _overlaps = (r1: ClientRect, r2: ClientRect) =>
    !(r1.right < r2.left || r1.left > r2.right || r1.bottom < r2.top || r1.top > r2.bottom);

  _nodesIntersecting = (box: ClientRect): NodeInSpace[] =>
    props.graph.nodes.filter(nis => {
      const el = nis.node.domNode();
      return el && _overlaps(box, el.getBoundingClientRect());
    });

  _setIntersects = throttle((union: boolean, subtract: boolean) => {
    const selBox = document.getElementById('selection-box');
    if (!selBox) {
      return;
    }
    const selBound = selBox.getBoundingClientRect();
    if (selBound.width < 10 && selBound.height < 10) {
      return;
    }
    const { selSet, selected } = props;
    const ids = _nodesIntersecting(selBound).map(nis => nis.node.id);
    selSet(
      union
        ? uniq(Object.keys(selected).concat(ids))
        : subtract
        ? Object.keys(selected).filter(sId => !ids.includes(sId))
        : ids
    );
  }, 30);

  _onCanvasDrag = throttle((e: MouseEvent, data: DraggableData) => {
    if (!moving) {
      if (e.metaKey && canvasDragStart) {
        setState({ canvasDragEnd: data });
        _setIntersects(e.shiftKey, e.altKey);
      } else if (!e.metaKey) {
        const { setPan, pan, scaleInverse, scale } = props;
        const newPan = addVec(pan, scaleVec({ x: data.deltaX, y: data.deltaY }, scaleInverse));
        if (Math.max(Math.abs(pan.x - newPan.x), Math.abs(pan.y - newPan.y)) > 4) {
          setPan(newPan);
        }
        if (document.body) {
          document.body.style.backgroundPosition = `${newPan.x * scale}px ${newPan.y * scale}px`;
        }
        deselectNodes = false;
      }
    }
  }, 18);

  _onStartCanvasDrag = (e: MouseEvent, data: DraggableData) => {
    if (e.metaKey) {
      canvasDragStart = data;
      deselectNodes = false;
    } else {
      deselectNodes = true;
    }
  };

  _onEndCanvasDrag = (e: MouseEvent, data: DraggableData) => {
    if (deselectNodes) {
      props.selectCount && props.selSet([]);
      deselectNodes = false;
    }
    _clearCanvasDrag();
  };
  const { connecting, source, metaDown } = state;
  const { visible, selected, scale, pan, graph, scaleInverse, positions } = props;
  const selStyle = _selectionBoxStyle();
  return (
    <DraggableCore
      onDrag={_onCanvasDrag}
      scale={scale}
      onStart={_onStartCanvasDrag}
      onStop={_onEndCanvasDrag}
    >
      <div
        id="graph-root"
        class={_rootClassName()}
        onWheel={onScroll}
        onDoubleClick={_onCanvasDoubleClick}
        onClick={_onCanvasClick}
      >
        <div id="graph-scalable" style={_rootStyle()}>
          {Object.keys(positions).map((id, i) => {
            const nis = graph.nodeWithIdF(id);
            return (
              <Node
                selected={selected[nis.node.id]}
                visible={visible}
                disabled={Boolean(metaDown)}
                index={i}
                nis={nis}
                key={`node-${nis.node.id}`}
                onNodeStart={onNodeStartMove}
                onNodeStop={onNodeStopMove}
                onNodeMove={onNodeMove}
                onStartConnector={onStartConnector}
                onCompleteConnector={onCompleteConnector}
                onNodeSelect={onNodeSelect}
                onNodeDeselect={onNodeDeselect}
                onDelete={onDeleteNode}
                scale={scale}
                positionOffset={pan}
              />
            );
          })}
          <AllEdges
            dragging={connecting}
            source={source}
            visible={visible}
            selected={selected}
            onRemoveConnector={handleRemoveConnector}
            pan={pan}
            scaleInverse={scaleInverse}
            graph={graph}
            mousePos={state.mousePos}
          />
        </div>
        {selStyle && <div id="selection-box" style={selStyle} />}
      </div>
    </DraggableCore>
  );

  _onCanvasDoubleClick = (e: MouseEvent) => {
    Object.keys(props.selected).length && props.selSet([]);
    _clearCanvasDrag();
    _clearConnecting();
    moving = false;
    if (e.metaKey !== state.metaDown) {
      setState({ metaDown: e.metaKey });
    }
  };

  _onCanvasClick = (e: MouseEvent) => {
    _clearConnecting();
    _clearCanvasDrag();
    moving = false;
    if (e.metaKey !== state.metaDown) {
      setState({ metaDown: e.metaKey });
    }
  };

  _clearConnecting = () => {
    state.connecting && setState({ connecting: false });
  };

  _clearCanvasDrag = () => {
    canvasDragStart = null;
    state.canvasDragEnd && setState({ canvasDragEnd: null });
  };

  _rootStyle = () => ({ transform: `scale(${props.scale})` });

  _rootClassName = () =>
    state.connecting
      ? 'dragging'
      : canvasDragStart || state.metaDown
      ? 'selecting'
      : moving
      ? 'moving-node'
      : '';

  _selectionBoxStyle = () => {
    const {
      canvasDragStart,
      state: { canvasDragEnd },
    } = this;
    if (!canvasDragEnd || !canvasDragStart) {
      return;
    }
    const selCoord = subVec(canvasDragEnd, canvasDragStart);
    return {
      width: Math.abs(selCoord.x),
      height: Math.abs(selCoord.y),
      top: Math.min(canvasDragStart.y, canvasDragEnd.y),
      left: Math.min(canvasDragStart.x, canvasDragEnd.x),
    };
  };

  _onCopy = () => {
    const selected = props.graph.duplicate(_getSelected()).map(nis => nis.node.id);
    props.selSet(selected);
  };

  _vAlign = () => {
    const selected = _getSelected();
    if (selected.length < 2) {
      return;
    }
    const x = selected[0].pos.x;
    const updates = fromPairs(selected.map(nis => [nis.node.id, { ...nis.pos, x }]));
    _posUpdate(updates);
  };

  _hAlign = () => {
    const selected = _getSelected();
    if (selected.length < 2) {
      return;
    }
    const y = selected[0].pos.y;
    const updates = fromPairs(selected.map(nis => [nis.node.id, { ...nis.pos, y }]));
    _posUpdate(updates);
  };

  _autoFmt = () => {
    const selected = _getSelected();
    let set = [];
    let buffer = 24;
    if (selected.length < 2) {
      set = props.graph.nodes;
    } else {
      set = selected;
      buffer = 60;
    }
    if (set.length < 2) {
      return;
    }
    const byId = fromPairs(set.map(nis => [nis.node.id, nis]));
    let next = get(set, [0, 'node', 'id']);
    const groups = [];
    while (next) {
      const nis = byId[next];
      delete byId[next];
      const group = [nis];
      for (const id in byId) {
        if (byId[id] && Math.abs(byId[id].pos.x - nis.pos.x) < buffer) {
          group.push(byId[id]);
          delete byId[id];
        }
      }
      groups.push(group);
      const ids = Object.keys(byId);
      if (ids.length) {
        next = ids[0];
      } else {
        next = undefined;
      }
    }
    const updates = {};
    for (const group of groups) {
      const x = group[0].pos.x;
      group.forEach(nis => {
        updates[nis.node.id] = { ...nis.pos, x };
      });
    }
    Object.keys(updates).length && _posUpdate(updates);
  };

  _selectAll = () => props.selSet(props.graph.nodeIds());

  _pan = throttle((dir: Direction) => {
    const { setPan, pan, scaleInverse } = props;
    setPan(addVec(pan, scaleVec(unitVec(dir), scaleInverse * 20)));
  }, 60);

  _panR = () => _pan('right');
  _panL = () => _pan('left');
  _panD = () => _pan('down');
  _panU = () => _pan('up');

  // noinspection JSUnusedGlobalSymbols
  renderHotkeys() {
    const { selectCount, zoomIn, zoomOut, zoomReset } = props;
    const multi = selectCount > 0;
    return (
      <Hotkeys>
        {multi && (
          <Hotkey
            group="Node Actions"
            combo="shift + meta + c"
            label="Duplicate node(s)"
            global
            onKeyDown={_onCopy}
            preventDefault
          />
        )}
        {multi && (
          <Hotkey
            group="Node Actions"
            combo="h"
            label="Horizontal align"
            global
            onKeyDown={_hAlign}
          />
        )}
        {multi && (
          <Hotkey
            group="Node Actions"
            combo="v"
            label="Vertical align"
            global
            onKeyDown={_vAlign}
          />
        )}
        <Hotkey
          group="Node Actions"
          combo="meta + alt + l"
          label={`Auto-format ${selectCount < 2 ? 'all' : 'selected'}`}
          global
          onKeyDown={_autoFmt}
          preventDefault
        />
        <Hotkey global combo="alt + =" label="Zoom in" onKeyDown={zoomIn} group="View" />
        <Hotkey global combo="alt + -" label="Zoom out" onKeyDown={zoomOut} group="View" />
        <Hotkey global combo="alt + 0" label="Home view" onKeyDown={zoomReset} group="View" />
        <Hotkey global combo="right" label="Pan right" onKeyDown={_panR} group="View" />
        <Hotkey global combo="left" label="Pan left" onKeyDown={_panL} group="View" />
        <Hotkey global combo="down" label="Pan down" onKeyDown={_panD} group="View" />
        <Hotkey global combo="up" label="Pan up" onKeyDown={_panU} group="View" />

        <Hotkey
          global
          combo="shift + meta + a"
          label="Select all"
          onKeyDown={_selectAll}
          group="Selection"
        />
        <Hotkey global combo="meta + drag" label="Select area" group="Selection" />
        <Hotkey global combo="meta + alt + drag" label="Subtract selection" group="Selection" />
        <Hotkey global combo="meta + shift + drag" label="Add selection" group="Selection" />
      </Hotkeys>
    );
  }
}

const select = createSelector(
  [selectedS, selectView, selectPositions],
  (selected, view, positions) => ({ ...selected, ...view, positions })
);

const dispatch = d => ({
  selSet: id => d(_selSet(id)),
  zoomIn: (pan?: Pos) => d(_zIn(pan)),
  zoomOut: (pan?: Pos) => d(_zOut(pan)),
  zoomReset: () => d(_zReset()),
  setPan: (pos: Pos) => d(_setPan(pos)),
  updatePos: (pos: PosMemo) => d(_updatePos(pos)),
  setPos: (pos: PosMemo) => d(_setPos(pos)),
});

export default connect(
  select,
  dispatch
)(HotkeysTarget(NodeGraph));
