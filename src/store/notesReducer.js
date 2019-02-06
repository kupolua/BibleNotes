import { FETCH_VERSES } from '../containers/Bible/fetchVersesAction';
import { TO_LOGIN } from '../containers/Menu/toLoginAction';
import { MENU_ITEM } from "../containers/Menu/setMenuItemAction";
import { PUT_PRESENTER } from "../containers/Calendar/putPresenterAction";
import { GET_PRESENTER } from "../containers/Calendar/getPresentersAction";
import { THE_NOTE } from '../containers/Bible/setNoteAction';

const initialState = {
  numDay: null,
  notesList: {},
  readingPlan: {},
  verses: [],
  presenters: {},
  isLogin: false,
  menuItemName:'',
  note: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VERSES:
      state.numDay = action.payload.numDay;
      state.readingPlan = action.payload.readingPlan;
      state.verses = action.payload.verses;

      return { ...state };

    case TO_LOGIN:
      state.isLogin = action.payload;

      return { ...state };

    case MENU_ITEM:

      state.menuItemName = action.payload;

      return { ...state };

    case PUT_PRESENTER:
      state.presenters = action.payload.presenters;

      return { ...state };

    case GET_PRESENTER:
      state.presenters = action.payload.presenters;

      return { ...state };

    case THE_NOTE:
      state.note = action.payload;

      return { ...state };

    default:
      return state
  }
}
