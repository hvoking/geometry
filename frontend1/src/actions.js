import * as actions from './actionTypes';

export const geometryChanged = id => ({
  type: actions.GEOMETRY_CHANGED,
  payload: {
    id
  }
});