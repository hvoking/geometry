// @flow
import { get } from 'lodash';
import onClickOutside from 'react-onclickoutside';
import type { Pos } from 'types';
import Edge from '../models/Edge';
import { Hotkey, Hotkeys, HotkeysTarget } from '@blueprintjs/core';
import { connect } from 'react-redux';
import { selSet as _selSet, setInfoOpen as _setInfoOpen } from '../redux/ducks/graph';

import { useState, useEffect } from 'react';

// type DP = {|
//   selSet: (string[]) => void,
//   setInfoOpen: (?string) => void,
// |};
// type OP = {|
//   start: Pos,
//   end: Pos,
//   onRemove?: Edge => void,
//   edge: ?Edge,
//   highlighted?: boolean,
//   incomplete?: boolean,
// |};
// type P = {| ...OP, ...DP |};
// type S = { selected: boolean, transmitting: boolean };

const Spline = props => {
  // el: ?Element;
  let [el, setEl] = useState();
  const [state, setState] = useState({ selected: false, transmitting: false });
  let [listeningOnEdge: string, setListeningOnEdge] = useState('');
  let [transTime, setTransTime] = useState();
  // listeningOnEdge: string;

  useEffect(() => {
    _setListener();
    return () => {
      if (props.edge && listeningOnEdge) {
        props.edge.notifyListener = null;
        listeningOnEdge = '';
      }
      transTime && clearTimeout(transTime);
    }
  }, [])

  useEffect(() => {
    _setListener();
  }, [el, state, listeningOnEdge, transTime])

  const handleClick = () => {
    setState({ selected: true });
    props.selSet([]);
    props.setInfoOpen(null);
  };
  const _setListener = () => {
    if (props.edge && listeningOnEdge !== props.edge.id) {
      props.edge.notifyListener = _onNotify;
      listeningOnEdge = props.edge.id;
    }
  };

  // transTime: ?TimeoutID = null;

  const _schedTransOff = () => {
    transTime && clearTimeout(transTime);
    transTime = setTimeout(() => {
      setState({ ...state, transmitting: false });
      setTransTime(null);
    }, 420);
  };

  const _onNotify = () => {
    if (!state.transmitting) {
      setState({ transmitting: true });
    }
    _schedTransOff();
  };

  // noinspection JSUnusedGlobalSymbols
  const handleClickOutside = event => {
    if (!state.selected || event.metaKey || event.shiftKey) {
      return;
    }
    setState({ selected: false });
  };

  const handleRemove = () => {
    setState({ selected: false });
    const { onRemove, edge } = props;
    onRemove && edge && onRemove(edge);
  };

  let { selected, transmitting } = state;
  let { start, end, highlighted, edge, incomplete } = props;
  const dist = distance([start.x, start.y], [end.x, end.y]);
  const selfEdge = edge && get(edge, 'from.id') === get(edge, 'to.id');
  const pathString = bezierCurve(
    start.x, // start x
    start.y, // start y
    start.x + dist * (selfEdge ? 0.7 : 0.18), // cp1 x
    start.y - dist * (selfEdge ? 0.9 : 0), // cp1 y
    end.x - dist * (selfEdge ? 0.7 : 0.35), // cp2 x
    end.y - dist * (selfEdge ? 0.9 : 0), // cp2 y
    end.x, // end x
    end.y
  );

  const cls =
    'connector' +
    (selected ? ' selected' : '') +
    (highlighted ? ' highlight' : '') +
    (incomplete ? ' incomplete' : '') +
    (transmitting ? ' transmitting' : '');
  return (
    <g>
      <path className="connector-click-area" d={pathString} onClick={handleClick} />
      <path className={cls} d={pathString} onClick={handleClick} ref={r => (el = r)} />
    </g>
  );

  function bezierCurve(a, b, cp1x, cp1y, cp2x, cp2y, x, y) {
    return `M${a},${b} C${cp1x},${cp1y} ${cp2x},${cp2y} ${x},${y}`;
  }

  function distance(a, b) {
    return Math.sqrt((b[0] - a[0]) ** 2 + (b[1] - a[1]) ** 2);
  }

  // noinspection JSUnusedGlobalSymbols
  function renderHotkeys() {
    let { selected } = state;
    if (!selected) {
      return <Hotkeys />;
    }
    return (
      <Hotkeys>
        <Hotkey
          group="Edge Actions"
          combo="backspace"
          label="Delete edge"
          global={true}
          onKeyDown={handleRemove}
        />
      </Hotkeys>
    );
  }
}

export default connect(
  null,
  d => ({
    selSet: id => d(_selSet(id)),
    setInfoOpen: n => d(_setInfoOpen(n)),
  })
)(onClickOutside(HotkeysTarget(Spline)));
