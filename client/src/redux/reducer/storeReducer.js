import { SET_STORES, SET_STORES_LOADING, ADD_STORES_ERROR,
  REMOVE_STORES_ERROR
} from '../action/actionTypes';

const initialstate = {
  stores: [],
  isLoading: false,
  errors: []
}

function handleRemoveError(state, action) {
  const { id } = action;
  return state.errors.filter(error => error.id !== id);
}

export default function storeReducer(state = initialstate, action) {
  switch(action.type) {
    case SET_STORES:
      return { ...state, stores: action.stores, isLoading: false };
    case SET_STORES_LOADING:
      return { ...state,  isLoading: action.isLoading }
    case ADD_STORES_ERROR:
      return { ...state, errors: [...state.errors, { id: state.errors.length + 1, message: action.error } ] }
    case REMOVE_STORES_ERROR:
      return handleRemoveError(state, action);
    default:
      return state;
  }
}