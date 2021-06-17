// @flow

import { uuid } from '../utils/string';
import type { AnyNode } from 'models/NodeBase';

export type EdgeSerialization = {
  id: string,
  fromId: string,
  fromPort: string,
  toId: string,
  toPort: string,
};

const Edge = (from: AnyNode, to: AnyNode, fromPort: string, toPort: string, id?: string) => {
  let _notifyCount: number = 0;
  let notifyListener: ?() => void = null;

  id = id || uuid();

  const outDataFor = (data: Object) => ({ [toPort]: data[fromPort] });
  const inDataFor = (change: Object) => change[toPort];

  const notify = () => {
    _notifyCount += 1;
    notifyListener && notifyListener();
  };

  // serialize: () => EdgeSerialization = () => {
  //   return {
  //     id: id,
  //     fromId: from.id,
  //     fromPort: fromPort,
  //     toId: to.id,
  //     toPort: toPort,
  //   };
  // };

  // static load(j: EdgeSerialization, nodes: AnyNode[]) {
  //   const from = nodes.find(n => n.id === j.fromId);
  //   const to = nodes.find(n => n.id === j.toId);
  //   if (!from || !to) {
  //     throw new Error('could not load graph');
  //   }
  //   return Edge(from, to, j.fromPort, j.toPort, j.id);
  // }
}

export default Edge;
