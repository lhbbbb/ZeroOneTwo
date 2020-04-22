import { createAction, handleActions } from 'redux-actions';

const OPEN_DRAWER = 'drawer/OPEN_DRAWER';
const CLOSE_DRAWER = 'drawer/CLOSE_DRAWER';

export const openDrawer = createAction(OPEN_DRAWER, (drawer) => drawer);
export const closeDrawer = createAction(CLOSE_DRAWER, (drawer) => drawer);

const initialState = {
  isOpen: false,
};

const drawer = handleActions(
  {
    [OPEN_DRAWER]: (state) => ({
      ...state,
      isOpen: true,
    }),
    [CLOSE_DRAWER]: (state) => ({
      ...state,
      isOpen: false,
    }),
  },
  initialState,
);

export default drawer;
