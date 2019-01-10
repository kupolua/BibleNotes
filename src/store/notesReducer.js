import { FETCH_VERSES } from '../containers/Bible/fetchVersesAction';
import { TO_LOGIN } from '../containers/Menu/toLoginAction';


const initialState = {
  numDay: null,
  notesList: {},
  readingPlan: {},
  verses: [],
  isLogin: false,
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

    default:
      return state
  }
}
