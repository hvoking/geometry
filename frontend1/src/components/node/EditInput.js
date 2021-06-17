// @flow
import { Classes } from '@blueprintjs/core';
import { get } from 'lodash';

import { pure } from 'recompose';

type P = {
  onChange: string => void,
  onFinish?: string => void,
  editing?: boolean | typeof undefined,
  style?: Object,
  value: string,
};
type S = { editing: boolean };

const EditInput = () => {
  input: ?HTMLInputElement;
  state = { editing: false };

  _onInputKeyUp = (e: SyntheticInputEvent<*>) => {
    const { onFinish } = props;
    if (get(e, 'key') === 'Enter') {
      onFinish && onFinish(e.target.value);
      input && input.blur();
    }
  };

  _toEdit = (e: MouseEvent) => {
    if (_isControlled()) {
      return;
    }
    e.stopPropagation();
    setState({ editing: true }, _focusInput);
  };

  _onBlur = (e: SyntheticInputEvent<*>) => {
    const { onFinish } = props;
    onFinish && onFinish(e.target.value);
    if (!_isControlled()) {
      setState({ editing: false });
    }
  };

  _focusInput = () => input && input.focus();

  _isControlled = (): boolean => props.editing !== undefined;

  componentDidUpdate(prevProps: P) {
    if (prevProps.editing === false && props.editing) {
      _focusInput();
    }
  }

  const { style, value, onChange } = props;
  const editing = props.editing === undefined ? state.editing : props.editing;
  return editing ? (
    <div className="bp3-dark">
      <input
        ref={input => (input = input)}
        style={{ ...styles.input, ...style }}
        onKeyUp={_onInputKeyUp}
        className={Classes.INPUT}
        type="text"
        placeholder="untitled"
        dir="auto"
        onChange={e => onChange(e.target.value)}
        onBlur={_onBlur}
        value={value}
      />
    </div>
  ) : (
    <span style={style} onClick={_toEdit}>
      {value}
    </span>
  );
}

const styles = {
  input: { textAlign: 'inherit' },
};

export default pure(EditInput)
