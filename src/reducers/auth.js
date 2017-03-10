import { AUTH_USER, SIGN_OUT_USER, AUTH_ERROR, RESET_SUCCESS, RESET_ERROR } from '../actions';

const initialState =  {
  authenticated: false,
  error: null,
  resetMsg: null
};

export default function gifs(state = initialState, action) {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: true,
        error: null,
        resetMsg: null
      };
    case SIGN_OUT_USER:
      return {
        ...state,
        authenticated: false,
        error: null,
        resetMsg: null
      };
    case AUTH_ERROR:
      return {
        ...state,
        error: action.payload.message,
        resetMsg: null
      };
    case RESET_SUCCESS:
      return {
        ...state,
        error: null,
        resetMsg: action.payload
      };       
    case RESET_ERROR:
      return {
        ...state,
        error: null,
        resetMsg: action.payload.message
      };      
    default:
      return state;
  }
}