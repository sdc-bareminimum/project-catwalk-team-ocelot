export const SELECT_RATING = 'SELECT_RATING';
export const ADD_SUMMARY = 'ADD_SUMMARY';
export const ADD_BODY = 'ADD_BODY';
export const SELECT_REC = 'SELECT_REC';
export const ADD_USER = 'ADD_USER';
export const ADD_EMAIL = 'ADD_EMAIL';
export const ADD_PHOTOS = 'ADD_PHOTOS';
export const ADD_LENGTH = 'ADD_LENGTH';
export const ADD_COMFORT = 'ADD_COMFORT';
export const ADD_QUALITY = 'ADD_QUALITY';
export const ADD_FIT = 'ADD_FIT';

export const reviewFormReducer = (state, action) => {
  switch (action.type) {
    case SELECT_RATING:
      return {
        ...state,
        selectedRating: action.payload,
      };
    case ADD_SUMMARY:
      return {
        ...state,
        summaryText: action.payload,
      };
    case ADD_BODY:
      return {
        ...state,
        bodyText: action.payload,
      };
    case SELECT_REC:
      return {
        ...state,
        selectRec: action.payload,
      };
    case ADD_USER:
      return {
        ...state,
        username: action.payload,
      };
    case ADD_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case ADD_PHOTOS:
      return {
        ...state,
        photos: [...state.photos, action.payload],
      };
    case ADD_LENGTH:
      return {
        ...state,
        length: action.payload,
      };
    case ADD_COMFORT:
      return {
        ...state,
        comfort: action.payload,
      };
    case ADD_QUALITY:
      return {
        ...state,
        quality: action.payload,
      };
    case ADD_FIT:
      return {
        ...state,
        fit: action.payload,
      };
    default:
      return state;
  }
};

export const initialState = {
  selectedRating: 1,
  summaryText: '',
  bodyText: '',
  selectRec: false,
  username: '',
  email: '',
  photos: [],
  fit: 1,
  length: 1,
  comfort: 1,
  quality: 1,
};
