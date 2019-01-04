import { FETCH_VERSES } from '../containers/Bible/fetchVersesAction';

const initialState = {
  numDay: null,
  notesList: {},
  readingPlan: {},
  verses: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VERSES:
      state.numDay = action.payload.numDay;
      state.readingPlan = action.payload.readingPlan;
      state.verses = action.payload.verses;

      return { ...state }

    default:
      return state
  }
}
