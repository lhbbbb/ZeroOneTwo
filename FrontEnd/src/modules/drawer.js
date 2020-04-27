import { createAction, handleActions } from 'redux-actions';

const OPEN_DRAWER = 'drawer/OPEN_DRAWER';
const CLOSE_DRAWER = 'drawer/CLOSE_DRAWER';
const SELECT_DRAWER = 'drawer/SELECT_DRAWER';

export const openDrawer = createAction(OPEN_DRAWER, () => ({ open: true }));
export const closeDrawer = createAction(CLOSE_DRAWER, () => ({ open: false }));
export const setDrawer = createAction(SELECT_DRAWER, (selected) => selected);

const initialState = {
  open: false,
  selected: 'Home',
};

const drawer = handleActions(
  {
    [OPEN_DRAWER]: (state) => ({
      ...state,
      open: true,
    }),
    [CLOSE_DRAWER]: (state) => ({
      ...state,
      open: false,
    }),
    [SELECT_DRAWER]: (state, action) => ({
      ...state,
      selected: action.payload,
    }),
  },
  initialState,
);

export default drawer;
